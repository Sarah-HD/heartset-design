import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      {/* Header */}
      <header className="px-6 md:px-16 lg:px-24 py-8 border-b border-black/5">
        <Link 
          to={createPageUrl("Home")}
          className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>
      
      <main className="px-6 md:px-16 lg:px-24 py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
              Contact
            </p>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              General Inquiries
            </h1>
            
            <p className="text-lg text-black/60 font-light leading-relaxed mb-12 max-w-2xl">
              Heartset Design partners with professionals who already carry expertise 
              and are ready to structure it into systems that scale.
            </p>
            
            <p className="text-base text-black/50 font-light mb-16 max-w-2xl">
              For those still building foundations, we're glad to share referrals 
              and resources aligned with your stage.
            </p>
          </motion.div>
          
          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-black/10 mb-16 origin-left"
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 
              className="text-2xl md:text-3xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Before You Reach Out
            </h2>
            
            <p className="text-base text-black/50 font-light mb-16 max-w-2xl leading-relaxed">
              Heartset Design works primarily with credentialed experts developing 
              proprietary frameworks, focus group validation, and scalable authority systems.
              <br /><br />
              If you're seeking focused strategic clarity, legal alignment, or next-step 
              guidance, you may request a 15-minute session below.
            </p>
          </motion.div>
          
          {/* Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h3 
              className="text-xl mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Choose Your Path
            </h3>
            
            <div className="space-y-6">
              <a 
                href="#"
                className="group block border border-black/10 p-8 hover:border-black/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Book a 15-Minute Strategy Session
                    </h4>
                    <p className="text-sm text-black/50 font-light">
                      For professionals seeking clarity on frameworks, validation, or legal positioning.
                    </p>
                  </div>
                  <span className="text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-700" />
              </a>
              
              <a 
                href="#"
                className="group block border border-black/10 p-8 hover:border-black/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      General Inquiry
                    </h4>
                    <p className="text-sm text-black/50 font-light">
                      For referrals, collaborations, press, or non-program questions.
                    </p>
                  </div>
                  <span className="text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-700" />
              </a>
              
              <Link 
                to={createPageUrl("Referral")}
                className="group block border border-black/10 p-8 hover:border-black/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Referred for Web Design?
                    </h4>
                    <p className="text-sm text-black/50 font-light">
                      If you were referred by a colleague specifically for web or design services.
                      <br />
                      <span className="italic text-black/40">(Design engagements are limited and accepted selectively.)</span>
                    </p>
                  </div>
                  <span className="text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-700" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 border-t border-black/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p 
            className="text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Heartset Design
          </p>
          <p className="text-xs text-black/40">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}