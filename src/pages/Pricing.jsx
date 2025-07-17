import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  TrophyIcon,
  RocketLaunchIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started with AI-powered learning',
      price: { monthly: 0, annual: 0 },
      icon: SparklesIcon,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200',
      features: [
        'Up to 50 notes',
        'Basic flashcards',
        '5 quizzes per month',
        'Basic analytics',
        'Mobile app access',
        'Community support'
      ],
      limitations: [
        'Limited AI features',
        'No advanced analytics',
        'No priority support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      description: 'Ideal for serious students and professionals',
      price: { monthly: 9.99, annual: 7.99 },
      icon: RocketLaunchIcon,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      features: [
        'Unlimited notes',
        'Advanced flashcards with spaced repetition',
        'Unlimited quizzes',
        'Advanced analytics & insights',
        'AI-powered study recommendations',
        'Priority support',
        'Export capabilities',
        'Collaboration features',
        'Custom study schedules'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For institutions and large teams',
      price: { monthly: 29.99, annual: 24.99 },
      icon: TrophyIcon,
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-200',
      features: [
        'Everything in Pro',
        'Team management',
        'Advanced admin controls',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom branding',
        'Advanced security features',
        'Bulk user management',
        'Custom reporting'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time from your account settings. No cancellation fees.'
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
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              Choose the perfect plan
              <span className="block text-gradient-primary">for your learning journey</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Start free and upgrade as you grow. All plans include our core AI-powered features 
              with no hidden fees or surprise charges.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-secondary-900' : 'text-secondary-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  isAnnual ? 'bg-primary-600' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-secondary-900' : 'text-secondary-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="inline-flex items-center px-2 py-1 bg-success-100 text-success-800 text-xs font-medium rounded-full">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.price.annual : plan.price.monthly;
              
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-white rounded-3xl shadow-xl border-2 ${
                    plan.popular ? 'border-primary-500 scale-105' : 'border-secondary-200'
                  } p-8 hover:shadow-2xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">{plan.name}</h3>
                    <p className="text-secondary-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-secondary-900">${price}</span>
                      {price > 0 && (
                        <span className="text-secondary-500">/{isAnnual ? 'year' : 'month'}</span>
                      )}
                    </div>

                    <button
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl'
                          : 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-secondary-900 uppercase tracking-wide mb-4">
                      What's included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckIcon className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary-700">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-start">
                          <XMarkIcon className="w-5 h-5 text-error-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-secondary-50">
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
              Have questions? We've got answers.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-secondary-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
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
              Ready to start your learning journey?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of students who are already studying smarter with StudyBuddy
            </p>
            <a
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              Start Free Trial
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
