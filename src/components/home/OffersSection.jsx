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
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authority Infrastructure™<br />Implementation Sprint
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
            A focused 28-day build cycle designed to organize, structure, and operationalize your existing expertise.
          </p>
          <p className="text-lg md:text-xl text-white/60 font-light mt-6 max-w-2xl mx-auto">
            This is a contained execution environment for professionals who are ready to formalize what already exists.
          </p>
        </motion.div>
        
        <div className="space-y-24">
          {/* Who This Is For */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="border-t border-white/10 pt-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
              Who This Is For
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              This sprint is designed for operators who:
            </p>
            <div className="space-y-5 text-lg text-white/70 leading-relaxed pl-6">
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Already have experience, offers, or client work</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Have a method (formal or informal)</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Are ready to structure and refine their delivery</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Want clarity in how their work flows and routes</span>
              </div>
            </div>
            <p className="text-lg text-white/60 leading-relaxed mt-8 italic">
              This is not about inventing something new.<br />
              It's about structuring what's already there.
            </p>
          </motion.div>

          {/* What Happens Inside */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="border-t border-white/10 pt-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Happens Inside
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Over 28 days, you will:
            </p>
            <div className="space-y-5 text-lg text-white/70 leading-relaxed pl-6">
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Clarify and formalize your method</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Organize current assets and delivery structure</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Align pricing and positioning with reality</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Establish routing logic for offers and next steps</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-3 flex-shrink-0"></span>
                <span>Build a cleaner execution pathway</span>
              </div>
            </div>
            <p className="text-lg text-white/60 leading-relaxed mt-8">
              The sprint is structured, contained, and time-bound.
            </p>
          </motion.div>

          {/* Entry Pathways */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="border-t border-white/10 pt-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
              Entry Pathways
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Standard Entry
                </h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  Most participants enter through the Authority Infrastructure™ Focus Group.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  The Focus Group helps determine readiness and alignment.
                </p>
                <Link
                  to={createPageUrl("FocusGroup")}
                  className="mt-8 inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
                >
                  Join the Focus Group →
                </Link>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Direct Entry
                </h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  In select cases, experienced operators may qualify for direct entry into the Sprint.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  This pathway is available for those with demonstrated experience and structured assets.
                </p>
                <Link
                  to={createPageUrl("Apply")}
                  className="mt-8 inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
                >
                  Request Direct Entry →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Scope */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="border-t border-white/10 pt-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
              Scope
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              This sprint focuses on structured implementation and refinement.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              It does not include:
            </p>
            <div className="space-y-5 text-lg text-white/60 leading-relaxed pl-6">
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-3 flex-shrink-0"></span>
                <span>Custom system builds</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-3 flex-shrink-0"></span>
                <span>Done-for-you execution</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-3 flex-shrink-0"></span>
                <span>Ongoing advisory retainers</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-3 flex-shrink-0"></span>
                <span>Therapy, mindset, or emotional processing work</span>
              </div>
            </div>
            <p className="text-lg text-white/60 leading-relaxed mt-8">
              Participants are expected to execute independently within the structure provided.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}