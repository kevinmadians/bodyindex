import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BodyFatChart from '../BodyFatChart';

interface ResultsDisplayProps {
  bodyFatPercentage: number;
  bodyFatCategory: string;
  gender: string;
  age: number;
  healthInfo: string;
  idealRange: { min: number, max: number };
  categoryColor: string;
  measurementMethod: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  bodyFatPercentage,
  bodyFatCategory,
  gender,
  age,
  healthInfo,
  idealRange,
  categoryColor,
  measurementMethod
}) => {
  // Animation states
  const [animateCircle, setAnimateCircle] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [animateCategories, setAnimateCategories] = useState(false);

  // Method names for display
  const methodDisplay = {
    'navy': 'Navy Method',
    'bmi': 'BMI Method',
    'skinfold': 'Skinfold Method'
  };

  // Trigger animations sequentially on mount
  useEffect(() => {
    // Start animations in sequence for a nice effect
    setTimeout(() => setAnimateCircle(true), 100);
    setTimeout(() => setAnimateContent(true), 400);
    setTimeout(() => setAnimateCategories(true), 700);
    
    return () => {
      // Reset animation states on unmount
      setAnimateCircle(false);
      setAnimateContent(false);
      setAnimateCategories(false);
    };
  }, []);

  return (
    <Card 
      className="mb-6 shadow-md bg-white overflow-hidden transition-all duration-500 ease-in-out transform" 
      style={{
        opacity: animateContent ? 1 : 0,
        transform: animateContent ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <CardContent className="p-6">
        {/* Header section with title and method */}
        <h2 className="text-2xl font-bold mb-2">Your Results</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Based on the {methodDisplay[measurementMethod as keyof typeof methodDisplay]}
        </p>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 mb-4 transition-all duration-700 ease-in-out"
              style={{ 
                opacity: animateCircle ? 1 : 0,
                transform: animateCircle ? 'scale(1)' : 'scale(0.8)'
              }}>
              <CircularProgressbar
                value={animateCircle ? bodyFatPercentage : 0}
                maxValue={50}
                text={`${bodyFatPercentage}%`}
                styles={buildStyles({
                  textSize: '22px',
                  pathColor: '#00BCD4',
                  textColor: '#00BCD4',
                  trailColor: '#f0f0f0',
                  strokeLinecap: 'round',
                  pathTransitionDuration: 1.5
                })}
              />
            </div>
            <div className="text-center transition-all duration-500 ease-in-out"
              style={{ 
                opacity: animateContent ? 1 : 0,
                transform: animateContent ? 'translateY(0)' : 'translateY(15px)',
                transitionDelay: '200ms'
              }}>
              <Button 
                variant="outline" 
                className="rounded-full px-6 py-1 border-2 mb-2 transition-all duration-300 ease-in-out"
                style={{ 
                  borderColor: '#00BCD4', 
                  color: '#00BCD4',
                  opacity: animateContent ? 1 : 0,
                  transform: animateContent ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                {bodyFatCategory}
              </Button>
              
              <div className="mt-4 text-center bg-gray-50 p-3 rounded-lg transition-all duration-500 ease-in-out"
                style={{ 
                  opacity: animateContent ? 1 : 0,
                  transform: animateContent ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: '300ms'
                }}>
                <p className="text-sm font-semibold">Your ideal range: {idealRange.min}% - {idealRange.max}%</p>
                <p className="text-xs text-gray-500 mt-1">(Based on your age and gender)</p>
              </div>
            </div>
          </div>
          
          <div className="transition-all duration-500 ease-in-out"
            style={{ 
              opacity: animateContent ? 1 : 0,
              transform: animateContent ? 'translateX(0)' : 'translateX(20px)',
              transitionDelay: '300ms'
            }}>
            <h3 className="text-xl font-bold mb-4">What Your Result Means</h3>
            <p className="mb-4">
              Your body fat percentage of <span className="font-bold" style={{ color: categoryColor }}>{bodyFatPercentage}%</span> places you in the <span className="font-bold" style={{ color: categoryColor }}>{bodyFatCategory}</span> category for {gender === 'male' ? 'men' : 'women'}.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6 transition-all duration-500 ease-in-out"
              style={{ 
                opacity: animateContent ? 1 : 0,
                transitionDelay: '400ms'
              }}>
              <p className="italic">
                {healthInfo}
              </p>
            </div>

            <h4 className="font-bold mt-6 mb-4">Body Fat Categories for {gender === 'male' ? 'Men' : 'Women'}</h4>
            <div className="space-y-3">
              {gender === 'male' ? (
                <>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '50ms' }}>
                    <span>Essential Fat (2-5%)</span>
                    <div className="h-3 w-40 bg-[#2196F3] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '100ms' }}>
                    <span>Athletic (6-13%)</span>
                    <div className="h-3 w-40 bg-[#4CAF50] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '100ms' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '150ms' }}>
                    <span>Fitness (14-17%)</span>
                    <div className="h-3 w-40 bg-[#00BCD4] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '200ms' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '200ms' }}>
                    <span>Average (18-24%)</span>
                    <div className="h-3 w-40 bg-[#F6C70B] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '300ms' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '250ms' }}>
                    <span>Overweight (25-31%)</span>
                    <div className="h-3 w-40 bg-[#FF9800] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '400ms' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '300ms' }}>
                    <span>Obese (32%+)</span>
                    <div className="h-3 w-40 bg-[#F44336] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '500ms' }}></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '50ms' }}>
                    <span>Essential Fat (10-13%)</span>
                    <div className="h-3 w-40 bg-[#2196F3] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '100ms' }}>
                    <span>Athletic (14-20%)</span>
                    <div className="h-3 w-40 bg-[#4CAF50] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '100ms' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '150ms' }}>
                    <span>Fitness (21-24%)</span>
                    <div className="h-3 w-40 bg-[#00BCD4] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '200ms' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '200ms' }}>
                    <span>Average (25-31%)</span>
                    <div className="h-3 w-40 bg-[#F6C70B] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '300ms' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '250ms' }}>
                    <span>Overweight (32-37%)</span>
                    <div className="h-3 w-40 bg-[#FF9800] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '400ms' }}></div>
                  </div>
                  <div className="flex items-center justify-between transition-all duration-300 ease-in-out"
                    style={{ opacity: animateCategories ? 1 : 0, transitionDelay: '300ms' }}>
                    <span>Obese (38%+)</span>
                    <div className="h-3 w-40 bg-[#F44336] rounded-full transform origin-left transition-all duration-1000 ease-out"
                      style={{ transform: animateCategories ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '500ms' }}></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 h-[300px] transition-all duration-500 ease-in-out"
          style={{ 
            opacity: animateContent ? 1 : 0,
            transform: animateContent ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '500ms'
          }}>
          <h3 className="text-xl font-bold mb-4">Body Fat Distribution Chart</h3>
          <div className="h-[250px]">
            <BodyFatChart bodyFatPercentage={bodyFatPercentage} gender={gender} />
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 p-4 rounded-lg transition-all duration-500 ease-in-out"
          style={{ 
            opacity: animateContent ? 1 : 0,
            transform: animateContent ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '600ms'
          }}>
          <h3 className="text-xl font-bold mb-4">Health Implications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Benefits of Healthy Body Fat</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Energy storage and reserve</li>
                <li>Temperature regulation</li>
                <li>Hormone production</li>
                <li>Organ protection</li>
                <li>Immune system support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Risks of Excessive Body Fat</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Increased risk of heart disease</li>
                <li>Type 2 diabetes</li>
                <li>High blood pressure</li>
                <li>Certain cancers</li>
                <li>Sleep apnea</li>
                <li>Joint problems</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-600 bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-500 ease-in-out"
            style={{ 
              opacity: animateContent ? 1 : 0,
              transform: animateContent ? 'translateY(0)' : 'translateY(10px)',
              transitionDelay: '700ms'
            }}>
            <p className="font-semibold mb-2">How to improve your body composition:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Regular strength training to build muscle mass</li>
              <li>Cardio exercise for fat burning</li>
              <li>A balanced diet with adequate protein</li>
              <li>Sufficient sleep and stress management</li>
              <li>Staying hydrated and limiting alcohol</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
