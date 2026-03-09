import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckSquare, Square, ExternalLink, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1QkAXrLgO32OgQaVv9IiNnC15chQwESO5Ik4lrqH3rrk/copy";

const downloads = [
  {
    label: "Outreach Tracker Template",
    sublabel: "Google Sheet",
    url: GOOGLE_SHEET_URL,
    type: "sheet"
  },
  {
    label: "Registration Form Questions",
    sublabel: "Google Doc",
    url: "https://docs.google.com/document/d/1sCdJ56HmW7XuayOwuiay7ISrbZKEg99QU-iEN5StVaQ/copy",
    type: "doc"
  },
  {
    label: "Post-Session Survey Questions",
    sublabel: "Google Doc",
    url: "https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/copy",
    type: "doc"
  },
  {
    label: "DM Outreach Templates",
    sublabel: "Google Doc",
    url: "https://docs.google.com/document/d/18f8qUAVB9yhyK_V-FMXhjNfShaUcc2zHgtLFJF4oRgA/edit?usp=sharing",
    type: "doc"
  },
  {
    label: "Focus Group Invite Email Templates",
    sublabel: "Google Doc",
    url: "https://docs.google.com/document/d/1p-yXIbWlkSiBLF14D71ODAKHU8XMzTw9wW2t8HRiZR4/edit?usp=sharing",
    type: "doc"
  },
  {
    label: "Post-Session Email Templates",
    sublabel: "Google Doc",
    url: "https://docs.google.com/document/d/1Sro7XPi7emxmkryNN3R7kO4DHPsCkBWcUkXGbsPkxpc/edit?usp=sharing",
    type: "doc"
  },
  {
    label: "LinkedIn Sales Navigator (Optional)",
    sublabel: "External Tool",
    url: "https://www.linkedin.com/help/linkedin/feature-launcher/urn:li:helpCenterArticle:(1355837,LITHOGRAPH)?trk=search_feature_launcher",
    type: "doc"
  },
  {
    label: "Slide Outline Template",
    sublabel: "Google Doc",
    url: "https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/copy",
    type: "doc"
  }
];

const checklist = [
  { id: "lock_date", label: "Lock Focus Group Date" },
  { id: "tracker", label: "Duplicate Outreach Tracker Template" },
  { id: "reg_form", label: "Customize Registration Form" },
  { id: "outreach_msgs", label: "Draft 3 Outreach Messages" },
  { id: "slide_outline", label: "Upload Slide Outline" },
  { id: "post_survey", label: "Build Post-Session Survey" },
  { id: "invite_emails", label: "Draft 3 Invite Emails" }
];

const modules = [
  {
    id: "overview",
    number: "01",
    title: "Week 2 Overview",
    description: "What you're building this week and why each piece matters.",
    videoLabel: "Week 2 Overview Video",
    downloads: []
  },
  {
    id: "outreach_tracker",
    number: "02",
    title: "Outreach Tracker Build",
    description: "Set up your Google Sheet tracker with correct columns and status logic.",
    videoLabel: "Outreach Tracker Build",
    downloads: [
      { label: "Outreach Tracker Template", sublabel: "Google Sheet", url: GOOGLE_SHEET_URL }
    ]
  },
  {
    id: "reg_form",
    number: "03",
    title: "Registration Form Build",
    description: "Create your Focus Group registration form with qualification logic.",
    videoLabel: "Registration Form Build",
    downloads: [
      { label: "Registration Form Questions", sublabel: "Google Doc", url: "https://docs.google.com/document/d/1sCdJ56HmW7XuayOwuiay7ISrbZKEg99QU-iEN5StVaQ/copy" }
    ]
  },
  {
    id: "email_templates",
    number: "04",
    title: "Email Templates Walkthrough",
    description: "Walk through all 9 email templates: invite sequence, confirmation, and post-session.",
    videoLabel: "Email Templates Walkthrough",
    downloads: [
      { label: "DM Outreach Templates", sublabel: "Google Doc", url: "https://docs.google.com/document/d/18f8qUAVB9yhyK_V-FMXhjNfShaUcc2zHgtLFJF4oRgA/edit?usp=sharing" },
      { label: "Focus Group Invite Email Templates", sublabel: "Google Doc", url: "https://docs.google.com/document/d/1p-yXIbWlkSiBLF14D71ODAKHU8XMzTw9wW2t8HRiZR4/edit?usp=sharing" },
      { label: "Post-Session Email Templates", sublabel: "Google Doc", url: "https://docs.google.com/document/d/1Sro7XPi7emxmkryNN3R7kO4DHPsCkBWcUkXGbsPkxpc/edit?usp=sharing" },
      { label: "LinkedIn Sales Navigator (Optional Tool)", sublabel: "External Tool", url: "https://www.linkedin.com/help/linkedin/feature-launcher/urn:li:helpCenterArticle:(1355837,LITHOGRAPH)?trk=search_feature_launcher" }
    ]
  },
  {
    id: "slide_outline",
    number: "05",
    title: "Slide Outline Walkthrough",
    description: "Structure your Focus Group presentation using the 8-section skeleton.",
    videoLabel: "Slide Outline Walkthrough",
    downloads: [
      { label: "Slide Outline Template", sublabel: "Google Doc", url: "https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit?usp=sharing" }
    ]
  }
];

function VideoPlaceholder({ label }) {
  return (
    <div className="bg-black aspect-video flex items-center justify-center mb-6 relative group cursor-pointer">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
          <Play className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors ml-1" fill="currentColor" />
        </div>
        <p className="text-white/40 text-xs tracking-widest uppercase">{label}</p>
      </div>
    </div>
  );
}

