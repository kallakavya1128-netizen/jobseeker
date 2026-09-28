import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, X, MessageSquare, Send, RefreshCw, ChevronRight } from 'lucide-react';

interface N8nChatWidgetProps {
  webhookUrl?: string;
  userName?: string;
}

export const openN8nChat = () => {
  const toggleBtn = document.querySelector<HTMLButtonElement>(
    '.chat-window-toggle, #n8n-chat button, [data-chat-toggle]'
  );
  if (toggleBtn) {
    toggleBtn.click();
    return true;
  }
  return false;
};

export const N8nChatWidget: React.FC<N8nChatWidgetProps> = ({
  webhookUrl = "https://kallakavya1128.app.n8n.cloud/webhook/e00c9c15-2836-4dc3-be31-4158177317aa/chat",
  userName
}) => {
  const [showPromptBadge, setShowPromptBadge] = useState(true);
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'bot' | 'user'; text: string; time: string }>>([
    {
      role: 'bot',
      text: "Hello! 👋 I am **Job Seeker AI**, your student-friendly guide for Government Jobs and Competitive Examinations in India.\n\nAsk me anything about exam eligibility, syllabus, age limits, reservation criteria, or preparation roadmaps!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 11));

  // Handle clicking the chat prompt badge
  const handleBadgeClick = () => {
    setShowPromptBadge(false);
    const opened = openN8nChat();
    if (!opened) {
      // If official n8n script hasn't mounted toggle yet, open native fallback
      setFallbackOpen(true);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isLoading) return;

    const userMsg = {
      role: 'user' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Instance-Id': 'f7832698094c5adfcaf050b2a31fd106c71a2627c2dbed1f9759a082a2c92f3e',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: textToSend,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data.output || data.text || data.message || "I have received your request. Let me know if you need more details on upcoming notifications!";
      
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: "I am ready to assist with your government exam queries! If this message was interrupted, please try rephrasing or check your connection.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Check UPSC CSE 2026 Eligibility & Age Limits",
    "What are the best exams for final-year college students?",
    "Explain SSC CGL Exam Pattern and Tier 1 vs Tier 2",
    "List upcoming Banking PO & Clerk notifications"
  ];

  return (
    <>
      {/* Floating Prompt Pill (anchored next to n8n toggle in bottom-right) */}
      {showPromptBadge && !fallbackOpen && (
        <div className="fixed bottom-6 right-20 z-40 hidden sm:flex items-center gap-2 bg-slate-900 text-white pl-3.5 pr-2.5 py-2 rounded-full shadow-2xl border border-slate-700/80 animate-fade-in hover:bg-slate-800 transition-all cursor-pointer group">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <button
            onClick={handleBadgeClick}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-100 group-hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ask Job Seeker AI</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPromptBadge(false);
            }}
            aria-label="Dismiss prompt"
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded-full hover:bg-slate-700 ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Fallback Native Chat Modal if n8n script is delayed or clicked directly */}
      {fallbackOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm leading-tight text-white">
                    Job Seeker AI
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live n8n
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {userName ? `Assisting ${userName}` : 'Gov Exams & Careers Guide'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                title="Restart chat"
                aria-label="Restart chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFallbackOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick prompt suggestions */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-[11px] font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 shrink-0 transition-all text-left whitespace-nowrap disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5 text-indigo-700">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      m.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5 text-indigo-700">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-xs flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                  <span>Job Seeker AI is analyzing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about exam dates, eligibility, syllabus..."
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-100 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send question"
                className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Connected to n8n AI Agent</span>
              <button
                type="button"
                onClick={() => {
                  setFallbackOpen(false);
                  openN8nChat();
                }}
                className="text-indigo-600 hover:underline"
              >
                Switch to n8n widget
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
