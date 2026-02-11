import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-16 lg:px-24 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            <h2 
              className="text-2xl md:text-3xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Heartset Design
            </h2>
            <p className="text-sm text-white/40 font-light">
              Consulting · Strategy · Systems
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <Link 
              to={createPageUrl("Contact")}
              className="text-white/50 hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Heartset Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}