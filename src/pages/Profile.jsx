import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      name: 'Dashboard',
      description: 'View your study overview and recent activity',
      href: '/dashboard',
      icon: HomeIcon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Notes',
      description: 'Create and manage your study notes',
      href: '/notes',
      icon: ClipboardDocumentListIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Flashcards',
      description: 'Study with interactive flashcard decks',
      href: '/flashcards',
      icon: BookOpenIcon,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Quizzes',
      description: 'Test your knowledge with custom quizzes',
      href: '/quizzes',
      icon: AcademicCapIcon,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
        >
          <div className="text-center">
            {/* User Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user?.username
                }
              </h1>
              <p className="text-gray-600 text-lg">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Access to Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Access</h2>
            <p className="text-gray-600">Jump to your favorite study tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    to={feature.href}
                    className="group block p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {feature.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {feature.description}
                        </p>
                      </div>
                      <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Information</h2>
            <p className="text-gray-600">Your profile details</p>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Full Name
              </label>
              <p className="text-lg text-gray-900">
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user?.username || 'Not set'
                }
              </p>
            </div>

            <div className="text-center">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email Address
              </label>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>

            <div className="text-center">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Member Since
              </label>
              <p className="text-lg text-gray-900">
                {user?.date_joined
                  ? new Date(user.date_joined).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Unknown'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
