import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Custom Link component that scrolls to top
const ScrollToTopLink = ({ to, children, className }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};
import {
  BookOpenIcon,
  HeartIcon,
  AcademicCapIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' }
    ],
    resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'Status', href: '/status' }
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Security', href: '/security' },
      { name: 'Cookies', href: '/cookies' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center mb-4">
                <img
                  src="/logo.png"
                  alt="StudyBuddy Logo"
                  className="h-40 w-auto sm:h-44 md:h-48 lg:h-52 xl:h-56 2xl:h-60"
                />
              </Link>
              <p className="text-gray-600 mb-6 max-w-md">
                Your AI-powered study companion for better learning. Transform your study experience with intelligent flashcards, adaptive quizzes, and comprehensive analytics.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                >
                  <GlobeAltIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-200 transition-colors"
                >
                  <AcademicCapIcon className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <ScrollToTopLink
                    to={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.name}
                  </ScrollToTopLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <ScrollToTopLink
                    to={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {link.name}
                  </ScrollToTopLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <ScrollToTopLink
                    to={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                  >
                    {link.name}
                  </ScrollToTopLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <ScrollToTopLink
                    to={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
                  >
                    {link.name}
                  </ScrollToTopLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-blue-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <span>© {currentYear} StudyBuddy. All rights reserved.</span>
              <span>•</span>
              <span className="flex items-center">
                Made with <HeartIcon className="w-4 h-4 text-pink-500 mx-1" /> for learners
              </span>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-600">
              <span>Powered by AI • Built for Students</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
