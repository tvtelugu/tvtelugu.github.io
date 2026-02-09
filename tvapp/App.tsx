
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Channel, UserTier, TokenInfo, EPGProgram } from './types';
import { fetchAndParseM3U } from './services/m3uParser';
import { fetchEPG, getCurrentProgram } from './services/epgService';
import TokenGate from './components/TokenGate';
import Player from './components/Player';
import UserPage from './components/UserPage';

const App: React.FC = () => {
  const [tier, setTier] = useState<UserTier | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<TokenInfo | undefined>(undefined);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [epgData, setEpgData] = useState<Map<string, EPGProgram[]>>(new Map());
  const [epgUrl, setEpgUrl] = useState<string>('https://avkb.short.gy/jioepg.xml.gz');
  const [loading, setLoading] = useState(false);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGroupDrawer, setShowGroupDrawer] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (selectedTier: UserTier, userToken: string, data?: TokenInfo) => {
    setTier(selectedTier);
    setToken(userToken);
    setTokenData(data);
  };

  const syncEPG = useCallback(async (url: string) => {
    const data = await fetchEPG(url);
    setEpgData(data);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSearchQuery('');
        setShowGroupDrawer(false);
        setShowProfile(false);
        setShowSettings(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loadChannels = useCallback(async () => {
    if (!tier) return;
    setLoading(true);
    const freeUrl = 'https://tvtelugu.pages.dev/play.m3u';
    const proUrl = 'https://tvtjstar.vercel.app/jstar.m3u';

    try {
      const results = tier === UserTier.PRO 
        ? await Promise.all([fetchAndParseM3U(freeUrl, false), fetchAndParseM3U(proUrl, true)])
        : [await fetchAndParseM3U(freeUrl, false)];
      
      const combined = results.flatMap(r => r.channels);
      const unique = combined.filter((c, i, a) => a.findIndex(t => t.url === c.url) === i);
      setChannels(unique);

      const firstEpg = results.find(r => r.epgUrl)?.epgUrl;
      if (firstEpg) {
        setEpgUrl(firstEpg);
        syncEPG(firstEpg);
      } else {
        syncEPG(epgUrl);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [tier, epgUrl, syncEPG]);

  useEffect(() => { loadChannels(); }, [loadChannels]);

  const groups = useMemo(() => ['All', ...Array.from(new Set(channels.map(c => c.group))).sort()], [channels]);
  
  const filteredChannels = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return channels.filter(ch => {
      const matchesSearch = !query || 
        ch.name.toLowerCase().includes(query) || 
        ch.group.toLowerCase().includes(query);
      
      if (query) return matchesSearch;
      return (selectedGroup === 'All' || ch.group === selectedGroup) && matchesSearch;
    });
  }, [channels, selectedGroup, searchQuery]);

  const daysLeft = useMemo(() => {
    if (!tokenData?.expiresAt) return null;
    const expiry = new Date(tokenData.expiresAt);
    const diff = expiry.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [tokenData]);

  if (!tier) return <TokenGate onLogin={handleLogin} />;

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Header */}
      <header className="h-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
            <img src="https://tvtelugu.pages.dev/logo/TV%20Telugu.png" className="w-10 h-10 object-contain drop-shadow-lg group-hover:scale-110 transition-transform" alt="TV Telugu" />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none">TV <span className="text-red-600">TELUGU</span></h1>
              <p className="text-[7px] font-black text-gray-500 uppercase tracking-[0.4em] mt-1">For Telugu People</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center relative group">
            <div className="absolute left-5 text-gray-500 group-focus-within:text-red-600 transition-colors">
              <i className="fas fa-search text-xs" />
            </div>
            <input 
              ref={searchInputRef}
              className="bg-[#151515] text-[11px] font-black border border-white/5 rounded-2xl pl-12 pr-12 py-3.5 w-60 lg:w-[400px] focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-700 uppercase tracking-widest" 
              placeholder="Search Terminal... [/]" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={loadChannels} 
            className="hidden xl:flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xl border border-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <i className="fas fa-sync-alt text-red-600"></i> Refresh
          </button>
          
          <div className="hidden md:flex items-center gap-3">
             <button onClick={() => setShowSettings(true)} className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"><i className="fas fa-sliders-h text-sm" /></button>
             <button 
               onClick={() => setShowProfile(true)} 
               className="flex items-center gap-3 bg-white/5 border border-white/10 pl-2 pr-4 py-1.5 rounded-2xl hover:bg-white/10 transition-all group"
             >
               <div className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-110 ${tier === UserTier.PRO ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                 <i className={`fas ${tier === UserTier.PRO ? 'fa-crown' : 'fa-user'} text-[10px]`} />
               </div>
               <div className="text-left">
                 <p className="text-[9px] font-black text-white/90 uppercase tracking-wider leading-none mb-1">
                   {tier === UserTier.PRO ? 'PRO ACCOUNT' : 'GUEST'}
                 </p>
                 <p className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter leading-none">
                   {tier === UserTier.PRO ? (daysLeft ? `${daysLeft}D LEFT` : 'ACTIVE') : 'BASIC'}
                 </p>
               </div>
             </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setShowGroupDrawer(true)}>
             <i className="fas fa-th-large text-xl"></i>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Desktop Only */}
        <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 p-6 overflow-y-auto no-scrollbar hidden lg:block">
          <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6 px-4">Satellite Groups</h3>
          <div className="space-y-1.5">
            {groups.map(g => (
              <button 
                key={g} 
                onClick={() => { setSelectedGroup(g); setSearchQuery(''); }} 
                className={`w-full text-left px-5 py-4 rounded-2xl font-black uppercase italic text-[11px] tracking-tight transition-all flex items-center justify-between group ${selectedGroup === g && !searchQuery ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                   <i className={`fas ${g === 'All' ? 'fa-th-large' : 'fa-folder'} text-[10px] opacity-30`} />
                   <span>{g}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,#111,transparent)] scroll-smooth no-scrollbar pb-32 md:pb-8">
          {/* Horizontal Group Scroll - Mobile/Tablets */}
          <nav className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 p-4 overflow-x-auto no-scrollbar whitespace-nowrap lg:hidden">
            <div className="flex items-center gap-3 px-2">
              {groups.map(g => (
                <button 
                  key={'nav-'+g} 
                  onClick={() => { setSelectedGroup(g); setSearchQuery(''); }}
                  className={`px-6 py-2.5 rounded-xl font-black uppercase italic text-[10px] tracking-widest transition-all ${selectedGroup === g && !searchQuery ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-white/5 text-gray-500 hover:text-white border border-white/5'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </nav>

          <div className="p-6 md:p-12">
            <div className="mb-8 md:mb-12">
              <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-2">
                {searchQuery ? 'Terminal Match' : selectedGroup}
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px]">
                {loading ? 'Decrypting Live Streams...' : `${filteredChannels.length} Broadcast Signals Ready`}
              </p>
            </div>

            {loading ? (
              <div className="h-[50vh] flex flex-col items-center justify-center gap-6">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Syncing Satellite Hub</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-10">
                {filteredChannels.map(ch => {
                  const prog = getCurrentProgram(epgData.get(ch.tvgId || ''));
                  return (
                    <button 
                      key={ch.url + ch.id} 
                      onClick={() => setActiveChannel(ch)} 
                      className="group text-left focus:outline-none focus:ring-4 focus:ring-red-600/20 rounded-[2.5rem]"
                    >
                      <div className="aspect-video bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-red-600/50 group-hover:shadow-[0_20px_50px_rgba(220,38,38,0.2)] relative">
                        <img 
                          src={ch.logo} 
                          className="w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-700" 
                          alt={ch.name}
                          onError={e => (e.currentTarget.src = 'https://picsum.photos/seed/' + ch.name + '/400/225')} 
                        />
                        {ch.isPro && (
                          <div className="absolute top-5 right-5 bg-red-600 text-[8px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                            <i className="fas fa-crown text-[7px]" /> PRO
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                      <div className="mt-5 px-4">
                        <h4 className="text-sm md:text-base font-black uppercase italic truncate text-gray-200 group-hover:text-white transition-colors">{ch.name}</h4>
                        {prog ? (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                            <p className="text-[10px] text-red-500 font-bold uppercase truncate tracking-tight">{prog.title}</p>
                          </div>
                        ) : (
                          <p className="text-[9px] text-gray-600 font-bold uppercase truncate mt-1.5 tracking-widest">{ch.group}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Stylish Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden pointer-events-none">
         <div className="bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] h-20 w-full max-w-lg mx-auto flex items-center justify-around px-8 shadow-2xl pointer-events-auto shadow-black">
            <button 
              onClick={() => { setSelectedGroup('All'); setSearchQuery(''); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
              className={`flex flex-col items-center gap-1 transition-all ${selectedGroup === 'All' && !searchQuery ? 'text-red-600' : 'text-gray-500'}`}
            >
              <i className="fas fa-th-large text-lg"></i>
              <span className="text-[8px] font-black uppercase tracking-widest">Feed</span>
            </button>
            <button 
              onClick={() => setShowGroupDrawer(true)} 
              className={`flex flex-col items-center gap-1 transition-all ${showGroupDrawer ? 'text-red-600' : 'text-gray-500'}`}
            >
              <i className="fas fa-folder-open text-lg"></i>
              <span className="text-[8px] font-black uppercase tracking-widest">Groups</span>
            </button>
            <button 
              onClick={() => setShowSettings(true)} 
              className={`flex flex-col items-center gap-1 transition-all ${showSettings ? 'text-red-600' : 'text-gray-500'}`}
            >
              <i className="fas fa-sliders-h text-lg"></i>
              <span className="text-[8px] font-black uppercase tracking-widest">Setup</span>
            </button>
            <button 
              onClick={() => setShowProfile(true)} 
              className={`flex flex-col items-center gap-1 transition-all ${showProfile ? 'text-red-600' : 'text-gray-500'}`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${tier === UserTier.PRO ? 'bg-red-600/20 text-red-600' : 'bg-gray-800 text-gray-500'}`}>
                <i className="fas fa-user text-xs"></i>
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest">User</span>
            </button>
         </div>
      </div>

      {/* Group Selector Drawer (Mobile) */}
      {showGroupDrawer && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowGroupDrawer(false)}></div>
           <div className="relative w-full max-w-xl bg-[#0a0a0a] border-t border-white/10 rounded-t-[3rem] p-8 max-h-[80vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-500 shadow-[0_-20px_100px_rgba(0,0,0,1)]">
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-10"></div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Satellite Groups</h3>
                <button onClick={() => setShowGroupDrawer(false)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"><i className="fas fa-times"></i></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {groups.map(g => (
                  <button 
                    key={'drawer-'+g} 
                    onClick={() => { setSelectedGroup(g); setSearchQuery(''); setShowGroupDrawer(false); }} 
                    className={`text-left p-6 rounded-3xl font-black uppercase italic text-[11px] tracking-widest transition-all ${selectedGroup === g && !searchQuery ? 'bg-red-600 text-white shadow-xl shadow-red-600/30' : 'bg-white/5 text-gray-400 border border-white/5'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
           </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] w-full max-w-lg p-10 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/5 rounded-full blur-[60px]"></div>
            <h2 className="text-3xl font-black uppercase italic mb-10 tracking-tighter">Signal Configuration</h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block ml-1">Metadata Source URI</label>
                <input 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm font-mono focus:border-red-600/50 focus:outline-none focus:ring-8 focus:ring-red-600/5 transition-all text-white/80" 
                  value={epgUrl} 
                  onChange={e => setEpgUrl(e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { syncEPG(epgUrl); setShowSettings(false); }} className="py-5 bg-red-600 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-red-600/20 active:scale-95 transition-all">Apply & Sync</button>
                <button onClick={() => setShowSettings(false)} className="py-5 bg-white/5 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/5 hover:bg-white/10 transition-colors">Discard</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeChannel && <Player channel={activeChannel} allChannels={channels} onChannelSelect={setActiveChannel} onClose={() => setActiveChannel(null)} epgData={epgData} />}
      {showProfile && tier && token && <UserPage tier={tier} token={token} tokenData={tokenData} onLogout={() => window.location.reload()} onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default App;
