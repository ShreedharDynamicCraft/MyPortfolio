import {
  Github,
  Linkedin,
  Twitter,
  Instagram
} from "lucide-react";

const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    icon: Github,
    url: "https://github.com/ShreedharDynamicCraft",
    color: "from-gray-600 to-gray-800",
    hoverColor: "hover:text-gray-500",
    description: "Check out my repositories",
  },
  {
    id: 2,
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/shreedhar-anand-23a699214/",
    color: "from-sky-600 to-sky-800",
    hoverColor: "hover:text-sky-400",
    description: "Connect professionally",
  },
  {
    id: 3,
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/shreedhar_garg",
    color: "from-yellow-500 to-yellow-700",
    hoverColor: "hover:text-sky-400",
    description: "Follow my journey",
  },
  {
    id: 4,
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/shreedhar.ai/",
    color: "from-pink-800 to-orange-600",
    hoverColor: "hover:text-orange-400",
    description: "Behind the scenes",
  },
];

const quickLinks = [
  { name: "About Me", href: "#" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

const skills = [
  "React",
  "Node.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "MongoDB",
  "Next.js",
  "C++",
  "Tailwind CSS",
  "Git",
  "Docker",
  "Web-Socket"
];

export { skills, quickLinks, socialLinks };
