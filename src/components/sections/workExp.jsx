import React from "react";
import links from "../../data/DownloadLinks";

const experiences = [
  {
    id: 1,
    type: "internship",
    company: "Orbol Group, Software Development Division",
    position: "Full-stack MERN Developer Intern",
    duration: "June 2025 – Aug 2025",
    location: "Ahmedabad, Remote / Part-time",
    description:
      "Defined a MERN-based gaming platform with user and admin panels, integrating Clerk (auth), PhonePe (payments), and real-time leaderboards. Connected Riot Games and FACEIT APIs for live player stats and tournament data. Used Neon and Supabase for scalable backend and database; optimized frontend for SEO and performance.",
    skills: [
      "MERN Stack",
      "Clerk",
      "PhonePe API",
      "Riot Games API",
      "FACEIT API",
      "Neon",
      "Supabase",
      "SEO Optimization",
    ],
    gradient: "from-green-400 via-teal-500 to-blue-500",
  },
  {
    id: 2,
    type: "internship",
    company: "Centre for Development of Advanced Computing (C-DAC), Noida",
    position: "Software Development Intern - Performance Engineering",
    duration: "July 2024 – Sept 2024",
    location: "Noida, India",
    description:
      "Created 5 Python tools and optimized Nginx-Apache proxy, improving system throughput by 30%. Enhanced CLI and caching with Nginx/Linux, reducing resource usage by 25%; scored 95%+ in OS/networking.",
    skills: ["Python", "Nginx", "Apache", "Linux", "Caching", "CLI Tools"],
    gradient: "from-purple-500 via-pink-500 to-red-500",
  },
];

