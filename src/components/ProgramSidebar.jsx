import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, FileText, Wrench, Zap, Target, Calculator, BookOpen, Settings } from "lucide-react";

export default function ProgramSidebar() {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "Home", icon: Home },
    { label: "Week 1 – Blueprint", path: "Week1Video", icon: FileText },
    { label: "Week 2 – Infrastructure", path: "Week2Video", icon: Wrench },
    { label: "Week 3 – Activation", path: "Week3Video", icon: Zap },
    { label: "Week 4 – Execution", path: "Week4Video", icon: Target },
    { label: "Calculators", path: "AuthorityEngine", icon: Calculator },
    { label: "Resources", path: "VideoLibrary", icon: BookOpen },
  ];

  const isActive = (path) => {
    return location.pathname === `/${path}` || location.pathname === createPageUrl(path);
  };

  return (
    <div className="fixed left-0 top-[73px] bottom-0 w-64 bg-white border-r border-black/10 overflow-y-auto">
      <nav className="p-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={createPageUrl(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? "bg-black text-white"
                  : "text-black/60 hover:text-black hover:bg-neutral-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}