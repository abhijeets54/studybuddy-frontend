import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardDocumentListIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
  LightBulbIcon,
  CpuChipIcon,
  CloudIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Features = () => {
  const mainFeatures = [
    {
      icon: ClipboardDocumentListIcon,
      title: 'Smart Notes',
      description: 'AI-powered note organization with intelligent categorization and semantic search',
      features: [
        'Automatic categorization and tagging',
        'Semantic search across all notes',
        'Rich text editor with multimedia support',
        'Real-time collaboration',
        'Cross-platform synchronization',
        'Export to multiple formats'
      ],
      color: 'from-scholar-500 to-scholar-600',
      bgColor: 'bg-scholar-50',
      borderColor: 'border-scholar-200'
    },
    {
      icon: BookOpenIcon,
      title: 'Interactive Flashcards',
      description: 'Scientifically-proven spaced repetition system for optimal memory retention',
      features: [
        'Spaced repetition algorithm',
        'AI-generated flashcards from notes',
        'Multiple study modes',
        'Difficulty adjustment',
        'Progress tracking',
        'Offline study capability'
      ],
      color: 'from-ai-500 to-ai-600',
      bgColor: 'bg-ai-50',
      borderColor: 'border-ai-200'
    },
    {
      icon: AcademicCapIcon,
      title: 'Adaptive Quizzes',
      description: 'Personalized assessments that adapt to your learning level and pace',
      features: [
        'AI-generated questions',
        'Adaptive difficulty',
        'Multiple question types',
        'Instant feedback',
        'Performance analytics',
        'Custom quiz creation'
      ],
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200'
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Analytics',
      description: 'Comprehensive insights into your learning patterns and performance',
      features: [
        'Detailed learning analytics',
        'Performance tracking',
        'Study streak monitoring',
        'Goal setting and tracking',
        'Visual progress reports',
        'Personalized recommendations'
      ],
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-200'
    }
  ];

  const additionalFeatures = [
    {
      icon: LightBulbIcon,
      title: 'AI-Powered Insights',
      description: 'Get personalized study recommendations based on your learning patterns'
    },
    {
      icon: CpuChipIcon,
      title: 'Advanced AI Technology',
      description: 'Powered by cutting-edge machine learning algorithms for optimal learning'
    },
    {
      icon: CloudIcon,
      title: 'Cloud Synchronization',
      description: 'Access your study materials anywhere, anytime across all devices'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with enterprise-grade security'
    }
  ];

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
              Comprehensive Feature Suite
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              Everything you need to
              <span className="block text-gradient-primary">excel academically</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of AI-powered learning tools designed to transform 
              your study experience and boost your academic performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Content */}
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <div className={`inline-flex items-center px-4 py-2 ${feature.bgColor} rounded-full text-sm font-medium mb-6 ${feature.borderColor} border`}>
                      <Icon className="w-4 h-4 mr-2" />
                      Core Feature
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {feature.features.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <div className={`w-5 h-5 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                            <CheckIcon className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-secondary-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={!isEven ? 'lg:col-start-1' : ''}>
                    <div className="relative">
                      <div className={`w-full h-80 bg-gradient-to-br ${feature.color} rounded-3xl shadow-2xl flex items-center justify-center`}>
                        <Icon className="w-32 h-32 text-white opacity-80" />
                      </div>
                      <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg flex items-center justify-center`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Additional Features
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Explore more powerful features that make StudyBuddy the ultimate learning platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to experience these features?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Start your learning journey today and discover the power of AI-driven education
            </p>
            <a
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              Get Started Free
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;
