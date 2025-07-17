import React from 'react';
import { motion } from 'framer-motion';
import {
  CogIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const Cookies = () => {
  const cookieTypes = [
    {
      title: 'Essential Cookies',
      icon: CogIcon,
      description: 'Required for basic website functionality',
      details: [
        'User authentication and session management',
        'Security and fraud prevention',
        'Website functionality and navigation',
        'Form submission and data processing'
      ],
      required: true
    },
    {
      title: 'Analytics Cookies',
      icon: ChartBarIcon,
      description: 'Help us understand how you use our website',
      details: [
        'Page views and user interactions',
        'Performance monitoring and optimization',
        'Error tracking and debugging',
        'Usage patterns and trends'
      ],
      required: false
    },
    {
      title: 'Functional Cookies',
      icon: AdjustmentsHorizontalIcon,
      description: 'Enhance your experience with personalized features',
      details: [
        'User preferences and settings',
        'Language and region preferences',
        'Customized content and recommendations',
        'Remember your choices and selections'
      ],
      required: false
    },
    {
      title: 'Security Cookies',
      icon: ShieldCheckIcon,
      description: 'Protect your account and data',
      details: [
        'Detect suspicious activity',
        'Prevent unauthorized access',
        'Secure data transmission',
        'Maintain session security'
      ],
      required: true
    }
  ];

  return (
    <div className="min-h-screen bg-hero">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-medium text-primary-800 mb-6 border border-primary-200">
              <CogIcon className="w-4 h-4 mr-2" />
              Cookie Policy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Learn about how we use cookies and similar technologies to improve your experience on StudyBuddy.
            </p>
            <div className="text-sm text-secondary-500">
              Last updated: January 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-secondary-100 mb-12"
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">What are Cookies?</h2>
            <p className="text-secondary-700 mb-4">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
            </p>
            <p className="text-secondary-700">
              We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period) to enhance your experience.
            </p>
          </motion.div>

          {/* Cookie Types */}
          <div className="space-y-8">
            {cookieTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-secondary-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary-900">{type.title}</h3>
                        <p className="text-secondary-600">{type.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      type.required 
                        ? 'bg-error-100 text-error-800' 
                        : 'bg-success-100 text-success-800'
                    }`}>
                      {type.required ? 'Required' : 'Optional'}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {type.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-secondary-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-secondary-600">
              You have control over which cookies we use on your device
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200"
            >
              <h4 className="text-lg font-semibold text-secondary-900 mb-3">Browser Settings</h4>
              <p className="text-secondary-700 mb-4">
                You can control cookies through your browser settings. Most browsers allow you to block or delete cookies.
              </p>
              <a
                href="https://www.allaboutcookies.org/manage-cookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Learn how to manage cookies →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200"
            >
              <h4 className="text-lg font-semibold text-secondary-900 mb-3">Cookie Preferences</h4>
              <p className="text-secondary-700 mb-4">
                You can update your cookie preferences at any time through our cookie settings panel.
              </p>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Manage Cookie Preferences
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">Questions About Cookies?</h3>
            <p className="text-secondary-700 mb-6">
              If you have any questions about our use of cookies, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:privacy@studybuddy.com"
                className="btn-primary text-center"
              >
                Contact Privacy Team
              </a>
              <a
                href="/contact"
                className="btn-secondary text-center"
              >
                General Contact
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;
