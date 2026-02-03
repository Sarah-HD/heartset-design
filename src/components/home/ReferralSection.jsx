import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ReferralSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-20 px-6 md:px-16 lg:px-24 bg-neutral-100 border-t border-black/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h3 
              className="text-xl md:text-2xl mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Referred by a Colleague?
            </h3>
            <p className="text-sm text-black/50 font-light max-w-md">
              If you were directed here for a specific engagement — including web, systems, 
              or strategic design — submit a referral inquiry below.<br />
              <span className="italic text-black/40">Design engagements are limited and accepted selectively.</span>
            </p>
          </div>
          
          <Link
            to={createPageUrl("Referral")}
            className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors duration-300 whitespace-nowrap"
          >
            <span className="w-6 h-px bg-current" />
            <span>Referral Intake Form</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}