import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import HeroSection from "@/components/home/HeroSection";
import DefinitionSection from "@/components/home/DefinitionSection";
import ProblemSection from "@/components/home/ProblemSection";
import MethodSection from "@/components/home/MethodSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import OffersSection from "@/components/home/OffersSection";
import FocusGroupSection from "@/components/home/FocusGroupSection";
import ReferralSection from "@/components/home/ReferralSection";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <HeroSection />
      <DefinitionSection />
      <ProblemSection />
      <MethodSection />
      <CaseStudiesSection />
      <OffersSection />
      <FocusGroupSection />
      <ReferralSection />
      <Footer />
    </div>
  );
}