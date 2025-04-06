
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
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main BMI Result */}
          <div className="flex-1">
            <div className="text-center p-6 rounded-lg bg-muted mb-6">
              <h3 className="text-xl font-semibold mb-1">Your BMI</h3>
              <div className="flex items-center justify-center">
                <span className="text-5xl font-bold text-primary">{bmi}</span>
                <Badge className={`ml-3 ${getCategoryColorClass()} px-3 py-1 text-sm`}>
                  {bmiCategory}
                </Badge>
              </div>
              
              <p className="mt-4 text-sm">
                A healthy BMI range is <span className="font-semibold text-green-600">18.5 to 24.9</span>
              </p>
              
              <div className="mt-4 p-3 bg-primary/10 rounded-lg inline-block">
                <h4 className="text-sm font-semibold text-primary">Ideal Weight Range:</h4>
                <p className="font-medium text-lg">
                  {idealWeightRange.min} - {idealWeightRange.max} {unit === 'metric' ? 'kg' : 'lbs'}
                </p>
              </div>
            </div>
            
            <Alert className="mb-6">
              <AlertTitle className="font-bold">Health Risk Assessment</AlertTitle>
              <AlertDescription className="mt-2">
                {healthRisks}
              </AlertDescription>
            </Alert>

            {/* New: BMI Formula Explanation */}
            <div className="p-4 border rounded-lg mb-6">
              <h4 className="font-semibold mb-2">How Your BMI Was Calculated</h4>
              <p className="text-sm mb-2">BMI = weight / (height²)</p>
              {unit === 'metric' ? (
                <p className="text-sm text-muted-foreground">
                  Weight in kilograms divided by height in meters squared
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  (Weight in pounds × 703) divided by height in inches squared
                </p>
              )}
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-3">Your Action Plan</h3>
            <ul className="space-y-3 mb-6">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 p-2 hover:bg-muted/50 rounded-md transition-colors">
                  <div className="h-6 w-6 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
            
            {/* New: Health Insights Section */}
            <div className="mt-6 border rounded-lg overflow-hidden">
              <div className="bg-primary/10 p-3">
                <h4 className="font-bold">{healthInsights.title}</h4>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {healthInsights.insights.map((insight, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-primary inline-block">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Important Note</h4>
              <p className="text-sm text-muted-foreground">
                BMI is a screening tool but it does not diagnose body fatness or health. Consult with a healthcare provider for a complete health assessment.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMIResults;
