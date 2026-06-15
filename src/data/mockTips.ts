import { BettingTip, CountryInfo, Tipster } from '../types';
import { ACTIVE_MECHI_ZETU } from './mechi_zetu';

// =========================================================================
// 🇹🇿 SEHEMU YA 1: MUDA WA COUNTDOWN TIMERS KWA KILA PROFILE YA LIVE BET
// 🇬🇧 SECTION 1: LIVE BET COUNTDOWN TIMERS CONFIG (IN MINUTES)
// =========================================================================
// Hapa unaweza kubadilisha 'durationMinutes' kwa kila mtoaji wa tips (profile ya live bet).
// - t-12 ni MIA 60
// - t-13 ni Forty4
// - t-14 ni Tazar
// - t-15 ni MR 10+ ODDS
// Ukibadili muda hapa, countdown timer yake kwenye simu itajiseti automatic kwa dakika hizo!
export const LIVE_BET_TIMERS_CONFIG: Record<string, { name: string; durationMinutes: number }> = {
  't-12': { name: 'MIA 60 (Live In-Play)', durationMinutes: 60 },      // Dakika 60 = Lisaa 1
  't-13': { name: 'Forty4 (Live Ticket)', durationMinutes: 11 },       // Dakika 11 = Zilizobaki
  't-14': { name: 'Tazar (Live In-Play)', durationMinutes: 45 },       // Dakika 45
  't-15': { name: 'MR 10+ ODDS (Premium)', durationMinutes: 120 }     // Dakika 120 = Saa 2
};

// Sehemu ya nchi maarufu zinazoonyeshwa wakati wa kujiandikisha
export const POPULAR_COUNTRIES: CountryInfo[] = [
  { name: 'Tanzania', code: 'TZ', flag: '🇹🇿', dialCode: '+255' },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪', dialCode: '+254' },
  { name: 'Uganda', code: 'UG', flag: '🇺🇬', dialCode: '+256' },
  { name: 'Rwanda', code: 'RW', flag: '🇷🇼', dialCode: '+250' },
  { name: 'Burundi', code: 'BI', flag: '🇧🇮', dialCode: '+257' },
  { name: 'Democratic Republic of Congo', code: 'CD', flag: '🇨🇩', dialCode: '+243' },
  { name: 'Zambia', code: 'ZM', flag: '🇿🇲', dialCode: '+260' },
  { name: 'Malawi', code: 'MW', flag: '🇲🇼', dialCode: '+265' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦', dialCode: '+27' },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬', dialCode: '+234' },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭', dialCode: '+233' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { name: 'United States', code: 'US', flag: '🇺🇸', dialCode: '+1' },
];

