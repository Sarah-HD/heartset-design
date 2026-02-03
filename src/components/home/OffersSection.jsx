import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function OffersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const tiers = [
    {
      tier: "Tier 1 — Cohort",
      title: "Framework + Focus Group Engine™",
      price: "$6,500",
      description: "Group-based, validated, system-led"
    },
    {
      tier: "Tier 2 — Strategic",
      title: "Framework Architecture (1:1)",
      price: "$10,000",
      description: "Private strategy, research alignment, refinement"
    },
    {
      tier: "Tier 3 — Built For You",
      title: "Authority Infrastructure",
      price: "$25,000",
      description: "Framework, validation engine, lead foundation, systems installed"
    }
  ];
  
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            Pathways
          </p>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Framework & Focus Group Pathways
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.7 }}
              className="group border border-white/10 p-8 md:p-10 hover:border-white/30 transition-all duration-500 relative"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-8">
                {tier.tier}
              </p>
              <h3 
                className="text-xl md:text-2xl mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {tier.title}
              </h3>
              <p className="text-3xl md:text-4xl mb-6 font-light">
                {tier.price}
              </p>
              <p className="text-sm text-white/50 font-light">
                {tier.description}
              </p>
              
              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <Link
            to={createPageUrl("Apply")}
            className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            <span>Apply for the Framework</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}