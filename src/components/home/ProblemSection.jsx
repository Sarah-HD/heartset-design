import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const problems = [
    "Expertise without structure",
    "Revenue tied to labor",
    "Frameworks without protection",
    "Launches without validation",
    "Authority without leverage"
  ];
  
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            The Problem
          </p>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Experts Get Stuck
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <span className="w-2 h-2 bg-white/30 rounded-full" />
                <p className="text-lg md:text-xl text-white/70 font-light">
                  {problem}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-end"
          >
            <div className="border-t border-white/20 pt-8 mt-8 md:mt-0">
              <p className="text-2xl md:text-3xl text-white/50 font-light leading-relaxed">
                You don't need more content.
              </p>
              <p 
                className="text-2xl md:text-3xl text-white mt-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                You need <span className="italic">architecture.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}