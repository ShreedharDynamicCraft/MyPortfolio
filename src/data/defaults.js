
import UserImage from '../assets/HeroSection/UserImage.jpeg'
import SunHero from '../assets/HeroSection/SunHero.png'
import DotsHero from '../assets/HeroSection/DotsHero.png'
import WaveHero from '../assets/HeroSection/WaveHero.png'
import CubeHero from '../assets/HeroSection/CubeHero.png'

import CareerPilot from '../assets/MyProject/CareerPilot.jpg'
import ControlRenewable from '../assets/MyProject/Control_Renewal.jpg'
import GraphVisual from '../assets/MyProject/GraphVisul.png'
import FinanceFlow from '../assets/MyProject/FinanceFlow.jpg'
import SketchFlow from '../assets/MyProject/SketchFlow.jpg'
import MusicMaster from '../assets/MyProject/MusicMaster.jpg'
import Techfest from '../assets/MyProject/Techfest.jpg'

import PythonTopper from '../assets/Achievements/PythonTopper.jpg'
import Hackathon from '../assets/Achievements/HACTHON.jpeg'
import RajyaPuraskar from '../assets/Achievements/RAJYPURASHKAR.jpeg'

export const heroDecor = { sun: SunHero, dots: DotsHero, wave: WaveHero, cube: CubeHero }

export const defaultProfile = {
  name: 'Shreedhar Anand',
  roles: ['Software Development Engineer', 'Backend Developer', 'Full-Stack Developer'],
  headline: 'Software Development Engineer — Backend Systems',
  about:
    "I'm a Software Development Engineer at Urban Company, building backend systems that keep millions of bookings running every month. I work across distributed systems, full-stack web, and AI/ML to ship reliable, high-impact software.",
  email: 'Shreedharanandji@gmail.com',
  phone: '+91-9060749243',
  location: 'Gurugram, India',
  availableForWork: true,
  showBookDownload: false,
  heroImage: UserImage,
  links: {
    portfolio: 'https://my-portfolio-nine-mocha-77.vercel.app',
    resume: '/Shreedhar_Anand_Resume.pdf',
    bookPdf: '/Shreedhar_Anand_Portfolio_Book.pdf',
    github: 'https://github.com/ShreedharDynamicCraft',
    linkedin: 'https://www.linkedin.com/in/shreedhar-anand-23a699214/',
    twitter: 'https://x.com/shreedhar_garg',
    instagram: 'https://www.instagram.com/shreedhar.ai/',
    leetcode: 'https://leetcode.com/u/Shreedhar_IIITM/',
  },
}

