import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  ServerIcon,
  KeyIcon,
  EyeSlashIcon,
  BugAntIcon
} from '@heroicons/react/24/outline';

const Security = () => {
  const securityFeatures = [
    {
      title: 'Data Encryption',
      icon: LockClosedIcon,
      description: 'End-to-end encryption for all sensitive data',
      details: [
        'AES-256 encryption for data at rest',
        'TLS 1.3 for data in transit',
        'Encrypted database storage',
        'Secure key management system'
      ]
    },
    {
      title: 'Infrastructure Security',
      icon: ServerIcon,
      description: 'Enterprise-grade security infrastructure',
      details: [
        'SOC 2 Type II compliant data centers',
        'Multi-factor authentication required',
        'Regular security audits and penetration testing',
        'Automated threat detection and response'
      ]
    },
    {
      title: 'Access Controls',
      icon: KeyIcon,
      description: 'Strict access controls and monitoring',
      details: [
        'Role-based access control (RBAC)',
        'Principle of least privilege',
        'Regular access reviews and audits',
        'Secure API authentication'
      ]
    },
    {
      title: 'Privacy Protection',
      icon: EyeSlashIcon,
      description: 'Your privacy is our top priority',
      details: [
        'Data minimization practices',
        'Anonymous usage analytics',
        'GDPR and CCPA compliance',
        'User-controlled data retention'
      ]
    }
  ];

  const certifications = [
    { name: 'SOC 2 Type II', description: 'Security and availability controls' },
    { name: 'GDPR Compliant', description: 'European data protection standards' },
    { name: 'CCPA Compliant', description: 'California privacy regulations' },
    { name: 'ISO 27001', description: 'Information security management' }
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
              Security & Trust
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
              Enterprise-Grade Security
            </h1>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Your data security is our highest priority. We implement industry-leading security measures to protect your information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
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
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900">{feature.title}</h3>
                      <p className="text-secondary-600">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
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

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Security Certifications</h2>
            <p className="text-secondary-600">
              We maintain the highest security standards through industry certifications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200"
              >
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">{cert.name}</h4>
                <p className="text-secondary-700">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Reporting */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-secondary-100"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-error-500 to-error-600 rounded-xl flex items-center justify-center mr-4">
                <BugAntIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary-900">Security Vulnerability Reporting</h3>
                <p className="text-secondary-600">Help us keep StudyBuddy secure</p>
              </div>
            </div>
            <p className="text-secondary-700 mb-6">
              If you discover a security vulnerability, please report it responsibly. We appreciate your help in keeping our platform secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:security@studybuddy.com"
                className="btn-primary text-center"
              >
                Report Security Issue
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

export default Security;
