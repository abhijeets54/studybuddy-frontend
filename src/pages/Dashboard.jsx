import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { analyticsAPI, flashcardsAPI } from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  FireIcon,
  TrophyIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsAPI.getOverview();
      const analyticsData = response.data;

      // Ensure study_streak is properly structured
      if (analyticsData.study_streak && typeof analyticsData.study_streak === 'object') {
        // study_streak is already an object, keep it as is
        setAnalytics(analyticsData);
      } else {
        // If study_streak is not an object, create a default structure
        setAnalytics({
          ...analyticsData,
          study_streak: {
            current_streak: analyticsData.study_streak || 0,
            longest_streak: 0,
            last_study_date: null,
            total_study_days: 0
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Set default analytics data on error
      setAnalytics({
        study_streak: { current_streak: 0, longest_streak: 0, last_study_date: null, total_study_days: 0 },
        total_notes: 0,
        total_quizzes: 0,
        total_flashcard_decks: 0,
        average_quiz_score: 0,
        recent_activities: [],
        subject_performances: [],
        current_goals: [],
        recent_achievements: [],
        weekly_activity: []
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Create Note',
      description: 'Add new study notes',
      icon: ClipboardDocumentListIcon,
      href: '/notes',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'New Flashcard Deck',
      description: 'Create flashcard deck',
      icon: BookOpenIcon,
      href: '/flashcards',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge',
      icon: AcademicCapIcon,
      href: '/quizzes',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  const statsCards = [
    {
      title: 'Study Streak',
      value: analytics?.study_streak?.current_streak || 0,
      unit: 'days',
      icon: FireIcon,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Total Notes',
      value: typeof analytics?.total_notes === 'number' ? analytics.total_notes : 0,
      unit: '',
      icon: ClipboardDocumentListIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Flashcard Decks',
      value: typeof analytics?.total_flashcard_decks === 'number' ? analytics.total_flashcard_decks : 0,
      unit: '',
      icon: BookOpenIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Quizzes Taken',
      value: typeof analytics?.total_quizzes === 'number' ? analytics.total_quizzes : 0,
      unit: '',
      icon: TrophyIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.first_name || user?.username}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Ready to continue your learning journey?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                      {stat.value}{stat.unit}
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-secondary-600 group-hover:text-secondary-700 transition-colors duration-300">{stat.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={action.href}
                    className="block card-feature group"
                  >
                    <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${action.textColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      {action.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors">
                      Get started
                      <PlusIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default Dashboard;
