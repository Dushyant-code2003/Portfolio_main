export interface ProjectStory {
  problem: string;
  idea: string;
  build: string;
  challenge: string;
  solution: string;
  result: string;
  lesson: string;
}

export interface Project {
  id: string;
  experimentNumber: string;
  title: string;
  subtitle: string;
  status: "COMPLETE" | "ACTIVE" | "ARCHIVED";
  tech: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  /** Set when deployed. Omit or leave empty until live URL exists. */
  liveUrl?: string;
  story: ProjectStory;
  domain: "AI" | "WEB" | "SYSTEMS" | "MOBILE";
}

const defaultStory = (
  problem: string,
  idea: string,
  build: string,
  result: string
): ProjectStory => ({
  problem,
  idea,
  build,
  challenge: "Balancing feature scope with clean architecture under time constraints.",
  solution: "Iterative development with focused milestones and continuous testing.",
  result,
  lesson: "Shipping working software beats perfect plans every time.",
});

export const projects: Project[] = [
  {
    id: "smart-quiz",
    experimentNumber: "01",
    title: "SMART QUIZ",
    subtitle: "Offline Desktop Quiz Management",
    status: "COMPLETE",
    tech: ["Java", "JavaFX", "MySQL", "Maven", "CSS"],
    metrics: [
      { label: "MODEL", value: "Desktop CRUD" },
      { label: "ACCURACY", value: "Proctored Sessions" },
      { label: "TECHNOLOGY", value: "JavaFX + MySQL" },
      { label: "RESULT", value: "Full Instructor Suite" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/Smart-Quiz",
    domain: "SYSTEMS",
    story: {
      problem:
        "Instructors needed an offline quiz system with proctoring, performance tracking, and secure local data — without relying on cloud infrastructure.",
      idea:
        "Build a self-contained JavaFX desktop app with MySQL backend, tab-switch detection, and exportable student analytics.",
      build:
        "JavaFX UI with Maven, MySQL schema for quizzes and students, CSS styling, CRUD workflows, and authentication layers.",
      challenge:
        "Balancing real-time proctoring signals with smooth offline performance on varied classroom hardware.",
      solution:
        "Local image hosting, lightweight event listeners for tab-switch tracking, and optimized query patterns for fast retrieval.",
      result:
        "A complete offline quiz management system with proctoring, performance exports, and instructor dashboards.",
      lesson:
        "Desktop software still matters when reliability and data ownership beat convenience.",
    },
  },
  {
    id: "agrisathi",
    experimentNumber: "02",
    title: "AGRISATHI AI",
    subtitle: "Crop Disease Diagnosis Platform",
    status: "COMPLETE",
    tech: ["Python", "FastAPI", "QLoRA", "FAISS", "JavaScript"],
    metrics: [
      { label: "MODEL", value: "RAG + QLoRA" },
      { label: "ACCURACY", value: "FAISS Retrieval" },
      { label: "TECHNOLOGY", value: "FastAPI Pipeline" },
      { label: "RESULT", value: "Mandi Price Integration" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/AgriSathi-AI",
    liveUrl: "https://agrisathi-ai-alpha.vercel.app",
    domain: "AI",
    story: {
      problem:
        "Farmers lack accessible, localized crop disease diagnosis and real-time market price intelligence in one platform.",
      idea:
        "Combine document ETL, FAISS-based RAG for disease diagnosis, and automated Agmarknet Mandi price integration.",
      build:
        "Python FastAPI backend, QLoRA fine-tuning pipeline, FAISS vector store, and a responsive web frontend.",
      challenge:
        "Ingesting heterogeneous agricultural documents while keeping retrieval fast and diagnoses explainable.",
      solution:
        "Automated ETL ingestion pipeline with chunked embeddings and structured API responses for diagnosis + pricing.",
      result:
        "An AI platform that diagnoses crop diseases and surfaces government Mandi prices in a single workflow.",
      lesson:
        "AI products succeed when retrieval quality and domain data pipelines are treated as first-class engineering.",
    },
  },
  {
    id: "moviemate",
    experimentNumber: "03",
    title: "MOVIEMATE",
    subtitle: "AI Movie Discovery Platform",
    status: "COMPLETE",
    tech: ["Python", "JavaScript", "Scikit-learn", "LLM API", "TMDb API"],
    metrics: [
      { label: "MODEL", value: "ML Filtering" },
      { label: "ACCURACY", value: "4,800+ Titles" },
      { label: "TECHNOLOGY", value: "Full-Stack AI" },
      { label: "RESULT", value: "LLM Chatbot + Trailers" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/Movie-Recommendation-Website",
    liveUrl: "https://moviemate-7ul1.onrender.com/index.html",
    domain: "WEB",
    story: {
      problem:
        "Movie discovery is overwhelming — users need intelligent filtering, conversational recommendations, and rich media previews.",
      idea:
        "Build a full-stack platform with ML content filtering, OpenRouter LLM chatbot, HD poster caching, and YouTube trailer streaming.",
      build:
        "Python backend, JavaScript frontend, Scikit-learn preference engine, TMDb REST integration, and LLM-powered chat.",
      challenge:
        "Keeping recommendation latency low while serving posters, trailers, and conversational responses simultaneously.",
      solution:
        "Cached poster assets, pre-computed similarity matrices, and async API orchestration for chat and media.",
      result:
        "A platform covering 4,800+ movies with ML filtering, LLM chat, and seamless trailer playback.",
      lesson:
        "Recommendation systems feel magical when the UX hides the complexity behind instant, visual feedback.",
    },
  },
  {
    id: "budgetbuddy",
    experimentNumber: "04",
    title: "BUDGETBUDDY",
    subtitle: "Android Expense Tracker",
    status: "COMPLETE",
    tech: ["Android Studio", "Java", "Firebase", "Firestore"],
    metrics: [
      { label: "MODEL", value: "Mobile CRUD" },
      { label: "ACCURACY", value: "Realtime Sync" },
      { label: "TECHNOLOGY", value: "Firebase Auth" },
      { label: "RESULT", value: "Expense Dashboard" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/Budget-Buddy",
    domain: "MOBILE",
    story: {
      problem:
        "Personal finance tracking on mobile needs secure auth, realtime sync, and intuitive categorization.",
      idea:
        "Android app with Firebase authentication, Firestore persistence, and category-based expense visualization.",
      build:
        "Java Android app with XML layouts, Firebase Auth, Firestore realtime listeners, and expense CRUD flows.",
      challenge:
        "Maintaining sync consistency across devices with minimal battery and network overhead.",
      solution:
        "Firestore snapshot listeners with optimistic UI updates and offline-capable caching.",
      result:
        "A polished expense tracker with secure login and realtime budget monitoring.",
      lesson:
        "Mobile UX wins when every tap feels instant, even when the network doesn't.",
    },
  },
  {
    id: "gesture-racing",
    experimentNumber: "05",
    title: "GESTURE RACING",
    subtitle: "Hill Climb Racing via Computer Vision",
    status: "COMPLETE",
    tech: ["Python", "OpenCV", "MediaPipe", "Game Dev"],
    metrics: [
      { label: "MODEL", value: "Gesture Control" },
      { label: "ACCURACY", value: "Real-time CV" },
      { label: "TECHNOLOGY", value: "OpenCV + Python" },
      { label: "RESULT", value: "Hands-free Gaming" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/Gesture-Based-Hill-Climb-Racing-Gaming",
    domain: "AI",
    story: defaultStory(
      "Traditional keyboard controls limit immersive gaming experiences.",
      "Use hand gestures via computer vision to accelerate, brake, and balance a Hill Climb Racing vehicle.",
      "Python game loop with OpenCV hand tracking and gesture-to-action mapping.",
      "An interactive racing game controlled entirely by real-time hand gestures."
    ),
  },
  {
    id: "course-management",
    experimentNumber: "06",
    title: "COURSE MANAGEMENT",
    subtitle: "Academic Records & Attendance System",
    status: "COMPLETE",
    tech: ["JavaScript", "Node.js", "CRUD", "REST APIs"],
    metrics: [
      { label: "MODEL", value: "Admin CRUD" },
      { label: "ACCURACY", value: "Attendance Tracking" },
      { label: "TECHNOLOGY", value: "Full-Stack JS" },
      { label: "RESULT", value: "Academic Dashboard" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/Course-Management-System",
    domain: "WEB",
    story: defaultStory(
      "Universities need a centralized system to manage students, courses, attendance, and academic records.",
      "Build a course management platform with role-based workflows for admins and instructors.",
      "JavaScript full-stack app with student enrollment, course allocation, and attendance modules.",
      "An efficient system to manage students, courses, attendance, and academic records."
    ),
  },
  {
    id: "digital-you",
    experimentNumber: "07",
    title: "DIGITAL YOU",
    subtitle: "Personal Digital Identity Experiment",
    status: "ACTIVE",
    tech: ["Web", "UI/UX", "Frontend"],
    metrics: [
      { label: "MODEL", value: "Identity Web" },
      { label: "ACCURACY", value: "Personal Brand" },
      { label: "TECHNOLOGY", value: "Modern Frontend" },
      { label: "RESULT", value: "Digital Presence" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/Digital-You",
    domain: "WEB",
    story: defaultStory(
      "Developers need a distinctive online identity beyond a traditional resume.",
      "Create a digital presence experiment exploring personal branding through interactive web design.",
      "Frontend-focused build exploring layout, typography, and personal storytelling on the web.",
      "A personal digital identity project showcasing creative web development."
    ),
  },
  {
    id: "fe-internship",
    experimentNumber: "08",
    title: "FE INTERNSHIP",
    subtitle: "Frontend Engineering — May 2026",
    status: "ACTIVE",
    tech: ["React", "TypeScript", "Frontend"],
    metrics: [
      { label: "MODEL", value: "Internship" },
      { label: "ACCURACY", value: "Production UI" },
      { label: "TECHNOLOGY", value: "Modern Frontend" },
      { label: "RESULT", value: "Industry Experience" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/fe-internship-may-26",
    domain: "WEB",
    story: defaultStory(
      "Frontend engineering in production requires component discipline, performance awareness, and design fidelity.",
      "Apply internship learnings through structured frontend exercises and real-world UI patterns.",
      "React and TypeScript codebase following industry conventions for component architecture and state management.",
      "Hands-on frontend engineering work from a structured internship program."
    ),
  },
  {
    id: "portfolio",
    experimentNumber: "09",
    title: "PORTFOLIO",
    subtitle: "Cinematic Developer Experience",
    status: "ACTIVE",
    tech: ["React", "Three.js", "GSAP", "TypeScript"],
    metrics: [
      { label: "MODEL", value: "3D Experience" },
      { label: "ACCURACY", value: "Story-driven" },
      { label: "TECHNOLOGY", value: "R3F + GSAP" },
      { label: "RESULT", value: "This Website" },
    ],
    githubUrl: "https://github.com/Dushyant-code2003/Portfolio",
    domain: "WEB",
    story: defaultStory(
      "Traditional portfolios fail to capture the craft and curiosity behind engineering work.",
      "Build an interactive cinematic experience that tells a developer's story through scroll, 3D, and motion.",
      "React Three Fiber scenes, GSAP ScrollTrigger timelines, and modular data-driven sections.",
      "A story-driven portfolio that feels like entering a developer's world — not reading a resume."
    ),
  },
];

/** Repos excluded from the lab: Unit_Convertor_Advance, PhotoGalleryApp */
