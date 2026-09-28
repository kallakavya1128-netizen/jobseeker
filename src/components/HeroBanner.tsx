import React from 'react';
import { UserProfile } from '../types';
import { SupportedLanguage, getTranslation } from '../utils/translations';
import { UserCheck, ArrowRight, CheckCircle, ShieldCheck, Bot } from 'lucide-react';
import { openN8nChat } from './N8nChatWidget';
import heroImage from '../assets/images/hero_student_aspirants_1790580430477.jpg';

interface HeroBannerProps {
  userProfile: UserProfile;
  eligibleCount: number;
  totalExamsCount: number;
  onOpenProfile: () => void;
  onGoToTracker: () => void;
  currentLang: SupportedLanguage;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  userProfile,
  eligibleCount,
  totalExamsCount,
  onOpenProfile,
  onGoToTracker,
  currentLang
}) => {
  const t = (k: string) => getTranslation(currentLang, k);

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-2xl mb-6 border border-slate-800 shadow-xl">
      {/* Editorial photo background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Indian students in library"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity filter contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/70" />
      </div>

      <div className="relative z-10 p-5 sm:p-7 lg:p-8 max-w-5xl">
        {/* Simple Workflow 3-Step Pill Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-5 max-w-3xl">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center font-mono">
              1
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">{t('step1Title')}</div>
              <div className="text-[11px] text-slate-400 leading-tight">{t('step1Desc')}</div>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center font-mono">
              2
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">{t('step2Title')}</div>
              <div className="text-[11px] text-slate-400 leading-tight">{t('step2Desc')}</div>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center font-mono">
              3
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">{t('step3Title')}</div>
              <div className="text-[11px] text-slate-400 leading-tight">{t('step3Desc')}</div>
            </div>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          {t('tagline')}
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mb-5 leading-relaxed">
          {t('subtagline')}
        </p>

        {/* Profile Card & Match Stat */}
        <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-xl p-3.5 sm:p-4 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">{t('activeStudent')}</div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{userProfile.privacyMode ? 'Protected Candidate' : userProfile.personal.fullName}</span>
                <span className="text-xs text-slate-400 font-normal">
                  ({userProfile.education.highestQualification.split(' ')[0]} · {userProfile.eligibility.category})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 border-slate-700/60 pt-2.5 md:pt-0">
            <div>
              <div className="text-[11px] text-slate-400">{t('matchesFound')}</div>
              <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono tabular-nums">
                {eligibleCount} {t('ofTotal')} {totalExamsCount}
              </div>
            </div>
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 text-xs font-semibold bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              {t('btnEditProfile')}
            </button>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('opportunities-deck');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-900/40"
          >
            <span>{t('filterEligible')} ({eligibleCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onGoToTracker}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {t('navTracker')}
          </button>

          <button
            onClick={() => openN8nChat()}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/30 transition-colors flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ask Job Seeker AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
