import React from 'react';
import { UserProfile } from '../types';
import { SupportedLanguage, LANGUAGES, getTranslation } from '../utils/translations';
import { Globe, User, Shield, ChevronDown, Bot } from 'lucide-react';
import { openN8nChat } from './N8nChatWidget';

interface NavbarProps {
  activeTab: 'opportunities' | 'tracker' | 'simulator' | 'prep' | 'jargon' | 'profile';
  setActiveTab: (tab: 'opportunities' | 'tracker' | 'simulator' | 'prep' | 'jargon' | 'profile') => void;
  userProfile: UserProfile;
  onOpenProfileModal: () => void;
  onOpenAuthModal: () => void;
  eligibleCount: number;
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  onOpenProfileModal,
  onOpenAuthModal,
  eligibleCount,
  currentLang,
  onSelectLang
}) => {
  const t = (k: string) => getTranslation(currentLang, k);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('opportunities')}
              className="text-left group"
            >
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-900 transition-colors block leading-tight">
                {t('appName')}
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:block leading-none mt-0.5">
                Indian Government Sector Career Discovery
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`py-1.5 transition-colors border-b-2 ${
                activeTab === 'opportunities'
                  ? 'border-indigo-600 text-indigo-950 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('navOpportunities')} ({eligibleCount})
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`py-1.5 transition-colors border-b-2 ${
                activeTab === 'tracker'
                  ? 'border-indigo-600 text-indigo-950 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('navTracker')}
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`py-1.5 transition-colors border-b-2 ${
                activeTab === 'simulator'
                  ? 'border-indigo-600 text-indigo-950 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('navSimulator')}
            </button>
            <button
              onClick={() => setActiveTab('prep')}
              className={`py-1.5 transition-colors border-b-2 ${
                activeTab === 'prep'
                  ? 'border-indigo-600 text-indigo-950 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('navPrep')}
            </button>
            <button
              onClick={() => setActiveTab('jargon')}
              className={`py-1.5 transition-colors border-b-2 ${
                activeTab === 'jargon'
                  ? 'border-indigo-600 text-indigo-950 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('navJargon')}
            </button>
          </nav>

          {/* Controls: Language Selector & Student Profile Switch */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <select
                  value={currentLang}
                  onChange={e => onSelectLang(e.target.value as SupportedLanguage)}
                  className="bg-transparent border-none text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
                  aria-label="Select Language"
                >
                  {LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.nativeLabel} ({l.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Ask AI Assistant */}
            <button
              onClick={() => openN8nChat()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 text-xs font-semibold transition-colors"
              title="Chat with Job Seeker AI Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Profile Avatar / Quick Link */}
            <button
              onClick={onOpenProfileModal}
              title="Click to view or edit qualification profile"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold text-xs uppercase">
                {userProfile.personal.fullName.charAt(0)}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-semibold text-slate-900 leading-tight truncate max-w-[110px]">
                  {userProfile.privacyMode ? 'Candidate' : userProfile.personal.fullName.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-500 leading-none">
                  {userProfile.eligibility.category}
                </span>
              </div>
            </button>

            {/* Quick Switch Persona */}
            <button
              onClick={onOpenAuthModal}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              {t('btnSwitchStudent')}
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation */}
        <div className="lg:hidden flex items-center gap-2 py-2 overflow-x-auto text-xs border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium transition-colors ${
              activeTab === 'opportunities' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t('navOpportunities')} ({eligibleCount})
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium transition-colors ${
              activeTab === 'tracker' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t('navTracker')}
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium transition-colors ${
              activeTab === 'simulator' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t('navSimulator')}
          </button>
          <button
            onClick={() => setActiveTab('prep')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium transition-colors ${
              activeTab === 'prep' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t('navPrep')}
          </button>
          <button
            onClick={() => setActiveTab('jargon')}
            className={`px-3 py-1 whitespace-nowrap rounded font-medium transition-colors ${
              activeTab === 'jargon' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t('navJargon')}
          </button>
        </div>
      </div>
    </header>
  );
};
