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
          <p className="text-2xl md:text-3xl mb-6 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
            $6,950
          </p>
          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-12">
            Delivered through a credentialed focus group designed to validate and convert your existing expertise into a structured authority system.
          </p>
          <Link
            to={createPageUrl("Sprint6500")}
            className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-300"
          >
            Learn More →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}