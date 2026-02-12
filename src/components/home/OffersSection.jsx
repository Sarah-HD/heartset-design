import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";

export default function OffersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl mb-20 leading-tight text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Authority Infrastructure™
            <br />
            Pathways
          </h1>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Sprint - $6,950 */}
            <div>
              <h2 
                className="text-3xl md:text-4xl mb-3 leading-tight pb-3 border-b-2 border-white inline-block"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                $6,950
              </h2>
              <p className="text-2xl md:text-3xl mt-6 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Authority Infrastructure™
              </p>
              <p className="text-base text-white/60 font-light leading-relaxed mb-6">
                Delivered through a credentialed focus group designed to validate and convert your existing expertise into a structured authority system.
              </p>
              <Link
                to={createPageUrl("Sprint6500")}
                className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-300"
              >
                Learn More →
              </Link>
            </div>

            {/* Advisory - By Application */}
            <div>
              <h2 
                className="text-3xl md:text-4xl mb-3 leading-tight pb-3 border-b-2 border-white inline-block"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                By Application
              </h2>
              <p className="text-2xl md:text-3xl mt-6 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Private Advisory
              </p>
              <p className="text-base text-white/60 font-light leading-relaxed mb-6">
                For established professionals with proven frameworks, documented outcomes, and strategic positioning goals.
              </p>
              <Link
                to={createPageUrl("Apply10000")}
                className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-300"
              >
                Apply Now →
              </Link>
            </div>

            {/* Infrastructure - Custom Scope */}
            <div>
              <h2 
                className="text-3xl md:text-4xl mb-3 leading-tight pb-3 border-b-2 border-white inline-block"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Custom Scope
              </h2>
              <p className="text-2xl md:text-3xl mt-6 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Full Infrastructure
              </p>
              <p className="text-base text-white/60 font-light leading-relaxed mb-6">
                Comprehensive system architecture for established practitioners ready to operationalize their entire authority platform.
              </p>
              <Link
                to={createPageUrl("Apply")}
                className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-300"
              >
                Inquire →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}