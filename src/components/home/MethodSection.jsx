import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MethodSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const steps = [
    { number: "01", title: "Extract the proprietary framework" },
    { number: "02", title: "Validate it with real professionals" },
    { number: "03", title: "Systematize delivery and outcomes" },
    { number: "04", title: "Secure legal + IP footing" },
    { number: "05", title: "Prepare for institutional or scalable adoption" }
  ];
  
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
            The Method
          </p>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Architected Authority™ Method
          </h2>
        </motion.div>
        
        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="group border-t border-black/10 py-8 flex items-baseline gap-8 hover:bg-black/[0.02] transition-colors duration-500 px-4 -mx-4"
            >
              <span className="text-xs text-black/30 font-mono w-8">
                {step.number}
              </span>
              <p className="text-xl md:text-2xl text-black/80 font-light group-hover:text-black transition-colors duration-300">
                {step.title}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-black/10" />
        </div>
      </div>
    </section>
  );
}