import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flashcardsAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import {
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  CheckIcon,
  XCircleIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const FlashcardStudy = ({ deck, onClose }) => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studyStats, setStudyStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    initializeStudySession();

    // Cleanup function to save progress on unmount
    return () => {
      if (currentCardIndex > 0 || studyStats.correct > 0 || studyStats.incorrect > 0) {
        saveSessionProgress();
      }
    };
  }, [deck.id]);

  // Save progress when stats change
  useEffect(() => {
    if (studyStats.total > 0 && (studyStats.correct > 0 || studyStats.incorrect > 0)) {
      saveSessionProgress();
    }
  }, [studyStats, currentCardIndex]);

  const initializeStudySession = async () => {
    try {
      // Check for existing session in localStorage
      const savedSession = localStorage.getItem(`flashcard_session_${deck.id}`);
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        setCurrentCardIndex(sessionData.currentCardIndex || 0);
        setStudyStats(sessionData.studyStats || { correct: 0, incorrect: 0, total: 0 });
        setStartTime(new Date(sessionData.startTime));
      } else {
        setStartTime(new Date());
      }

      // Start backend session
      const sessionResponse = await flashcardsAPI.startStudySession(deck.id);
      setSessionId(sessionResponse.data.id);

      // Fetch cards
      await fetchCards();
    } catch (error) {
      console.error('Failed to initialize study session:', error);
      // Continue without session tracking
      await fetchCards();
    }
  };

  const fetchCards = async () => {
    try {
      const response = await flashcardsAPI.getCards(deck.id);
      const responseData = response.data || {};
      // Handle paginated response
      const cardsData = responseData.results || responseData || [];
      setCards(cardsData);
      setStudyStats(prev => ({ ...prev, total: cardsData.length }));
    } catch (error) {
      console.error('Failed to fetch cards:', error);
      toast.error('Failed to load flashcards');
    } finally {
      setLoading(false);
    }
  };

  const currentCard = cards[currentCardIndex];

  // Don't render if no cards or loading
  if (loading || !currentCard) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading flashcards...</p>
          </div>
        </div>
      </div>
    );
  }

  const saveSessionProgress = () => {
    const sessionData = {
      currentCardIndex,
      studyStats,
      startTime: startTime?.toISOString()
    };
    localStorage.setItem(`flashcard_session_${deck.id}`, JSON.stringify(sessionData));
  };

  const handleNext = () => {
    setShowAnswer(false);
    if (currentCardIndex < cards.length - 1) {
      const newIndex = currentCardIndex + 1;
      setCurrentCardIndex(newIndex);
      saveSessionProgress();
    } else {
      // Study session complete
      completeStudySession();
    }
  };

  const completeStudySession = async () => {
    try {
      if (sessionId && startTime) {
        const sessionDuration = Math.floor((new Date() - startTime) / 1000); // in seconds
        await flashcardsAPI.endStudySession(sessionId, {
          cards_studied: studyStats.correct + studyStats.incorrect,
          cards_mastered: studyStats.correct,
          session_duration: sessionDuration
        });
      }

      // Clear saved session
      localStorage.removeItem(`flashcard_session_${deck.id}`);

      toast.success(`Study session complete! ${studyStats.correct}/${studyStats.total} correct`);
      onClose();
    } catch (error) {
      console.error('Failed to save study session:', error);
      toast.success(`Study session complete! ${studyStats.correct}/${studyStats.total} correct`);
      onClose();
    }
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleAnswer = (isCorrect) => {
    setStudyStats(prev => {
      const newStats = {
        ...prev,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        incorrect: isCorrect ? prev.incorrect : prev.incorrect + 1
      };
      // Save progress after updating stats
      setTimeout(() => saveSessionProgress(), 100);
      return newStats;
    });
    setTimeout(handleNext, 500);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium">Loading flashcards...</span>
          </div>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
          <div className="text-center">
            <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cards Found</h3>
            <p className="text-gray-600 mb-6">This deck doesn't have any flashcards yet.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{deck.title}</h2>
            <p className="text-sm text-gray-600">
              Card {currentCardIndex + 1} of {cards.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-600">✓ {studyStats.correct}</span>
              <span className="text-red-600">✗ {studyStats.incorrect}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={showAnswer ? 'answer' : 'question'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[200px] flex items-center justify-center"
            >
              <div className="text-center">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {showAnswer ? 'Answer' : 'Question'}
                  </span>
                </div>
                <div className="text-xl font-medium text-gray-900 leading-relaxed">
                  {showAnswer ? currentCard.back_text : currentCard.front_text}
                </div>
                {showAnswer && currentCard.hint && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Hint:</strong> {currentCard.hint}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-gray-200">
          {!showAnswer ? (
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAnswer}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <EyeIcon className="h-5 w-5" />
                <span>Show Answer</span>
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentCardIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(false)}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  <XCircleIcon className="h-5 w-5" />
                  <span>Incorrect</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <CheckIcon className="h-5 w-5" />
                  <span>Correct</span>
                </motion.button>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <span>Next</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FlashcardStudy;
