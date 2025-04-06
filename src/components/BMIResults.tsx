
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

  return (
    <Card className="mb-8 border shadow-lg animate-scale-in">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main BMI Result */}
          <div className="flex-1">
            <div className="text-center p-6 rounded-lg bg-muted mb-4">
              <h3 className="text-xl font-semibold mb-1">Your BMI</h3>
              <div className="flex items-center justify-center">
                <span className="text-5xl font-bold text-primary">{bmi}</span>
                <Badge className={`ml-3 ${categoryColor} text-white`}>
                  {bmiCategory}
                </Badge>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground">
                A healthy BMI range is 18.5 to 24.9
              </p>
              
              <div className="mt-4">
                <h4 className="text-sm font-semibold">Ideal Weight Range:</h4>
                <p className="font-medium">
                  {idealWeightRange.min} - {idealWeightRange.max} {unit === 'metric' ? 'kg' : 'lbs'}
                </p>
              </div>
            </div>
            
            <Alert className="mb-4">
              <AlertTitle>Health Risk Assessment</AlertTitle>
              <AlertDescription>
                {healthRisks}
              </AlertDescription>
            </Alert>
          </div>
          
          {/* Recommendations */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-6 w-6 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
            
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
