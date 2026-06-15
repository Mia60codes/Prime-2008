import React, { useState } from 'react';
import { BettingTip, Tipster } from '../types';
import { MOCK_TIPSTERS } from '../data/mockTips';
import { 
  X, Plus, Check, Trash2, Copy, FileCode, CheckSquare, 
  Clock, Shield, Award, HelpCircle, Flame, ArrowLeft, RefreshCw 
} from 'lucide-react';

interface AdminMatchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  tipsList: BettingTip[];
  onUpdateTips: (updatedTips: BettingTip[]) => void;
  onResetToDefault: () => void;
}

export default function AdminMatchPanel({ 
  isOpen, 
  onClose, 
  tipsList, 
  onUpdateTips,
  onResetToDefault
}: AdminMatchPanelProps) {
  
  // Tab control inside admin panel
  const [activeAdminTab, setActiveAdminTab] = useState<'add' | 'list' | 'guide'>('add');

  // Form states for adding a match
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [league, setLeague] = useState('English Premier League');
  const [time, setTime] = useState('18:00');
  const [date, setDate] = useState('Today');
  const [odds, setOdds] = useState('1.75');
  const [tipChoice, setTipChoice] = useState('Over 1.5 Goals');
  const [explanation, setExplanation] = useState('');
  const [category, setCategory] = useState<'trending' | 'daily' | 'rollover' | 'live_capital'>('trending');
  const [probability, setProbability] = useState('85');
  const [risk, setRisk] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [tipsterId, setTipsterId] = useState('t-5'); // Default: Trending Tips
  const [status, setStatus] = useState<'pending' | 'live' | 'won' | 'lost'>('pending');

  // Generated code preview container
  const [generatedCode, setGeneratedCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Process and save the single match
  const handleAddMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!team1.trim() || !team2.trim()) {
      alert('Tafadhali jaza majina ya timu zote mbili!');
      return;
    }

    const uniqueId = `m-custom-${Date.now()}`;
    const parsedOdds = parseFloat(odds) || 1.50;
    const parsedProb = parseInt(probability) || 85;

    const newTip: BettingTip = {
      id: uniqueId,
      teams: [team1.trim(), team2.trim()],
      league: league.trim(),
      time: time.trim(),
      date: date.trim(),
      odds: parsedOdds,
      tip: tipChoice.trim(),
      tipExplanation: explanation.trim() || `${team1} face ${team2} in a historical clash. Excellent value parameters detected.`,
      category,
      probability: parsedProb,
      status,
      risk,
      tipsterId
    };

    // Prepend new tip to the global list
    const updated = [newTip, ...tipsList];
    onUpdateTips(updated);

    // Format the generated code for copy-pasting
    const codeString = `  {
    id: '${uniqueId}',
    teams: ['${team1.trim().replace(/'/g, "\\'")}', '${team2.trim().replace(/'/g, "\\'")}'],
    league: '${league.trim().replace(/'/g, "\\'")}',
    time: '${time.trim()}',
    date: '${date.trim()}',
    odds: ${parsedOdds.toFixed(2)},
    tip: '${tipChoice.trim().replace(/'/g, "\\'")}',
    tipExplanation: '${(explanation.trim() || `${team1} and ${team2} show excellent metrics with goals.`).replace(/'/g, "\\'")}',
    category: '${category}',
    probability: ${parsedProb},
    status: '${status}',
    risk: '${risk}',
    tipsterId: '${tipsterId}'
  },`;

    setGeneratedCode(codeString);
    setSuccessMessage('Mechi imehifadhiwa kwa muda kwenye kivinjari chako (Temporary Live View)!');

    // Reset some form inputs
    setTeam1('');
    setTeam2('');
    setExplanation('');
    
    // Clear message after 4s
    setTimeout(() => {
      setSuccessMessage('');
    }, 4500);
  };

  // Change single game status (won, lost, live, pending) quickly
  const handleUpdateStatus = (id: string, newStats: 'pending' | 'live' | 'won' | 'lost') => {
    const updated = tipsList.map(tip => {
      if (tip.id === id) {
        return { ...tip, status: newStats };
      }
      return tip;
    });
    onUpdateTips(updated);
  };

  // Delete a game from current local temporary view list
  const handleDeleteTip = (id: string) => {
    if (confirm('Je, una uhakika unataka kuondoa mechi hii kwa sasa?')) {
      const updated = tipsList.filter(tip => tip.id !== id);
      onUpdateTips(updated);
    }
  };

  // Copy code utility
  const handleCopyCode = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 flex flex-col font-sans text-left">
      {/* HEADER BAR */}
      <div className="border-b border-slate-800 bg-slate-900 sticky top-0 p-4 shrink-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center border border-orange-500/20">
            <Award className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-wider">
              PRIME MATCH MANAGER 👑
            </h1>
            <p className="text-[10px] text-slate-400">Dhibiti na Ongeza Mechi zako kiurahisi kabisa</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="bg-slate-900 p-2 border-b border-slate-800 sticky top-[73px] z-10 flex gap-2">
        <button
          onClick={() => setActiveAdminTab('add')}
          className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
            activeAdminTab === 'add' 
              ? 'bg-orange-500 text-slate-950' 
              : 'bg-slate-800/60 text-slate-400 hover:text-white'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          Ongeza Mechi Mpya
        </button>
        <button
          onClick={() => setActiveAdminTab('list')}
          className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
            activeAdminTab === 'list' 
              ? 'bg-orange-500 text-slate-950' 
              : 'bg-slate-800/60 text-slate-400 hover:text-white'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          Orodha & Matokeo ({tipsList.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('guide')}
          className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
            activeAdminTab === 'guide' 
              ? 'bg-orange-500 text-slate-950' 
              : 'bg-slate-800/60 text-slate-400 hover:text-white'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          Mwongozo (Swahili Guide)
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 p-4 max-w-md mx-auto w-full pb-20 space-y-6">
        
        {/* SUCCESS ALERTS */}
        {successMessage && (
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs space-y-1.5">
            <p className="font-extrabold flex items-center gap-1.5">
              <Check className="w-4 h-4 bg-emerald-500 text-slate-950 rounded-full p-0.5" />
              {successMessage}
            </p>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              Mechi ipo hewani kwenye simu yako kwa majaribio sasa! Ili kuihifadhi milele kwenye Netlify, nenda chini hapo kwenye sanduku la msimbo (Generated Code) ukopi mistari hiyo kisha upaste kwenye faili la <span className="font-mono text-amber-400">/src/data/mechi_zetu.ts</span> kwenye GitHub!
            </p>
          </div>
        )}

        {/* TAB 1: ADD MATCH FORM */}
        {activeAdminTab === 'add' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800/60 p-4 rounded-3xl space-y-4">
              <h2 className="text-xs font-black text-slate-300 uppercase tracking-widest border-b border-slate-800/60 pb-2">
                Fomu ya Kusajili Mechi (Mechi Form)
              </h2>

              <form onSubmit={handleAddMatchSubmit} className="space-y-3.5 text-xs text-slate-300">
                {/* TEAMS */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Nyumbani (Team 1)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Simba SC"
                      value={team1}
                      onChange={e => setTeam1(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Ugenini (Team 2)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Young Africans"
                      value={team2}
                      onChange={e => setTeam2(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                      required
                    />
                  </div>
                </div>

                {/* LEAGUE & TIMING */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Ligi (League)</label>
                    <input 
                      type="text" 
                      value={league}
                      onChange={e => setLeague(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Muda wa Kuanza</label>
                    <input 
                      type="text" 
                      value={time}
                      onChange={e => setTime(e.target.value)}
                      placeholder="e.g. 17:00 or 80 Min"
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                      required
                    />
                  </div>
                </div>

                {/* ODDS & TIP */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Odds (Mfano: 1.85)</label>
                    <input 
                      type="text" 
                      value={odds}
                      onChange={e => setOdds(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Utabiri (Your Tip)</label>
                    <input 
                      type="text" 
                      value={tipChoice}
                      onChange={e => setTipChoice(e.target.value)}
                      placeholder="e.g. Direct Win (1) or X"
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                      required
                    />
                  </div>
                </div>

                {/* DATE & PROBABILITY */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Siku (Date Name)</label>
                    <select
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                    >
                      <option value="Today">Today (Leo)</option>
                      <option value="Tomorrow">Tomorrow (Kesho)</option>
                      <option value="Yesterday">Yesterday (Jana / Historia)</option>
                      <option value="2 Days Ago">2 Days Ago (Siku 2 zilizopita)</option>
                      <option value="3 Days Ago">3 Days Ago (Siku 3 zilizopita)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Maoni/Uhakika % (eg. 85)</label>
                    <input 
                      type="number" 
                      value={probability}
                      onChange={e => setProbability(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                {/* CATEGORY & RISK */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Kundi / Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                    >
                      <option value="trending">Free Trending Tips (Special 🔥)</option>
                      <option value="daily">Daily Free VIP Tips 📅</option>
                      <option value="rollover">Free Rollover Tips (Compounding 🔄)</option>
                      <option value="live_capital">Live In Play (Get Capital ⚡)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Kiwango cha Hatari / Risk</label>
                    <select
                      value={risk}
                      onChange={e => setRisk(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                    >
                      <option value="Low">Low Risk (Ndogo sana)</option>
                      <option value="Medium">Medium Risk (Kati)</option>
                      <option value="High">High Risk (Kubwa)</option>
                    </select>
                  </div>
                </div>

                {/* CHOOSE TIPSTER PROFILE PORTRAIT */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Nani anaposti? (Tipster Profile Badge)</label>
                  <select
                    value={tipsterId}
                    onChange={e => setTipsterId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                  >
                    {MOCK_TIPSTERS.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} (Accuracy: {t.accuracy}%)
                      </option>
                    ))}
                  </select>
                </div>

                {/* CHOOSE INITIAL MATCH STATUS */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Hali ya Mwanzoni / Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                  >
                    <option value="pending">⏳ Pending (Inasubiri kuchezwa)</option>
                    <option value="live">🔴 Live (Mechi inaendelea sasa - hasa Live Capital)</option>
                    <option value="won">✅ Won / Ushindi (Kuweka as tick ya Kijani)</option>
                    <option value="lost">❌ Lost / Alama Kuu Nyekundu</option>
                  </select>
                </div>

                {/* EXPLANATION / UCHAMBUZI YA MECHI */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Maelezo ya Uchambuzi (Match Analysis / Tip explanation)</label>
                  <textarea
                    rows={2}
                    value={explanation}
                    onChange={e => setExplanation(e.target.value)}
                    placeholder="Uchambuzi wako (mfano: Yanga inacheza nyumbani ikiwa na motisha kamili...)"
                    className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 focus:border-orange-500/50 focus:outline-none text-white text-xs"
                  />
                </div>

                {/* ACTION SUBMIT BUTTON */}
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
                  Hifadhi Kwenye Simu / View Live
                </button>
              </form>
            </div>

            {/* GENERATED CODE BOX */}
            {generatedCode && (
              <div id="generated-code-box" className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 flex gap-2">
                  <button 
                    onClick={handleCopyCode}
                    className="p-1 px-3 bg-orange-500 text-slate-950 font-black text-[9px] uppercase rounded-md tracking-wider flex items-center gap-1 hover:bg-orange-600 cursor-pointer active:scale-95"
                  >
                    <Copy className="w-3 h-3" />
                    {copySuccess ? 'Copied! ✅' : 'Copy Code'}
                  </button>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
                    <FileCode className="w-4 h-4 text-orange-400" />
                    Msimbo Maalum wa TypeScript! (Generated Code)
                  </h3>
                  <p className="text-[10px] text-slate-400 leading-relaxed max-w-[240px]">
                    Kopi msimbo huu hapa chini kisha nenda upaste ndani ya faili la <span className="font-mono text-white bg-slate-950 px-1 rounded">/src/data/mechi_zetu.ts</span> kwenda GitHub:
                  </p>
                </div>

                <div className="bg-slate-950 rounded-xl p-3 border border-slate-850 overflow-x-auto">
                  <pre className="text-[9.5px] font-mono text-amber-300 leading-normal select-all">
                    {generatedCode}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE MATCHES LIST & STATUS CONTROLLERS */}
        {activeAdminTab === 'list' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Orodha ya mechi zote ({tipsList.length})
              </h3>
              
              {/* Reset trigger */}
              <button
                onClick={() => {
                  if (confirm('Je, una uhakika unataka kurudisha mechi zote za awali (MOCK_TIPS) na kupoteza mechi ulizoongeza kwenye simu?')) {
                    onResetToDefault();
                    alert('Mechi zimerudishwa kama awali!');
                  }
                }}
                className="text-[10px] text-orange-400 hover:text-orange-300 font-extrabold uppercase flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Reset zote
              </button>
            </div>

            <div className="space-y-3">
              {tipsList.map((tip) => {
                const tipster = MOCK_TIPSTERS.find(t => t.id === tip.tipsterId);
                const isCustom = tip.id.startsWith('m-custom-');

                return (
                  <div 
                    key={tip.id} 
                    className="bg-slate-900 border border-slate-800/80 p-4 rounded-3xl space-y-3 relative overflow-hidden"
                  >
                    {/* Badge details */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                          tip.category === 'trending' ? 'bg-orange-600/20 text-orange-400 border border-orange-500/20' :
                          tip.category === 'daily' ? 'bg-indigo-600/20 text-indigo-400' :
                          tip.category === 'rollover' ? 'bg-emerald-600/20 text-emerald-400' :
                          'bg-cyan-600/20 text-cyan-400'
                        }`}>
                          {tip.category}
                        </span>
                        {isCustom && (
                          <span className="text-[7.5px] bg-amber-500 text-slate-950 font-black px-1.5 rounded py-0.2">
                            IPEVIEW
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleDeleteTip(tip.id)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Delete Match"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Match Info */}
                    <div className="text-left space-y-1">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{tip.league}</p>
                      <h4 className="text-xs font-black text-white">
                        {tip.teams[0]} <span className="text-orange-500">v</span> {tip.teams[1]}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
                        <span>🕒 {tip.time}</span>
                        <span>Odds: <strong className="text-white">{tip.odds}</strong></span>
                        <span>Tip: <span className="text-orange-400 font-bold">{tip.tip}</span></span>
                      </div>
                    </div>

                    {/* Quick status controls */}
                    <div className="pt-2 border-t border-slate-800/60 space-y-1.5">
                      <p className="text-[9px] text-slate-500 font-extrabold uppercase">
                        Hali ya matokeo (Select match status):
                      </p>
                      <div className="grid grid-cols-4 gap-1">
                        <button
                          onClick={() => handleUpdateStatus(tip.id, 'pending')}
                          className={`py-1 text-[9px] font-extrabold rounded-md uppercase transition-all cursor-pointer ${
                            tip.status === 'pending'
                              ? 'bg-slate-700 text-white shadow-sm ring-1 ring-white/20'
                              : 'bg-slate-950 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          ⏳ Pending
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(tip.id, 'live')}
                          className={`py-1 text-[9px] font-extrabold rounded-md uppercase transition-all cursor-pointer ${
                            tip.status === 'live'
                              ? 'bg-red-600 text-white shadow-sm ring-1 ring-white/10 animate-pulse'
                              : 'bg-slate-950 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          🔴 Live
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(tip.id, 'won')}
                          className={`py-1 text-[9px] font-extrabold rounded-md uppercase transition-all cursor-pointer ${
                            tip.status === 'won'
                              ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-white/10'
                              : 'bg-slate-950 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          ✅ Won / Shinda
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(tip.id, 'lost')}
                          className={`py-1 text-[9px] font-extrabold rounded-md uppercase transition-all cursor-pointer ${
                            tip.status === 'lost'
                              ? 'bg-rose-950 text-rose-300 border border-rose-500/20 shadow-sm'
                              : 'bg-slate-950 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          ❌ Lost / Poteza
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STEP-BY-STEP USER GUIDE */}
        {activeAdminTab === 'guide' && (
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 text-xs text-slate-300 leading-relaxed">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <FileCode className="w-5 h-5 text-orange-400" />
              MWONGOZO WA KUSASISHA PROGRAMU YAKO MILELE KUPITIA GITHUB 🚀
            </h3>

            <p>
              Programu hii ni ya **Full-Stack** ambayo hupangishwa kiotomatiki kupitia **Netlify (au huduma zinazofanana)**. Ili mabadiliko ya mechi ulizoongeza yaandike milele hata ukifungua kwenye kifaa kingine, fuata hatua hizi rahisi sana:
            </p>

            <ol className="list-decimal pl-4 space-y-2.5 text-slate-400">
              <li>
                <strong className="text-white">Kuongeza Mechi Mpya:</strong> Nenda kwenye tab ya **Ongeza Mechi Mpya**, jaza fomu yote vizuri, kisha bonyeza kitufe cha <span className="text-orange-400">"Hifadhi Kwenye Simu / View Live"</span>. Kifaa chako sasa kitakuwa na mechi hiyo ukiwa unaiandikia uchambuzi.
              </li>
              <li>
                <strong className="text-white">Kunakili Code (Copying Code):</strong> Wakati huohuo ukurasa utakuonyesha sanduku la msimbo wa herufi (sanduku linaitwa <span className="text-amber-400">"Msimbo Maalum wa TypeScript"</span>) lenye mechi yako katika mfumo wa herufi za code. Bonyeza kitufe cha <span className="bg-orange-500 text-slate-950 px-1 rounded text-[10px]">Copy Code</span> kufanya copy.
              </li>
              <li>
                <strong className="text-white">Kuhifadhi Kwenye GitHub/Netlify:</strong> 
                <br />
                Fungua mazingira haya ya kodi (AI Studio) au GitHub ya app yako. Fungua faili la:
                <div className="bg-slate-950 p-2 rounded-lg font-mono text-[10px] text-amber-300 my-1">
                  /src/data/mechi_zetu.ts
                </div>
                Utakuta tumeweka makundi matatu (Trending, Daily, na Rollover) yakiwa na mechi za mfano. 
                <br />
                Futa mechi za mfano unazotaka kuondoa, na paste msimbo wako uliocopy moja kwa moja ndani ya array/orodha ya <span className="font-mono text-white text-[10px] bg-slate-950 px-1 rounded">ACTIVE_MECHI_ZETU = [...]</span>!
              </li>
              <li>
                <strong className="text-white">Hifadhi & Deploy:</strong> 
                Mfumo wetu utagundua kuwa umefanya mabadiliko, ukisave tu mfumo utajenga na kuipusha Netlify moja kwa moja (kwa sababu tuliongeza tayari faili la <span className="font-mono text-white text-[10px] bg-slate-950 px-1 rounded">netlify.toml</span>)! Kila mechi sasa itakuwa ya kudumu na watu wote watashuhudia hewani!
              </li>
            </ol>

            <div className="p-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl space-y-1 mt-3">
              <h4 className="font-extrabold flex items-center gap-1.5">
                💡 Tip kwa Wewe Kaka:
              </h4>
              <p className="text-[10.5px] leading-relaxed text-slate-300">
                Pia unaweza kuamua kubadilisha matokeo ya mechi (eg, toka pending kwenda "Won" au "Lost") ukiwa kwenye simu yako ukitumia tab ya **Orodha & Matokeo** ili mechi hiyo ionekane imeshinda, na kujiandaa kuvutia wateja papo hapo!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
