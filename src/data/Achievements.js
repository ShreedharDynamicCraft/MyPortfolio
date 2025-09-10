import { Trophy, Award, Code } from "lucide-react";
import hacthon from "../assets/Achievements/HACTHON.jpeg";
import rajyapuraskar from "../assets/Achievements/RAJYPURASHKAR.jpeg";
import python from "../assets/Achievements/PYTHON TOPPER.jpg";
const achievements = [
  {
    id: 1,
    title: "Top Performer - NPTEL Python Course",
    issuer: "NPTEL (All India Rank)",
    date: "2024",
    category: "Certification",
    orientation: "landscape",
    image: python, // No image provided, can add certificate preview later
    description:
      "Recognized as a Top Performer in the NPTEL Python Course with an All India Rank.",
    skills: ["Python", "Problem Solving", "Data Structures"],
    color: "from-indigo-500 via-purple-500 to-pink-500",
    icon: Award,
    achievement: "Top Performer",
    link: "https://drive.google.com/file/d/1DKVmj5nBCvOowF8MjnWdz4gemQtoZ4bw/view?usp=sharing",
  },
  {
    id: 2,
    title: "Bihar Governor's Award - Rajya Puraskar",
    issuer: "Scout/Guide Examination",
    date: "2022",
    category: "Award",
    orientation: "landscape",
    image: rajyapuraskar,
    description:
      "Awarded the Bihar Governor's Award for exceptional performance in the Scout/Guide Rajya Puraskar Examination.",
    skills: ["Leadership", "Discipline", "Community Service"],
    color: "from-green-500 via-emerald-500 to-teal-500",
    icon: Trophy,
    achievement: "Governor's Award",
    link: "https://drive.google.com/file/d/12C-30j0F6oK3j0xyQ7Z8G3L9A4bjAj15/view?usp=sharing",
  },
  {
    id: 3,
    title: "Ahouba 2.0 Hackathon",
    issuer: "Ahouba Platform",
    date: "2024",
    category: "Hackathon",
    orientation: "landscape",
    image: hacthon,
    description:
      "Secured 3rd Rank in Ahouba 2.0 Hackathon for a renewable energy project, winning ₹30,000.",
    skills: ["Hackathon", "Innovation", "Renewable Energy"],
    color: "from-orange-500 via-red-500 to-pink-500",
    icon: Code,
    achievement: "3rd Rank - ₹30,000 Prize",
    link: "https://www.linkedin.com/posts/shreedhar-anand-23a699214_hackathon-innovation-renewableenergy-activity-7313134276105879553-SNy6",
  },
];

export default achievements;
