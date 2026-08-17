import { Mail, Trophy, Award, Code, Star, Rocket, Heart, Calendar, Globe, Briefcase, GraduationCap } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from '../components/ui/BrandIcons'

export const iconMap = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
  Mail,
  Trophy,
  Award,
  Code,
  Star,
  Rocket,
  Heart,
  Calendar,
  Globe,
  Briefcase,
  GraduationCap,
}

export const iconNames = Object.keys(iconMap)

export function getIcon(name, fallback = Globe) {
  return iconMap[name] || fallback
}
