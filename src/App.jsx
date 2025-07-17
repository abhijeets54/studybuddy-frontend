import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import useScrollToTop from './hooks/useScrollToTop.js'
import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Flashcards from './pages/Flashcards.jsx'
import Notes from './pages/Notes.jsx'
import Quizzes from './pages/Quizzes.jsx'
import Profile from './pages/Profile.jsx'

// Product Pages
import Features from './pages/Features.jsx'
import Pricing from './pages/Pricing.jsx'

// Company Pages
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'

// Resources Pages
import HelpCenter from './pages/HelpCenter.jsx'
import Status from './pages/Status.jsx'

// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import Security from './pages/Security.jsx'
import Cookies from './pages/Cookies.jsx'

import { Toaster } from 'react-hot-toast'

// Component to handle scroll to top on route changes
const ScrollToTopWrapper = ({ children }) => {
  useScrollToTop();
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ScrollToTopWrapper>
          <div className="min-h-screen bg-hero">
            <Header />
            <main className="flex-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ErrorBoundary>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Product Pages */}
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />


                  {/* Company Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Resources Pages */}
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/status" element={<Status />} />

                  {/* Legal Pages */}
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/cookies" element={<Cookies />} />

                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <Dashboard />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } />
                  <Route path="/notes" element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <Notes />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } />
                  <Route path="/flashcards" element={
                    <ProtectedRoute>
                      <Flashcards />
                    </ProtectedRoute>
                  } />
                  <Route path="/quizzes" element={
                    <ProtectedRoute>
                      <Quizzes />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                </Routes>
              </ErrorBoundary>
            </motion.div>
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
          </div>
        </ScrollToTopWrapper>
      </Router>
    </AuthProvider>
  )
}

export default App
