import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";

export default function Referral() {
  return (
    <div className="min-h-screen bg-neutral-50 text-black font-sans antialiased">
      {/* Header */}
      <header className="px-6 md:px-16 lg:px-24 py-8 border-b border-black/5 bg-white">
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
            className="mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
              Referral
            </p>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Referral<br />
              <span className="italic text-black/60">Intake Form</span>
            </h1>
            
            <p className="text-lg text-black/60 font-light leading-relaxed max-w-2xl">
              If you were referred by a colleague for a specific engagement including 
              web, systems, or strategic design, please complete the form below.
            </p>
            
            <p className="text-sm text-black/40 font-light mt-4 italic">
              Design engagements are limited and accepted selectively.
            </p>
          </motion.div>
          
          {/* Form placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="bg-white border border-black/10 p-12">
              <div className="space-y-8">
                <div>
                  <p className="text-sm text-black/40 mb-2">Information we'll need:</p>
                  <ul className="space-y-2 text-black/60 font-light">
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black/20 rounded-full" />
                      Who referred you?
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black/20 rounded-full" />
                      What were you referred for?
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black/20 rounded-full" />
                      Timeline for the engagement
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black/20 rounded-full" />
                      Budget range (optional)
                    </li>
                  </ul>
                </div>
                
                <div className="pt-8 border-t border-black/5 text-center">
                  <p className="text-black/50 mb-6">Referral form coming soon</p>
                  <p className="text-sm text-black/30 font-light">
                    In the meantime, reach out via the contact page and mention your referral source.
                  </p>
                  <Link
                    to={createPageUrl("Contact")}
                    className="inline-flex items-center gap-2 mt-8 text-sm text-black/60 hover:text-black transition-colors duration-300"
                  >
                    <span className="w-6 h-px bg-current" />
                    <span>Go to Contact</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 border-t border-black/5 bg-white mt-auto">
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