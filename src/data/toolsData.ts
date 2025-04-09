import { Calculator, Scale, Activity, Heart, HeartPulse, Droplet, Brain, Activity as ActivityIcon, Moon } from 'lucide-react';
import React from 'react';

export interface ToolData {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: React.ReactNode;
  link: string;
  available: boolean;
}

export const toolsData: ToolData[] = [
  {
    id: 'bmi',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand what it means for your health.',
    detailedDescription: 'Understand your Body Mass Index and get health insights based on your results.',
    icon: React.createElement(Calculator, { className: "h-10 w-10 text-primary" }),
    link: '/bmi-calculator',
    available: true,
  },
  {
    id: 'body-fat',
    title: 'Body Fat Percentage',
    description: 'Estimate your body fat percentage and learn how it impacts your overall health.',
    detailedDescription: 'Estimate your body fat percentage using various recognized methods.',
    icon: React.createElement(Scale, { className: "h-10 w-10 text-primary" }),
    link: '/body-fat-calculator',
    available: true,
  },
  {
    id: 'bmr',
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate to understand your daily calorie needs.',
    detailedDescription: 'Calculate your Basal Metabolic Rate and get personalized nutrition recommendations.',
    icon: React.createElement(Activity, { className: "h-10 w-10 text-primary" }),
    link: '/bmr-calculator',
    available: true,
  },
  {
    id: 'ideal-weight',
    title: 'Ideal Weight Calculator',
    description: 'Calculate your ideal weight using multiple scientific formulas and get personalized recommendations.',
    detailedDescription: 'Determine your optimal weight range based on height, gender, age, and body frame size using various scientific methods.',
    icon: React.createElement(Scale, { className: "h-10 w-10 text-primary" }),
    link: '/ideal-weight-calculator',
    available: true,
  },
  {
    id: 'heart-rate',
    title: 'Heart Rate Zone Calculator',
    description: 'Calculate your personalized heart rate zones for optimal training.',
    detailedDescription: 'Calculate your heart rate zones and get personalized training recommendations based on your fitness level and goals. Includes VO2 Max estimation and recovery heart rate calculations.',
    icon: React.createElement(HeartPulse, { className: "h-10 w-10 text-primary" }),
    link: '/heart-rate-calculator',
    available: true,
  },
  {
    id: 'water-intake',
    title: 'Water Intake Calculator',
    description: 'Determine how much water you should drink daily based on your weight and activity level.',
    detailedDescription: 'Calculate your personalized daily water intake needs based on your weight, activity level, and climate. Track your progress and get hydration tips.',
    icon: React.createElement(Droplet, { className: "h-10 w-10 text-primary" }),
    link: '/water-intake-calculator',
    available: true,
  },
  {
    id: 'mental-health',
    title: 'Mental Health Assessment',
    description: 'Simple self-assessment tools to check your mental wellbeing and stress levels.',
    detailedDescription: 'Simple self-assessment tools to check your mental wellbeing and stress levels.',
    icon: React.createElement(Brain, { className: "h-10 w-10 text-primary" }),
    link: '/mental-health-assessment',
    available: true,
  },
  {
    id: 'macro',
    title: 'Macro Calculator',
    description: 'Calculate your optimal macronutrient intake for weight management and fitness goals.',
    detailedDescription: 'Get personalized macronutrient recommendations based on your fitness goals, activity level, and body composition. Visualize your optimal protein, carbs, and fat distribution.',
    icon: React.createElement(Calculator, { className: "h-10 w-10 text-primary" }),
    link: '/macro-calculator',
    available: true,
  },
  {
    id: 'blood-pressure',
    title: 'Blood Pressure Checker',
    description: 'Understand your blood pressure readings and what they mean for your health.',
    detailedDescription: 'Monitor your blood pressure readings, track changes over time, and get personalized recommendations based on your results. Learn about hypertension risk factors and prevention strategies.',
    icon: React.createElement(ActivityIcon, { className: "h-10 w-10 text-primary" }),
    link: '/blood-pressure-checker',
    available: true,
  },
  {
    id: 'sleep',
    title: 'Sleep Calculator',
    description: 'Find the ideal bedtime and wake-up time based on sleep cycles for optimal rest and better sleep quality.',
    detailedDescription: 'Calculate optimal sleep and wake times based on sleep cycles, assess your sleep quality, and learn how to improve your rest with scientific insights and personalized recommendations.',
    icon: React.createElement(Moon, { className: "h-10 w-10 text-primary" }),
    link: '/sleep-calculator',
    available: true,
  },
];
