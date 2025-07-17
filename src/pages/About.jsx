import React from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  HeartIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const values = [
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We constantly push the boundaries of educational technology to create better learning experiences.',
      color: 'from-scholar-500 to-scholar-600'
    },
    {
      icon: HeartIcon,
      title: 'Student-Centric',
      description: 'Every decision we make is guided by what\'s best for our students and their learning journey.',
      color: 'from-ai-500 to-ai-600'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product design to customer support.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: GlobeAltIcon,
      title: 'Accessibility',
      description: 'Quality education should be accessible to everyone, regardless of background or location.',
      color: 'from-accent-500 to-accent-600'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former Stanford professor with 15+ years in educational technology',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and former Google engineer specializing in machine learning',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of Learning Sciences',
      bio: 'Cognitive scientist with expertise in memory and learning optimization',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Alex Kim',
      role: 'Head of Product',
      bio: 'Product strategist focused on creating intuitive learning experiences',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'StudyBuddy was born from a vision to revolutionize learning with AI'
    },
    {
      year: '2021',
      title: 'First 1,000 Users',
      description: 'Reached our first milestone with students from 50+ universities'
    },
    {
      year: '2022',
      title: 'AI Breakthrough',
      description: 'Launched our proprietary adaptive learning algorithm'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded to serve students in over 30 countries worldwide'
    },
    {
      year: '2024',
      title: '100K+ Students',
      description: 'Celebrating over 100,000 students achieving their learning goals'
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
              Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              Empowering learners
              <span className="block text-gradient-primary">around the world</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              At StudyBuddy, we believe that everyone deserves access to personalized, 
              effective learning tools. Our mission is to harness the power of AI to make 
              studying more efficient, engaging, and successful for students everywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
                We're on a mission to democratize quality education by making advanced learning 
                technologies accessible to students worldwide. Through AI-powered tools and 
                evidence-based learning methodologies, we help students achieve their academic 
                goals more effectively than ever before.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed">
                Founded by educators and technologists, StudyBuddy combines deep expertise in 
                learning sciences with cutting-edge artificial intelligence to create tools 
                that adapt to each student's unique learning style and pace.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Students collaborating"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                <AcademicCapIcon className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card text-center group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-secondary-600">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Passionate educators and technologists working together to transform learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-secondary-600 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </h2>
            <p className="text-xl text-secondary-600">
              Key milestones in our mission to transform education
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {milestone.year}
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-secondary-600">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-white/80">
              Numbers that reflect our commitment to student success
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: UserGroupIcon, value: '100K+', label: 'Active Students' },
              { icon: GlobeAltIcon, value: '30+', label: 'Countries' },
              { icon: TrophyIcon, value: '95%', label: 'Success Rate' },
              { icon: AcademicCapIcon, value: '4.9/5', label: 'User Rating' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center text-white"
                >
                  <Icon className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
