export interface TechNode {
  id: string;
  label: string;
  category: "language" | "framework" | "tool" | "concept";
  level: number;
  related: string[];
  projects: string[];
  x: number;
  y: number;
}

export const techNodes: TechNode[] = [
  { id: "python", label: "Python", category: "language", level: 90, related: ["tensorflow", "fastapi", "ml"], projects: ["agrisathi", "moviemate", "scheduler"], x: -2.5, y: 1.2 },
  { id: "javascript", label: "JavaScript", category: "language", level: 88, related: ["react", "nodejs", "web"], projects: ["moviemate"], x: 1.8, y: 0.5 },
  { id: "java", label: "Java", category: "language", level: 85, related: ["systems", "android"], projects: ["smartquiz", "budgetbuddy"], x: -1.2, y: -1.5 },
  { id: "cpp", label: "C++", category: "language", level: 75, related: ["systems"], projects: [], x: -3, y: -0.5 },
  { id: "react", label: "React", category: "framework", level: 88, related: ["typescript", "web"], projects: [], x: 2.5, y: 1.5 },
  { id: "typescript", label: "TypeScript", category: "language", level: 85, related: ["react", "web"], projects: [], x: 3.2, y: 0.8 },
  { id: "nodejs", label: "Node.js", category: "framework", level: 80, related: ["express", "apis"], projects: [], x: 1.2, y: -1.2 },
  { id: "tensorflow", label: "TensorFlow", category: "framework", level: 82, related: ["ml", "python"], projects: ["agrisathi"], x: -1.8, y: 2.2 },
  { id: "opencv", label: "OpenCV", category: "framework", level: 78, related: ["ml", "python"], projects: ["agrisathi"], x: -0.5, y: 2.8 },
  { id: "fastapi", label: "FastAPI", category: "framework", level: 85, related: ["python", "apis"], projects: ["agrisathi"], x: -2.8, y: 2.5 },
  { id: "ml", label: "Machine Learning", category: "concept", level: 85, related: ["tensorflow", "python"], projects: ["agrisathi", "moviemate"], x: 0, y: 2 },
  { id: "apis", label: "REST APIs", category: "concept", level: 88, related: ["nodejs", "fastapi"], projects: ["moviemate", "agrisathi"], x: 0.5, y: -0.8 },
  { id: "mysql", label: "MySQL", category: "tool", level: 82, related: ["systems"], projects: ["smartquiz"], x: -2, y: -2.2 },
  { id: "mongodb", label: "MongoDB", category: "tool", level: 78, related: ["apis"], projects: [], x: 0.8, y: -2.5 },
  { id: "web", label: "Web", category: "concept", level: 90, related: ["react", "javascript"], projects: ["moviemate"], x: 2.8, y: -0.5 },
  { id: "systems", label: "Systems", category: "concept", level: 82, related: ["java", "mysql"], projects: ["smartquiz"], x: -1.5, y: -2.8 },
];

export const coreNodes = [
  { id: "code", label: "CODE", angle: 0, color: "#ff6b4a" },
  { id: "ai", label: "AI", angle: 51, color: "#7c9cff" },
  { id: "web", label: "WEB", angle: 103, color: "#4ade80" },
  { id: "systems", label: "SYSTEMS", angle: 154, color: "#fbbf24" },
  { id: "problem", label: "PROBLEM SOLVING", angle: 206, color: "#f472b6" },
  { id: "design", label: "DESIGN", angle: 257, color: "#a78bfa" },
  { id: "learning", label: "LEARNING", angle: 309, color: "#2dd4bf" },
] as const;

export type CoreNodeId = (typeof coreNodes)[number]["id"];
