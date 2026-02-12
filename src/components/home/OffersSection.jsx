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
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authority Infrastructure™
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
            A 28-day authority validation sprint for operators ready to structure, test, and convert their existing expertise.
          </p>
          <div className="mt-12">
            <p className="text-3xl md:text-4xl mb-8 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              $6,950
            </p>
            <Link
              to={createPageUrl("Sprint6500")}
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
            >
              Learn More →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}