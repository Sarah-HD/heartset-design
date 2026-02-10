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
import AdminDashboard from './pages/AdminDashboard';
import Apply from './pages/Apply';
import Assignments from './pages/Assignments';
import BookSession from './pages/BookSession';
import Contact from './pages/Contact';
import FocusGroup from './pages/FocusGroup';
import Home from './pages/Home';
import OfficeHours from './pages/OfficeHours';
import OperatingManual from './pages/OperatingManual';
import Referral from './pages/Referral';
import Survey from './pages/Survey';
import VideoAdmin from './pages/VideoAdmin';
import VideoLibrary from './pages/VideoLibrary';
import Onboarding6500 from './pages/Onboarding6500';
import Apply10000 from './pages/Apply10000';
import Onboarding10000 from './pages/Onboarding10000';
import Onboarding25000 from './pages/Onboarding25000';
import AdminTierManagement from './pages/AdminTierManagement';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Account": Account,
    "AdminDashboard": AdminDashboard,
    "Apply": Apply,
    "Assignments": Assignments,
    "BookSession": BookSession,
    "Contact": Contact,
    "FocusGroup": FocusGroup,
    "Home": Home,
    "OfficeHours": OfficeHours,
    "OperatingManual": OperatingManual,
    "Referral": Referral,
    "Survey": Survey,
    "VideoAdmin": VideoAdmin,
    "VideoLibrary": VideoLibrary,
    "Onboarding6500": Onboarding6500,
    "Apply10000": Apply10000,
    "Onboarding10000": Onboarding10000,
    "Onboarding25000": Onboarding25000,
    "AdminTierManagement": AdminTierManagement,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};