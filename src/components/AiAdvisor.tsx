import React, { useState } from 'react';
import { Send, Sparkles, User, Brain, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  sender: 'user' | 'oracle';
  text: string;
}

interface AiAdvisorProps {
  userName: string;
}

export default function AiAdvisor({ userName }: AiAdvisorProps) {
  const adminWhatsapp = "https://wa.me/255704242433?text=Greeting%20Admin%2C%20I%20want%20to%20join%20VIP%20Premium%20now%20on%20WhatsApp%20🔥";

  const getInitialMessage = () => ({
    sender: 'oracle' as const,
    text: `Hello ${userName}! I am **PRIME VIP AI 🔥**, your guide to our ultra-successful **VIP APP & Premium Tickets**! 👑

🏆 We boast a guaranteed success rate of over **99.8%** daily! Yesterday, all our premium VIP selections won clean sweeps (**JANA TULESHINDA VYA KUSHIBANA!** 🏆).

Ask me anything about how our VIP works or how you can activate your access! Also, you can message our admin directly anytime:
[💬 Message Admin Here on WhatsApp](${adminWhatsapp})`,
  });

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText;
    setInputText('');
    setErrorText('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: userMsg,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to communicate with the VIP prediction server.');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'oracle', text: data.analysis || 'Message our admin now to activate your VIP Slip!' },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorText('⚠️ Connection timeout. Active VIP match prediction is still highly secure.');
      setMessages((prev) => [
        ...prev,
        {
          sender: 'oracle',
          text: `Apologies champion! I encountered a small network fluctuation. 

No worries: our high-accuracy **VIP Slippages** are fully available. Yesterday we won 100% of all VIP Tickets!

💬 Get your accurate ticket instantly by messaging our support line:
[💬 Message Admin Here on WhatsApp](${adminWhatsapp})`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to parse markdown links like [Text](Url) and bold text like **bold**
  const renderFormattedLine = (line: string) => {
    // 1. First parse links
    const parts: React.ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    // Helper to bold content inside text segment
    const formatBold = (text: string, baseKey: string) => {
      const boldParts = [];
      const boldRegex = /\*\*([^*]+)\*\*/g;
      let bLastIdx = 0;
      let bMatch;
      while ((bMatch = boldRegex.exec(text)) !== null) {
        if (bMatch.index > bLastIdx) {
          boldParts.push(text.substring(bLastIdx, bMatch.index));
        }
        boldParts.push(
          <strong key={`${baseKey}-bold-${bMatch.index}`} className="font-extrabold text-[#00E676] tracking-wide inline">
            {bMatch[1]}
          </strong>
        );
        bLastIdx = boldRegex.lastIndex;
      }
      if (bLastIdx < text.length) {
        boldParts.push(text.substring(bLastIdx));
      }
      return boldParts.length > 0 ? boldParts : text;
    };

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        const textBefore = line.substring(lastIndex, match.index);
        parts.push(...(typeof textBefore === 'string' ? [formatBold(textBefore, `part-${lastIndex}`)] : [textBefore]));
      }
      const linkText = match[1];
      const linkUrl = match[2];
      parts.push(
        <a
          key={`link-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-450 hover:text-emerald-400 font-extrabold bg-emerald-500/15 border border-emerald-500/35 px-2.5 py-1.5 rounded-xl ml-0.5 inline-flex items-center gap-1.5 cursor-pointer underline transition-all active:scale-95 my-1"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {linkText}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      const remainingText = line.substring(lastIndex);
      parts.push(...(typeof remainingText === 'string' ? [formatBold(remainingText, `part-${lastIndex}`)] : [remainingText]));
    }

    return parts.length > 0 ? parts : [line];
  };

  return (
    <div id="ai-advisor-container" className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col h-[525px] shadow-xl text-left">
      {/* Oracle Brand Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 font-sans">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-slate-950 font-black relative shadow-lg shadow-emerald-500/15">
            <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
            <div className="absolute -bottom-1 -right-0.5 w-3.5 h-3.5 bg-[#00E676] border-2 border-slate-900 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5 leading-tight">
              PRIME VIP AI
              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold tracking-widest uppercase">VIP APP</span>
            </h3>
            <p className="text-[10px] text-slate-500 font-semibold">Learn about VIP plans, win streaks, & how to join</p>
          </div>
        </div>
        
        <button
          onClick={() => {
            setMessages([getInitialMessage()]);
            setErrorText('');
          }}
          title="Reset Chat"
          className="p-1 px-2.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors text-[10px] font-bold flex items-center gap-1 border border-slate-800 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Message History area */}
      <div id="ai-chat-history" className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-none">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 max-w-[90%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-slate-700 text-slate-100'
                  : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            {/* Bubble containing text */}
            <div
              className={`p-3 rounded-2xl text-[11px] leading-relaxed space-y-2 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-black rounded-tr-none'
                  : 'bg-slate-950/95 text-slate-300 border border-slate-800/80 rounded-tl-none whitespace-pre-wrap'
              }`}
            >
              {msg.sender === 'oracle' ? (
                msg.text.split('\n').map((line, lIdx) => {
                  if (line.startsWith('###')) {
                    return (
                      <h4 key={lIdx} className="font-extrabold text-white text-[12px] mt-2 mb-0.5 flex items-center gap-1 uppercase tracking-wider">
                        {line.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  if (line.startsWith('*')) {
                    return (
                      <li key={lIdx} className="ml-2 list-disc text-slate-300 my-0.5">
                        {renderFormattedLine(line.replace('*', '').trim())}
                      </li>
                    );
                  }
                  return (
                    <p key={lIdx} className="my-0.5">
                      {renderFormattedLine(line)}
                    </p>
                  );
                })
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 max-w-[80%]">
            <div className="w-7 h-7 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-2.5 h-2.5 bg-emerald-450 rounded-full animate-bounce"></span>
                <span className="w-2.5 h-2.5 bg-emerald-450 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2.5 h-2.5 bg-emerald-450 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold italic">PRIME VIP AI typing...</span>
            </div>
          </div>
        )}

        {errorText && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorText}</span>
          </div>
        )}
      </div>

      {/* Chat Input form */}
      <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 pt-2 border-t border-slate-800">
        <input
          id="oracle-user-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="E.g., How can I join VIP and double my capital?"
          disabled={isLoading}
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none rounded-xl py-2.5 px-3.5 text-xs text-white"
        />
        <button
          id="btn-oracle-send"
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:opacity-40 text-slate-950 p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
        >
          <Send className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
}
