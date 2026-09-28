import React, { useState } from 'react';
import { Compass, BookOpen, Clock, Target, CheckCircle2, FileText, ArrowRight, Lightbulb } from 'lucide-react';

export const PreparationCompass: React.FC = () => {
  const [activePlan, setActivePlan] = useState<'college' | 'finalYear' | 'fullTime'>('college');

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-1">
          <Compass className="w-4 h-4" />
          <span>Student Preparation Compass</span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          How to Prepare for Government Exams Without Academic Burnout
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Most government exams (UPSC, SSC, Banking, Railways) share 70% of foundational syllabus topics. You don't need to study 14 hours a day. Systematic consistency during your college years gives you a huge advantage over competitors.
        </p>

        {/* Plan Switcher */}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => setActivePlan('college')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activePlan === 'college'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1st & 2nd Year College Students (1.5 - 2 hrs/day)
          </button>
          <button
            onClick={() => setActivePlan('finalYear')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activePlan === 'finalYear'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Final Year Students (3 - 4 hrs/day)
          </button>
          <button
            onClick={() => setActivePlan('fullTime')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activePlan === 'fullTime'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Fresh Graduates / Full-Time Aspirants (6 - 7 hrs/day)
          </button>
        </div>
      </div>

      {/* Dynamic Roadmap Plan */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {activePlan === 'college' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>The 1st & 2nd Year College Routine (Foundation Stage)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Your primary objective is maintaining a good college GPA while quietly building the 4 universal pillars of all government exams:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <strong className="text-slate-900 block text-xs">Morning Habit (45 mins): General Awareness</strong>
                <p className="text-slate-600 leading-relaxed">
                  Read one quality national daily (The Hindu or Indian Express) focusing strictly on Government Schemes, Supreme Court verdicts, RBI repo rate changes, and Science & Tech developments. Skip crime and celebrity gossip.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <strong className="text-slate-900 block text-xs">Evening Habit (45 mins): Speed Math & Logic</strong>
                <p className="text-slate-600 leading-relaxed">
                  Learn Vedic math calculation shortcuts: squares up to 50, cubes up to 30, fraction-to-percentage conversions (e.g. 1/7 = 14.28%). Solve 20 reasoning puzzles twice a week.
                </p>
              </div>
            </div>
          </div>
        )}

        {activePlan === 'finalYear' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Final Year Graduation Strategy (Exam Alignment)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              In your final year, choose 1 primary exam family (e.g., Central Admin UPSC/SSC OR Banking IBPS/SBI) and align your test practice:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block">Syllabus Completion (40%)</strong>
                <p className="text-slate-600 leading-relaxed">
                  Finish standard core textbooks (Polity: M. Laxmikanth, Modern History: Spectrum, Quantitative: RS Aggarwal / Rakesh Yadav).
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block">Previous Years Papers (40%)</strong>
                <p className="text-slate-600 leading-relaxed">
                  Solve 5 years of authentic previous question papers under strict timer conditions to understand commission traps.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block">Speed & Mock Tests (20%)</strong>
                <p className="text-slate-600 leading-relaxed">
                  Take one full-length online computer-based mock test every Sunday. Spend 2 hours analyzing errors.
                </p>
              </div>
            </div>
          </div>
        )}

        {activePlan === 'fullTime' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Dedicated Full-Time Aspirant Blueprint</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Divide your day into 3 distinct 2-hour focused blocks with physical exercise and restorative breaks:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Block 1: Static GS / Domain Core</strong>
                <p className="text-slate-600">History, Geography, Economy, Constitution, or Engineering domain.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Block 2: Math & Reasoning Drills</strong>
                <p className="text-slate-600">High-intensity practice of 50-70 numerical questions and puzzles.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Block 3: Current Affairs & Mocks</strong>
                <p className="text-slate-600">Monthly current affairs compilation, editorial analysis, and test series revision.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Syllabus Overlap Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <span>The Overlap Rule: One Preparation, Multiple Exams</span>
        </h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Students often make the mistake of preparing separately for each exam from scratch. Here is how your preparation automatically covers multiple recruitment boards:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Subject Pillar</th>
                <th className="py-2.5 px-3 font-semibold">Applicable Exams</th>
                <th className="py-2.5 px-3 font-semibold">Free Standard Resource</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Quantitative Aptitude</td>
                <td className="py-2.5 px-3">SSC CGL/CHSL, IBPS/SBI, RRB NTPC, AFCAT, CDS</td>
                <td className="py-2.5 px-3">NCERT Math (Class 6-10) + Past 5 Years SSC/Banking papers</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">Logical Reasoning</td>
                <td className="py-2.5 px-3">SSC, Banking PO/Clerk, UPSC CSAT, State PSCs, RRB</td>
                <td className="py-2.5 px-3">Free mock tests on official recruitment portals & PYQs</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">General Studies & GK</td>
                <td className="py-2.5 px-3">UPSC CSE, State PSCs, SSC CGL/CPO, Railways, IB ACIO</td>
                <td className="py-2.5 px-3">e-NCERT textbooks (History, Polity, Geography, Biology)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-900">English Grammar & Comprehension</td>
                <td className="py-2.5 px-3">UPSC CDS, SSC CGL/CHSL/CPO, IBPS PO, RBI Grade B</td>
                <td className="py-2.5 px-3">Daily editorial reading + SP Bakshi Objective General English</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
