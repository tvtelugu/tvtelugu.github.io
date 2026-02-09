
import { EPGProgram } from '../types';

declare const pako: any;

/**
 * Robust fetcher that handles binary (Gzip) and text data correctly across different proxies.
 */
async function robustFetchEPG(url: string): Promise<string> {
  const isGzip = url.toLowerCase().endsWith('.gz');

  // 1. Try direct fetch first
  try {
    const response = await fetch(url);
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      if (isGzip || (bytes[0] === 0x1f && bytes[1] === 0x8b)) {
        const decompressed = pako.ungzip(bytes);
        return new TextDecoder().decode(decompressed);
      }
      return new TextDecoder().decode(bytes);
    }
  } catch (e) {
    console.warn("Direct EPG fetch failed, trying proxies...");
  }

  // 2. Define proxies
  // AllOrigins usually wraps in JSON, CodeTabs is a transparent pass-through
  const proxies = [
    {
      name: 'CodeTabs',
      url: (u: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
      isJsonWrapped: false
    },
    {
      name: 'AllOrigins',
      url: (u: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
      isJsonWrapped: true
    }
  ];

  for (const proxy of proxies) {
    try {
      const response = await fetch(proxy.url(url));
      if (!response.ok) continue;

      if (proxy.isJsonWrapped) {
        const json = await response.json();
        const content = json.contents;
        
        if (typeof content === 'string') {
          // AllOrigins often returns a Data URL for binary data
          if (content.startsWith('data:')) {
            const base64Data = content.split('base64,')[1];
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
            
            if (isGzip || (bytes[0] === 0x1f && bytes[1] === 0x8b)) {
              return new TextDecoder().decode(pako.ungzip(bytes));
            }
            return new TextDecoder().decode(bytes);
          }
          // If it's just a raw string
          return content;
        }
      } else {
        // Transparent proxy like CodeTabs
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        
        if (isGzip || (bytes[0] === 0x1f && bytes[1] === 0x8b)) {
          try {
            const decompressed = pako.ungzip(bytes);
            return new TextDecoder().decode(decompressed);
          } catch (err) {
            console.error(`Decompression failed for ${proxy.name}`, err);
          }
        }
        return new TextDecoder().decode(bytes);
      }
    } catch (e) {
      console.warn(`EPG Proxy ${proxy.name} failed:`, e);
    }
  }

  throw new Error("EPG Sync Failed: All fetch attempts exhausted.");
}

export async function fetchEPG(url: string): Promise<Map<string, EPGProgram[]>> {
  const epgMap = new Map<string, EPGProgram[]>();
  
  if (!url) return epgMap;

  try {
    const xmlText = await robustFetchEPG(url);
    if (!xmlText || xmlText.trim().length === 0) return epgMap;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const parserError = xmlDoc.getElementsByTagName('parsererror');
    if (parserError.length > 0) {
      // If we got a parser error, the string wasn't valid XML
      console.error("XML Parsing Error (First 100 chars):", xmlText.substring(0, 100));
      return epgMap;
    }

    const programs = xmlDoc.getElementsByTagName('programme');

    for (let i = 0; i < programs.length; i++) {
      const prog = programs[i];
      const channelId = prog.getAttribute('channel');
      if (!channelId) continue;

      const title = prog.getElementsByTagName('title')[0]?.textContent || 'No Title';
      const desc = prog.getElementsByTagName('desc')[0]?.textContent || '';
      const start = prog.getAttribute('start') || '';
      const stop = prog.getAttribute('stop') || '';

      const program: EPGProgram = { start, stop, channel: channelId, title, desc };
      
      if (!epgMap.has(channelId)) {
        epgMap.set(channelId, []);
      }
      epgMap.get(channelId)?.push(program);
    }
    
    console.log(`EPG Synced: ${epgMap.size} channels mapped.`);
  } catch (e) {
    console.error('EPG Load Error:', e);
  }
  
  return epgMap;
}

export function getCurrentProgram(programs: EPGProgram[] | undefined): EPGProgram | null {
  if (!programs || programs.length === 0) return null;
  const now = new Date();
  
  return programs.find(p => {
    const start = parseEPGDate(p.start);
    const stop = parseEPGDate(p.stop);
    if (!start || !stop) return false;
    return now >= start && now <= stop;
  }) || null;
}

function parseEPGDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  
  try {
    // Format: YYYYMMDDHHMMSS [+/-]HHMM
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    const hour = parseInt(dateStr.substring(8, 10));
    const min = parseInt(dateStr.substring(10, 12));
    const sec = parseInt(dateStr.substring(12, 14));
    
    return new Date(year, month, day, hour, min, sec);
  } catch (e) {
    return null;
  }
}
