import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CogIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    {
      icon: BookOpenIcon,
      title: 'Getting Started',
      description: 'Learn the basics of using StudyBuddy',
      articleCount: 12,
      color: 'from-scholar-500 to-scholar-600'
    },
    {
      icon: ClipboardDocumentListIcon,
      title: 'Notes & Organization',
      description: 'Master smart note-taking features',
      articleCount: 8,
      color: 'from-ai-500 to-ai-600'
    },
    {
      icon: AcademicCapIcon,
      title: 'Flashcards & Quizzes',
      description: 'Optimize your study sessions',
      articleCount: 15,
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics & Progress',
      description: 'Track your learning journey',
      articleCount: 6,
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: CogIcon,
      title: 'Account Settings',
      description: 'Manage your account and preferences',
      articleCount: 10,
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: CreditCardIcon,
      title: 'Billing & Subscriptions',
      description: 'Payment and subscription help',
      articleCount: 7,
      color: 'from-success-500 to-success-600'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile App',
      description: 'Using StudyBuddy on mobile devices',
      articleCount: 9,
      color: 'from-warning-500 to-warning-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy & Security',
      description: 'Keep your data safe and secure',
      articleCount: 5,
      color: 'from-error-500 to-error-600'
    }
  ];

  const popularArticles = [
    'How to create your first flashcard deck',
    'Understanding spaced repetition algorithms',
    'Setting up study goals and tracking progress',
    'Importing notes from other platforms',
    'Using AI-powered quiz generation',
    'Collaborating with study groups',
    'Customizing your study schedule',
    'Troubleshooting sync issues'
  ];

  const faqs = [
    {
      question: 'How do I get started with StudyBuddy?',
      answer: 'Getting started is easy! Simply create an account, complete your profile setup, and start by creating your first note or flashcard deck. Our onboarding guide will walk you through the key features.'
    },
    {
      question: 'Can I use StudyBuddy offline?',
      answer: 'Yes! Our mobile app supports offline studying for flashcards and notes. Your progress will sync automatically when you reconnect to the internet.'
    },
    {
      question: 'How does the AI-powered quiz generation work?',
      answer: 'Our AI analyzes your notes and creates relevant questions based on the content. It considers difficulty levels, question types, and your learning progress to generate personalized quizzes.'
    },
    {
      question: 'Can I import my existing notes and flashcards?',
      answer: 'Absolutely! StudyBuddy supports importing from popular platforms like Anki, Quizlet, Notion, and more. You can also import text files, PDFs, and other document formats.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we take data security seriously. All data is encrypted in transit and at rest. We never share your personal information or study content with third parties.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime from your account settings. Your access will continue until the end of your current billing period, and you can reactivate anytime.'
    },
    {
      question: 'Can I collaborate with other students?',
      answer: 'Yes! You can share flashcard decks, collaborate on notes, and join study groups. Premium users get additional collaboration features like real-time editing.'
    },
    {
      question: 'What devices and platforms are supported?',
      answer: 'StudyBuddy works on all modern web browsers, iOS, and Android devices. We also offer desktop apps for Windows and macOS.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-hero">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-medium text-primary-800 mb-6 border border-primary-200">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Get Help & Support
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              StudyBuddy
              <span className="block text-gradient-primary">Help Center</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to your questions, learn how to use StudyBuddy effectively, 
              and get the most out of your learning experience.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-secondary-200 rounded-2xl focus:ring-4 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Browse by Category
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Find help articles organized by topic
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-feature group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-500">
                      {category.articleCount} articles
                    </span>
                    <ChevronRightIcon className="w-4 h-4 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Popular Articles
            </h2>
            <p className="text-lg text-secondary-600">
              Most viewed help articles this week
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <motion.a
                key={index}
                href="#"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-secondary-50 transition-colors duration-200 group"
              >
                <span className="text-secondary-700 group-hover:text-primary-600 transition-colors duration-200">
                  {article}
                </span>
                <ChevronRightIcon className="w-4 h-4 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-secondary-600">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left hover:bg-secondary-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-secondary-900 pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronDownIcon className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-secondary-200"
                  >
                    <div className="p-6 pt-4">
                      <p className="text-secondary-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <QuestionMarkCircleIcon className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Still need help?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Contact Support
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
