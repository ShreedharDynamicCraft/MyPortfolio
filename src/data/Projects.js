import RhythmNest from "../assets/MyProject/MusicMaster.png";
import Techfest from "../assets/MyProject/Techfest.png";
import CareerPilot from "../assets/MyProject/CareerPilot.png";
import ControlRenewable from "../assets/MyProject/Control_Renewal.png";
import sketchflow from "../assets/MyProject/SketchFlow.png";
import financeFlow from "../assets/MyProject/FinanceFlow.png";
import graphvisual from "../assets/MyProject/GraphVisul.png";
const projects = [
  {
    id: 1,
    title: "CareerPilot – AI Career Guidance Platform",
    description:
      "Built an AI-powered platform with 85% job match accuracy using NLP, OpenAI API, and job scrapers from 10+ sites. Features include resume/cover letter generators, ATS score checker, job role predictor, AI interview prep, and personalized dashboards for 200+ users.",
    image: CareerPilot,
    vercelLink: "https://career-pilot-gohj.vercel.app",
    githubLink: "https://github.com/ShreedharDynamicCraft/CareerPilot",
    technologies: [
      "Next.js",
      "JavaScript",
      "PostgreSQL",
      "Python",
      "Machine Learning",
      "NLP",
      "OpenAI API",
      "Mira API",
    ],
    category: "Full Stack / AI-ML",
    gradient: "from-purple-600 via-pink-500 to-red-500",
    featured: true,
  },
  {
    id: 2,
    title: "Control and Operation of Renewable Energy",
    description:
      "Hackathon-winning ML project optimizing solar/wind energy using LSTM with 90% prediction accuracy. Flask backend deployed on AWS reduced latency by 25% handling 50+ queries. Interactive React/Streamlit dashboard used by 20+ operators.",
    image:ControlRenewable,
    vercelLink: "https://control-and-operation-of-renewable.vercel.app/",
    githubLink:
      "https://github.com/ShreedharDynamicCraft/Control-and-Operation-of-Renewable-Energy",
    technologies: [
      "React",
      "Flask",
      "PostgreSQL",
      "Streamlit",
      "AWS",
      "LSTM",
      "Scikit-learn",
    ],
    category: "Full Stack / ML",
    gradient: "from-teal-600 via-lime-500 to-green-500",
    featured: true,
  },
  {
    id: 3,
    title: "Pathfinding Algorithm Visualization",
    description:
      "Java desktop app visualizing BFS, DFS, Dijkstra, and A* on 50+ mazes with interactive UI. Includes Google Maps-like pathfinding and file-based uploads, helping 100+ students understand DSA concepts.",
    image: graphvisual,
    vercelLink: "",
    githubLink:
      "https://github.com/ShreedharDynamicCraft/Pathfinding-Algorithm--Visualization-Desktop-Using-Java",
    technologies: ["Java", "Swing", "JFrame", "HTML5", "CSS3"],
    category: "Desktop / Algorithms",
    gradient: "from-orange-500 via-yellow-500 to-amber-400",
    featured: false,
  },
  {
    id: 4,
    title: "FinanceFlow – AI Finance Tracker",
    description:
      "Developed an AI-powered finance platform using Google Gemini API to deliver personalized insights and recommendations. Added multi-account management, budget planning, receipt scanning, analytics dashboards, and secure auth with Clerk + Prisma ORM.",
    image:financeFlow,
    vercelLink: "https://f-inance-flow.vercel.app/",
    githubLink: "https://github.com/ShreedharDynamicCraft/FInance-Flow",
    technologies: [
      "Next.js",
      "Prisma",
      "Clerk",
      "Tailwind CSS",
      "PostgreSQL",
      "Google Gemini API",
      "Arcjet",
      "Resend API",
    ],
    category: "Full Stack / AI",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    featured: true,
  },
  {
    id: 5,
    title: "SketchFlow Studio – AI Drawing Tool",
    description:
      "AI-powered drawing tool with real-time collaboration, pencil/shape/text/image tools, undo/redo, layer management, zoom, auto-save, and intelligent suggestions. Achieved 60fps performance and cross-platform responsive UI.",
    image:sketchflow,
    vercelLink: "https://sketchflow-studio.vercel.app/",
    githubLink: "https://github.com/ShreedharDynamicCraft/sketchflow-studio",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Canvas API",
      "AI",
    ],
    category: "Frontend / AI",
    gradient: "from-blue-600 via-cyan-500 to-sky-400",
    featured: false,
  },

  {
    id: 6,
    title: "MeLoLearn - Music School",
    description:
      "Responsive music school landing page built with Next.js and TypeScript, styled with shadcn/ui. Features sections for courses, instructors, testimonials, and contact information with smooth navigation and accessibility.",
    image: RhythmNest,
    vercelLink: "music-master-hazel.vercel.app/",
    githubLink: "https://github.com/ShreedharDynamicCraft/MeloLearn",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SSR / SSG",
      "Responsive Design",
    ],
    category: "Frontend",
    gradient: "from-teal-500 via-blue-500 to-indigo-500",
    featured: false,
  },
  
  {
    id: 7,
    title: "College Techfest Website",
    description:
      "Responsive college techfest website built using HTML, CSS, and JavaScript, showcasing events, schedules, and fest details. Includes registration and contact sections with modern UI and accessibility support.",
    image: Techfest,
    vercelLink: "https://ahouba.iiitmanipur.ac.in/",
    githubLink: "https://github.com/ShreedharDynamicCraft/IIITM-TECHFEST",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI Animations"],
    category: "Frontend",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    featured: false,
  },
];

export default projects;
