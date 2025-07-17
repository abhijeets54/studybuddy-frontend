import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flashcardsAPI } from '../../utils/api';
import { disableBodyScroll, enableBodyScroll, handleEscapeKey, focusFirstElement } from '../../utils/modalUtils';
import toast from 'react-hot-toast';
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const CreateFlashcardModal = ({ isOpen, onClose, onDeckCreated, editingDeck = null }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'medium',
    subject: ''
  });
  const [cards, setCards] = useState([{ front: '', back: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll();
      const removeEscapeListener = handleEscapeKey(handleClose);

      if (editingDeck) {
        setFormData({
          title: editingDeck.title,
          description: editingDeck.description,
          difficulty: editingDeck.difficulty,
          subject: editingDeck.subject?.name || editingDeck.subject || ''
        });
        // Load cards if editing
        fetchCards(editingDeck.id);
      }

      // Focus first element after modal opens
      setTimeout(() => focusFirstElement(modalRef), 100);

      return () => {
        enableBodyScroll();
        removeEscapeListener();
      };
    }
  }, [isOpen, editingDeck]);

  const fetchCards = async (deckId) => {
    try {
      const response = await flashcardsAPI.getCards(deckId);
      if (response.data.length > 0) {
        setCards(response.data.map(card => ({ front: card.front, back: card.back })));
      }
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const addCard = () => {
    setCards([...cards, { front: '', back: '' }]);
  };

  const removeCard = (index) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate cards
      const validCards = cards.filter(card => card.front.trim() && card.back.trim());
      if (validCards.length === 0) {
        toast.error('Please add at least one complete flashcard');
        setLoading(false);
        return;
      }

      const deckData = {
        ...formData,
        subject_name: formData.subject
      };
      delete deckData.subject;

      let response;
      if (editingDeck) {
        response = await flashcardsAPI.updateDeck(editingDeck.id, deckData);
        toast.success('Deck updated successfully!');
      } else {
        response = await flashcardsAPI.createDeck(deckData);
        toast.success('Deck created successfully!');
      }

      // Create/update cards
      const deckId = response.data.id;
      if (!deckId) {
        throw new Error('Deck ID not returned from server');
      }

      for (const card of validCards) {
        await flashcardsAPI.createCard(deckId, {
          front_text: card.front,
          back_text: card.back,
          hint: card.hint || ''
        });
      }

      onDeckCreated(response.data);
      onClose();
      resetForm();
    } catch (error) {
      toast.error(editingDeck ? 'Failed to update deck' : 'Failed to create deck');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      difficulty: 'medium',
      subject: ''
    });
    setCards([{ front: '', back: '' }]);
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
                  {editingDeck ? 'Edit Flashcard Deck' : 'Create New Flashcard Deck'}
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
                      Deck Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Enter deck title..."
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
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                    placeholder="Describe your flashcard deck..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Flashcards
                    </label>
                    <button
                      type="button"
                      onClick={addCard}
                      className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Card
                    </button>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cards.map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Front (Question)
                          </label>
                          <textarea
                            value={card.front}
                            onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                            placeholder="Enter the question or prompt..."
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Back (Answer)
                            </label>
                            {cards.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeCard(index)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <textarea
                            value={card.back}
                            onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                            placeholder="Enter the answer or explanation..."
                          />
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
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : (editingDeck ? 'Update Deck' : 'Create Deck')}
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

export default CreateFlashcardModal;
