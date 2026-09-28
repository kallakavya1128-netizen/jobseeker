export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'kn';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' }
];

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Brand & Taglines
    appName: "Government Career Navigator",
    tagline: "Discover Every Government Career You Truly Qualify For",
    subtagline: "Enter your qualifications once. Get instant, 100% transparent eligibility evaluation for central and state recruitments with zero bureaucratic confusion.",
    
    // Navigation Tabs
    navOpportunities: "Exams & Jobs",
    navTracker: "My Applications",
    navSimulator: "Eligibility Checker",
    navPrep: "Study Roadmap",
    navJargon: "Exam Terms Explained",
    navProfile: "My Profile",

    // Quick Action Bar
    btnEditProfile: "Edit Profile",
    btnSwitchStudent: "Change Profile",
    btnMaskData: "Mask Sensitive Data",
    btnExportJSON: "Export Backup",
    activeStudent: "Active Profile",
    matchesFound: "Exams You Qualify For",
    ofTotal: "of",

    // Filters & Search
    searchPlaceholder: "Search exams by name, post or organization (e.g. UPSC, SSC, Banking, Police, ISRO)...",
    filterAll: "All Examinations",
    filterEligible: "100% Eligible For You",
    filterConditional: "Eligible With Conditions",
    filterSector: "All Sectors",
    sortMatch: "Sort: Best Match For You",
    sortDeadline: "Sort: Closing Date (Earliest First)",
    sortSalary: "Sort: Highest Salary First",
    sortVacancies: "Sort: Highest Vacancies First",

    // Card Details
    inHandSalary: "Monthly Salary (Approx)",
    vacancies: "Open Posts",
    lastDate: "Apply Deadline",
    applyNow: "Official Apply Link",
    viewDetails: "Check Requirements",
    saveToTracker: "Save to My List",
    savedInTracker: "Saved",
    
    // Status & Verdicts
    verdictEligible: "100% Eligible",
    verdictConditional: "Eligible with Conditions",
    verdictIneligible: "Currently Ineligible",
    
    // Fast Switcher Personas
    sampleProfiles: "Try Sample Student Profiles:",

    // Modal Titles & Sections
    profileModalTitle: "Set Up Your Career Profile",
    profileModalSubtitle: "Takes 2 minutes. Enter once to verify eligibility across all Indian recruitment boards.",
    tabPersonal: "1. Personal Details",
    tabEducation: "2. Education & Marks",
    tabEligibility: "3. Category & Certificates",

    // Personal Fields
    fullName: "Full Name (as in 10th marksheet)",
    dob: "Date of Birth",
    calculatedAge: "Your age on 01-Aug-2026",
    gender: "Gender",
    nationality: "Nationality",
    state: "State / UT (Domicile)",
    district: "District",
    preferredLocation: "Preferred Job Location",

    // Education Fields
    highestQual: "Highest Qualification",
    degreeName: "Degree / Course Name",
    branch: "Branch / Stream",
    streamCategory: "Broad Category",
    college: "College / University",
    gradStatus: "Graduation Status",
    gradYear: "Passing Year",
    gradScore: "Graduation Score (% or CGPA)",
    tenthMarks: "10th Percentage",
    twelfthMarks: "12th Percentage",
    diplomaCheck: "I have completed a Polytechnic Diploma",

    // Category Fields
    category: "Reservation Category",
    pwdCheck: "Person with Benchmark Disability (PwD)",
    experience: "Work Experience (Years)",
    nccCheck: "NCC Certificate Holder",
    drivingLicenseCheck: "Valid LMV Driving License",
    typingSpeed: "English Typing Speed (WPM)",

    // Buttons
    btnSaveProfile: "Save Profile & Refresh Matches",
    btnClose: "Close",
    btnNext: "Next Step",
    btnPrev: "Previous",

    // Easy Steps Workflow Banner
    step1Title: "1. Check Your Details",
    step1Desc: "Age, caste category, and degree",
    step2Title: "2. See Eligible Exams",
    step2Desc: "Clear pass/fail criteria",
    step3Title: "3. Track & Apply",
    step3Desc: "Never miss an official deadline"
  },

  hi: {
    appName: "गवर्नमेंट करियर नेविगेटर",
    tagline: "जानिए किन सरकारी नौकरियों और परीक्षाओं के लिए आप वास्तव में योग्य हैं",
    subtagline: "अपनी योग्यता एक बार दर्ज करें। बिना किसी उलझन के केंद्र और राज्य भर्ती परीक्षाओं के लिए अपनी वास्तविक पात्रता जानें।",
    
    navOpportunities: "सरकारी नौकरियां व परीक्षाएं",
    navTracker: "मेरी आवेदन सूची",
    navSimulator: "पात्रता कैलकुलेटर",
    navPrep: "तैयारी योजना",
    navJargon: "सरकारी शब्दों का सरल अर्थ",
    navProfile: "मेरी प्रोफाइल",

    btnEditProfile: "प्रोफाइल बदलें",
    btnSwitchStudent: "छात्र बदलें",
    btnMaskData: "व्यक्तिगत जानकारी छुपाएं",
    btnExportJSON: "डाउनलोड बैकअप",
    activeStudent: "सक्रिय छात्र प्रोफाइल",
    matchesFound: "योग्य परीक्षाएं",
    ofTotal: "कुल",

    searchPlaceholder: "परीक्षा का नाम या पद खोजें (जैसे UPSC, SSC, बैंक, पुलिस, ISRO)...",
    filterAll: "सभी परीक्षाएं",
    filterEligible: "100% योग्य परीक्षाएं",
    filterConditional: "शर्तों के साथ योग्य",
    filterSector: "सभी विभाग",
    sortMatch: "क्रम: आपके अनुसार सबसे उपयुक्त",
    sortDeadline: "क्रम: अंतिम तिथि (पहले समाप्त होने वाली)",
    sortSalary: "क्रम: अधिक वेतन पहले",
    sortVacancies: "क्रम: अधिक पद पहले",

    inHandSalary: "मासिक वेतन (लगभग)",
    vacancies: "कुल पद",
    lastDate: "अंतिम तिथि",
    applyNow: "आधिकारिक आवेदन लिंक",
    viewDetails: "पूरी जानकारी देखें",
    saveToTracker: "मेरी सूची में जोड़ें",
    savedInTracker: "सूची में जोड़ा गया",

    verdictEligible: "आप 100% योग्य हैं",
    verdictConditional: "शर्तों के साथ योग्य",
    verdictIneligible: "वर्तमान में योग्य नहीं",

    sampleProfiles: "उदाहरण प्रोफाइल चुनकर देखें:",

    profileModalTitle: "अपनी शैक्षिक प्रोफाइल सेट करें",
    profileModalSubtitle: "केवल 2 मिनट का समय लगेगा। एक बार भरें और सभी परीक्षाओं में अपनी पात्रता तुरंत जानें।",
    tabPersonal: "1. व्यक्तिगत विवरण",
    tabEducation: "2. शिक्षा और अंक",
    tabEligibility: "3. वर्ग और प्रमाणपत्र",

    fullName: "पूरा नाम (10वीं की अंकसूची अनुसार)",
    dob: "जन्म तिथि",
    calculatedAge: "01 अगस्त 2026 को आपकी आयु",
    gender: "लिंग",
    nationality: "नागरिकता",
    state: "गृह राज्य (मूल निवासी)",
    district: "जिला",
    preferredLocation: "नौकरी का पसंदीदा स्थान",

    highestQual: "उच्चतम योग्यता",
    degreeName: "डिग्री या कोर्स का नाम",
    branch: "शाखा / विषय",
    streamCategory: "शिक्षा का वर्ग",
    college: "कॉलेज / विश्वविद्यालय",
    gradStatus: "ग्रेजुएशन की स्थिति",
    gradYear: "उत्तीर्ण वर्ष",
    gradScore: "ग्रेजुएशन के अंक (% या CGPA)",
    tenthMarks: "10वीं के प्रतिशत",
    twelfthMarks: "12वीं के प्रतिशत",
    diplomaCheck: "मैंने पॉलिटेक्निक डिप्लोमा किया है",

    category: "आरक्षण वर्ग (Category)",
    pwdCheck: "दिव्यांगता स्थिति (PwD)",
    experience: "कार्य अनुभव (वर्ष)",
    nccCheck: "एनसीसी (NCC) प्रमाण पत्र धारक",
    drivingLicenseCheck: "वैध ड्राइविंग लाइसेंस (LMV)",
    typingSpeed: "अंग्रेजी टाइपिंग गति (शब्द प्रति मिनट)",

    btnSaveProfile: "प्रोफाइल सेव करें और परिणाम देखें",
    btnClose: "बंद करें",
    btnNext: "अगला कदम",
    btnPrev: "पिछला",

    step1Title: "1. अपनी योग्यता जांचें",
    step1Desc: "आयु, श्रेणी और डिग्री",
    step2Title: "2. योग्य नौकरियां देखें",
    step2Desc: "आसान भाषा में नियम",
    step3Title: "3. आवेदन ट्रैक करें",
    step3Desc: "अंतिम तारीख याद रखें"
  },

  te: {
    appName: "గవర్నమెంట్ కెరీర్ నావిగేటర్",
    tagline: "మీ విద్యార్హతలకు సరిపోయే ప్రభుత్వ ఉద్యోగాలను సులభంగా తెలుసుకోండి",
    subtagline: "మీ వివరాలను ఒక్కసారి నమోదు చేయండి. యూపీఎస్సీ, ఎస్సెస్సీ, బ్యాంకింగ్, రైల్వే ఉద్యోగాల అర్హతలను సరళమైన తెలుగులో పొందండి.",

    navOpportunities: "ఉద్యోగాలు & పరీక్షలు",
    navTracker: "నా దరఖాస్తులు",
    navSimulator: "అర్హత కాలిక్యులేటర్",
    navPrep: "ప్రిపరేషన్ గైడ్",
    navJargon: "పరీక్షల పదాల వివరణ",
    navProfile: "నా ప్రొఫైల్",

    btnEditProfile: "ప్రొఫైల్ మార్చు",
    btnSwitchStudent: "విద్యార్థిని మార్చు",
    btnMaskData: "వివరాలను దాచు (ప్రైవసీ)",
    btnExportJSON: "బ్యాకప్ డౌన్‌లోడ్",
    activeStudent: "ప్రస్తుత విద్యార్థి",
    matchesFound: "మీరు రాయగలిగే పరీక్షలు",
    ofTotal: "మొత్తంలో",

    searchPlaceholder: "పరీక్ష పేరు లేదా పోస్టును వెతకండి (ఉదా: UPSC, SSC, బ్యాంక్, పోలీస్, ISRO)...",
    filterAll: "అన్ని ఉద్యోగాలు",
    filterEligible: "100% పూర్తి అర్హత ఉన్నవి",
    filterConditional: "నిబంధనలతో అర్హత",
    filterSector: "అన్ని రంగాలు",
    sortMatch: "క్రమం: అత్యంత సరిపోయేవి",
    sortDeadline: "క్రమం: దరఖాస్తు ముగింపు తేదీ",
    sortSalary: "క్రమం: అధిక జీతం ముందు",
    sortVacancies: "క్రమం: ఎక్కువ పోస్టులు",

    inHandSalary: "నెలకు చేతికి అందే జీతం (సుమారు)",
    vacancies: "ఖాళీలు",
    lastDate: "చివరి తేదీ",
    applyNow: "అధికారిక అప్లికేషన్ లింక్",
    viewDetails: "పూర్తి వివరాలు చూడండి",
    saveToTracker: "నా లిస్టులో చేర్చు",
    savedInTracker: "చేర్చబడింది",

    verdictEligible: "మీరు 100% అర్హులు",
    verdictConditional: "షరతులతో అర్హత ఉంది",
    verdictIneligible: "ప్రస్తుతానికి అర్హత లేదు",

    sampleProfiles: "నమూనా ప్రొఫైల్‌ను ఎంచుకోండి:",

    profileModalTitle: "మీ విద్యార్హతల ప్రొఫైల్ నమోదు",
    profileModalSubtitle: "కేవలం 2 నిమిషాలు పడుతుంది. నమోదు చేసి అన్ని కేంద్ర, రాష్ట్ర ప్రభుత్వ ఉద్యోగాలకు మీ అర్హతలను తెలుసుకోండి.",
    tabPersonal: "1. వ్యక్తిగత వివరాలు",
    tabEducation: "2. చదువు & మార్కులు",
    tabEligibility: "3. కేటగిరీ & రిజర్వేషన్లు",

    fullName: "పూర్తి పేరు (10వ తరగతి సర్టిఫికేట్ ప్రకారం)",
    dob: "పుట్టిన తేదీ",
    calculatedAge: "01-ఆగస్టు-2026 నాటికి మీ వయస్సు",
    gender: "లింగం",
    nationality: "జాతీయత",
    state: "సొంత రాష్ట్రం",
    district: "జిల్లా",
    preferredLocation: "పని చేయాలనుకుంటున్న ప్రాంతం",

    highestQual: "అత్యున్నత విద్యార్హత",
    degreeName: "డిగ్రీ లేదా కోర్సు పేరు",
    branch: "సబ్జెక్ట్ / బ్రాంచ్",
    streamCategory: "విద్య విభాగం",
    college: "కళాశాల / విశ్వవిద్యాలయం",
    gradStatus: "డిగ్రీ పూర్తి స్థితి",
    gradYear: "ఉత్తీర్ణత సాధించిన సంవత్సరం",
    gradScore: "డిగ్రీ మార్కులు (% లేదా CGPA)",
    tenthMarks: "10వ తరగతి శాతం",
    twelfthMarks: "ఇంటర్మీడియట్ (12వ) శాతం",
    diplomaCheck: "నేను పాలిటెక్నిక్ డిప్లొమా పూర్తి చేశాను",

    category: "సామాజిక వర్గం / రిజర్వేషన్",
    pwdCheck: "దివ్యాంగులా (PwD)",
    experience: "పని అనుభవం (సంవత్సరాలలో)",
    nccCheck: "ఎన్‌సీసీ (NCC) సర్టిఫికేట్ ఉందా",
    drivingLicenseCheck: "డ్రైవింగ్ లైసెన్స్ (LMV) ఉందా",
    typingSpeed: "ఇంగ్లీష్ టైపింగ్ స్పీడ్ (WPM)",

    btnSaveProfile: "సేవ్ చేసి అర్హత గల ఉద్యోగాలు చూడండి",
    btnClose: "మూసివేయి",
    btnNext: "తదుపరి అడుగు",
    btnPrev: "వెనుకకు",

    step1Title: "1. వివరాలు నమోదు చేయండి",
    step1Desc: "వయస్సు, రిజర్వేషన్, చదువు",
    step2Title: "2. అర్హత గల పోస్టులు చూడండి",
    step2Desc: "సులభమైన తెలుగులో వివరణ",
    step3Title: "3. దరఖాస్తును ట్రాక్ చేయండి",
    step3Desc: "చివరి తేదీని మర్చిపోకండి"
  },

  ta: {
    appName: "கவர்ன்மென்ட் கேரியர் நேவிகேட்டர்",
    tagline: "நீங்கள் உண்மையில் தகுதியுடைய அரசு வேலைகளை எளிதாகக் கண்டறியுங்கள்",
    subtagline: "உங்கள் கல்வித் தகுதியை ஒரு முறை பதிவு செய்யுங்கள். மத்திய, மாநில அரசுத் தேர்வுகளின் தகுதி வரம்புகளைத் தமிழில் தெரிந்துகொள்ளுங்கள்.",

    navOpportunities: "அரசு தேர்வுகள் & வேலைகள்",
    navTracker: "என் விண்ணப்பங்கள்",
    navSimulator: "தகுதி கணக்கீடு",
    navPrep: "தேர்வு வழிகாட்டி",
    navJargon: "சொல் விளக்கம்",
    navProfile: "என் சுயவிவரம்",

    btnEditProfile: "சுயவிவரம் மாற்று",
    btnSwitchStudent: "மாணவர் மாற்று",
    btnMaskData: "தனிப்பட்ட விபரம் மறை",
    btnExportJSON: "காப்புப் பிரதி எடு",
    activeStudent: "செயலில் உள்ள மாணவர்",
    matchesFound: "நீங்கள் எழுதக்கூடிய தேர்வுகள்",
    ofTotal: "மொத்தத்தில்",

    searchPlaceholder: "தேர்வின் பெயர் அல்லது பதவியைத் தேடுங்கள் (UPSC, SSC, வங்கி, காவல்துறை)...",
    filterAll: "அனைத்துத் தேர்வுகள்",
    filterEligible: "100% முழு தகுதியுடையவை",
    filterConditional: "நிபந்தனையுடன் கூடிய தகுதி",
    filterSector: "அனைத்துத் துறைகள்",
    sortMatch: "வரிசை: சிறந்த பொருத்தம்",
    sortDeadline: "வரிசை: கடைசி நாள் முன்னுரிமை",
    sortSalary: "வரிசை: அதிக சம்பளம்",
    sortVacancies: "வரிசை: அதிக காலிப்பணியிடங்கள்",

    inHandSalary: "மாத சம்பளம் (சுமார்)",
    vacancies: "காலியிடங்கள்",
    lastDate: "கடைசி தேதி",
    applyNow: "அதிகாரப்பூர்வ விண்ணப்ப இணைப்பு",
    viewDetails: "முழு விவரம் பார்க்க",
    saveToTracker: "என் பட்டியலில் சேர்க்க",
    savedInTracker: "சேர்க்கப்பட்டது",

    verdictEligible: "நீங்கள் 100% தகுதியுடையவர்",
    verdictConditional: "நிபந்தனையுடன் தகுதி",
    verdictIneligible: "தற்போது தகுதி இல்லை",

    sampleProfiles: "மாதிரி மாணவர் சுயவிவரத்தைத் தேர்ந்தெடுக்கவும்:",

    profileModalTitle: "சுயவிவரப் பதிவு",
    profileModalSubtitle: "2 நிமிடங்கள் மட்டுமே ஆகும். எளிதாக உள்ளீடு செய்து அரசு வேலை வாய்ப்புகளைக் கண்டறியுங்கள்.",
    tabPersonal: "1. தனிப்பட்ட விவரங்கள்",
    tabEducation: "2. கல்வி மற்றும் மதிப்பெண்கள்",
    tabEligibility: "3. இடஒதுக்கீடு & சான்றிதழ்",

    fullName: "முழுப் பெயர் (10ஆம் வகுப்பு மதிப்பெண் சான்றிதழில் உள்ளபடி)",
    dob: "பிறந்த தேதி",
    calculatedAge: "01-ஆகஸ்ட்-2026 அன்று உங்கள் வயது",
    gender: "பாலினம்",
    nationality: "குடியுரிமை",
    state: "சொந்த மாநிலம்",
    district: "மாவட்டம்",
    preferredLocation: "பணிபுரிய விரும்பும் இடம்",

    highestQual: "உயர்கல்வி தகுதி",
    degreeName: "பட்டம் / பாடப்பிரிவு பெயர்",
    branch: "துறை / பாடம்",
    streamCategory: "கல்விப் பிரிவு",
    college: "கல்லூரி / பல்கலைக்கழகம்",
    gradStatus: "படிப்பு நிலை",
    gradYear: "தேர்ச்சி பெற்ற ஆண்டு",
    gradScore: "பட்டப்படிப்பு மதிப்பெண் (% அல்லது CGPA)",
    tenthMarks: "10ஆம் வகுப்பு சதவீதம்",
    twelfthMarks: "12ஆம் வகுப்பு சதவீதம்",
    diplomaCheck: "நான் பாலிடெக்னிக் டிப்ளமோ முடித்துள்ளேன்",

    category: "இடஒதுக்கீட்டுப் பிரிவு",
    pwdCheck: "மாற்றுத்திறனாளியா (PwD)",
    experience: "பணி அனுபவம் (ஆண்டுகள்)",
    nccCheck: "என்சிசி (NCC) சான்றிதழ் உள்ளதா",
    drivingLicenseCheck: "ஓட்டுநர் உரிமம் (LMV) உள்ளதா",
    typingSpeed: "ஆங்கில தட்டச்சு வேகம் (WPM)",

    btnSaveProfile: "சேமித்து தகுதியான தேர்வுகளைக் காண்க",
    btnClose: "மூடு",
    btnNext: "அடுத்த படி",
    btnPrev: "முந்தைய படி",

    step1Title: "1. தகவல்களைப் பதியுங்கள்",
    step1Desc: "வயது, பிரிவு மற்றும் படிப்பு",
    step2Title: "2. தகுதியான தேர்வுகளைக் காண்க",
    step2Desc: "எளிமையான தமிழில் விதிகள்",
    step3Title: "3. விண்ணப்பத்தைக் கண்காணிக்கவும்",
    step3Desc: "கடைசி தேதியை மறக்காதீர்கள்"
  },

  kn: {
    appName: "ಸರ್ಕಾರಿ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶಿ (Government Career Navigator)",
    tagline: "ನಿಮ್ಮ ವಿದ್ಯಾರ್ಹತೆಗೆ ತಕ್ಕ ಸರ್ಕಾರಿ ಉದ್ಯೋಗಗಳನ್ನು ಸುಲಭವಾಗಿ ಕಂಡುಕೊಳ್ಳಿ",
    subtagline: "ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಒಮ್ಮೆ ನಮೂದಿಸಿ. ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರಿ ಪರೀಕ್ಷೆಗಳ ಅರ್ಹತೆಗಳನ್ನು ಗೊಂದಲವಿಲ್ಲದೆ ಕನ್ನಡದಲ್ಲಿ ತಿಳಿಯಿರಿ.",

    navOpportunities: "ಉದ್ಯೋಗಗಳು & ಪರೀಕ್ಷೆಗಳು",
    navTracker: "ನನ್ನ ಅರ್ಜಿಗಳ ಪಟ್ಟಿ",
    navSimulator: "ಅರ್ಹತೆ ಪರಿಶೀಲಕ",
    navPrep: "ಅಧ್ಯಯನ ಮಾರ್ಗ",
    navJargon: "ಪರೀಕ್ಷಾ ಪದಗಳ ವಿವರಣೆ",
    navProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್",

    btnEditProfile: "ಪ್ರೊಫೈಲ್ ಬದಲಾಯಿಸಿ",
    btnSwitchStudent: "ವಿದ್ಯಾರ್ಥಿ ಬದಲಾಯಿಸಿ",
    btnMaskData: "ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ (ಗೌಪ್ಯತೆ)",
    btnExportJSON: "ಬ್ಯಾಕಪ್ ಡೌನ್‌ಲೋಡ್",
    activeStudent: "ಪ್ರಸ್ತುತ ವಿದ್ಯಾರ್ಥಿ",
    matchesFound: "ನೀವು ಬರೆಯಬಹುದಾದ ಪರೀಕ್ಷೆಗಳು",
    ofTotal: "ಒಟ್ಟು ಪರೀಕ್ಷೆಗಳಲ್ಲಿ",

    searchPlaceholder: "ಪರೀಕ್ಷೆಯ ಹೆಸರು ಅಥವಾ ಹುದ್ದೆಯನ್ನು ಹುಡುಕಿ (UPSC, SSC, ಬ್ಯಾಂಕಿಂಗ್, ಪೊಲೀಸ್)...",
    filterAll: "ಎಲ್ಲಾ ಪರೀಕ್ಷೆಗಳು",
    filterEligible: "100% ಪೂರ್ಣ ಅರ್ಹತೆ ಹೊಂದಿರುವವು",
    filterConditional: "ಷರತ್ತುಗಳೊಂದಿಗೆ ಅರ್ಹತೆ",
    filterSector: "ಎಲ್ಲಾ ವಲಯಗಳು",
    sortMatch: "ಕ್ರಮ: ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ",
    sortDeadline: "ಕ್ರಮ: ಅಂತಿಮ ದಿನಾಂಕ ಮೊದಲು",
    sortSalary: "ಕ್ರಮ: ಅಧಿಕ ವೇತನ ಮೊದಲು",
    sortVacancies: "ಕ್ರಮ: ಅಧಿಕ ಹುದ್ದೆಗಳು",

    inHandSalary: "ತಿಂಗಳ ಸಂಬಳ (ಅಂದಾಜು)",
    vacancies: "ಖಾಲಿ ಹುದ್ದೆಗಳು",
    lastDate: "ಕೊನೆಯ ದಿನಾಂಕ",
    applyNow: "ಅಧಿಕೃತ ಅರ್ಜಿ ಲಿಂಕ್",
    viewDetails: "ವಿವರಗಳನ್ನು ನೋಡಿ",
    saveToTracker: "ನನ್ನ ಪಟ್ಟಿಗೆ ಸೇರಿಸಿ",
    savedInTracker: "ಸೇರಿಸಲಾಗಿದೆ",

    verdictEligible: "ನೀವು 100% ಅರ್ಹರಾಗಿದ್ದೀರಿ",
    verdictConditional: "ಷರತ್ತುಗಳೊಂದಿಗೆ ಅರ್ಹತೆ ಇದೆ",
    verdictIneligible: "ಪ್ರಸ್ತುತ ಅರ್ಹತೆ ಇಲ್ಲ",

    sampleProfiles: "ಮಾದರಿ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ:",

    profileModalTitle: "ನಿಮ್ಮ ವಿದ್ಯಾರ್ಹತೆ ಪ್ರೊಫೈಲ್ ನೋಂದಣಿ",
    profileModalSubtitle: "ಕೇವಲ 2 ನಿಮಿಷ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ. ಒಮ್ಮೆ ಭರ್ತಿ ಮಾಡಿ ಎಲ್ಲಾ ಪರೀಕ್ಷೆಗಳ ಅರ್ಹತೆಯನ್ನು ತಿಳಿಯಿರಿ.",
    tabPersonal: "1. ವೈಯಕ್ತಿಕ ವಿವರಗಳು",
    tabEducation: "2. ಶಿಕ್ಷಣ ಮತ್ತು ಅಂಕಗಳು",
    tabEligibility: "3. ಮೀಸಲಾತಿ ಮತ್ತು ವರ್ಗ",

    fullName: "ಪೂರ್ಣ ಹೆಸರು (10ನೇ ತರಗತಿ ಅಂಕಪಟ್ಟಿಯಂತೆ)",
    dob: "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
    calculatedAge: "01-ಆಗಸ್ಟ್-2026 ಕ್ಕೆ ನಿಮ್ಮ ವಯಸ್ಸು",
    gender: "ಲಿಂಗ",
    nationality: "ರಾಷ್ಟ್ರೀಯತೆ",
    state: "ಸ್ವಂತ ರಾಜ್ಯ",
    district: "ಜಿಲ್ಲೆ",
    preferredLocation: "ಕೆಲಸ ಮಾಡಲು ಇಷ್ಟಪಡುವ ಸ್ಥಳ",

    highestQual: "ಅತ್ಯುನ್ನತ ವಿದ್ಯಾರ್ಹತೆ",
    degreeName: "ಪದವಿ ಅಥವಾ ಕೋರ್ಸ್ ಹೆಸರು",
    branch: "ವಿಭಾಗ / ಬ್ರಾಂಚ್",
    streamCategory: "ಶಿಕ್ಷಣ ವಿಭಾಗ",
    college: "ಕಾಲೇಜು / ವಿಶ್ವವಿದ್ಯಾಲಯ",
    gradStatus: "ಪದವಿ ಪೂರ್ಣತೆಯ ಸ್ಥಿತಿ",
    gradYear: "ತೇರ್ಗಡೆಯಾದ ವರ್ಷ",
    gradScore: "ಪದವಿ ಅಂಕಗಳು (% ಅಥವಾ CGPA)",
    tenthMarks: "10ನೇ ತರಗತಿ ಶೇಕಡಾವಾರು",
    twelfthMarks: "12ನೇ / ಪಿಯುಸಿ ಶೇಕಡಾವಾರು",
    diplomaCheck: "ನಾನು ಪಾಲಿಟೆಕ್ನಿಕ್ ಡಿಪ್ಲೊಮಾ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೇನೆ",

    category: "ಮೀಸಲಾತಿ ವರ್ಗ (Category)",
    pwdCheck: "ಅಂಗವಿಕಲತೆ ಸ್ಥಿತಿ (PwD)",
    experience: "ಕೆಲಸದ ಅನುಭವ (ವರ್ಷಗಳಲ್ಲಿ)",
    nccCheck: "ಎನ್‌ಸಿಸಿ (NCC) ಪ್ರಮಾಣಪತ್ರ ಹೊಂದಿದ್ದೀರಾ",
    drivingLicenseCheck: "ಚಾಲನಾ ಪರವಾನಗಿ (LMV) ಹೊಂದಿದ್ದೀರಾ",
    typingSpeed: "ಇಂಗ್ಲಿಷ್ ಟೈಪಿಂಗ್ ವೇಗ (WPM)",

    btnSaveProfile: "ಉಳಿಸಿ ಮತ್ತು ಅರ್ಹ ಪರೀಕ್ಷೆಗಳನ್ನು ನೋಡಿ",
    btnClose: "ಮುಚ್ಚಿ",
    btnNext: "ಮುಂದಿನ ಹಂತ",
    btnPrev: "ಹಿಂದಿನ ಹಂತ",

    step1Title: "1. ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    step1Desc: "ವಯಸ್ಸು, ವರ್ಗ ಮತ್ತು ಪದವಿ",
    step2Title: "2. ಅರ್ಹ ಉದ್ಯೋಗಗಳನ್ನು ನೋಡಿ",
    step2Desc: "ಸರಳ ಕನ್ನಡದಲ್ಲಿ ನಿಯಮಗಳು",
    step3Title: "3. ಅರ್ಜಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    step3Desc: "ಕೊನೆಯ ದಿನಾಂಕ ಮರೆಯಬೇಡಿ"
  }
};

export function getTranslation(lang: SupportedLanguage, key: string): string {
  if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
    return TRANSLATIONS[lang][key];
  }
  return TRANSLATIONS['en'][key] || key;
}
