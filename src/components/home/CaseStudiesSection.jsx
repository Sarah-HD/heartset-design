import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CaseStudiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const cases = [
    {
      id: "nonprofit-fundraising",
      category: "Institutional & Nonprofit Strategy",
      title: "Nonprofit Fundraising Strategy",
      subtitle: "Institutional Partnership Momentum",
      clientType: "Nonprofit Organization",
      challenge: "Strong mission and community impact, but fundraising language and visual strategy were not aligned with institutional decision-makers.",
      applied: [
        "Reframed program narrative for financial institutions and corporate partners",
        "Redesigned fundraising visuals to meet institutional review standards",
        "Structured a long-term partnership ask aligned with sustainability goals"
      ],
      outcome: [
        "Secured a second-stage meeting with a large Ohio-based credit union",
        "Invited to submit full program materials for internal review",
        "Formal $50,000 partnership request presented",
        "Organization entered active collaboration consideration"
      ],
      whyMatters: "Shifted the organization from grassroots fundraising to institutional partnership positioning."
    },
    {
      id: "hospital-cafe",
      category: "Institutional Partnerships & Launch Strategy",
      title: "Children's Hospital Café Launch",
      subtitle: "High Internal Engagement",
      clientType: "Food & Beverage Concept (Institutional Partnership)",
      challenge: "Launching a new café inside a major hospital system required internal alignment, compliance awareness, and employee buy-in.",
      applied: [
        "Supported partnership pathway with one of the nation's largest children's hospitals",
        "Aligned launch strategy with institutional communication standards",
        "Designed employee-facing rollout and appreciation initiative"
      ],
      outcome: [
        "Successful café launch inside the hospital system",
        "Highest engagement rate among two new franchise launches",
        "Leveraged internal employee newsletter for visibility",
        "Strong internal adoption and participation"
      ],
      whyMatters: "Institutional launches succeed through internal trust—not external hype."
    },
    {
      id: "consultant-rebrand",
      category: "Professional Services & Revenue Systems",
      title: "Consultant Rebrand + Strategic Outreach",
      subtitle: "21 Qualified Leads",
      clientType: "Consultant / Service Professional",
      challenge: "Strong technical skill set, weak positioning, inconsistent client acquisition.",
      applied: [
        "Clarified niche authority positioning",
        "Designed confidence-based outreach language",
        "Implemented a curated, high-intent lead vetting system"
      ],
      outcome: [
        "100 targeted outreach messages",
        "80 responses",
        "21 highly qualified leads",
        "Increased inbound credibility post-rebrand"
      ],
      whyMatters: "Authority converts faster than volume marketing."
    },
    {
      id: "workshop-launch",
      category: "Professional Services & Revenue Systems",
      title: "First Workshop Launch",
      subtitle: "Duplicated Revenue System",
      clientType: "Career Transitioner (Tech → Business)",
      background: "Client spent nearly 20 years in Quality Assurance (QA) within the tech industry before transitioning into entrepreneurship.",
      challenge: "No audience list, no launch experience, limited confidence in selling.",
      applied: [
        "Designed a 1-hour paid workshop format",
        "Activated warm network through direct outreach",
        "Positioned the workshop as an exclusive first experience",
        "Structured the launch to be repeatable, not one-off"
      ],
      outcome: [
        "First workshop: $170 profit in one hour",
        "Second workshop (duplicated system): $230 profit",
        "Ticket sales increased by ~20%",
        "8 new attendees added to the second session",
        "Zero paid ads or funnels used"
      ],
      whyMatters: "Client learned she could generate repeatable revenue from expertise—without marketing complexity."
    },
    {
      id: "social-enterprise",
      category: "Social Enterprise & Monetization Strategy",
      title: "Community Event → Revenue-Generating Social Enterprise",
      subtitle: "MBA (Industrial–Organizational Psychology)",
      clientType: "MBA, Psychology (Industrial–Organizational)\nAuthor, Speaker, Community Leader",
      challenge: "Client was hosting business lunches informally—low pricing, no monetization structure, no long-term revenue model.",
      applied: [
        "Reframed events as a social enterprise, not a meetup",
        "Introduced tiered ticket pricing (general, sponsor, partner)",
        "Integrated curriculum and book ecosystem",
        "Aligned language for grant and institutional funding eligibility"
      ],
      outcome: [
        "$1,000 cash profit from first restructured event",
        "$5,000 secured in grant funding (health/community sector)",
        "Increased book sales during launch window",
        "Interest in bulk curriculum purchases from educators"
      ],
      whyMatters: "Client transitioned from hosting events to operating a mission-driven revenue engine."
    }
  ];
  
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
            Case Studies
          </p>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Proof in Practice
          </h2>
          <p className="text-sm text-black/40 font-light italic max-w-2xl">
            Selected engagements demonstrating revenue generation, institutional alignment, and scalable authority systems.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Accordion type="single" collapsible className="space-y-0">
            {cases.map((study, index) => (
              <AccordionItem 
                key={study.id} 
                value={study.id}
                className="border-t border-black/10 last:border-b"
              >
                <AccordionTrigger className="py-8 px-4 hover:bg-black/[0.02] transition-colors duration-300 text-left hover:no-underline group">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-xs font-mono text-black/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 
                        className="text-lg md:text-xl text-black group-hover:text-black transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {study.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-black/50 font-light ml-8">
                      {study.subtitle}
                    </p>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 pb-8 pt-2">
                  <div className="ml-8 space-y-6 text-black/70">
                    <div>
                      <p className="text-xs tracking-wide uppercase text-black/40 mb-2">
                        Client Type
                      </p>
                      <p className="text-sm md:text-base font-light whitespace-pre-line">
                        {study.clientType}
                      </p>
                    </div>
                    
                    {study.background && (
                      <div>
                        <p className="text-xs tracking-wide uppercase text-black/40 mb-2">
                          Background
                        </p>
                        <p className="text-sm md:text-base font-light">
                          {study.background}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs tracking-wide uppercase text-black/40 mb-2">
                        Challenge
                      </p>
                      <p className="text-sm md:text-base font-light">
                        {study.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs tracking-wide uppercase text-black/40 mb-3">
                        Authority Infrastructure Applied
                      </p>
                      <ul className="space-y-2">
                        {study.applied.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm md:text-base font-light">
                            <span className="text-black/30 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-xs tracking-wide uppercase text-black/40 mb-3">
                        Outcome
                      </p>
                      <ul className="space-y-2">
                        {study.outcome.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm md:text-base font-light">
                            <span className="text-black/30 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t border-black/5 pt-6 mt-8">
                      <p className="text-xs tracking-wide uppercase text-black/40 mb-2">
                        Why This Matters
                      </p>
                      <p className="text-base md:text-lg font-light text-black italic">
                        {study.whyMatters}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <p className="text-xs text-black/30 text-center mt-12 italic">
            Additional case studies available upon request.
          </p>
        </motion.div>
      </div>
    </section>
  );
}