
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Channel, EPGProgram } from '../types';
import { getCurrentProgram } from '../services/epgService';

interface PlayerProps {
  channel: Channel | null;
  onClose: () => void;
  allChannels: Channel[];
  onChannelSelect: (channel: Channel) => void;
  epgData?: Map<string, EPGProgram[]>;
}

declare const jwplayer: any;

const Player: React.FC<PlayerProps> = ({ channel, onClose, allChannels, onChannelSelect, epgData }) => {
  const [error, setError] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [scalingMode, setScalingMode] = useState<'exactfit' | 'uniform' | 'fill'>('uniform');
  const [isPaused, setIsPaused] = useState(false);
  const [currentProg, setCurrentProg] = useState<EPGProgram | null>(null);
  const [switchInfo, setSwitchInfo] = useState<string | null>(null);
  const [audioTracks, setAudioTracks] = useState<any[]>([]);
  const [currentAudioTrack, setCurrentAudioTrack] = useState<number>(0);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const controlsTimer = useRef<number | null>(null);
  const playerRef = useRef<any>(null);

  const relatedChannels = useMemo(() => {
    if (!channel) return [];
    return allChannels
      .filter(ch => ch.group === channel.group && ch.id !== channel.id)
      .slice(0, 6);
  }, [channel, allChannels]);

  useEffect(() => {
    if (channel && epgData) {
      const programs = epgData.get(channel.tvgId || '');
      setCurrentProg(getCurrentProgram(programs));
    }
  }, [channel, epgData]);

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimer.current) window.clearTimeout(controlsTimer.current);
    controlsTimer.current = window.setTimeout(() => {
      if (!isPaused && !showAudioMenu) setShowControls(false);
    }, 4000);
  }, [isPaused, showAudioMenu]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    const state = playerRef.current.getState();
    if (state === 'paused') {
      playerRef.current.play();
      setIsPaused(false);
    } else {
      playerRef.current.pause();
      setIsPaused(true);
    }
    resetControlsTimer();
  }, [resetControlsTimer]);

  const switchChannel = useCallback((direction: 'next' | 'prev') => {
    const currentIndex = allChannels.findIndex(c => c.id === channel?.id);
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % allChannels.length;
    } else {
      nextIndex = (currentIndex - 1 + allChannels.length) % allChannels.length;
    }
    
    const nextChannel = allChannels[nextIndex];
    setSwitchInfo(nextChannel.name);
    setTimeout(() => setSwitchInfo(null), 1500);
    onChannelSelect(nextChannel);
  }, [allChannels, channel, onChannelSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': e.preventDefault(); switchChannel('next'); break;
        case 'ArrowDown': e.preventDefault(); switchChannel('prev'); break;
        case ' ': e.preventDefault(); togglePlay(); break;
        case 'Escape': onClose(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [switchChannel, togglePlay, onClose]);

  useEffect(() => {
    if (!channel) return;
    setError(null);
    setIsBuffering(true);
    setShowAudioMenu(false);

    const isDash = channel.url.includes('.mpd');
    const playlistItem: any = {
      file: channel.url,
      type: isDash ? 'dash' : 'hls',
      title: channel.name,
      image: channel.logo
    };

    if (channel.licenseKey) {
      const parts = channel.licenseKey.split(':');
      if (parts.length === 2) {
        playlistItem.drm = { clearkey: { keyId: parts[0], key: parts[1] } };
      }
    }

    const initJW = () => {
      const jw = jwplayer("vplayer").setup({
        playlist: [playlistItem],
        width: "100%",
        height: "100%",
        stretching: scalingMode,
        preload: "auto",
        autostart: true,
        mute: false,
        controls: false,
        primary: "html5",
        aspectratio: "16:9",
        // FIXED: defaultBandwidthEstimate must be a number, and correctly placed for Shaka provider
        shaka: {
          abr: {
            defaultBandwidthEstimate: 1000000
          }
        },
        dash: {
          shaka: {
            abr: {
              defaultBandwidthEstimate: 1000000
            }
          }
        }
      });

      playerRef.current = jw;

      jw.on('error', (e: any) => {
        // Suppress specific Shaka config errors if they still occur during init
        if (e.message?.includes('defaultBandwidthEstimate')) return;
        setError(`Stream Error: ${e.message || 'Unknown'}`);
      });

      jw.on('buffer', () => setIsBuffering(true));
      jw.on('play', () => {
        setIsBuffering(false);
        setIsPaused(false);
        
        // Handle Audio Tracks
        const tracks = jw.getAudioTracks();
        if (tracks && tracks.length > 0) {
          setAudioTracks(tracks);
          // Auto-select Telugu if available
          const teluguIdx = tracks.findIndex((t: any) => 
            t.name?.toLowerCase().includes('telugu') || 
            t.language?.toLowerCase().includes('tel') ||
            t.label?.toLowerCase().includes('telugu')
          );
          if (teluguIdx !== -1) {
            jw.setCurrentAudioTrack(teluguIdx);
            setCurrentAudioTrack(teluguIdx);
          } else {
            setCurrentAudioTrack(jw.getCurrentAudioTrack());
          }
        }
      });
      jw.on('pause', () => setIsPaused(true));
      jw.on('audioTrackChanged', (e: any) => setCurrentAudioTrack(e.currentTrack));
    };

    if (typeof jwplayer !== 'undefined') initJW();
    else setError('JWPlayer failed to load.');

    return () => playerRef.current?.remove();
  }, [channel, scalingMode]);

  const selectAudioTrack = (index: number) => {
    if (playerRef.current) {
      playerRef.current.setCurrentAudioTrack(index);
      setShowAudioMenu(false);
    }
  };

  if (!channel) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden" onMouseMove={resetControlsTimer}>
      <div id="vplayer" className="absolute inset-0"></div>

      {isBuffering && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-[105] backdrop-blur-md">
           <div className="text-center">
              <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Fetching Signal</p>
           </div>
        </div>
      )}

      {/* Switch Info */}
      {switchInfo && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[160] pointer-events-none">
           <div className="bg-red-600 px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 animate-in fade-in zoom-in border border-white/10">
              <i className="fas fa-satellite-dish text-white"></i>
              <span className="text-sm font-black uppercase italic text-white tracking-widest">{switchInfo}</span>
           </div>
        </div>
      )}

      {/* Audio Track Selector Modal */}
      {showAudioMenu && (
        <div className="absolute inset-0 z-[140] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6">
           <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 animate-in zoom-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black uppercase italic tracking-tighter text-white">Audio Language</h3>
                <button onClick={() => setShowAudioMenu(false)} className="text-gray-500 hover:text-white"><i className="fas fa-times"></i></button>
              </div>
              <div className="space-y-3 max-h-[50vh] overflow-y-auto no-scrollbar pr-2">
                 {audioTracks.length > 0 ? audioTracks.map((track, i) => (
                   <button 
                    key={i} 
                    onClick={() => selectAudioTrack(i)}
                    className={`w-full text-left p-5 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all flex items-center justify-between ${currentAudioTrack === i ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-400 border border-white/5'}`}
                   >
                     <span>{track.name || track.label || `Track ${i + 1}`}</span>
                     {currentAudioTrack === i && <i className="fas fa-check"></i>}
                   </button>
                 )) : <p className="text-center text-gray-600 text-xs py-4">No tracks detected</p>}
              </div>
           </div>
        </div>
      )}

      {/* Header Controls */}
      <div className={`absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between z-[110] transition-all duration-700 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
          <button onClick={onClose} className="w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 text-white hover:bg-red-600 transition-all"><i className="fas fa-chevron-left"></i></button>
          <div className="bg-black/40 backdrop-blur-xl px-4 md:px-6 py-2.5 rounded-2xl border border-white/10 flex items-center gap-4 flex-1 md:flex-none truncate">
            <img src={channel.logo} className="w-8 h-8 md:w-10 md:h-10 object-contain" alt="" />
            <div className="truncate">
              <h2 className="text-sm md:text-xl font-black italic uppercase tracking-tighter text-white truncate">{channel.name}</h2>
              <p className="text-[8px] md:text-[10px] text-white/40 font-bold uppercase truncate">{channel.group}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Channels on Pause */}
      <div className={`absolute bottom-32 left-0 right-0 px-4 md:px-8 z-[110] transition-all duration-700 ${isPaused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
        <div className="max-w-6xl mx-auto">
           <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-6 ml-4">Up Next in {channel.group}</h3>
           <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4">
              {relatedChannels.map(ch => (
                <button 
                  key={ch.id} 
                  onClick={() => onChannelSelect(ch)}
                  className="flex-shrink-0 w-32 md:w-44 bg-black/60 backdrop-blur-3xl border border-white/10 p-3 md:p-4 rounded-3xl hover:border-red-600 transition