export const defaultExperiences = [
  {
    id: 'uc-sde1',
    type: 'Full-time',
    company: 'Urban Company',
    logo: 'https://www.google.com/s2/favicons?domain=urbancompany.com&sz=128',
    companyUrl: 'https://www.linkedin.com/company/urbancompany/',
    position: 'Software Development Engineer I, Fulfilment Team',
    duration: 'Jul 2026 – Present',
    location: 'Gurugram, India',
    description: 'Own cancellation, recovery, and reschedule flows across the Fulfilment platform.',
    highlights: [
      'Built a same-slot recovery engine that secures a replacement professional before a repeat no-show booking is cancelled — saving 15% of would-be cancellations (1,000+ bookings in the first two weeks).',
      'Automated the reschedule and cancellation flow, closing a loophole that lifted fee enforcement from 0.6% to 8–17% (16×) and cut live-agent dependency from 93% to 10%.',
      'Built provider-accountability checks that flag high-risk cancellations before they occur, making penalty and refund decisions fairer and more accurate.',
      'Improved reliability and correctness across flows handling 2M cancellations/month through earlier recovery triggers, race-condition fixes, and safer cancellation guards.',
    ],
    letter: '',
    driveLink: '',
    skills: ['Node.js', 'Microservices', 'Distributed Systems', 'Kafka', 'MongoDB', 'System Design'],
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
  },
  {
    id: 'uc-intern',
    type: 'Internship',
    company: 'Urban Company',
    logo: 'https://www.google.com/s2/favicons?domain=urbancompany.com&sz=128',
    companyUrl: 'https://www.linkedin.com/company/urbancompany/',
    position: 'Software Development Engineer Intern, Fulfilment Team',
    duration: 'Jan 2026 – Jul 2026',
    location: 'Gurugram, India',
    description: 'Built cancellation-fee, recovery, and chatbot systems for the Fulfilment platform.',
    highlights: [
      'Centralized cancellation-fee logic into a single service and migrated 4+ systems onto one source of truth governing ₹16 Cr of fee flow.',
      'Re-architected the provider-recovery pipeline, lifting recovery success from 33% to 42% and safeguarding 1.1M accountability decisions and 245K fee reversals.',
      'Built and scaled a conversational cancellation assistant, increasing self-serve resolution and reducing manual agent handling.',
      'Automated fee handling across booking types and added retries and resiliency to critical services, improving reliability for 2M cancellations/month.',
    ],
    letter: '/docs/urban-company-letter.pdf',
    driveLink: '',
    skills: ['Node.js', 'TypeScript', 'Elasticsearch', 'Redis', 'PCS / Policy Config', 'REST APIs'],
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
  },
  {
    id: 'altbridge',
    type: 'Internship',
    company: 'AltBridge',
    logo: '',
    companyUrl: '',
    position: 'SDE Intern (Project Lead)',
    duration: 'Oct 2025 – Dec 2025',
    location: 'Singapore · Remote',
    description: 'Led the design and development of a core startup module.',
    highlights: [
      'Architected backend workflows and implemented scalable APIs.',
      'Delivered an MVP end to end as project lead.',
    ],
    letter: '',
    driveLink: '',
    skills: ['Node.js', 'REST APIs', 'Backend Architecture', 'MVP', 'Leadership'],
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
  },
  {
    id: 'orbol',
    type: 'Internship',
    company: 'Orbol Group',
    logo: '',
    companyUrl: 'https://www.linkedin.com/company/orbol/',
    position: 'Full-Stack Developer Intern (MERN)',
    duration: 'Jun 2025 – Aug 2025',
    location: 'Remote',
    description: 'Full-stack MERN development for a competitive gaming platform.',
    highlights: [
      'Built user and admin panels with Clerk authentication and PhonePe payments.',
      'Implemented real-time leaderboards and tournament data flows.',
      'Integrated Riot Games and FACEIT APIs for live player stats.',
    ],
    letter: '/docs/orbol-letter.jpg',
    driveLink: '',
    skills: ['MERN Stack', 'Clerk', 'PhonePe API', 'Riot Games API', 'FACEIT API', 'Supabase'],
    gradient: 'from-green-400 via-teal-500 to-blue-500',
  },
  {
    id: 'cdac',
    type: 'Internship',
    company: 'C-DAC (Centre for Development of Advanced Computing)',
    logo: 'https://www.google.com/s2/favicons?domain=cdac.in&sz=128',
    companyUrl: 'https://www.linkedin.com/company/cdac/',
    position: 'Software Development Intern, Performance Engineering',
    duration: 'Jul 2024 – Sept 2024',
    location: 'Noida, India',
    description: 'Performance engineering in the systems team.',
    highlights: [
      'Built 5 Python performance-analysis tools for profiling and benchmarking.',
      'Optimized an Nginx–Apache proxy layer: +30% throughput, −25% resource usage.',
    ],
    letter: '/docs/cdac-certificate.jpg',
    driveLink: '',
    skills: ['Python', 'Nginx', 'Apache', 'Linux', 'Caching', 'CLI Tools'],
    gradient: 'from-purple-500 via-pink-500 to-red-500',
  },
]

export const defaultEducation = [
  {
    id: 'iiitm',
    institution: 'Indian Institute of Information Technology Senapati, Manipur (IIITM)',
    degree: 'B.Tech, Computer Science & Engineering — CGPA 8.01',
    period: '2022 – 2026',
    logo: 'https://www.iiitmanipur.ac.in/img/iiitm-logo.png',
    photos: ['/education/convocation.jpg', '/education/graduation.jpg'],
  },
  {
    id: 'srvsm-12',
    institution: 'SRVSM, Forbesganj',
    degree: 'Intermediate (11–12), CBSE Board',
    period: '2020 – 2022',
    logo: 'https://www.srsvm.in/images/logo.png',
  },
  {
    id: 'srvsm-10',
    institution: 'SRVSM, Forbesganj',
    degree: 'Matriculation (10th), CBSE Board',
    period: '2018 – 2020',
    logo: 'https://www.srsvm.in/images/logo.png',
  },
]

