# Deploying to Vercel

This document provides step-by-step instructions for deploying the Body Index project to Vercel.

## Prerequisites

- A Vercel account (create one at [vercel.com](https://vercel.com) if you don't have one)
- Git repository with your project (GitHub, GitLab, or Bitbucket)
- Vercel CLI installed globally (`npm install -g vercel`)

## Deployment Options

### 1. Deploy using Vercel CLI

1. Run the login command and follow the prompts:
   ```bash
   vercel login
   ```

2. Deploy from your project directory:
   ```bash
   # For development/preview deployment
   vercel

   # For production deployment
   vercel --prod
   ```

3. Follow the CLI prompts to complete the deployment.

### 2. Deploy via the Vercel Dashboard

1. Push your project to a Git repository (GitHub, GitLab, or Bitbucket)

2. Log in to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New..." → "Project"

4. Import your Git repository

5. Configure the project settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add any required env variables

6. Click "Deploy" button

## Environment Variables

Ensure these environment variables are set in your Vercel project settings:

- `VITE_APP_ENVIRONMENT` = `production`
- `VITE_APP_BASE_URL` = Your domain name (e.g., `https://bodyindex.net`)

## Post-Deployment Steps

1. **Set up a custom domain** in your Vercel project settings if you have one.

2. **Configure SSL** - Vercel handles this automatically for custom domains.

3. **Verify deployment** - Check that all pages and features are working correctly.

4. **Monitor performance** - Use Vercel Analytics to monitor your site's performance.

## Troubleshooting

- **Build Errors**: If you encounter build errors, check the Vercel deployment logs for details.

- **Routing Issues**: Ensure the `vercel.json` configuration is properly set up.

- **Cache Issues**: Add `?v=timestamp` to resource URLs to bypass cache during testing.

- **API Connection Problems**: Verify environment variables are correctly set.

## Maintenance

For future updates:

1. Make changes to your codebase
2. Push to your Git repository
3. Vercel will automatically redeploy your application 