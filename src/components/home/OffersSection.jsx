import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function OffersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authority Infrastructure™ Implementation Sprint
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto">
            A structured 28-day execution sprint for operators with existing expertise.
          </p>
        </motion.div>
        
        <div className="space-y-16">
          {/* Who This Is For */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Who This Is For</h3>
            <p className="text-white/70 leading-relaxed">
              This sprint is designed for professionals who already have experience, methods, or assets and need to organize, validate, and route them into a functional system.
            </p>
            <p className="text-white/70 leading-relaxed mt-4">
              This is not a beginner program and does not involve brainstorming or idea generation.
            </p>
          </motion.div>

          {/* What Happens Inside */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>What Happens Inside</h3>
            <ul className="space-y-4 text-white/70 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>Organizing existing methods and assets</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>Validating demand and delivery reality</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>Establishing routing logic for offers and next steps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>All work is execution-based and time-contained.</span>
              </li>
            </ul>
          </motion.div>

          {/* How Entry Works */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>How Entry Works</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-medium mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Standard Entry</h4>
                <p className="text-white/70 leading-relaxed">
                  Most participants enter through the Authority Infrastructure™ Focus Group. The Focus Group determines readiness and appropriate next steps.
                </p>
                <Link
                  to={createPageUrl("FocusGroup")}
                  className="mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
                >
                  Join the Focus Group →
                </Link>
              </div>
              <div>
                <h4 className="text-xl font-medium mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Direct Entry (Restricted)</h4>
                <p className="text-white/70 leading-relaxed">
                  In limited cases, experienced operators may qualify for direct entry into the Sprint. Direct entry is not public and requires verification.
                </p>
                <Link
                  to={createPageUrl("Apply")}
                  className="mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
                >
                  Request Direct Entry →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* What This Is Not */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>What This Is Not</h3>
            <ul className="space-y-4 text-white/70 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>Not a custom build or done-for-you service</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>Not strategy creation from scratch</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>Not mindset coaching or emotional support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>Not tech setup or platform management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0"></span>
                <span>Participation requires independent execution.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}