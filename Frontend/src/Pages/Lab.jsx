import React, { useState } from "react";
import { Eye, Cpu, Sparkles, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lab = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const navigate = useNavigate();

  const modules = [
    { id: "ar", name: "AR", icon: Eye, color: "from-pink-500 to-rose-500" },
    { id: "vr", name: "VR", icon: Cpu, color: "from--500 to-cyan-500" },
    {
      id: "ai",
      name: "AI",
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
    },
  ];

   // 🔥 Handle Button Click Action
  const handleModuleClick = (moduleId) => {
    setSelectedModule(moduleId);

    if (moduleId === "ar") {
      window.open("https://drive.google.com", "_blank");
    } 
    else if (moduleId === "vr") {
      window.open("https://drive.google.com", "_blank");
    } 
    else if (moduleId === "ai") {
      navigate("/advisor");
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Full Width Lab Image */}
      <div className="w-full h-64 md:h-96 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop"
          alt="Lab Equipment"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Lab Info Section with Name and Module Buttons */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-purple-600/90 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left: Lab Name and Description */}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Advanced Technology Lab
              </h1>

              <p className="text-lg md:text-xl text-purple-100 font-medium mb-2">
                Innovation Center for Emerging Technologies
              </p>

              <p className="text-base text-purple-200">
                Exploring AR, VR, AI and cutting-edge research initiatives
              </p>
            </div>

            {/* Right: Module Buttons */}
            <div className="flex gap-3 flex-wrap md:flex-nowrap">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => handleModuleClick(module.id)}
                    className={`bg-gradient-to-br ${module.color} text-white rounded-xl px-4 py-3 md:px-6 md:py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-2 min-w-20 md:min-w-24`}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="text-xs md:text-sm font-bold tracking-wide">
                      {module.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
    <div className="max-w-7xl mx-auto px-4 mt-6 pb-12 relative">
  <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl"></div>

  <div
    className="rounded-2xl shadow-lg p-6 md:p-8 bg-black/10
    backdrop-blur-2xl
    bg-gradient-to-br from-black/10 to-black/5
    border-5 border-[#ad46ff]"
  >
    <h2 className="text-2xl font-bold text-white mb-4">
      About the Lab
    </h2>

    <p className="text-gray-200 leading-relaxed mb-6">
      Our state-of-the-art laboratory is dedicated to advancing research
      in emerging technologies including Artificial Intelligence, Virtual
      Reality, and Augmented Reality. We provide a collaborative
      environment where innovation meets practical application, equipped
      with cutting-edge tools and resources for researchers, students, and
      industry partners.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mt-8">

      {/* Video Section */}
      <div className="rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-300 mb-4">
          Lab Tour Video
        </h3>

        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          {/* <video
            className="w-full h-full object-cover"
            controls
            // poster="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop"
          >
            <source src="https://www.youtube.com/watch?v=RU_DvmNpMeI" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}

          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/RU_DvmNpMeI"
    title="Lab Video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>

        </div>

        <p className="text-sm text-gray-300 mt-3">
          Watch a virtual tour of our state-of-the-art facilities and equipment
        </p>
      </div>

      {/* PDF Download Section */}
      <div className="rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-300 mb-4">
          Lab Module Documentation
        </h3>

        <div className="rounded-lg border-2 border-dashed border-purple-400 p-6 text-center hover:border-purple-500 transition-colors">
          <div className="text-6xl mb-4 text-white">📄</div>

          <h4 className="text-lg font-semibold text-white mb-2">
            Lab Module Guide
          </h4>

          <p className="text-sm text-gray-300 mb-4">
            Complete documentation for all lab modules including AR, VR,
            AI, and Lab procedures
          </p>

          <button
            onClick={() => alert("Downloading Lab Module PDF...")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </button>

          <p className="text-xs text-gray-400 mt-3">PDF • 2.5 MB</p>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Selected Module Alert */}
      {selectedModule && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl z-50">
          <p className="text-lg font-semibold">
            Opening {selectedModule} Module...
          </p>
        </div>
      )}
    </div>
  );
};

export default Lab;
