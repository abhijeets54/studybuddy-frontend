import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { disableBodyScroll, enableBodyScroll, handleEscapeKey, focusFirstElement } from '../../utils/modalUtils';
import {
  XMarkIcon,
  BookOpenIcon,
  TagIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const ViewNoteModal = ({ isOpen, onClose, note }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll();
      document.addEventListener('keydown', handleEscapeKey(onClose));
      setTimeout(() => focusFirstElement(modalRef.current), 100);
    } else {
      enableBodyScroll();
    }

    return () => {
      enableBodyScroll();
      document.removeEventListener('keydown', handleEscapeKey(onClose));
    };
  }, [isOpen, onClose]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!note) return null;

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
              onClick={onClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 relative z-[9999]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpenIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 break-words">
                      {note.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>Created {formatDate(note.created_at)}</span>
                      </div>
                      {note.updated_at !== note.created_at && (
                        <div className="flex items-center">
                          <span>• Updated {formatDate(note.updated_at)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(note.difficulty)}`}>
                        {note.difficulty}
                      </span>
                      {note.subject && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {note.subject.name || note.subject}
                        </span>
                      )}
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <TagIcon className="h-3 w-3 text-gray-400" />
                          {note.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {tag.name || tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="border-t border-gray-200 pt-6">
                <div
                  className="prose prose-sm max-w-none bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto"
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  {note.content || 'No content available.'}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ViewNoteModal;
