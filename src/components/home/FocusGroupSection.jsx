import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FocusGroupSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Join the Focus Group
          </h2>
          
          <p className="text-lg text-black/50 font-light mb-12 max-w-xl mx-auto">
            Our focus groups are working sessions for credentialed professionals validating frameworks, 
            language, and delivery models in real time.<br /><br />
            Participation is limited and requires confirmation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to={createPageUrl("FocusGroup")}
              className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm tracking-wide hover:bg-black/90 transition-all duration-300"
            >
              <span>Join the Focus Group</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            
            <Link
              to={createPageUrl("Apply")}
              className="group inline-flex items-center gap-3 border border-black/20 text-black px-10 py-5 text-sm tracking-wide hover:border-black transition-all duration-300"
            >
              <span>Apply for Authority Infrastructure™</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}