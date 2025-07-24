# 📚 StudyBuddy Frontend

> A modern, feature-rich React application for comprehensive study management including note-taking, flashcards, and interactive quizzes.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

### 📝 **Smart Note Management**
- Rich text editor with formatting options
- Organize notes by categories and tags
- AI-powered note generation from topics
- Search and filter capabilities
- Export notes in multiple formats

### 🃏 **Interactive Flashcards**
- Create custom flashcard decks
- Spaced repetition algorithm
- Progress tracking and analytics
- AI-generated flashcards from content
- Multiple study modes (flip, quiz, review)

### 📊 **Dynamic Quizzes**
- Multiple question types (MCQ, True/False, Fill-in-the-blank)
- Timed quiz sessions
- Instant feedback and explanations
- Performance analytics and insights
- AI-generated quizzes from study materials

### 📈 **Analytics & Progress Tracking**
- Study session statistics
- Performance trends and insights
- Goal setting and achievement tracking
- Visual progress charts
- Detailed study reports

### 🔐 **User Management**
- Secure authentication system
- User profiles and preferences
- Study streak tracking
- Achievement badges
- Social features (coming soon)

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Git

### Development Setup
```bash
# Clone the repository
git clone <repository-url>
cd studybuddy-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing (if configured)
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: React 18.2.0 with modern hooks and concurrent features
- **Build Tool**: Vite 4.4.5 for lightning-fast development and optimized builds
- **Language**: JavaScript (ES2022+) with modern syntax
- **Styling**: Tailwind CSS 3.3.5 for utility-first styling

### UI & UX
- **Animations**: Framer Motion for smooth, performant animations
- **Icons**: Heroicons & Lucide React for consistent iconography
- **Notifications**: React Hot Toast for elegant user feedback
- **Charts**: Recharts for beautiful data visualizations

### Development & Quality
- **Routing**: React Router DOM 6.x for client-side routing
- **Forms**: React Hook Form + Yup for robust form handling
- **HTTP Client**: Axios with interceptors for API communication
- **Rich Text**: React Quill for advanced text editing
- **Date Handling**: date-fns for efficient date manipulation

## 📁 Project Architecture

```
studybuddy-frontend/
├── public/                     # Static assets
│   ├── logo.png               # Application logo
│   ├── flash.png              # Flashcard icon
│   └── notes.png              # Notes icon
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   ├── modals/           # Modal dialogs
│   │   │   ├── CreateNoteModal.jsx
│   │   │   ├── CreateFlashcardModal.jsx
│   │   │   ├── CreateQuizModal.jsx
│   │   │   ├── GenerateNotesModal.jsx
│   │   │   ├── GenerateFlashcardsModal.jsx
│   │   │   ├── GenerateQuizModal.jsx
│   │   │   └── ViewNoteModal.jsx
│   │   ├── study/            # Study-specific components
│   │   │   ├── FlashcardStudy.jsx
│   │   │   └── QuizTaking.jsx
│   │   ├── ui/               # Basic UI components
│   │   │   └── LoadingSpinner.jsx
│   │   ├── ErrorBoundary.jsx # Error handling
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── contexts/             # React Context providers
│   │   └── AuthContext.jsx   # Authentication state
│   ├── hooks/                # Custom React hooks
│   │   └── useScrollToTop.js # Scroll management
│   ├── pages/                # Page components
│   │   ├── auth/            # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard.jsx     # Main dashboard
│   │   ├── Notes.jsx        # Notes management
│   │   ├── Flashcards.jsx   # Flashcard management
│   │   ├── Quizzes.jsx      # Quiz management
│   │   ├── Profile.jsx      # User profile
│   │   ├── Home.jsx         # Landing page
│   │   ├── Features.jsx     # Feature showcase
│   │   ├── Pricing.jsx      # Pricing information
│   │   ├── About.jsx        # About page
│   │   ├── Contact.jsx      # Contact form
│   │   ├── Blog.jsx         # Blog/articles
│   │   ├── HelpCenter.jsx   # Help documentation
│   │   ├── Status.jsx       # System status
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsOfService.jsx
│   │   ├── Security.jsx
│   │   └── Cookies.jsx
│   ├── utils/               # Utility functions
│   │   ├── api.js          # Axios configuration & API calls
│   │   └── modalUtils.js   # Modal management utilities
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment config
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Optional: Analytics & Monitoring
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn

