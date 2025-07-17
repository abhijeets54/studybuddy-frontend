import React from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  UserIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: DocumentTextIcon,
      content: [
        'By accessing StudyBuddy, you agree to these terms',
        'Terms apply to all users and visitors',
        'We may update terms with notice to users',
        'Continued use constitutes acceptance of changes',
        'Must be 13+ years old to use our service'
      ]
    },
    {
      title: 'User Responsibilities',
      icon: UserIcon,
      content: [
        'Provide accurate account information',
        'Keep your login credentials secure',
        'Use the service for educational purposes only',
        'Respect intellectual property rights',
        'Report any security vulnerabilities'
      ]
    },
    {
      title: 'Acceptable Use',
      icon: ShieldCheckIcon,
      content: [
        'No harassment, abuse, or harmful content',
        'No spam, malware, or malicious activities',
        'No unauthorized access to other accounts',
        'No commercial use without permission',
        'Comply with all applicable laws'
      ]
    },
    {
      title: 'Limitations & Disclaimers',
      icon: ExclamationTriangleIcon,
      content: [
        'Service provided "as is" without warranties',
        'We are not liable for indirect damages',
        'Users responsible for their content',
        'Service availability not guaranteed',
        'Educational content for reference only'
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
              <DocumentTextIcon className="w-4 h-4 mr-2" />
              Terms of Service
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Please read these terms carefully before using StudyBuddy. They outline your rights and responsibilities as a user.
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

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-secondary-100"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">Additional Information</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-3">Termination</h4>
                <p className="text-secondary-700 mb-4">
                  We may terminate or suspend your account for violations of these terms. You may also delete your account at any time.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-3">Governing Law</h4>
                <p className="text-secondary-700 mb-4">
                  These terms are governed by the laws of the jurisdiction where StudyBuddy operates.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">Questions About Terms?</h3>
            <p className="text-secondary-700 mb-6">
              If you have any questions about these Terms of Service, please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:legal@studybuddy.com"
                className="btn-primary text-center"
              >
                Contact Legal Team
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

export default TermsOfService;
