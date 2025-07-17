# 📚 StudyBuddy Frontend

A modern React application for note-taking, flashcards, and quiz management built with Vite, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploy to Vercel

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set Environment Variables**:
   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com/api
   ```
4. **Deploy!**

See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Heroicons + Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   ├── modals/         # Modal components
│   ├── study/          # Study-related components
│   └── ui/             # Basic UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
│   └── auth/           # Authentication pages
└── utils/              # Utility functions
    ├── api.js          # API configuration
    └── modalUtils.js   # Modal utilities
```

## 🔧 Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📱 Features

- 📝 **Notes Management**: Create, edit, and organize notes
- 🃏 **Flashcards**: Interactive flashcard system
- 📊 **Quizzes**: Take and create quizzes
- 📈 **Analytics**: Study progress tracking
- 🔐 **Authentication**: Secure user authentication
- 📱 **Responsive**: Mobile-first design
- 🎨 **Modern UI**: Beautiful animations and transitions

## 🎯 Deployment Ready

- ✅ Vite configuration optimized
- ✅ Environment variables configured
- ✅ Build optimizations enabled
- ✅ Vercel deployment ready
- ✅ SPA routing configured
- ✅ Asset caching optimized

Your frontend is ready for production deployment! 🚀
