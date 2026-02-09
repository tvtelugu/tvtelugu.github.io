
import React from 'react';
import { UserTier, TokenInfo } from '../types';

interface UserPageProps {
  tier: UserTier;
  token: string;
  tokenData?: TokenInfo;
  onLogout: () => void;
  onClose: () => void;
}

const UserPage: React.FC<UserPageProps> = ({ tier, token, tokenData, onLogout, onClose }) => {
  const isPro = tier === UserTier.PRO;
  const expiry = tokenData?.expiresAt ? new Date(tokenData.expiresAt) : null;
  const now = new Date();
  const daysRemaining = expiry ? Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-bottom-10 duration-500 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Banner Decor */}
        <div className={`h-40 w-full absolute top-0 left-0 bg-gradient-to-br ${isPro ? 'from-red-600/20 via-red-900/10 to-transparent' : 'from-blue-600/20 to-transparent'} pointer-events-none`}></div>
        
        <div className="relative p-6 md:p-12">
          {/* Action Row */}
          <div className="flex justify-between items-start mb-12">
            <button onClick={onClose} className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-white transition-all"><i className="fas fa-chevron-left"></i></button>
            <div className={`px-5 py-2 rounded-xl font-black text-[9px] tracking-[0.3em] uppercase italic border ${isPro ? 'bg-red-600/10 border-red-600 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-blue-600/10 border-blue-600 text-blue-500'}`}>
              {isPro ? 'PREMIUM ACCESS' : 'BASIC SIGNAL'}
            </div>
          </div>

          {/* Identity */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 text-center md:text-left">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] flex items-center justify-center text-4xl md:text-5xl shadow-2xl relative group ${isPro ? 'bg-red-600 text-white shadow-red-600/20' : 'bg-blue-600 text-white'}`}>
              <i className={`fas ${isPro ? 'fa-crown' : 'fa-user'}`}></i>
              {isPro && <div className="absolute inset-0 rounded-[2.5rem] animate-ping bg-red-600/20"></div>}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-2 break-all">{token}</h2>
              <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[9px] flex items-center justify-center md:justify-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Authorized Network Identity
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4">Device Units</span>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-white">{tokenData?.deviceLimit || 1}</span>
                <span className="text-[9px] text-gray-500 font-black mb-1.5 uppercase tracking-widest">Active Nodes</span>
              </div>
            </div>
            <div className="bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4">Signal Validity</span>
              <div className="flex items-end gap-3">
                <span className={`text-3xl font-black uppercase italic ${isPro ? 'text-red-500' : 'text-blue-400'}`}>
                  {isPro ? (daysRemaining && daysRemaining > 0 ? `${daysRemaining} Days` : 'Infinite') : 'Permanent'}
                </span>
              </div>
            </div>
          </div>

          {/* Lists */}
          <div className="space-y-2 mb-12">
            <div className="flex justify-between items-center p-6 bg-white/5 rounded-2xl">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Termination Date</span>
              <span className="text-[10px] font-black text-white uppercase italic tracking-widest">
                {expiry ? expiry.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Never'}
              </span>
            </div>
            <div className="flex justify-between items-center p-6 bg-white/5 rounded-2xl">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Adult Streams</span>
              <span className={`text-[10px] font-black uppercase italic tracking-widest ${tokenData?.allowAdultContent ? 'text-red-500' : 'text-gray-600'}`}>
                {tokenData?.allowAdultContent ? 'UNRESTRICTED' : 'RESTRICTED'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <button 
            onClick={onLogout}
            className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] shadow-2xl shadow-red-600/20 transition-all uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 active:scale-95"
          >
            <i className="fas fa-power-off"></i> Terminate Active Link
          </button>
          <p className="text-center text-[8px] font-bold text-gray-700 uppercase tracking-[0.5em] mt-8">TV Telugu Hub • Protocol Sec-V</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
