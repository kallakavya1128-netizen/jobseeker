/**
 * High-yield domain knowledge for Indian Government competitive examinations.
 * Provides immediate accurate responses for common questions regarding eligibility,
 * age relaxations, syllabus overlap, and notifications.
 */

export function getExamKnowledgeResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('upsc') || q.includes('ias') || q.includes('ips') || q.includes('civil service')) {
    return `### 🏛️ UPSC Civil Services Examination (CSE) 2026 Guide

- **Minimum Qualification**: Bachelor's Degree in any discipline from a recognized University. Mere pass in graduation is sufficient (no minimum percentage required).
- **Final Year Students**: Yes, eligible to apply and appear in the Preliminary exam! You must submit degree completion proof during Mains (DAF-1).
- **Age Limits (as of 1st August 2026)**:
  - **General / EWS**: 21 to 32 years (6 attempts)
  - **OBC (Non-Creamy Layer)**: 21 to 35 years (9 attempts)
  - **SC / ST**: 21 to 37 years (Unlimited attempts)
  - **PwBD**: Up to 42 years (9 attempts for Gen/OBC, unlimited for SC/ST)
- **Exam Architecture**:
  1. **Prelims**: GS Paper 1 (determines cutoff) + CSAT Paper 2 (Qualifying 33% = 66 marks).
  2. **Mains**: 9 Descriptive papers (7 counted for merit = 1750 marks).
  3. **Personality Test (Interview)**: 275 marks at Dholpur House, New Delhi.
- **Top Strategy**: Start with NCERTs (Class 6-12) for History & Geography, followed by M. Laxmikanth for Indian Polity and daily editorial reading from *The Hindu* or *The Indian Express*.`;
  }

  if (q.includes('ssc') || q.includes('cgl') || q.includes('chsl') || q.includes('inspector') || q.includes('staff selection')) {
    return `### ⚡ Staff Selection Commission (SSC) Examinations

- **SSC CGL (Combined Graduate Level)**:
  - **Key Posts**: Income Tax Inspector, GST & Central Excise Inspector, Assistant Section Officer (CSS/MEA), Enforcement Officer, Auditor.
  - **Eligibility**: Any Bachelor's Degree. Age: 18-30/32 years (depending on post). Category relaxations apply.
  - **Pattern**:
    - **Tier 1 (Screening)**: 100 MCQs (Reasoning, Quant, English, General Awareness) in 60 mins.
    - **Tier 2 (Merit Selection)**: Paper 1 (Maths + Reasoning + English + GA + Computer test) + Data Entry Speed Test (DEST).
- **SSC CHSL (10+2 Level)**:
  - **Key Posts**: Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), Data Entry Operator (DEO).
  - **Eligibility**: Passed 12th standard. Age: 18-27 years.
- **Synergy Tip**: SSC syllabus shares 70% overlap with Railway (RRB NTPC) and State Staff Selection exams. Focus on fast arithmetic formulas and previous year questions (PYQs).`;
  }

  if (q.includes('bank') || q.includes('ibps') || q.includes('sbi') || q.includes('po') || q.includes('clerk') || q.includes('rbi')) {
    return `### 🏦 Banking Sector Examinations (SBI, IBPS, RBI)

- **Key Exams**:
  - **SBI PO & IBPS PO**: Probationary Officer in public sector banks.
  - **SBI Clerk & IBPS Clerk**: Junior Associates.
  - **RBI Grade B**: Reserve Bank of India Manager cadre (requires min 60% in graduation).
- **Age Criteria**:
  - PO: 20 to 30 years (OBC: 33, SC/ST: 35)
  - Clerk: 20 to 28 years (OBC: 31, SC/ST: 33)
- **Exam Pattern**:
  - **Prelims (Speed Round)**: 100 MCQs in 60 mins (20 mins per section: English, Quant, Reasoning). Sectional timers apply!
  - **Mains (Analytical Depth)**: In-depth reasoning, Data Interpretation, General Economy & Banking Awareness + English Descriptive Letter/Essay.
  - **Interview**: For PO and RBI Grade B (No interview for Clerk).
- **High-Yield Advice**: Practice timed sectional mock tests daily. Speed calculation (vedic math, square/cube tables, fractions) will save 5-8 minutes per section.`;
  }

  if (q.includes('railway') || q.includes('rrb') || q.includes('ntpc') || q.includes('group d') || q.includes('alp')) {
    return `### 🚆 Railway Recruitment Board (RRB) 2026 Overview

- **RRB NTPC (Non-Technical Popular Categories)**:
  - **Graduate Level**: Station Master, Goods Train Manager, Senior Commercial Clerk (Pay Level 5 & 6). Age: 18-36 years.
  - **Undergraduate Level (12th Pass)**: Commercial cum Ticket Clerk, Accounts Clerk, Junior Time Keeper (Pay Level 2 & 3). Age: 18-33 years.
- **Selection Stages**:
  - Stage 1: CBT 1 (Common Screening - 100 questions in 90 mins).
  - Stage 2: CBT 2 (Post-specific merit - 120 questions in 90 mins).
  - Stage 3: Computer Based Aptitude Test (CBAT) for Station Master, or Typing Skill Test for Clerical posts.
- **Key Advantage**: No interview! Selection is 100% based on CBT 2 marks.`;
  }

  if (q.includes('defense') || q.includes('defence') || q.includes('cds') || q.includes('afcat') || q.includes('nda') || q.includes('army') || q.includes('navy') || q.includes('air force')) {
    return `### 🎖️ Armed Forces Officer Examinations (CDS, AFCAT, NDA)

- **CDS (Combined Defence Services)**:
  - Conducted twice a year by UPSC for Indian Military Academy (IMA), Naval Academy (INA), Air Force Academy (AFA), and Officers Training Academy (OTA).
  - **Eligibility**: IMA/OTA: Any degree. INA: Engineering degree. AFA: Degree with Physics & Math at 10+2, or B.Tech.
  - **Age**: 19-24 years (OTA up to 25 years).
- **AFCAT (Air Force Common Admission Test)**:
  - For Flying and Ground Duty (Technical & Non-Technical) branches.
  - Age: Flying Branch (20-24 yrs), Ground Duty (20-26 yrs).
- **SSB Interview**:
  - 5-Day psychological and leadership evaluation (Stage 1 Screening, Psychology tests, GTO outdoor tasks, Conference).`;
  }

  if (q.includes('final year') || q.includes('college') || q.includes('appearing') || q.includes('degree')) {
    return `### 🎓 Final-Year College Student Application Guide

- **UPSC CSE**: ✅ **Eligible!** Final year appearing students can apply for the Prelims. You only need to present your provisional passing degree when filling the Mains DAF form.
- **SSC CGL**: ✅ **Eligible conditionally**: Your graduation result or provisional certificate must be declared before the notification cutoff date (usually August/September of the exam year).
- **IBPS / SBI PO**: Your final degree marksheet/result must be formally issued on or before the online application closing date.
- **CDS & AFCAT**: ✅ Final year students without active backlogs can apply for the upcoming course batch.
- **Recommended Action**: Dedicate 3-4 hours daily alongside your college semesters focusing on Quantitative Aptitude, General English, and daily The Hindu editorials!`;
  }

  if (q.includes('age') || q.includes('limit') || q.includes('relaxation') || q.includes('cutoff') || q.includes('obc') || q.includes('sc') || q.includes('st') || q.includes('pwd')) {
    return `### 📅 Central Government Age Limit & Category Relaxations

- **General / Unreserved (UR)**: Standard notification age limits (e.g., 21-32 for UPSC, 18-30 for SSC CGL, 20-30 for Bank PO).
- **OBC (Non-Creamy Layer)**: **+3 Years** relaxation across Central Govt exams.
- **SC / ST**: **+5 Years** relaxation across all Central Govt exams.
- **PwBD (Persons with Benchmark Disabilities)**:
  - UR PwD: **+10 Years**
  - OBC PwD: **+13 Years**
  - SC/ST PwD: **+15 Years**
- **Ex-Servicemen (ESM)**: Actual military service rendered + 3 years deducted from actual age.
- **Central Govt Civilian Employees**: Up to 5 years relaxation for Group C posts (after 3 years continuous service).`;
  }

  if (q.includes('syllabus') || q.includes('overlap') || q.includes('study plan') || q.includes('routine') || q.includes('schedule') || q.includes('timetable')) {
    return `### 📚 Syllabus Synergy & Proven Daily Timetable

**The 70% Shared Core Curriculum** across UPSC CSAT, SSC CGL, Bank PO, and RRB:
1. **Quantitative Aptitude**: Arithmetic (Percentages, Profit/Loss, Ratio, Time & Work, Speed-Distance) + Algebra/Geometry for SSC.
2. **Logical Reasoning**: Syllogisms, Coding-Decoding, Blood Relations, Puzzles, Critical Reasoning.
3. **General English**: Reading Comprehension, Vocabulary, Sentence Improvement, Cloze Test.
4. **General Studies**: Indian Constitution (Polity), Modern Indian History, Physical & Indian Geography, Economy, General Science.

**Target 6-Hour Balanced Daily Schedule**:
- **07:00 AM - 08:30 AM**: Current Affairs & The Hindu editorial notes.
- **10:00 AM - 12:00 PM**: Core General Studies (e.g. Laxmikanth Polity).
- **03:00 PM - 04:30 PM**: Quantitative Aptitude speed drills.
- **05:00 PM - 06:00 PM**: Reasoning puzzles or English vocabulary.
- **08:30 PM - 09:30 PM**: Daily sectional mock quiz & revision of error notebook.`;
  }

  return `### 💡 Job Seeker AI Career Guide

I am your 24/7 assistant for Indian Government jobs and competitive examinations! Here is how I can help:

- **Check Eligibility**: Ask about your age limit, degree requirements, or category relaxations (OBC, SC/ST, EWS, PwD).
- **Exams Covered**: UPSC Civil Services, SSC CGL/CHSL, Banking (SBI/IBPS), Railways (RRB NTPC/Group D), Defense (CDS/AFCAT/NDA), and State PSCs.
- **Syllabus & Pattern**: Detailed breakdowns of Prelims, Mains, and Computer-Based Tests (CBT).
- **Preparation Guidance**: Subject synergies, booklists, daily study routines, and exam calendars.

*What examination or eligibility question can I answer for you today?*`;
}
