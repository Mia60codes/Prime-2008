import React from 'react';

interface TipsterAvatarProps {
  name: string;
  id?: string;
  sizeClassName?: string; // defaults to 'w-11 h-11'
}

export default function TipsterAvatar({ name, id = '', sizeClassName = 'w-11 h-11' }: TipsterAvatarProps) {
  const normalizedName = name.toUpperCase().trim();

  // 1. Precise Initial & Symbol mappings to make it look super premium and intentional
  let badgeText = '';
  let subText = '';
  let gradientClass = '';

  if (normalizedName.includes('VIP SURE DRAWS')) {
    badgeText = 'VSD';
    subText = 'SURE';
    gradientClass = 'from-amber-400 via-orange-500 to-red-600 text-slate-950';
  } else if (normalizedName.includes('FREE DRAW TIPS')) {
    badgeText = 'X';
    subText = 'DRAW';
    gradientClass = 'from-slate-800 via-slate-900 to-slate-950 text-amber-400 border border-amber-500/30';
  } else if (normalizedName.includes('FREE OVER 1.5')) {
    badgeText = '1.5+';
    subText = 'GOALS';
    gradientClass = 'from-cyan-505 via-blue-600 to-indigo-700 text-white';
  } else if (normalizedName.includes('FREE ROLLOVER')) {
    badgeText = 'RLR';
    subText = 'ROLLS';
    gradientClass = 'from-teal-500 via-emerald-600 to-green-700 text-white';
  } else if (normalizedName.includes('TRENDING')) {
    badgeText = 'TRD';
    subText = 'HOT';
    gradientClass = 'from-rose-500 via-orange-500 to-amber-500 text-white';
  } else if (normalizedName.includes('FIXED DRAW')) {
    badgeText = 'FIX';
    subText = 'DRAW';
    gradientClass = 'from-purple-600 via-pink-600 to-orange-500 text-white';
  } else if (normalizedName.includes('HT FT')) {
    badgeText = 'HT/FT';
    subText = 'DOUBLE';
    gradientClass = 'from-amber-500 via-yellow-405 to-yellow-300 text-slate-950 font-black';
  } else if (normalizedName.includes('VIP ROLL OVER')) {
    badgeText = 'VIP';
    subText = 'ROLL';
    gradientClass = 'from-violet-600 via-indigo-700 to-blue-800 text-white';
  } else if (normalizedName.includes('10+ VIP ODDS') || normalizedName.includes('10+ ODDS')) {
    badgeText = '10+';
    subText = 'ODDS';
    gradientClass = 'from-red-600 via-orange-600 to-yellow-500 text-white';
  } else if (normalizedName.includes('MIA 60')) {
    badgeText = 'MIA';
    subText = '60 SEC';
    gradientClass = 'from-[#00E676] via-emerald-600 to-teal-700 text-slate-950';
  } else if (normalizedName.includes('FORTY4')) {
    badgeText = 'F44';
    subText = 'LIVE';
    gradientClass = 'from-[#00FFE0] via-cyan-600 to-blue-705 text-slate-950';
  } else if (normalizedName.includes('TAZAR')) {
    badgeText = 'TZR';
    subText = 'LIVE';
    gradientClass = 'from-amber-400 via-orange-500 to-red-600 text-slate-950';
  } else if (normalizedName.includes('MR 10+')) {
    badgeText = 'MR10';
    subText = 'SECURE';
    gradientClass = 'from-[#E91E63] via-rose-600 to-red-700 text-white';
  } else {
    // Default fallback based on initials of first 2 words
    const words = normalizedName.split(/\s+/);
    if (words.length >= 2) {
      badgeText = words[0][0] + words[1][0];
    } else if (words.length === 1 && words[0].length > 0) {
      badgeText = words[0].substring(0, Math.min(3, words[0].length));
    } else {
      badgeText = 'PP';
    }
    subText = 'TIPS';
    gradientClass = 'from-slate-700 via-slate-800 to-slate-900 text-slate-200 border border-slate-700';
  }

  // Adjust text sizes dynamically based on the rendering size container
  const isSmall = sizeClassName.includes('w-8') || sizeClassName.includes('h-8');
  const isLarge = sizeClassName.includes('w-16') || sizeClassName.includes('w-20') || sizeClassName.includes('w-24');

  let textStyle = 'text-xs font-black tracking-tighter';
  let subTextStyle = 'text-[6px] font-bold tracking-widest';

  if (isSmall) {
    textStyle = 'text-[9.5px] font-black tracking-tight leading-none';
    subTextStyle = 'text-[5px] font-bold tracking-tighter hidden';
  } else if (isLarge) {
    textStyle = 'text-lg font-black tracking-tighter leading-none';
    subTextStyle = 'text-[8px] font-bold tracking-widest';
  }

  return (
    <div
      className={`relative ${sizeClassName} rounded-xl bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center font-sans overflow-hidden select-none shadow-lg shrink-0`}
    >
      {/* Decorative scanline accent inside the badge */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[size:6px_6px] pointer-events-none opacity-60" />
      
      {/* Dynamic letter markings */}
      <span className={`${textStyle} z-10 leading-none uppercase`}>
        {badgeText}
      </span>
      {subText && !isSmall && (
        <span className={`${subTextStyle} z-10 uppercase mt-0.5 opacity-80 font-mono`}>
          {subText}
        </span>
      )}
    </div>
  );
}
