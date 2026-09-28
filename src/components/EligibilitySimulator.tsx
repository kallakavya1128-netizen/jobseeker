import React, { useState } from 'react';
import { UserProfile, QualificationLevel, CategoryType, StreamCategory } from '../types';
import { EXAMS_DATA } from '../data/examsData';
import { evaluateEligibility } from '../utils/eligibilityEngine';
import { Sliders, Sparkles, Unlock, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EligibilitySimulatorProps {
  userProfile: UserProfile;
  onApplySimulatedToProfile: (simulated: UserProfile) => void;
  onSelectExam: (exam: any) => void;
}

export const EligibilitySimulator: React.FC<EligibilitySimulatorProps> = ({
  userProfile,
  onApplySimulatedToProfile,
  onSelectExam
}) => {
  const [simAge, setSimAge] = useState<number>(22);
  const [simGradScore, setSimGradScore] = useState<number>(userProfile.education.graduationScore || 65);
  const [simCategory, setSimCategory] = useState<CategoryType>(userProfile.eligibility.category);
  const [simQualification, setSimQualification] = useState<QualificationLevel>(userProfile.education.highestQualification);
  const [simStream, setSimStream] = useState<StreamCategory>(userProfile.education.streamCategory);
  const [simTypingWPM, setSimTypingWPM] = useState<number>(userProfile.eligibility.typingProficiencyEnglishWPM || 0);
  const [simHasDrivingLicense, setSimHasDrivingLicense] = useState<boolean>(userProfile.eligibility.hasDrivingLicenseLMV);

  // Construct virtual profile for simulation
  const birthYear = 2026 - simAge;
  const simulatedProfile: UserProfile = {
    ...userProfile,
    personal: {
      ...userProfile.personal,
      dateOfBirth: `${birthYear}-01-01`
    },
    education: {
      ...userProfile.education,
      highestQualification: simQualification,
      streamCategory: simStream,
      graduationScore: simGradScore,
      percentageOrCGPA: 'Percentage'
    },
    eligibility: {
      ...userProfile.eligibility,
      category: simCategory,
      typingProficiencyEnglishWPM: simTypingWPM,
      hasDrivingLicenseLMV: simHasDrivingLicense
    }
  };

  // Evaluate baseline vs simulated
  const baselineResults = EXAMS_DATA.map(exam => ({
    exam,
    result: evaluateEligibility(userProfile, exam)
  }));

  const simulatedResults = EXAMS_DATA.map(exam => ({
    exam,
    result: evaluateEligibility(simulatedProfile, exam)
  }));

  const baselineEligibleCount = baselineResults.filter(r => r.result.isEligible).length;
  const simulatedEligibleCount = simulatedResults.filter(r => r.result.isEligible).length;
  const newlyUnlockedExams = simulatedResults.filter(
    (sr, idx) => sr.result.isEligible && !baselineResults[idx].result.isEligible
  );

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-1">
          <Sliders className="w-4 h-4" />
          <span>Interactive Student Eligibility Simulator</span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          "What If?" Career Scenario Sandbox
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Wondering how your exam opportunities expand if you score 60%+ in your final semester, learn typing at 35 WPM, reach 21 years old, or acquire an OBC-NCL certificate? Adjust the parameters below to see newly unlocked recruitments in real time.
        </p>

        {/* Counter comparison */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <span className="text-slate-500 block">Current Real Profile</span>
            <strong className="text-base font-bold text-slate-900 font-mono tabular-nums">
              {baselineEligibleCount} Exams Open
            </strong>
          </div>
          <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-100 text-xs">
            <span className="text-indigo-700 font-semibold block">Simulated Profile</span>
            <strong className="text-base font-bold text-indigo-950 font-mono tabular-nums">
              {simulatedEligibleCount} Exams Open
            </strong>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-100 text-xs">
            <span className="text-emerald-700 font-semibold block">Newly Unlocked Opportunities</span>
            <strong className="text-base font-bold text-emerald-700 font-mono tabular-nums">
              +{newlyUnlockedExams.length} New Recruitments
            </strong>
          </div>
        </div>
      </div>

      {/* Simulator Control Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Tweak Parameters
          </h3>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Candidate Age (in 2026)</span>
              <span className="font-mono text-indigo-600">{simAge} years</span>
            </div>
            <input
              type="range"
              min={17}
              max={38}
              value={simAge}
              onChange={e => setSimAge(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Graduation Score</span>
              <span className="font-mono text-indigo-600">{simGradScore}%</span>
            </div>
            <input
              type="range"
              min={45}
              max={95}
              value={simGradScore}
              onChange={e => setSimGradScore(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Tip: RBI Grade B requires 60%; ISRO requires 65%.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Reservation Category
            </label>
            <select
              value={simCategory}
              onChange={e => setSimCategory(e.target.value as CategoryType)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
            >
              <option value="UR">UR (General)</option>
              <option value="EWS">EWS (10% Quota)</option>
              <option value="OBC-NCL">OBC-NCL (+3 yrs age relaxation)</option>
              <option value="SC">SC (+5 yrs age relaxation)</option>
              <option value="ST">ST (+5 yrs age relaxation)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Highest Qualification
            </label>
            <select
              value={simQualification}
              onChange={e => setSimQualification(e.target.value as QualificationLevel)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="12th Pass (Higher Secondary)">12th Pass (Higher Secondary)</option>
              <option value="Diploma (Engineering/Technical)">Diploma (Engineering/Technical)</option>
              <option value="Bachelor's Degree (Graduation)">Bachelor's Degree (Graduation)</option>
              <option value="Master's Degree (Post Graduation)">Master's Degree (Post Graduation)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Stream / Specialization
            </label>
            <select
              value={simStream}
              onChange={e => setSimStream(e.target.value as StreamCategory)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All Streams / Any Graduate">All Streams / Any Graduate</option>
              <option value="Engineering & Technology">Engineering & Technology</option>
              <option value="Computer Science / IT">Computer Science / IT</option>
              <option value="Commerce, Economics & Finance">Commerce, Economics & Finance</option>
              <option value="Pure Science (Physics, Chemistry, Math, Biology)">Pure Science</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>English Typing Speed</span>
              <span className="font-mono text-indigo-600">{simTypingWPM} WPM</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={simTypingWPM}
              onChange={e => setSimTypingWPM(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              SSC CGL/CHSL requires 35 WPM.
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => onApplySimulatedToProfile(simulatedProfile)}
              className="w-full py-2 px-3 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors"
            >
              Copy These Settings to My Main Profile
            </button>
          </div>
        </div>

        {/* Results Deck */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <Unlock className="w-4 h-4 text-emerald-600" />
              <span>Simulated Unlocked Recruitments ({simulatedEligibleCount})</span>
            </h3>

            {newlyUnlockedExams.length > 0 && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                <span className="font-bold block mb-1">
                  🎉 Good News! These {newlyUnlockedExams.length} recruitments just became eligible under this scenario:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newlyUnlockedExams.map(({ exam }) => (
                    <span key={exam.id} className="bg-white px-2.5 py-1 rounded-md border border-emerald-300 font-semibold text-emerald-900">
                      {exam.shortName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {simulatedResults.map(({ exam, result }) => (
                <div
                  key={exam.id}
                  onClick={() => onSelectExam(exam)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    result.isEligible
                      ? 'border-slate-200 hover:border-indigo-400 bg-white hover:bg-slate-50'
                      : 'border-slate-100 bg-slate-50/60 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.isEligible ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{exam.shortName}</span>
                        <span className="text-[11px] text-slate-400 font-normal font-mono tabular-nums">
                          {exam.payLevel7thCPC.split('(')[0]}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {result.isEligible ? result.ageCheck.plainReason : result.verdictSummary}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
