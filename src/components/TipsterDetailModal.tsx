import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, ChevronDown, ChevronUp, AlertCircle, Sparkles, Trophy, Clock } from 'lucide-react';
import { Tipster } from '../types';
import { MOCK_TIPS } from '../data/mockTips';
import TipsterAvatar from './TipsterAvatar';

interface TipsterDetailModalProps {
  isOpen: boolean;
  tipster: Tipster | null;
  onClose: () => void;
  userCountryCode?: string;
  selectedTipIds?: string[];
  onToggleTip?: (id: string) => void;
  mia60ExpiryTime?: number;
  isMia60Expired?: boolean;
  onOpenHistory?: () => void;
}

interface CountryPrice {
  name: string;
  flag: string;
  priceText: string;
  code: string;
}

const COUNTRY_PRICES: CountryPrice[] = [
  { name: 'Tanzania', flag: '🇹🇿', priceText: '35,000 Tsh', code: 'TZ' },
  { name: 'Kenya', flag: '🇰🇪', priceText: '2,500 KES', code: 'KE' },
  { name: 'Uganda', flag: '🇺🇬', priceText: '60,000 UGX', code: 'UG' },
  { name: 'Ghana', flag: '🇬🇭', priceText: '300 CEDI', code: 'GH' },
  { name: 'Nigeria', flag: '🇳🇬', priceText: '30,000 NGN', code: 'NG' },
  { name: 'Other Countries', flag: '🌍', priceText: '45$', code: 'OTHER' },
];

