import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Built-in intelligent knowledge base fallback for Indian Gov Exams
function getExamFallbackAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('upsc') || q.includes('ias') || q.includes('ips') || q.includes('civil service')) {
    return `### 🏛️ UPSC Civil Services Examination (CSE) 2026 Overview\n\n` +
      `- **Eligibility**: Any graduate (Bachelor's degree from recognized university). Final-year students are eligible.\n` +
      `- **Age Limits**: 21 to 32 years (General). Relaxations: +3 years for OBC (up to 35), +5 years for SC/ST (up to 37), +10 years for PwD.\n` +
      `- **Number of Attempts**: General: 6 attempts, OBC: 9 attempts, SC/ST: Unlimited (up to age limit).\n` +
      `- **Selection Stages**:\n` +
      `  1. **Prelims**: GS Paper 1 (Cutoff based) + CSAT Paper 2 (Qualifying 33%).\n` +
      `  2. **Mains**: 9 Descriptive Written Papers (7 counted for merit = 1750 marks).\n` +
      `  3. **Interview**: Personality Test at Dholpur House, New Delhi (275 marks).\n` +
      `- **Upcoming Cycle**: Tentative Prelims scheduled for **May 2026**.\n\n` +
      `*Tip: Start with NCERTs (Class 6-12) for History & Geography, followed by standard texts like Laxmikanth for Indian Polity.*`;
  }

  if (q.includes('ssc') || q.includes('cgl') || q.includes('chsl') || q.includes('inspector')) {
    return `### ⚡ Staff Selection Commission (SSC) Examination Guide\n\n` +
      `- **SSC CGL (Combined Graduate Level)**: For Group B & C posts (Inspector of Income Tax, GST Inspector, Assistant Section Officer, Auditor).\n` +
      `  - **Eligibility**: Bachelor's Degree in any discipline. Age: 18-30/32 years (category relaxations apply).\n` +
      `  - **Exam Pattern**: Tier 1 (CBT screening: Reasoning, Quant, English, GA) + Tier 2 (Merit ranking + Typing test).\n` +
      `- **SSC CHSL (10+2 Level)**: For LDC, Junior Secretariat Assistant (JSA), and Data Entry Operators.\n` +
      `  - **Eligibility**: Passed 12th standard. Age: 18-27 years.\n` +
      `- **Key Preparation Strategy**: 70% of SSC syllabus overlaps with Banking and State PSCs. Master Quantitative Aptitude speed shortcuts and daily current affairs!`;
  }

  if (q.includes('bank') || q.includes('ibps') || q.includes('sbi') || q.includes('po') || q.includes('clerk') || q.includes('rbi')) {
    return `### 🏦 Banking & Financial Sector Careers (IBPS & SBI)\n\n` +
      `- **Major Exams**: SBI PO, SBI Clerk, IBPS PO, IBPS Clerk, RRB Officer Scale-I, and RBI Grade B.\n` +
      `- **Eligibility**: Any Bachelor's degree (RBI Grade B requires minimum 60% graduation marks; IBPS PO accepts any passing score).\n` +
      `- **Age Limit**: 20 to 30 years for PO, 20 to 28 years for Clerk (Relaxations: OBC +3 yrs, SC/ST +5 yrs).\n` +
      `- **Pattern**: Prelims (Speed test: 100 questions in 60 mins) ➔ Mains (Deep reasoning, Data Analysis, Banking Awareness) ➔ Interview (for PO/Grade B).\n` +
      `- **High-Yield Tip**: Focus on sectional speed tests in Data Interpretation and Puzzles. Accuracy is paramount due to 0.25 negative marking.`;
  }

  if (q.includes('railway') || q.includes('rrb') || q.includes('ntpc') || q.includes('group d') || q.includes('alp')) {
    return `### 🚆 Railway Recruitment Board (RRB) Examinations\n\n` +
      `- **RRB NTPC (Non-Technical Popular Categories)**: Station Master, Goods Guard, Senior Clerk, Commercial Apprentice.\n` +
      `  - **Eligibility**: Graduate posts (18-33/36 yrs with COVID extension) & Undergraduate 12th posts (18-30 yrs).\n` +
      `- **RRB ALP (Assistant Loco Pilot) & Technicians**: Requires ITI/Diploma/B.Tech in relevant engineering trades.\n` +
      `- **No Interview**: Selection is purely based on CBT 1, CBT 2, and Computer Based Aptitude Test (CBAT) for Station Master / ALP.`;
  }

  if (q.includes('defense') || q.includes('defence') || q.includes('cds') || q.includes('afcat') || q.includes('nda')) {
    return `### 🎖️ Indian Armed Forces Examinations (CDS / AFCAT / NDA)\n\n` +
      `- **NDA (National Defence Academy)**: For 12th class students (Age 16.5 - 19.5 years). Entry into Army, Navy, Air Force.\n` +
      `- **CDS (Combined Defence Services)**: For Graduates. IMA/OTA/AFA/INA. Age: 19-24 (OTA up to 25).\n` +
      `- **AFCAT (Air Force Common Admission Test)**: Flying & Ground Duty Branches (Technical & Non-Technical).\n` +
      `- **SSB Interview**: 5-day comprehensive testing covering Psychology tests, Group Testing Officer (GTO) tasks, and personal interview.`;
  }

  if (q.includes('age') || q.includes('limit') || q.includes('relaxation') || q.includes('cutoff')) {
    return `### 📅 Government Exam Age Limit & Category Relaxations\n\n` +
      `Across Central Government Examinations (UPSC, SSC, Railways, Banking):\n` +
      `- **General / Unreserved**: Standard base age limits (typically 21-32 for UPSC, 18-30 for SSC CGL, 20-30 for Bank PO).\n` +
      `- **OBC (Non-Creamy Layer)**: **+3 Years** age relaxation above general max limit.\n` +
      `- **SC / ST**: **+5 Years** age relaxation above general max limit.\n` +
      `- **Persons with Disabilities (PwD)**: **+10 Years** (OBC PwD: +13 yrs, SC/ST PwD: +15 yrs).\n` +
      `- **Ex-Servicemen**: Deduct military service from actual age + 3 years.\n\n` +
      `*Use our Eligibility Simulator tab to see the exact cutoff date matches for your date of birth!*`;
  }

  if (q.includes('final year') || q.includes('college') || q.includes('appearing') || q.includes('degree')) {
    return `### 🎓 Final-Year College Student Eligibility Rules\n\n` +
      `- **UPSC CSE**: Yes! Final year students can appear for the Preliminary examination. Proof of passing graduation must be submitted during Mains (DAF-I).\n` +
      `- **SSC CGL**: You are eligible provided your degree result is declared before the crucial cutoff date specified in the official notification (usually August/September).\n` +
      `- **Banking (IBPS/SBI)**: Result must be officially declared on or before the application registration deadline.\n` +
      `- **CDS & AFCAT**: Final year students without active backlogs can apply for the upcoming training academy course.`;
  }

  if (q.includes('syllabus') || q.includes('overlap') || q.includes('study plan') || q.includes('routine') || q.includes('strategy')) {
    return `### 📚 Syllabus Synergy & Daily Study Plan\n\n` +
      `**The 70% Overlap Rule**:\n` +
      `- Quantitative Aptitude, Logical Reasoning, and English Comprehension are common across SSC, Banking, Railways, and UPSC CSAT.\n` +
      `- General Awareness (Polity, Modern History, Geography, Economy, Current Affairs) covers SSC Tier 1/2, RRB CBT 1/2, and State PSCs.\n\n` +
      `**Recommended Daily Routine (6 Hours Target)**:\n` +
      `1. **Morning (07:00 - 09:00 AM)**: Current Affairs analysis & The Hindu/Indian Express editorial reading.\n` +
      `2. **Noon (11:00 AM - 01:00 PM)**: Core General Studies (e.g. Indian Constitution / Modern History).\n` +
      `3. **Evening (04:00 - 05:30 PM)**: Speed drills in Quantitative Aptitude / Reasoning.\n` +
      `4. **Night (08:30 - 09:30 PM)**: Mock test sectional practice and error notebook revision.`;
  }

  return `### 💡 Job Seeker AI Guidance\n\n` +
    `I can help you navigate Indian Government examinations, notifications, and career roadmaps! Here is what I can assist with:\n\n` +
    `1. **Eligibility & Age Rules**: Check your category relaxations (OBC, SC/ST, EWS, PwD) and educational qualification requirements.\n` +
    `2. **Syllabus & Pattern**: Detailed breakdowns of Prelims, Mains, and Computer-Based Tests for UPSC, SSC, Banking, Railways, and Defense.\n` +
    `3. **Exam Synergy**: Learn how studying for one exam (like SSC CGL) automatically prepares you for RRB NTPC and State PSCs.\n` +
    `4. **Daily Study Planner**: Get a customized daily schedule tailored to your tracked exams.\n\n` +
    `Feel free to ask a specific question like *"Am I eligible for SSC CGL in final year?"* or *"What is the syllabus overlap between UPSC and State PSC?"*!`;
}

