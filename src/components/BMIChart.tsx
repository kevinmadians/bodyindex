
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BMIChartProps {
  bmi: number;
  bmiCategory: string;
}

const BMIChart: React.FC<BMIChartProps> = ({ bmi, bmiCategory }) => {
  // BMI categories and their ranges with improved, more visible colors
  const categories = [
    { name: "Underweight", range: "< 18.5", color: "bg-blue-500", start: 0, end: 18.5, risks: "Nutritional deficiencies, weakened immune system, osteoporosis" },
    { name: "Normal weight", range: "18.5 - 24.9", color: "bg-green-500", start: 18.5, end: 25, risks: "Lowest risk for weight-related health issues" },
    { name: "Overweight", range: "25 - 29.9", color: "bg-yellow-500", start: 25, end: 30, risks: "Heart disease, high blood pressure, type 2 diabetes" },
    { name: "Obesity (Class 1)", range: "30 - 34.9", color: "bg-orange-400", start: 30, end: 35, risks: "Higher risk of heart disease, stroke, metabolic syndrome" },
    { name: "Obesity (Class 2)", range: "35 - 39.9", color: "bg-orange-600", start: 35, end: 40, risks: "High risk of developing serious health conditions" },
    { name: "Obesity (Class 3)", range: "≥ 40", color: "bg-red-600", start: 40, end: 50, risks: "Extremely high risk of life-threatening health conditions" }
  ];

  // Calculate percentage position for the BMI indicator
  const getIndicatorPosition = () => {
    if (bmi <= 0) return 0;
    if (bmi >= 50) return 100;
    
    return (bmi / 50) * 100;
  };

  // Find the current BMI category
  const getCurrentCategory = () => {
    if (bmi <= 0) return null;
    return categories.find(category => bmi >= category.start && bmi < category.end);
  };

  const currentCategory = getCurrentCategory();

  return (
    <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-xl font-bold text-primary flex items-center">
          <span className="mr-2">📊</span> 
          BMI Categories Chart
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Informational text */}
        <p className="mb-6 text-muted-foreground">
          The BMI ranges are based on the relationship between body weight and health problems. 
          Use this chart to understand where your BMI falls and what it means for your health.
        </p>
        
        <div className="space-y-8">
          {/* Horizontal BMI scale with improved visibility - Fixed for mobile */}
          <div className="relative pt-6 pb-16">
            {/* BMI Scale bar */}
            <div className="flex h-10 rounded-md overflow-hidden shadow-inner">
              {categories.map((category, index) => {
                // Calculate width based on category range
                const width = `${(category.end - category.start) / 50 * 100}%`;
                return (
                  <div 
                    key={index}
                    className={`${category.color} relative text-white text-xs font-medium flex items-center justify-center`}
                    style={{ 
                      flexBasis: width,
                      minWidth: '4px' // Ensure minimum visibility on small screens
                    }}
                  >
                    <span className="px-1 truncate hidden sm:inline-block">{category.name}</span>
                  </div>
                )
              })}
            </div>
            
            {/* Scale markers */}
            <div className="absolute left-0 right-0 top-0 flex justify-between">
              {[0, 10, 20, 30, 40, 50].map((value) => (
                <div key={value} className="relative">
                  <div className="absolute h-2 w-0.5 bg-gray-400 bottom-0 left-1/2 transform -translate-x-1/2"></div>
                  <span className="absolute text-xs font-medium bottom-3 transform -translate-x-1/2">{value}</span>
                </div>
              ))}
            </div>
            
            {/* BMI Indicator - Fixed for cross-device consistency */}
            {bmi > 0 && (
              <div 
                className="absolute"
                style={{ 
                  left: `${getIndicatorPosition()}%`, 
                  bottom: '0',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                  willChange: 'left' // Optimize rendering
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-16 bg-black"></div>
                  <div className="w-8 h-8 rounded-full bg-primary border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                    {Math.round(bmi)}
                  </div>
                  <div className="mt-2 bg-primary text-white px-3 py-1.5 rounded-md text-sm font-bold whitespace-nowrap shadow-md text-center">
                    {bmi.toFixed(1)}
                    {currentCategory && (
                      <span className="block text-xs">{currentCategory.name}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile-friendly category labels */}
          <div className="sm:hidden grid grid-cols-3 gap-1 mb-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${category.color} flex-shrink-0`}></div>
                <span className="text-xs truncate">{category.name}</span>
              </div>
            ))}
          </div>
          
          {/* BMI Categories Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <h3 className="text-lg font-bold mb-2 col-span-full flex items-center">
              <span className="mr-2">🔍</span>
              Health Risk by Category
            </h3>
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg transition-all ${
                  currentCategory?.name === category.name 
                    ? "ring-2 ring-primary" 
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-5 h-5 rounded-full ${category.color}`}></div>
                  <h3 className="text-base font-bold">{category.name}</h3>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">BMI: {category.range}</span>
                </div>
                <p className="text-sm text-muted-foreground">{category.risks}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional information about BMI */}
        <div className="mt-8 p-5 border rounded-lg bg-muted/30 shadow-sm">
          <h3 className="font-bold mb-3 text-lg flex items-center">
            <span className="mr-2">⚠️</span>
            Understanding BMI Limitations
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-5">
            <li>
              <span className="font-medium text-primary">Not a diagnostic tool:</span> BMI doesn't directly measure body fat or muscle mass.
            </li>
            <li>
              <span className="font-medium text-primary">Athletes:</span> May have a high BMI due to muscle mass, not excess fat.
            </li>
            <li>
              <span className="font-medium text-primary">Elderly:</span> May have a normal BMI despite having less muscle and more fat.
            </li>
            <li>
              <span className="font-medium text-primary">Ethnicity:</span> Different ethnic groups may have different body compositions at the same BMI.
            </li>
            <li>
              <span className="font-medium text-primary">Children and teens:</span> BMI is calculated differently for children and adolescents.
            </li>
          </ul>
        </div>

        {/* Health Actions Section */}
        <div className="mt-8 p-5 border-t pt-8">
          <h3 className="font-bold mb-4 text-lg text-primary flex items-center">
            <span className="mr-2">🚀</span>
            Recommended Health Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md">
              <h4 className="font-bold mb-2 text-blue-700">Track Progress</h4>
              <p className="text-sm">Monitor your BMI regularly alongside other health metrics like waist circumference, body fat percentage, and fitness level.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100 hover:shadow-md">
              <h4 className="font-bold mb-2 text-green-700">Consult Professionals</h4>
              <p className="text-sm">Speak with healthcare providers about your BMI results and develop a personalized health plan.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md">
              <h4 className="font-bold mb-2 text-purple-700">Lifestyle Changes</h4>
              <p className="text-sm">Focus on sustainable habits rather than quick fixes. Small, consistent changes yield better long-term results.</p>
            </div>
          </div>
        </div>
        
        {/* Body Visualization Section */}
        <div className="mt-8 p-5 border rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
          <h3 className="font-bold mb-4 text-lg flex items-center">
            <span className="mr-2">👤</span>
            Body Composition Insights
          </h3>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-32 h-64 mx-auto md:mx-0">
              {/* Basic body silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 200" className="w-full h-full">
                  {/* Head */}
                  <circle cx="50" cy="30" r="20" className="fill-primary/80" />
                  
                  {/* Body */}
                  <path d="M30,50 C30,50 20,120 30,160 C35,180 45,180 50,180 C55,180 65,180 70,160 C80,120 70,50 70,50 Z" 
                    className={`${bmi > 30 ? 'fill-orange-400' : bmi > 25 ? 'fill-yellow-400' : bmi > 18.5 ? 'fill-green-400' : 'fill-blue-400'}`} />
                  
                  {/* Arms */}
                  <path d="M30,60 C20,80 10,100 15,130" className={`stroke-primary/60 fill-none stroke-[4] ${bmi > 30 ? 'stroke-orange-400' : bmi > 25 ? 'stroke-yellow-400' : 'stroke-primary/60'}`} />
                  <path d="M70,60 C80,80 90,100 85,130" className={`stroke-primary/60 fill-none stroke-[4] ${bmi > 30 ? 'stroke-orange-400' : bmi > 25 ? 'stroke-yellow-400' : 'stroke-primary/60'}`} />
                  
                  {/* Legs */}
                  <path d="M40,180 L35,200" className="stroke-primary/80 fill-none stroke-[4]" />
                  <path d="M60,180 L65,200" className="stroke-primary/80 fill-none stroke-[4]" />
                  
                  {/* Body size changes based on BMI */}
                  <circle cx="50" cy="110" r={Math.max(15, Math.min(30, bmi/2))} 
                    className={`${bmi > 30 ? 'fill-orange-300/80' : bmi > 25 ? 'fill-yellow-300/80' : bmi > 18.5 ? 'fill-green-300/80' : 'fill-blue-300/80'}`} />
                </svg>
              </div>
              
              {/* BMI indicator */}
              <div className="absolute top-1/3 -right-8 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                BMI: {bmi.toFixed(1)}
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <h4 className="font-semibold text-primary">How Your BMI Affects Your Body</h4>
              
              {bmi < 18.5 && (
                <div className="space-y-2">
                  <p className="text-sm">At a BMI below 18.5, you may have less energy reserves and potentially less muscle mass.</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Your body may have difficulty fighting off infections</li>
                    <li>You might experience reduced bone density over time</li>
                    <li>Hormonal imbalances may develop affecting multiple systems</li>
                  </ul>
                </div>
              )}
              
              {bmi >= 18.5 && bmi < 25 && (
                <div className="space-y-2">
                  <p className="text-sm">With a BMI between 18.5-24.9, your body likely has a balanced proportion of muscle, fat, and other tissues.</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Your cardiovascular system can function efficiently</li>
                    <li>Your joints experience appropriate level of stress</li>
                    <li>Your metabolic health indicators are typically within normal ranges</li>
                  </ul>
                </div>
              )}
              
              {bmi >= 25 && bmi < 30 && (
                <div className="space-y-2">
                  <p className="text-sm">A BMI between 25-29.9 may indicate excess fat that can start affecting your body's systems.</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Your heart works harder to pump blood throughout your body</li>
                    <li>Joints may experience increased stress during physical activity</li>
                    <li>Risk increases for insulin resistance and metabolic changes</li>
                  </ul>
                </div>
              )}
              
              {bmi >= 30 && (
                <div className="space-y-2">
                  <p className="text-sm">With a BMI of 30 or higher, excess fat can significantly impact multiple body systems.</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>Your cardiovascular system is under increased strain</li>
                    <li>Joint stress can lead to wear and discomfort</li>
                    <li>Metabolic changes may affect energy production and storage</li>
                    <li>Inflammatory markers may be elevated throughout the body</li>
                  </ul>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground italic">Note: This visualization is simplified and for educational purposes only.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMIChart;
