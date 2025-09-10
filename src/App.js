import React from 'react'
import './styles/enhanced.css'
import Navbar from './components/common/navbar'
import HeroSection from './components/sections/heroSection'
import WorkExperience from './components/sections/workExp'
import ProjectSection from './components/sections/projectSection'
import FloatingTechBubble from './components/sections/techStacks'
import AchievementsSection from './components/sections/achievements'
import ContactSection from './components/sections/contactUs'
import FooterSection from './components/sections/footer'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-x-hidden transform-gpu">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-10 animate-float3D"></div>
        <div className="absolute top-1/3 right-32 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg opacity-15 animate-pulse3D"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-green-400 to-emerald-500 transform rotate-45 opacity-12 animate-rotateY"></div>
      </div>
      
      <Navbar/>
      <HeroSection/>
      <WorkExperience/>
      <ProjectSection/>
      <FloatingTechBubble/>
      <AchievementsSection/>
      <ContactSection />
      <FooterSection />
    </div>
  )
}

export default App
