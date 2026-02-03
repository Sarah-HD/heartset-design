import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function DefinitionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          {/* Dictionary-style definition */}
          <div className="border-l-2 border-black pl-8 md:pl-12">
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              design
            </h2>
            <p className="text-sm tracking-wide text-black/40 mb-6">
              /dɪˈzaɪn/ <span className="italic">noun</span>
            </p>
            <p className="text-xl md:text-2xl text-black/70 leading-relaxed font-light">
              a system of intention, structure, and consequence — not decoration.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
          className="space-y-6 text-lg md:text-xl text-black/60 font-light leading-relaxed"
        >
          <p>
            At Heartset Design, design is not visual.
          </p>
          <p className="text-black">
            It is <span className="italic">institutional.</span>
          </p>
          <p className="text-black">
            It is <span className="italic">legal.</span>
          </p>
          <p className="text-black">
            It is <span className="italic">operational.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}