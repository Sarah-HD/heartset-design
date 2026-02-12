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

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cohort-Based Engagement */}
            <Card className="bg-black border border-white/20 text-white">
              <CardContent className="p-8">
                <p className="text-xs font-medium text-white/60 tracking-widest uppercase mb-4">
                  COHORT-BASED ENGAGEMENT
                </p>
                <h2 
                  className="text-2xl md:text-3xl mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Authority Infrastructure™
                </h2>
                <p className="text-3xl md:text-4xl mb-6 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  $6,950
                </p>
                <p className="text-base text-white/60 font-light leading-relaxed mb-8">
                  Delivered through a credentialed focus group designed to validate and convert your existing expertise into a structured authority system.
                </p>
                <Link
                  to={createPageUrl("Sprint6500")}
                  className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-300"
                >
                  Learn More →
                </Link>
              </CardContent>
            </Card>

            {/* Private Advisory */}
            <Card className="bg-black border border-white/20 text-white">
              <CardContent className="p-8">
                <p className="text-xs font-medium text-white/60 tracking-widest uppercase mb-4">
                  PRIVATE ADVISORY
                </p>
                <h2 
                  className="text-2xl md:text-3xl mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Strategic Refinement
                </h2>
                <p className="text-3xl md:text-4xl mb-6 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  $10,000
                </p>
                <p className="text-base text-white/60 font-light leading-relaxed mb-2">
                  For operators who have already validated demand and are ready to refine, scale, and institutionalize their authority system.
                </p>
                <p className="text-sm text-white/40 font-light mb-8">
                  Application required.
                </p>
                <Link
                  to={createPageUrl("Apply")}
                  className="inline-block bg-white text-black px-6 py-2 text-sm tracking-wide hover:bg-white/90 transition-colors duration-300"
                >
                  Apply Now →
                </Link>
              </CardContent>
            </Card>

            {/* Full Infrastructure Build */}
            <Card className="bg-black border border-white/20 text-white">
              <CardContent className="p-8">
                <p className="text-xs font-medium text-white/60 tracking-widest uppercase mb-4">
                  FULL INFRASTRUCTURE
                </p>
                <h2 
                  className="text-2xl md:text-3xl mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Complete System Build
                </h2>
                <p className="text-3xl md:text-4xl mb-6 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Waitlist
                </p>
                <p className="text-base text-white/60 font-light leading-relaxed mb-2">
                  End-to-end authority infrastructure design and implementation — including offer architecture, automation, positioning systems, and technical execution.
                </p>
                <p className="text-sm text-white/40 font-light mb-8">
                  For professionals building long-term authority assets.
                </p>
                <Link
                  to={createPageUrl("Apply")}
                  className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-300"
                >
                  Join Waitlist →
                </Link>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}