async function startServer() {
  const app = express();

  // CORS middleware for iframe, preview and widget requests
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Instance-Id');
    if (_req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Chat API route supporting GET & POST (n8n widget format, query params, and standard JSON)
  app.all('/api/chat', async (req, res) => {
    try {
      res.setHeader('Content-Type', 'application/json');

      const userMessage =
        req.body?.chatInput ||
        req.query?.chatInput ||
        req.body?.message ||
        req.query?.message ||
        req.body?.prompt ||
        req.query?.prompt ||
        req.body?.text ||
        req.query?.text ||
        req.query?.q ||
        '';

      const sessionId =
        req.body?.sessionId ||
        req.query?.sessionId ||
        req.body?.chatSessionId ||
        req.query?.chatSessionId ||
        'session_' + Date.now();

      const trimmedMessage = typeof userMessage === 'string' ? userMessage.trim() : '';

      if (!trimmedMessage) {
        return res.json({
          output: "Please enter a question about government examinations, eligibility, or syllabus!",
          text: "Please enter a question about government examinations, eligibility, or syllabus!",
          message: "Please enter a question about government examinations, eligibility, or syllabus!",
          sessionId: sessionId,
        });
      }

      // Check if external n8n webhook is specified and user requested to attempt it
      const webhookUrl = req.body?.webhookUrl || req.query?.webhookUrl;
      if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.startsWith('http')) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);

          const n8nRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(req.body?.headers || {}),
            },
            body: JSON.stringify({
              action: req.body?.action || req.query?.action || 'sendMessage',
              chatInput: trimmedMessage,
              sessionId: sessionId,
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (n8nRes.ok) {
            const data = await n8nRes.json();
            const reply = data.output || data.text || data.message;
            if (reply) {
              return res.json({
                output: reply,
                text: reply,
                message: reply,
                source: 'n8n',
                sessionId: sessionId,
              });
            }
          }
        } catch (n8nErr) {
          // n8n failed or errored out; smoothly fall through to Gemini / AI knowledge engine
        }
      }

      // If Gemini AI client is configured, generate high-fidelity response
      if (ai) {
        try {
          const systemInstruction = `You are 'Job Seeker AI', the specialized intelligent advisor for Government Career Navigator — India's premier portal for competitive examinations and public sector careers.
You provide accurate, encouraging, highly structured guidance to Indian job seekers and students.
You have comprehensive knowledge of:
1. UPSC Examinations (CSE, CDS, NDA, CAPF, ESE, EPFO).
2. Staff Selection Commission (SSC CGL, CHSL, CPO, MTS, GD Constable).
3. Banking & Financial Sector (IBPS PO/Clerk, SBI PO/Clerk, RRB Scale I/II, RBI Grade B, SEBI Grade A, NABARD).
4. Indian Railways (RRB NTPC, Group D, ALP, JE).
5. State PSCs (APPSC, TSPSC, UPPSC, BPSC, MPSC, TNPSC, KPSC, etc.).
6. Defense Services (Army, Navy, Air Force through NDA, CDS, AFCAT, Agniveer).
7. Eligibility criteria: Age limits, crucial cutoff dates, Category relaxations (OBC 3 yrs, SC/ST 5 yrs, PwD 10 yrs, Ex-Servicemen), Degree vs Final-Year appearing rules.
8. Syllabus overlap (the 70% shared syllabus across Quant, Reasoning, English, General Studies).
9. High-yield daily study routines and mock test strategies.

Formatting rules:
- Use clean Markdown with headers (###), bold key terms, and bullet points.
- Keep answers concise, authoritative, and actionable.
- End with a motivating or clarifying next-step tip.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: trimmedMessage,
            config: {
              systemInstruction,
              temperature: 0.6,
            },
          });

          const replyText = response.text || getExamFallbackAnswer(trimmedMessage);

          return res.json({
            output: replyText,
            text: replyText,
            message: replyText,
            source: 'gemini',
            sessionId: sessionId,
          });
        } catch (geminiError) {
          console.warn('Gemini API call failed, using intelligent exam knowledge engine:', geminiError);
        }
      }

      // Intelligent knowledge engine fallback
      const fallbackReply = getExamFallbackAnswer(trimmedMessage);
      return res.json({
        output: fallbackReply,
        text: fallbackReply,
        message: fallbackReply,
        source: 'knowledge_engine',
        sessionId: sessionId,
      });
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      return res.status(200).json({
        output: "I am ready to assist with all your government exam queries! Please ask about exam eligibility, syllabus, or preparation strategies.",
        text: "I am ready to assist with all your government exam queries! Please ask about exam eligibility, syllabus, or preparation strategies.",
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(apiKey),
      timestamp: new Date().toISOString(),
    });
  });

  // Setup Vite in middleware mode for dev, or serve static dist in production
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
