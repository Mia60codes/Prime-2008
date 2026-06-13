export interface Tipster {
  id: string;
  name: string;
  accuracy: number;
  isVerified: boolean;
  avatarUrl: string; // fallback or unique SVGs / beautiful color themes
  tipsCount: number;
  followersCount: number;
  isFollowing?: boolean;
  bio?: string;
  liveCountdownMinutes?: number; // Muda wa kuhesabu chini kwa dakika (mfano: 60)
}

export interface BettingTip {
  id: string;
  teams: [string, string];
  league: string;
  time: string;
  date: string;
  odds: number;
  tip: string;
  tipExplanation: string;
  category: 'rollover' | 'daily' | 'trending' | 'live_capital';
  probability: number; // e.g. 85 for 85%
  status: 'pending' | 'won' | 'lost' | 'live';
  halfTimeScore?: string;
  fullTimeScore?: string;
  risk: 'Low' | 'Medium' | 'High';
  tipsterId: string; // Belongs to a tipster
}

export interface UserSession {
  name: string;
  phone: string;
  country: string;
  countryCode: string;
  isRegistered: boolean;
  joinedAt: string;
}

export interface CountryInfo {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}
