/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { UserProfile, ExamOpportunity, TrackedExam } from './types';
import { EXAMS_DATA } from './data/examsData';
import { evaluateEligibility } from './utils/eligibilityEngine';
import { 
  getStoredProfile, saveProfile, getTrackedExams, saveTrackedExam, 
  removeTrackedExam 
} from './utils/storage';
import { SupportedLanguage, getTranslation } from './utils/translations';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ExamCard } from './components/ExamCard';
import { ExamDetailModal } from './components/ExamDetailModal';
import { ProfileModal } from './components/ProfileModal';
import { ProfileView } from './components/ProfileView';
import { AuthModal } from './components/AuthModal';
import { EligibilitySimulator } from './components/EligibilitySimulator';
import { TrackedExamsView } from './components/TrackedExamsView';
import { PreparationCompass } from './components/PreparationCompass';
import { JargonBuster } from './components/JargonBuster';
import { N8nChatWidget } from './components/N8nChatWidget';
import { 
  Search, Filter, CheckCircle2, AlertTriangle, 
  Sparkles, Calendar, BookOpen, ShieldCheck, ArrowRight, RefreshCw, X 
} from 'lucide-react';

const LANGUAGE_KEY = 'gcn_preferred_language';
const N8N_CHAT_WEBHOOK_URL = "https://kallakavya1128.app.n8n.cloud/webhook/e00c9c15-2836-4dc3-be31-4158177317aa/chat";

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      if (stored === 'hi' || stored === 'te' || stored === 'ta' || stored === 'kn' || stored === 'en') {
        return stored;
      }
    } catch (e) {}
    return 'en';
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => getStoredProfile());
  const [trackedExams, setTrackedExams] = useState<TrackedExam[]>(() => getTrackedExams());
  
  const [activeTab, setActiveTab] = useState<'opportunities' | 'tracker' | 'simulator' | 'prep' | 'jargon' | 'profile'>('opportunities');
  
  // Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamOpportunity | null>(null);

  // Search & Filters in Opportunities
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEligibilityFilter, setSelectedEligibilityFilter] = useState<'all' | 'eligible' | 'conditional'>('all');
  const [selectedSector, setSelectedSector] = useState<string>('All Sectors');
  const [sortBy, setSortBy] = useState<'match' | 'deadline' | 'salary' | 'vacancies'>('match');

  const handleSelectLang = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
    } catch (e) {}
  };

  const t = (k: string) => getTranslation(currentLang, k);

  // Sync profile update
  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    saveProfile(updated);
  };

  const handleTogglePrivacy = () => {
    const updated: UserProfile = {
      ...userProfile,
      privacyMode: !userProfile.privacyMode
    };
    setUserProfile(updated);
    saveProfile(updated);
  };

  const handleUpdateTracked = (tracked: TrackedExam) => {
    const updated = saveTrackedExam(tracked);
    setTrackedExams([...updated]);
  };

  const handleRemoveTracked = (examId: string) => {
    const updated = removeTrackedExam(examId);
    setTrackedExams([...updated]);
  };

  const handleToggleTrack = (examId: string) => {
    const existing = trackedExams.find(t => t.examId === examId);
    if (existing) {
      handleRemoveTracked(examId);
    } else {
      handleUpdateTracked({
        examId,
        status: 'Interested',
        notes: 'Target opportunity',
        targetExamYear: 2026,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        documentsPrepared: {
          idProof: true,
          categoryCertificate: false,
          graduationCertificate: false,
          passportPhoto: true,
          signatureFile: true,
          domicileCertificate: false
        }
      });
    }
  };

  // Pre-calculate evaluations
  const examEvaluations = useMemo(() => {
    const map = new Map<string, ReturnType<typeof evaluateEligibility>>();
    EXAMS_DATA.forEach(exam => {
      map.set(exam.id, evaluateEligibility(userProfile, exam));
    });
    return map;
  }, [userProfile]);

  const eligibleCount = useMemo(() => {
    let count = 0;
    examEvaluations.forEach(result => {
      if (result.isEligible) count++;
    });
    return count;
  }, [examEvaluations]);

  // Filter & Sort examinations
  const filteredExams = useMemo(() => {
    return EXAMS_DATA.filter(exam => {
      const result = examEvaluations.get(exam.id);
      
      // Keyword search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery = 
          exam.name.toLowerCase().includes(query) ||
          exam.shortName.toLowerCase().includes(query) ||
          exam.conductingBody.toLowerCase().includes(query) ||
          exam.jobSummarySimple.toLowerCase().includes(query) ||
          exam.sector.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Eligibility filter
      if (selectedEligibilityFilter === 'eligible' && result?.verdict !== 'Eligible') {
        return false;
      }
      if (selectedEligibilityFilter === 'conditional' && result?.verdict !== 'Eligible with Conditions') {
        return false;
      }

      // Sector filter
      if (selectedSector !== 'All Sectors' && exam.sector !== selectedSector) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const resA = examEvaluations.get(a.id);
      const resB = examEvaluations.get(b.id);

      if (sortBy === 'match') {
        return (resB?.scorePercentage || 0) - (resA?.scorePercentage || 0);
      }
      if (sortBy === 'deadline') {
        return new Date(a.applicationEndDate).getTime() - new Date(b.applicationEndDate).getTime();
      }
      if (sortBy === 'salary') {
        const getNum = (str: string) => {
          const match = str.match(/\d+/g);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getNum(b.payLevel7thCPC) - getNum(a.payLevel7thCPC);
      }
      if (sortBy === 'vacancies') {
        return b.vacanciesCount - a.vacanciesCount;
      }
      return 0;
    });
  }, [examEvaluations, searchQuery, selectedEligibilityFilter, selectedSector, sortBy]);

  const allSectors: string[] = useMemo(() => {
    const sectors = new Set<string>();
    EXAMS_DATA.forEach(e => sectors.add(e.sector));
    return ['All Sectors', ...Array.from(sectors)];
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar with Language Selector */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        eligibleCount={eligibleCount}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Simplified Hero Workflow Banner on Opportunities View */}
        {activeTab === 'opportunities' && (
          <HeroBanner
            userProfile={userProfile}
            eligibleCount={eligibleCount}
            totalExamsCount={EXAMS_DATA.length}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onGoToTracker={() => setActiveTab('tracker')}
            currentLang={currentLang}
          />
        )}

        {/* TAB 1: OPPORTUNITIES DECK */}
        {activeTab === 'opportunities' && (
          <div id="opportunities-deck" className="space-y-5">
            {/* Clean Filter and Search Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row gap-2.5">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sector Selector */}
                <div className="w-full md:w-56">
                  <select
                    value={selectedSector}
                    onChange={e => setSelectedSector(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
                  >
                    {allSectors.map(s => (
                      <option key={s} value={s}>{s === 'All Sectors' ? t('filterSector') : s}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Selector */}
                <div className="w-full md:w-56">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
                  >
                    <option value="match">{t('sortMatch')}</option>
                    <option value="deadline">{t('sortDeadline')}</option>
                    <option value="salary">{t('sortSalary')}</option>
                    <option value="vacancies">{t('sortVacancies')}</option>
                  </select>
                </div>
              </div>

              {/* Segmented Filter Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
                  <button
                    onClick={() => setSelectedEligibilityFilter('all')}
                    className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                      selectedEligibilityFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t('filterAll')} ({EXAMS_DATA.length})
                  </button>
                  <button
                    onClick={() => setSelectedEligibilityFilter('eligible')}
                    className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                      selectedEligibilityFilter === 'eligible'
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t('filterEligible')} ({eligibleCount})
                  </button>
                  <button
                    onClick={() => setSelectedEligibilityFilter('conditional')}
                    className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                      selectedEligibilityFilter === 'conditional'
                        ? 'bg-white text-amber-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t('filterConditional')}
                  </button>
                </div>

                <div className="text-xs text-slate-500">
                  <strong className="text-slate-800 font-mono">{filteredExams.length}</strong> {t('ofTotal')} {EXAMS_DATA.length}
                </div>
              </div>
            </div>

            {/* Opportunities Grid */}
            {filteredExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredExams.map(exam => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    userProfile={userProfile}
                    isTracked={trackedExams.some(t => t.examId === exam.id)}
                    onSelectExam={e => setSelectedExam(e)}
                    onToggleTrack={handleToggleTrack}
                    currentLang={currentLang}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-1">
                  No examinations matched your filters
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Reset filters or change search keywords to see other opportunities.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedEligibilityFilter('all');
                    setSelectedSector('All Sectors');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXAM TRACKER VIEW */}
        {activeTab === 'tracker' && (
          <TrackedExamsView
            trackedExams={trackedExams}
            onUpdateTracked={handleUpdateTracked}
            onRemoveTracked={handleRemoveTracked}
            onSelectExam={e => setSelectedExam(e)}
            onGoToOpportunities={() => setActiveTab('opportunities')}
            onGoToPrep={() => setActiveTab('prep')}
          />
        )}

        {/* TAB 3: ELIGIBILITY SIMULATOR */}
        {activeTab === 'simulator' && (
          <EligibilitySimulator
            userProfile={userProfile}
            onApplySimulatedToProfile={sim => {
              handleSaveProfile(sim);
              setActiveTab('opportunities');
            }}
            onSelectExam={e => setSelectedExam(e)}
          />
        )}

        {/* TAB 4: PREPARATION COMPASS */}
        {activeTab === 'prep' && (
          <PreparationCompass
            trackedExams={trackedExams}
            onSelectExam={e => setSelectedExam(e)}
            onGoToOpportunities={() => setActiveTab('opportunities')}
            onToggleTrack={handleToggleTrack}
          />
        )}

        {/* TAB 5: JARGON BUSTER */}
        {activeTab === 'jargon' && <JargonBuster />}

        {/* TAB 6: PROFILE DETAILS VIEW */}
        {activeTab === 'profile' && (
          <ProfileView
            profile={userProfile}
            onEditProfile={() => setIsProfileModalOpen(true)}
            onTogglePrivacy={handleTogglePrivacy}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-display font-bold text-slate-800 text-sm block">
              {t('appName')}
            </span>
            <p className="mt-0.5 text-slate-500">
              Personalized government career discovery and transparent eligibility evaluation for Indian students.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <button onClick={() => setActiveTab('opportunities')} className="hover:text-slate-900">
              {t('navOpportunities')}
            </button>
            <button onClick={() => setActiveTab('tracker')} className="hover:text-slate-900">
              {t('navTracker')}
            </button>
            <button onClick={() => setActiveTab('simulator')} className="hover:text-slate-900">
              {t('navSimulator')}
            </button>
            <button onClick={() => setActiveTab('prep')} className="hover:text-slate-900">
              {t('navPrep')}
            </button>
            <button onClick={() => setActiveTab('jargon')} className="hover:text-slate-900">
              {t('navJargon')}
            </button>
            <button onClick={() => setIsProfileModalOpen(true)} className="hover:text-slate-900">
              {t('btnEditProfile')}
            </button>
          </div>
        </div>
      </footer>

      {/* Profile Setup / Edit Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={userProfile}
        onSave={handleSaveProfile}
        currentLang={currentLang}
      />

      {/* Auth / Switch Student Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentProfile={userProfile}
        onSwitchProfile={p => {
          setUserProfile(p);
          saveProfile(p);
        }}
      />

      {/* Exam Detail & Eligibility Breakdown Modal */}
      <ExamDetailModal
        exam={selectedExam}
        userProfile={userProfile}
        trackedExam={trackedExams.find(t => t.examId === selectedExam?.id)}
        onClose={() => setSelectedExam(null)}
        onUpdateTracked={handleUpdateTracked}
        onRemoveTracked={handleRemoveTracked}
      />

      {/* n8n Live AI Chatbot Widget */}
      <N8nChatWidget
        webhookUrl={N8N_CHAT_WEBHOOK_URL}
        userName={userProfile.privacyMode ? undefined : userProfile.personal.fullName.split(' ')[0]}
      />
    </div>
  );
}
