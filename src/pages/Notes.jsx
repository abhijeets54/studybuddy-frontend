import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notesAPI } from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import CreateNoteModal from '../components/modals/CreateNoteModal.jsx';
import GenerateNotesModal from '../components/modals/GenerateNotesModal.jsx';
import ViewNoteModal from '../components/modals/ViewNoteModal.jsx';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  HeartIcon,
  TagIcon,
  CalendarIcon,
  BookOpenIcon,
  SparklesIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
    fetchSubjects();
    fetchTags();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getNotes({
        search: searchTerm,
        subject: selectedSubject,
        difficulty: selectedDifficulty
      });
      const notesData = response.data.results || response.data;
      setNotes(Array.isArray(notesData) ? notesData : []);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      setNotes([]); // Set empty array on error
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await notesAPI.getSubjects();
      // Handle paginated response format
      const subjectsData = response.data.results || response.data;
      setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      setSubjects([]); // Set empty array on error
      toast.error('Failed to fetch subjects');
    }
  };

  const fetchTags = async () => {
    try {
      const response = await notesAPI.getTags();
      // Handle paginated response format
      const tagsData = response.data.results || response.data;
      setTags(Array.isArray(tagsData) ? tagsData : []);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
      setTags([]); // Set empty array on error
      toast.error('Failed to fetch tags');
    }
  };

  const handleSearch = () => {
    fetchNotes();
  };

  const handleDeleteNote = async (noteId) => {
    const confirmDelete = () => {
      toast.dismiss(); // Dismiss any existing toasts
      performDelete();
    };

    const performDelete = async () => {
      try {
        await notesAPI.deleteNote(noteId);
        setNotes(Array.isArray(notes) ? notes.filter(note => note.id !== noteId) : []);
        toast.success('Note deleted successfully');
      } catch (error) {
        toast.error('Failed to delete note');
      }
    };

    // Show confirmation toast with action buttons
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <span className="font-medium text-gray-900">
          Are you sure you want to delete this note?
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

  const handleToggleFavorite = async (note) => {
    try {
      const updatedNote = await notesAPI.updateNote(note.id, {
        ...note,
        is_favorite: !note.is_favorite
      });
      setNotes(Array.isArray(notes) ? notes.map(n => n.id === note.id ? updatedNote.data : n) : []);
      toast.success(note.is_favorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update note');
    }
  };

  const handleNoteCreated = (newNote) => {
    if (editingNote) {
      setNotes(Array.isArray(notes) ? notes.map(n => n.id === newNote.id ? newNote : n) : [newNote]);
    } else {
      setNotes([newNote, ...notes]);
    }
    setShowCreateModal(false);
    setEditingNote(null);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowCreateModal(true);
  };

  const handleNotesGenerated = (newNote) => {
    setNotes([newNote, ...notes]);
    setShowGenerateModal(false);
    toast.success('AI notes generated successfully!');
  };

  const handleViewNote = (note) => {
    setViewingNote(note);
    setShowViewModal(true);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Notes</h1>
            <p className="text-gray-600">Organize and manage your study materials</p>
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
              Create Note
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">All Subjects</option>
                {Array.isArray(subjects) && subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filter
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Notes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {Array.isArray(notes) && notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Note Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(note.difficulty)}`}>
                        {note.difficulty}
                      </span>
                      {note.subject && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {note.subject.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleFavorite(note)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {note.is_favorite ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Note Content Preview */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {note.content ? note.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No content available'}
                </p>

                {/* Tags */}
                {Array.isArray(note.tags) && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {note.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag.name}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{note.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                {/* Note Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {formatDate(note.updated_at)}
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleViewNote(note)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Note"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditNote(note)}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Note"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {notes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpenIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600 mb-6">Create your first note to get started with organizing your study materials.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Your First Note
            </motion.button>
          </motion.div>
        )}

        {/* Create/Edit Note Modal */}
        <CreateNoteModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setEditingNote(null);
          }}
          onNoteCreated={handleNoteCreated}
          editingNote={editingNote}
        />

        {/* Generate Notes Modal */}
        <GenerateNotesModal
          isOpen={showGenerateModal}
          onClose={() => setShowGenerateModal(false)}
          onNotesGenerated={handleNotesGenerated}
        />

        {/* View Note Modal */}
        <ViewNoteModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setViewingNote(null);
          }}
          note={viewingNote}
        />
      </div>
    </div>
  );
};

export default Notes;