export const defaultProjects = [
  {
    id: 'careerpilot',
    title: 'CareerPilot – AI Career Guidance Platform',
    description:
      'AI-powered platform with 85% job-match accuracy using NLP, the OpenAI API, and job scrapers from 10+ sites. Features resume/cover-letter generators, an ATS score checker, a job-role predictor, AI interview prep, and personalized dashboards for 200+ users.',
    image: CareerPilot,
    liveUrl: 'https://career-pilot-gohj.vercel.app',
    githubUrl: 'https://github.com/ShreedharDynamicCraft/CareerPilot',
    technologies: ['Next.js', 'PostgreSQL', 'Python', 'Machine Learning', 'NLP', 'OpenAI API'],
    category: 'Full Stack / AI-ML',
    gradient: 'from-purple-600 via-pink-500 to-red-500',
    featured: true,
  },
  {
    id: 'renewable',
    title: 'Control & Operation of Renewable Energy',
    description:
      'Hackathon-winning ML project optimizing solar/wind energy using LSTM with 90% prediction accuracy. Flask backend on AWS reduced latency by 25% handling 50+ queries; interactive React/Streamlit dashboard used by 20+ operators.',
    image: ControlRenewable,
    liveUrl: 'https://control-and-operation-of-renewable.vercel.app/',
    githubUrl: 'https://github.com/ShreedharDynamicCraft/Control-and-Operation-of-Renewable-Energy',
    technologies: ['React', 'Flask', 'PostgreSQL', 'Streamlit', 'AWS', 'LSTM'],
    category: 'Full Stack / ML',
    gradient: 'from-teal-600 via-lime-500 to-green-500',
    featured: true,
  },
  {
    id: 'finance-flow',
    title: 'FinanceFlow – AI Finance Tracker',
    description:
      'AI-powered finance platform using the Google Gemini API for personalized insights. Multi-account management, budget planning, receipt scanning, analytics dashboards, and secure auth with Clerk + Prisma ORM.',
    image: FinanceFlow,
    liveUrl: 'https://f-inance-flow.vercel.app/',
    githubUrl: 'https://github.com/ShreedharDynamicCraft/FInance-Flow',
    technologies: ['Next.js', 'Prisma', 'Clerk', 'Tailwind CSS', 'PostgreSQL', 'Google Gemini API'],
    category: 'Full Stack / AI',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    featured: true,
  },
  {
    id: 'sketchflow',
    title: 'SketchFlow Studio – AI Drawing Tool',
    description:
      'AI-powered drawing tool with real-time collaboration, pencil/shape/text/image tools, undo/redo, layer management, zoom, auto-save, and intelligent suggestions. 60fps performance and cross-platform responsive UI.',
    image: SketchFlow,
    liveUrl: 'https://sketchflow-studio.vercel.app/',
    githubUrl: 'https://github.com/ShreedharDynamicCraft/sketchflow-studio',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Canvas API', 'AI'],
    category: 'Frontend / AI',
    gradient: 'from-blue-600 via-cyan-500 to-sky-400',
    featured: false,
  },
  {
    id: 'graphvisual',
    title: 'Pathfinding Algorithm Visualization',
    description:
      'Java desktop app visualizing BFS, DFS, Dijkstra, and A* on 50+ mazes with an interactive UI. Includes Google Maps-like pathfinding and file-based uploads, helping 100+ students understand DSA concepts.',
    image: GraphVisual,
    liveUrl: '',
    githubUrl: 'https://github.com/ShreedharDynamicCraft/Pathfinding-Algorithm--Visualization-Desktop-Using-Java',
    technologies: ['Java', 'Swing', 'JFrame', 'HTML5', 'CSS3'],
    category: 'Desktop / Algorithms',
    gradient: 'from-orange-500 via-yellow-500 to-amber-400',
    featured: false,
  },
  {
    id: 'melolearn',
    title: 'MeLoLearn – Music School',
    description:
      'Responsive music-school landing page built with Next.js and TypeScript, styled with shadcn/ui. Sections for courses, instructors, testimonials, and contact with smooth navigation and accessibility.',
    image: MusicMaster,
    liveUrl: 'https://music-master-hazel.vercel.app/',
    githubUrl: 'https://github.com/ShreedharDynamicCraft/MeloLearn',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SSR / SSG'],
    category: 'Frontend',
    gradient: 'from-teal-500 via-blue-500 to-indigo-500',
    featured: false,
  },
  {
    id: 'techfest',
    title: 'College Techfest Website',
    description:
      'Responsive college techfest website showcasing events, schedules, and fest details. Includes registration and contact sections with modern UI and accessibility support.',
    image: Techfest,
    liveUrl: 'https://ahouba.iiitmanipur.ac.in/',
    githubUrl: 'https://github.com/ShreedharDynamicCraft/IIITM-TECHFEST',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI Animations'],
    category: 'Frontend',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    featured: false,
  },
]

