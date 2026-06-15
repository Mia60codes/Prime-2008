import { BettingTip } from '../types';

// =========================================================================
// 🇹🇿 MWONGOZO WA MTUMIAJI: JINSI YA KUONGEZA NA KUBADILISHA MECHI HAPA
// =========================================================================
// Faili hili limebuniwa maalum ili kukurahisishia wewe kuongeza mechi zako
// mpya, kubadili matokeo (won, lost, live, pending) na kuzipanga kwa makundi.
// 
// 1. MAELEZO YA KILA SEHEMU YA MECHI (Match Properties):
//    - id: ID ya kipekee kabisa (kila mechi iwe na id tofauti, mfano: 'm-01', 'm-02')
//    - teams: Timu mbili zinazocheza. Lazima ziandikwe hivi: ['Timu ya Kwanza', 'Timu ya Pili']
//    - league: Ligi ya mechi (mfano: 'Tanzania NBC Premier League', 'English Premier League')
//    - time: Muda wa kuanza mechi (mfano: '19:00', '16:30')
//    - date: Siku ya mechi (mfano: 'Today', 'Tomorrow', au tarehe kama 'June 17')
//    - odds: Odds za ushindi za mechi hiyo (mfano: 1.85, 2.10, 1.45)
//    - tip: Utabiri wako (mfano: 'Direct Win (1)', 'Draw (X)', 'Over 1.5 Goals', '1X & Over 1.5')
//    - tipExplanation: Maelezo mafupi au uchambuzi wa mechi hiyo kwa kiswahili/kiingereza
//    - category: Kundi la mechi. Unaweza kuchagua KATI YA HAYA MANE TU kwa herufi ndogo:
//         * 'trending'       => Kundi la Free Trending Tips (🔥 Mechi zinazovuma sana!)
//         * 'daily'          => Kundi la Daily VIP Free Tips (📅 Mechi za Kila Siku)
//         * 'rollover'       => Kundi la Free Rollover Tips (🔄 Mechi za mtaji mdogo mdogo)
//         * 'live_capital'   => Kundi la Live In-Play Capital (⚡ Mechi zinazochezwa sasa hivi)
//    - probability: Uhakika wa mechi kwa asilimia (mfano: 95 inamaanisha 95%)
//    - status: Matokeo au hali ya mechi hiyo:
//         * 'pending'        => Mechi bado haijaanza au kuchezwa (Inasubiriwa)
//         * 'live'           => Mechi inaendelea kuchezwa hivi sasa live
//         * 'won'            => Mechi imeshinda (Itapata tick ya KIJANI ya ushindi!)
//         * 'lost'           => Mechi imepoteza (Itapata alama ya NYEKUNDU)
//    - risk: Hatari ya mechi hiyo. Chagua kati ya: 'Low' (Ndogo), 'Medium' (Kati), au 'High' (Kubwa)
//    - tipsterId: ID ya profile unayotaka ionekane imeposti mechi hii:
//         * 't-1'  => VIP SURE DRAWS (SURE)
//         * 't-2'  => Free Draw Tips (X DRAW)
//         * 't-3'  => Free Over 1.5 Tips (1.5+ GOALS)
//         * 't-4'  => Free Rollover Tips (RLR ROLLS)
//         * 't-5'  => Trending Tips (TRD HOT)
//         * 't-12' => MIA 60 (MIA 60 SEC)
//         * 't-13' => Forty4 (F44 LIVE)
//         * 't-14' => Tazar (TZR LIVE)
//         * 't-15' => MR 10+ ODDS (MR10 SECURE)
// =========================================================================

