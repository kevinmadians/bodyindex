interface SEOPageData {
  title: string;
  description: string;
  keywords: string;
  structuredData?: Record<string, unknown>;
}

interface SEOData {
  [key: string]: SEOPageData;
}

const seoData: SEOData = {
  // Homepage
  home: {
    title: "Body Index - Free Health Tools & Fitness Calculators",
    description: "Your all-in-one hub for BMI, body fat, BMR, ideal weight, water intake, heart rate, and more health calculators. Get accurate insights for free on bodyindex.net.",
    keywords: "body index, health calculators, fitness tools, BMI calculator, body measurements, free health tools, weight management calculator, online health calculators",
    structuredData: {
      "@type": "WebSite",
      "name": "Body Index",
      "alternativeHeadline": "Free Health Tools & Fitness Calculators",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://bodyindex.net/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  },
  
  // BMI Calculator
  bmiCalculator: {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index (BMI) with our free, accurate BMI calculator. Understand what your results mean for your health with personalized insights.",
    keywords: "BMI calculator, body mass index calculator, calculate BMI, BMI chart, what is my BMI, healthy BMI range, weight category calculator, BMI interpretation, free BMI calculator",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Body Index BMI Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1024"
      }
    }
  },
  
  // Body Fat Calculator
  bodyFatCalculator: {
    title: "Body Fat Calculator",
    description: "Calculate your body fat percentage using the Navy method, BMI method, or skinfold measurements. Get accurate body composition analysis and personalized health insights.",
    keywords: "body fat calculator, body fat percentage calculator, measure body fat online, Navy method calculator, skinfold calculator, body composition analysis, body fat percentage chart, lean mass calculator",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Body Fat Percentage Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // BMR Calculator
  bmrCalculator: {
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate (BMR) and daily calorie needs with our accurate BMR calculator. Personalized results for weight loss, maintenance, or gain.",
    keywords: "BMR calculator, basal metabolic rate calculator, calorie calculator, TDEE calculator, metabolism calculator, daily energy expenditure, calorie needs calculator, BMR calculation formula",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "BMR and TDEE Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // Ideal Weight Calculator
  idealWeightCalculator: {
    title: "Ideal Weight Calculator",
    description: "Calculate your ideal weight based on height, gender, body frame, and age using multiple scientifically-backed formulas. Get personalized healthy weight ranges.",
    keywords: "ideal weight calculator, healthy weight calculator, ideal weight for height, ideal body weight formula, healthy weight range, ideal weight chart, weight by height calculator, BMI ideal weight calculator",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Ideal Weight Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // Heart Rate Calculator
  heartRateCalculator: {
    title: "Heart Rate Calculator",
    description: "Calculate your maximum heart rate and optimal heart rate training zones for cardio, fat burning, and aerobic exercise based on your age and fitness level.",
    keywords: "heart rate calculator, maximum heart rate calculator, target heart rate zones, cardio heart rate calculator, fat burning zone calculator, heart rate for exercise, heart rate training zones, pulse rate calculator",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Heart Rate Zone Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // Water Intake Calculator
  waterIntakeCalculator: {
    title: "Water Intake Calculator",
    description: "Calculate your optimal daily water intake based on weight, activity level, and climate. Personalized hydration recommendations for better health and performance.",
    keywords: "water intake calculator, daily water needs calculator, hydration calculator, how much water should I drink, water consumption calculator, daily fluid intake, water recommendation calculator, optimal hydration calculator",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Water Intake Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // Mental Health Assessment
  mentalHealthAssessment: {
    title: "Mental Health Assessment",
    description: "Take our confidential mental health self-assessment to check your emotional wellbeing. Get personalized resources and insights to improve your mental health.",
    keywords: "mental health assessment, mental health screening, depression anxiety test, mental wellness check, mental health calculator, psychological assessment tool, emotional health assessment, mental wellbeing test",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Mental Health Self-Assessment Tool",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // Macro Calculator
  macroCalculator: {
    title: "Macro Calculator",
    description: "Calculate your optimal macronutrient balance (protein, carbs, fat) based on your body type, goals, and activity level. Personalized nutrition recommendations.",
    keywords: "macro calculator, macronutrient calculator, protein calculator, carb calculator, fat intake calculator, macros for weight loss, keto macro calculator, IIFYM calculator, flexible dieting macros",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Macronutrient Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // Blood Pressure Checker
  bloodPressureChecker: {
    title: "Blood Pressure Checker",
    description: "Check your blood pressure readings and learn what they mean for your health. Free tool to categorize and track your blood pressure measurements.",
    keywords: "blood pressure checker, BP calculator, hypertension checker, blood pressure categories, systolic diastolic calculator, bp readings analyzer, blood pressure range calculator, is my blood pressure normal",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Blood Pressure Analyzer",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // Sleep Calculator
  sleepCalculator: {
    title: "Sleep Calculator",
    description: "Calculate your ideal bedtime and wake-up times based on sleep cycles. Find the best times to sleep for optimal rest and improved energy levels.",
    keywords: "sleep calculator, bedtime calculator, sleep cycle calculator, best time to sleep, wake up time calculator, REM sleep calculator, optimal sleep hours, sleep schedule calculator",
    structuredData: {
      "@type": "SoftwareApplication",
      "name": "Sleep Cycle Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  // About page
  about: {
    title: "About Body Index",
    description: "Learn about Body Index's mission to provide accurate, science-based health calculators and tools to help you make informed decisions about your wellbeing.",
    keywords: "about body index, health calculators website, free health tools online, body metrics platform, fitness calculators site, health assessment tools, reliable health calculators",
  },
  
  // Contact page
  contact: {
    title: "Contact Us",
    description: "Get in touch with the Body Index team for questions, feedback, or suggestions about our health calculators and fitness tools.",
    keywords: "contact body index, health calculator support, feedback fitness tools, contact us health website, body index help, health tools questions",
  },
  
  // Privacy Policy
  privacyPolicy: {
    title: "Privacy Policy",
    description: "Learn how Body Index protects your privacy and handles your data. Our commitment to secure, transparent health calculation tools.",
    keywords: "body index privacy policy, health calculator data protection, fitness tools privacy, health website security, personal data protection policy",
  },
  
  // Terms of Use
  termsOfUse: {
    title: "Terms of Use",
    description: "Body Index terms of use and legal information for our health and fitness calculators. User guidelines and disclaimer information.",
    keywords: "body index terms, health calculator terms of use, fitness tools legal terms, health website disclaimer, calculator usage terms",
  },
};

export default seoData; 