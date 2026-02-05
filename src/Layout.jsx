import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

export default function Layout({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };
    loadUser();
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        
        :root {
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-serif: 'Playfair Display', Georgia, serif;
        }
        
        body {
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        ::selection {
          background: black;
          color: white;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
      
      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10">
        <div className="px-6 md:px-16 lg:px-24 py-4 flex items-center justify-between">
          <Link 
            to={createPageUrl("Home")}
            className="text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Heartset Design
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to={createPageUrl("Home")}
              className="text-sm text-black/60 hover:text-black transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to={createPageUrl("VideoLibrary")}
              className="text-sm text-black/60 hover:text-black transition-colors duration-200"
            >
              Video Library
            </Link>
            <Link
              to={createPageUrl("Assignments")}
              className="text-sm text-black/60 hover:text-black transition-colors duration-200"
            >
              Assignments
            </Link>
            <Link
              to={createPageUrl("OfficeHours")}
              className="text-sm text-black/60 hover:text-black transition-colors duration-200"
            >
              Office Hours
            </Link>
            {user && (
              <Link
                to={createPageUrl("Account")}
                className="text-sm text-black/60 hover:text-black transition-colors duration-200"
              >
                Account
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to={createPageUrl("VideoAdmin")}
                className="text-sm bg-black text-white px-4 py-2 hover:bg-black/80 transition-colors duration-200"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      {/* Content with top padding to account for fixed nav */}
      <div className="pt-[73px]">
        {children}
      </div>
    </>
  );
}