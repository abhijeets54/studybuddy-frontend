# 🚀 StudyBuddy Frontend - Vercel Deployment Guide

## 📦 What's Been Configured

### New Files Created:
- `vite.config.js` - Vite configuration with optimizations
- `vercel.json` - Vercel deployment configuration
- `.env` & `.env.example` - Environment variables
- `.gitignore` - Git ignore rules
- `VERCEL_DEPLOYMENT_GUIDE.md` - This guide

### Modified Files:
- `src/utils/api.js` - Updated to use environment variables

## 🚀 Quick Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Deploy from GitHub**
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as root directory
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables**
   In Vercel dashboard, add:
   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   cd frontend
   vercel login
   vercel --prod
   ```

## 🔧 Environment Variables

### Required Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://your-backend.onrender.com/api` |

### Setting Environment Variables:

**In Vercel Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `VITE_API_BASE_URL` with your backend URL

**For Local Development:**
```bash
# Copy example file
cp .env.example .env

# Edit .env file
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📋 Build Configuration

- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Dev Command**: `npm run dev`

## 🌐 Domain Configuration

### Custom Domain (Optional):
1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

### Update Backend CORS:
After deployment, update your backend's `CORS_ALLOWED_ORIGINS`:
```
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
```

## ✅ Features Configured

- ✅ Vite build optimization with code splitting
- ✅ SPA routing with fallback to index.html
- ✅ Static asset caching (1 year)
- ✅ Environment-based API configuration
- ✅ Production-ready build settings
- ✅ Automatic deployments on git push

## 🔄 Continuous Deployment

Your app will automatically redeploy when you:
1. Push to your main branch
2. Merge pull requests
3. Make changes in the Vercel dashboard

## 🐛 Troubleshooting

### Common Issues:

1. **API Calls Failing**
   - Check `VITE_API_BASE_URL` is set correctly
   - Ensure backend CORS allows your Vercel domain
   - Verify backend is deployed and accessible

2. **Build Fails**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

3. **Routing Issues**
   - `vercel.json` handles SPA routing
   - All routes fallback to `index.html`

4. **Environment Variables Not Working**
   - Must start with `VITE_` prefix
   - Set in Vercel dashboard, not in code
   - Redeploy after adding new variables

## 📊 Performance Optimizations

- **Code Splitting**: Vendor, router, UI, charts, and forms chunks
- **Asset Caching**: 1-year cache for static assets
- **Tree Shaking**: Unused code automatically removed
- **Minification**: CSS and JS minified in production

## 🎯 Next Steps After Deployment

1. **Test your deployment**: Visit your Vercel URL
2. **Update backend CORS**: Add your Vercel domain
3. **Set up custom domain** (optional)
4. **Configure analytics** (optional)
5. **Set up monitoring** (optional)

Your React frontend is now production-ready and optimized for Vercel! 🎉
