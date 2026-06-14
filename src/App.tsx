import React, { useState, useEffect } from 'react';
import { UserSession, BettingTip, Tipster } from './types';
import { MOCK_TIPS, MOCK_TIPSTERS, LIVE_BET_TIMERS_CONFIG } from './data/mockTips';
import LoginView from './components/LoginView';
import TipCard from './components/TipCard';
import AiAdvisor from './components/AiAdvisor';
import TipsterDetailModal from './components/TipsterDetailModal';
import VipLockedCard from './components/VipLockedCard';
import TipsterAvatar from './components/TipsterAvatar';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Smartphone, 
  TrendingUp, 
  Plus, 
  Trash2, 
  LogOut, 
  Calculator, 
  CheckCircle2, 
  Check, 
  Info, 
  X, 
  Search,
  ChevronRight,
  ChevronLeft,
  Shield,
  HelpCircle,
  FileText,
  User,
  Home,
  Briefcase,
  Layers,
  ArrowRight,
  Tv,
  ExternalLink,
  History,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'home' | 'all-tips' | 'ai' | 'slip' | 'account'>('home');
  const [selectedTipsCategory, setSelectedTipsCategory] = useState<'all' | 'rollover' | 'daily' | 'trending' | 'live_capital'>('all');
  const [tipsters, setTipsters] = useState<Tipster[]>(MOCK_TIPSTERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTipIds, setSelectedTipIds] = useState<string[]>([]);
  const [selectedTipForAnalysis, setSelectedTipForAnalysis] = useState<BettingTip | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number>(5000);
  const [betSubmitted, setBetSubmitted] = useState<boolean>(false);
  const [lastSubmittedCode, setLastSubmittedCode] = useState<string>('');
  
  // Custom dialogs/alerts for Profile Menu items to make it fully functional
  const [activeProfileDialog, setActiveProfileDialog] = useState<string | null>(null);
  const [selectedTipsterForModal, setSelectedTipsterForModal] = useState<Tipster | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  const [now, setNow] = useState<number>(Date.now());
  
  // Forty4 ticket expires in 11 minutes (persisted in localStorage)
  const [forty4ExpiryTime, setForty4ExpiryTime] = useState<number>(() => {
    const saved = localStorage.getItem('forty4_ticket_expiry_time');
    if (saved) {
      const val = parseInt(saved, 10);
      if (!isNaN(val)) return val;
    }
    const val = Date.now() + 11 * 60 * 1000;
    localStorage.setItem('forty4_ticket_expiry_time', val.toString());
    return val;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPremiumExpiryInfo = (id: string) => {
    const idNum = id.toLowerCase();
    
    // Check if the id of the live profile exists in our configuration
    const liveConfig = LIVE_BET_TIMERS_CONFIG[idNum];
    if (liveConfig) {
      const storageKey = `live_capital_expiry_time_${idNum}`;
      let saved = localStorage.getItem(storageKey);
      let expiryVal = saved ? parseInt(saved, 10) : 0;
      
      if (!expiryVal) {
        // Set dynamic expiry based on the customized mockTips configuration (in minutes)
        expiryVal = Date.now() + liveConfig.durationMinutes * 60 * 1000;
        localStorage.setItem(storageKey, expiryVal.toString());
      }
      
      const isExpired = Date.now() >= expiryVal;
      return { expiry: expiryVal, isExpired };
    }
    
    // Non-live standard tickets do not use a short live-countdown, let's keep them active
    return { expiry: Date.now() + 120 * 60 * 1000, isExpired: false };
  };

  // Carousel banner index state
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const banners = [
    {
      title: "MIA 60 Live Section VIP",
      subtitle: "Lock in high accuracy live bet slips from specialist Mia 60 starting at 23:10 PM today!",
      tag: "MIA 60 LIVE VIP",
      probability: "WINNING",
      riskText: "99% ACCURACY",
      color: "from-rose-950/80 via-slate-950/70 to-slate-950",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
      tipsterId: "t-12"
    },
    {
      title: "Forty4 Live Ticket VIP",
      subtitle: "Direct access to high accuracy in-play picks valid for 11 minutes only!",
      tag: "FORTY4 LIVE VIP",
      probability: "96%",
      riskText: "FAST PROFIT",
      color: "from-amber-950/80 via-slate-950/70 to-slate-950",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
      tipsterId: "t-13"
    },
    {
      title: "Tazar Live In-Play VIP",
      subtitle: "Secure high-value live odds starting from 1.5+ captured instantly in the warm heat!",
      tag: "TAZAR LIVE VIP",
      probability: "94%",
      riskText: "MICRO ACCUMULATION",
      color: "from-cyan-950/80 via-slate-950/70 to-slate-950",
      image: "https://images.unsplash.com/photo-1504305754058-2f08ccd89a0a?q=80&w=800&auto=format&fit=crop",
      tipsterId: "t-14"
    },
    {
      title: "MR 10+ Odds Premium VIP",
      subtitle: "High-yield combined betting lists with accumulative massive odds daily!",
      tag: "MR 10+ PREMIUM VIP",
      probability: "97%",
      riskText: "MAX ADVANTAGE",
      color: "from-emerald-950/80 via-slate-950/70 to-slate-950",
      image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop",
      tipsterId: "t-15"
    }
  ];

  const openTipsterDetail = (t: Tipster) => {
    const { isExpired } = getPremiumExpiryInfo(t.id);
    if (isExpired && ['t-12', 't-13', 't-14', 't-15'].includes(t.id.toLowerCase())) {
      alert("⚠️ Muda umekwisha! Tiketi hii imeshafungwa hivi sasa kutokana na muda wake kupita leo. Tafadhali wasiliana na Admin WhatsApp kujiunga na huduma ijayo mapema!");
      return;
    }
    setSelectedTipsterForModal(t);
  };

  const handleBannerClick = (tipsterId: string) => {
    const t = tipsters.find(item => item.id === tipsterId);
    if (t) {
      openTipsterDetail(t);
    }
  };

  // Auto scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Auto redirect to Flashscore as soon as the Live Score tab is active
  useEffect(() => {
    if (activeTab === 'slip') {
      const win = window.open('https://www.flashscore.com/', '_blank');
      if (!win) {
        console.warn('Flashscore automatic tab load intercepted by browser popup blocker.');
      }
    }
  }, [activeTab]);

  // Simulator loading screen on mount or session recovery
  useEffect(() => {
    const stored = localStorage.getItem('prime_picks_user_session');
    if (stored) {
      try {
        setSession(JSON.parse(stored));
      } catch (e) {
        console.error('Error reloading login status.', e);
      }
    }
    
    // Simulate Loading Betslips screen (around 1.8 seconds)
    const timeout = setTimeout(() => {
      setLoadingScreen(false);
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
    setLoadingScreen(true);
    setTimeout(() => {
      setLoadingScreen(false);
    }, 1200);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out of PRIME PICKS?')) {
      localStorage.removeItem('prime_picks_user_session');
      setSession(null);
      setSelectedTipIds([]);
      setActiveTab('home');
    }
  };

  // Follow/Unfollow handler
  const handleToggleFollow = (id: string) => {
    setTipsters(prev => prev.map(t => {
      if (t.id === id) {
        const following = !t.isFollowing;
        return {
          ...t,
          isFollowing: following,
          followersCount: following ? t.followersCount + 1 : t.followersCount - 1
        };
      }
      return t;
    }));
  };

  // Filter Tipsters list based on search bar query for Free Tips contributors
  const filteredTipsters = tipsters.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Divide into Trending Free Tips contributors, Recommended Premium, and Live Capital tipsters
  const topTipstersOrder = ['t-5', 't-2', 't-3', 't-4'];
  const topTipsters = filteredTipsters
    .filter(t => topTipstersOrder.includes(t.id))
    .sort((a, b) => topTipstersOrder.indexOf(a.id) - topTipstersOrder.indexOf(b.id));

  const otherTipsters = filteredTipsters.filter(t => 
    t.id === 't-1' || t.id === 't-7' || t.id === 't-9'
  );
  const capitalLiveTipsters = filteredTipsters.filter(t => 
    t.id === 't-12' || t.id === 't-13' || t.id === 't-14' || t.id === 't-15'
  );

  const getCurrencySymbol = (countryCode?: string) => {
    switch (countryCode) {
      case 'TZ': return 'TSh';
      case 'KE': return 'KSh';
      case 'UG': return 'USh';
      case 'RW': return 'RWF';
      case 'ZA': return 'ZAR';
      case 'NG': return '₦';
      default: return 'TSh';
    }
  };

  const currencySymbol = getCurrencySymbol(session?.countryCode);

  const formatCountdownTime = (expiry: number) => {
    const diff = expiry - now;
    if (diff <= 0) return '00:00:00';
    const totalSecs = Math.floor(diff / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleToggleSelectTip = (id: string) => {
    setSelectedTipIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedTips = MOCK_TIPS.filter((tip) => selectedTipIds.includes(tip.id));
  const totalOdds = selectedTips.reduce((acc, tip) => acc * tip.odds, 1);
  const potentialPayout = totalOdds * stakeAmount;

  const handlePlaceBet = () => {
    if (selectedTips.length === 0) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PRM-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setLastSubmittedCode(code);
    setBetSubmitted(true);
  };

  const fastStakes = [1000, 2000, 5000, 10000, 25000, 50000];

  // Filter tips based on search query (by team names or league name)
  const filteredTips = MOCK_TIPS.filter((tip) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      tip.teams[0].toLowerCase().includes(q) ||
      tip.teams[1].toLowerCase().includes(q) ||
      tip.league.toLowerCase().includes(q) ||
      tip.tip.toLowerCase().includes(q)
    );
  });

  // Sections for raw Betting tips (horizontal sliders)
  const topTipsterTips = filteredTips.filter((tip) => tip.tipsterId === 't-1' || tip.tipsterId === 't-2' || tip.tipsterId === 't-3' || tip.tipsterId === 't-4' || tip.tipsterId === 't-5');
  const rolloverTips = filteredTips.filter((tip) => tip.category === 'rollover');
  const dailyPremiumTips = filteredTips.filter((tip) => tip.category === 'daily');
  const trendingTips = filteredTips.filter((tip) => tip.category === 'trending');
  const capitalLiveTips = filteredTips.filter((tip) => tip.category === 'live_capital');

  // Renders the Loading Screen accurately as depicted in frame 12 & 13
  if (loadingScreen) {
    return (
      <div id="loading-screen" className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center space-y-4">
          {/* Custom pulsing green circle loader */}
          <div className="w-14 h-14 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin"></div>
          <span className="text-sm font-black tracking-wider text-emerald-400 mt-2 animate-pulse">
            Loading Betslips...
          </span>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div id="prime-picks-app" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden pb-24 relative">
      
      {/* HEADER BAR */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-lg shadow">
              <Trophy className="w-4 h-4 text-slate-950" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-white">
                PRIME PICKS <span className="text-orange-500 font-mono">2008</span> 🔥
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-800 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
              {session.countryCode} {session.countryCode === 'TZ' ? '🇹🇿' : '🌍'}
            </span>
            <span className="text-xs text-slate-400 font-semibold truncate max-w-[80px]">
              {session.name.split(' ')[0]}
            </span>
          </div>
        </div>
      </header>

      {/* RENDER BODY BASED ON SELECTED BOTTOM TAB */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-4 space-y-6">
        
        {activeTab === 'home' && (
          <div className="space-y-6">
            
            {/* CAROUSEL ADVERTISING SLIDES */}
            <div 
              id="prime-banner-carousel" 
              onClick={() => handleBannerClick(banners[carouselIndex].tipsterId)}
              className="relative h-44 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 hover:border-orange-500/50 transition-all cursor-pointer group active:scale-[0.99] duration-150"
            >
              {/* Slide Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform group-hover:scale-105"
                style={{ backgroundImage: `url(${banners[carouselIndex].image})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banners[carouselIndex].color} opacity-90 transition-all duration-700`} />
              
              {/* SOCCER FIELD STADIUM BLUEPRINT ANIMATION & GLOWING FLOATING BALL */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none select-none mix-blend-screen z-2">
                {/* Custom CSS Keyframe Injector for Premium Animations */}
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes tacticalScan {
                    0% { transform: translateY(-100%); opacity: 0.1; }
                    50% { opacity: 0.4; }
                    100% { transform: translateY(100%); opacity: 0.1; }
                  }
                  @keyframes soccerPulse {
                    0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 10px rgba(249,115,22,0.4)); }
                    50% { transform: scale(1.08) rotate(180deg); filter: drop-shadow(0 0 20px rgba(249,115,22,0.8)); }
                  }
                  @keyframes spotlightMove {
                    0%, 100% { transform: translateX(-15%) rotate(15deg); }
                    50% { transform: translateX(15%) rotate(-15deg); }
                  }
                  @keyframes jerseyFloat {
                    0%, 100% { transform: translateY(0) rotate(10deg); }
                    50% { transform: translateY(-8px) rotate(15deg); }
                  }
                `}} />

                {/* Glowing searchlights spotlight animation - HD Stadium Feel */}
                <div 
                  className="absolute -top-12 left-1/4 w-40 h-80 bg-slate-500/10 origin-top rounded-full blur-3xl" 
                  style={{ animation: 'spotlightMove 5s ease-in-out infinite' }} 
                />
                <div 
                  className="absolute -top-12 right-1/4 w-40 h-80 bg-orange-500/5 origin-top rounded-full blur-3xl" 
                  style={{ animation: 'spotlightMove 7s ease-in-out infinite', animationDelay: '1.5s' }} 
                />

                {/* Tactical Board Scanlines */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent pointer-events-none" 
                  style={{ animation: 'tacticalScan 4s linear infinite' }}
                />

                {/* Legendary CR7 Jersey Watermark Animation */}
                <div 
                  className="absolute right-14 top-4 select-none pointer-events-none opacity-20 transform scale-110"
                  style={{ animation: 'jerseyFloat 4s ease-in-out infinite' }}
                >
                  <svg className="w-20 h-20 text-orange-400" viewBox="0 0 100 100" fill="currentColor">
                    {/* Retro Football Jersey Outline */}
                    <path d="M20 15 L35 5 L50 15 L65 5 L80 15 L73 38 L63 38 L63 92 L37 92 L37 38 L27 38 Z" stroke="currentColor" strokeWidth="2.5" fill="rgba(15, 23, 42, 0.4)" />
                    {/* Legendary Shirt Number 7 */}
                    <text x="50" y="65" fontSize="34" fontWeight="900" textAnchor="middle" fill="white" fontFamily="'Arial Black', sans-serif">7</text>
                    {/* CR7 stylized signature watermark below */}
                    <text x="50" y="28" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor" opacity="0.8">CR7 VIP</text>
                  </svg>
                </div>

                {/* Animated Football pitch markings drawing */}
                <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-48 h-40 border border-emerald-500/20 rounded-l-full flex items-center justify-end pr-8">
                  {/* Goal post box */}
                  <div className="w-16 h-28 border border-emerald-500/15 rounded-l-md flex items-center justify-end pr-4 relative">
                    {/* Tactical movement arrow representations */}
                    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100">
                      <path d="M20 30 Q 50 20 80 40" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3,3" />
                      <polygon points="80,40 75,34 72,41" fill="#f97316" />
                    </svg>
                    {/* Penalty box spot */}
                    <div className="w-2 h-2 rounded-full bg-emerald-500/35 mr-1" />
                  </div>
                </div>

                {/* Tactical 'X' and 'O' Playmakers (Mambo ya soka) */}
                <div className="absolute left-8 top-12 text-rose-500/30 font-mono text-xs font-bold select-none">❌ Player A</div>
                <div className="absolute left-20 bottom-12 text-emerald-500/30 font-mono text-xs font-bold select-none">⭕ Support</div>

                {/* Rotating Glowing Soccer Ball Element */}
                <div className="absolute bottom-4 right-5 select-none pointer-events-none">
                  <div 
                    className="relative w-11 h-11 rounded-full bg-slate-950/80 border-2 border-orange-500 shadow-lg flex items-center justify-center" 
                    style={{ animation: 'soccerPulse 3s ease-in-out infinite' }}
                  >
                    <span className="text-xl">⚽</span>
                    {/* Dynamic rotating neon ring */}
                    <span className="absolute inset-[-4px] border border-orange-500/50 rounded-full animate-ping opacity-25" style={{ animationDuration: '2.2s' }} />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 p-5 flex flex-col justify-between text-left z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    {banners[carouselIndex].tag}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                      {banners[carouselIndex].riskText}
                    </span>
                    <span className="text-[11px] text-white font-black">{banners[carouselIndex].probability}</span>
                  </div>
                </div>

                <div className="space-y-1 pr-6 pl-4">
                  <h3 className="text-lg font-black text-white leading-tight drop-shadow-md group-hover:text-orange-400 transition-colors">
                    {banners[carouselIndex].title}
                  </h3>
                  <p className="text-[11px] text-slate-200 font-medium leading-relaxed line-clamp-2 drop-shadow-sm">
                    {banners[carouselIndex].subtitle}
                  </p>
                  <p className="text-[9px] text-orange-400 font-black uppercase tracking-wider flex items-center gap-1 mt-1.5 animate-pulse">
                    <span>👑 CLiCK TO ACCESS VIP</span>
                    <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>

                {/* Dot selectors */}
                <div className="flex gap-1.5 self-center mt-2">
                  {banners.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCarouselIndex(dotIdx);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        carouselIndex === dotIdx ? 'bg-orange-500 w-3.5' : 'bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* MANUAL NAVIGATION CONTROLS (ARROWS) FOR SLIDING */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-white hover:text-orange-400 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 shadow-md backdrop-blur-sm opacity-90 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((prev) => (prev + 1) % banners.length);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-white hover:text-orange-400 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 shadow-md backdrop-blur-sm opacity-90 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* SEARCH BOX FOR MATCHES, TEAMS, AND LEAGUES */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                id="search-tips-input"
                type="text"
                placeholder="Search matches, teams or leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-xs text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-xs text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* QUICK LINK BAR: TRENDING FREE TIPS CONTRIBUTORS ROW */}
            <div 
              onClick={() => {
                setSearchQuery('');
                setActiveTab('home');
              }}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                {/* Simulated overlapping avatar bubbles */}
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="avatar" />
                  <img className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80" alt="avatar" />
                  <div className="w-7 h-7 rounded-full bg-slate-800 ring-2 ring-slate-900 flex items-center justify-center text-[9px] text-orange-400 font-bold">
                    +2
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-white">Trending Free Tips</p>
                  <p className="text-[10px] text-slate-500 font-medium font-serif italic">Check out the trending tipsters</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-orange-500" />
            </div>

            {/* SECTION: TRENDING FREE TIPS PROFILES */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  Trending Free Tips ⭐
                </h3>
                <span className="text-[10px] bg-slate-900 border border-slate-800/80 py-0.5 px-2 rounded font-mono text-slate-400">
                  {topTipsters.length} Active
                </span>
              </div>

              {/* Horizontal sliding of Top Tipsters Cards (accurate to frames 00:00 - 00:05) */}
              <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none animate-fade-in">
                {topTipsters.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4">No tipsters found...</p>
                ) : (
                  topTipsters.map((t, idx) => {
                    const isFirst = idx === 0;
                    return (
                      <div 
                        key={t.id}
                        onClick={() => {
                          openTipsterDetail(t);
                        }}
                        className={`min-w-[130px] max-w-[140px] bg-slate-900 border rounded-2xl p-3 text-center flex flex-col justify-between shrink-0 relative transition-all duration-200 cursor-pointer active:scale-95 shadow-lg ${
                          isFirst 
                            ? 'border-orange-500 bg-slate-850 ring-1 ring-orange-500/30 shadow-orange-500/10 pt-6' 
                            : 'border-slate-800/80 hover:border-orange-500/50 hover:bg-slate-850/80'
                        }`}
                      >
                        {/* FIRST PLACE INDICATOR BADGE */}
                        {isFirst && (
                          <div className="absolute top-1.5 left-1/2 -track-x-1/2 -translate-x-1/2 bg-gradient-to-r from-red-650 via-orange-500 to-yellow-500 text-slate-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 z-10 select-none animate-pulse">
                            <span>🔥</span>
                            <span>HOT #1</span>
                          </div>
                        )}

                        {/* Avatar Wrapper with Verification Circle */}
                        <div className="relative w-14 h-14 mx-auto mb-2">
                          <TipsterAvatar
                            name={t.name}
                            id={t.id}
                            sizeClassName={`w-14 h-14 ring-2 ${
                              isFirst ? 'ring-amber-500/50' : 'ring-slate-850'
                            }`}
                          />
                          {t.isVerified && (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-bold text-[8px] rounded-full flex items-center justify-center border-2 border-slate-900 animate-pulse">✓</span>
                          )}
                        </div>

                        <div className="text-center space-y-0.5">
                          <p className={`text-xs font-black truncate px-1 ${isFirst ? 'text-amber-400' : 'text-white'}`} title={t.name}>{t.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">Accuracy &bull; <strong className="text-emerald-400">{t.accuracy}%</strong></p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* SECTION: FREE TIPS TO FOLLOW */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  PREMIUM VIP PRIME TIPS 2008🔥
                </h3>
                <span className="text-[10px] text-slate-500 font-bold">{otherTipsters.length} recommended</span>
              </div>

              {/* Horizontal sliding of Tipsters to follow */}
              <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
                {otherTipsters.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4">No tipsters found...</p>
                ) : (
                  otherTipsters.map((t, idx) => {
                    const isFirst = idx === 0;
                    return (
                      <div 
                        key={t.id}
                        onClick={() => {
                          openTipsterDetail(t);
                        }}
                        className={`min-w-[130px] max-w-[140px] bg-slate-900 border rounded-2xl p-3 text-center flex flex-col justify-between shrink-0 relative transition-all duration-205 cursor-pointer active:scale-95 shadow-lg ${
                          isFirst 
                            ? 'border-orange-500 bg-slate-850 ring-1 ring-orange-500/30 shadow-orange-500/10 pt-6' 
                            : 'border-slate-800/80 hover:border-orange-500/50 hover:bg-slate-850/80'
                        }`}
                      >
                        {/* FIRST PLACE INDICATOR BADGE */}
                        {isFirst && (
                          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-650 via-orange-500 to-yellow-500 text-slate-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 z-10 select-none animate-pulse">
                            <span>🔥</span>
                            <span>HOT #1</span>
                          </div>
                        )}

                        <div className="relative w-14 h-14 mx-auto mb-2">
                          <TipsterAvatar
                            name={t.name}
                            id={t.id}
                            sizeClassName={`w-14 h-14 ring-2 ${
                              isFirst ? 'ring-amber-500/50' : 'ring-slate-850'
                            }`}
                          />
                          {t.isVerified && (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-bold text-[8px] rounded-full flex items-center justify-center border-2 border-slate-900">✓</span>
                          )}
                        </div>

                        <div className="text-center space-y-0.5">
                          <p className={`text-xs font-black truncate px-1 ${isFirst ? 'text-amber-400' : 'text-white'}`}>{t.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">Accuracy &bull; <strong className="text-emerald-400">{t.accuracy}%</strong></p>
                          {['VIP SURE DRAWS', 'VIP FIXED DRAW'].includes(t.name.toUpperCase()) && (
                            <div className="mt-1.5 flex items-center justify-center gap-0.5 text-[7px] bg-emerald-500/15 text-emerald-450 border border-emerald-500/20 py-0.5 px-1.5 rounded-full font-black uppercase tracking-widest leading-none max-w-fit mx-auto cursor-pointer animate-pulse">
                              <span>🏆 JANA TULESHINDA</span>
                            </div>
                          )}
                        </div>

                        {/* No follow buttons elsewhere to avoid clutter as requested */}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* SECTION: BEST LIVE BET FOR GET CAPITAL */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  BEST LIVE BET FOR GET CAPITAL 🔥
                </h3>
                <span className="text-[10px] text-slate-500 font-bold">{capitalLiveTipsters.length} recommended</span>
              </div>

              {/* Horizontal sliding of Live Capital Tipsters */}
              <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
                {capitalLiveTipsters.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4">No tipsters found...</p>
                ) : (
                  capitalLiveTipsters.map((t, idx) => {
                    const isFirst = idx === 0;
                    const { expiry: tExpiry, isExpired: tExpired } = getPremiumExpiryInfo(t.id);
                    return (
                      <div 
                        key={t.id}
                        onClick={() => {
                          openTipsterDetail(t);
                        }}
                        className={`min-w-[130px] max-w-[140px] text-center flex flex-col justify-between shrink-0 relative transition-all duration-200 cursor-pointer active:scale-95 shadow-lg rounded-2xl p-3 border ${
                          tExpired 
                            ? 'bg-slate-950/90 border-rose-950/40 opacity-70 filter saturate-50' 
                            : isFirst 
                              ? 'border-orange-500 bg-slate-850 ring-1 ring-orange-500/30 shadow-orange-500/10 pt-6 bg-slate-900' 
                              : 'border-slate-800/80 hover:border-orange-500/50 hover:bg-slate-850/80 bg-slate-900'
                        }`}
                      >
                        {/* STATUS/EXPIRED INDICATOR BADGES */}
                        {tExpired ? (
                          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-red-650 text-white text-[7px] font-black uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 z-10 select-none">
                            <span>⚠️ EXPIRED</span>
                          </div>
                        ) : isFirst ? (
                          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-650 via-orange-500 to-yellow-500 text-slate-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 z-10 select-none animate-pulse">
                            <span>🔥</span>
                            <span>HOT #1</span>
                          </div>
                        ) : null}
                        
                        <div className="relative w-14 h-14 mx-auto mb-2">
                          <TipsterAvatar
                            name={t.name}
                            id={t.id}
                            sizeClassName={`w-14 h-14 ring-2 ${
                              tExpired 
                                ? 'ring-rose-950/30' 
                                : isFirst ? 'ring-amber-500/50' : 'ring-slate-850'
                            }`}
                          />
                          {t.isVerified && (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-bold text-[8px] rounded-full flex items-center justify-center border-2 border-slate-900">✓</span>
                          )}
                        </div>

                        <div className="text-center space-y-0.5">
                          <p className={`text-xs font-black truncate px-1 ${
                            tExpired 
                              ? 'text-slate-400' 
                              : isFirst ? 'text-amber-400' : 'text-white'
                          }`}>{t.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">Accuracy &bull; <strong className={tExpired ? 'text-rose-400' : 'text-emerald-400'}>{t.accuracy}%</strong></p>
                        </div>

                        <div className="mt-2 shrink-0">
                          {tExpired ? (
                            <span className="text-[8px] tracking-wide bg-rose-950/65 text-rose-400 border border-rose-500/20 font-black uppercase px-2 py-0.5 rounded-md inline-block">
                              TIME OUT
                            </span>
                          ) : (
                            <span className="text-[8px] tracking-wide bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 font-black px-1.5 py-0.5 rounded-md inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                              <span>{formatCountdownTime(tExpiry)}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>



          </div>
        )}

        {/* ALL TIPS TAB ENTRY */}
        {activeTab === 'all-tips' && (
          <div className="space-y-6 text-left">
            {/* Header section */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                All Betting Tips ⚽
              </h3>
              <p className="text-xs text-slate-400 font-medium font-serif italic">
                Explore all matches, odds, and exclusive insights for every game!
              </p>
            </div>

            {/* SEARCH BOX FOR MATCHES, TEAMS, AND LEAGUES */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                id="search-all-tips-input"
                type="text"
                placeholder="Search matches, teams or leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-xs text-white shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-xs text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Subcategories Selector Tabs */}
            <div className="flex gap-1.5 pb-1 overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: 'All Tips 🌟' },
                { id: 'rollover', label: 'Rollover 📈' },
                { id: 'daily', label: 'Daily VIP 👑' },
                { id: 'trending', label: 'Trending 🔥' },
                { id: 'live_capital', label: 'Live Capital 💎' }
              ].map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => setSelectedTipsCategory(subTab.id as any)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                    selectedTipsCategory === subTab.id
                      ? 'bg-orange-500 border-orange-500 text-slate-950 shadow-lg shadow-orange-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {subTab.label}
                </button>
              ))}
            </div>

            {/* Tip list */}
            <div className="space-y-6">
              {(() => {
                const filteredList = filteredTips.filter(tip => {
                  // Only allow free public tipster contributors (t-2, t-3, t-4, t-5) in this public feed
                  if (!['t-2', 't-3', 't-4', 't-5'].includes(tip.tipsterId)) return false;
                  // Strictly ensure no free live bet picks or live-capital selections sneak in
                  if (tip.status === 'live' || tip.category === 'live_capital') return false;

                  if (selectedTipsCategory === 'all') return true;
                  return tip.category === selectedTipsCategory;
                });

                // Find premium tipsters matching the current tab category
                const premiumList = (() => {
                  if (selectedTipsCategory === 'all') {
                    // Only return VIP prime 2008 tipsters under "All Tips" to avoid mixing with Live Capital bets
                    return otherTipsters;
                  }
                  if (selectedTipsCategory === 'daily') {
                    return otherTipsters.filter(t => t.id === 't-6' || t.id === 't-7' || t.id === 't-9');
                  }
                  if (selectedTipsCategory === 'live_capital') {
                    return capitalLiveTipsters;
                  }
                  if (selectedTipsCategory === 'rollover') {
                    return otherTipsters.filter(t => t.id === 't-8');
                  }
                  return [];
                })();

                // Apply search bar filtering to the premium tipsters also
                const searchedPremium = premiumList.filter(t => {
                  if (!searchQuery) return true;
                  const query = searchQuery.toLowerCase();
                  return t.name.toLowerCase().includes(query) || (t.bio && t.bio.toLowerCase().includes(query));
                });

                if (filteredList.length === 0 && searchedPremium.length === 0) {
                  return (
                    <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-500 italic leading-relaxed">
                      No standard matches or VIP tickets found in this category at the moment. ⚽
                    </div>
                  );
                }

                // Dynamic Header Titles & Badge text to ensure strict separation and clear navigation
                const feedTitle = selectedTipsCategory === 'live_capital' 
                  ? "BEST LIVE BET FOR GET CAPITAL ⚡" 
                  : selectedTipsCategory === 'daily'
                    ? "DAILY VIP PRIME TIPS 2008 👑"
                    : selectedTipsCategory === 'rollover'
                      ? "VIP COMPOUNDING ROLLOVER 📈"
                      : "Live Predictions Feed";

                const feedBadgeText = selectedTipsCategory === 'live_capital'
                  ? "LIVE CAPITAL SELECTIONS"
                  : selectedTipsCategory === 'daily'
                    ? "PRIME 2008 VIP"
                    : selectedTipsCategory === 'rollover'
                      ? "ROLLOVER 2008 VIP"
                      : "Mixed Live Stream";

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest pl-1 flex items-center gap-2">
                        <span>🔥</span> {feedTitle} ({filteredList.length} Free, {searchedPremium.length} VIP)
                      </h4>
                      <span className="text-[8px] bg-orange-500/10 text-orange-450 border border-orange-500/20 px-2 py-0.5 rounded font-black uppercase">
                        {feedBadgeText}
                      </span>
                    </div>

                    {/* PREMIUM CHANNELS BLOCK AT THE TOP */}
                    {searchedPremium.length > 0 && (
                      <div className="space-y-3 pt-1">
                        <h5 className="text-[9.5px] font-black uppercase text-amber-400 tracking-wider pl-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          VIP PREMIUM CHANNELS (TICKET ZA NDANI) 👑
                        </h5>
                        <div className="grid grid-cols-1 gap-3.5">
                          {searchedPremium.map((t) => {
                            const { expiry, isExpired } = getPremiumExpiryInfo(t.id);
                            return (
                              <VipLockedCard
                                key={`vip-${t.id}`}
                                tipster={t}
                                isExpired={isExpired}
                                expiryTime={expiry}
                                onUnlock={() => openTipsterDetail(t)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* FREE SPORTS PREDICTIONS STACKED CHRONOLOGICALLY (3+ DAYS CHANNELS) */}
                    {filteredList.length > 0 && (
                      <div className="space-y-5">
                        {(() => {
                          const activeTips = filteredList.filter(tip => tip.date === 'Today' || tip.date === 'Tomorrow' || tip.status === 'live');
                          const yesterdayTips = filteredList.filter(tip => tip.date === 'Yesterday');
                          const twoDaysAgoTips = filteredList.filter(tip => tip.date === '2 Days Ago');
                          const threeDaysAgoTips = filteredList.filter(tip => tip.date === '3 Days Ago');

                          const dateSections = [
                            { title: 'TODAY & TOMORROW ACTIVE MATCHES ⚽', tips: activeTips, badge: 'ACTIVE' },
                            { title: 'YESTERDAY COMPLETED RESULTS 🏆', tips: yesterdayTips, badge: 'COMPLETED' },
                            { title: '2 DAYS AGO COMPLETED RESULTS 📜', tips: twoDaysAgoTips, badge: 'COMPLETED' },
                            { title: '3 DAYS AGO COMPLETED RESULTS 📜', tips: threeDaysAgoTips, badge: 'COMPLETED' }
                          ];

                          return dateSections.map((section, idx) => {
                            if (section.tips.length === 0) return null;
                            return (
                              <div key={idx} className="space-y-3 pt-1.5">
                                <div className="flex items-center justify-between px-3 bg-[#0F121C]/80 py-2 rounded-xl border border-slate-850/60 shadow-sm">
                                  <h5 className="text-[9px] font-black uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                                    <span>📅</span> {section.title}
                                  </h5>
                                  <span className={`text-[7px] px-2 py-0.5 rounded font-black tracking-wider ${
                                    section.badge === 'ACTIVE' 
                                      ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 animate-pulse'
                                      : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                                  }`}>
                                    {section.tips.length} {section.badge}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 gap-3.5">
                                  {section.tips.map((tip) => (
                                    <TipCard
                                      key={`free-${tip.id}`}
                                      tip={tip}
                                      isSelected={selectedTipIds.includes(tip.id)}
                                      onToggleSelect={handleToggleSelectTip}
                                      onViewAnalysis={(t) => setSelectedTipForAnalysis(t)}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ORACLE AI TAB ENTRY */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <AiAdvisor userName={session.name} />
          </div>
        )}

        {/* LIVE SCORE & FIXTURES CENTER TAB - POWERED BY FLASHSCORE COOPERATIVE */}
        {activeTab === 'slip' && (
          <div className="space-y-5">
            
            {/* FLASHSCORE INTEGRATION DECK */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-left relative overflow-hidden">
              {/* Premium Glow and background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    <h3 className="font-black text-white text-xs tracking-wider uppercase">FLASHSCORE REAL-TIME PORTAL</h3>
                  </div>
                  <span className="text-[9px] bg-slate-950 px-2.5 py-0.5 rounded-md text-orange-400 font-mono font-bold border border-orange-500/20">AUTOMATIC LAUNCH</span>
                </div>

                <div className="text-center py-6 px-4 bg-slate-950/50 border border-slate-850 rounded-2xl space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    {/* Pulsing ring */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500/20 opacity-75"></span>
                    <div className="relative w-16 h-16 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-orange-450 shadow-[0_0_20px_rgba(249,115,22,0.25)]">
                      <Tv className="w-7 h-7 text-orange-500 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-w-sm mx-auto font-sans">
                    <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Launching Flashscore Automatically...</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      The secure <strong className="text-orange-400">Flashscore</strong> portal is opening right now in a new tab to show you live football scores and match statistics from all leagues globally!
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold italic mt-1">
                      If it didn't open automatically (due to browser popups block), please click the golden button below.
                    </p>
                  </div>
                  
                  <a 
                    href="https://www.flashscore.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs mx-auto bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-slate-950 font-black text-xs px-6 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.3)] active:scale-95 cursor-pointer hover:shadow-[0_4px_30px_rgba(249,115,22,0.5)] transform hover:-translate-y-0.5 duration-200"
                  >
                    <span>Open Flashscore Now</span>
                    <ExternalLink className="w-4 h-4 text-slate-950" />
                  </a>
                </div>

                <div className="text-[9px] text-slate-500 text-center uppercase tracking-widest font-mono">
                  ⚡ INSTANT SOCCER RESULTS • ZERO LAG • GLOBAL COVERAGE
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ACCOUNT TAB VIEW - STYLED ACCURATELY AS IN FRAME 13 & 14 OF VIDEO */}
        {activeTab === 'account' && (
          <div id="account-tab-view" className="space-y-6 text-left">
            {/* Upper Profile Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-3 relative">
              <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center mx-auto border-2 border-orange-500">
                <User className="w-8 h-8 text-orange-400" />
              </div>
              
              <div className="space-y-0.5">
                <h3 className="text-base font-black text-white">{session.name}</h3>
                <p className="text-xs font-mono font-bold text-orange-500 tracking-wider">
                  {session.phone}
                </p>
                <p className="text-[10px] text-slate-500 font-bold">
                  Member since: {new Date(session.joinedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* SECTION: ACCOUNT (Akaunti) */}
            <div className="space-y-2">
              <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest pl-3">
                ACCOUNT
              </h4>
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800/60">
                {/* 1. My Betslips */}
                <button
                  onClick={() => setActiveProfileDialog('betslips')}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-850 cursor-pointer text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-xs font-black text-slate-200">My Betslips</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                {/* 2. Payment history */}
                <button
                  onClick={() => setActiveProfileDialog('payments')}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-850 cursor-pointer text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-xs font-black text-slate-200">Payment history</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                {/* 3. Delete Account */}
                <button
                  onClick={() => setActiveProfileDialog('delete')}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-850 cursor-pointer text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-xs font-black text-slate-200">Delete Account</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* SECTION: SUPPORT */}
            <div className="space-y-2">
              <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest pl-3">
                SUPPORT
              </h4>
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800/60">
                {/* 1. Help & Support */}
                <button
                  onClick={() => setActiveProfileDialog('help')}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-850 cursor-pointer text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-xs font-black text-slate-200">Help & Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                {/* 2. Terms of Use */}
                <button
                  onClick={() => setActiveProfileDialog('terms')}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-850 cursor-pointer text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-500/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-xs font-black text-slate-200">Terms of Use</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                {/* 3. Privacy Policy */}
                <button
                  onClick={() => setActiveProfileDialog('privacy')}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-850 cursor-pointer text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-xs font-black text-slate-200">Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* LOGOUT BUTTON CONTAINER AT BOTTOM */}
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-red-500 hover:text-red-400 py-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        )}

      </main>

      {/* STICKY BOTTOM NAVIGATION BAR (accurate match for user video flow) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-905/90 backdrop-blur-xl border-t border-slate-900 py-3 z-45">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1 px-4 font-sans">
          
          <button
            onClick={() => {
              setActiveTab('home');
              setSearchQuery('');
            }}
            className={`flex flex-col items-center justify-center py-1.5 transition-all relative ${
              activeTab === 'home' ? 'text-orange-500' : 'text-slate-500 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-black tracking-wide uppercase">Home</span>
            {activeTab === 'home' && (
              <span className="absolute bottom-0 w-4 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              window.open('https://t.me/+IqD54uRGIzU2MDY0', '_blank');
            }}
            className="flex flex-col items-center justify-center py-1.5 transition-all text-sky-400 hover:text-sky-300 font-sans cursor-pointer active:scale-95"
          >
            <svg className="w-5 h-5 mb-1 text-[#0088cc] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.61 7.03c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.33 3.52-.5.35-.96.52-1.37.51-.45-.01-1.32-.25-1.97-.46-.79-.26-1.42-.4-1.36-.85.03-.23.35-.47.96-.71 3.76-1.63 6.27-2.71 7.53-3.23 3.58-1.49 4.32-1.75 4.81-1.76.11 0 .35.03.5.16.13.11.17.26.19.37z"/>
            </svg>
            <span className="text-[9px] font-black tracking-wide uppercase">Telegram</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('slip');
              window.open('https://www.flashscore.com/', '_blank');
            }}
            className={`flex flex-col items-center justify-center py-1.5 transition-all relative ${
              activeTab === 'slip' ? 'text-orange-500' : 'text-slate-500 hover:text-white'
            }`}
          >
            <div className="relative">
              <Tv className="w-5 h-5 mb-1" />
              <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white font-black text-[7px] px-1 rounded-full flex items-center justify-center ring-1 ring-slate-950 animate-pulse">
                LIVE
              </span>
            </div>
            <span className="text-[9px] font-black tracking-wide uppercase">Live Score</span>
            {activeTab === 'slip' && (
              <span className="absolute bottom-0 w-4 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex flex-col items-center justify-center py-1.5 transition-all relative ${
              activeTab === 'ai' ? 'text-orange-500' : 'text-slate-500 hover:text-white'
            }`}
          >
            <Sparkles className="w-5 h-5 mb-1 animate-pulse" />
            <span className="text-[9px] font-black tracking-wide uppercase">PRIME AI</span>
            {activeTab === 'ai' && (
              <span className="absolute bottom-0 w-4 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`flex flex-col items-center justify-center py-1.5 transition-all relative ${
              activeTab === 'account' ? 'text-orange-500' : 'text-slate-500 hover:text-white'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-black tracking-wide uppercase">Profile</span>
            {activeTab === 'account' && (
              <span className="absolute bottom-0 w-4 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

        </div>
      </nav>

      {/* FULLY FUNCTIONAL PROFILE DIALOG WINDOW OVERLAYS */}
      <AnimatePresence>
        {activeProfileDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-6 relative text-left"
            >
              <button
                onClick={() => setActiveProfileDialog(null)}
                className="absolute top-4 right-4 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h4 className="text-base font-black text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                {activeProfileDialog === 'betslips' && 'My Betslips'}
                {activeProfileDialog === 'payments' && 'Payment History'}
                {activeProfileDialog === 'delete' && 'Delete Account ⚠️'}
                {activeProfileDialog === 'help' && 'Help & Support'}
                {activeProfileDialog === 'terms' && 'Terms of Use'}
                {activeProfileDialog === 'privacy' && 'Privacy Policy'}
              </h4>

              <div className="text-xs text-slate-300 space-y-3 leading-relaxed max-h-[300px] overflow-y-auto pr-1 select-text">
                {activeProfileDialog === 'betslips' && (
                  <div className="space-y-3">
                    <p className="text-slate-400 font-semibold">List of recently generated betslips:</p>
                    {lastSubmittedCode ? (
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-orange-400 font-bold">{lastSubmittedCode}</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-black">ACTIVE</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Successfully archived and registered onto the Prime Picks terminals.</p>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic py-4 text-center">You have not created any custom betslips today.</p>
                    )}
                  </div>
                )}

                {activeProfileDialog === 'payments' && (
                  <div className="space-y-4">
                    <p className="text-slate-300 font-semibold text-xs">Payment & Purchase History:</p>
                    <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
                        <AlertCircle className="w-5 h-5 text-orange-400" />
                      </div>
                      <p className="font-black text-white text-[11px] uppercase tracking-wider">No any ticket or VIP you paid</p>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        You do not have any active purchased tickets or premium VIP plans registered. Please message the administrator now to activate VIP access!
                      </p>
                      
                      <a
                        href="https://wa.me/255704242433?text=Greeting%20Admin%2C%20I%20want%20to%20register%20for%20VIP%20Premium%20now%20on%20WhatsApp%20🔥"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#00E676] hover:bg-[#00c853] text-slate-950 font-black py-2.5 px-3 rounded-lg text-[9px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer mt-1 font-bold transition-all active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
                        <span>Message Admin Now For VIP 👑</span>
                      </a>
                    </div>
                  </div>
                )}

                {activeProfileDialog === 'delete' && (
                  <div className="space-y-4 text-center">
                    <p className="text-slate-300">
                      Are you absolutely sure you want to permanently delete your account and all associated prediction data from PRIME PICKS?
                    </p>
                    <p className="text-[10px] text-red-400 font-bold bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                      Warning: This action is irreversible and your stored profile history will be lost forever.
                    </p>
                    <button
                      onClick={() => {
                        localStorage.removeItem('prime_picks_user_session');
                        setSession(null);
                        setActiveProfileDialog(null);
                        setSelectedTipIds([]);
                        setActiveTab('home');
                        alert('Your user account has been successfully deleted.');
                      }}
                      className="w-full mt-2 bg-red-500 hover:bg-red-655 text-slate-950 font-black py-2.5 rounded-xl text-xs uppercase cursor-pointer"
                    >
                      Yes, Delete All My Data Now!
                    </button>
                  </div>
                )}

                {activeProfileDialog === 'help' && (
                  <div className="space-y-3">
                    <p className="font-extrabold text-white">Need Assistance?</p>
                    <p>Get in touch with the Prime Picks support network via our official helpline:</p>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1 text-slate-300 font-semibold text-xs text-left">
                      <p>📧 Email: <span className="text-orange-400 font-mono">support@primepicks2008.co.tz</span></p>
                      <p>📞 Phone/WhatsApp: <span className="text-orange-400 font-mono">+255 704 242 433</span></p>
                      <p>⏰ Working Hours: Daily from 8:00 AM to 10:00 PM</p>
                    </div>
                  </div>
                )}

                {activeProfileDialog === 'terms' && (
                  <div className="space-y-2 select-text">
                    <p className="font-extrabold text-white">PRIME PICKS Terms and Conditions:</p>
                    <p className="text-[11px] text-slate-400 text-justify">
                      1. This platform provides analyzed data based on mathematical sports algorithms. Our evaluations are intended for analytical guides rather than guaranteed financial yields.
                    </p>
                    <p className="text-[11px] text-slate-400 text-justify">
                      2. Access is strictly permitted for individuals aged 18 and older.
                    </p>
                  </div>
                )}

                {activeProfileDialog === 'privacy' && (
                  <div className="space-y-2 select-text">
                    <p className="font-extrabold text-white">Privacy Policy:</p>
                    <p className="text-[11px] text-slate-400 text-justify">
                      Our strict privacy commitment ensures that your profile details are never disclosed to third-party affiliates. Data is used exclusively on your local device to personalize your profile view.
                    </p>
                  </div>
                )}
              </div>

              {activeProfileDialog !== 'delete' && (
                <div className="mt-5 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setActiveProfileDialog(null)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Got It, Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: PRESET MATCH TACTICAL ANALYSIS OVERLAY */}
      <AnimatePresence>
        {selectedTipForAnalysis && (
          <div id="analysis-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-6 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedTipForAnalysis(null)}
                className="absolute top-4 right-4 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-left space-y-1 pr-6 pb-3 border-b border-slate-800">
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono py-1 px-2.5 rounded font-bold">
                  {selectedTipForAnalysis.league}
                </span>
                <h3 className="text-sm font-black text-white mt-2">
                  ANALYSIS: {selectedTipForAnalysis.teams[0]} vs {selectedTipForAnalysis.teams[1]}
                </h3>
              </div>

              <div className="my-5 text-left space-y-4 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-wider">TODAY'S SELECTION (RECOMMENDED PICK)</p>
                  <p className="font-black text-orange-400 mt-1">{selectedTipForAnalysis.tip}</p>
                  <div className="flex gap-4 mt-2.5 pt-2 border-t border-slate-900 text-[11px] font-bold">
                    <div>
                      <span className="text-slate-500">Odds: </span>
                      <strong className="text-emerald-400 font-mono">{selectedTipForAnalysis.odds.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Probability: </span>
                      <strong className="text-white font-mono">{selectedTipForAnalysis.probability}%</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-white uppercase tracking-tight">WHY THIS SELECTION?</h4>
                  <p className="text-slate-300 leading-relaxed bg-slate-950/30 p-3 rounded-lg border border-slate-850/60">
                    {selectedTipForAnalysis.tipExplanation}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedTipForAnalysis(null)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Close
                </button>
                {selectedTipForAnalysis.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleToggleSelectTip(selectedTipForAnalysis.id);
                      setSelectedTipForAnalysis(null);
                    }}
                    className={`w-full py-3 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                      selectedTipIds.includes(selectedTipForAnalysis.id)
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : 'bg-orange-500 hover:bg-orange-600 text-slate-950'
                    }`}
                  >
                    {selectedTipIds.includes(selectedTipForAnalysis.id) ? 'Remove Slip' : 'Add to Slip'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: TIPSTER ACTIVE TIPS AND PROFILE OVERLAY */}
      <AnimatePresence>
        {selectedTipsterForModal && (() => {
          const { expiry, isExpired } = getPremiumExpiryInfo(selectedTipsterForModal.id);
          return (
            <TipsterDetailModal
              isOpen={!!selectedTipsterForModal}
              tipster={selectedTipsterForModal}
              onClose={() => setSelectedTipsterForModal(null)}
              userCountryCode={session?.countryCode || 'TZ'}
              selectedTipIds={selectedTipIds}
              onToggleTip={handleToggleSelectTip}
              mia60ExpiryTime={expiry}
              isMia60Expired={isExpired}
              onOpenHistory={() => {
                setShowHistoryModal(true);
                setSelectedTipsterForModal(null);
              }}
            />
          );
        })()}
      </AnimatePresence>

      {/* CONGRATS ON SECURING COMPLETED SLIP OVERLAY */}
      <AnimatePresence>
        {betSubmitted && (
          <div id="bet-success-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.90, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.90, y: 30 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-6 text-center space-y-5 shadow-2xl relative"
            >
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow animate-bounce">
                <Check className="w-6 h-6" strokeWidth={3} />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-white">BETSLIP COMMITTED SUCCESSFULLY! 🍀🏆</h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Your predictions combination has been successfully saved. Get ready to win!
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-extrabold">Simulated Booking Code</span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-base font-mono font-black text-orange-400 tracking-wider">
                    {lastSubmittedCode}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(lastSubmittedCode);
                      alert('Booking code copied successfully!');
                    }}
                    className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-[10px] text-slate-400 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Stats overview in congrats popup */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850/50 text-left text-[11px] text-slate-400 font-semibold grid grid-cols-2 gap-2.5">
                <div>
                  <p className="text-[9px] text-slate-500 leading-none">BETSLIP (ITEMS)</p>
                  <p className="text-white font-extrabold mt-0.5">{selectedTips.length} Matches</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 leading-none">ODDS TOTAL</p>
                  <p className="text-white font-extrabold mt-0.5 font-mono">{totalOdds.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 leading-none">STAKE AMOUNT</p>
                  <p className="text-white font-extrabold mt-0.5 font-mono">{currencySymbol} {stakeAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 leading-none">EST. POTENTIAL PAYOUT</p>
                  <p className="text-emerald-400 font-extrabold mt-0.5 font-mono">{currencySymbol} {Math.round(potentialPayout).toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setBetSubmitted(false);
                  setSelectedTipIds([]);
                  setActiveTab('home');
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black py-3 rounded-xl text-xs uppercase cursor-pointer"
              >
                Got It, Back to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: LAST DAY HISTORY / HISTORIA YA JANA */}
      <AnimatePresence>
        {showHistoryModal && (
          <div id="history-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.90, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.90, y: 30 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowHistoryModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-850 hover:bg-slate-800 text-slate-400 rounded-lg transition-colors cursor-pointer border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Section */}
              <div className="text-left space-y-1 mt-2">
                <div className="flex items-center gap-1.5 text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-black uppercase w-fit tracking-wider animate-pulse">
                  <Trophy className="w-3 h-3" />
                  <span>YESTERDAY 100% WON</span>
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  PAST VIP TICKETS HISTORY 🏆
                </h3>
                <p className="text-[11px] text-slate-400 font-medium font-serif italic">
                  Explore recently completed VIP selections to verify our accuracy before joining.
                </p>
              </div>

              {/* Dynamic Grouped VIP Tickets (muundo wa hivo hivo kama ule wa premium tipsters) */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {(() => {
                  // Filter for VIP completed and won tips
                  const vipCompletedTips = MOCK_TIPS.filter(tip => 
                    ['t-1', 't-6', 't-7', 't-8', 't-9', 't-12', 't-13', 't-14', 't-15'].includes(tip.tipsterId) && 
                    tip.status === 'won' && 
                    ['Yesterday', '2 Days Ago', '3 Days Ago'].includes(tip.date)
                  );

                  // Group by date
                  const groupedVipByDate = vipCompletedTips.reduce((groups: Record<string, typeof vipCompletedTips>, tip) => {
                    const dateKey = tip.date || 'Yesterday';
                    if (!groups[dateKey]) {
                      groups[dateKey] = [];
                    }
                    groups[dateKey].push(tip);
                    return groups;
                  }, {});

                  const dateOrder = ['Yesterday', '2 Days Ago', '3 Days Ago'];
                  const sortedVipDates = Object.keys(groupedVipByDate).sort((a, b) => {
                    const indexA = dateOrder.indexOf(a);
                    const indexB = dateOrder.indexOf(b);
                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                    if (indexA !== -1) return -1;
                    if (indexB !== -1) return 1;
                    return b.localeCompare(a);
                  });

                  if (sortedVipDates.length === 0) {
                    return (
                      <div className="py-8 text-center text-xs text-slate-500 italic bg-slate-950/40 rounded-2xl border border-slate-850">
                        No VIP match history is currently available.
                      </div>
                    );
                  }

                  const getFormatLabel = (dateStr: string) => {
                    const dObj = new Date();
                    const format = (d: Date) => {
                      const day = String(d.getDate()).padStart(2, '0');
                      const month = String(d.getMonth() + 1).padStart(2, '0');
                      const year = d.getFullYear();
                      return `${day}.${month}.${year}`;
                    };

                    if (dateStr === 'Yesterday') {
                      dObj.setDate(dObj.getDate() - 1);
                      return `YESTERDAY - ${format(dObj)} 🏆`;
                    }
                    if (dateStr === '2 Days Ago') {
                      dObj.setDate(dObj.getDate() - 2);
                      return `2 DAYS AGO - ${format(dObj)} 🏆`;
                    }
                    if (dateStr === '3 Days Ago') {
                      dObj.setDate(dObj.getDate() - 3);
                      return `3 DAYS AGO - ${format(dObj)} 🏆`;
                    }
                    return dateStr;
                  };

                  return sortedVipDates.map((dateStr) => {
                    const dateTips = groupedVipByDate[dateStr];
                    const totalOdds = dateTips.reduce((prod, t) => prod * t.odds, 1).toFixed(2);
                    const formattedTitle = getFormatLabel(dateStr);

                    return (
                      <div key={dateStr} className="space-y-3">
                        {/* DATE SECTION HEADER STYLED TO MATCH FREE TIPS STYLE */}
                        <div className="flex items-center justify-between px-1.5 pt-2">
                          <span className="text-[9px] font-black uppercase text-amber-500 tracking-wider flex items-center gap-1">
                            <span>📅</span> {formattedTitle}
                          </span>
                          <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-black font-mono">
                            TOTAL ODDS: @{totalOdds}
                          </span>
                        </div>

                        {/* HIGH QUALITY TIP CARDS */}
                        <div className="grid grid-cols-1 gap-3.5">
                          {dateTips.map((tip) => (
                            <TipCard
                              key={tip.id}
                              tip={tip}
                              isSelected={selectedTipIds.includes(tip.id)}
                              onToggleSelect={handleToggleSelectTip}
                              onViewAnalysis={(t) => setSelectedTipForAnalysis(t)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* WhatsApp Call to Action Inside */}
              <div className="space-y-2">
                <a
                  href="https://wa.me/255704242433?text=Hello%20Admin,%20I%20want%2520to%2520join%2520VIP%2520PRIME%2520PICKS%2520today"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black py-3.5 rounded-xl transition-all duration-300 shadow-2xl active:scale-95 outline-none text-center flex flex-col items-center justify-center cursor-pointer border-2 border-emerald-400 group"
                  style={{
                    boxShadow: '0 0 25px rgba(16,185,129,0.5)'
                  }}
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span className="text-slate-950 text-xs font-black uppercase tracking-wider">
                      CLICK HERE TO CONTACT ADMIN 💬
                    </span>
                  </div>
                  <span className="text-[8px] text-slate-900 font-bold uppercase mt-0.5 leading-none">
                    JOIN NOW AND GET TODAY'S WINNING TICKET!
                  </span>
                </a>

                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                >
                  Close History
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
