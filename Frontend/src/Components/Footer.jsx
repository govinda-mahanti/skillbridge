import React from 'react'
import logo from "../assets/logo.png"

const Footer = () => (
  <footer className="bg-gradient-to-br from-[#0f0b23] via-[#120e2d] to-[#0a0c2e] text-gray-300">
    <div className="container mx-auto px-6 py-12">

      <div className="grid md:grid-cols-3 gap-10">
        
        {/* LOGO + DESCRIPTION */}
        <div>
          <img src={logo} alt="NidhiBook" className="h-13 mb-3" />
          <p className="text-sm text-gray-400 leading-relaxed">
            Explore VR & AR virtual labs and build real-world immersive skills.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Pages
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-purple-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-purple-400 transition">About Us</a></li>
            <li><a href="/labs" className="hover:text-purple-400 transition">Labs</a></li>
          </ul>
        </div>

        {/* SUPPORT (optional small section) */}
        <div>
          <h4 className="font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:text-purple-400 transition">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-10 border-t border-purple-900/30 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SkillBridge XR. All rights reserved.</p>
      </div>

    </div>
  </footer>
);

export default Footer