// =========================================================================
// 🇹🇿 SEHEMU YA 2: ORODHA YA WATOA TIPS (MOCK TIPSTERS PROFILES)
// 🇬🇧 SECTION 2: TIPSTER PROFILES LIST
// =========================================================================
// Hapa ndipo ulimi na picha za watoa tips (Tipsters) zinaposanifiwa.
// Kila mtoaji ana ID yake kama 't-1', 't-12', nk. 
// Unaweza kubadilisha majina ('name'), ufaulu ('accuracy'), au maelezo ('bio') hapa chini.
export const MOCK_TIPSTERS: Tipster[] = [
  // ----------------------------------------------------
  // FREE PROFILE 1: VIP SURE DRAWS (Free public advice)
  // ----------------------------------------------------
  {
    id: 't-1',
    name: 'VIP SURE DRAWS',
    accuracy: 99.0,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    tipsCount: 142,
    followersCount: 12400,
    bio: 'Guaranteed daily selections analyzed in depth by our expert team, completely free of charge.',
  },
  // ----------------------------------------------------
  // FREE PROFILE 2: Free Draw Tips
  // ----------------------------------------------------
  {
    id: 't-2',
    name: 'Free Draw Tips',
    accuracy: 99.0,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=150&auto=format&fit=crop&q=80',
    tipsCount: 98,
    followersCount: 8900,
    bio: 'Highly accurate Draw (X) tips thoroughly analyzed by our expert sports panel at no cost.',
  },
  // ----------------------------------------------------
  // FREE PROFILE 3: Free Over 1.5 Tips
  // ----------------------------------------------------
  {
    id: 't-3',
    name: 'Free Over 1.5 Tips',
    accuracy: 99.0,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=150&auto=format&fit=crop&q=80',
    tipsCount: 83,
    followersCount: 6100,
    bio: 'Reliable Over 1.5 Goals tips processed with cutting-edge analytical tools for free public access.',
  },
  // ----------------------------------------------------
  // FREE PROFILE 4: Free Rollover Tips
  // ----------------------------------------------------
  {
    id: 't-4',
    name: 'Free Rollover Tips',
    accuracy: 99.0,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    tipsCount: 74,
    followersCount: 5400,
    bio: 'Consistent low-risk rollover progressions analyzed and selected carefully with zero premium fees.',
  },
  // ----------------------------------------------------
  // FREE PROFILE 5: Trending Draw Tips
  // ----------------------------------------------------
  {
    id: 't-5',
    name: 'Trending Tips',
    accuracy: 99.0,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=150&auto=format&fit=crop&q=80',
    tipsCount: 110,
    followersCount: 15400,
    bio: 'Highly reliable and trending hot recommendations updated regularly for the public, completely free.',
  },
  
  // ----------------------------------------------------
  // VIP PROFILE 1: VIP FIXED DRAW (Locked Behind VIP App)
  // ----------------------------------------------------
  {
    id: 't-6',
    name: 'VIP FIXED DRAW',
    accuracy: 95.5,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=150&auto=format&fit=crop&q=80',
    tipsCount: 52,
    followersCount: 3900,
    bio: 'Premium VIP draw predictions thoroughly examined and vetted by our professional specialists.',
  },
  // ----------------------------------------------------
  // VIP PROFILE 2: VIP HT FT (Locked Behind VIP App)
  // ----------------------------------------------------
  {
    id: 't-7',
    name: 'VIP HT FT',
    accuracy: 92.4,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1624880351055-97feecfec289?w=150&auto=format&fit=crop&q=80',
    tipsCount: 45,
    followersCount: 2100,
    bio: 'Exclusive VIP advice focusing on Half-Time / Full-Time (HT/FT) dual-period predictions.',
  },
  // ----------------------------------------------------
  // VIP PROFILE 3: VIP ROLL OVER (Locked Behind VIP App)
  // ----------------------------------------------------
  {
    id: 't-8',
    name: 'VIP ROLL OVER',
    accuracy: 91.8,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=150&auto=format&fit=crop&q=80',
    tipsCount: 39,
    followersCount: 1800,
    bio: 'Steadfast daily compounding tips designed to safely multiply your bankroll step-by-step.',
  },
  // ----------------------------------------------------
  // VIP PROFILE 4: VIP 10+ ODDS (Locked Behind VIP App)
  // ----------------------------------------------------
  {
    id: 't-9',
    name: 'VIP 10+ VIP ODDS',
    accuracy: 88.7,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&auto=format&fit=crop&q=80',
    tipsCount: 31,
    followersCount: 1550,
    bio: 'High-yield combined betting slips boasting composite odds starting from 10+ with great records.',
  },

  // ----------------------------------------------------
  // LIVE CAPITAL PROFILE 1: MIA 60 (Locked Behind countdown)
  // ----------------------------------------------------
  {
    id: 't-12',
    name: 'MIA 60',
    accuracy: 98.6,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=150&auto=format&fit=crop&q=80',
    tipsCount: 114,
    followersCount: 14200,
    bio: 'Highly reliable Live In-Play selections designed to safely expand and build your capital instantly.',
    liveCountdownMinutes: 60 // Pia imeunganishwa hapa kwa urahisi zaidi!
  },
  // ----------------------------------------------------
  // LIVE CAPITAL PROFILE 2: Forty4 (Locked Behind countdown)
  // ----------------------------------------------------
  {
    id: 't-13',
    name: 'Forty4',
    accuracy: 94.2,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1517747614396-d21a78b850e8?w=150&auto=format&fit=crop&q=80',
    tipsCount: 96,
    followersCount: 9300,
    bio: 'Specialized capital multiplication formula centered entirely on stable live game in-play dynamics.',
    liveCountdownMinutes: 11
  },
  // ----------------------------------------------------
  // LIVE CAPITAL PROFILE 3: Tazar (Locked Behind countdown)
  // ----------------------------------------------------
  {
    id: 't-14',
    name: 'Tazar',
    accuracy: 93.5,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=150&auto=format&fit=crop&q=80',
    tipsCount: 88,
    followersCount: 7800,
    bio: 'Dynamic live tips featuring high value 1.5+ odds captured live directly in the heat of action.',
    liveCountdownMinutes: 45
  },
  // ----------------------------------------------------
  // LIVE CAPITAL PROFILE 4: MR 10+ ODDS (Locked Behind countdown)
  // ----------------------------------------------------
  {
    id: 't-15',
    name: 'MR 10+ ODDS',
    accuracy: 96.8,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1579952362224-4bb325d9013b?w=150&auto=format&fit=crop&q=80',
    tipsCount: 79,
    followersCount: 11100,
    bio: 'Very secure in-play recommendations to safeguard, insulate, and expand your trading balance.',
    liveCountdownMinutes: 120
  },

  // ----------------------------------------------------
  // OTHER EXTRA PROFILES
  // ----------------------------------------------------
  {
    id: 't-10',
    name: 'Basketball Specialist',
    accuracy: 61.8,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop',
    tipsCount: 29,
    followersCount: 1300,
  },
  {
    id: 't-11',
    name: 'Risk Taker Only',
    accuracy: 55.0,
    isVerified: false,
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop',
    tipsCount: 18,
    followersCount: 850,
  }
];

