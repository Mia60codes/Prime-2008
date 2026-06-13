import React, { useState, useEffect } from 'react';
import { Tipster } from '../types';
import { Lock, Eye, Clock, ShieldCheck, Flame } from 'lucide-react';

interface VipLockedCardProps {
  key?: React.Key;
  tipster: Tipster;
  isExpired: boolean;
  expiryTime: number;
  onUnlock: () => void;
}

export default function VipLockedCard({ tipster, isExpired, expiryTime, onUnlock }: VipLockedCardProps) {
  const [countdownStr, setCountdownStr] = useState<string>('');

  useEffect(() => {
    if (isExpired) {
      setCountdownStr('EXPIRED');
      return;
    }

    const updateTimer = () => {
      const diff = expiryTime - Date.now();
      if (diff <= 0) {
        setCountdownStr('EXPIRED');
      } else {
        const totalSecs = Math.floor(diff / 1000);
        const hours = Math.floor(totalSecs / 3600);
        const minutes = Math.floor((totalSecs % 3600) / 60);
        const seconds = totalSecs % 60;
        setCountdownStr(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isExpired, expiryTime]);

  const getTipsterOdds = (name: string): string => {
    switch (name.toUpperCase()) {
      case 'MIA 60': return '10.30';
      case 'FORTY4': return '15.15';
      case 'TAZAR': return '8.50';
      case 'MR 10+ ODDS': return '12.40';
      case 'VIP FIXED DRAW': return '11.55';
      case 'VIP HT FT': return '25.00';
      case 'VIP ROLL OVER': return '5.50';
      case 'VIP 10+ VIP ODDS': return '14.20';
      default: return '10.30';
    }
  };

  const getTipsterTag = (name: string): string => {
    switch (name.toUpperCase()) {
      case 'MIA 60': return 'LIVE CAPITAL 💎';
      case 'FORTY4': return 'LIVE CAP MULTIPLIER 💎';
      case 'TAZAR': return 'LIVE IN-PLAY ⚡';
      case 'MR 10+ ODDS': return '10+ IN-PLAY SECURE 🔥';
      case 'VIP FIXED DRAW': return 'DIRECT DRAW FIXED 👑';
      case 'VIP HT FT': return 'HALF TIME / FULL TIME 👑';
      case 'VIP ROLL OVER': return 'VIP MULTIPLIER ROLLOVER 📈';
      case 'VIP 10+ VIP ODDS': return '10+ PREMIUM TICKET 👑';
      default: return 'PREMIUM VIP TICKET 👑';
    }
  };

  const currentOdds = getTipsterOdds(tipster.name);
  const currentTag = getTipsterTag(tipster.name);

  return (
    <div
      id={`vip-locked-card-${tipster.id}`}
      onClick={onUnlock}
      className={`relative w-full rounded-2xl border transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer overflow-hidden shadow-xl select-none flex flex-col justify-between ${
        isExpired 
          ? 'bg-slate-950/80 border-rose-950/40 opacity-70' 
          : 'bg-gradient-to-br from-slate-900 via-slate-905 to-slate-950 border-orange-500/40 hover:border-orange-500 shadow-orange-500/5'
      }`}
    >
      {/* GLOW DECORATOR FOR ACTIVE PREMIUMS */}
      {!isExpired && (
        <span className="absolute -top-12 -right-12 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Decorative Diagonal scanline background on active premium slips */}
      {!isExpired && (
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(249,115,22,0.02)_25%,transparent_25%,transparent_50%,rgba(249,115,22,0.02)_50%,rgba(249,115,22,0.02)_75%,transparent_75%,transparent)] bg-[size:16px_16px] opacity-60 pointer-events-none" />
      )}

      {/* HEADER BAR FOR CARD */}
      <div className="p-4 pb-2 flex items-center justify-between border-b border-slate-850/40 z-10">
        <div className="flex items-center gap-1">
          <ShieldCheck className={`w-3.5 h-3.5 ${isExpired ? 'text-slate-500' : 'text-orange-400'}`} />
          <span className={`text-[9px] font-black uppercase tracking-wider ${isExpired ? 'text-slate-500' : 'text-orange-450 text-orange-400'}`}>
            {currentTag}
          </span>
        </div>

        {isExpired ? (
          <span className="text-[8px] bg-red-950/40 text-red-400 border border-red-900/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
            EXPIRED
          </span>
        ) : (
          <span className="text-[8px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1 animate-pulse">
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            LOCKED VIP
          </span>
        )}
      </div>

      {/* CONTENT AREA FOR THE VIP LOCKED SLIP */}
      <div className="p-4 flex items-center justify-between gap-3 z-10">
        
        {/* Left Side: Tipster Profile (Watu's Profile) */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={tipster.avatarUrl}
              alt={tipster.name}
              referrerPolicy="no-referrer"
              className={`w-11 h-11 rounded-xl object-cover ring-2 ${
                isExpired ? 'ring-rose-950/20' : 'ring-orange-500/30'
              }`}
            />
            {tipster.isVerified && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-black text-[8px] rounded-full flex items-center justify-center border border-slate-900">
                ✓
              </span>
            )}
          </div>

          <div className="text-left">
            <p className="text-[9px] text-slate-550 uppercase tracking-widest font-bold">VIP Specialist</p>
            <h4 className={`text-sm font-black tracking-tight leading-tight uppercase ${isExpired ? 'text-slate-400' : 'text-slate-100'}`}>
              {tipster.name}
            </h4>
            <div className="flex flex-col gap-0.5 mt-0.5">
              <span className="text-[10px] text-slate-500 font-semibold">
                Accuracy: <strong className={isExpired ? 'text-rose-450' : 'text-emerald-400'}>{tipster.accuracy}%</strong>
              </span>
              {['VIP SURE DRAWS', 'VIP FIXED DRAW'].includes(tipster.name.toUpperCase()) && (
                <div className="mt-1 flex items-center gap-1 text-[8px] bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-extrabold uppercase w-fit animate-pulse">
                  <span>🏆 JANA TULIKULA 100%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Slip Summary (Locked Visual) */}
        <div className="text-right flex flex-col justify-center">
          <p className="text-[8px] text-slate-550 uppercase tracking-widest font-black">ACCUMULATION</p>
          <p className={`text-2xl font-black font-mono tracking-tight leading-none mt-0.5 ${isExpired ? 'text-slate-500' : 'text-amber-400'}`}>
            @{currentOdds}
          </p>
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Estimated Odds</span>
        </div>
      </div>

      {/* FOOTER BAR WITH INTEGRATED COUNTER AND VIEW ACTIONS */}
      <div className="px-4 py-3 bg-slate-950/40 border-t border-slate-900/60 flex items-center justify-between z-10 gap-2">
        <div className="flex items-center gap-1.5 text-left">
          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <div className="leading-none">
            <p className="text-[8px] text-slate-500 uppercase tracking-wider font-extrabold">VALID UNTIL</p>
            <p className={`text-[10px] font-black font-mono uppercase tracking-wide mt-0.5 ${isExpired ? 'text-rose-500' : 'text-slate-200'}`}>
              {countdownStr}
            </p>
          </div>
        </div>

        {/* DECRYPT TICKET ACTUATOR */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const isLiveCapital = ['t-12', 't-13', 't-14', 't-15'].includes(tipster.id.toLowerCase());
            if (isLiveCapital && !isExpired) {
              const adminPhone = '255704242433';
              const randomTicketId = Math.floor(100000 + Math.random() * 900000);
              const message = `⭐ [PRIME SELECTIONS - LIVE CAPITAL CHANCE] ⭐

Greeting Admin, I would like to get access to the live capital betslip of [${currentOdds} Odds].

📊 DETAILS:
- Tipster Channel: ${tipster.name}
- Member Region: Tanzania
- Status: Live Ticket Active ⚡
- Booking Reference: PLX-${randomTicketId}

Please process my prompt booking request and send my ticket code link now. Thank you!`;
              const encoded = encodeURIComponent(message);
              const whatsappUrl = `https://wa.me/${adminPhone}?text=${encoded}`;
              window.open(whatsappUrl, '_blank');
            } else {
              onUnlock();
            }
          }}
          className={`px-3.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
            isExpired
              ? 'bg-rose-950/20 text-rose-400 border border-rose-900/20 hover:bg-rose-950/40'
              : 'bg-orange-500 hover:bg-orange-600 text-slate-950 hover:shadow-md hover:shadow-orange-500/10'
          }`}
        >
          <span>{isExpired ? 'VIEW STATUS' : 'VIEW BETSLIP 🔒'}</span>
        </button>
      </div>

    </div>
  );
}
