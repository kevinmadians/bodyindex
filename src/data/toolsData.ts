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
    detailedDescription: 'Calculate your Basal Metabolic Rate to understand your daily calorie needs.',
    icon: React.createElement(Activity, { className: "h-10 w-10 text-primary" }),
    link: '/bmr-calculator',
    available: false,
  },
  {
    id: 'ideal-weight',
    title: 'Ideal Weight Calculator',
    description: 'Find your ideal weight range based on height, age, and body frame.',
    detailedDescription: 'Find your ideal weight range based on height, age, and body frame.',
    icon: React.createElement(Heart, { className: "h-10 w-10 text-primary" }),
    link: '/ideal-weight-calculator',
    available: false,
  },
  {
    id: 'heart-rate',
    title: 'Heart Rate Zone Calculator',
    description: 'Calculate your target heart rate zones for optimal exercise effectiveness.',
    detailedDescription: 'Calculate your target heart rate zones for optimal exercise effectiveness.',
    icon: React.createElement(HeartPulse, { className: "h-10 w-10 text-primary" }),
    link: '/heart-rate-calculator',
    available: false,
  },
  {
    id: 'water-intake',
    title: 'Water Intake Calculator',
    description: 'Determine how much water you should drink daily based on your weight and activity level.',
    detailedDescription: 'Determine how much water you should drink daily based on your weight and activity level.',
    icon: React.createElement(Droplet, { className: "h-10 w-10 text-primary" }),
    link: '/water-intake-calculator',
    available: false,
  },
  {
    id: 'mental-health',
    title: 'Mental Health Assessment',
    description: 'Simple self-assessment tools to check your mental wellbeing and stress levels.',
    detailedDescription: 'Simple self-assessment tools to check your mental wellbeing and stress levels.',
    icon: React.createElement(Brain, { className: "h-10 w-10 text-primary" }),
    link: '/mental-health-assessment',
    available: false,
  },
  {
    id: 'macro',
    title: 'Macro Calculator',
    description: 'Calculate your optimal macronutrient intake for weight management and fitness goals.',
    detailedDescription: 'Get personalized macronutrient recommendations based on your fitness goals.',
    icon: React.createElement(Calculator, { className: "h-10 w-10 text-primary" }),
    link: '/macro-calculator',
    available: false,
  },
  {
    id: 'blood-pressure',
    title: 'Blood Pressure Checker',
    description: 'Understand your blood pressure readings and what they mean for your health.',
    detailedDescription: 'Understand your blood pressure readings and what they mean for your health.',
    icon: React.createElement(ActivityIcon, { className: "h-10 w-10 text-primary" }),
    link: '/blood-pressure-checker',
    available: false,
  },
  {
    id: 'sleep',
    title: 'Sleep Calculator',
    description: 'Find the ideal bedtime and wake-up time based on sleep cycles for optimal rest.',
    detailedDescription: 'Find the ideal bedtime and wake-up time based on sleep cycles for optimal rest.',
    icon: React.createElement(Moon, { className: "h-10 w-10 text-primary" }),
    link: '/sleep-calculator',
    available: false,
  },
];
