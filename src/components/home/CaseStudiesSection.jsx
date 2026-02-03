import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CaseStudiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const cases = [
    {
      title: "Nonprofit Consultant",
      outcome: "Donor framework refined → second funding meeting secured"
    },
    {
      title: "Licensed Social Worker (MSW)",
      outcome: "100 targeted outreaches → 21 qualified leads → paid workshops"
    },
    {
      title: "Health Educator",
      outcome: "$1,000 direct revenue + $3,000 grant funding using social enterprise structure"
    }
  ];
  
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
            Case Studies
          </p>
          <p className="text-base text-black/50 font-light mt-4 max-w-2xl">
            Selected examples of frameworks and systems developed across nonprofit, education, and professional services.
          </p>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Proof of Application
          </h2>
        </motion.div>
        
        <div className="space-y-12">
          {cases.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.7 }}
              className="border-l-2 border-black/20 pl-8 md:pl-12 py-4 hover:border-black transition-colors duration-500"
            >
              <h3 
                className="text-lg md:text-xl mb-3 text-black"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {study.title}
              </h3>
              <p className="text-base md:text-lg text-black/60 font-light leading-relaxed">
                {study.outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}