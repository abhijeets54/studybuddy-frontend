import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  TrophyIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: ClipboardDocumentListIcon,
      title: 'Smart Notes',
      description: 'Organize your study materials with AI-powered categorization and search',
      detailedDescription: 'Transform your note-taking experience with intelligent organization, automatic tagging, and powerful search capabilities. Our AI understands your content and helps you find exactly what you need, when you need it.',
      benefits: [
        'AI-powered automatic categorization',
        'Advanced search with semantic understanding',
        'Rich text editing with multimedia support',
        'Collaborative note sharing and editing',
        'Cross-platform synchronization'
      ],
      color: 'from-scholar-500 to-scholar-600',
      bgColor: 'bg-scholar-50',
      borderColor: 'border-scholar-200',
      image: '/notes.png'
    },
    {
      icon: BookOpenIcon,
      title: 'Interactive Flashcards',
      description: 'Create and study with spaced repetition algorithms for optimal retention',
      detailedDescription: 'Master any subject with scientifically-proven spaced repetition. Our intelligent flashcard system adapts to your learning pace and optimizes review schedules for maximum retention.',
      benefits: [
        'Spaced repetition algorithm for optimal learning',
        'AI-generated flashcards from your notes',
        'Multiple study modes and difficulty levels',
        'Progress tracking and performance analytics',
        'Offline study capabilities'
      ],
      color: 'from-ai-500 to-ai-600',
      bgColor: 'bg-ai-50',
      borderColor: 'border-ai-200',
      image: '/flash.png'
    },
    {
      icon: AcademicCapIcon,
      title: 'Adaptive Quizzes',
      description: 'Test your knowledge with AI-generated questions tailored to your level',
      detailedDescription: 'Challenge yourself with personalized quizzes that adapt to your knowledge level. Our AI creates questions that target your weak areas and reinforce your strengths.',
      benefits: [
        'AI-generated questions from your content',
        'Adaptive difficulty based on performance',
        'Multiple question types and formats',
        'Instant feedback and explanations',
        'Comprehensive performance analytics'
      ],
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const stats = [
    { icon: UserGroupIcon, value: '10K+', label: 'Active Students' },
    { icon: BookOpenIcon, value: '50K+', label: 'Study Sessions' },
    { icon: TrophyIcon, value: '95%', label: 'Success Rate' },
    { icon: SparklesIcon, value: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero pt-16 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-scholar-200 to-ai-200 rounded-full opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-medium text-primary-800 mb-6 border border-primary-200">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Powered by Advanced AI Technology
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondary-900 mb-6 leading-tight">
                Your AI-Powered
                <span className="block text-gradient-primary mt-2">
                  Study Companion
                </span>
              </h1>
              <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your learning experience with intelligent flashcards, adaptive quizzes,
                smart notes, and comprehensive analytics. Study smarter, not harder with our
                <span className="text-gradient-scholar font-semibold"> professional-grade AI tools</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn-primary inline-flex items-center text-lg group"
                >
                  Go to Dashboard
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-primary inline-flex items-center text-lg group"
                  >
                    Get Started Free
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link
                    to="/login"
                    className="btn-secondary inline-flex items-center text-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-secondary-500"
            >
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <span>Trusted by 10,000+ students</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></div>
                <span>Free to start</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Students studying together with AI technology"
                  className="rounded-3xl shadow-2xl border border-secondary-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent rounded-3xl"></div>

                {/* Floating UI Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-scholar-400 to-scholar-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <BookOpenIcon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-4 -right-8 w-20 h-20 bg-gradient-to-br from-ai-400 to-ai-600 rounded-xl shadow-lg flex items-center justify-center">
                  <SparklesIcon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-6 left-8 w-28 h-28 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <ChartBarIcon className="w-14 h-14 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-medium text-primary-800 mb-6 border border-primary-200">
              <AcademicCapIcon className="w-4 h-4 mr-2" />
              Comprehensive Learning Suite
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Everything you need to
              <span className="text-gradient-primary"> excel academically</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform combines cutting-edge technology with proven learning methodologies
              to create the ultimate study experience. From intelligent note-taking to adaptive assessments,
              we've got every aspect of your learning journey covered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-feature group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  {/* <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors duration-300">
                    Learn more
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div> */}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Features Sections */}
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isEven = index % 2 === 0;

        return (
          <section key={feature.title} className={`py-24 ${isEven ? 'bg-white' : 'bg-secondary-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={!isEven ? 'lg:col-start-2' : ''}
                >
                  <div className={`inline-flex items-center px-4 py-2 ${feature.bgColor} rounded-full text-sm font-medium mb-6 ${feature.borderColor} border`}>
                    <Icon className="w-4 h-4 mr-2" />
                    Feature Spotlight
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                    {feature.detailedDescription}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-4 mb-8">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center"
                      >
                        <div className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-secondary-700 font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={isAuthenticated ?
                      (index === 0 ? "/notes" : index === 1 ? "/flashcards" : "/quizzes")
                      : "/register"
                    }
                    className="btn-primary inline-flex items-center group"
                  >
                    {isAuthenticated ? 'Try Now' : 'Get Started'}
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={!isEven ? 'lg:col-start-1' : ''}
                >
                  <div className="relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="rounded-2xl shadow-2xl border border-secondary-200"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.color.replace('from-', 'from-').replace('to-', 'to-')}/10 to-transparent rounded-2xl`}></div>

                    {/* Icon */}
                    <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900/95 to-slate-800/95"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-scholar-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-ai-500/20 to-accent-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-500/10 via-scholar-500/10 to-ai-500/10 rounded-full blur-3xl"></div>
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6 border border-white/30">
              <TrophyIcon className="w-4 h-4 mr-2" />
              Trusted by Students Worldwide
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join thousands of successful learners
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our platform has helped students achieve remarkable results across the globe
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center group"
                >
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-primary-400/50 group-hover:bg-gradient-to-br group-hover:from-primary-500/20 group-hover:to-scholar-500/20 transition-all duration-300 shadow-lg">
                      <Icon className="h-10 w-10 text-white group-hover:text-primary-300 transition-colors duration-300" />
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-primary-500/30 to-scholar-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Animated Counter */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2 group-hover:from-primary-300 group-hover:to-scholar-300 transition-all duration-300"
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <div className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>

                  {/* Animated Underline */}
                  <div className="w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mt-3 group-hover:w-12 transition-all duration-300 rounded-full"></div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-white/80 text-lg mb-6">
              Ready to join our community of successful learners?
            </p>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Start Learning Today
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      {!isAuthenticated && (
        <section className="py-24 bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-scholar-200 to-ai-200 rounded-full opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-medium text-primary-800 mb-6 border border-primary-200">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Start Your Journey Today
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6 leading-tight">
                Ready to
                <span className="text-gradient-primary"> transform your learning</span>?
              </h2>

              <p className="text-xl text-secondary-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of students who are already studying smarter with StudyBuddy.
                Experience the power of AI-driven learning and unlock your full academic potential.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center text-lg group"
                >
                  Start Learning Today
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary inline-flex items-center text-lg"
                >
                  Already have an account?
                </Link>
              </div>

              {/* Features Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-scholar-400 to-scholar-600 rounded-2xl flex items-center justify-center mb-4">
                    <ClipboardDocumentListIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Smart Notes</h3>
                  <p className="text-secondary-600 text-sm text-center">AI-powered organization and search</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-ai-400 to-ai-600 rounded-2xl flex items-center justify-center mb-4">
                    <BookOpenIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Adaptive Learning</h3>
                  <p className="text-secondary-600 text-sm text-center">Personalized study experience</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mb-4">
                    <ChartBarIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Progress Tracking</h3>
                  <p className="text-secondary-600 text-sm text-center">Detailed analytics and insights</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
