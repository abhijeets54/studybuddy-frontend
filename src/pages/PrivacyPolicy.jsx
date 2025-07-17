import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: DocumentTextIcon,
      content: [
        'Account information (name, email, username)',
        'Study materials and notes you create',
        'Usage data and learning progress',
        'Device and browser information',
        'Cookies and similar technologies'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: EyeIcon,
      content: [
        'Provide and improve our educational services',
        'Personalize your learning experience',
        'Generate AI-powered study materials',
        'Communicate important updates',
        'Ensure platform security and prevent fraud'
      ]
    },
    {
      title: 'Data Protection',
      icon: ShieldCheckIcon,
      content: [
        'End-to-end encryption for sensitive data',
        'Regular security audits and monitoring',
        'Secure data centers with industry standards',
        'Limited access on need-to-know basis',
        'Automatic data backup and recovery'
      ]
    },
    {
      title: 'Your Rights',
      icon: LockClosedIcon,
      content: [
        'Access and download your data',
        'Correct inaccurate information',
        'Delete your account and data',
        'Control data sharing preferences',
        'Opt-out of marketing communications'
      ]
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
              <ShieldCheckIcon className="w-4 h-4 mr-2" />
              Privacy Policy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
              Your Privacy is Our Priority
            </h1>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              We're committed to protecting your personal information and being transparent about how we collect, use, and share your data.
            </p>
            <div className="text-sm text-secondary-500">
              Last updated: January 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-secondary-100"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-secondary-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-secondary-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">Questions About Privacy?</h3>
            <p className="text-secondary-700 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us.
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

export default PrivacyPolicy;
