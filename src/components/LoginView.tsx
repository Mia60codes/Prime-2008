import React, { useState, useEffect } from 'react';
import { UserSession, CountryInfo } from '../types';
import { POPULAR_COUNTRIES } from '../data/mockTips';
import { detectCountryByTimezone, fetchGeoCountry } from '../utils/geo';
import { Shield, Smartphone, User, Globe, Trophy, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginViewProps {
  onLoginSuccess: (session: UserSession) => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(POPULAR_COUNTRIES[0]);
  const [isDetecting, setIsDetecting] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // 1. Initial guestimate by timezone
    const initialGuess = detectCountryByTimezone();
    setSelectedCountry(initialGuess);
    setIsDetecting(false);

    // 2. Try actual precise IP geolocation fallback
    fetchGeoCountry().then((preciseCountry) => {
      if (preciseCountry) {
        setSelectedCountry(preciseCountry);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name to proceed.');
      return;
    }
    if (name.trim().length < 3) {
      setErrorMsg('Name must be at least 3 characters long.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your telephone number.');
      return;
    }

    // Basic cleaning and validation
    const cleanPhone = phone.replace(/\s+/g, '');
    if (cleanPhone.length < 7) {
      setErrorMsg('Please enter a valid telephone number.');
      return;
    }

    const newSession: UserSession = {
      name: name.trim(),
      phone: `${selectedCountry.dialCode} ${cleanPhone}`,
      country: selectedCountry.name,
      countryCode: selectedCountry.code,
      isRegistered: true,
      joinedAt: new Date().toISOString(),
    };

    // Save session in localStorage for persistent login
    localStorage.setItem('prime_picks_user_session', JSON.stringify(newSession));
    onLoginSuccess(newSession);
  };

  return (
    <div id="login-container" className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-gray-100">
      {/* Background soccer stadium overlay effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from- emerald-950/20 via-slate-950 to-slate-950 pointer-events-none z-0" />
      
      {/* Glowing abstract circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        id="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl shadow-lg shadow-orange-500/25 mb-4">
            <Trophy className="w-8 h-8 text-black" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            PRIME PICKS <span className="text-orange-500 font-mono">2008</span> <span className="inline-block animate-pulse">🔥</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Welcome Champion! Register to receive premium betting tips daily.
          </p>
        </div>

        {/* Feature quick showcase points */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 text-center">
            <p className="text-xs text-orange-400 font-bold mb-0.5">Roll Over</p>
            <p className="text-[10px] text-slate-400">Winning Streak</p>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 text-center">
            <p className="text-xs text-emerald-400 font-bold mb-0.5">Daily Tips</p>
            <p className="text-[10px] text-slate-400">95% Accuracy</p>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 text-center">
            <p className="text-xs text-amber-400 font-bold mb-0.5">Trending</p>
            <p className="text-[10px] text-slate-400">High Odds</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && (
            <div id="error-message" className="p-3 bg-red-500/15 border border-red-500/30 text-red-200 text-xs rounded-xl text-center font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-orange-500" /> Your Betting Username
            </label>
            <div className="relative">
              <input
                id="input-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Juma Ally"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none py-3 px-4 rounded-xl text-sm transition-colors text-white"
              />
            </div>
          </div>

          {/* Country auto detection badge */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-medium">Auto-detected country:</p>
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                  <span className="text-emerald-400 font-semibold">({selectedCountry.dialCode})</span>
                </p>
              </div>
            </div>
            {isDetecting && (
              <span className="text-[10px] text-amber-400 animate-pulse bg-amber-500/15 px-2 py-0.5 rounded-full">
                Detecting...
              </span>
            )}
          </div>

          {/* Phone Input with country selection support as well */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-orange-500" /> Telephone Number
            </label>
            <div className="flex gap-2">
              {/* Simple inline flag selector */}
              <select
                id="select-country"
                value={selectedCountry.code}
                onChange={(e) => {
                  const found = POPULAR_COUNTRIES.find(c => c.code === e.target.value);
                  if (found) setSelectedCountry(found);
                }}
                className="bg-slate-950/80 border border-slate-800 text-sm py-3 px-2.5 rounded-xl font-bold cursor-pointer focus:outline-none focus:border-orange-500"
              >
                {POPULAR_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.flag} {c.code} ({c.dialCode})
                  </option>
                ))}
              </select>
              
              <input
                id="input-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="712345678"
                className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none py-3 px-4 rounded-xl text-sm transition-colors text-white font-mono tracking-wide"
              />
            </div>
            <p className="text-[10px] text-slate-500 text-right mt-1">
              You'll stay logged in secure and permanently on this device.
            </p>
          </div>

          {/* Submit Button */}
          <button
            id="btn-login-submit"
            type="submit"
            className="w-full mt-2 cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            Access Free Betting Tips Now 🔥
            <ChevronRight className="w-4 h-4" strokeWidth={3} />
          </button>
        </form>

        {/* Security / Decency Policy notice */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-slate-500 text-[10px]">
          <Shield className="w-3.5 h-3.5 text-emerald-500/80" />
          <span>Prime Picks 2008 secures your privacy in {selectedCountry.name}.</span>
        </div>
      </motion.div>
    </div>
  );
}