# Optional: Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_SOCIAL_FEATURES=false
```

### Build Configuration
The project uses optimized build settings in `vite.config.js`:
- **Code Splitting**: Automatic vendor and feature-based chunking
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Image and font optimization
- **Source Maps**: Disabled in production for security

### Deployment Configuration
- **Vercel**: Pre-configured with `vercel.json`
- **SPA Routing**: All routes redirect to `index.html`
- **Environment**: Production optimizations enabled
- **Caching**: Static assets cached with optimal headers

## 🌐 Deployment

### Vercel (Recommended)
1. **Connect Repository**
   ```bash
   # Push your code to GitHub/GitLab/Bitbucket
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables in Vercel**
   ```
   VITE_API_BASE_URL=https://your-backend-api.com/api
   ```

### Other Platforms
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload `dist` folder to S3 bucket
- **Firebase Hosting**: Use Firebase CLI

### Manual Deployment
```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Upload the contents to your web server
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- Notes.test.jsx
```

### Testing Strategy
- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Component interactions
- **E2E Tests**: User workflows (Cypress/Playwright)
- **Visual Tests**: UI consistency (Storybook)

## 🔍 Code Quality

### Linting & Formatting
```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code with Prettier
npm run format
```

### Pre-commit Hooks
The project uses Husky for pre-commit hooks:
- ESLint checks
- Prettier formatting
- Test execution
- Type checking (if TypeScript)

## 🚀 Performance Optimizations

### Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Visualize bundle composition
npm run bundle-analyzer
```

### Optimization Features
- ✅ **Code Splitting**: Route-based and component-based
- ✅ **Lazy Loading**: Dynamic imports for heavy components
- ✅ **Image Optimization**: WebP format with fallbacks
- ✅ **Caching Strategy**: Service worker for offline support
- ✅ **Tree Shaking**: Unused code elimination
- ✅ **Minification**: CSS and JS compression
- ✅ **Gzip Compression**: Server-side compression enabled

## 🛠️ Development Guidelines

### Component Structure
```jsx
// Component template
import React from 'react';
import { motion } from 'framer-motion';

const ComponentName = ({ prop1, prop2 }) => {
  // Hooks at the top
  const [state, setState] = useState(initialValue);

  // Event handlers
  const handleEvent = () => {
    // Handle event
  };

  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="component-styles"
    >
      {/* Component content */}
    </motion.div>
  );
};

export default ComponentName;
```

### Styling Conventions
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing scale
- Use semantic color names
- Implement dark mode support

### State Management
- Use React Context for global state
- Local state for component-specific data
- Custom hooks for reusable logic
- Avoid prop drilling with context

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

#### Environment Variables Not Loading
- Ensure variables start with `VITE_`
- Check `.env.local` file exists
- Restart development server after changes

#### Routing Issues
- Verify React Router configuration
- Check for conflicting routes
- Ensure proper basename for subdirectory deployment

#### API Connection Issues
- Verify `VITE_API_BASE_URL` is correct
- Check CORS configuration on backend
- Inspect network requests in browser DevTools

### Performance Issues
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Optimize large lists with virtualization
- Implement proper memoization

## 📚 Learning Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion/)

### Tutorials
- [React Hooks Tutorial](https://react.dev/learn)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)
- [Vite Getting Started](https://vitejs.dev/guide/getting-started.html)

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Workflow
1. **Issue Creation**: Create an issue for bugs/features
2. **Branch Naming**: Use `feature/`, `bugfix/`, or `hotfix/` prefixes
3. **Code Review**: All PRs require review
4. **Testing**: Ensure all tests pass
5. **Documentation**: Update docs for new features

### Code Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Maintain backwards compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for beautiful animations
- **Open Source Community** for the incredible ecosystem

## 📞 Support

### Getting Help
- 📖 **Documentation**: Check this README and inline comments
- 🐛 **Bug Reports**: Create an issue with reproduction steps
- 💡 **Feature Requests**: Open a discussion or issue
- 💬 **Community**: Join our Discord/Slack community

### Contact
- **Email**: support@studybuddy.com
- **Website**: [studybuddy.com](https://studybuddy.com)
- **Twitter**: [@StudyBuddyApp](https://twitter.com/StudyBuddyApp)

---

<div align="center">
  <p>Made with ❤️ by the StudyBuddy Team</p>
  <p>
    <a href="#-studybuddy-frontend">Back to Top</a> •
    <a href="https://studybuddy.com">Website</a> •
    <a href="https://docs.studybuddy.com">Documentation</a> •
    <a href="https://github.com/studybuddy/issues">Report Bug</a>
  </p>
</div>