// =========================================================================
// 🇹🇿 SEHEMU YA 3: MECHI ZOTE NA FREE TIPS (PENDING, WON, LIVE MOCK TIPS)
// 🇬🇧 SECTION 3: ALL MATCHES AND FREE TIPS DATABANK
// =========================================================================
// MUHIMU: Kuna namna ya kuonfeza mechi mpya hapa kwa kuzingatia yafuatayo:
// 1. Kundi la mechi ('category'):
//    - 'rollover': Mechi za Rollover (za uvaaji mdogo lakini uhakika sana)
//    - 'daily': Daily VIP Free/All Tips
//    - 'trending': Mechi za kipekee kama draw (X)
//    - 'live_capital': Live matches (MIA 60, nk.)
//
// 2. Hali ya matokeo ya mechi ('status'):
//    - 'pending': Inasubiri kuchezwa
//    - 'live': Inachezwa kwa sasa live
//    - 'won': Imeshinda (itapata tick ya kijani ya ushindi!)
//    - 'lost': Imepoteza
// Kila id lazima iwe ya kipekee kabisa (mfano: 'free-game-12')
// =========================================================================
export const HISTORICAL_TIPS: BettingTip[] = [

  // ===================================================================
  // 🎯 KUNDI A: FREE ROLLOVER TIPS (Hapa unaweza kuongeza mechi za Rollover)
  // ===================================================================
  {
    id: 'roll-1',
    teams: ['Real Madrid', 'Mallorca'],
    league: 'La Liga (Spain)',
    time: '19:45',
    date: 'Today',
    odds: 1.30,
    tip: 'Real Madrid to Win (Home Win)',
    tipExplanation: 'Real Madrid are incredibly strong at home and their starting lineup is fully fit for this title match.',
    category: 'rollover',
    probability: 95,
    status: 'pending',
    risk: 'Low',
    tipsterId: 't-1' // VIP SURE DRAWS
  },
  {
    id: 'roll-2',
    teams: ['Bayern Munich', 'Augsburg'],
    league: 'Bundesliga (Germany)',
    time: '16:30',
    date: 'Today',
    odds: 1.35,
    tip: 'Bayern Munich Over 1.5 Goals',
    tipExplanation: 'Bayern have scored 12 goals in their last 4 matches. Augsburg exhibit a vulnerable defense recently.',
    category: 'rollover',
    probability: 92,
    status: 'pending',
    risk: 'Low',
    tipsterId: 't-4' // Free Rollover Tips
  },
  {
    id: 'roll-3',
    teams: ['Manchester City', 'Leicester City'],
    league: 'English Premier League',
    time: '18:00',
    date: 'Tomorrow',
    odds: 1.25,
    tip: 'Man City to Win Either Half',
    tipExplanation: 'City are aggressively chasing the title and Leicester maintain a disappointing away record this season.',
    category: 'rollover',
    probability: 94,
    status: 'pending',
    risk: 'Low',
    tipsterId: 't-1' // VIP SURE DRAWS
  },
  {
    id: 'roll-4',
    teams: ['Paris SG', 'Nantes'],
    league: 'Ligue 1 (France)',
    time: '21:00',
    date: 'Tomorrow',
    odds: 1.28,
    tip: 'PSG to Win (Direct Win)',
    tipExplanation: 'PSG remain undefeated at Parc des Princes in domestic fixtures since the beginning of this calendar year.',
    category: 'rollover',
    probability: 90,
    status: 'pending',
    risk: 'Low',
    tipsterId: 't-4' // Free Rollover Tips
  },

  // ===================================================================
  // 👑 KUNDI B: FREE DAILY TIPS (Mechi za Daily VIP kundi la bure/all tips)
  // ===================================================================
  {
    id: 'daily-1',
    teams: ['Chelsea', 'Arsenal'],
    league: 'English Premier League',
    time: '15:15',
    date: 'Today',
    odds: 1.85,
    tip: 'Both Teams to Score (GG)',
    tipExplanation: 'A highly explosive London derby pitting two lethal offenses against each other with clear defensive gaps.',
    category: 'daily',
    probability: 82,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-2' // Free Draw Tips
  },
  {
    id: 'daily-2',
    teams: ['Inter Milan', 'Juventus'],
    league: 'Serie A (Italy)',
    time: '21:45',
    date: 'Today',
    odds: 1.95,
    tip: 'Inter Milan to Win (Direct Win)',
    tipExplanation: 'Inter hold an outstanding record in home derbies. Juventus face key selection challenges due to midfield injuries.',
    category: 'daily',
    probability: 78,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-3' // Free Over 1.5 Tips
  },
  {
    id: 'daily-3',
    teams: ['Al Ahly', 'Mamelodi Sundowns'],
    league: 'CAF Champions League',
    time: '20:00',
    date: 'Tomorrow',
    odds: 1.70,
    tip: 'Under 2.5 Goals',
    tipExplanation: 'Intense continental rivalries typically prioritize rigid defensive setups and tight tactical caution.',
    category: 'daily',
    probability: 85,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-6' // VIP FIXED DRAW
  },
  {
    id: 'daily-4',
    teams: ['Young Africans', 'Simba SC'],
    league: 'Tanzania NBC Premier League',
    time: '17:00',
    date: 'Today',
    odds: 1.62,
    tip: 'Young Africans or Draw (Double Chance 1X)',
    tipExplanation: 'Kariakoo Derby action. Yanga SC are in phenomenal peak physical format and averaging very high goals per match.',
    category: 'daily',
    probability: 88,
    status: 'pending',
    risk: 'Low',
    tipsterId: 't-9' // Vip 10+ Vip Odds
  },

  // ===================================================================
  // 🔥 KUNDI C: TRENDING TIPS (Inajumuisha draws [X] na mechi zenye kuvuma)
  // ===================================================================
  {
    id: 'trend-1',
    teams: ['Tottenham', 'Manchester United'],
    league: 'English Premier League',
    time: '20:30',
    date: 'Today',
    odds: 2.10,
    tip: 'Tottenham to Win & Over 1.5 Goals',
    tipExplanation: 'Tottenham boast high creative chemistry upfront. Strong home fans support will further energize their offensive line.',
    category: 'trending',
    probability: 72,
    status: 'pending',
    risk: 'High',
    tipsterId: 't-7' // Vip Ht Ft
  },
  {
    id: 'trend-2',
    teams: ['Atletico Madrid', 'Barcelona'],
    league: 'La Liga (Spain)',
    time: '22:00',
    date: 'Today',
    odds: 2.30,
    tip: 'Barcelona to Win (Away Win)',
    tipExplanation: 'Barcelona are cruising on a 5-match winning streak away. Atletico are weakened in defensive combinations due to injuries.',
    category: 'trending',
    probability: 68,
    status: 'pending',
    risk: 'High',
    tipsterId: 't-2' // Free Draw Tips
  },
  {
    id: 'trend-3',
    teams: ['Liverpool', 'Aston Villa'],
    league: 'English Premier League',
    time: '17:00',
    date: 'Tomorrow',
    odds: 2.05,
    tip: 'Liverpool Halftime / Fulltime',
    tipExplanation: 'Salah is performing in peak elite condition this season. Liverpool will start aggressively to secure an early lead.',
    category: 'trending',
    probability: 75,
    status: 'pending',
    risk: 'High',
    tipsterId: 't-11' // Risk Taker Only
  },
  {
    id: 'trend-4',
    teams: ['Dortmund', 'Leverkusen'],
    league: 'Bundesliga (Germany)',
    time: '18:30',
    date: 'Tomorrow',
    odds: 2.25,
    tip: 'Over 3.5 Goals',
    tipExplanation: 'Both sides deploy highly expressive attacking formulas but leave substantial gaps in passive defensive phases.',
    category: 'trending',
    probability: 70,
    status: 'pending',
    risk: 'High',
    tipsterId: 't-8' // VIP roll Over
  },

  // ===================================================================
  // ⚡ KUNDI D: LIVE CAPITAL IN-PLAY (MIA 60, FORTY4, TAZAR, nk.)
  // ===================================================================
  {
    id: 'live-cap-1',
    teams: ['Real Madrid', 'Barcelona'],
    league: 'La Liga (Spain)',
    time: 'Live Now (65\')',
    date: 'Live',
    odds: 1.48,
    tip: 'Under 3.5 Goals (Live)',
    tipExplanation: 'An incredibly tense classical clash with heavily defensive adjustments applied on both benches during the second half.',
    category: 'live_capital',
    probability: 96,
    status: 'live',
    halfTimeScore: '1 - 0',
    risk: 'Low',
    tipsterId: 't-12' // MIA 60
  },
  {
    id: 'live-cap-2',
    teams: ['Arsenal', 'Chelsea'],
    league: 'Premier League (Eng)',
    time: 'Live Now (78\')',
    date: 'Live',
    odds: 1.55,
    tip: 'Arsenal or Draw (1X Live)',
    tipExplanation: 'Arsenal dictate midfield tempo gracefully and are heavily capitalizing on loud home support.',
    category: 'live_capital',
    probability: 94,
    status: 'live',
    halfTimeScore: '2 - 1',
    risk: 'Low',
    tipsterId: 't-13' // Forty4
  },
  {
    id: 'live-cap-3',
    teams: ['Paris SG', 'Monaco'],
    league: 'Ligue 1 (France)',
    time: 'Live Now (52\')',
    date: 'Live',
    odds: 1.62,
    tip: 'Over 2.5 Goals (Live)',
    tipExplanation: 'End-to-end lightning pace with clear gaps opening up in both backlines.',
    category: 'live_capital',
    probability: 92,
    status: 'live',
    halfTimeScore: '1 - 1',
    risk: 'Medium',
    tipsterId: 't-14' // Tazar
  },
  {
    id: 'live-cap-4',
    teams: ['Man City', 'Liverpool'],
    league: 'Premier League (Eng)',
    time: 'Live Now (32\')',
    date: 'Live',
    odds: 1.42,
    tip: 'Over 1.5 Goals (Live)',
    tipExplanation: 'Massive heavyweights encounter with high offensive output and dangerous quick vertical transition pairs.',
    category: 'live_capital',
    probability: 95,
    status: 'live',
    halfTimeScore: '0 - 0',
    risk: 'Low',
    tipsterId: 't-15' // MR 10+ ODDS
  },

  // ===================================================================
  // 🐼 KUNDI E: DRAW (X) SPECIAL MECHI (Kama Trending Draw archive zilizopita)
  // ===================================================================
  {
    id: 'trend-panda-1',
    teams: ['Bahir Dar Kenema', 'Hawassa'],
    league: 'Ethiopian Premier League',
    time: '15:30',
    date: 'Today',
    odds: 3.00,
    tip: 'Draw (X)',
    tipExplanation: 'Both sides have highly defensive tactical strategies, looking highly likely to end in a low-scoring stalemate.',
    category: 'trending',
    probability: 95,
    status: 'pending',
    risk: 'Low',
    tipsterId: 't-5'
  },
  {
    id: 'trend-panda-2',
    teams: ['Portsmouth', 'Southampton'],
    league: 'Championship (Eng)',
    time: '18:00',
    date: 'Today',
    odds: 3.20,
    tip: 'Draw (X)',
    tipExplanation: 'A tense derby with key central defenders commanding the box. Highly valuable draw prediction.',
    category: 'trending',
    probability: 92,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-5'
  },
  {
    id: 'trend-panda-3',
    teams: ['Modena', 'Palermo'],
    league: 'Serie B (Italy)',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 3.20,
    tip: 'Draw (X)',
    tipExplanation: 'Two evenly matched mid-table competitors settled for a tight 1-1 division of spoils.',
    category: 'trending',
    probability: 94,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-5'
  },
  {
    id: 'trend-panda-4',
    teams: ['Avenide', 'Hamburgo'],
    league: 'Regional Liga (Ger)',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 3.00,
    tip: 'Draw (X)',
    tipExplanation: 'Heavy weather conditions with slow offensive pace resulting in a scoreless stalemate.',
    category: 'trending',
    probability: 91,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-5'
  },
  {
    id: 'trend-panda-5',
    teams: ['Baladiyat', 'Proxy'],
    league: 'Second Division (Egypt)',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 3.00,
    tip: 'Draw (X)',
    tipExplanation: 'Tactical clash with extremely clean discipline that sealed the single-point share.',
    category: 'trending',
    probability: 90,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-5'
  },
  {
    id: 'trend-panda-6',
    teams: ['Daryout', 'Aswan'],
    league: 'Second Division (Egypt)',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 2.70,
    tip: 'Draw (X)',
    tipExplanation: 'A late equalizer balanced out the scoreline as anticipated by our advanced model.',
    category: 'trending',
    probability: 93,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-5'
  },
  {
    id: 'trend-panda-7',
    teams: ['Aldosivi', 'Defensa Justicia'],
    league: 'Primera National (Arg)',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 3.00,
    tip: 'Draw (X)',
    tipExplanation: 'High tension cup playoffs. Both squads neutralised potential counterattacks perfectly.',
    category: 'trending',
    probability: 89,
    status: 'won',
    risk: 'High',
    tipsterId: 't-5'
  },
  {
    id: 'trend-panda-8',
    teams: ['Raya', 'Masar'],
    league: 'Second Division (Egypt)',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 3.00,
    tip: 'Draw (X)',
    tipExplanation: 'Low-percentage shots from outside the box made a draw the absolute natural projection.',
    category: 'trending',
    probability: 92,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-5'
  },

  // ===================================================================
  // 📚 KUNDI F: HISTORIA YA NYUMA YA MATOKEO (FREE ROLLOVER ARCHIVE)
  // ===================================================================
  {
    id: 'roll-y-1',
    teams: ['AC Milan', 'Empoli'],
    league: 'Serie A (Italy)',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 1.30,
    tip: 'AC Milan Over 1.5 Goals',
    tipExplanation: 'Determined local performance leading to two clean conversions and regular attacking rhythm.',
    category: 'rollover',
    probability: 93,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-4'
  },
  {
    id: 'roll-y-2',
    teams: ['Fenerbahce', 'Sivasspor'],
    league: 'Turkish Super Lig',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 1.25,
    tip: 'Fenerbahce Over 1.5 Goals',
    tipExplanation: 'Strong home record Turkish matches consistently boast several fast transition targets.',
    category: 'rollover',
    probability: 95,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-4'
  },
  {
    id: 'roll-2ago-1',
    teams: ['Lens', 'Lille'],
    league: 'Ligue 1 (France)',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 1.32,
    tip: 'Over 1.5 Goals',
    tipExplanation: 'Lively regional rivalries always yield aggressive end-to-end tactical variations.',
    category: 'rollover',
    probability: 91,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-4'
  },
  {
    id: 'roll-2ago-2',
    teams: ['Benfica', 'Rio Ave'],
    league: 'Primeira Liga (Portugal)',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 1.28,
    tip: 'Benfica to Win',
    tipExplanation: 'Benfica controlled play from the defensive third with three quick scoring finishes.',
    category: 'rollover',
    probability: 94,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-4'
  },
  {
    id: 'roll-3ago-1',
    teams: ['Ajax', 'Utrecht'],
    league: 'Eredivisie (Netherlands)',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 1.35,
    tip: 'Over 1.5 Goals',
    tipExplanation: 'Open styles characteristic of Dutch dynamic play ensured multiple visual targets reached.',
    category: 'rollover',
    probability: 90,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-4'
  },
  {
    id: 'roll-3ago-2',
    teams: ['Celtic', 'Hearts'],
    league: 'Scottish Premiership',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 1.22,
    tip: 'Celtic to Win (Direct Win)',
    tipExplanation: 'Unbeaten home champions asserted total tactical authority to win comfortably.',
    category: 'rollover',
    probability: 96,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-4'
  },

  // ===================================================================
  // 📚 KUNDI G: HISTORIA YA NYUMA YA MATOKEO (FREE DAILY TICKETS ARCHIVE)
  // ===================================================================
  {
    id: 'daily-y-1',
    teams: ['Lazio', 'Fiorentina'],
    league: 'Serie A (Italy)',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 1.80,
    tip: 'Both Teams to Score (GG)',
    tipExplanation: 'Fast clinical finishing from both sides ended in an engaging 2-1 final scorecard.',
    category: 'daily',
    probability: 88,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-2'
  },
  {
    id: 'daily-y-2',
    teams: ['Girona', 'Athletic Bilbao'],
    league: 'La Liga (Spain)',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 1.74,
    tip: 'Over 2.5 Goals',
    tipExplanation: 'High-press defensive systems broke down on counter situations, yielding three beautiful scores.',
    category: 'daily',
    probability: 82,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-3'
  },
  {
    id: 'daily-2ago-1',
    teams: ['Brighton', 'Crystal Palace'],
    league: 'English Premier League',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 1.85,
    tip: 'Both Teams to Score (GG)',
    tipExplanation: 'Pulsating local rivalry with endless attacking transitions ending 1-1 at full time.',
    category: 'daily',
    probability: 85,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-2'
  },
  {
    id: 'daily-2ago-2',
    teams: ['Leverkusen', 'Nurnberg'],
    league: 'DFB Pokal (Germany)',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 1.68,
    tip: 'Leverkusen Over 2.5 Goals',
    tipExplanation: 'The treble-holders overwhelmed the visitors with high tempo, scoring 3-0 comfortably.',
    category: 'daily',
    probability: 89,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-3'
  },
  {
    id: 'daily-3ago-1',
    teams: ['Valencia', 'Celta Vigo'],
    league: 'La Liga (Spain)',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 1.95,
    tip: 'Both Teams to Score (GG)',
    tipExplanation: 'Vulnerable central pairings on both sides yielded standard GG goals.',
    category: 'daily',
    probability: 80,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-2'
  },
  {
    id: 'daily-3ago-2',
    teams: ['Stuttgart', 'Hoffenheim'],
    league: 'Bundesliga (Germany)',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 1.72,
    tip: 'Stuttgart to Win',
    tipExplanation: 'Stuttgart controlled transition lanes effortlessly and completed tactical targets nicely.',
    category: 'daily',
    probability: 86,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-3'
  },

  // =========================================================================
  // 👑 KUNDI H: HISTORIA YA MECHI ZA VIP (VIP PAST WON HISTORY - HISTORIA YA JANA)
  // =========================================================================
  // MUHIMU SANA: Hapa ndipo unapoongeza Historia za jana au za nyuma za VIP Tickets.
  // Mechi yoyote utakayoiweka hapa chini ikiwa na 'status': 'won' itaonekana moja kwa moja
  // kwenye modal ya "Yesterday's Won History" ili wateja wajionee jinsi mnavyokula jana!
  // =========================================================================
  {
    id: 'vip-y-1',
    teams: ['Manchester City', 'RB Leipzig'],
    league: 'UEFA Champions League',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 1.90,
    tip: 'Man City to Win & Over 2.5 Goals',
    tipExplanation: 'A supreme performance by City at home, securing a convincing 3-1 victory.',
    category: 'daily',
    probability: 95,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-1'
  },
  {
    id: 'vip-y-2',
    teams: ['PSG', 'Heidelberg'],
    league: 'Ligue 1 (France)',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 3.20,
    tip: 'Draw (X)',
    tipExplanation: 'PSG experienced substantial fatigue, settling for a surprise 1-1 outcome.',
    category: 'daily',
    probability: 90,
    status: 'won',
    risk: 'High',
    tipsterId: 't-6'
  },
  {
    id: 'vip-y-3',
    teams: ['Real Madrid', 'Milan'],
    league: 'UEFA Champions League',
    time: 'Yesterday',
    date: 'Yesterday',
    odds: 4.80,
    tip: 'HT: X / FT: 1',
    tipExplanation: 'A masterclass dynamic game. Even at halftime and a secure comeback win in second period.',
    category: 'trending',
    probability: 92,
    status: 'won',
    risk: 'High',
    tipsterId: 't-7'
  },
  {
    id: 'vip-2ago-1',
    teams: ['Arsenal', 'Aston Villa'],
    league: 'English Premier League',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 1.85,
    tip: 'Arsenal to Win',
    tipExplanation: 'Dynamic home pitch command with two clinical goals in the late stages.',
    category: 'daily',
    probability: 96,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-1'
  },
  {
    id: 'vip-2ago-2',
    teams: ['Monaco', 'Nice'],
    league: 'Ligue 1 (France)',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 3.10,
    tip: 'Draw (X)',
    tipExplanation: 'Tactical block from Nice disrupted Monaco play to preserve a goalless point share.',
    category: 'daily',
    probability: 93,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-6'
  },
  {
    id: 'vip-2ago-3',
    teams: ['Dortmund', 'Bremen'],
    league: 'Bundesliga (Germany)',
    time: '2 Days Ago',
    date: '2 Days Ago',
    odds: 4.20,
    tip: 'HT: 1 / FT: 1',
    tipExplanation: 'Stunning opening attack with immediate command and final comfortable lead retention.',
    category: 'trending',
    probability: 88,
    status: 'won',
    risk: 'High',
    tipsterId: 't-7'
  },
  {
    id: 'vip-3ago-1',
    teams: ['Inter Milan', 'Napoli'],
    league: 'Serie A (Italy)',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 2.10,
    tip: 'Inter to Win (Direct)',
    tipExplanation: 'Inter maintained narrow lines and converted a critical penalty in 70 min.',
    category: 'daily',
    probability: 94,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-1'
  },
  {
    id: 'vip-3ago-2',
    teams: ['Real Sociedad', 'Real Betis'],
    league: 'La Liga (Spain)',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 2.95,
    tip: 'Draw (X)',
    tipExplanation: 'A defensive masterclass from both coaches in a tight tactical stalemate.',
    category: 'daily',
    probability: 91,
    status: 'won',
    risk: 'Medium',
    tipsterId: 't-6'
  },
  {
    id: 'vip-3ago-3',
    teams: ['Porto', 'Braga'],
    league: 'Primeira Liga (Portugal)',
    time: '3 Days Ago',
    date: '3 Days Ago',
    odds: 1.65,
    tip: 'Porto to Win',
    tipExplanation: 'Porto overpowered the visitors in the first forty-five, cruising to victory.',
    category: 'rollover',
    probability: 95,
    status: 'won',
    risk: 'Low',
    tipsterId: 't-8'
  }
];

export const MOCK_TIPS: BettingTip[] = [
  ...ACTIVE_MECHI_ZETU,
  ...HISTORICAL_TIPS
];
