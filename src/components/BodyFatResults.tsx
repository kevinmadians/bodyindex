
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface BodyFatResultsProps {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  gender: string;
  unit: string;
}

const BodyFatResults: React.FC<BodyFatResultsProps> = ({ 
  bodyFatPercentage, 
  fatMass, 
  leanMass, 
  gender,
  unit
}) => {
  // Define category ranges based on gender
  const getCategoryInfo = () => {
    if (gender === 'male') {
      if (bodyFatPercentage < 6) return { category: 'Essential Fat', description: 'This is the minimum level of fat required for basic physiological health.', color: '#2196F3' };
      if (bodyFatPercentage < 14) return { category: 'Athletic', description: 'Typical for athletes and those with very active lifestyles.', color: '#4CAF50' };
      if (bodyFatPercentage < 18) return { category: 'Fitness', description: 'A fit and healthy range that indicates regular exercise.', color: '#00BCD4' };
      if (bodyFatPercentage < 25) return { category: 'Average', description: 'The average body fat percentage for men.', color: '#FFEB3B' };
      if (bodyFatPercentage < 31) return { category: 'Overweight', description: 'Above average body fat that may pose health risks.', color: '#FF9800' };
      return { category: 'Obese', description: 'Significantly higher than average, with increased health risks.', color: '#F44336' };
    } else {
      if (bodyFatPercentage < 14) return { category: 'Essential Fat', description: 'This is the minimum level of fat required for basic physiological health.', color: '#2196F3' };
      if (bodyFatPercentage < 21) return { category: 'Athletic', description: 'Typical for athletes and those with very active lifestyles.', color: '#4CAF50' };
      if (bodyFatPercentage < 25) return { category: 'Fitness', description: 'A fit and healthy range that indicates regular exercise.', color: '#00BCD4' };
      if (bodyFatPercentage < 32) return { category: 'Average', description: 'The average body fat percentage for women.', color: '#FFEB3B' };
      if (bodyFatPercentage < 38) return { category: 'Overweight', description: 'Above average body fat that may pose health risks.', color: '#FF9800' };
      return { category: 'Obese', description: 'Significantly higher than average, with increased health risks.', color: '#F44336' };
    }
  };

  const categoryInfo = getCategoryInfo();

  // Determine the maximum value for the progress chart (for better visualization)
  const maxProgressValue = gender === 'male' ? 35 : 42;

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-center">Your Body Fat Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="h-full">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-40 h-40 mb-4">
              <CircularProgressbar
                value={bodyFatPercentage}
                maxValue={maxProgressValue}
                text={`${bodyFatPercentage}%`}
                styles={buildStyles({
                  textSize: '1rem',
                  pathColor: categoryInfo.color,
                  textColor: categoryInfo.color,
                  trailColor: '#F3F4F6',
                })}
              />
            </div>
            <h4 className="text-lg font-semibold mt-2" style={{ color: categoryInfo.color }}>
              {categoryInfo.category}
            </h4>
            <p className="text-sm text-center mt-2">{categoryInfo.description}</p>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Body Composition</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fat Mass</span>
                  <span className="font-medium">{fatMass} {unit} ({bodyFatPercentage}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${bodyFatPercentage}%`, 
                      backgroundColor: categoryInfo.color 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lean Mass</span>
                  <span className="font-medium">{leanMass} {unit} ({(100 - bodyFatPercentage).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-gray-600" 
                    style={{ 
                      width: `${100 - bodyFatPercentage}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-sm">
              <p className="mb-2">
                <span className="font-medium">Lean Mass:</span> Includes muscles, bones, organs, and water
              </p>
              <p>
                <span className="font-medium">Fat Mass:</span> Total body fat (essential + storage fat)
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Health Insights</h4>
            <ul className="space-y-2 text-sm">
              {bodyFatPercentage < (gender === 'male' ? 6 : 14) && (
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Your body fat is very low. This may impact hormone production and immune function.</span>
                </li>
              )}
              
              {bodyFatPercentage >= (gender === 'male' ? 6 : 14) && 
                bodyFatPercentage <= (gender === 'male' ? 17 : 24) && (
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>You have an ideal body fat percentage associated with good health and fitness.</span>
                </li>
              )}
              
              {bodyFatPercentage > (gender === 'male' ? 17 : 24) && 
                bodyFatPercentage <= (gender === 'male' ? 24 : 31) && (
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Your body fat is in the average range. Maintaining regular physical activity is recommended.</span>
                </li>
              )}
              
              {bodyFatPercentage > (gender === 'male' ? 24 : 31) && (
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>Higher body fat percentages can increase risks for certain health conditions.</span>
                </li>
              )}
              
              <li className="flex items-start gap-2 pt-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  {gender === 'male' 
                    ? 'Men require at least 2-5% essential fat for basic physiological functions.'
                    : 'Women require at least 10-13% essential fat for hormonal balance and reproductive health.'}
                </span>
              </li>
              
              <li className="flex items-start gap-2 pt-2">
                <span className="text-primary font-bold">•</span>
                <span>Regular strength training helps maintain and build lean mass while reducing body fat.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BodyFatResults;
