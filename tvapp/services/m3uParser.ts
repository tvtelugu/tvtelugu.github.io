
import { Channel } from '../types';

export interface ParseResult {
  channels: Channel[];
  epgUrl?: string;
}

async function robustFetch(url: string): Promise<string> {
  const proxies = [
    (u: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
    (u: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  ];

  try {
    const response = await fetch(url);
    if (response.ok) return await response.text();
  } catch (e) {}

  for (const proxyFn of proxies) {
    try {
      const response = await fetch(proxyFn(url));
      if (!response.ok) continue;
      const data = await response.json();
      return typeof data === 'string' ? data : data.contents;
    } catch (e) {}
  }
  throw new Error(`Failed to fetch ${url}`);
}

export async function fetchAndParseM3U(url: string, isPro: boolean): Promise<ParseResult> {
  try {
    const content = await robustFetch(url);
    if (!content) return { channels: [] };
    return parseM3U(content, isPro);
  } catch (error) {
    return { channels: [] };
  }
}

function parseM3U(content: string, isPro: boolean): ParseResult {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  let epgUrl: string | undefined;
  
  let currentChannel: Partial<Channel> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    if (line.startsWith('#EXTM3U')) {
      const epgMatch = line.match(/x-tvg-url="([^"]+)"/i);
      if (epgMatch) epgUrl = epgMatch[1];
    } else if (line.startsWith('#EXTINF')) {
      const nameMatch = line.match(/,(.*)$/);
      const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
      const groupMatch = line.match(/group-title="([^"]+)"/i);
      const idMatch = line.match(/tvg-id="([^"]+)"/i);

      currentChannel = {
        name: nameMatch ? nameMatch[1].trim() : 'Unknown',
        logo: logoMatch ? logoMatch[1] : '',
        group: groupMatch ? groupMatch[1] : 'General',
        tvgId: idMatch ? idMatch[1] : undefined,
        id: idMatch ? idMatch[1] : `ch-${Math.random().toString(36).substr(2, 9)}`,
        isPro: isPro
      };
    } else if (line.includes('license_key=')) {
      const match = line.match(/license_key=([a-fA-F0-9:]+)/i);
      if (match) currentChannel.licenseKey = match[1];
    } else if (line.includes('license_type=')) {
      const match = line.match(/license_type=([a-zA-Z0-9]+)/i);
      if (match) currentChannel.licenseType = match[1];
    } else if (line.includes('http-user-agent=')) {
      const parts = line.split('=');
      if (parts.length > 1) currentChannel.userAgent = parts[parts.length - 1].trim();
    } else if (line.startsWith('#EXTHTTP:')) {
      try {
        const jsonStr = line.replace('#EXTHTTP:', '').trim();
        const json = JSON.parse(jsonStr);
        if (json.cookie) currentChannel.cookie = json.cookie;
      } catch (e) {}
    } else if (line.startsWith('http')) {
      if (currentChannel.name && !line.includes('license_key')) {
        currentChannel.url = line;
        channels.push(currentChannel as Channel);
        currentChannel = { isPro };
      }
    }
  }

  return { channels, epgUrl };
}
