
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";

interface BMIResultsProps {
  bmi: number;
  bmiCategory: string;
  categoryColor: string;
  healthRisks: string;
  recommendations: string[];
  idealWeightRange: { min: number; max: number };
  unit: 'metric' | 'imperial';
}

const BMIResults: React.FC<BMIResultsProps> = ({
  bmi,
  bmiCategory,
  categoryColor,
  healthRisks,
  recommendations,
  idealWeightRange,
  unit
}) => {
  if (bmi <= 0) {
    return (
      <Card className="mb-8 border shadow-lg animate-scale-in">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Please enter your height and weight to calculate your BMI.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Improve category color mapping for better visibility
  const getCategoryColorClass = () => {
    switch (bmiCategory) {
      case "Underweight":
        return "bg-blue-500 text-white";
      case "Normal weight":
        return "bg-green-500 text-white";
      case "Overweight":
        return "bg-yellow-500 text-black";
      case "Obesity (Class 1)":
        return "bg-orange-400 text-white";
      case "Obesity (Class 2)":
        return "bg-orange-600 text-white";
      case "Obesity (Class 3)":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Get health insights based on BMI category
  const getHealthInsights = () => {
    switch (bmiCategory) {
      case "Underweight":
        return {
          title: "Increasing Weight Safely",
          insights: [
            "Focus on nutrient-dense foods rather than empty calories",
            "Consider smaller, more frequent meals if you get full quickly",
            "Strength training can help build muscle mass",
            "Track your protein intake to ensure you're getting enough"
          ]
        };
      case "Normal weight":
        return {
          title: "Maintaining Your Healthy Weight",
          insights: [
            "Continue balanced eating patterns with whole foods",
            "Regular physical activity helps maintain weight and overall health",
            "Preventive healthcare and regular check-ups are still important",
            "Focus on quality sleep and stress management"
          ]
        };
      case "Overweight":
        return {
          title: "Weight Management Strategies",
          insights: [
            "Moderate calorie reduction (about 500 calories/day) can lead to sustainable weight loss",
            "Regular physical activity (30-60 minutes daily) improves metabolism",
            "Prioritize whole foods over processed options",
            "Stay hydrated; sometimes thirst is mistaken for hunger"
          ]
        };
      default:
        return {
          title: "Medical Support for Weight Management",
          insights: [
            "Consult healthcare providers before starting any weight loss program",
            "Consider a multidisciplinary approach with dietitians and fitness professionals",
            "Regular monitoring of health markers beyond just weight is important",
            "Focus on small, sustainable changes rather than extreme measures"
          ]
        };
    }
  };

  const healthInsights = getHealthInsights();

  return (
    <Card className="mb-8 border shadow-lg animate-scale-in">
      <CardContent className="p-6">
        {/* Updated: More Compact Layout with Centered BMI Display and Badge below BMI */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold mb-2 animate-fade-in">Your BMI</h3>
          <div className="flex flex-col items-center justify-center mb-3">
            <span className="text-6xl font-bold text-primary animate-pulse">
              {bmi}
            </span>
            <Badge className={`${getCategoryColorClass()} px-3 py-1 text-sm mt-2 animate-scale-in`}>
              {bmiCategory}
            </Badge>
          </div>
          
          <p className="mb-2 text-sm inline-block bg-primary/10 px-3 py-1 rounded-full animate-fade-in">
            A healthy BMI range is <span className="font-semibold text-green-600">18.5 to 24.9</span>
          </p>
          
          <div className="mt-3 inline-block hover:scale-105 transition-transform">
            <p className="text-sm font-medium">
              Ideal Weight Range: <span className="font-bold">{idealWeightRange.min} - {idealWeightRange.max} {unit === 'metric' ? 'kg' : 'lbs'}</span>
            </p>
          </div>
        </div>
                
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Risks and Formula */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Alert className="mb-4 hover:shadow-md transition-shadow">
              <AlertTitle className="font-bold">Health Risk Assessment</AlertTitle>
              <AlertDescription className="mt-2 text-sm">
                {healthRisks}
              </AlertDescription>
            </Alert>

            <div className="p-3 border rounded-lg mb-4 text-sm hover:border-primary/50 transition-colors">
              <h4 className="font-semibold mb-1">How Your BMI Was Calculated</h4>
              <p className="mb-1">BMI = weight / (height²)</p>
              {unit === 'metric' ? (
                <p className="text-muted-foreground">
                  Weight in kilograms divided by height in meters squared
                </p>
              ) : (
                <p className="text-muted-foreground">
                  (Weight in pounds × 703) divided by height in inches squared
                </p>
              )}
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold mb-2">Your Action Plan</h3>
            <ul className="space-y-2 mb-4">
              {recommendations.slice(0, 3).map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 p-1.5 hover:bg-muted/50 rounded-md transition-colors text-sm hover:scale-[1.01] transition-transform">
                  <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
            
            {/* Health Insights Section - Compact */}
            <div className="border rounded-lg overflow-hidden text-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-2">
                <h4 className="font-bold">{healthInsights.title}</h4>
              </div>
              <div className="p-3">
                <ul className="space-y-1.5">
                  {healthInsights.insights.slice(0, 2).map((insight, index) => (
                    <li key={index} className="flex items-start gap-1.5 hover:translate-x-1 transition-transform">
                      <span className="text-primary inline-block animate-pulse">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Note section */}
        <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-muted-foreground">
            BMI is a screening tool but does not diagnose body fatness or health. Consult with a healthcare provider for a complete health assessment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMIResults;