const WorkExperience = () => {
  const handleViewResume = (e) => {
    e.preventDefault();
    // Open Google Drive link in a new tab
    window.open(links.downloadCV, '_blank', 'noopener,noreferrer');
  };
  return (
    <div
      id="experience"
      className="relative bg-indigo-50 py-20 px-4 md:px-8 font-['Be_Vietnam_Pro'] overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative text-center mb-20 z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#4e45d5] font-bold mb-6 transform hover:scale-105 transition-transform duration-300">
          Work Experience
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-[#4e45d5] via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse"></div>
        <p className="text-lg md:text-xl text-[#343d38] mt-8 max-w-2xl mx-auto font-medium">
          My journey through the world of software development
        </p>
      </div>

      {/* Experience Cards */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid gap-8 md:gap-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="group relative">
              <div className="relative perspective-1000">
                <div
                  className="relative bg-white/90 backdrop-blur-2xl rounded-3xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-[1.07] hover:rotate-[1.5deg] hover:shadow-3xl shadow-2xl group-hover:shadow-[#4e45d5]/30 border border-white/70"
                  style={{ boxShadow: '0 8px 32px 0 rgba(78,69,213,0.12), 0 1.5px 8px 0 rgba(78,69,213,0.08)' }}
                >
                  {/* Animated Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 animate-gradient-move`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative p-10 md:p-12 z-10">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                      {/* Left Side */}
                      <div className="lg:w-1/3 flex flex-col items-start">
                        <div className="inline-block mb-4">
                          <span
                            className={`px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase bg-gradient-to-r ${exp.gradient} text-white shadow-lg animate-bounce`}
                          >
                            🎓 INTERNSHIP
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#343d38] mb-2 group-hover:text-[#4e45d5] transition-colors duration-300">
                          {exp.company}
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#4e45d5] rounded-full animate-pulse"></span>
                            <span className="font-semibold">
                              {exp.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="lg:w-2/3">
                        <h4 className="text-xl md:text-2xl font-extrabold text-[#4e45d5] mb-4">
                          {exp.position}
                        </h4>
                        <p className="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {exp.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 bg-gradient-to-r from-white to-gray-50 text-[#343d38] rounded-full text-xs md:text-sm font-semibold border border-gray-200 hover:border-[#4e45d5] transition-all duration-300 shadow-sm hover:scale-110 transform-gpu"
                              style={{ boxShadow: '0 2px 8px 0 rgba(78,69,213,0.08)' }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#4e45d5] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>

                  {/* Card Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Enhanced Shadow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} rounded-3xl transform translate-x-3 translate-y-3 opacity-25 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:opacity-40 transition-all duration-500 -z-10 blur-sm`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Custom 3D and gradient animation styles */}
      <style jsx>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradientMove 6s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Education Section */}
      <div className="relative text-center mt-20 z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#4e45d5] mb-8">Education</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {/* College */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-white/60 animate-gradient-move">
            <img src="https://www.iiitmanipur.ac.in/img/iiitm-logo.png" alt="IIITM Logo" className="w-16 h-16 mb-4 rounded-full shadow-lg" />
            <h3 className="text-xl font-bold text-[#343d38] mb-2">Indian Institute of Information Technology Senapati, Manipur (IIITM)</h3>
            <span className="text-[#4e45d5] font-semibold mb-1">B.Tech Computer Science & Engineering</span>
            <span className="text-gray-600 mb-2">2022 - 2026</span>
          </div>
          {/* Intermediate */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-white/60 animate-gradient-move">
            <img src="https://www.srsvm.in/images/logo.png" alt="SRVSM Logo" className="w-16 h-16 mb-4 rounded-full shadow-lg" />
            <h3 className="text-xl font-bold text-[#343d38] mb-2">SRVSM, Forbesganj</h3>
            <span className="text-[#4e45d5] font-semibold mb-1">Intermediate (11-12), CBSE Board</span>
            <span className="text-gray-600 mb-2">2020 - 2022</span>
          </div>
          {/* Matric */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-white/60 animate-gradient-move">
            <img src="https://www.srsvm.in/images/logo.png" alt="SRVSM Logo" className="w-16 h-16 mb-4 rounded-full shadow-lg" />
            <h3 className="text-xl font-bold text-[#343d38] mb-2">SRVSM, Forbesganj</h3>
            <span className="text-[#4e45d5] font-semibold mb-1">Matric (10th Class), CBSE Board</span>
            <span className="text-gray-600 mb-2">2018 - 2020</span>
          </div>
        </div>
      </div>

      {/* Bottom Call-to-Action */}
      <div className="relative text-center mt-20 z-10">
        <div className="flex justify-center items-center gap-6">
          {/* Download Resume Button */}
          <a
            href={links.downloadCV}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-4 bg-transparent border-none cursor-pointer inline-block"
          >
            <span className="relative z-10 text-gray-100 font-bold text-lg whitespace-nowrap">
              Download Resume
            </span>
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-r from-[#28282d] to-gray-800 rounded-xl transition-all duration-500 group-hover:translate-x-[8%] group-hover:translate-y-[25%] group-hover:w-[115%] group-hover:h-[115%] -z-10 shadow-lg"></div>
            <div className="absolute translate-x-3 translate-y-3 w-12 h-12 bg-gradient-to-r from-[#4e45d5]/20 to-purple-500/20 backdrop-blur-sm rounded-full transition-all duration-500 group-hover:rounded-xl group-hover:translate-x-0 group-hover:translate-y-0 group-hover:w-full group-hover:h-full -z-20"></div>
          </a>
          {/* View Resume Button - opens modal */}
          <button
            onClick={handleViewResume}
            className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow hover:bg-purple-700 transition inline-block"
            style={{ minWidth: '180px' }}
          >
            <span className="relative z-10 font-bold text-lg whitespace-nowrap">
              View Resume
            </span>
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl transition-all duration-500 group-hover:translate-x-[8%] group-hover:translate-y-[25%] group-hover:w-[115%] group-hover:h-[115%] -z-10 shadow-lg"></div>
            <div className="absolute translate-x-3 translate-y-3 w-12 h-12 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-full transition-all duration-500 group-hover:rounded-xl group-hover:translate-x-0 group-hover:translate-y-0 group-hover:w-full group-hover:h-full -z-20"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
