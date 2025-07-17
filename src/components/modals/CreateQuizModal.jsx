import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzesAPI } from '../../utils/api';
import { disableBodyScroll, enableBodyScroll, handleEscapeKey, focusFirstElement } from '../../utils/modalUtils';
import toast from 'react-hot-toast';
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const CreateQuizModal = ({ isOpen, onClose, onQuizCreated, editingQuiz = null }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'medium',
    time_limit: 30,
    subject: ''
  });
  const [questions, setQuestions] = useState([{
    question: '',
    question_type: 'multiple_choice',
    options: ['', '', '', ''],
    correct_answer: 0
  }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll();
      const removeEscapeListener = handleEscapeKey(handleClose);

      if (editingQuiz) {
        setFormData({
          title: editingQuiz.title,
          description: editingQuiz.description,
          difficulty: editingQuiz.difficulty,
          time_limit: Math.round((editingQuiz.time_limit || 1800) / 60), // Convert seconds to minutes
          subject: editingQuiz.subject?.name || editingQuiz.subject || ''
        });
        // Load questions if editing
        if (editingQuiz.questions) {
          setQuestions(editingQuiz.questions);
        }
      }

      // Focus first element after modal opens
      setTimeout(() => focusFirstElement(modalRef), 100);

      return () => {
        enableBodyScroll();
        removeEscapeListener();
      };
    }
  }, [isOpen, editingQuiz]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      question_type: 'multiple_choice',
      options: ['', '', '', ''],
      correct_answer: 0
    }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length > 2) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      // Adjust correct answer if needed
      if (updatedQuestions[questionIndex].correct_answer >= optionIndex) {
        updatedQuestions[questionIndex].correct_answer = Math.max(0, updatedQuestions[questionIndex].correct_answer - 1);
      }
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate questions
      const validQuestions = questions.filter(q => 
        q.question.trim() && 
        q.options.every(opt => opt.trim()) &&
        q.correct_answer < q.options.length
      );
      
      if (validQuestions.length === 0) {
        toast.error('Please add at least one complete question');
        setLoading(false);
        return;
      }

      const quizData = {
        ...formData,
        subject_name: formData.subject,
        time_limit: formData.time_limit * 60, // Convert minutes to seconds
        questions: validQuestions
      };
      delete quizData.subject;

      let response;
      if (editingQuiz) {
        response = await quizzesAPI.updateQuiz(editingQuiz.id, quizData);
        toast.success('Quiz updated successfully!');
      } else {
        response = await quizzesAPI.createQuiz(quizData);
        toast.success('Quiz created successfully!');
      }

      onQuizCreated(response.data);
      onClose();
      resetForm();
    } catch (error) {
      toast.error(editingQuiz ? 'Failed to update quiz' : 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      difficulty: 'medium',
      time_limit: 30,
      subject: ''
    });
    setQuestions([{
      question: '',
      question_type: 'multiple_choice',
      options: ['', '', '', ''],
      correct_answer: 0
    }]);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[9998]"
              onClick={handleClose}
            />

            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 relative z-[9999]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quiz Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter quiz title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                      placeholder="Describe your quiz..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      Time Limit (minutes)
                    </label>
                    <input
                      type="number"
                      name="time_limit"
                      value={formData.time_limit}
                      onChange={handleInputChange}
                      min="1"
                      max="180"
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Questions
                    </label>
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Question
                    </button>
                  </div>

                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {questions.map((question, questionIndex) => (
                      <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-gray-200 rounded-xl bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-medium text-gray-900">
                            Question {questionIndex + 1}
                          </h4>
                          {questions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeQuestion(questionIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Question Text *
                            </label>
                            <textarea
                              value={question.question}
                              onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                              placeholder="Enter your question..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Answer Options
                            </label>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    name={`correct-${questionIndex}`}
                                    checked={question.correct_answer === optionIndex}
                                    onChange={() => handleQuestionChange(questionIndex, 'correct_answer', optionIndex)}
                                    className="text-green-600 focus:ring-green-500"
                                  />
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder={`Option ${optionIndex + 1}...`}
                                  />
                                  {question.options.length > 2 && (
                                    <button
                                      type="button"
                                      onClick={() => removeOption(questionIndex, optionIndex)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              {question.options.length < 6 && (
                                <button
                                  type="button"
                                  onClick={() => addOption(questionIndex)}
                                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                                >
                                  + Add Option
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : (editingQuiz ? 'Update Quiz' : 'Create Quiz')}
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

export default CreateQuizModal;
