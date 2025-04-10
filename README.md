# Body Index

<div align="center">
  <img src="public/favicon.svg" alt="Body Index Logo" width="120" height="120" />
  <h3>Free Health Tools & Fitness Calculators</h3>
  <p>A comprehensive collection of interactive health calculators and fitness tools</p>
  
  <div>
    <img src="https://img.shields.io/badge/Built_with-Vite-646CFF?style=flat-square&logo=vite" alt="Built with Vite" />
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript" alt="TypeScript 5.5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS 3.4" />
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel" alt="Deployed on Vercel" />
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License" />
  </div>
</div>

## ✨ Overview

Body Index is a modern web application providing free, accurate health and fitness calculators to help users monitor and improve their wellness. Built with React, TypeScript, and Tailwind CSS, the platform offers a seamless user experience across devices with evidence-based health tools.

## 🔧 Key Features

### Health Assessment Tools
- **BMI Calculator**: Calculate Body Mass Index with personalized insights based on WHO guidelines
- **Body Fat Calculator**: Multi-method body fat percentage estimation (Navy, Skinfold, BMI methods)
- **BMR Calculator**: Calculate Basal Metabolic Rate with adjustable activity levels
- **Ideal Weight Calculator**: Determine healthy weight range using multiple formulas
- **Heart Rate Calculator**: Calculate maximum and target heart rate zones for exercise optimization

### Fitness & Nutrition Tools
- **Macro Calculator**: Calculate optimal protein, carbs, and fat intake with required field validation and customizable goals
- **Water Intake Calculator**: Personalized hydration calculations with progress tracking
- **Sleep Calculator**: Sleep cycle optimization with bedtime recommendations

### Wellness Monitoring
- **Mental Health Assessment**: Science-based self-screening with resource recommendations
- **Blood Pressure Checker**: Blood pressure analysis with visual charts and tracking

## 🧰 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimal production builds
- **Styling**: Tailwind CSS with custom theming
- **Component Library**: Shadcn UI (Radix UI primitives)
- **State Management**: React Context API and custom hooks
- **Routing**: React Router v6 with dynamic imports

### Data Visualization
- **Charting**: D3.js for custom visualizations
- **Graphs**: Recharts for responsive charts
- **Animation**: Framer Motion for smooth transitions

### Performance Optimization
- **Code Splitting**: Dynamic imports for optimal chunk loading
- **Asset Optimization**: Optimized images and SVG components
- **Performance Metrics**: 90+ Lighthouse scores across all categories

### SEO & Accessibility
- **SEO**: Comprehensive SEO implementation with structured data on all pages
- **Meta Tags**: Custom metadata for each calculator and tool
- **Semantic HTML**: Properly structured HTML with appropriate landmarks
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **Analytics**: Privacy-focused analytics integration

## 📋 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/body-index.git
   cd body-index
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🚀 Deployment

The project is configured for seamless deployment on Vercel:

1. Push your project to GitHub
2. Connect your repository in the Vercel dashboard
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Quick Deployment

Use the built-in deploy script to quickly deploy to Vercel:

```bash
npm run deploy
```

### Deploying Latest Changes

To deploy the latest updates including the SEO improvements and required field validation:

1. Ensure all changes are committed to your repository
   ```bash
   git add .
   git commit -m "Add SEO improvements and required field validation"
   git push
   ```

2. Vercel will automatically detect changes and trigger a new deployment
3. Monitor the deployment progress in the Vercel dashboard
4. Once complete, verify the changes on the live site

### Recent Enhancements
- **SEO Optimization**: All pages now have structured data and optimized metadata
- **Required Field Validation**: Form validation added to all numeric inputs
- **Improved Error Handling**: Enhanced error messages and validation
- **Responsive Design**: Improved mobile experience with adaptive UI
- **Cleaner Codebase**: Removal of unused files and optimization of imports

See [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md) for detailed deployment instructions and the [CHANGELOG.md](CHANGELOG.md) for a complete list of updates.

## 📱 Responsive Design

Body Index implements a mobile-first approach with responsive design across:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🔒 Privacy & Data Security

- Client-side calculations with no data storage
- No user accounts or personal data collection
- No external tracking cookies
- GDPR compliant

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions, feedback, or support:
- Website: [Contact Page](https://bodyindex.net/contact)
- Email: info@bodyindex.net
- GitHub Issues: For bug reports and feature requests

---

<div align="center">
  <p>&copy; 2023-2024 Body Index | All Rights Reserved</p>
</div>
