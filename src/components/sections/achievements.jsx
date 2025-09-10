import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import achievements from "../../data/Achievements";

const AchievementsSection = () => {
  // const [hoveredAchievement, setHoveredAchievement] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [imageOrientations, setImageOrientations] = useState({});

  // Detect image orientations on component mount
  useEffect(() => {
    const detectOrientations = async () => {
      const orientations = {};

      await Promise.all(
        achievements.map(async (achievement) => {
          const img = new Image();
          img.src = achievement.image;

          await img.decode();

          orientations[achievement.id] =
            img.width > img.height
              ? "landscape"
              : img.width < img.height
              ? "portrait"
              : "square";
        })
      );

      setImageOrientations(orientations);
    };

    detectOrientations();
  }, []);

  const openModal = (achievement) => {
    setSelectedCertificate(achievement);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div
      id="achievements"
      className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Enhanced Floating Elements with 3D effects */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-30 animate-spin shadow-2xl"
        style={{ 
          animationDuration: "8s", 
          transform: 'perspective(1000px) rotateX(15deg) rotateY(15deg)',
          filter: 'blur(0.5px) brightness(1.1)'
        }}
      ></div>
      <div
        className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-25 animate-bounce shadow-xl"
        style={{ 
          animationDuration: "4s",
          transform: 'perspective(1000px) rotateX(20deg) rotateZ(10deg)',
          filter: 'blur(0.5px) brightness(1.2)'
        }}
      ></div>
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 transform rotate-45 opacity-30 animate-pulse rounded-lg shadow-2xl"
        style={{ 
          transform: 'perspective(1000px) rotateX(25deg) rotateY(25deg) rotate(45deg)',
          filter: 'blur(0.5px) brightness(1.15)'
        }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-35 animate-bounce shadow-xl"
        style={{ 
          animationDelay: "2s",
          transform: 'perspective(1000px) rotateX(30deg) rotateY(-15deg)',
          filter: 'blur(0.5px) brightness(1.25)'
        }}
      ></div>

      {/* Section Header */}
            {/* Section Header with enhanced effects */}
      <div className="relative text-center mb-20 z-10">
        <div className="inline-block mb-8 relative">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 transform hover:scale-110 hover:rotate-1 transition-all duration-700"
            style={{ 
              textShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
              filter: 'drop-shadow(0 4px 12px rgba(139, 92, 246, 0.4))'
            }}
          >
            Achievements
          </h2>
          <div className="w-40 h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse shadow-xl"
            style={{ 
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5), 0 8px 40px rgba(139, 92, 246, 0.3)'
            }}
          ></div>
        </div>
        <p className="text-xl md:text-2xl text-gray-700 mt-8 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in"
          style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          Milestones and recognition that showcase my journey and dedication
        </p>
      </div>

      {/* Achievements Grid */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            const orientation =
              imageOrientations[achievement.id] || "landscape";

            return (
                            <div
                key={achievement.id}
                className="group relative cursor-pointer"
                // onMouseEnter={() => setHoveredAchievement(achievement.id)}
                // onMouseLeave={() => setHoveredAchievement(null)}
                onClick={() => openModal(achievement)}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {/* Achievement Card with enhanced 3D effects */}
                <div className="relative perspective-1000">
                  <div 
                    className="relative bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-[1.05] hover:rotate-[1.5deg] hover:shadow-3xl shadow-2xl group-hover:shadow-indigo-500/30 border border-white/80"
                    style={{
                      boxShadow: '0 12px 50px rgba(99, 102, 241, 0.12), 0 4px 25px rgba(139, 92, 246, 0.08), 0 2px 12px rgba(0, 0, 0, 0.05)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Enhanced gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-8 group-hover:opacity-15 transition-opacity duration-500`}
                      style={{
                        background: `linear-gradient(135deg, ${achievement.color && achievement.color.includes('blue') ? '#60a5fa20' : achievement.color && achievement.color.includes('purple') ? '#a78bfa20' : '#f472b620'} 0%, transparent 100%)`
                      }}
                    ></div>

                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-25 transition-opacity duration-700 animate-pulse -z-10 blur-sm"></div>

                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-[#4e45d5]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                    {/* Achievement Image Section */}
                    <div className="relative group/image flex-grow">
                      <div
                        className={`relative overflow-hidden w-full ${
                          orientation === "portrait" ? "h-96" : "h-auto"
                        }`}
                      >
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className={`w-full h-full transition-all duration-700 group-hover:scale-110 ${
                            orientation === "portrait"
                              ? "object-contain bg-gray-100 p-4"
                              : "object-cover"
                          }`}
                          style={{
                            objectPosition:
                              orientation === "portrait"
                                ? "center top"
                                : "center center",
                          }}
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r ${achievement.color} text-white shadow-lg backdrop-blur-sm`}
                          >
                            {achievement.category}
                          </span>
                        </div>

                        {/* Achievement Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-4 left-4 right-4 z-10">
                          <div className="flex items-center justify-between">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${achievement.color} text-white shadow-lg`}
                            >
                              {achievement.achievement}
                            </span>
                            <div className="flex items-center text-white text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {achievement.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Details Section */}
                    <div className="relative p-6 md:p-8 z-10">
                      {/* Achievement Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-[#343d38] mb-2 group-hover:text-[#4e45d5] transition-colors duration-300">
                        {achievement.title}
                      </h3>

                      <p className="text-gray-600 mb-3 text-sm">
                        {achievement.issuer}
                      </p>

                      {/* Achievement Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300 line-clamp-2">
                        {achievement.description}
                      </p>

                      {/* Skills with Enhanced Effects */}
                      <div className="flex flex-wrap gap-2">
                        {achievement.skills
                          .slice(0, 4)
                          .map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-gradient-to-r from-white to-gray-50 text-[#343d38] rounded-full text-xs font-semibold border border-gray-200 hover:border-[#4e45d5] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                            >
                              {skill}
                            </span>
                          ))}
                        {achievement.skills.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                            +{achievement.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3D Shadow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${achievement.color} rounded-3xl transform translate-x-3 translate-y-3 opacity-15 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:opacity-25 transition-all duration-500 -z-10`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-3xl max-w-6xl w-full min-h-[80vh] max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300 z-10"
            >
              <span className="text-gray-600 text-xl">×</span>
            </button>

            {/* Modal Content */}
            <div className={`p-8`}>
              <div className={`grid md:grid-cols-2 gap-8`}>
                {/* Image Section */}
                <div
                  className={`relative flex items-between justify-center ${
                    imageOrientations[selectedCertificate.id] === "portrait"
                      ? "w-[70%] "
                      : ""
                  }`}
                >
                  <div
                    className={`w-full rounded-2xl shadow-lg overflow-hidden ${
                      imageOrientations[selectedCertificate.id] === "portrait"
                        ? "h-fit w-fit"
                        : "h-auto"
                    } flex items-center justify-center bg-gray-50`}
                  >
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className={`${
                        imageOrientations[selectedCertificate.id] === "portrait"
                          ? "object-cover w-full h-full"
                          : "object-cover w-full h-full"
                      }`}
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${selectedCertificate.color} opacity-10 rounded-2xl`}
                  />
                </div>

                {/* Details Section */}
                <div
                  className={`space-y-6 ${
                    imageOrientations[selectedCertificate.id] === "portrait"
                      ? ""
                      : ""
                  }`}
                >
                  <div>
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${selectedCertificate.color} text-white text-sm font-bold mb-4 `}
                    >
                      <selectedCertificate.icon className="w-4 h-4 mr-2" />
                      {selectedCertificate.achievement}
                    </div>
                    <h2 className="text-3xl font-bold text-[#343d38] mb-2">
                      {selectedCertificate.title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {selectedCertificate.issuer} • {selectedCertificate.date}
                    </p>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {selectedCertificate.description}
                  </p>

                  <div>
                    <h3 className="text-[#343d38] font-semibold mb-3">
                      Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1.5 bg-gradient-to-r ${selectedCertificate.color} text-white rounded-full text-xs font-medium shadow-md`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                      <span>Category: {selectedCertificate.category}</span>
                      <span>Year: {selectedCertificate.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .group/image:hover img {
          filter: brightness(1.05) contrast(1.05);
        }
      `}</style>
    </div>
  );
};

export default AchievementsSection;
