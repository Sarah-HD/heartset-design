import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 relative overflow-hidden">
      {/* Subtle architectural line accent */}
      <div className="absolute top-0 right-0 w-px h-full bg-white/10" />
      <div className="absolute top-1/3 right-12 w-24 h-px bg-white/20 hidden lg:block" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs tracking-[0.3em] uppercase text-white/50 mb-8"
        >
          Heartset Design
        </motion.p>
        
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Framework Architecture<br />
          <span className="italic text-white/70">for Expertise That Scales</span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-12 font-light"
        >
          We help experienced professionals turn lived expertise into proprietary frameworks, 
          validate them through focus groups, and build systems prepared for scale — 
          without ads, funnels, or legal risk.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start"
        >
          <Link
            to={createPageUrl("Apply")}
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            <span>Apply for the Framework</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          
          <Link
            to={createPageUrl("FocusGroup")}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-300 py-4"
          >
            <span className="w-8 h-px bg-current" />
            <span>Join the Focus Group</span>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}