function CollapsibleModule({ module, trackDownload }) {
  const [open, setOpen] = useState(module.id === "overview");

  return (
    <div className="border border-black/10 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs text-black/30 tracking-[0.2em] w-6">{module.number}</span>
          <span className="text-base font-medium">{module.title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-black/30" /> : <ChevronDown className="w-4 h-4 text-black/30" />}
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-black/5 pt-6">
          <p className="text-sm text-black/50 font-light mb-6 ml-10">{module.description}</p>
          <VideoPlaceholder label={module.videoLabel} />
          {module.downloads && module.downloads.length > 0 && (
            <div className="mt-4 ml-10 space-y-2">
              {module.downloads.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDownload(item.label)}
                  className="flex items-center justify-between py-3 px-4 border border-black/8 hover:border-black/20 hover:bg-neutral-50 transition-all group"
                >
                  <div>
                    <p className="text-sm font-medium text-black/80 group-hover:text-black transition-colors">{item.label}</p>
                    <p className="text-xs text-black/30 mt-0.5">{item.sublabel}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-black/20 group-hover:text-black/50 transition-colors flex-shrink-0" />
                </a>
              ))}
              <p className="text-xs text-black/30 font-light pt-1">Links open in Google Drive. Make a copy before editing.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Week2HomeworkCards() {
  const [checked, setChecked] = useState({});
  const [weekComplete, setWeekComplete] = useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const trackDownload = (fileName) => {
    base44.analytics.track({
      eventName: "template_downloaded",
      properties: {
        file_name: fileName,
        user_email: user?.email || "unknown",
        timestamp: new Date().toISOString(),
      }
    });
  };

  const toggleCheck = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const allDone = completedCount === checklist.length;

  return (
    <div className="w-full bg-neutral-50 border-t border-black/10 py-12">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-3">Week 2</p>
          <h2 className="text-3xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Build the Validation Environment
          </h2>
          <p className="text-sm text-black/50 font-light max-w-xl">
            This week you build the engine — not the automation. Lock a date, build your tracker, draft your outreach, and structure your session.
          </p>
        </div>

        {/* Legal Notice */}
        <div className="bg-amber-50 border border-amber-200 p-8 mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-amber-600 mb-4">Before You Host a Live Validation Session</p>
          <p className="text-sm text-black/70 font-light mb-4">You are about to:</p>
          <ul className="space-y-1 mb-5 ml-1">
            {["Present original intellectual property", "Collect strategic insight", "Potentially record discussions", "Open the door to monetization"].map((item, i) => (
              <li key={i} className="text-sm text-black/70 font-light flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-black/70 font-light mb-4">
            Before hosting a room like this, make sure your intellectual property and operating structure are legally protected.
          </p>
          <p className="text-sm text-black/70 font-light mb-3">I personally use LegalShield for:</p>
          <ul className="space-y-1 mb-5 ml-1">
            {["Contract review", "IP clarity", "Business legal access", "Ongoing consultation"].map((item, i) => (
              <li key={i} className="text-sm text-black/70 font-light flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-black/70 font-light mb-4">
            If you don't already have business legal coverage, here is the resource I recommend:
          </p>
          <a
            href="https://ssarahwilkes.legalshieldassociate.com/smb?d=eyJiaWxsaW5nUGVyaW9kIjoiTU9OVEhMWSJ9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900 underline underline-offset-4 transition-colors"
          >
            LegalShield Business Legal Coverage <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Modules */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-black/30 mb-5">Video Modules</p>
          {modules.map(module => (
            <CollapsibleModule key={module.id} module={module} trackDownload={trackDownload} />
          ))}
        </div>

        {/* Homework Checklist */}
        <div className="bg-white border border-black/10 p-8 mb-8">
          <p className="text-xs tracking-[0.2em] uppercase text-black/30 mb-6">Week 2 Checklist</p>
          <div className="space-y-4">
            {checklist.map(item => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="w-full flex items-center gap-4 text-left group"
              >
                {checked[item.id]
                  ? <CheckSquare className="w-5 h-5 text-black flex-shrink-0" />
                  : <Square className="w-5 h-5 text-black/20 flex-shrink-0 group-hover:text-black/40 transition-colors" />
                }
                <span className={`text-sm font-light transition-colors ${checked[item.id] ? 'text-black/40 line-through' : 'text-black/70'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-black/5">
            <p className="text-xs text-black/30">{completedCount} of {checklist.length} complete</p>
          </div>
        </div>

        {/* Mark Week Complete */}
        <div className="bg-white border border-black/10 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-black/80 mb-1">Mark Week 2 Complete</p>
              <p className="text-xs text-black/40 font-light">Complete all checklist items before marking this week done.</p>
            </div>
            <Button
              disabled={!allDone || weekComplete}
              onClick={() => setWeekComplete(true)}
              className={`shrink-0 ${weekComplete ? 'bg-black/20 text-white cursor-default' : 'bg-black text-white hover:bg-black/80'}`}
            >
              {weekComplete ? "Week 2 Complete ✓" : "Mark Week Complete"}
            </Button>
          </div>
          {!allDone && (
            <p className="text-xs text-black/30 mt-3">
              {checklist.length - completedCount} item{checklist.length - completedCount !== 1 ? 's' : ''} remaining
            </p>
          )}
        </div>

      </div>
    </div>
  );
}