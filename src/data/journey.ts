export interface JourneyMilestone {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  year?: string;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "begin",
    number: "01",
    label: "BEGIN",
    title: "First Lines of Code",
    description:
      "Started B.Tech CSE at BML Munjal University — discovering that code could shape how people learn, spend, and decide.",
    year: "2023",
  },
  {
    id: "learn",
    number: "02",
    label: "LEARN",
    title: "Foundations & Curiosity",
    description:
      "Built core skills in Python, Java, C++, and data structures. Explored OOP, REST APIs, and the fundamentals of software design.",
    year: "2023–24",
  },
  {
    id: "build",
    number: "03",
    label: "BUILD",
    title: "First Real Projects",
    description:
      "Shipped MovieMate and BudgetBuddy — turning classroom concepts into products people could actually use.",
    year: "2024–25",
  },
  {
    id: "experiment",
    number: "04",
    label: "EXPERIMENT",
    title: "AI & Deep Learning",
    description:
      "Dived into TensorFlow, OpenCV, and RAG pipelines. Built AgriSathi AI and the club event scheduler with A* optimization.",
    year: "2025",
  },
  {
    id: "fail",
    number: "05",
    label: "FAIL",
    title: "Debugging Reality",
    description:
      "Learned that proctoring edge cases, FAISS retrieval gaps, and sync conflicts are where real engineering begins.",
    year: "2025",
  },
  {
    id: "improve",
    number: "06",
    label: "IMPROVE",
    title: "Iterate & Optimize",
    description:
      "Refined SmartQuiz proctoring, AgriSathi ETL pipelines, and MovieMate caching — performance as a feature.",
    year: "2025",
  },
  {
    id: "ship",
    number: "07",
    label: "SHIP",
    title: "Internship & Certification",
    description:
      "Developer internship at BMU building quiz systems. Earned Oracle OCI AI Foundations Associate certification.",
    year: "2025",
  },
  {
    id: "next",
    number: "08",
    label: "NEXT",
    title: "What Comes After",
    description:
      "Building toward full-stack AI products, scalable systems, and experiences that feel inevitable once you use them.",
    year: "2027→",
  },
];

export const navSections = [
  { id: "intro", index: 0, label: "INTRO" },
  { id: "about", index: 1, label: "ABOUT" },
  { id: "journey", index: 2, label: "JOURNEY" },
  { id: "core", index: 3, label: "CORE" },
  { id: "lab", index: 4, label: "LAB" },
  { id: "stack", index: 5, label: "STACK" },
  { id: "code", index: 6, label: "PLAY" },
  { id: "connect", index: 7, label: "CONNECT" },
] as const;
