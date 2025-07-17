import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ServerIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Status = () => {
  const services = [
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '245ms',
      icon: GlobeAltIcon
    },
    {
      name: 'Mobile Apps',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '180ms',
      icon: DevicePhoneMobileIcon
    },
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '95ms',
      icon: ServerIcon
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '12ms',
      icon: CloudIcon
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '150ms',
      icon: ShieldCheckIcon
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: '99.96%',
      responseTime: '320ms',
      icon: CloudIcon
    }
  ];

  const incidents = [
    {
      date: '2024-01-15',
      title: 'Scheduled Maintenance - Database Optimization',
      status: 'resolved',
      duration: '2 hours',
      description: 'Performed routine database maintenance to improve performance.'
    },
    {
      date: '2024-01-10',
      title: 'Brief API Slowdown',
      status: 'resolved',
      duration: '15 minutes',
      description: 'Temporary increase in API response times due to high traffic. Resolved by scaling infrastructure.'
    },
    {
      date: '2024-01-05',
      title: 'Mobile App Update Deployment',
      status: 'resolved',
      duration: '30 minutes',
      description: 'Deployed mobile app updates with improved sync functionality.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-success-600 bg-success-100';
      case 'degraded':
        return 'text-warning-600 bg-warning-100';
      case 'outage':
        return 'text-error-600 bg-error-100';
      default:
        return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return CheckCircleIcon;
      case 'degraded':
        return ExclamationTriangleIcon;
      case 'outage':
        return ExclamationTriangleIcon;
      default:
        return ClockIcon;
    }
  };

  const overallStatus = services.every(service => service.status === 'operational') 
    ? 'All Systems Operational' 
    : 'Some Systems Experiencing Issues';

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
              System Status
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              StudyBuddy
              <span className="block text-gradient-primary">Status Page</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Real-time status and performance metrics for all StudyBuddy services. 
              Stay informed about system health and any ongoing incidents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center px-8 py-4 bg-success-100 text-success-800 rounded-2xl text-xl font-semibold mb-8">
              <CheckCircleIcon className="w-6 h-6 mr-3" />
              {overallStatus}
            </div>
            <p className="text-lg text-secondary-600">
              Last updated: {new Date().toLocaleString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Status */}
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
              Service Status
            </h2>
            <p className="text-lg text-secondary-600">
              Current status of all StudyBuddy services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const StatusIcon = getStatusIcon(service.status);
              
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mr-3">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {service.name}
                      </h3>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-secondary-500 mb-1">Uptime (30 days)</p>
                      <p className="font-semibold text-secondary-900">{service.uptime}</p>
                    </div>
                    <div>
                      <p className="text-secondary-500 mb-1">Response Time</p>
                      <p className="font-semibold text-secondary-900">{service.responseTime}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Recent Incidents
            </h2>
            <p className="text-lg text-secondary-600">
              Past incidents and maintenance activities
            </p>
          </motion.div>

          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-secondary-900 mr-3">
                        {incident.title}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 bg-success-100 text-success-800 rounded-full text-sm font-medium">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Resolved
                      </span>
                    </div>
                    <p className="text-secondary-600 mb-3">
                      {incident.description}
                    </p>
                    <div className="flex items-center text-sm text-secondary-500">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      <span className="mr-4">Duration: {incident.duration}</span>
                      <span>Date: {new Date(incident.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Stay Informed
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Subscribe to status updates and get notified about incidents and maintenance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-white/30 text-secondary-900"
              />
              <button className="px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-white/90 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Status;
