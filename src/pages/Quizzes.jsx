import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzesAPI } from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import CreateQuizModal from '../components/modals/CreateQuizModal.jsx';
import GenerateQuizModal from '../components/modals/GenerateQuizModal.jsx';
import QuizTaking from '../components/study/QuizTaking.jsx';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  PlayIcon,
  PencilIcon,
  TrashIcon,
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [takingQuiz, setTakingQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesAPI.getQuizzes();
      setQuizzes(response.data.results || response.data);
    } catch (error) {
      toast.error('Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    const confirmDelete = () => {
      toast.dismiss(); // Dismiss any existing toasts
      performDelete();
    };

    const performDelete = async () => {
      try {
        await quizzesAPI.deleteQuiz(quizId);
        setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
        toast.success('Quiz deleted successfully');
      } catch (error) {
        toast.error('Failed to delete quiz');
      }
    };

    // Show confirmation toast with action buttons
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <span className="font-medium text-gray-900">
          Are you sure you want to delete this quiz?
        </span>
        <div className="flex space-x-2">
          <button
            onClick={confirmDelete}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 10000, // Keep toast open longer for user decision
      style: {
        background: '#fff',
        color: '#000',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
      },
    });
  };

  const handleStartQuiz = (quiz) => {
    setTakingQuiz(quiz);
  };

  const handleQuizCreated = (newQuiz) => {
    if (editingQuiz) {
      setQuizzes(quizzes.map(q => q.id === newQuiz.id ? newQuiz : q));
    } else {
      setQuizzes([newQuiz, ...quizzes]);
    }
    setShowCreateModal(false);
    setEditingQuiz(null);
  };

  const handleQuizGenerated = (newQuiz) => {
    setQuizzes([newQuiz, ...quizzes]);
    setShowGenerateModal(false);
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setShowCreateModal(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-300/20 rounded-full blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-teal-200/20 to-cyan-300/20 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quizzes</h1>
            <p className="text-gray-600">Test your knowledge and track your progress</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGenerateModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              AI Generate
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Quiz
            </motion.button>
          </div>
        </motion.div>



        {/* Quizzes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id || `quiz-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Quiz Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {quiz.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                      {quiz.subject && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {quiz.subject.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quiz Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{quiz.total_questions || 0}</p>
                    <p className="text-xs text-gray-600">Questions</p>
                  </div>
                </div>

                {/* Time Limit */}
                {quiz.time_limit && (
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    <span>{Math.round(quiz.time_limit / 60)} minutes</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Created {formatDate(quiz.created_at)}
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleStartQuiz(quiz)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Take Quiz"
                    >
                      <PlayIcon className="h-4 w-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditQuiz(quiz)}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Quiz"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Quick Start Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full mt-4 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 font-medium"
                >
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Take Quiz
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {quizzes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AcademicCapIcon className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No quizzes yet</h3>
            <p className="text-gray-600 mb-6">Create your first quiz to start testing your knowledge.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Your First Quiz
            </motion.button>
          </motion.div>
        )}

        {/* Create/Edit Quiz Modal */}
        <CreateQuizModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setEditingQuiz(null);
          }}
          onQuizCreated={handleQuizCreated}
          editingQuiz={editingQuiz}
        />

        {/* Generate Quiz Modal */}
        <GenerateQuizModal
          isOpen={showGenerateModal}
          onClose={() => setShowGenerateModal(false)}
          onQuizGenerated={handleQuizGenerated}
        />

        {/* Quiz Taking Interface */}
        {takingQuiz && (
          <QuizTaking
            quiz={takingQuiz}
            onClose={() => setTakingQuiz(null)}
            onComplete={(results) => {
              // Handle quiz completion
              console.log('Quiz completed with results:', results);
              fetchQuizzes(); // Refresh the quiz list
            }}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
