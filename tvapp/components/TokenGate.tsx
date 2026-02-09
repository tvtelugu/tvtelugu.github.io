
import React, { useState } from 'react';
import { UserTier, TokenInfo } from '../types';

interface TokenGateProps {
  onLogin: (tier: UserTier, token: string, tokenData?: TokenInfo) => void;
}

const TokenGate: React.FC<TokenGateProps> = ({ onLogin }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async (): Promise<TokenInfo[]> => {
    const url = 'https://www.jsonkeeper.com/b/8XRJV';
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('CORS Error');
      const data = await response.json();
      return JSON.parse(data.contents);
    } catch (e) {
      const fbUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
      const fbRes = await fetch(fbUrl);
      return await fbRes.json();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputToken = token.trim();
    if (!inputToken) return setError('Token required.');

    setLoading(true);
    setError(null);

    try {
      const tokens = await fetchTokens();
      const found = tokens.find(t => t.token === inputToken);
      
      if (found) {
        if (!found.expiresAt) return onLogin(UserTier.FREE, inputToken, found);
        const expiryDate = new Date(found.expiresAt);
        if (expiryDate > new Date()) onLogin(UserTier.PRO, inputToken, found);
        else setError(`Token expired: ${expiryDate.toLocaleDateString()}`);
      } else setError('Access denied. Invalid token.');
    } catch (err: any) {
      setError('Authentication server unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-6 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm scale-110 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>

      <div className="max-w-md w-full z-10 bg-[#0a0a0a]/90 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]"></div>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <img 
              src="https://tvtelugu.pages.dev/logo/TV%20Telugu.png" 
              className="w-32 h-32 object-contain drop-shadow-2xl" 
              alt="TV Telugu Logo" 
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">
            TV <span className="text-red-600">TELUGU</span>
          </h1>
          <p className="text-gray-500 font-black text-[10px] md:text-[11px] tracking-[0.4em] uppercase px-4 leading-loose">
            For Telugu People
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Access Token</label>
            <input
              type="text"
              value={token}
              autoFocus
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-red-600 transition-all font-mono tracking-[0.2em] text-center uppercase text-xl placeholder:tracking-normal placeholder:font-sans placeholder:text-gray-800"
              placeholder="TOKEN"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black p-4 rounded-2xl flex items-center gap-3 uppercase tracking-widest leading-relaxed">
              <i className="fas fa-exclamation-circle text-lg"></i>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900/50 text-white font-black py-5 rounded-2xl shadow-2xl shadow-red-600/30 transition-all flex items-center justify-center gap-4 uppercase text-[11px] tracking-[0.3em]"
          >
            {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-play"></i>}
            {loading ? 'Authenticating...' : 'Enter App'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenGate;
