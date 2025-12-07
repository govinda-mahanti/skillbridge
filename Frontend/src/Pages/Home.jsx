import { Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import YogaModel from "../Components/YogaModel";

const FeatureCard = ({ name, image, shortInfo, details }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative h-72 sm:h-80 lg:h-80 w-full perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg overflow-hidden bg-[#1c1233]">
          <div className="relative h-full">
            <img
              src={image}
              alt={name}
              className="w-full h-32 sm:h-40 lg:h-48 object-cover"
            />

            <div className="p-4 lg:p-6">
              <h4 className="text-lg lg:text-xl font-bold text-white mb-2">
                {name}
              </h4>

              <p className="text-gray-300 text-xs sm:text-sm mb-2 lg:mb-4">
                {shortInfo}
              </p>
            </div>

            <button
              onClick={handleFlip}
              className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-purple-600 text-white p-1.5 sm:p-2 rounded-full hover:bg-purple-700 transition duration-300 shadow-lg"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-[#25143f] to-[#3b1a66]">
          <div className="p-4 lg:p-6 h-full flex flex-col">
            <h4 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">
              {name}
            </h4>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-grow overflow-y-auto">
              {details}
            </p>

            <button
              onClick={handleFlip}
              className="self-end bg-purple-600 text-white p-1.5 sm:p-2 rounded-full hover:bg-purple-700 transition duration-300 shadow-lg mt-2 sm:mt-4"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const faqs = [
  {
    question: "What is SkillBridge XR?",
    answer:
      "SkillBridge XR is an immersive VR/AR-based virtual lab platform that allows students to perform practical experiments digitally. It uses AI to guide learners, simulate real-world scenarios, and improve hands-on skill development without requiring physical lab equipment.",
  },
  {
    question: "Do students need a VR headset to use the platform?",
    answer:
      "A VR headset provides the best immersive experience, but the platform also supports desktop and mobile simulations. AR modules can be accessed using any smartphone with ARCore or ARKit support.",
  },
  {
    question: "How does the AI assistance work?",
    answer:
      "The AI Learning Assistant analyzes student actions, identifies mistakes, and provides real-time corrections. It personalizes the learning path by adjusting experiment difficulty, offering hints, and generating performance insights.",
  },
  {
    question: "Can institutions customize the virtual labs?",
    answer:
      "Yes, institutions can create custom experiment workflows, upload their own 3D assets, and define course-specific procedures. SkillBridge XR is designed to support flexible, curriculum-aligned virtual lab customization.",
  },
  {
    question:
      "Is SkillBridge XR suitable for rural and semi-urban institutions?",
    answer:
      "Absolutely. The platform is optimized for low-cost hardware, offline access modes, and scalable cloud deployment. It’s designed specifically to support institutions with limited physical lab infrastructure.",
  },
  {
    question: "What types of experiments can be performed in VR?",
    answer:
      "Students can conduct physics, chemistry, biology, mechanical, and electronics-based experiments. Additional modules like safety training, equipment handling, and industrial workflows are also available.",
  },
];

const HomePage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const navigate = useNavigate();
  const toggleFAQ = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div >
      {/* Main Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative">
        <div className="purple-glow-left"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Start Learning with Next-Gen
                  <span className="text-purple-500 block">VR & AR Labs</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  SkillBridge XR lets you explore virtual labs, practice
                  experiments, and build real skills through immersive
                  simulations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200 flex items-center space-x-3 mx-auto lg:mx-0 mb-12"
                >
                  <Rocket size={20} />
                  <span>Get Started</span>
                </button>
              </div>
            </div>

            {/* Right Model / Visual */}
            <div className="relative">
              <div className="relative z-5">
                <YogaModel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#160e2a]">
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>

        {/* Services Heading */}
        <div className="text-center mb-20 mt-20 px-4">
          <h2 className="text-5xl font-bold text-white mb-6">
            SkillBridge XR Features
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Immersive VR/AR-based virtual laboratories designed to enhance
            practical skill development through adaptive AI-driven learning.
          </p>
        </div>

        {/* Service Section 1 */}
        <div className="w-full mb-10">
          <div className="max-w-7xl relative">
             <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl"></div>
            <div
              className="
    flex flex-col lg:flex-row items-center 
    lg:rounded-r-full 
    shadow-xl 
    border-10 border-[#ad46ff] border-l-0 border-r-0 lg:border-r-10 
    overflow-hidden

    bg-black/10
    backdrop-blur-2xl
    bg-gradient-to-br from-black/10 to-black/5
  "
            >
              {/* Content */}
              <div className="w-full p-12 lg:p-16">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-white">
                    Institution XR Management
                  </h3>
                </div>

                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Provide students with next-generation virtual laboratories
                  that eliminate the need for physical equipment while enabling
                  safe, hands-on learning experiences through VR and AR.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Virtual Lab Dashboard
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Monitor student progress, experiment completion, and
                        competency levels.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Course & Experiment Management
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Create, assign, and update VR-based experiments and
                        modules.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        XR Environment Control
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Manage lab simulations, environment safety, and access
                        levels.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Skill Analytics & Reports
                      </h4>
                      <p className="text-gray-300 text-sm">
                        AI-generated insights revealing student learning
                        patterns and improvement areas.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition duration-300 font-semibold text-lg shadow-lg"
                  onClick={() => navigate("/clgregister")}
                >
                  Register Your Institution
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Service Section 2 */}
        <div className="w-full mb-10">
          <div className="max-w-7xl ml-auto relative">
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl"></div>
            <div
              className="
    flex flex-col lg:flex-row items-center 
    lg:rounded-l-full 
    shadow-xl 
    border-10 border-[#ad46ff] border-r-0 border-l-0 lg:border-l-10 
    overflow-hidden

    bg-black/10
    backdrop-blur-2xl
    bg-gradient-to-br from-black/10 to-black/5
  "
            >
              <div className="w-full p-12 lg:p-16">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mr-4 ml-5">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </div>

                  <h3 className="text-4xl font-bold text-white">
                    Student VR Learning Hub
                  </h3>
                </div>

                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Experience hands-on practical training in immersive VR
                  environments. Perform virtual experiments, receive real-time
                  AI guidance, and strengthen real-world skills safely and
                  effectively.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Interactive Virtual Labs
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Perform experiments in physics, chemistry, electronics,
                        and more using VR simulations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        AI-Based Assistance
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Get personalized hints, corrections, and adaptive
                        difficulty.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        AR Skill Tutorials
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Overlay AR instructions on real environments for
                        enhanced learning.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Learning Progress Dashboard
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Visualize your growth, experiment history, and skill
                        mastery.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition duration-300 font-semibold text-lg shadow-lg ml-auto"
                  onClick={() => navigate("/student/home")}
                >
                  Start Learning in XR
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#160e2a]">
        <div className="w-full px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-6">
                Platform Features
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore the advanced features that make SkillBridge XR a
                powerful, immersive VR/AR learning platform for hands-on skill
                development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                name="AI Learning Assistant"
                image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2070&q=80"
                shortInfo="Real-time adaptive learning support"
                details="Our AI-driven assistant provides instant feedback, identifies mistakes, and adjusts experiment difficulty based on learner performance. It guides students step-by-step through virtual experiments, ensuring deep understanding and skill mastery."
              />

              <FeatureCard
                name="VR Skill Labs"
                image="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=2070&q=80"
                shortInfo="Fully immersive virtual laboratories"
                details="Students can perform practical experiments in simulated physics, chemistry, electronics, and engineering environments. These VR labs replicate real-world equipment, enabling safe, low-cost, high-engagement learning experiences."
              />

              <FeatureCard
                name="AR Instruction Overlays"
                image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2070&q=80"
                shortInfo="Step-by-step AR guidance for real tasks"
                details="Augmented Reality overlays provide visual instructions, safety warnings, and step-by-step workflows in real time. Ideal for lab tutorials, equipment handling training, and technical skill development."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="text-gray-200 py-20 px-6 md:px-24 relative z-5"
        id="faq"
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl z-2"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl z-2"></div>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-12 text-center text-white"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl shadow-md border border-purple-600/40 bg-[#1c1233] hover:shadow-purple-500/30 transition-shadow duration-300"
              >
                <div
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="text-purple-500 flex-shrink-0">
                    {openFaqIndex === index ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-300 mt-4 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
