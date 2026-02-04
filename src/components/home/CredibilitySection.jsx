import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CredibilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-16 px-6 md:px-16 lg:px-24 bg-white border-t border-black/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
            Credibility
          </p>
          <p className="text-lg md:text-xl text-black/70 font-light mb-4">
            ★★★★★ 5-Star Client Rating · Design & Strategy Engagements · 10+ Years
          </p>
          <button className="text-xs text-black/30 hover:text-black/50 transition-colors duration-300 italic">
            Verified reviews available upon request
          </button>
        </motion.div>
      </div>
    </section>
  );
}