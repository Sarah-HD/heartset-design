import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";

export default function Apply() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      {/* Header */}
      <header className="px-6 md:px-16 lg:px-24 py-8 border-b border-white/10">
        <Link 
          to={createPageUrl("Home")}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
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
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              Application
            </p>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Apply for the<br />
              <span className="italic text-white/70">Framework</span>
            </h1>
            
            <p className="text-lg text-white/60 font-light leading-relaxed max-w-2xl">
              Complete the application below. We review submissions within 72 hours 
              and will reach out if there's alignment.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="border border-white/10 p-12 text-center">
              <p className="text-white/50 mb-6">Application form coming soon</p>
              <p className="text-sm text-white/30 font-light">
                In the meantime, reach out via the contact page.
              </p>
              <Link
                to={createPageUrl("Contact")}
                className="inline-flex items-center gap-2 mt-8 text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                <span className="w-6 h-px bg-current" />
                <span>Go to Contact</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p 
            className="text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Heartset Design
          </p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}