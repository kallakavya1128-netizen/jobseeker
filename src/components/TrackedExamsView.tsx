import React from 'react';
import { TrackedExam, ExamOpportunity, ApplicationTrackingStatus } from '../types';
import { EXAMS_DATA } from '../data/examsData';
import { 
  Bookmark, CheckSquare, Square, Calendar, ExternalLink, Trash2, 
  Clock, AlertCircle, FileCheck, ArrowUpRight 
} from 'lucide-react';

interface TrackedExamsViewProps {
  trackedExams: TrackedExam[];
  onUpdateTracked: (tracked: TrackedExam) => void;
  onRemoveTracked: (examId: string) => void;
  onSelectExam: (exam: ExamOpportunity) => void;
  onGoToOpportunities: () => void;
}

const STATUS_STAGES: ApplicationTrackingStatus[] = [
  'Interested',
  'Applying Soon',
  'Application Submitted',
  'Admit Card Released',
  'Exam Appeared',
  'Result Awaited',
  'Selected / Qualified'
];

export const TrackedExamsView: React.FC<TrackedExamsViewProps> = ({
  trackedExams,
  onUpdateTracked,
  onRemoveTracked,
  onSelectExam,
  onGoToOpportunities
}) => {
  if (trackedExams.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
          No Tracked Examinations Yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          Bookmark recruitments that interest you from the Opportunities tab to monitor application deadlines, keep document readiness checklists, and track exam stages.
        </p>
        <button
          onClick={onGoToOpportunities}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
        >
          <span>Discover Eligible Opportunities</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            My Government Examination Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Keep track of registration timelines, exam dates, application numbers, and mandatory certificates.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          Tracking {trackedExams.length} target examinations
        </div>
      </div>

      <div className="space-y-4">
        {trackedExams.map(tracked => {
          const exam = EXAMS_DATA.find(e => e.id === tracked.examId);
          if (!exam) return null;

          const toggleDoc = (key: keyof typeof tracked.documentsPrepared) => {
            onUpdateTracked({
              ...tracked,
              documentsPrepared: {
                ...tracked.documentsPrepared,
                [key]: !tracked.documentsPrepared[key]
              }
            });
          };

          const handleStatusChange = (newStatus: ApplicationTrackingStatus) => {
            onUpdateTracked({
              ...tracked,
              status: newStatus
            });
          };

          return (
            <div key={tracked.examId} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span>{exam.conductingBody}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exam.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-700">{exam.payLevel7thCPC.split('(')[0]}</span>
                  </div>

                  <h3
                    onClick={() => onSelectExam(exam)}
                    className="font-display text-lg font-bold text-slate-900 hover:text-indigo-900 cursor-pointer"
                  >
                    {exam.shortName}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={tracked.status}
                    onChange={e => handleStatusChange(e.target.value as ApplicationTrackingStatus)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {STATUS_STAGES.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => onRemoveTracked(tracked.examId)}
                    title="Remove from tracking pipeline"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Milestone dates & Official link */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 mb-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Application Deadline</span>
                  <strong className="text-slate-800 font-mono">{exam.applicationEndDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Tentative Exam Date</span>
                  <strong className="text-slate-800 font-mono">{exam.tentativeExamDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Official Apply Portal</span>
                  <a
                    href={exam.conductingBodyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>{exam.conductingBody.split(' ')[0]} Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Document Readiness Checklist */}
              <div className="border-t border-slate-100 pt-3">
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  Document Readiness Checklist for Verification:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                  {[
                    { key: 'idProof', label: 'Aadhaar / ID' },
                    { key: 'categoryCertificate', label: 'Caste / EWS Cert' },
                    { key: 'graduationCertificate', label: 'Degree / Marksheet' },
                    { key: 'passportPhoto', label: 'Digital Photo' },
                    { key: 'signatureFile', label: 'Digital Signature' },
                    { key: 'domicileCertificate', label: 'State Domicile' }
                  ].map(doc => {
                    const isChecked = tracked.documentsPrepared[doc.key as keyof typeof tracked.documentsPrepared];
                    return (
                      <button
                        key={doc.key}
                        onClick={() => toggleDoc(doc.key as keyof typeof tracked.documentsPrepared)}
                        className={`p-2 rounded border text-left flex items-center gap-2 transition-colors ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        <span className="text-[11px] truncate">{doc.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
