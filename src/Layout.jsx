import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Menu, X } from "lucide-react";
import ProgramSidebar from "@/components/ProgramSidebar";

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

  const [adminViewMode, setAdminViewMode] = React.useState('admin'); // 'admin' or 'user'
  const [isProBonoUser, setIsProBonoUser] = React.useState(false);
  const [hasSignedProBonoAgreement, setHasSignedProBonoAgreement] = React.useState(true);
  const [checkingProBonoStatus, setCheckingProBonoStatus] = React.useState(true);

  React.useEffect(() => {
    const checkProBonoStatus = async () => {
      if (user && user.role !== 'admin') {
        try {
          const tierAssignments = await base44.entities.TierAssignment.filter({ userEmail: user.email });
          const proBonoAssignment = tierAssignments.find(ta => ta.isProBono);
          
          if (proBonoAssignment) {
            setIsProBonoUser(true);
            const legalDocuments = await base44.entities.LegalDocument.filter({ 
              userEmail: user.email, 
              documentType: 'pro_bono_contract' 
            });
            const signedAgreement = legalDocuments.find(doc => doc.status === 'signed');
            setHasSignedProBonoAgreement(!!signedAgreement);
          } else {
            setIsProBonoUser(false);
            setHasSignedProBonoAgreement(true);
          }
        } catch (error) {
          console.error('Error checking pro bono status:', error);
        }
      }
      setCheckingProBonoStatus(false);
    };
    checkProBonoStatus();
  }, [user]);

  const isAdminUser = user?.role === 'admin';
  const showingUserView = isAdminUser && adminViewMode === 'user';
  const isFocusGroup = user?.cohort_type === 'focus_group' || !user?.cohort_type;
  const showFullProgram = (user?.cohort_type === 'sprint' || user?.cohort_type === 'advisory' || showingUserView) && hasSignedProBonoAgreement;

  const isOnboardingPage = location.pathname === createPageUrl("Onboarding6500");
  const isPleaseSignPage = location.pathname === createPageUrl("PleaseSignAgreement");
  const isAccountPage = location.pathname === createPageUrl("Account");
  const isHomePage = location.pathname === '/' || location.pathname === '/Home';

  React.useEffect(() => {
    if (!checkingProBonoStatus && user && isProBonoUser && !hasSignedProBonoAgreement && !isOnboardingPage && !isPleaseSignPage && !isAccountPage && !isHomePage) {
      window.location.href = createPageUrl("PleaseSignAgreement");
    }
  }, [checkingProBonoStatus, user, isProBonoUser, hasSignedProBonoAgreement, isOnboardingPage, isPleaseSignPage, isAccountPage, isHomePage]);

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
      <nav className={`fixed top-0 left-0 right-0 z-[200] ${isTransparent ? 'bg-black/40 backdrop-blur-sm border-b border-white/10' : 'bg-white border-b border-black/10'}`}>
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
            {(!isAdminUser || showingUserView) && (
              <Link
                to={createPageUrl("Contact")}
                className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
              >
                Contact
              </Link>
            )}
            {user && (
              <>
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
                <Link
                  to={createPageUrl("Account")}
                  className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                >
                  Account
                </Link>
              </>
            )}
            {!user && (
              <button
                onClick={() => base44.auth.redirectToLogin()}
                className={`text-sm px-4 py-2 transition-colors duration-200 ${isTransparent ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'}`}
              >
                Sign In
              </button>
            )}
            {isAdminUser && (
              <>
                {!showingUserView && (
                  <>
                    <Link
                      to={createPageUrl("OperatingManual")}
                      className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                    >
                      Operating Manual
                    </Link>
                    <Link
                      to={createPageUrl("AdminProBonoManagement")}
                      className={`text-sm transition-colors duration-200 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                    >
                      Pro Bono
                    </Link>
                    <Link
                      to={createPageUrl("AdminContentManagement")}
                      className={`text-sm px-4 py-2 transition-colors duration-200 ${isTransparent ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'}`}
                    >
                      Admin
                    </Link>
                  </>
                )}
                <button
                  onClick={() => setAdminViewMode(adminViewMode === 'admin' ? 'user' : 'admin')}
                  className={`text-sm px-4 py-2 transition-colors duration-200 border ${isTransparent ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/20 text-black hover:bg-black/5'}`}
                >
                  {adminViewMode === 'admin' ? 'User View' : 'Admin View'}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded transition-colors ${isTransparent ? 'text-white bg-white/10 hover:bg-white/20 border border-white/20' : 'text-black/60 hover:text-black border border-black/10'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              {(!isAdminUser || showingUserView) && (
                <Link
                  to={createPageUrl("Contact")}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                >
                  Contact
                </Link>
              )}
              {user && (
                <>
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
                  <Link
                    to={createPageUrl("Account")}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                  >
                    Account
                  </Link>
                </>
              )}
              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    base44.auth.redirectToLogin();
                  }}
                  className={`text-sm px-4 py-2 transition-colors duration-200 text-center ${isTransparent ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'}`}
                >
                  Sign In
                </button>
              )}
              {isAdminUser && (
                <>
                  {!showingUserView && (
                    <>
                      <Link
                        to={createPageUrl("OperatingManual")}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                      >
                        Operating Manual
                      </Link>
                      <Link
                        to={createPageUrl("AdminProBonoManagement")}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm transition-colors duration-200 py-2 ${isTransparent ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                      >
                        Pro Bono Management
                      </Link>
                      <Link
                        to={createPageUrl("AdminContentManagement")}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm px-4 py-2 transition-colors duration-200 text-center ${isTransparent ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'}`}
                      >
                        Admin
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setAdminViewMode(adminViewMode === 'admin' ? 'user' : 'admin');
                      setMobileMenuOpen(false);
                    }}
                    className={`text-sm px-4 py-2 transition-colors duration-200 text-center border ${isTransparent ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/20 text-black hover:bg-black/5'}`}
                  >
                    {adminViewMode === 'admin' ? 'User View' : 'Admin View'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Program Sidebar for authenticated users */}
      {showFullProgram && (
        <div className="hidden md:block">
          <ProgramSidebar />
        </div>
      )}

      {/* Content with top padding to account for fixed nav (except transparent home) */}
      <div className={`pt-[73px] ${showFullProgram ? 'md:ml-64' : ''}`}>
        {children}
      </div>
    </>
  );
}