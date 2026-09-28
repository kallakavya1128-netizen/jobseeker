import React from 'react';
import { UserProfile } from '../types';
import { calculateAgeAtDate } from '../utils/eligibilityEngine';
import { 
  User, GraduationCap, Shield, Award, Edit3, Lock, Eye, EyeOff, 
  Download, MapPin, Calendar, FileText, CheckCircle2 
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onEditProfile: () => void;
  onTogglePrivacy: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onEditProfile,
  onTogglePrivacy
}) => {
  const age = calculateAgeAtDate(profile.personal.dateOfBirth, '2026-08-01');

  const exportProfileJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `GovtCareerProfile_${profile.personal.fullName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const maskString = (str: string, keepStart = 2, keepEnd = 2) => {
    if (!profile.privacyMode || !str) return str;
    if (str.length <= keepStart + keepEnd) return '••••••';
    return str.substring(0, keepStart) + '••••••••' + str.substring(str.length - keepEnd);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-display text-xl font-bold">
            {profile.personal.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                {profile.privacyMode ? maskString(profile.personal.fullName, 3, 2) : profile.personal.fullName}
              </h2>
              {profile.privacyMode && (
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Masked Mode</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {profile.education.degreeName} · {profile.personal.state}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onTogglePrivacy}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {profile.privacyMode ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Show Real Details</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                <span>Mask Sensitive Info</span>
              </>
            )}
          </button>

          <button
            onClick={exportProfileJSON}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={onEditProfile}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Personal Information</span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block text-[11px]">Email</span>
              <strong className="text-slate-900 font-mono">
                {profile.privacyMode ? maskString(profile.personal.email, 2, 4) : profile.personal.email}
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Date of Birth & Age</span>
              <strong className="text-slate-900 font-mono">
                {profile.personal.dateOfBirth} ({age.years}y {age.months}m on 01-Aug-2026)
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Gender & Nationality</span>
              <strong className="text-slate-900">
                {profile.personal.gender} · {profile.personal.nationality}
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">State & District</span>
              <strong className="text-slate-900">
                {profile.personal.district}, {profile.personal.state}
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Preferred Work Locations</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {profile.personal.preferredWorkLocations.map((loc, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Educational Credentials</span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block text-[11px]">Highest Degree</span>
              <strong className="text-slate-900">{profile.education.degreeName}</strong>
              <span className="text-slate-500 block text-[11px] mt-0.5">{profile.education.highestQualification}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Branch / Stream</span>
              <strong className="text-slate-900">{profile.education.branchOrStream}</strong>
              <span className="text-slate-500 block text-[11px]">({profile.education.streamCategory})</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">College / University</span>
              <strong className="text-slate-900">{profile.education.collegeOrUniversity}</strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Graduation Status & Score</span>
              <strong className="text-slate-900 font-mono">
                {profile.education.graduationStatus} ({profile.education.graduationYear}) · {profile.education.graduationScore} {profile.education.percentageOrCGPA === 'Percentage' ? '%' : 'CGPA'}
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">10th & 12th Marks</span>
              <strong className="text-slate-900 font-mono">
                10th: {profile.education.tenthPercentage}% · 12th: {profile.education.twelfthPercentage}%
              </strong>
            </div>

            {profile.education.hasDiploma && (
              <div className="pt-1 border-t border-slate-100 text-[11px]">
                <span className="text-emerald-700 font-semibold block">Polytechnic Diploma:</span>
                <span className="text-slate-700">{profile.education.diplomaBranch} ({profile.education.diplomaPercentage}%)</span>
              </div>
            )}
          </div>
        </div>

        {/* Eligibility & Reservation Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>Category & Eligibility</span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block text-[11px]">Social Category</span>
              <strong className="text-indigo-900 font-bold font-mono text-sm">
                {profile.eligibility.category}
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Person with Benchmark Disability (PwD)</span>
              <strong className="text-slate-900">
                {profile.eligibility.isPwD ? `Yes (${profile.eligibility.pwdType || 'Benchmark'} - ${profile.eligibility.pwdPercentage}%)` : 'No (Not Applicable)'}
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Work Experience</span>
              <strong className="text-slate-900">
                {profile.eligibility.workExperienceYears > 0
                  ? `${profile.eligibility.workExperienceYears} Years in ${profile.eligibility.experienceSector}`
                  : 'Fresher (No formal work experience)'}
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Special Quotas & Certificates</span>
              <div className="space-y-0.5 text-[11px] text-slate-700 mt-1">
                <div>NCC Certificate: <strong>{profile.eligibility.hasNCCCertificate ? `Yes ('${profile.eligibility.nccCertificateType}' Cert)` : 'No'}</strong></div>
                <div>Sports Quota: <strong>{profile.eligibility.hasSportsQuota ? `Yes (${profile.eligibility.sportsLevel})` : 'No'}</strong></div>
                <div>LMV Driving License: <strong>{profile.eligibility.hasDrivingLicenseLMV ? 'Yes (Valid)' : 'No'}</strong></div>
                <div>Typing Speed: <strong>{profile.eligibility.typingProficiencyEnglishWPM} WPM (English)</strong></div>
                <div>State Domicile: <strong>{profile.eligibility.hasDomicileCertificate ? 'Yes (Available)' : 'No'}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
