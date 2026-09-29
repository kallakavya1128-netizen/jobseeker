import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Sparkles, X, MessageSquare, Send, RefreshCw, 
  ChevronRight, Copy, Check, Minimize2, Maximize2, 
  HelpCircle, ArrowUpRight, Zap, ShieldCheck
} from 'lucide-react';
import { getExamKnowledgeResponse } from '../utils/chatKnowledge';

interface N8nChatWidgetProps {
  webhookUrl?: string;
  userName?: string;
}

export const openN8nChat = () => {
  // First attempt to click official n8n toggle if mounted in DOM
  const toggleBtn = document.querySelector<HTMLButtonElement>(
    '.chat-window-toggle, #n8n-chat button, [data-chat-toggle]'
  );
  if (toggleBtn) {
    toggleBtn.click();
    return true;
  }
  // Otherwise dispatch window event for our high-fidelity native AI modal
  window.dispatchEvent(new CustomEvent('open-job-seeker-chat'));
  return true;
};

export const N8nChatWidget: React.FC<N8nChatWidgetProps> = ({
  webhookUrl = "/api/chat",
  userName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromptBadge, setShowPromptBadge] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 11));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage = {
    role: 'bot' as const,
    text: `Hello${userName ? ` ${userName}` : ''}! 👋 I am **Job Seeker AI**, your specialized companion for Indian Government Jobs & Competitive Examinations.\n\nAsk me about:\n- **Eligibility & Age Limits** (Category relaxations for OBC, SC, ST, PwD)\n- **Exam Architecture** (UPSC, SSC CGL, Banking PO/Clerk, Railways RRB, Defense CDS/AFCAT)\n- **Syllabus Overlap & Daily Timetables**\n- **Upcoming Notification Dates & Deadlines**`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Array<{ role: 'bot' | 'user'; text: string; time: string; source?: string }>>([
    initialBotMessage
  ]);

  // Listen for global chat open trigger
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowPromptBadge(false);
    };
    window.addEventListener('open-job-seeker-chat', handleOpen);
    return () => window.removeEventListener('open-job-seeker-chat', handleOpen);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: textToSend,
          sessionId: sessionId,
          webhookUrl: webhookUrl.startsWith('http') ? webhookUrl : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const reply = data.output || data.text || data.message || getExamKnowledgeResponse(textToSend);

      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: data.source || 'ai'
        }
      ]);
    } catch (err) {
      // In case server or external network was unavailable, immediately provide rich knowledge answer
      console.warn('Direct API fallback engaged:', err);
      const fallbackReply = getExamKnowledgeResponse(textToSend);
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: fallbackReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'knowledge-engine'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const quickPrompts = [
    "Check UPSC CSE 2026 Eligibility & Age Limits",
    "Best exams for final-year college students",
    "Explain SSC CGL Exam Pattern (Tier 1 & Tier 2)",
    "Banking PO vs Clerk syllabus difference",
    "Age relaxation rules for OBC, SC, ST & PwD",
    "Railway RRB NTPC recruitment stages"
  ];

  // Simple Markdown text renderer for bolding, bullet points, headers
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-slate-900 text-sm mt-2 mb-1 flex items-center gap-1.5">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-bold text-slate-900 text-base mt-2.5 mb-1.5">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Bullet list items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-3 list-disc my-0.5 text-slate-700 leading-relaxed">
            {formatInlineMarkdown(itemText)}
          </li>
        );
      }
      // Numbered list items
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1 ml-1 text-slate-700">
            <span className="font-semibold text-indigo-700 shrink-0">{numMatch[1]}.</span>
            <span>{formatInlineMarkdown(numMatch[2])}</span>
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Normal paragraph
      return (
        <p key={idx} className="my-0.5 text-slate-700 leading-relaxed">
          {formatInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Format bold (**word**) and italic (*word*) inline
  const formatInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-slate-800">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Prompt Pill (Bottom Right) */}
      {showPromptBadge && !isOpen && (
        <div 
          onClick={() => {
            setShowPromptBadge(false);
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-20 z-40 hidden sm:flex items-center gap-2 bg-slate-900 text-white pl-3.5 pr-2.5 py-2 rounded-full shadow-2xl border border-slate-700/80 hover:bg-slate-800 transition-all cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-100 group-hover:text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ask Job Seeker AI</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
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

      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center transition-all hover:scale-105 group"
          aria-label="Open Job Seeker AI Chatbot"
          title="Open Job Seeker AI Chatbot"
        >
          <Bot className="w-6 h-6 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>
      )}

      {/* Interactive AI Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm leading-tight text-white">
                    Job Seeker AI
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {userName ? `Assisting ${userName}` : 'Government Exam & Eligibility Advisor'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([initialBotMessage])}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-50/90 border-b border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-[11px] font-medium bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-600 px-3 py-1 rounded-full border border-slate-200 shrink-0 transition-all text-left whitespace-nowrap disabled:opacity-50 shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5 text-indigo-700 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                
                <div className={`group relative max-w-[85%] ${m.role === 'user' ? '' : 'w-full'}`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-xs ${
                      m.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {m.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    ) : (
                      <div className="space-y-1">
                        {renderFormattedText(m.text)}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-slate-100/50">
                      {m.role === 'bot' && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <ShieldCheck className="w-3 h-3 text-indigo-500" />
                          <span>Exam Intelligence</span>
                        </div>
                      )}
                      <div
                        className={`text-[10px] ml-auto ${
                          m.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        {m.time}
                      </div>
                    </div>
                  </div>

                  {/* Copy Button for Bot Messages */}
                  {m.role === 'bot' && (
                    <button
                      onClick={() => handleCopy(m.text, idx)}
                      aria-label="Copy reply"
                      title="Copy response"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5 text-indigo-700">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs flex items-center gap-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.3s]"></span>
                  </div>
                  <span className="font-medium text-slate-600">Analyzing exam database & syllabus...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Box */}
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
                placeholder="Ask about UPSC, SSC, Bank PO, eligibility, age limits..."
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-100 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send query"
                className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Instant guidance for 20+ central & state examinations</span>
              <button
                type="button"
                onClick={() => setMessages([initialBotMessage])}
                className="text-indigo-600 hover:underline font-medium"
              >
                Clear Chat
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
