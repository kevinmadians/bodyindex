import React from 'react';
import ToolCard from './ToolCard';
import { Calculator, Heart, Scale, Dumbbell, Droplets, Brain, Moon, Activity } from 'lucide-react';

const ToolsSection = () => {
  const tools = [
    {
      id: "bmi",
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and understand what it means for your health.",
      detailedDescription: "Our BMI Calculator helps you determine if you're at a healthy weight for your height. Get personalized insights and recommendations based on your results.",
      icon: <Calculator className="w-12 h-12 text-primary" />,
      link: "/bmi-calculator",
      available: true
    },
    {
      id: "bodyfat",
      title: "Body Fat Calculator",
      description: "Estimate your body fat percentage using different measurement methods.",
      detailedDescription: "Calculate your body fat percentage using various methods including skinfold measurements, navy method, and BMI method. Get a comprehensive analysis of your body composition.",
      icon: <Scale className="w-12 h-12 text-primary" />,
      link: "/body-fat-calculator",
      available: true
    },
    {
      id: "bmr",
      title: "BMR Calculator",
      description: "Calculate your Basal Metabolic Rate and daily calorie needs.",
      detailedDescription: "Determine your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to understand your daily caloric needs for maintaining, losing, or gaining weight.",
      icon: <Dumbbell className="w-12 h-12 text-primary" />,
      link: "/bmr-calculator",
      available: true
    },
    {
      id: "heartrate",
      title: "Heart Rate Calculator",
      description: "Calculate your target heart rate zones for optimal training.",
      detailedDescription: "Find your target heart rate zones for different types of exercise and understand how to optimize your workouts for better cardiovascular health.",
      icon: <Heart className="w-12 h-12 text-primary" />,
      link: "/heart-rate-calculator",
      available: true
    },
    {
      id: "water",
      title: "Water Intake Calculator",
      description: "Calculate your daily water needs based on your body and lifestyle.",
      detailedDescription: "Get personalized recommendations for daily water intake based on your weight, activity level, climate, and other factors. Track your hydration goals easily.",
      icon: <Droplets className="w-12 h-12 text-primary" />,
      link: "/water-intake-calculator",
      available: true
    },
    {
      id: "mental",
      title: "Mental Health Assessment",
      description: "Take a comprehensive assessment of your mental well-being.",
      detailedDescription: "Evaluate different aspects of your mental health including stress, anxiety, and mood. Get personalized recommendations and insights to improve your mental well-being.",
      icon: <Brain className="w-12 h-12 text-primary" />,
      link: "/mental-health-assessment",
      available: true
    },
    {
      id: "macro",
      title: "Macro Calculator",
      description: "Calculate your optimal macronutrient intake for weight management and fitness goals.",
      detailedDescription: "Get personalized macronutrient recommendations based on your fitness goals and body composition.",
      icon: <Calculator className="w-12 h-12 text-primary" />,
      link: "/macro-calculator",
      available: true
    },
    {
      id: "blood-pressure",
      title: "Blood Pressure Checker",
      description: "Understand your blood pressure readings and what they mean for your health.",
      detailedDescription: "Learn about your blood pressure readings, track your measurements, and get personalized recommendations for maintaining healthy blood pressure levels.",
      icon: <Activity className="w-12 h-12 text-primary" />,
      link: "/blood-pressure-checker",
      available: true
    },
    {
      id: "sleep",
      title: "Sleep Calculator",
      description: "Find the ideal bedtime and wake-up time based on sleep cycles for optimal rest.",
      detailedDescription: "Calculate your optimal sleep schedule based on sleep cycles and get tips for better sleep quality.",
      icon: <Moon className="w-12 h-12 text-primary" />,
      link: "/sleep-calculator",
      available: true
    }
  ];

  return (
    <div id="tools-section" className="mb-16 scroll-mt-24 sm:scroll-mt-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Health Tools</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of calculators and tools designed to help you understand and improve your health metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} {...tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolsSection;
