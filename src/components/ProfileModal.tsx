import React, { useState, useEffect } from 'react';
import { UserProfile, QualificationLevel, StreamCategory, CategoryType, GenderType, NationalityType } from '../types';
import { INDIAN_STATES_AND_DISTRICTS } from '../data/statesAndDistricts';
import { DEMO_PROFILES } from '../utils/storage';
import { calculateAgeAtDate } from '../utils/eligibilityEngine';
import { SupportedLanguage, getTranslation } from '../utils/translations';
import { X, Check, Shield, Lock, Eye, EyeOff, Sparkles, AlertCircle, Info } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: UserProfile) => void;
  currentLang: SupportedLanguage;
}

const QUALIFICATIONS: QualificationLevel[] = [
  '10th Pass (Matriculation)',
  '12th Pass (Higher Secondary)',
  'Diploma (Engineering/Technical)',
  "Bachelor's Degree (Graduation)",
  "Master's Degree (Post Graduation)",
  'Doctorate (Ph.D)',
  'Professional Degree (CA/CS/Law/MBBS)'
];

const STREAM_CATEGORIES: StreamCategory[] = [
  'All Streams / Any Graduate',
  'Engineering & Technology',
  'Computer Science / IT',
  'Commerce, Economics & Finance',
  'Humanities, Arts & Social Sciences',
  'Pure Science (Physics, Chemistry, Math, Biology)',
  'Medicine & Healthcare',
  'Law & Legal Studies',
  'Agriculture & Allied Sciences'
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  currentLang
}) => {
  const t = (k: string) => getTranslation(currentLang, k);
  const [activeStep, setActiveStep] = useState<'personal' | 'education' | 'eligibility'>('personal');
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [selectedStateDistricts, setSelectedStateDistricts] = useState<string[]>([]);

  useEffect(() => {
    setFormData(profile);
  }, [profile, isOpen]);

  useEffect(() => {
    const foundState = INDIAN_STATES_AND_DISTRICTS.find(s => s.state === formData.personal.state);
    if (foundState) {
      setSelectedStateDistricts(foundState.districts);
    } else {
      setSelectedStateDistricts([]);
    }
  }, [formData.personal.state]);

  if (!isOpen) return null;

  // Calculate live age on standard cut-off benchmark
  const liveAge = calculateAgeAtDate(formData.personal.dateOfBirth, '2026-08-01');

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    const found = INDIAN_STATES_AND_DISTRICTS.find(s => s.state === newState);
    setFormData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        state: newState,
        district: found && found.districts.length > 0 ? found.districts[0] : ''
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const loadDemo = (demoId: string) => {
    const demo = DEMO_PROFILES.find(d => d.id === demoId);
    if (demo) {
      setFormData(demo);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
              {t('profileModalTitle')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('profileModalSubtitle')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Fast Fillers Bar */}
        <div className="bg-indigo-50/70 px-6 py-2.5 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-indigo-950 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t('sampleProfiles')}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {DEMO_PROFILES.map(demo => (
              <button
                key={demo.id}
                type="button"
                onClick={() => loadDemo(demo.id)}
                className={`px-2.5 py-1 rounded-md transition-all text-xs font-medium border ${
                  formData.id === demo.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {demo.personal.fullName.split(' ')[0]} ({demo.education.highestQualification.split(' ')[0]} · {demo.eligibility.category})
              </button>
            ))}
          </div>
        </div>

        {/* 3 Clear Steps Workflow Header */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveStep('personal')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeStep === 'personal'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('tabPersonal')}
          </button>
          <button
            onClick={() => setActiveStep('education')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeStep === 'education'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('tabEducation')}
          </button>
          <button
            onClick={() => setActiveStep('eligibility')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeStep === 'eligibility'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('tabEligibility')}
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: PERSONAL INFORMATION */}
          {activeStep === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    value={formData.personal.fullName}
                    onChange={e => setFormData({
                      ...formData,
                      personal: { ...formData.personal, fullName: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Rohit Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.personal.email}
                    onChange={e => setFormData({
                      ...formData,
                      personal: { ...formData.personal, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="student@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('dob')}
                  </label>
                  <input
                    type="date"
                    value={formData.personal.dateOfBirth}
                    onChange={e => setFormData({
                      ...formData,
                      personal: { ...formData.personal, dateOfBirth: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                  <div className="mt-1 text-xs text-indigo-700 font-mono font-medium">
                    {t('calculatedAge')}: {liveAge.years}y {liveAge.months}m
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('gender')}
                  </label>
                  <select
                    value={formData.personal.gender}
                    onChange={e => setFormData({
                      ...formData,
                      personal: { ...formData.personal, gender: e.target.value as GenderType }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('nationality')}
                  </label>
                  <select
                    value={formData.personal.nationality}
                    onChange={e => setFormData({
                      ...formData,
                      personal: { ...formData.personal, nationality: e.target.value as NationalityType }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Citizen of India">Citizen of India</option>
                    <option value="Subject of Nepal">Subject of Nepal</option>
                    <option value="Subject of Bhutan">Subject of Bhutan</option>
                    <option value="Tibetan Refugee (pre-1962)">Tibetan Refugee (pre-1962)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('state')}
                  </label>
                  <select
                    value={formData.personal.state}
                    onChange={handleStateChange}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {INDIAN_STATES_AND_DISTRICTS.map(s => (
                      <option key={s.state} value={s.state}>{s.state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('district')}
                  </label>
                  <select
                    value={formData.personal.district}
                    onChange={e => setFormData({
                      ...formData,
                      personal: { ...formData.personal, district: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {selectedStateDistricts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                    {selectedStateDistricts.length === 0 && (
                      <option value="">Select District</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('preferredLocation')}
                  </label>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {['Pan-India', 'Home State', 'Delhi (NCT)', 'Metro Cities'].map(loc => {
                      const isSelected = formData.personal.preferredWorkLocations.includes(loc);
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => {
                            const current = [...formData.personal.preferredWorkLocations];
                            const idx = current.indexOf(loc);
                            if (idx >= 0) {
                              current.splice(idx, 1);
                            } else {
                              current.push(loc);
                            }
                            setFormData({
                              ...formData,
                              personal: { ...formData.personal, preferredWorkLocations: current }
                            });
                          }}
                          className={`px-2.5 py-1 rounded border transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {loc}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATIONAL INFORMATION */}
          {activeStep === 'education' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('highestQual')}
                  </label>
                  <select
                    value={formData.education.highestQualification}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, highestQualification: e.target.value as QualificationLevel }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {QUALIFICATIONS.map(q => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('degreeName')}
                  </label>
                  <input
                    type="text"
                    value={formData.education.degreeName}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, degreeName: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. B.Tech, B.Sc, B.Com, BA, BCA, MBBS"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('branch')}
                  </label>
                  <input
                    type="text"
                    value={formData.education.branchOrStream}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, branchOrStream: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Computer Science, Mechanical, Civil, Commerce"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('streamCategory')}
                  </label>
                  <select
                    value={formData.education.streamCategory}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, streamCategory: e.target.value as StreamCategory }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {STREAM_CATEGORIES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('college')}
                  </label>
                  <input
                    type="text"
                    value={formData.education.collegeOrUniversity}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, collegeOrUniversity: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Delhi University, Osmania, Anna University"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('gradStatus')}
                  </label>
                  <select
                    value={formData.education.graduationStatus}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, graduationStatus: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Completed">Graduated (Completed)</option>
                    <option value="Final Year / Appearing">Final Year / Appearing Student</option>
                    <option value="Pre-final Year">Pre-final Year (1st / 2nd / 3rd Year)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('gradYear')}
                  </label>
                  <input
                    type="number"
                    value={formData.education.graduationYear}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, graduationYear: parseInt(e.target.value) || 2026 }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    placeholder="2025 or 2026"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('gradScore')}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.education.percentageOrCGPA}
                      onChange={e => setFormData({
                        ...formData,
                        education: { ...formData.education, percentageOrCGPA: e.target.value as any }
                      })}
                      className="w-32 px-2 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Percentage">Percentage (%)</option>
                      <option value="CGPA">CGPA (10 pt)</option>
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.education.graduationScore}
                      onChange={e => setFormData({
                        ...formData,
                        education: { ...formData.education, graduationScore: parseFloat(e.target.value) || 0 }
                      })}
                      className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      placeholder="e.g. 74.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('tenthMarks')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.education.tenthPercentage}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, tenthPercentage: parseFloat(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    placeholder="e.g. 88.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('twelfthMarks')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.education.twelfthPercentage}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, twelfthPercentage: parseFloat(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    placeholder="e.g. 82.0"
                  />
                </div>
              </div>

              {/* Diploma toggle */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.education.hasDiploma}
                    onChange={e => setFormData({
                      ...formData,
                      education: { ...formData.education, hasDiploma: e.target.checked }
                    })}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span>{t('diplomaCheck')}</span>
                </label>
                {formData.education.hasDiploma && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pl-6 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Diploma Branch</label>
                      <input
                        type="text"
                        value={formData.education.diplomaBranch || ''}
                        onChange={e => setFormData({
                          ...formData,
                          education: { ...formData.education, diplomaBranch: e.target.value }
                        })}
                        placeholder="e.g. Civil Engineering"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Diploma Percentage</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.education.diplomaPercentage || ''}
                        onChange={e => setFormData({
                          ...formData,
                          education: { ...formData.education, diplomaPercentage: parseFloat(e.target.value) || 0 }
                        })}
                        placeholder="e.g. 74.5"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: ELIGIBILITY & SENSITIVE DETAILS */}
          {activeStep === 'eligibility' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('category')}
                  </label>
                  <select
                    value={formData.eligibility.category}
                    onChange={e => setFormData({
                      ...formData,
                      eligibility: { ...formData.eligibility, category: e.target.value as CategoryType }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  >
                    <option value="UR">UR (Unreserved / General)</option>
                    <option value="EWS">EWS (10% Quota)</option>
                    <option value="OBC-NCL">OBC-NCL (+3 yrs age relaxation)</option>
                    <option value="SC">SC (+5 yrs age relaxation)</option>
                    <option value="ST">ST (+5 yrs age relaxation)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('experience')}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.eligibility.workExperienceYears}
                      onChange={e => setFormData({
                        ...formData,
                        eligibility: { ...formData.eligibility, workExperienceYears: parseInt(e.target.value) || 0 }
                      })}
                      className="w-24 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      placeholder="0"
                    />
                    <select
                      value={formData.eligibility.experienceSector || 'None'}
                      onChange={e => setFormData({
                        ...formData,
                        eligibility: { ...formData.eligibility, experienceSector: e.target.value as any }
                      })}
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="None">Fresher (0 Years)</option>
                      <option value="Private Sector">Private Sector</option>
                      <option value="Government / PSU">Government / PSU</option>
                    </select>
                  </div>
                </div>

                {/* PwD section */}
                <div className="col-span-full bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.eligibility.isPwD}
                      onChange={e => setFormData({
                        ...formData,
                        eligibility: { ...formData.eligibility, isPwD: e.target.checked }
                      })}
                      className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span>{t('pwdCheck')}</span>
                  </label>
                  {formData.eligibility.isPwD && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pl-6">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Disability Type</label>
                        <select
                          value={formData.eligibility.pwdType || 'Locomotor Disability'}
                          onChange={e => setFormData({
                            ...formData,
                            eligibility: { ...formData.eligibility, pwdType: e.target.value }
                          })}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                        >
                          <option value="Locomotor Disability">Locomotor Disability (OA, OL)</option>
                          <option value="Visual Impairment">Blindness & Low Vision (VI)</option>
                          <option value="Hearing Impairment">Deaf & Hard of Hearing (HI)</option>
                          <option value="Multiple Disabilities">Multiple Disabilities (MD)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Percentage (Min 40%)</label>
                        <input
                          type="number"
                          value={formData.eligibility.pwdPercentage || 40}
                          onChange={e => setFormData({
                            ...formData,
                            eligibility: { ...formData.eligibility, pwdPercentage: parseInt(e.target.value) || 40 }
                          })}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white font-mono"
                          placeholder="40"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional criteria */}
                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={formData.eligibility.hasNCCCertificate}
                        onChange={e => setFormData({
                          ...formData,
                          eligibility: { ...formData.eligibility, hasNCCCertificate: e.target.checked }
                        })}
                        className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>{t('nccCheck')}</span>
                    </label>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={formData.eligibility.hasDrivingLicenseLMV}
                        onChange={e => setFormData({
                          ...formData,
                          eligibility: { ...formData.eligibility, hasDrivingLicenseLMV: e.target.checked }
                        })}
                        className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                      />
                      <span>{t('drivingLicenseCheck')}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('typingSpeed')}
                  </label>
                  <input
                    type="number"
                    value={formData.eligibility.typingProficiencyEnglishWPM}
                    onChange={e => setFormData({
                      ...formData,
                      eligibility: { ...formData.eligibility, typingProficiencyEnglishWPM: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    placeholder="35"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {activeStep === 'personal' && t('tabPersonal')}
            {activeStep === 'education' && t('tabEducation')}
            {activeStep === 'eligibility' && t('tabEligibility')}
          </div>
          <div className="flex items-center gap-2">
            {activeStep !== 'personal' && (
              <button
                type="button"
                onClick={() => {
                  if (activeStep === 'education') setActiveStep('personal');
                  if (activeStep === 'eligibility') setActiveStep('education');
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {t('btnPrev')}
              </button>
            )}
            {activeStep !== 'eligibility' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeStep === 'personal') setActiveStep('education');
                  if (activeStep === 'education') setActiveStep('eligibility');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                {t('btnNext')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>{t('btnSaveProfile')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
