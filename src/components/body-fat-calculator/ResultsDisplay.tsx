
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ResultsDisplayProps {
  bodyFatPercentage: number;
  bodyFatCategory: string;
  gender: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  bodyFatPercentage,
  bodyFatCategory,
  gender
}) => {
  return (
    <Card className="mb-6 shadow-md bg-white">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-1">Your Results</h2>
        <p className="text-sm text-gray-500 mb-6">Based on the Navy method</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 mb-4">
              <CircularProgressbar
                value={bodyFatPercentage}
                text={`${bodyFatPercentage}%`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: '#00BCD4',
                  textColor: '#00BCD4',
                  trailColor: '#F3F4F6',
                })}
              />
              <p className="text-center text-sm text-gray-500 mt-2">Body Fat</p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full px-6 py-1 border-2 border-[#00BCD4] text-[#00BCD4]"
            >
              {bodyFatCategory}
            </Button>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">What Your Result Means</h3>
            <p className="mb-4">
              Your body fat percentage of <span className="font-bold text-[#00BCD4]">{bodyFatPercentage}%</span> places you in the <span className="font-bold text-[#00BCD4]">{bodyFatCategory}</span> category for {gender === 'male' ? 'men' : 'women'}.
            </p>

            <h4 className="font-bold mt-6 mb-4">Body Fat Categories for {gender === 'male' ? 'Men' : 'Women'}</h4>
            <div className="space-y-3">
              {gender === 'male' ? (
                <>
                  <div className="flex items-center justify-between">
                    <span>Essential Fat (2-5%)</span>
                    <div className="h-3 w-40 bg-[#2196F3] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Athletic (6-13%)</span>
                    <div className="h-3 w-40 bg-[#4CAF50] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fitness (14-17%)</span>
                    <div className="h-3 w-40 bg-[#00BCD4] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average (18-24%)</span>
                    <div className="h-3 w-40 bg-[#FFEB3B] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Obese (25%+)</span>
                    <div className="h-3 w-40 bg-[#F44336] rounded-full"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span>Essential Fat (10-13%)</span>
                    <div className="h-3 w-40 bg-[#2196F3] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Athletic (14-20%)</span>
                    <div className="h-3 w-40 bg-[#4CAF50] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fitness (21-24%)</span>
                    <div className="h-3 w-40 bg-[#00BCD4] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average (25-31%)</span>
                    <div className="h-3 w-40 bg-[#FFEB3B] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Obese (32%+)</span>
                    <div className="h-3 w-40 bg-[#F44336] rounded-full"></div>
                  </div>
                </>
              )}
            </div>

            <div className="w-full bg-gray-100 h-3 rounded-full mt-6">
              <div className="bg-gradient-to-r from-[#2196F3] via-[#4CAF50] to-[#F44336] h-3 rounded-full flex">
                <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Essential</div>
                <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Athletic</div>
                <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Fitness</div>
                <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Average</div>
                <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Obese</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
