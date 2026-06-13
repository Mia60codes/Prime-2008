import React from 'react';
import { BettingTip } from '../types';
import { Clock, ShieldCheck, Check, Eye, Trophy, Sparkles } from 'lucide-react';
import { MOCK_TIPSTERS } from '../data/mockTips';

interface TipCardProps {
  key?: React.Key;
  tip: BettingTip;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onViewAnalysis: (tip: BettingTip) => void;
}

export default function TipCard({ tip, isSelected, onToggleSelect, onViewAnalysis }: TipCardProps) {
  const isCompleted = tip.status === 'won';
  const isLive = tip.status === 'live';

  // Find the curating specialist/tipster
  const tipster = MOCK_TIPSTERS.find(t => t.id === tip.tipsterId) || MOCK_TIPSTERS[0];

  const getCategoryTag = (category: string): string => {
    switch (category) {
      case 'rollover': return 'FREE ROLLOVER MULTIPLIER 📈';
      case 'daily': return 'FREE DAILY EXTRA TICKET 👑';
      case 'trending': return 'FREE TRENDING SPECIAL 🔥';
      case 'live_capital': return 'FREE LIVE CAPITAL CHANCE 💎';
      default: return 'FREE PREDICTION TICKET ⚽';
    }
  };

  const currentTag = getCategoryTag(tip.category);

  return (
    <div
      id={`tip-card-${tip.id}`}
      onClick={() => onViewAnalysis(tip)}
      className={`relative w-full rounded-2xl border transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer overflow-hidden shadow-xl select-none flex flex-col justify-between ${
        isSelected 
          ? 'bg-gradient-to-br from-slate-900 via-slate-905 to-slate-950 border-orange-500 shadow-lg shadow-orange-500/10' 
          : 'bg-gradient-to-br from-slate-900 via-slate-905 to-slate-950 border-slate-800/80 hover:border-slate-700 hover:shadow-emerald-500/5'
      }`}
    >
      {/* GLOW DECORATOR FOR ACTIVE PREMIUMS */}
      {isLive && (
        <span className="absolute -top-12 -right-12 w-28 h-28 bg-red-500/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
      )}
      {!isLive && isSelected && (
        <span className="absolute -top-12 -right-12 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Decorative Diagonal scanline background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(249,115,22,0.01)_25%,transparent_25%,transparent_50%,rgba(249,115,22,0.01)_50%,rgba(249,115,22,0.01)_75%,transparent_75%,transparent)] bg-[size:16px_16px] opacity-40 pointer-events-none" />

      {/* HEADER BAR FOR CARD */}
      <div className="p-4 pb-2 flex items-center justify-between border-b border-slate-850/40 z-10">
        <div className="flex items-center gap-1">
          <ShieldCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-slate-500'}`} />
          <span className={`text-[9px] font-black uppercase tracking-wider ${isSelected ? 'text-orange-400' : 'text-slate-400'}`}>
            {currentTag}
          </span>
        </div>

        {isLive ? (
          <span className="text-[8px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1 animate-pulse">
            <span className="w-1 h-1 rounded-full bg-red-500" />
            LIVE MATCH
          </span>
        ) : isCompleted ? (
          <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-400" /> WON ({tip.fullTimeScore})
          </span>
        ) : (
          <span
            className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider border ${
              tip.risk === 'Low'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : tip.risk === 'Medium'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}
          >
            {tip.risk} RISK
          </span>
        )}
      </div>

      {/* CONTENT AREA FOR THE PREDICTION TICKET */}
      <div className="p-4 flex items-center justify-between gap-3 z-10">
        
        {/* Left Side: Tipster Profile */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={tipster.avatarUrl}
              alt={tipster.name}
              referrerPolicy="no-referrer"
              className={`w-11 h-11 rounded-xl object-cover ring-2 ${
                isSelected ? 'ring-orange-500/30' : 'ring-slate-800'
              }`}
            />
            {tipster.isVerified && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-black text-[8px] rounded-full flex items-center justify-center border border-slate-900">
                ✓
              </span>
            )}
          </div>

          <div className="text-left">
            <p className="text-[9px] text-slate-550 uppercase tracking-widest font-bold">UNLOCKED TIPS 📂</p>
            <h4 className="text-sm font-black tracking-tight leading-tight uppercase text-slate-100">
              {tipster.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-slate-500 font-semibold">
                Accuracy: <strong className="text-emerald-400">{tipster.accuracy}%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Prediction Summary */}
        <div className="text-right flex flex-col justify-center">
          <p className="text-[8px] text-slate-550 uppercase tracking-widest font-black">ESTIMATED ODDS</p>
          <p className="text-2xl font-black font-mono tracking-tight leading-none mt-0.5 text-orange-400">
            @{tip.odds.toFixed(2)}
          </p>
          <span className="text-[8px] text-slate-550 font-bold uppercase tracking-wider mt-0.5">{tip.league}</span>
        </div>
      </div>

      {/* FOOTER BAR WITH MATCH INFO AND ACTUATORS */}
      <div className="px-4 py-3 bg-slate-950/40 border-t border-slate-900/60 flex items-center justify-between z-10 gap-2">
        <div className="flex items-center gap-1.5 text-left">
          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <div className="leading-none">
            <p className="text-[8px] text-slate-500 uppercase tracking-wider font-extrabold">KICKOFF TIME</p>
            <p className="text-[10px] font-black font-mono uppercase tracking-wide mt-0.5 text-slate-350">
              {tip.date} - {tip.time}
            </p>
          </div>
        </div>

        {/* DECIPHER ACTUATOR BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewAnalysis(tip);
          }}
          className={`px-3.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
            isSelected
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
              : 'bg-orange-500 hover:bg-orange-600 text-slate-950 hover:shadow-md hover:shadow-orange-500/10'
          }`}
        >
          <span>{isSelected ? 'ADDED TO SLIP ✓' : 'UNLOCK ENTRY 🔓'}</span>
        </button>
      </div>

    </div>
  );
}
