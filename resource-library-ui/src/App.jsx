import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';

// User Pages
import Landing from './pages/user/Landing';
import Home from './pages/user/Home';
import BrowseResources from './pages/user/BrowseResources';
import ResourceDetails from './pages/user/ResourceDetails';
import { Login, Register } from './pages/user/Auth';
import { Profile, FeedbackForm } from './pages/user/Misc';
import NotFound from './pages/user/NotFound';

// Info Pages
import TermsConditions from './pages/user/TermsConditions';
import PrivacyPolicy from './pages/user/PrivacyPolicy';
import ContactUs from './pages/user/ContactUs';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import { UploadResource, ManageResources, ManageUsers, ViewFeedback } from './pages/admin/Management';

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="page-wrapper"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const LayoutContainer = ({ children, isAdmin, role, setRole }) => {
  return (
    <div className={`app-container ${isAdmin ? 'admin-layout' : 'user-layout'}`}>
      <Navbar role={role} setRole={setRole} />
      <main className="main-content">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [role, setRole] = useState('guest'); // MOCK STATE: 'guest', 'Student', 'Faculty', 'Admin'

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/home" element={<LayoutContainer role={role} setRole={setRole}><Home /></LayoutContainer>} />
        <Route path="/login" element={<LayoutContainer role={role} setRole={setRole}><Login setRole={setRole} /></LayoutContainer>} />
        <Route path="/register" element={<LayoutContainer role={role} setRole={setRole}><Register setRole={setRole} /></LayoutContainer>} />
        <Route path="/browse" element={<LayoutContainer role={role} setRole={setRole}><BrowseResources /></LayoutContainer>} />
        <Route path="/resource/:id" element={<LayoutContainer role={role} setRole={setRole}><ResourceDetails role={role} /></LayoutContainer>} />
        <Route path="/feedback" element={<LayoutContainer role={role} setRole={setRole}><FeedbackForm /></LayoutContainer>} />
        <Route path="/profile" element={<LayoutContainer role={role} setRole={setRole}><Profile role={role} /></LayoutContainer>} />

        {/* Info Pages Routes */}
        <Route path="/terms" element={<LayoutContainer role={role} setRole={setRole}><TermsConditions /></LayoutContainer>} />
        <Route path="/privacy" element={<LayoutContainer role={role} setRole={setRole}><PrivacyPolicy /></LayoutContainer>} />
        <Route path="/contact" element={<LayoutContainer role={role} setRole={setRole}><ContactUs /></LayoutContainer>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LayoutContainer isAdmin={true} role={role} setRole={setRole}><AdminLogin /></LayoutContainer>} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<LayoutContainer isAdmin={true} role={role} setRole={setRole}><AdminDashboard /></LayoutContainer>} />
        <Route path="/admin/upload" element={<LayoutContainer isAdmin={true} role={role} setRole={setRole}><UploadResource /></LayoutContainer>} />
        <Route path="/admin/resources" element={<LayoutContainer isAdmin={true} role={role} setRole={setRole}><ManageResources /></LayoutContainer>} />
        <Route path="/admin/users" element={<LayoutContainer isAdmin={true} role={role} setRole={setRole}><ManageUsers /></LayoutContainer>} />
        <Route path="/admin/feedback" element={<LayoutContainer isAdmin={true} role={role} setRole={setRole}><ViewFeedback /></LayoutContainer>} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<LayoutContainer role={role} setRole={setRole}><NotFound /></LayoutContainer>} />
      </Routes>
    </Router>
  );
};

export default App;