export const ACTIVE_MECHI_ZETU: BettingTip[] = [
  // ===================================================================
  // 🔥 KUNDI C: TRENDING TIPS (Hapa unaweza kuongeza mechi za Trending!)
  // ===================================================================
    
  {
    id: 'm-trend-1',
    teams: ['Young Africans', 'Simba SC'],
    league: 'Tanzania NBC Premier League',
    time: '17:00',
    date: 'Today',
    odds: 1.82,
    tip: 'Young Africans to Win (1)',
    tipExplanation: 'Kariakoo Derby action! Yanga are in great form and play on home turf with highly motivated squads.',
    category: 'trending',
    probability: 88,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-5' // Trending Tips
  },

 {
    id: 'm-trend-1',
    teams: ['Young Africans', 'Simba SC'],
    league: 'Tanzania NBC Premier League',
    time: '17:00',
    date: 'Today',
    odds: 1.82,
    tip: 'Young Africans to Win (1)',
    tipExplanation: 'Kariakoo Derby action! Yanga are in great form and play on home turf with highly motivated squads.',
    category: 'trending',
    probability: 88,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-5' // Trending Tips
  },


 {
    id: 'm-trend-1',
    teams: ['Young Africans', 'Simba SC'],
    league: 'Tanzania NBC Premier League',
    time: '17:00',
    date: 'Today',
    odds: 1.82,
    tip: 'Young Africans to Win (1)',
    tipExplanation: 'Kariakoo Derby action! Yanga are in great form and play on home turf with highly motivated squads.',
    category: 'trending',
    probability: 88,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-5' // Trending Tips
  },

{
    id: 'm-trend-1',
    teams: ['Young Africans', 'Simba SC'],
    league: 'Tanzania NBC Premier League',
    time: '17:00',
    date: 'Today',
    odds: 1.82,
    tip: 'Young Africans to Win (1)',
    tipExplanation: 'Kariakoo Derby action! Yanga are in great form and play on home turf with highly motivated squads.',
    category: 'trending',
    probability: 88,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-5' // Trending Tips
  },
  {
    id: 'm-trend-2',
    teams: ['Tottenham', 'Manchester United'],
    league: 'English Premier League',
    time: '20:30',
    date: 'Today',
    odds: 2.10,
    tip: 'Over 2.5 Goals',
    tipExplanation: 'Both Tottenham and Man United prefer fast defensive-to-offensive transitions. Expect at least 3 goals.',
    category: 'trending',
    probability: 82,
    status: 'pending',
    risk: 'Medium',
    tipsterId: 't-5' // Trending Tips
  },
  {
    id: 'm-trend-3',
    teams: ['Real Madrid', 'Barcelona'],
    league: 'La Liga (Spain)',
    time: '22:00',
    date: 'Tomorrow',
    odds: 2.25,
    tip: 'Real Madrid or Draw (1X)',
    tipExplanation: 'El Clasico clash. Real Madrid holds a solid home record against Barcelona over the past three seasons.',
    category: 'trending',
    probability: 79,
    status: 'pending',
    risk: 'Low',
    tipsterId: 't-1' // VIP SURE DRAWS
  },

  // ===================================================================
  // 📅 KUNDI B: DAILY TIPS (Mechi za Kila Siku)
  // ===================================================================
  {
    id: 'm-daily-1',
    teams: ['Bayern Munich', 'Dortmund'],
    league: 'Bundesliga (Germany)',
    time: '19:30',
    date: 'Today',
    odds: 1.65,
    tip: 'Bayern Munich to Win (1)',
    tipExplanation: 'Der Klassiker! Bayern Munich is strongly favored at the Allianz Arena where they score highly.',
    category: 'daily',
    probability: 85,
    status: 'pending',
    risk: 'Low',
    tipsterId: 't-1' // VIP SURE DRAWS
  },
  {
    id: 'm-daily-2',
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

  // ===================================================================
  // 🔄 KUNDI A: FREE ROLLOVER TIPS (Mechi za Rollover)
  // ===================================================================
  {
    id: 'm-roll-1',
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
    id: 'm-roll-2',
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

  // ===================================================================
  // ⚡ KUNDI D: LIVE CAPITAL (Mechi za Live zilizochezwa/zinazochezwa)
  // ===================================================================
  {
    id: 'm-live-1',
    teams: ['Arsenal', 'Chelsea'],
    league: 'English Premier League',
    time: '75 Min',
    date: 'Today',
    odds: 1.40,
    tip: 'Arsenal or Draw (1X)',
    tipExplanation: 'Chelsea are pushing with 10 men. Arsenal is defending their lead successfully.',
    category: 'live_capital',
    probability: 94,
    status: 'live',
    halfTimeScore: '1 - 0',
    risk: 'Low',
    tipsterId: 't-12' // MIA 60
  }
];
