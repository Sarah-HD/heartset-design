/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Account from './pages/Account';
import AdminContentManagement from './pages/AdminContentManagement';
import AdminDashboard from './pages/AdminDashboard';
import AdminHome from './pages/AdminHome';
import AdminProBonoManagement from './pages/AdminProBonoManagement';
import AdminTierManagement from './pages/AdminTierManagement';
import Apply from './pages/Apply';
import Apply10000 from './pages/Apply10000';
import Assignments from './pages/Assignments';
import AuthorityEngine from './pages/AuthorityEngine';
import BookSession from './pages/BookSession';
import Contact from './pages/Contact';
import FocusGroup from './pages/FocusGroup';
import Home from './pages/Home';
import OfficeHours from './pages/OfficeHours';
import Onboarding10000 from './pages/Onboarding10000';
import Onboarding25000 from './pages/Onboarding25000';
import Onboarding6500 from './pages/Onboarding6500';
import OperatingManual from './pages/OperatingManual';
import PleaseSignAgreement from './pages/PleaseSignAgreement';
import Referral from './pages/Referral';
import Sprint6500 from './pages/Sprint6500';
import SprintEnrollment from './pages/SprintEnrollment';
import Survey from './pages/Survey';
import VideoAdmin from './pages/VideoAdmin';
import VideoLibrary from './pages/VideoLibrary';
import Week1Video from './pages/Week1Video';
import Week2Video from './pages/Week2Video';
import Week3Video from './pages/Week3Video';
import Week4Video from './pages/Week4Video';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Account": Account,
    "AdminContentManagement": AdminContentManagement,
    "AdminDashboard": AdminDashboard,
    "AdminHome": AdminHome,
    "AdminProBonoManagement": AdminProBonoManagement,
    "AdminTierManagement": AdminTierManagement,
    "Apply": Apply,
    "Apply10000": Apply10000,
    "Assignments": Assignments,
    "AuthorityEngine": AuthorityEngine,
    "BookSession": BookSession,
    "Contact": Contact,
    "FocusGroup": FocusGroup,
    "Home": Home,
    "OfficeHours": OfficeHours,
    "Onboarding10000": Onboarding10000,
    "Onboarding25000": Onboarding25000,
    "Onboarding6500": Onboarding6500,
    "OperatingManual": OperatingManual,
    "PleaseSignAgreement": PleaseSignAgreement,
    "Referral": Referral,
    "Sprint6500": Sprint6500,
    "SprintEnrollment": SprintEnrollment,
    "Survey": Survey,
    "VideoAdmin": VideoAdmin,
    "VideoLibrary": VideoLibrary,
    "Week1Video": Week1Video,
    "Week2Video": Week2Video,
    "Week3Video": Week3Video,
    "Week4Video": Week4Video,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};