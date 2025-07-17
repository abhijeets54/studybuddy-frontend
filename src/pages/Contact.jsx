import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@studybuddy.com',
      color: 'from-scholar-500 to-scholar-600'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      color: 'from-ai-500 to-ai-600'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: QuestionMarkCircleIcon,
      title: 'Help Center',
      description: 'Browse our comprehensive FAQ',
      contact: 'Visit Help Center',
      color: 'from-accent-500 to-accent-600'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Innovation Drive, Suite 400',
      zipcode: 'San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      email: 'sf@studybuddy.com'
    },
    {
      city: 'New York',
      address: '456 Education Avenue, Floor 12',
      zipcode: 'New York, NY 10001',
      phone: '+1 (555) 987-6543',
      email: 'ny@studybuddy.com'
    },
    {
      city: 'London',
      address: '789 Learning Street, Suite 200',
      zipcode: 'London, UK EC1A 1BB',
      phone: '+44 20 7123 4567',
      email: 'london@studybuddy.com'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'press', label: 'Press & Media' }
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
              We're Here to Help
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              Get in touch
              <span className="block text-gradient-primary">with our team</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about StudyBuddy? Need technical support? Want to explore partnerships? 
              We'd love to hear from you and help you succeed in your learning journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
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
              Choose Your Preferred Contact Method
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Multiple ways to reach us, all designed to get you the help you need quickly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card text-center group cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {method.description}
                  </p>
                  <p className="text-primary-600 font-semibold">
                    {method.contact}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                  Send us a message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Tell us more about how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full inline-flex items-center justify-center group"
                  >
                    Send Message
                    <PaperAirplaneIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                  Our Offices
                </h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <motion.div
                      key={office.city}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-6 shadow-lg"
                    >
                      <h4 className="text-lg font-bold text-secondary-900 mb-3">
                        {office.city}
                      </h4>
                      <div className="space-y-2 text-secondary-600">
                        <div className="flex items-start">
                          <MapPinIcon className="w-5 h-5 mr-3 mt-0.5 text-primary-600 flex-shrink-0" />
                          <div>
                            <p>{office.address}</p>
                            <p>{office.zipcode}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0" />
                          <p>{office.phone}</p>
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-5 h-5 mr-3 text-primary-600 flex-shrink-0" />
                          <p>{office.email}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-secondary-900 mb-4">
                  Support Hours
                </h4>
                <div className="space-y-3 text-secondary-600">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-3 text-primary-600" />
                    <div>
                      <p className="font-medium">Monday - Friday</p>
                      <p className="text-sm">9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-3 text-primary-600" />
                    <div>
                      <p className="font-medium">Weekend</p>
                      <p className="text-sm">Email support only</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Quick Answers
            </h2>
            <p className="text-xl text-secondary-600">
              Common questions we receive from our users
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'How quickly can I expect a response?',
                answer: 'We typically respond to emails within 24 hours during business days. Live chat responses are immediate during support hours.'
              },
              {
                question: 'Do you offer phone support?',
                answer: 'Yes, phone support is available for Pro and Enterprise customers during business hours (9 AM - 6 PM EST).'
              },
              {
                question: 'Can I schedule a demo?',
                answer: 'Absolutely! Contact our sales team to schedule a personalized demo of StudyBuddy\'s features.'
              },
              {
                question: 'How do I report a bug?',
                answer: 'Please use our contact form with "Technical Support" category, or email us directly at support@studybuddy.com with detailed steps to reproduce the issue.'
              }
            ].map((faq, index) => (
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
    </div>
  );
};

export default Contact;
