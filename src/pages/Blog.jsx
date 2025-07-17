import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon,
  TagIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'study-tips', name: 'Study Tips' },
    { id: 'ai-learning', name: 'AI & Learning' },
    { id: 'product-updates', name: 'Product Updates' },
    { id: 'success-stories', name: 'Success Stories' },
    { id: 'research', name: 'Research' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Science Behind Spaced Repetition: Why It Works',
      excerpt: 'Discover how spaced repetition leverages cognitive science to improve long-term memory retention and why it\'s the foundation of effective learning.',
      author: 'Dr. Emily Watson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'research',
      tags: ['Memory', 'Cognitive Science', 'Learning'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'How AI is Revolutionizing Personalized Learning',
      excerpt: 'Explore how artificial intelligence is transforming education by creating personalized learning experiences that adapt to individual student needs.',
      author: 'Marcus Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'ai-learning',
      tags: ['AI', 'Personalization', 'EdTech'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 3,
      title: '10 Study Techniques That Actually Work',
      excerpt: 'Evidence-based study methods that can dramatically improve your learning efficiency and academic performance.',
      author: 'Sarah Chen',
      date: '2024-01-05',
      readTime: '12 min read',
      category: 'study-tips',
      tags: ['Study Methods', 'Productivity', 'Academic Success'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 4,
      title: 'StudyBuddy 2.0: New Features and Improvements',
      excerpt: 'Announcing our biggest update yet with enhanced AI capabilities, improved user interface, and powerful new analytics features.',
      author: 'Alex Kim',
      date: '2024-01-01',
      readTime: '5 min read',
      category: 'product-updates',
      tags: ['Product Update', 'New Features', 'AI'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 5,
      title: 'From Struggling Student to Medical School: Maria\'s Journey',
      excerpt: 'How Maria used StudyBuddy to transform her study habits and achieve her dream of becoming a doctor.',
      author: 'StudyBuddy Team',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'success-stories',
      tags: ['Success Story', 'Medical School', 'Transformation'],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 6,
      title: 'The Psychology of Motivation in Learning',
      excerpt: 'Understanding the psychological factors that drive motivation and how to maintain momentum in your learning journey.',
      author: 'Dr. Emily Watson',
      date: '2023-12-20',
      readTime: '10 min read',
      category: 'research',
      tags: ['Psychology', 'Motivation', 'Learning Science'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-hero">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-medium text-primary-800 mb-6 border border-primary-200">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Latest Insights
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              StudyBuddy
              <span className="block text-gradient-primary">Blog</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the latest insights on learning science, study techniques, AI in education, 
              and success stories from our community of learners.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-secondary-200 rounded-2xl focus:ring-4 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-secondary-700 hover:bg-secondary-100 border border-secondary-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-secondary-500 mb-4">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 text-secondary-400 mr-2" />
                      <span className="text-secondary-700 font-medium">
                        {featuredPost.author}
                      </span>
                    </div>
                    <button className="btn-primary inline-flex items-center group">
                      Read More
                      <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-medium rounded-full">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-secondary-500 mb-3">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-secondary-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 text-secondary-400 mr-2" />
                      <span className="text-sm text-secondary-700">
                        {post.author}
                      </span>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-200">
                      Read More →
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full"
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Subscribe to our newsletter for the latest insights on learning, AI, and education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-white/30 text-secondary-900"
              />
              <button className="px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-white/90 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
