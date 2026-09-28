import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEMO_PROFILES, getAllAccounts, saveProfile } from '../utils/storage';
import { X, UserPlus, LogIn, CheckCircle2, Shield, Sparkles, Key } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSwitchProfile: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSwitchProfile
}) => {
  const [mode, setMode] = useState<'switch' | 'register'>('switch');
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedQualification, setSelectedQualification] = useState("Bachelor's Degree (Graduation)");

  if (!isOpen) return null;

  const accounts = getAllAccounts();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail) return;

    const newProfile: UserProfile = {
      id: 'user-' + Date.now(),
      personal: {
        fullName: newFullName,
        email: newEmail,
        dateOfBirth: '2004-01-01',
        gender: 'Male',
        nationality: 'Citizen of India',
        state: 'Delhi (NCT)',
        district: 'New Delhi',
        preferredWorkLocations: ['Pan-India', 'Home State']
      },
      education: {
        highestQualification: selectedQualification as any,
        degreeName: 'Bachelor Degree',
        branchOrStream: 'General Studies',
        streamCategory: 'All Streams / Any Graduate',
        collegeOrUniversity: 'Delhi University',
        graduationStatus: 'Completed',
        graduationYear: 2025,
        percentageOrCGPA: 'Percentage',
        graduationScore: 68.0,
        tenthPercentage: 80.0,
        twelfthPercentage: 78.0,
        twelfthStream: 'Science with Math',
        hasDiploma: false
      },
      eligibility: {
        category: 'UR',
        isPwD: false,
        isExServiceman: false,
        workExperienceYears: 0,
        hasNCCCertificate: false,
        hasSportsQuota: false,
        typingProficiencyEnglishWPM: 30,
        typingProficiencyHindiWPM: 0,
        hasDrivingLicenseLMV: false,
        hasDomicileCertificate: true
      },
      privacyMode: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveProfile(newProfile);
    onSwitchProfile(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900">
              Student Accounts & Personas
            </h3>
            <p className="text-xs text-slate-500">
              Switch student profiles or register a new candidate.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode selector */}
        <div className="flex border-b border-slate-200 bg-white">
          <button
            onClick={() => setMode('switch')}
            className={`flex-1 py-3 text-xs font-semibold border-b-2 text-center transition-colors ${
              mode === 'switch'
                ? 'border-indigo-600 text-indigo-950 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Select Pre-Configured Student
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-xs font-semibold border-b-2 text-center transition-colors ${
              mode === 'register'
                ? 'border-indigo-600 text-indigo-950 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create New Account
          </button>
        </div>

        <div className="p-6">
          {mode === 'switch' ? (
            <div className="space-y-3">
              <div className="text-xs text-slate-600 mb-2">
                Click any profile to test how eligibility dynamically recalculates for different degrees, castes, and age brackets:
              </div>

              {accounts.map(account => {
                const isSelected = account.id === currentProfile.id;
                return (
                  <button
                    key={account.id}
                    onClick={() => {
                      onSwitchProfile(account);
                      onClose();
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {account.personal.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <span>{account.personal.fullName}</span>
                          {isSelected && (
                            <span className="text-[11px] text-indigo-700 font-semibold font-mono">Active</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span>{account.education.degreeName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-slate-700">{account.eligibility.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{account.personal.state}</span>
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={e => setNewFullName(e.target.value)}
                  placeholder="e.g. Priya Sundaram"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Password protected in local device sandbox.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Qualification</label>
                <select
                  value={selectedQualification}
                  onChange={e => setSelectedQualification(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Bachelor's Degree (Graduation)">Bachelor's Degree (Graduation)</option>
                  <option value="12th Pass (Higher Secondary)">12th Pass (Higher Secondary)</option>
                  <option value="Diploma (Engineering/Technical)">Diploma (Engineering/Technical)</option>
                  <option value="Master's Degree (Post Graduation)">Master's Degree (Post Graduation)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-xs"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Student Account & Begin Discovery</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Sensitive student information is isolated locally and never shared.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
