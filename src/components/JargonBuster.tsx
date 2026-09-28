import React, { useState } from 'react';
import { HelpCircle, Check, X, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

interface JargonItem {
  term: string;
  officialDefinition: string;
  plainEnglishExplanation: string;
  practicalExample: string;
}

const JARGON_ITEMS: JargonItem[] = [
  {
    term: "Group A (Gazetted) vs Group B vs Group C",
    officialDefinition: "Classification of Civil Posts under Central Civil Services Rules 1965 based on pay scales and appointing authority.",
    plainEnglishExplanation: "Gazetted officers (Group A like IAS/IPS/IRS and Group B Gazetted like AAO) have their appointments and transfers published in the official Gazette of India. They possess legal authority to verify/attest official citizen documents with a government seal. Group B (Non-Gazetted) are supervisory executives (Inspectors, Section Officers), and Group C are operational clerical and technical staff.",
    practicalExample: "An Income Tax Inspector is Group B (Non-Gazetted); when they get promoted to Assistant Commissioner of Income Tax, they become Group A (Gazetted) with a presidential seal."
  },
  {
    term: "7th CPC Pay Levels vs Grade Pay",
    officialDefinition: "The 7th Central Pay Commission replaced the old Grade Pay system (e.g. GP 4600, GP 4200) with Pay Matrix Levels 1 through 18.",
    plainEnglishExplanation: "Level 1 is entry-level (₹18,000 base). Level 6 & 7 (old Grade Pay 4200/4600) are inspector/officer levels (₹35,400 / ₹44,900 base). Level 10 (old GP 5400) is IAS/IPS entry (₹56,100 base). Your actual bank salary is about 1.6x to 1.8x this basic pay after adding DA (50%) + HRA (30% in metro cities) + Transport Allowance.",
    practicalExample: "A post marked 'Level 7' with basic ₹44,900 yields around ₹72,000 to ₹80,000 per month deposited in your bank account in Delhi or Mumbai."
  },
  {
    term: "OBC Non-Creamy Layer (OBC-NCL) vs Creamy Layer",
    officialDefinition: "Income criteria defined by Department of Personnel and Training (DoPT) for other backward classes quota eligibility.",
    plainEnglishExplanation: "If your parents' annual income (excluding salary and agricultural income) is below ₹8 Lakhs, you belong to the 'Non-Creamy Layer' and qualify for 27% reservation and 3-year age relaxation. If parental income exceeds ₹8 Lakhs, you are 'Creamy Layer' and must apply under the Unreserved (General) category.",
    practicalExample: "Your caste may be in the Central OBC list, but you must renew your OBC-NCL income certificate every financial year (issued after April 1st of the exam year) to claim age and vacancy benefits."
  },
  {
    term: "Vertical vs Horizontal Reservation",
    officialDefinition: "Constitutional jurisprudence governing social reservation (SC/ST/OBC/EWS) versus interlocking special reservations (PwD/Ex-Servicemen/Women).",
    plainEnglishExplanation: "Vertical reservation is your core social category (SC, ST, OBC, EWS). Horizontal reservation (for Persons with Disabilities or Ex-Servicemen) cuts across every vertical category. A PwD candidate from OBC occupies a seat within the OBC quota, not outside it.",
    practicalExample: "If there are 10 seats for PwD, they are distributed proportionately across General, OBC, SC, and ST categories."
  },
  {
    term: "Normalization Formula in Computer-Based Exams",
    officialDefinition: "Statistical percentile or equi-percentile method applied to multi-shift exams to balance variations in question paper difficulty.",
    plainEnglishExplanation: "When lakhs of students take exams across 15 different shifts over 10 days, one shift might accidentally get tougher math questions than another. Commissions use statistical normalization so candidates in hard shifts get bonus adjusted marks, ensuring fairness.",
    practicalExample: "You might score 130 raw marks in a tough shift, and after normalization your final score becomes 142 marks on the merit list."
  },
  {
    term: "Cut-Off vs Qualifying Marks",
    officialDefinition: "Minimum threshold marks required for evaluation versus final merit ranking mark.",
    plainEnglishExplanation: "'Qualifying Marks' means a fixed pass percentage (e.g. UPSC CSAT requires 33% = 66 marks). Once you reach 66, getting 150 marks gives no extra advantage. 'Cut-Off Marks' is dynamic: it depends on how many vacancies exist and how well everyone else performed. Only candidates scoring above the cut-off get selected.",
    practicalExample: "In UPSC Prelims, Paper 2 is qualifying (pass/fail), while Paper 1 cut-off decides if you make it to Mains."
  }
];

const MYTHS = [
  {
    myth: "I need 90%+ in 10th, 12th, or College to clear UPSC or SSC.",
    reality: "False! UPSC CSE and SSC CGL only require a recognized degree with a mere passing grade (even 45% or 3rd division). The selection is 100% determined by how you perform in the competitive examination, not your past college grades."
  },
  {
    myth: "Engineering students can't sit for Banking or Administrative exams.",
    reality: "False! Engineering and Science graduates make up nearly 50% of selected candidates in IBPS PO, SBI Clerk, and UPSC Civil Services. The analytical and math background is often an asset."
  },
  {
    myth: "Final year students cannot apply for government jobs.",
    reality: "Partially False! Major exams like UPSC CSE, SSC CGL, and SBI Clerk allow final-year appearing students to appear for Preliminary stages, provided you obtain your degree marksheets before the specified cut-off date (usually document verification)."
  },
  {
    myth: "You must prepare in Delhi coaching hubs to crack government exams.",
    reality: "False! Over 75% of top rankers now prepare from home using standard NCERTs, official government publications (PIB, Economic Survey), and affordable online practice tests."
  }
];

export const JargonBuster: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredJargon = JARGON_ITEMS.filter(
    j => j.term.toLowerCase().includes(search.toLowerCase()) || j.plainEnglishExplanation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-1">
          <BookOpen className="w-4 h-4" />
          <span>No-Confusion Glossary</span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Plain-English Government Exam Jargon Buster
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Official recruitment notifications are filled with bureaucratic legalities. Here is what every term actually means for your career, salary, and rights as an applicant.
        </p>

        <div className="mt-4 max-w-md">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms (e.g. Normalization, Level 7, OBC, Cut-off)..."
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Jargon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJargon.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="font-display text-base font-bold text-slate-900 text-indigo-950">
              {item.term}
            </h3>

            <div className="text-xs space-y-2">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Official Bureaucratic Term:
                </span>
                <p className="text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100">
                  "{item.officialDefinition}"
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-0.5">
                  What It Actually Means For You:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {item.plainEnglishExplanation}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                  Real-World Example:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {item.practicalExample}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Myths vs Reality Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Top Student Myths Busted</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MYTHS.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-rose-700 font-semibold">
                <X className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Myth: {m.myth}</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-800 font-medium pl-6">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span className="leading-relaxed">Fact: {m.reality}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
