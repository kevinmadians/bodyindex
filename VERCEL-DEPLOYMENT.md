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

## Latest Updates (2024)

### SEO Enhancements

The latest updates include comprehensive SEO improvements across all pages:

1. All pages now have proper SEO components with metadata
2. Structured data is applied to all calculator tools
3. Canonical URLs are properly set for each page
4. Meta descriptions and keywords are optimized for search engines
5. Consistent page titles follow best practices

### MacroCalculator Enhancements

The latest updates include required field validation for the MacroCalculator component:

1. All numeric input fields now have required validation
2. Error messages display when fields are empty or have invalid values
3. The calculation function validates all inputs before proceeding
4. SEO metadata has been updated to reflect these improvements

### Code Optimization

1. Unused files have been removed (App.css)
2. Import statements have been cleaned up
3. Page layouts have been standardized for consistency

### When Deploying These Changes

1. Test the SEO implementation locally by inspecting page sources
2. Verify all pages have proper metadata and structured data
3. Test form validation to ensure required fields work correctly
4. Check that page layouts are consistent across all tools

### Verifying Successful Deployment

After deploying the latest changes:

1. Use the Google Rich Results Test to verify structured data implementation
2. Check mobile responsiveness on different devices
3. Test form validation across all calculator tools
4. Verify that SEO elements appear correctly in browser dev tools

If any issues are encountered, review the deployment logs in the Vercel dashboard for potential errors 