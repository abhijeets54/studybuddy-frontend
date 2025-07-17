import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notesAPI } from '../../utils/api';
import { disableBodyScroll, enableBodyScroll, handleEscapeKey, focusFirstElement } from '../../utils/modalUtils';
import toast from 'react-hot-toast';
import {
  XMarkIcon,
  SparklesIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const GenerateNotesModal = ({ isOpen, onClose, onNotesGenerated }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    guidelines: '',
    subject: '',
    difficulty: 'medium'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll();
      document.addEventListener('keydown', handleEscapeKey(handleClose));
      setTimeout(() => focusFirstElement(modalRef.current), 100);
    } else {
      enableBodyScroll();
    }

    return () => {
      enableBodyScroll();
      document.removeEventListener('keydown', handleEscapeKey(handleClose));
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!loading) {
      setFormData({
        topic: '',
        description: '',
        guidelines: '',
        subject: '',
        difficulty: 'medium'
      });
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setLoading(true);
    
    try {
      const response = await notesAPI.generateWithAI(formData);
      toast.success('Notes generated successfully!');
      onNotesGenerated(response.data);
      handleClose();
    } catch (error) {
      console.error('Error generating notes:', error);
      toast.error(error.response?.data?.error || 'Failed to generate notes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9998] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6 relative z-[9999]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <SparklesIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Generate Notes with AI</h3>
                    <p className="text-sm text-gray-600">Create comprehensive study notes from any topic</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={loading}
                >
                  <XMarkIcon className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Topic */}
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                    Topic <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    placeholder="e.g., Photosynthesis, World War II, Calculus Derivatives"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide additional context or specific aspects you want covered..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                    disabled={loading}
                  />
                </div>

                {/* Guidelines */}
                <div>
                  <label htmlFor="guidelines" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <LightBulbIcon className="h-4 w-4 text-yellow-500" />
                      <span>Special Guidelines <span className="text-gray-400">(Optional)</span></span>
                    </div>
                  </label>
                  <textarea
                    id="guidelines"
                    name="guidelines"
                    value={formData.guidelines}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements, focus areas, or formatting preferences..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                    disabled={loading}
                  />
                </div>

                {/* Subject and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter subject (e.g., Mathematics, History)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      disabled={loading}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <SparklesIcon className="h-5 w-5" />
                    <span>{loading ? 'Generating...' : 'Generate Notes'}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GenerateNotesModal;
