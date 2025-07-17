import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flashcardsAPI } from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import CreateFlashcardModal from '../components/modals/CreateFlashcardModal.jsx';
import GenerateFlashcardsModal from '../components/modals/GenerateFlashcardsModal.jsx';
import FlashcardStudy from '../components/study/FlashcardStudy.jsx';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  PlayIcon,
  PencilIcon,
  TrashIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Flashcards = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);
  const [studyingDeck, setStudyingDeck] = useState(null);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await flashcardsAPI.getDecks();
      setDecks(response.data.results || response.data);
    } catch (error) {
      toast.error('Failed to fetch flashcard decks');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeck = async (deckId) => {
    const confirmDelete = () => {
      toast.dismiss(); // Dismiss any existing toasts
      performDelete();
    };

    const performDelete = async () => {
      try {
        await flashcardsAPI.deleteDeck(deckId);
        setDecks(decks.filter(deck => deck.id !== deckId));
        toast.success('Deck deleted successfully');
      } catch (error) {
        toast.error('Failed to delete deck');
      }
    };

    // Show confirmation toast with action buttons
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <span className="font-medium text-gray-900">
          Are you sure you want to delete this deck?
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

  const handleStartStudy = (deck) => {
    setStudyingDeck(deck);
  };

  const handleDeckCreated = (newDeck) => {
    if (editingDeck) {
      setDecks(decks.map(d => d.id === newDeck.id ? newDeck : d));
    } else {
      setDecks([newDeck, ...decks]);
    }
    setShowCreateModal(false);
    setEditingDeck(null);
  };

  const handleFlashcardsGenerated = (newDeck) => {
    setDecks([newDeck, ...decks]);
    setShowGenerateModal(false);
  };

  const handleEditDeck = (deck) => {
    setEditingDeck(deck);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Flashcard Decks</h1>
            <p className="text-gray-600">Study with spaced repetition for better retention</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGenerateModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
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
              Create Deck
            </motion.button>
          </div>
        </motion.div>



        {/* Decks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {decks.map((deck, index) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Deck Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {deck.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {deck.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(deck.difficulty)}`}>
                        {deck.difficulty}
                      </span>
                      {deck.subject && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {deck.subject.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Deck Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{deck.flashcard_count || 0}</p>
                    <p className="text-xs text-gray-600">Cards</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Updated {formatDate(deck.updated_at)}
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleStartStudy(deck)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Study Deck"
                    >
                      <PlayIcon className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditDeck(deck)}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteDeck(deck.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Deck"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Quick Study Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartStudy(deck)}
                  className="w-full mt-4 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
                >
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Start Studying
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {decks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpenIcon className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No flashcard decks yet</h3>
            <p className="text-gray-600 mb-6">Create your first deck to start studying with flashcards.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Your First Deck
            </motion.button>
          </motion.div>
        )}

        {/* Create/Edit Deck Modal */}
        <CreateFlashcardModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setEditingDeck(null);
          }}
          onDeckCreated={handleDeckCreated}
          editingDeck={editingDeck}
        />

        {/* Generate Flashcards Modal */}
        <GenerateFlashcardsModal
          isOpen={showGenerateModal}
          onClose={() => setShowGenerateModal(false)}
          onFlashcardsGenerated={handleFlashcardsGenerated}
        />

        {/* Flashcard Study Interface */}
        {studyingDeck && (
          <FlashcardStudy
            deck={studyingDeck}
            onClose={() => setStudyingDeck(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Flashcards;