export default function TipsterDetailModal({
  isOpen,
  tipster,
  onClose,
  userCountryCode = 'TZ',
  selectedTipIds = [],
  onToggleTip = () => {},
  mia60ExpiryTime,
  isMia60Expired,
  onOpenHistory = () => {}
}: TipsterDetailModalProps) {
  // Find the country selection automatically based on the user's country code (e.g. from session)
  const selectedCountry = COUNTRY_PRICES.find(cp => cp.code === userCountryCode) || COUNTRY_PRICES[0];
  const isLiveCapital = tipster ? ['t-12', 't-13', 't-14', 't-15'].includes(tipster.id) : false;
  
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 8, minutes: 4, seconds: 59 });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Custom states for Regular Free Tipsters (Grouping tips as multi-match Tickets like old app)
  const [ticketTheme, setTicketTheme] = useState<'yellow' | 'black' | 'white'>('black');
  const [viewMode, setViewMode] = useState<'ticket' | 'cards'>('ticket');
  const [showPastHistory, setShowPastHistory] = useState(false);

  // Real-time ticking countdown timer linked with persistent expiry time
  useEffect(() => {
    if (!isOpen || !mia60ExpiryTime) return;

    const updateTimer = () => {
      const diff = mia60ExpiryTime - Date.now();
      if (diff <= 0) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        if (isLiveCapital) {
          onClose();
        }
      } else {
        const totalSecs = Math.floor(diff / 1000);
        const hours = Math.floor(totalSecs / 3600);
        const minutes = Math.floor((totalSecs % 3600) / 60);
        const seconds = totalSecs % 60;
        setCountdown({ hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isOpen, mia60ExpiryTime, onClose, isLiveCapital]);

  if (!isOpen || !tipster) return null;

  // Assign specific odds based on which tipster is selected to keep it contextual
  const getTipsterOdds = (name: string): string => {
    switch (name.toUpperCase()) {
      case 'MIA 60': return '10.30';
      case 'FORTY4': return '15.15';
      case 'TAZAR': return '8.50';
      case 'MR 10+ ODDS': return '12.40';
      case 'VIP FIXED DRAW': return '11.50';
      case 'VIP HT FT': return '25.00';
      case 'VIP ROLL OVER': return '5.50';
      case 'VIP 10+ VIP ODDS': return '14.20';
      default: return '10.30';
    }
  };

  const isPremiumChannel = !['t-2', 't-3', 't-4', 't-5'].includes(tipster.id);
  const tipsterTips = MOCK_TIPS.filter((tip) => tip.tipsterId === tipster.id);
  const currentOdds = getTipsterOdds(tipster.name);

  // Dynamic VIP custom description builder
  const getVipDescription = () => {
    const nameUpper = tipster.name.toUpperCase();
    if (nameUpper.includes('DRAW')) {
      return {
        title: "👑 TWO (2) GUARANTEED VIP SURE DRAW SELECTIONS!",
        intro: "This is your golden opportunity to make a consistent profit with expert safety! Our elite team at Prime Picks analyzed the stats to deliver exactly two (2) highly reliable DRAW selections (Sure & Fixed Draws) with a high probability of success.",
        details: "These selections are meticulously curated after analyzing head-to-head statistics, defensive structures, and leagues with a strong historical draw rate, giving us an exceptional winning streak since launch (over 98% accuracy streak).",
        bullets: [
          "Exactly 2 premium fixed draw selections sent directly to your phone several hours before kick-off.",
          "Add to our exclusive VIP WhatsApp/Telegram group with 2 FULL MONTHS (60 Days VIP Access) - zero extra or hidden charges!",
          "Real-time staking tips and money management guidelines to safely grow your capital."
        ]
      };
    } else if (nameUpper.includes('HT') || nameUpper.includes('FT')) {
      return {
        title: "👑 TWO (2) SPECIAL VIP HT/FT DOUBLE SELECTIONS!",
        intro: "Unlock high-yield double predictions with absolute safety! Our specialists have hand-picked exactly two (2) Half-Time/Full-Time (HT/FT) dual-result selections with incredible value and high confidence.",
        details: "HT/FT dual predictions offer unmatched high odds. Backed by solid research of first-half momentum, technical strategies, and physical fitness levels, this plan aims to achieve remarkable returns on investment.",
        bullets: [
          "Exactly 2 premium VIP HT/FT matches sent directly to your phone several hours before execution.",
          "Join our private VIP WhatsApp/Telegram channel with full 2 MONTHS (60 Days VIP Access) included today!",
          "Full professional backing, with strategic guidelines to optimize your stakes for guaranteed profits."
        ]
      };
    } else if (nameUpper.includes('10+')) {
      return {
        title: "👑 PREMIUM COMBINED 10+ ODDS VIP SLIPS!",
        intro: "Maximize your daily returns with our high-yield multi-bet formulas! For our 10+ VIP Odds channel, the number of matches is select and dynamic, provided depending on the daily game quality to safely reach a solid 10+ multiplier.",
        details: "We do not force a fixed number of games. Instead, we select high-value games depending on the day's opportunities, meticulously combining them into a safe slip to consistently cross the 10+ odds threshold.",
        bullets: [
          "Daily selections of highly vetted matches tailored specifically to hit over 10+ composite odds safely.",
          "Automatic invitation to our exclusive private 2-MONTH (60 Days VIP Access) WhatsApp channel.",
          "Actionable advice on bankroll management to navigate daily variations and compound your winnings."
        ]
      };
    } else {
      return {
        title: `👑 ${tipster.name.toUpperCase()} VIP GUARANTEED ADVANTAGE!`,
        intro: "Gain access to the ultimate expert projections with elite market sports analysis! Specially audited by our premier team to ensure maximum safety and professional value.",
        details: "This high-accuracy stream is tailored to deliver consistent winning records and help you secure long-term success with precise risk-mitigation guidelines.",
        bullets: [
          "Curated VIP coupon selections sent straight to your phone ahead of the match day.",
          "Full 2-MONTH (60 Days VIP Access) membership to our premium network with instant updates.",
          "Strategic guidelines for stake amounts and money management to minimize risk."
        ]
      };
    }
  };

  // Formatting helper for double digits (08h 04m 59s)
  const formatTimeToken = (num: number) => num.toString().padStart(2, '0');

  // Trigger professional WhatsApp contact with custom pre-filled messaging
  const handleBuyNow = () => {
    const adminPhone = '255704242433';
    const randomTicketId = Math.floor(100000 + Math.random() * 900000);
    
    let message = '';
    if (isLiveCapital) {
      message = `⭐ [PRIME SELECTIONS - LIVE CAPITAL CHANCE] ⭐

Greeting Admin, I would like to get access to the live capital betslip of [${currentOdds} Odds].

📊 DETAILS:
- Tipster Channel: ${tipster.name}
- Member Region: ${selectedCountry.name}
- Status: Live Ticket Active ⚡
- Booking Reference: PLX-${randomTicketId}

Please process my prompt booking request and send my ticket code link now. Thank you!`;
    } else {
      message = `⭐ [PRIME SELECTIONS VIP - 2 MONTHS] ⭐

Greeting Admin, I would like to proceed with the exclusive premium ticket of [${currentOdds} Odds].

📊 DETAILS:
- Tipster Channel: ${tipster.name}
- Member Region: ${selectedCountry.name}
- Guaranteed Price: ${selectedCountry.priceText}
- Subscription Period: 2 Months (Special VIP Access) 👑
- Booking Reference: PLX-${randomTicketId}

Please process my prompt booking request and send my ticket code link now. Thank you!`;
    }
    
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="tipster-detail-modal-root" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-md">
      {/* Background click closes */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 150 }}
        className="w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-[#0A0D14] border-t sm:border border-slate-800/60 rounded-t-[32px] sm:rounded-3xl p-4 sm:p-6 relative flex flex-col max-h-[92vh] shadow-2xl z-10 font-sans"
      >
        {/* DRAG / SLIDE TOP ACCENT FOR MOBILE ACCORDING TO FRAMES */}
        <div className="w-12 h-1 bg-slate-800/80 rounded-full mx-auto mb-4 shrink-0 sm:hidden" />

        {/* TOP BAR WITH TIPSTER IDENTIFIER */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/40 shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative">
              <TipsterAvatar 
                name={tipster.name} 
                id={tipster.id} 
                sizeClassName="w-8 h-8 ring-2 ring-slate-800"
              />
              {tipster.isVerified && (
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-slate-950 flex items-center justify-center text-[6px] font-bold text-slate-950">✓</span>
              )}
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tipster Profile</p>
              <h4 className="text-xs font-black text-white">{tipster.name}</h4>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 px-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 font-bold"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>

        {isPremiumChannel ? (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Scrollable Contents info */}
            <div className="flex-1 overflow-y-auto scrollbar-none space-y-4 pr-0.5 pb-2">
              {isLiveCapital ? (
                <div className="space-y-4 text-left">
                  {/* 1. BET COMPANIES CONTAINER */}
                  <div className="space-y-2 colbet-sportybet-deck">
                    <h4 className="text-[11px] font-black uppercase text-slate-350 tracking-wider font-sans">
                      Bet Companies
                    </h4>
                    <div className="grid grid-cols-4 gap-1.5 items-center">
                      {/* Coldbet Badge */}
                      <div id="colbet-badge" className="bg-[#050C14] border border-cyan-500/20 rounded-lg py-2.5 px-1 text-center font-bold text-[9px] text-[#00E5FF] font-sans h-10 flex items-center justify-center tracking-widest leading-none select-none">
                        COLDBET
                      </div>
                      {/* Sportybet Badge */}
                      <div id="sportybet-badge" className="bg-[#E91E63] rounded-lg py-2 px-1 text-center font-black text-[9px] text-white font-sans h-10 flex items-center justify-center tracking-tighter leading-none select-none uppercase">
                        SPORTY<span className="bg-white text-[#E91E63] px-1 rounded ml-0.5 text-[8px] font-black">BET</span>
                      </div>
                      {/* Sokabet Badge */}
                      <div id="sokabet-badge" className="bg-white rounded-lg py-2 px-1 text-center font-black text-[9.5px] text-slate-955 font-sans h-10 flex items-center justify-center leading-none select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-0.5 inline-block shrink-0 ring-1 ring-black" />
                        SOKABET
                      </div>
                      {/* betPawa Badge */}
                      <div id="betpawa-badge" className="bg-white rounded-lg py-2 px-1 text-center font-black text-[9px] text-[#00D775] font-sans h-10 flex items-center justify-center leading-none select-none">
                        bet<span className="text-slate-950">Pawa</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. HOW TO ACCESS TICKET COMPONENT */}
                  <div id="access-guide-deck" className="border border-slate-800 rounded-xl bg-slate-955/40 p-2.5 transition-all">
                    <button
                      onClick={() => setIsGuideOpen(!isGuideOpen)}
                      className="w-full flex items-center justify-between text-left text-[9px] font-black uppercase text-slate-300 tracking-wider font-sans outline-none cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        HOW TO ACCESS TICKET (TIPOVA LIVE BET)
                      </span>
                      <span className="text-slate-500 text-[8px] tracking-widest flex items-center gap-0.5">
                        {isGuideOpen ? 'HIDE GUIDE ▲' : 'VIEW GUIDE ▼'}
                      </span>
                    </button>
                    {isGuideOpen && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-900 text-[10px] text-slate-400 font-semibold space-y-1.5 leading-relaxed">
                        <p className="text-xs text-orange-400 font-extrabold leading-tight">
                          Easy instructions to access your Live Bet Ticket:
                        </p>
                        <p>1. Ensure your betting account has the minimum balance required for your desired stake.</p>
                        <p>2. Select any of the supported bookmaker companies highlighted above.</p>
                        <p>3. Tap the green <strong className="text-[#00E676] uppercase">Buy betslip</strong> button below to secure the dynamic slip code or obtain these exact live selections directly from our WhatsApp Admin!</p>
                        <p className="text-[9.5px] text-slate-500 font-bold border-l-2 border-orange-500/30 pl-2 mt-1">
                          Caution: Live bets lock very quickly depending on game events, take action instantly today!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* GREEN AUTOMATIC LIVE COUNTDOWN TIMER - SHOWN ABOVE THE CARD */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-1.5 shadow-md">
                    <div className="flex items-center gap-2 text-left">
                      <Clock className="w-4 h-4 text-[#00E676] animate-pulse shrink-0" />
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 font-mono">MATCH STATUS</p>
                        <p className="text-[10px] font-extrabold text-slate-200">ACTIVE - STARTING SOON</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 font-mono">TIME REMAINING</p>
                      <p className="text-xs font-mono font-black text-[#00E676] tracking-wider animate-pulse mt-0.5 font-bold">
                        {formatTimeToken(countdown.hours)}h : {formatTimeToken(countdown.minutes)}m : {formatTimeToken(countdown.seconds)}s
                      </p>
                    </div>
                  </div>

                  {/* 3. TRANSVERSE ORGANIC BLURRY GRADIENT CARD */}
                  <div id="organic-locked-glass-betslip" className="relative overflow-hidden w-full h-[320px] bg-slate-950 rounded-[32px] border border-slate-800 select-none flex flex-col justify-between p-4 shadow-2xl">
                    {/* Organic animated gradient mesh blur backing */}
                    <div className="absolute inset-0 bg-slate-950 pointer-events-none" />
                    <div className="absolute top-[20%] left-[10%] w-52 h-52 bg-[#00E676]/20 rounded-full filter blur-[40px] mix-blend-screen animate-pulse pointer-events-none" />
                    <div className="absolute bottom-[10%] right-[10%] w-60 h-60 bg-cyan-500/25 rounded-full filter blur-[50px] mix-blend-screen pointer-events-none" />
                    <div className="absolute top-[40%] right-[30%] w-40 h-40 bg-blue-600/15 rounded-full filter blur-[35px] pointer-events-none" />

                    {/* Header info bar */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <span className="text-[7.5px] font-black uppercase text-slate-400 tracking-widest font-mono bg-black/40 px-2 py-0.5 rounded-md border border-slate-850/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        {tipster.name.toUpperCase()} LIVE BET
                      </span>
                      <span className="text-[10px] font-mono font-black text-[#00E676] bg-slate-950/40 px-2.5 py-0.5 rounded-md">
                        @{currentOdds} ODDS
                      </span>
                    </div>

                    {/* Inner glassmorphic lock card body */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-3.5">
                      {/* View betslip translucent container - clickable to WhatsApp */}
                      <div 
                        onClick={handleBuyNow}
                        className="bg-slate-950/70 hover:bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg max-w-[200px] cursor-pointer transition-all active:scale-95 text-white text-[11px] font-black uppercase tracking-wider z-20"
                      >
                        <span>View betslip</span>
                        <Eye className="w-3.5 h-3.5 text-[#00E676]" />
                      </div>
                    </div>

                    {/* Footer details */}
                    <div className="relative z-10 w-full flex items-center justify-between text-[7px] text-slate-400 font-black tracking-widest uppercase opacity-75">
                      <span>100% EXCLUSIVE SURE</span>
                      <span>ACCURACY: {tipster.accuracy}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-left space-y-4">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/30 p-2.5 rounded-xl animate-pulse">
                    <Sparkles className="w-4 h-4 text-orange-400 animate-spin" style={{ animationDuration: '4s' }} />
                    <span className="text-[10px] font-black uppercase text-orange-450 tracking-wider">
                      PREMIUM VIP GUARANTEED TICKET 👑
                    </span>
                  </div>
                  
                  {/* DYNAMIC VIP DESCRIPTION EXPLANATION */}
                  {(() => {
                    const desc = getVipDescription();
                    return (
                      <div className="space-y-3 bg-[#080B12] border border-slate-800/85 p-4.5 rounded-2xl relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <p className="text-[11px] font-black text-[#00E676] leading-snug flex items-center gap-1.5 uppercase tracking-wide font-sans">
                          {desc.title}
                        </p>
                        
                        <div className="text-[11.5px] text-slate-200 leading-relaxed space-y-2.5 font-sans font-bold">
                          <p>{desc.intro}</p>
                          <p className="text-slate-350 text-[11px] font-semibold">{desc.details}</p>
                        </div>

                        <div className="border-t border-slate-800/60 pt-3 mt-1 space-y-2 text-[10.5px] text-slate-300 font-semibold font-sans">
                          <p className="text-xs text-amber-300 font-black flex items-center gap-1 uppercase">
                            <span>💎</span> WHAT YOU GET BY JOINING TODAY:
                          </p>
                          <ul className="space-y-1.5 list-none pl-0.5">
                            {desc.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                <span className="text-amber-400 font-bold shrink-0">✓</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}

                  {/* BEI YA SUBSCRIPTION (PRICES WITH FULL LENGTH COUNTRY NAMES) */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4.5 space-y-3.5 shadow-lg">
                    <p className="text-[9.5px] font-black text-slate-400 uppercase tracking-widest text-left border-b border-slate-800 pb-2 flex justify-between items-center bg-black/20 px-2.5 py-1.5 rounded-md leading-none">
                      <span className="font-mono">SUBSCRIPTION FEES (VIP FEES)</span>
                      <span className="text-orange-400 bg-orange-500/15 px-2.5 py-1 rounded font-mono text-[8px] font-black">2 MONTHS ACCESS</span>
                    </p>
                    
                    <div className="space-y-2 text-[11px] font-bold text-slate-300">
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-850/40">
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none">🇹🇿</span>
                          <span className="tracking-wide text-slate-200">TANZANIA</span>
                        </span>
                        <strong className="font-mono text-white text-[12px]">35,000 TSH</strong>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-850/40 font-sans">
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none">🇰🇪</span>
                          <span className="tracking-wide text-slate-200">KENYA</span>
                        </span>
                        <strong className="font-mono text-white text-[12px]">2,500 KES</strong>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-850/40 font-sans">
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none">🇺🇬</span>
                          <span className="tracking-wide text-slate-200">UGANDA</span>
                        </span>
                        <strong className="font-mono text-white text-[12px]">60,000 UGX</strong>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-850/40 font-sans">
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none">🇳🇬</span>
                          <span className="tracking-wide text-slate-200">NIGERIA</span>
                        </span>
                        <strong className="font-mono text-white text-[12px]">30,000 NGN</strong>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-850/40 font-sans">
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none">🇬🇭</span>
                          <span className="tracking-wide text-slate-200">GHANA</span>
                        </span>
                        <strong className="font-mono text-white text-[12px]">300 CEDI</strong>
                      </div>
                      <div className="flex justify-between items-center py-1.5 font-sans">
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none">🌍</span>
                          <span className="tracking-wide text-slate-200">GLOBAL / OTHER COUNTRIES</span>
                        </span>
                        <strong className="font-mono text-white text-[12px]">45 USD ($)</strong>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-orange-500/20 rounded-xl p-2.5 text-[8.5px] text-orange-300 text-center font-bold font-sans leading-normal">
                      ⚠️ Pay today only once to begin receiving all VIP predictions for a full 60 days (2 Months) with absolutely no further premium requirements!
                    </div>
                  </div>

                  {/* CLICK HERE TO SEE LAST DAYS HISTO BUTTON */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowPastHistory(!showPastHistory)}
                      className="w-full bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-amber-300 hover:text-white border border-amber-500/25 hover:border-amber-400 font-black py-3 px-4 rounded-2xl transition-all duration-200 outline-none text-center flex flex-col items-center justify-center gap-1 cursor-pointer text-[11px] uppercase tracking-wider shadow-lg shadow-amber-500/5"
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-400 animate-bounce" style={{ animationDuration: '3s' }} />
                        <span className="font-sans font-black tracking-wider">
                          {showPastHistory ? "▲ CLICK HERE TO HIDE LAST DAYS HISTO ▲" : "👉 CLICK HERE TO SEE LAST DAYS HISTO 🏆"}
                        </span>
                      </div>
                      <span className="text-[8.5px] text-slate-455 font-bold uppercase tracking-wide leading-none font-sans">
                        {showPastHistory ? "Tap here to hide historic archive" : "Tap here to view past results!"}
                      </span>
                    </button>
                  </div>

                  {/* HISTORICAL COMPLETED TICKETS (SHOWN ONLY ON CLICK) */}
                  {showPastHistory && (
                    <div className="border-l border-r border-amber-500/15 px-3.5 py-4 bg-[#05070D] border border-slate-900 rounded-3xl mt-1.5 space-y-4">
                      <p className="text-[9px] font-black font-mono text-amber-400 uppercase tracking-widest text-center border-b border-slate-900 pb-2.5">
                        🏆 WINNING HISTORY TRACK RECORDS 🏆
                      </p>

                      {/* RANGI YA KARATASI CONTROLLER FOR THE HISTORY TRACKS */}
                      <div className="flex flex-col gap-1 bg-slate-900/40 border border-slate-800/80 p-2.5 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-black uppercase text-slate-455 tracking-wider font-mono">Ticket theme:</span>
                          <span className="text-[8px] text-amber-400 font-mono font-bold">Select Colour</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            type="button"
                            onClick={() => setTicketTheme('yellow')}
                            className={`py-1.5 px-2 text-[8px] font-bold rounded-lg border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                              ticketTheme === 'yellow'
                                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                                : 'bg-slate-950 text-slate-455 border-slate-900 hover:text-white'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-400 border border-slate-950/20" />
                            <span>YELLOW</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setTicketTheme('black')}
                            className={`py-1.5 px-2 text-[8px] font-bold rounded-lg border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                              ticketTheme === 'black'
                                ? 'bg-slate-800 text-white border-slate-600 shadow-md'
                                : 'bg-slate-950 text-slate-455 border-slate-900 hover:text-white'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
                            <span>BLACK</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setTicketTheme('white')}
                            className={`py-1.5 px-2 text-[8px] font-bold rounded-lg border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                              ticketTheme === 'white'
                                ? 'bg-white text-slate-950 border-slate-300 shadow-md'
                                : 'bg-slate-950 text-slate-455 border-slate-900 hover:text-white'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-white border border-slate-300" />
                            <span>WHITE</span>
                          </button>
                        </div>
                      </div>

                      {/* HISTORY TICKETS MAP */}
                      {(() => {
                        const groupedTipsByDate = tipsterTips.reduce((groups: Record<string, typeof tipsterTips>, tip) => {
                          const dateKey = tip.date || 'Today';
                          if (!groups[dateKey]) {
                            groups[dateKey] = [];
                          }
                          groups[dateKey].push(tip);
                          return groups;
                        }, {});

                        const dateOrder = ['Today', 'Yesterday', '2 Days Ago', '3 Days Ago'];
                        const sortedDates = Object.keys(groupedTipsByDate).sort((a, b) => {
                          const indexA = dateOrder.indexOf(a);
                          const indexB = dateOrder.indexOf(b);
                          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                          if (indexA !== -1) return -1;
                          if (indexB !== -1) return 1;
                          return b.localeCompare(a);
                        });

                        const historyDates = sortedDates.filter(d => d !== 'Today' && d !== 'Tomorrow');

                        if (historyDates.length === 0) {
                          return (
                            <div className="py-6 text-center text-[10px] text-slate-500 italic bg-slate-950/40 rounded-xl border border-slate-900">
                              No past history has been published yet for this channel.
                            </div>
                          );
                        }

                        const isYellow = ticketTheme === 'yellow';
                        const isWhite = ticketTheme === 'white';

                        const cardBg = isYellow ? 'bg-amber-400' : isWhite ? 'bg-white' : 'bg-[#0F121C]';
                        const textColor = isYellow ? 'text-slate-955' : isWhite ? 'text-slate-900' : 'text-white';
                        const textMuted = isYellow ? 'text-slate-800' : isWhite ? 'text-slate-500' : 'text-slate-400';
                        const tableDivider = isYellow ? 'border-slate-955/15' : isWhite ? 'border-slate-200' : 'border-slate-800/80';
                        const headerBg = isYellow ? 'bg-black text-amber-400' : isWhite ? 'bg-slate-100 text-slate-800' : 'bg-slate-950 text-orange-400';

                        const getFormattedDateLabel = (dateStr: string) => {
                          const now = new Date();
                          const format = (d: Date) => {
                            const day = String(d.getDate()).padStart(2, '0');
                            const month = String(d.getMonth() + 1).padStart(2, '0');
                            const year = d.getFullYear();
                            return `${day}.${month}.${year}`;
                          };

                          if (dateStr === 'Yesterday') {
                            const d = new Date();
                            d.setDate(now.getDate() - 1);
                            return `YESTERDAY COMPLETED VIP - ${format(d)} 🏆`;
                          }
                          if (dateStr === '2 Days Ago') {
                            const d = new Date();
                            d.setDate(now.getDate() - 2);
                            return `2 DAYS AGO COMPLETED VIP - ${format(d)} 🏆`;
                          }
                          return dateStr;
                        };

                        return historyDates.map((dateStr) => {
                          const dateTips = groupedTipsByDate[dateStr];
                          const totalOdds = dateTips.reduce((prod, t) => prod * t.odds, 1).toFixed(2);
                          const formattedTitle = getFormattedDateLabel(dateStr);

                          return (
                            <div key={dateStr} className="bg-slate-950 rounded-2xl border border-slate-900/80 overflow-hidden shadow-xl text-left">
                              <div className={`text-center py-2 font-black tracking-widest font-mono text-[8.5px] ${headerBg} border-b border-slate-900 flex justify-center items-center gap-1.5`}>
                                <span>{formattedTitle}</span>
                              </div>

                              <div className={`${cardBg} ${textColor} p-3 transition-all text-[11px] relative`}>
                                <div className={`flex text-[7.5px] font-black uppercase text-center pb-1.5 mb-1.5 border-b ${tableDivider} tracking-wider opacity-90`}>
                                  <div className="w-[50%] text-left">MATCH</div>
                                  <div className="w-[26%] text-center">TIP</div>
                                  <div className="w-[12%] text-center font-mono">ODDS</div>
                                  <div className="w-[12%] text-center">RES</div>
                                </div>

                                <div className="space-y-2">
                                  {dateTips.map((tip) => (
                                    <div key={tip.id} className={`flex py-1.5 items-center text-center border-b ${tableDivider} last:border-b-0`}>
                                      <div className="w-[50%] text-left pr-1.5 leading-tight flex flex-col justify-center">
                                        <span className="font-extrabold block text-xs leading-tight tracking-tight break-words">
                                          {tip.teams[0]} <span className="text-red-500 font-extrabold mx-0.5 lowercase text-[10px]">vs</span> {tip.teams[1]}
                                        </span>
                                      </div>

                                      <div className="w-[26%] text-center font-black tracking-tight text-[10px] px-0.5 leading-tight break-words">
                                        {tip.tip}
                                      </div>

                                      <div className="w-[12%] text-center font-black font-mono text-[10px]">
                                        {tip.odds.toFixed(2)}
                                      </div>

                                      <div className="w-[12%] flex items-center justify-center">
                                        {tip.status === 'won' ? (
                                          <div className="bg-emerald-500 text-white font-black text-[7px] px-1.5 rounded flex items-center justify-center py-0.5 leading-none shadow-sm uppercase tracking-wide">
                                            <span>✓ WON</span>
                                          </div>
                                        ) : (
                                          <span className={`font-mono text-[9px] font-black ${isYellow ? 'text-slate-855' : isWhite ? 'text-slate-550' : 'text-slate-450'}`}>
                                            ?-?
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className={`flex items-center justify-between border-t ${tableDivider} pt-2 mt-2`}>
                                  <span className={`text-[7px] uppercase tracking-wider font-extrabold ${textMuted}`}>
                                    🏆 SECURED WINNING
                                  </span>
                                  <div className="flex items-center gap-1 font-mono">
                                    <span className="text-[8px] font-black text-slate-500 tracking-wider">
                                      TOTAL ODDS:
                                    </span>
                                    <span className={`text-xs font-black ${isYellow ? 'text-slate-955 underline' : isWhite ? 'text-orange-600' : 'text-orange-400'}`}>
                                      @{totalOdds}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  )}

                  {/* SUPPORTED BOOKMAKERS COMPACT LOGS */}
                  <div className="bg-[#070A0F]/50 border border-slate-850 p-3 rounded-xl text-center space-y-1">
                    <p className="text-[8px] text-slate-500 uppercase tracking-widest font-black leading-none font-sans">SUPPORTED BOOKMAKERS</p>
                    <p className="text-[10px] text-slate-400 font-bold">Coldbet &bull; Sportybet &bull; Sokabet &bull; betPawa &bull; 1xBet &bull; WasafiBet</p>
                  </div>
                </div>
              )}
            </div>

            {/* STICKY FOOTER IN VIP */}
            <div className="shrink-0 pt-3 border-t border-slate-900/60 mt-1.5 bg-[#0A0D14] z-10">
              {isLiveCapital ? (
                /* NEON GREEN SOLID EXTREMELY BRIGHT BUY BUTTON */
                <button
                  id="buy-betslip-btn"
                  onClick={handleBuyNow}
                  className="w-full bg-[#00E676] hover:bg-[#00c853] text-slate-950 font-black py-4 rounded-2xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/20 text-center flex flex-col items-center justify-center cursor-pointer border-none outline-none group text-xs uppercase tracking-widest font-black"
                >
                  <span className="text-slate-955 text-xs font-black uppercase tracking-widest leading-none">
                    Buy betslip
                  </span>
                </button>
              ) : (
                /* SUPER INTERACTIVE GLOWING CALL-TO-ACTION BUTTON (MESSAGE ADMIN) */
                <button
                  onClick={handleBuyNow}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black py-4 rounded-2xl transition-all duration-300 shadow-2xl active:scale-95 outline-none text-center flex flex-col items-center justify-center cursor-pointer border-2 border-emerald-400 group animate-pulse"
                  style={{
                    animationDuration: '1.2s',
                    boxShadow: '0 0 25px rgba(16,185,129,0.5)'
                  }}
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span className="text-slate-950 text-xs font-black uppercase tracking-wider">
                      CLICK HERE TO MESSAGE ADMIN 💬
                    </span>
                  </div>
                  <span className="text-[8px] text-slate-900 font-bold uppercase mt-1 leading-none tracking-normal font-sans">
                    CLICK HERE TO BECOME A VIP MEMBER NOW
                  </span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden text-left font-sans">
            <div className="flex-1 overflow-y-auto scrollbar-none space-y-4 pr-0.5 pb-2">
              {/* TICKET THEME CONTROLLER & OWNER BANNER */}
            <div className="mb-4 space-y-3 font-sans">
              {/* TICKET THEME CONTROLLER */}
              <div className="flex flex-col gap-1 bg-slate-900/30 border border-slate-800/60 p-2 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Ticket Theme Color:</span>
                  <span className="text-[8px] text-slate-500 font-mono">Select Theme Above</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setTicketTheme('yellow')}
                    className={`py-1.5 px-2 text-[8px] font-bold rounded-lg border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      ticketTheme === 'yellow'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 border border-slate-950/20" />
                    <span>YELLOW</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTicketTheme('black')}
                    className={`py-1.5 px-2 text-[8px] font-bold rounded-lg border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      ticketTheme === 'black'
                        ? 'bg-slate-855 text-white border-slate-600 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
                    <span>BLACK</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTicketTheme('white')}
                    className={`py-1.5 px-2 text-[8px] font-bold rounded-lg border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      ticketTheme === 'white'
                        ? 'bg-white text-slate-950 border-slate-300 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white border border-slate-300" />
                    <span>WHITE</span>
                  </button>
                </div>
              </div>

              {/* OWNER WHATSAPP BANNER */}
              <a
                href="https://wa.me/255704242433?text=Hello%20Admin,%2520I%2520would%2520like%2520to%2520join%2520the%2520Premium%2520VIP%252520Group"
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.98] transition-all text-slate-950 text-center py-2 px-3 rounded-xl font-black text-[9px] uppercase tracking-wider shadow-lg border border-amber-400 flex items-center justify-center gap-1"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
                </span>
                <span>CLICK HERE MESSAGE OWNER +255 704 242 433 🏆</span>
              </a>
            </div>

            {/* LIST OF ACTIVE/PASSED TIPS RENDERED DIRECTLY */}
            <div className="space-y-4 mb-2">
              {(() => {
                // Group tipster predictions by date
                const groupedTipsByDate = tipsterTips.reduce((groups: Record<string, typeof tipsterTips>, tip) => {
                  const dateKey = tip.date || 'Today';
                  if (!groups[dateKey]) {
                    groups[dateKey] = [];
                  }
                  groups[dateKey].push(tip);
                  return groups;
                }, {});

                const dateOrder = ['Today', 'Yesterday', '2 Days Ago', '3 Days Ago'];
                const sortedDates = Object.keys(groupedTipsByDate).sort((a, b) => {
                  const indexA = dateOrder.indexOf(a);
                  const indexB = dateOrder.indexOf(b);
                  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;
                  return b.localeCompare(a);
                });

                if (sortedDates.length === 0) {
                  return (
                    <div className="py-8 text-center text-xs text-slate-500 italic bg-slate-950/40 rounded-2xl border border-slate-850">
                      No predictions posted yet.
                    </div>
                  );
                }

                const isYellow = ticketTheme === 'yellow';
                const isWhite = ticketTheme === 'white';

                const cardBg = isYellow ? 'bg-amber-400' : isWhite ? 'bg-white' : 'bg-[#0F121C]';
                const textColor = isYellow ? 'text-slate-950' : isWhite ? 'text-slate-900' : 'text-white';
                const textMuted = isYellow ? 'text-slate-800' : isWhite ? 'text-slate-500' : 'text-slate-400';
                const tableDivider = isYellow ? 'border-slate-950/15' : isWhite ? 'border-slate-200' : 'border-slate-800/80';
                const headerBg = isYellow ? 'bg-black text-amber-400' : isWhite ? 'bg-slate-100 text-slate-800' : 'bg-slate-950 text-orange-400';

                const getFormattedDateLabel = (dateStr: string) => {
                  const now = new Date();
                  const format = (d: Date) => {
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const year = d.getFullYear();
                    return `${day}.${month}.${year}`;
                  };

                  if (dateStr === 'Today') {
                    return `TODAY - ${format(now)}`;
                  }
                  if (dateStr === 'Yesterday') {
                    const d = new Date();
                    d.setDate(now.getDate() - 1);
                    return `YESTERDAY - ${format(d)} 🏆`;
                  }
                  if (dateStr === '2 Days Ago') {
                    const d = new Date();
                    d.setDate(now.getDate() - 2);
                    return `2 DAYS AGO - ${format(d)} 🏆`;
                  }
                  if (dateStr === '3 Days Ago') {
                    const d = new Date();
                    d.setDate(now.getDate() - 3);
                    return `3 DAYS AGO - ${format(d)} 🏆`;
                  }
                  return dateStr;
                };

                return sortedDates.map((dateStr) => {
                  const dateTips = groupedTipsByDate[dateStr];
                  const totalOdds = dateTips.reduce((prod, t) => prod * t.odds, 1).toFixed(2);
                  const formattedTitle = getFormattedDateLabel(dateStr);

                  return (
                    <div key={dateStr} className="bg-slate-950 rounded-2xl border border-slate-900/80 overflow-hidden shadow-xl text-left">
                      {/* TICKET HEADER BAR OUTLINE */}
                      <div className={`text-center py-2 font-black tracking-widest font-mono text-[9px] ${headerBg} border-b border-slate-900`}>
                        {formattedTitle}
                      </div>

                      {/* MATCH TICKET CONTAINER */}
                      <div className={`${cardBg} ${textColor} p-3 transition-all text-[11px]`}>
                        {/* GRID TABLE HEADERS */}
                        <div className={`flex text-[7.5px] font-black uppercase text-center pb-1.5 mb-1.5 border-b ${tableDivider} tracking-wider opacity-90`}>
                          <div className="w-[50%] text-left">MATCH</div>
                          <div className="w-[26%] text-center">TIP</div>
                          <div className="w-[12%] text-center font-mono">ODDS</div>
                          <div className="w-[12%] text-center">RES</div>
                        </div>

                        {/* GRID DATA ROWS */}
                        <div className="space-y-2">
                          {dateTips.map((tip) => (
                            <div key={tip.id} className={`flex py-1.5 items-center text-center border-b ${tableDivider} last:border-b-0`}>
                              {/* TEAMS */}
                              <div className="w-[50%] text-left pr-1.5 leading-tight flex flex-col justify-center">
                                <span className="font-extrabold block text-xs leading-tight tracking-tight break-words">
                                  {tip.teams[0]} <span className="text-red-500 font-extrabold mx-0.5 lowercase text-[10px]">vs</span> {tip.teams[1]}
                                </span>
                              </div>

                              {/* PICK */}
                              <div className="w-[26%] text-center font-black tracking-tight text-[10px] px-0.5 leading-tight break-words">
                                {tip.tip}
                              </div>

                              {/* ODDS */}
                              <div className="w-[12%] text-center font-black font-mono text-[10px]">
                                {tip.odds.toFixed(2)}
                              </div>

                              {/* RESULT (RES) PIL */}
                              <div className="w-[12%] flex items-center justify-center">
                                {tip.status === 'won' ? (
                                  <div className="bg-emerald-500 text-white font-black text-[7px] px-1.5 rounded flex items-center justify-center py-0.5 leading-none shadow-sm uppercase tracking-wide">
                                    <span>✓ WON</span>
                                  </div>
                                ) : (
                                  <span className={`font-mono text-[9px] font-black tracking-tighter ${isYellow ? 'text-slate-800' : isWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                                    ?-?
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* TOTAL ODDS DISPLAY CONTAINER */}
                        <div className={`flex items-center justify-between border-t ${tableDivider} pt-2.5 mt-2`}>
                          <span className={`text-[7px] uppercase tracking-wider font-extrabold ${textMuted}`}>
                            100% EXCLUSIVE SURE
                          </span>
                          <div className="flex items-center gap-1 font-mono">
                            <span className="text-[8px] font-black text-slate-500 tracking-wider">
                              TOTAL ODDS:
                            </span>
                            <span className={`text-xs font-black ${isYellow ? 'text-slate-950 underline' : isWhite ? 'text-orange-600' : 'text-orange-400'}`}>
                              {totalOdds}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
        )}
      </motion.div>
    </div>
  );
}
