import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notesAPI } from '../../utils/api';
import { disableBodyScroll, enableBodyScroll, handleEscapeKey, focusFirstElement } from '../../utils/modalUtils';
import toast from 'react-hot-toast';
import {
  XMarkIcon,
  PlusIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const CreateNoteModal = ({ isOpen, onClose, onNoteCreated, editingNote = null }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: '',
    difficulty: 'medium',
    tags: []
  });
  const [availableTags, setAvailableTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll();
      const removeEscapeListener = handleEscapeKey(handleClose);

      fetchTags();
      if (editingNote) {
        setFormData({
          title: editingNote.title,
          content: editingNote.content,
          subject: editingNote.subject?.name || editingNote.subject || '',
          difficulty: editingNote.difficulty,
          tags: editingNote.tags || []
        });
      }

      // Focus first element after modal opens
      setTimeout(() => focusFirstElement(modalRef), 100);

      return () => {
        enableBodyScroll();
        removeEscapeListener();
      };
    }
  }, [isOpen, editingNote]);



  const fetchTags = async () => {
    try {
      const response = await notesAPI.getTags();
      // Handle paginated response format
      const tagsData = response.data.results || response.data;
      setAvailableTags(Array.isArray(tagsData) ? tagsData : []);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
      setAvailableTags([]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTag = async () => {
    if (newTag.trim() && !formData.tags.find(tag => tag.name === newTag.trim())) {
      try {
        const response = await notesAPI.createTag({ name: newTag.trim() });
        const newTagObj = response.data;
        setFormData({
          ...formData,
          tags: [...formData.tags, newTagObj]
        });
        setAvailableTags([...availableTags, newTagObj]);
        setNewTag('');
      } catch (error) {
        toast.error('Failed to create tag');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag.id !== tagToRemove.id)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const noteData = {
        ...formData,
        subject_name: formData.subject,
        tag_names: Array.isArray(formData.tags) ? formData.tags.map(tag => tag.name || tag) : []
      };
      delete noteData.subject;
      delete noteData.tags;

      let response;
      if (editingNote) {
        response = await notesAPI.updateNote(editingNote.id, noteData);
        toast.success('Note updated successfully!');
      } else {
        response = await notesAPI.createNote(noteData);
        toast.success('Note created successfully!');
      }

      onNoteCreated(response.data);
      onClose();
      resetForm();
    } catch (error) {
      toast.error(editingNote ? 'Failed to update note' : 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      subject: '',
      difficulty: 'medium',
      tags: []
    });
    setNewTag('');
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
              className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6 relative z-[9999]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter note title..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter subject (e.g., Mathematics, History)"
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Write your note content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array.isArray(formData.tags) && formData.tags.map(tag => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Add a tag..."
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
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
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : (editingNote ? 'Update Note' : 'Create Note')}
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

export default CreateNoteModal;