export const defaultTechStacks = [
  { id: 1, name: 'C++', category: 'Programming Languages', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: 'from-blue-600 to-blue-800' },
  { id: 2, name: 'JavaScript', category: 'Programming Languages', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 'from-yellow-400 to-yellow-600' },
  { id: 3, name: 'TypeScript', category: 'Programming Languages', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: 'from-blue-500 to-blue-700' },
  { id: 4, name: 'Python', category: 'Programming Languages', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'from-green-400 to-blue-600' },
  { id: 5, name: 'C', category: 'Programming Languages', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', color: 'from-blue-700 to-blue-900' },
  { id: 20, name: 'Bash', category: 'Programming Languages', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', color: 'from-gray-600 to-gray-800' },
  { id: 21, name: 'SQL', category: 'Programming Languages', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 'from-blue-500 to-orange-500' },
  { id: 7, name: 'React.js', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'from-blue-50 to-blue-200' },
  { id: 41, name: 'React Native', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'from-blue-400 to-cyan-600' },
  { id: 8, name: 'Next.js', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: 'from-gray-800 to-black' },
  { id: 9, name: 'HTML5', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: 'from-orange-500 to-red-600' },
  { id: 10, name: 'CSS3', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: 'from-blue-400 to-blue-600' },
  { id: 11, name: 'Tailwind CSS', category: 'Frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg', color: 'from-cyan-400 to-white' },
  { id: 12, name: 'Bootstrap', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', color: 'from-purple-600 to-purple-800' },
  { id: 13, name: 'Redux', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', color: 'from-purple-500 to-purple-700' },
  { id: 14, name: 'Node.js', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: 'from-green-200 to-green-400' },
  { id: 15, name: 'Express.js', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: 'from-gray-700 to-gray-900' },
  { id: 16, name: 'Flask', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', color: 'from-gray-600 to-black' },
  { id: 27, name: 'REST APIs', category: 'Backend', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png', color: 'from-orange-500 to-yellow-600' },
  { id: 42, name: 'Kafka', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', color: 'from-gray-700 to-black' },
  { id: 17, name: 'MongoDB', category: 'Databases', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 'from-green-200 to-black/50' },
  { id: 18, name: 'PostgreSQL', category: 'Databases', icon: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg', color: 'from-blue-500 to-indigo-700' },
  { id: 19, name: 'MySQL', category: 'Databases', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 'from-blue-600 to-orange-500' },
  { id: 43, name: 'Redis', category: 'Databases', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: 'from-red-500 to-red-700' },
  { id: 24, name: 'Prisma', category: 'Databases', icon: 'https://cdn.worldvectorlogo.com/logos/prisma-3.svg', color: 'from-indigo-500 to-cyan-600' },
  { id: 29, name: 'Scikit-learn', category: 'AI/ML', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', color: 'from-yellow-500 to-orange-600' },
  { id: 30, name: 'Pandas', category: 'AI/ML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', color: 'from-purple-500 to-indigo-700' },
  { id: 31, name: 'NLP', category: 'AI/ML', icon: 'https://cdn-icons-png.flaticon.com/512/2871/2871124.png', color: 'from-pink-500 to-red-700' },
  { id: 32, name: 'OpenAI API', category: 'AI/ML', icon: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg', color: 'from-gray-700 to-black' },
  { id: 22, name: 'JWT', category: 'DevOps', icon: 'https://cdn.worldvectorlogo.com/logos/jwt-3.svg', color: 'from-pink-500 to-purple-600' },
  { id: 23, name: 'Docker', category: 'DevOps', icon: 'https://cdn.worldvectorlogo.com/logos/docker.svg', color: 'from-sky-500 to-blue-700' },
  { id: 34, name: 'AWS', category: 'DevOps', icon: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg', color: 'from-yellow-500 to-orange-600' },
  { id: 35, name: 'VS Code', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: 'from-blue-500 to-blue-700' },
  { id: 36, name: 'Linux', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: 'from-yellow-500 to-black' },
  { id: 38, name: 'Postman', category: 'Tools', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', color: 'from-orange-400 to-yellow-600' },
  { id: 39, name: 'Git', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: 'from-red-200 to-red-400' },
  { id: 40, name: 'GitHub', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: 'from-gray-800 to-black' },
  { id: 50, name: 'Claude', category: 'AI Tools', icon: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128', color: 'from-orange-400 to-amber-600' },
  { id: 51, name: 'ChatGPT', category: 'AI Tools', icon: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128', color: 'from-teal-500 to-emerald-700' },
  { id: 52, name: 'GitHub Copilot', category: 'AI Tools', icon: 'https://www.google.com/s2/favicons?domain=github.com&sz=128', color: 'from-gray-700 to-black' },
  { id: 53, name: 'Cursor', category: 'AI Tools', icon: 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128', color: 'from-slate-600 to-slate-900' },
  { id: 54, name: 'Perplexity', category: 'AI Tools', icon: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128', color: 'from-cyan-500 to-teal-700' },
  { id: 55, name: 'n8n', category: 'AI Tools', icon: 'https://www.google.com/s2/favicons?domain=n8n.io&sz=128', color: 'from-pink-500 to-rose-700' },
]

export const defaultAchievements = [
  {
    id: 'nptel',
    title: 'Top Performer — NPTEL Python Course',
    issuer: 'NPTEL (All India Rank)',
    date: '2024',
    category: 'Certification',
    image: PythonTopper,
    description: 'Recognized as a Top Performer in the NPTEL Python course with an All India Rank.',
    skills: ['Python', 'Problem Solving', 'Data Structures'],
    color: 'from-indigo-500 via-purple-500 to-pink-500',
    icon: 'Award',
    achievement: 'Top Performer',
    link: 'https://drive.google.com/file/d/1DKVmj5nBCvOowF8MjnWdz4gemQtoZ4bw/view?usp=sharing',
  },
  {
    id: 'rajya-puraskar',
    title: "Bihar Governor's Award — Rajya Puraskar",
    issuer: 'Scout/Guide Examination',
    date: '2022',
    category: 'Award',
    image: RajyaPuraskar,
    description:
      "Awarded the Bihar Governor's Award for exceptional performance in the Scout/Guide Rajya Puraskar Examination.",
    skills: ['Leadership', 'Discipline', 'Community Service'],
    color: 'from-green-500 via-emerald-500 to-teal-500',
    icon: 'Trophy',
    achievement: "Governor's Award",
    link: 'https://www.linkedin.com/in/shreedhar-anand-23a699214/',
  },
  {
    id: 'ahouba',
    title: 'Ahouba 2.0 Hackathon',
    issuer: 'Ahouba Platform',
    date: '2024',
    category: 'Hackathon',
    image: Hackathon,
    description: 'Secured 3rd Rank at the Ahouba 2.0 Hackathon for a renewable-energy project, winning ₹30,000.',
    skills: ['Hackathon', 'Innovation', 'Renewable Energy'],
    color: 'from-orange-500 via-red-500 to-pink-500',
    icon: 'Code',
    achievement: '3rd Rank — ₹30,000 Prize',
    link: 'https://www.linkedin.com/posts/shreedhar-anand-23a699214_hackathon-innovation-renewableenergy-activity-7313134276105879553-SNy6',
  },
]

export const defaultSocials = [
  { id: 'github', name: 'GitHub', icon: 'Github', url: 'https://github.com/ShreedharDynamicCraft', color: 'from-gray-600 to-gray-800', description: 'Check out my repositories' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/shreedhar-anand-23a699214/', color: 'from-sky-600 to-sky-800', description: 'Connect professionally' },
  { id: 'twitter', name: 'Twitter', icon: 'Twitter', url: 'https://x.com/shreedhar_garg', color: 'from-slate-500 to-slate-700', description: 'Follow my journey' },
  { id: 'instagram', name: 'Instagram', icon: 'Instagram', url: 'https://www.instagram.com/shreedhar.ai/', color: 'from-pink-800 to-orange-600', description: 'Behind the scenes' },
]

export const defaultData = {
  profile: defaultProfile,
  experiences: defaultExperiences,
  education: defaultEducation,
  projects: defaultProjects,
  techStacks: defaultTechStacks,
  achievements: defaultAchievements,
  socials: defaultSocials,
}
