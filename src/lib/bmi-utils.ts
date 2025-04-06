
// BMI calculation functions
export const calculateBMI = (weight: number, height: number, unit: 'metric' | 'imperial'): number => {
  if (height <= 0 || weight <= 0) return 0;
  
  if (unit === 'metric') {
    // Weight in kg, height in cm
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  } else {
    // Weight in lbs, height in inches
    return parseFloat(((weight / (height * height)) * 703).toFixed(1));
  }
};

export const getBMICategory = (bmi: number): string => {
  if (bmi <= 0) return "N/A";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obesity (Class 1)";
  if (bmi < 40) return "Obesity (Class 2)";
  return "Obesity (Class 3)";
};

export const getBMICategoryColor = (bmi: number): string => {
  if (bmi <= 0) return "bg-gray-200";
  if (bmi < 18.5) return "bg-bmi-blue-DEFAULT";
  if (bmi < 25) return "bg-bmi-green-DEFAULT";
  if (bmi < 30) return "bg-bmi-yellow-DEFAULT";
  if (bmi < 35) return "bg-bmi-orange-light";
  if (bmi < 40) return "bg-bmi-orange-DEFAULT";
  return "bg-bmi-red-DEFAULT";
};

export const getHealthRisks = (bmi: number): string => {
  if (bmi <= 0) return "N/A";
  if (bmi < 18.5) return "Risk of nutritional deficiency and osteoporosis.";
  if (bmi < 25) return "Low risk for health problems.";
  if (bmi < 30) return "Moderate risk for heart disease, high blood pressure, and type 2 diabetes.";
  if (bmi < 35) return "High risk for heart disease, high blood pressure, type 2 diabetes, and other health issues.";
  if (bmi < 40) return "Very high risk for heart disease, high blood pressure, type 2 diabetes, and other health issues.";
  return "Extremely high risk for heart disease, high blood pressure, type 2 diabetes, and other serious health issues.";
};

export const getRecommendations = (bmi: number): string[] => {
  if (bmi <= 0) return ["N/A"];
  
  if (bmi < 18.5) return [
    "Consult with a healthcare provider about healthy weight gain strategies.",
    "Consider increasing calorie intake with nutrient-dense foods.",
    "Include strength training to build muscle mass.",
    "Monitor nutritional intake to ensure adequate vitamins and minerals."
  ];
  
  if (bmi < 25) return [
    "Maintain current healthy lifestyle habits.",
    "Regular physical activity (150+ minutes per week).",
    "Balanced diet rich in fruits, vegetables, lean proteins, and whole grains.",
    "Regular health check-ups to monitor overall health."
  ];
  
  if (bmi >= 25) {
    const recommendations = [
      "Aim for gradual weight loss of 1-2 pounds per week.",
      "Increase physical activity (150+ minutes per week).",
      "Follow a balanced, portion-controlled diet.",
      "Consider consulting with healthcare professionals for personalized advice."
    ];
    
    if (bmi >= 30) {
      recommendations.push("Medical supervision is recommended for your weight management plan.");
    }
    
    if (bmi >= 35) {
      recommendations.push("Discuss potential medical interventions with your healthcare provider.");
    }
    
    return recommendations;
  }
  
  return ["Consult with a healthcare professional for personalized advice."];
};

export const getIdealWeightRange = (height: number, unit: 'metric' | 'imperial'): { min: number; max: number } => {
  if (height <= 0) return { min: 0, max: 0 };
  
  if (unit === 'metric') {
    // Height in cm
    const heightInMeters = height / 100;
    const minWeight = 18.5 * heightInMeters * heightInMeters;
    const maxWeight = 24.9 * heightInMeters * heightInMeters;
    return { 
      min: parseFloat(minWeight.toFixed(1)), 
      max: parseFloat(maxWeight.toFixed(1)) 
    };
  } else {
    // Height in inches
    const minWeight = (18.5 * height * height) / 703;
    const maxWeight = (24.9 * height * height) / 703;
    return { 
      min: parseFloat(minWeight.toFixed(1)), 
      max: parseFloat(maxWeight.toFixed(1)) 
    };
  }
};
