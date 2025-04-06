
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
  if (bmi <= 0) return "bg-gray-500";
  if (bmi < 18.5) return "bg-blue-500";
  if (bmi < 25) return "bg-green-500";
  if (bmi < 30) return "bg-yellow-500";
  if (bmi < 35) return "bg-orange-400";
  if (bmi < 40) return "bg-orange-600";
  return "bg-red-600";
};

export const getHealthRisks = (bmi: number): string => {
  if (bmi <= 0) return "N/A";
  if (bmi < 18.5) return "Increased risk of nutritional deficiencies, osteoporosis, and weakened immune system. Your body may lack essential nutrients needed for optimal function.";
  if (bmi < 25) return "You're at a healthy weight with lower risk for weight-related health problems. Maintaining this range promotes overall wellbeing and longevity.";
  if (bmi < 30) return "Increased risk for heart disease, high blood pressure, and type 2 diabetes. Even modest weight loss of 5-10% can significantly improve your health markers.";
  if (bmi < 35) return "High risk for serious health conditions including heart disease, stroke, type 2 diabetes, and certain cancers. Weight management should be a priority.";
  if (bmi < 40) return "Very high risk for severe health conditions. Your weight may be impacting your quality of life, and medical intervention may be recommended.";
  return "Extremely high risk for life-threatening conditions. This BMI range is associated with decreased life expectancy. Medical supervision is strongly advised for weight management.";
};

export const getRecommendations = (bmi: number): string[] => {
  if (bmi <= 0) return ["N/A"];
  
  if (bmi < 18.5) return [
    "Consult with a healthcare provider about healthy weight gain strategies.",
    "Increase calorie intake with nutrient-dense foods like nuts, avocados, and whole grains.",
    "Include strength training 2-3 times weekly to build muscle mass.",
    "Consider tracking your food intake to ensure adequate nutrition.",
    "Rule out any underlying medical conditions that might affect weight."
  ];
  
  if (bmi < 25) return [
    "Maintain your current healthy eating and activity patterns.",
    "Aim for 150+ minutes of moderate exercise per week to maintain cardiovascular health.",
    "Include strength training 2-3 times weekly to preserve muscle mass.",
    "Focus on a balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains.",
    "Continue regular health check-ups to monitor overall health."
  ];
  
  if (bmi >= 25) {
    const recommendations = [
      "Aim for gradual weight loss of 0.5-1 kg (1-2 lbs) per week through a modest calorie deficit.",
      "Increase physical activity to 150-300 minutes per week, combining cardio and strength training.",
      "Focus on portion control and mindful eating rather than restrictive diets.",
      "Prioritize whole foods and reduce ultra-processed food consumption.",
      "Track your progress with measurements beyond just weight, such as waist circumference and energy levels."
    ];
    
    if (bmi >= 30) {
      recommendations.push("Consider working with a healthcare provider to develop a comprehensive weight management plan.");
    }
    
    if (bmi >= 35) {
      recommendations.push("Discuss potential medical interventions with your healthcare provider, including counseling, medication, or surgical options if appropriate.");
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

// New helper functions for additional insights

export const getActivityCaloriesBurned = (weight: number, unit: 'metric' | 'imperial'): Record<string, number> => {
  // Convert weight to kg if in imperial
  const weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
  
  // MET values (Metabolic Equivalent of Task) for different activities
  // Calories burned = MET × weight (kg) × duration (hours)
  // These are rough estimates for 30 minutes of activity
  return {
    walking: Math.round(3.5 * weightInKg * 0.5),
    jogging: Math.round(7.0 * weightInKg * 0.5),
    cycling: Math.round(6.0 * weightInKg * 0.5),
    swimming: Math.round(5.8 * weightInKg * 0.5),
    weightLifting: Math.round(3.5 * weightInKg * 0.5),
    yoga: Math.round(2.5 * weightInKg * 0.5)
  };
};

export const getBaseMetabolicRate = (weight: number, height: number, age: number = 30, gender: 'male' | 'female' = 'male', unit: 'metric' | 'imperial'): number => {
  // Convert imperial to metric if needed
  let weightInKg = weight;
  let heightInCm = height;
  
  if (unit === 'imperial') {
    weightInKg = weight / 2.20462;
    heightInCm = height * 2.54;
  }
  
  // Mifflin-St Jeor equation
  if (gender === 'male') {
    return Math.round((10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5);
  } else {
    return Math.round((10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161);
  }
};
