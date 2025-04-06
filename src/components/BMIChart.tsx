
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BMIChartProps {
  bmi: number;
  bmiCategory: string;
}

const BMIChart: React.FC<BMIChartProps> = ({ bmi, bmiCategory }) => {
  // BMI categories and their ranges with improved, more visible colors
  const categories = [
    { name: "Obesity (Class 3)", range: "≥ 40", color: "bg-red-600", start: 40, end: 50, risks: "Extremely high risk of life-threatening health conditions" },
    { name: "Obesity (Class 2)", range: "35 - 39.9", color: "bg-orange-600", start: 35, end: 40, risks: "High risk of developing serious health conditions" },
    { name: "Obesity (Class 1)", range: "30 - 34.9", color: "bg-orange-400", start: 30, end: 35, risks: "Higher risk of heart disease, stroke, metabolic syndrome" },
    { name: "Overweight", range: "25 - 29.9", color: "bg-yellow-500", start: 25, end: 30, risks: "Heart disease, high blood pressure, type 2 diabetes" },
    { name: "Normal weight", range: "18.5 - 24.9", color: "bg-green-500", start: 18.5, end: 25, risks: "Lowest risk for weight-related health issues" },
    { name: "Underweight", range: "< 18.5", color: "bg-blue-500", start: 0, end: 18.5, risks: "Nutritional deficiencies, weakened immune system, osteoporosis" }
  ];

  // Calculate position percentage for the BMI indicator
  const getIndicatorPosition = () => {
    if (bmi <= 0) return 0;
    
    // Find the category for the current BMI
    const category = categories.find(category => bmi >= category.start && bmi < category.end) || categories[0];
    
    // Calculate percentage within the category
    const totalHeight = 100; // Total height available for the chart
    const categoryHeight = (category.end - category.start) / 50 * totalHeight;
    const categoryStartPosition = categories.reduce((position, cat) => {
      if (cat.start > category.start) return position;
      return position + (cat.end - cat.start) / 50 * totalHeight;
    }, 0);
    
    // Calculate position within the category
    const positionInCategory = ((bmi - category.start) / (category.end - category.start)) * categoryHeight;
    
    // Position from the bottom (since we reversed the categories)
    return categoryStartPosition + positionInCategory;
  };

  // Find the correct category for the current BMI
  const getCurrentCategory = () => {
    if (bmi <= 0) return null;
    return categories.find(category => bmi >= category.start && bmi < category.end);
  };

  const currentCategory = getCurrentCategory();

  return (
    <Card className="mb-8 shadow-lg animate-slide-up">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">BMI Categories Chart</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Informational text */}
        <p className="mb-6 text-muted-foreground">
          The BMI ranges are based on the relationship between body weight and health problems. Use this chart to understand where your BMI falls and what it means for your health.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vertical BMI scale */}
          <div className="relative h-[400px] mb-12">
            <div className="flex flex-col h-full rounded-md overflow-hidden">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className={`${category.color} relative flex-grow text-white text-xs font-medium flex items-center justify-center`}
                  style={{ 
                    flexBasis: `${(category.end - category.start) / 50 * 100}%`,
                  }}
                >
                  <div className="flex items-center justify-between w-full px-3">
                    <span>{category.name}</span>
                    <span>{category.range}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scale markers */}
            <div className="absolute top-0 right-0 h-full flex flex-col justify-between translate-x-full pl-3">
              {[50, 40, 30, 20, 10, 0].map((value) => (
                <div key={value} className="text-center relative">
                  <div className="absolute h-0.5 w-2 bg-gray-400 left-0 top-1/2 transform -translate-y-1/2"></div>
                  <span className="text-xs font-medium pl-3">{value}</span>
                </div>
              ))}
            </div>
            
            {/* BMI Indicator with improved visibility */}
            {bmi > 0 && (
              <div 
                className="absolute w-full h-0 transform"
                style={{ 
                  bottom: `${getIndicatorPosition()}%`, 
                  left: '0',
                  zIndex: 10
                }}
              >
                <div className="w-full h-1 bg-black"></div>
                <div className="absolute top-0 right-full transform -translate-y-1/2 -translate-x-3 bg-primary text-white px-3 py-1.5 rounded-md text-sm font-bold whitespace-nowrap shadow-md animate-pulse">
                  Your BMI: {bmi}
                  {currentCategory && (
                    <span className="ml-2">({currentCategory.name})</span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* BMI Categories Information */}
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold mb-2">Health Risk by Category</h3>
            {categories.slice().reverse().map((category, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-5 h-5 rounded-full ${category.color}`}></div>
                  <h3 className="text-base font-bold">{category.name}</h3>
                  <span className="text-sm font-medium text-muted-foreground ml-auto">BMI: {category.range}</span>
                </div>
                <p className="text-sm text-muted-foreground">{category.risks}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional information about BMI */}
        <div className="mt-8 p-5 border rounded-lg bg-muted/30 shadow-sm animate-slide-up" style={{ animationDelay: "300ms" }}>
          <h3 className="font-bold mb-3 text-lg">Understanding BMI Limitations</h3>
          <ul className="text-sm space-y-3 list-disc pl-5">
            <li><span className="font-medium">Not a diagnostic tool:</span> BMI doesn't directly measure body fat or muscle mass.</li>
            <li><span className="font-medium">Athletes:</span> May have a high BMI due to muscle mass, not excess fat.</li>
            <li><span className="font-medium">Elderly:</span> May have a normal BMI despite having less muscle and more fat.</li>
            <li><span className="font-medium">Ethnicity:</span> Different ethnic groups may have different body compositions at the same BMI.</li>
            <li><span className="font-medium">Children and teens:</span> BMI is calculated differently for children and adolescents.</li>
          </ul>
        </div>

        {/* Health Actions Section */}
        <div className="mt-8 p-5 border-t pt-8 animate-slide-up" style={{ animationDelay: "400ms" }}>
          <h3 className="font-bold mb-4 text-lg text-primary">Recommended Health Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:scale-105 transition-transform">
              <h4 className="font-bold mb-2 text-blue-700">Track Progress</h4>
              <p className="text-sm">Monitor your BMI regularly alongside other health metrics like waist circumference, body fat percentage, and fitness level.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100 hover:scale-105 transition-transform">
              <h4 className="font-bold mb-2 text-green-700">Consult Professionals</h4>
              <p className="text-sm">Speak with healthcare providers about your BMI results and develop a personalized health plan.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 hover:scale-105 transition-transform">
              <h4 className="font-bold mb-2 text-purple-700">Lifestyle Changes</h4>
              <p className="text-sm">Focus on sustainable habits rather than quick fixes. Small, consistent changes yield better long-term results.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMIChart;
