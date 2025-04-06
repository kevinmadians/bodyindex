
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BMIChartProps {
  bmi: number;
  bmiCategory: string;
}

const BMIChart: React.FC<BMIChartProps> = ({ bmi, bmiCategory }) => {
  // BMI categories and their ranges
  const categories = [
    { name: "Underweight", range: "< 18.5", color: "bg-bmi-blue-DEFAULT", start: 0, end: 18.5 },
    { name: "Normal weight", range: "18.5 - 24.9", color: "bg-bmi-green-DEFAULT", start: 18.5, end: 25 },
    { name: "Overweight", range: "25 - 29.9", color: "bg-bmi-yellow-DEFAULT", start: 25, end: 30 },
    { name: "Obesity (Class 1)", range: "30 - 34.9", color: "bg-bmi-orange-light", start: 30, end: 35 },
    { name: "Obesity (Class 2)", range: "35 - 39.9", color: "bg-bmi-orange-DEFAULT", start: 35, end: 40 },
    { name: "Obesity (Class 3)", range: "≥ 40", color: "bg-bmi-red-DEFAULT", start: 40, end: 50 }
  ];

  // Calculate position percentage for the BMI indicator
  const getIndicatorPosition = () => {
    if (bmi <= 0) return 0;
    
    // Scale from 0 to 50 for the full chart width
    const percentage = (bmi / 50) * 100;
    
    // Clamp to make sure it stays within the chart
    return Math.min(Math.max(percentage, 0), 100);
  };

  return (
    <Card className="mb-8 shadow-lg animate-slide-up">
      <CardHeader>
        <CardTitle className="text-xl">BMI Categories Chart</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Informational text */}
        <p className="mb-6 text-muted-foreground">
          The BMI ranges are based on the relationship between body weight and health problems and mortality rates.
        </p>
        
        {/* BMI scale visual */}
        <div className="relative mt-6 mb-12">
          <div className="flex h-10 rounded-md overflow-hidden">
            {categories.map((category, index) => (
              <div 
                key={index}
                className={`${category.color} relative flex-grow text-white text-xs flex items-center justify-center`}
                style={{ 
                  flexBasis: `${(category.end - category.start) / 50 * 100}%`,
                  position: 'relative'
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
          
          {/* Scale markers */}
          <div className="flex justify-between mt-1">
            {[0, 10, 20, 30, 40, 50].map((value) => (
              <div key={value} className="text-center relative">
                <div className="absolute h-2 w-0.5 bg-gray-300 -top-2 left-1/2 transform -translate-x-1/2"></div>
                <span className="text-xs text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
          
          {/* BMI Indicator */}
          {bmi > 0 && (
            <div 
              className="absolute w-0 h-0 transform -translate-x-1/2"
              style={{ 
                left: `${getIndicatorPosition()}%`, 
                top: '-10px' 
              }}
            >
              <div className="h-14 w-0.5 bg-black"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                Your BMI: {bmi}
              </div>
            </div>
          )}
        </div>
        
        {/* BMI Categories Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-sm ${category.color}`}></div>
              <div>
                <p className="text-sm font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground">BMI: {category.range}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional information about BMI */}
        <div className="mt-8 p-4 border rounded-lg bg-muted/30">
          <h3 className="font-semibold mb-2">Understanding BMI Limitations</h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>BMI doesn't directly measure body fat or muscle mass.</li>
            <li>Athletes may have a high BMI due to muscle mass, not body fat.</li>
            <li>BMI may underestimate health risks in certain populations.</li>
            <li>Other factors like waist circumference and family history are important for comprehensive health assessment.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMIChart;
