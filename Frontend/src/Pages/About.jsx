import React, { useState } from "react";
import arvind from "../assets/arvind.jpg";
import saumik from "../assets/saumik.jpg";
import govinda from "../assets/govinda.jpg";
import atharva from "../assets/atharva.jpg";  

const About = () => {
  const [showInfo, setShowInfo] = useState(false);

  const teams = [
    {
      _id: 1,
      image: arvind,
      name: "Arvind Kumar Sahu",
      designation: "XR Developer",
    },
    {
      _id: 2,
      image: govinda,
      name: "Govinda Mahanti",
      designation: "Full Stack Developer",
    },
    {
      _id: 3,
      image: saumik,
      name: "Saumik Chakrabort",
      designation: "AI/ML Developer",
    },
    {
      _id: 4,
      image: atharva,
      name: "Atharva Singh",
      designation: "UI/UX Developer",
    },
  ];

  return (
    <div className="text-white min-h-screen px-6 lg:px-16 py-12 pt-[64px]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-purple-400 mb-6">About Us</h1>
        <p className="text-lg leading-relaxed mb-10 text-gray-200">
          <span className="font-semibold text-purple-300">SkillBridge XR</span> 
          is an immersive learning platform designed to transform practical education 
          through Virtual Reality (VR) and Augmented Reality (AR). We create 
          interactive virtual laboratories where students can perform real engineering 
          experiments without the need for physical equipment.
        </p>

        {/* Vision Section */}
        <section className="space-y-6">

          <p className="text-gray-200 leading-relaxed">
            Our mission is to revolutionize hands-on learning by integrating  
            <span className="text-purple-300 font-medium"> XR (AR & VR), AI analytics,</span> 
            and scalable web technologies. SkillBridge XR provides safe, 
            affordable, and accessible skill development for students — especially in 
            rural and semi-urban institutions where lab resources are limited.
          </p>

          <p className="text-gray-200 leading-relaxed">
            Through AI-driven performance tracking, the system offers 
            <span className="font-semibold text-purple-300"> personalized guidance, adaptive feedback,</span> 
            and real-time assistance, ensuring that each learner progresses at their 
            own pace while gaining confidence in technical skills.
          </p>

          {/* Four Key Features */}
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>
              <span className="text-purple-300 font-medium">
                Immersive Virtual Laboratories:
              </span>{" "}
              Perform real engineering experiments inside a safe, interactive VR/AR environment.
            </li>

            <li>
              <span className="text-purple-300 font-medium">
                AI-Powered Skill Assessment:
              </span>{" "}
              Receive personalized insights and adaptive feedback based on performance.
            </li>

            <li>
              <span className="text-purple-300 font-medium">
                Accessibility for All Institutions:
              </span>{" "}
              Designed to support schools with limited lab infrastructure, especially rural areas.
            </li>

            <li>
              <span className="text-purple-300 font-medium">
                Real Engineering Workflows:
              </span>{" "}
              Experience step-by-step procedures, tool handling, and experiment logic — not just animations.
            </li>
          </ul>
        </section>

        {/* Team Section */}
        <section className="mt-10">
          <p className="text-gray-200 leading-relaxed">
            We are a{" "}
            <span className="font-semibold text-purple-300">
              team of XR developers, AI engineers, and full-stack innovators
            </span>{" "}
            committed to redefining the future of practical education. Our goal is to make 
            hands-on engineering training accessible, scalable, and future-ready for every learner.
          </p>
        </section>

        {/* Team Cards */}
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-purple-400 text-4xl font-bold mb-12">
              Our Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center">
              {teams.map((member) => (
                <div
                  key={member._id}
                  className="w-52 h-64 bg-white rounded-md shadow-lg overflow-hidden relative group cursor-pointer"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  
                  {/* Info Section */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-end bg-blue-50 z-0 p-3 transition-opacity duration-500
                    ${showInfo ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
                  >
                    <p className="text-black font-medium text-base">{member.name}</p>
                    <p className="text-gray-700 text-sm">{member.designation}</p>
                  </div>

                  {/* Profile Image */}
                  <div className="flex items-center justify-center h-full transform transition-transform duration-500 group-hover:-translate-y-1/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <section className="mt-10 border-t border-purple-800 pt-6">
          <p className="text-lg text-center text-purple-200 italic">
            SkillBridge XR is shaping a future where every student — regardless of 
            location — can access world-class practical learning and develop real 
            engineering skills.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
