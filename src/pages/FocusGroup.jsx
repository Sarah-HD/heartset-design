import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";

export default function FocusGroup() {
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
            className="mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
              Participate
            </p>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Join the<br />
              <span className="italic text-black/60">Focus Group</span>
            </h1>
            
            <p className="text-lg text-black/60 font-light leading-relaxed max-w-2xl">
              Help validate frameworks developed by credentialed experts. Your participation 
              shapes methods that serve professionals like you.
            </p>
          </motion.div>
          
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-16"
          >
            <h2 
              className="text-xl mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What You'll Receive
            </h2>
            
            <div className="space-y-4">
              {[
                "Early access to validated frameworks",
                "Direct input on methodology development",
                "Priority consideration for future programs",
                "Connection with peer professionals"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-2 h-2 bg-black/20 rounded-full" />
                  <p className="text-base text-black/70 font-light">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="border border-black/10 p-12 text-center">
              <p className="text-black/50 mb-6">Focus group sign-up coming soon</p>
              <p className="text-sm text-black/30 font-light">
                In the meantime, reach out via the contact page to express interest.
              </p>
              <Link
                to={createPageUrl("Contact")}
                className="inline-flex items-center gap-2 mt-8 text-sm text-black/60 hover:text-black transition-colors duration-300"
              >
                <span className="w-6 h-px bg-current" />
                <span>Go to Contact</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 border-t border-black/5 mt-auto">
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