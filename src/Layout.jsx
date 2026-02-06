import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Menu, X } from "lucide-react";

export default function Layout({ children }) {
  const [user, setUser] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

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

  const isFocusGroup = user?.cohort_type === 'focus_group' || !user?.cohort_type;
  const showFullProgram = user?.cohort_type === 'sprint' || user?.cohort_type === 'advisory';
  
  // Transparent nav with white text for unauthenticated Home page
  const isHomePage = location.pathname === '/' || location.pathname === '/Home';
  const isTransparent = isHomePage && !user;
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
      <nav className={`fixed top-0 left-0 right-0 z-[100] ${isTransparent ? 'bg-black/40 backdrop-blur-sm border-b border-white/10' : 'bg-white border-b border-black/10'}`}>
        <div className="px-6 md:px-16 lg:px-24 py-4 flex items-center justify-between">
          <Link 
            to={createPageUrl("Home")}
            className={`text-lg font-medium ${isTransparent ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Heartset Design
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to={createPageUrl("Home")}
              className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
            >
              Home
            </Link>
            <Link
              to={createPageUrl("VideoLibrary")}
              className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
            >
              Video Library
            </Link>
            {showFullProgram && (
              <>
                <Link
                  to={createPageUrl("Assignments")}
                  className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                >
                  Assignments
                </Link>
                <Link
                  to={createPageUrl("OfficeHours")}
                  className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                >
                  Office Hours
                </Link>
              </>
            )}
            {user && (
              <Link
                to={createPageUrl("Account")}
                className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
              >
                Account
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to={createPageUrl("AdminDashboard")}
                className={`text-sm px-4 py-2 transition-colors duration-200 ${isTransparent ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'}`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-3 rounded transition-colors ${isTransparent ? 'text-white bg-white/20 hover:bg-white/30 border border-white/30' : 'text-black/60 hover:text-black'}`}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${isTransparent ? 'bg-black/90 backdrop-blur-sm border-t border-white/10' : 'bg-white border-t border-black/10'}`}>
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link
                to={createPageUrl("Home")}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
              >
                Home
              </Link>
              <Link
                to={createPageUrl("VideoLibrary")}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
              >
                Video Library
              </Link>
              {showFullProgram && (
                <>
                  <Link
                    to={createPageUrl("Assignments")}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                  >
                    Assignments
                  </Link>
                  <Link
                    to={createPageUrl("OfficeHours")}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                  >
                    Office Hours
                  </Link>
                </>
              )}
              {user && (
                <Link
                  to={createPageUrl("Account")}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                >
                  Account
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link
                  to={createPageUrl("AdminDashboard")}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm px-4 py-2 transition-colors duration-200 text-center ${isTransparent ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'}`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Content with top padding to account for fixed nav (except transparent home) */}
      <div className={isTransparent ? '' : 'pt-[73px]'}>
        {children}
      </div>
    </>
  );
}