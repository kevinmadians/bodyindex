// Types
export type FormulaType = 'mifflin' | 'harris' | 'katch';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
export type Goal = 'lose' | 'maintain' | 'gain';

export interface MacroBreakdown {
  protein: { grams: number; calories: number; percentage: number };
  carbs: { grams: number; calories: number; percentage: number };
  fat: { grams: number; calories: number; percentage: number };
}

// Activity multipliers
const ACTIVITY_MULTIPLIERS = {
  'sedentary': 1.2, // Little or no exercise, desk job
  'light': 1.375, // Light exercise 1-3 days per week
  'moderate': 1.55, // Moderate exercise 3-5 days per week
  'active': 1.725, // Hard exercise 6-7 days per week
  'very-active': 1.9 // Very hard exercise, physical job or training twice a day
};

// Calorie adjustment for goals
const GOAL_ADJUSTMENTS = {
  'lose': -500, // Calorie deficit for weight loss (approx 1lb/week)
  'maintain': 0, // Maintenance calories
  'gain': 500 // Calorie surplus for weight gain
};

// Macro nutrient energy content (calories per gram)
const MACRO_CALORIES = {
  protein: 4,
  carbs: 4,
  fat: 9
};

/**
 * Calculate BMR using various formulas
 * @param gender - 'male' or 'female'
 * @param age - Age in years
 * @param weight - Weight in kg
 * @param height - Height in cm
 * @param formula - Formula to use (mifflin, harris, or katch)
 * @param bodyFatPercentage - Optional body fat percentage for Katch-McArdle formula
 * @returns BMR in calories
 */
export const calculateBMR = (
  gender: string,
  age: number,
  weight: number, // in kg
  height: number, // in cm
  formula: FormulaType,
  bodyFatPercentage?: number
): number => {
  let bmr = 0;

  switch (formula) {
    case 'mifflin':
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      break;
      
    case 'harris':
      // Harris-Benedict Equation
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      break;
      
    case 'katch':
      // Katch-McArdle Formula (requires body fat percentage)
      if (bodyFatPercentage !== undefined) {
        const leanBodyMass = weight * (1 - (bodyFatPercentage / 100));
        bmr = 370 + (21.6 * leanBodyMass);
      } else {
        // If formula is katch but no body fat provided, use Mifflin-St Jeor instead
        if (gender === 'male') {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
      }
      break;
  }

  return Math.round(bmr);
};

/**
 * Calculate TDEE based on BMR and activity level
 * @param bmr - Basal Metabolic Rate in calories
 * @param activityLevel - Activity level (sedentary, light, moderate, active, very-active)
 * @returns TDEE in calories
 */
export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || ACTIVITY_MULTIPLIERS.moderate;
  return Math.round(bmr * multiplier);
};

/**
 * Calculate calorie needs based on TDEE and goal
 * @param tdee - Total Daily Energy Expenditure in calories
 * @param goal - Fitness goal (lose, maintain, gain)
 * @returns Target calories per day
 */
export const calculateCalorieNeeds = (tdee: number, goal: Goal): number => {
  const adjustment = GOAL_ADJUSTMENTS[goal] || GOAL_ADJUSTMENTS.maintain;
  return Math.round(tdee + adjustment);
};

/**
 * Get macro distribution suggestions based on goal
 * @param goal - Fitness goal (lose, maintain, gain)
 * @returns Object with protein, carbs, and fat percentages and description
 */
export const getMacroSuggestions = (goal: Goal) => {
  switch (goal) {
    case 'lose':
      return {
        protein: 40,
        carbs: 30, 
        fat: 30,
        description: 'Higher protein to preserve muscle while in a calorie deficit'
      };
    case 'gain':
      return {
        protein: 30,
        carbs: 45,
        fat: 25,
        description: 'Higher carbs to fuel muscle growth and training intensity'
      };
    case 'maintain':
    default:
      return {
        protein: 30,
        carbs: 40,
        fat: 30,
        description: 'Balanced macros for general health maintenance'
      };
  }
};

/**
 * Calculate macros based on total calories and distribution
 * @param totalCalories - Total daily calories
 * @param proteinPercentage - Percentage of calories from protein
 * @param carbsPercentage - Percentage of calories from carbohydrates
 * @param fatPercentage - Percentage of calories from fat
 * @returns Object with macros in grams and calories
 */
export const calculateMacros = (
  totalCalories: number,
  proteinPercentage: number,
  carbsPercentage: number,
  fatPercentage: number
): MacroBreakdown => {
  // Calculate calories from each macro
  const proteinCalories = totalCalories * (proteinPercentage / 100);
  const carbsCalories = totalCalories * (carbsPercentage / 100);
  const fatCalories = totalCalories * (fatPercentage / 100);
  
  // Convert calories to grams
  const proteinGrams = Math.round(proteinCalories / MACRO_CALORIES.protein);
  const carbsGrams = Math.round(carbsCalories / MACRO_CALORIES.carbs);
  const fatGrams = Math.round(fatCalories / MACRO_CALORIES.fat);
  
  return {
    protein: {
      grams: proteinGrams,
      calories: Math.round(proteinCalories),
      percentage: proteinPercentage
    },
    carbs: {
      grams: carbsGrams,
      calories: Math.round(carbsCalories),
      percentage: carbsPercentage
    },
    fat: {
      grams: fatGrams,
      calories: Math.round(fatCalories),
      percentage: fatPercentage
    }
  };
};

/**
 * Calculate activity calories burned for different activities
 * @param weight - Weight in kg
 * @param duration - Duration in minutes
 * @param activity - Type of activity
 * @returns Calories burned
 */
export const calculateActivityCalories = (
  weight: number, // in kg
  duration: number, // in minutes
  activity: string
): number => {
  // MET values (Metabolic Equivalent of Task)
  const metValues: Record<string, number> = {
    'walking': 3.5, // Walking at moderate pace
    'running': 8.0, // Running at moderate pace
    'cycling': 7.0, // Cycling at moderate pace
    'swimming': 6.0, // Swimming at moderate pace
    'weight-lifting': 4.0, // Resistance training
    'yoga': 3.0, // Yoga
    'hiit': 9.0, // High-intensity interval training
    'dancing': 5.0 // Dancing
  };
  
  const met = metValues[activity] || 4.0; // Default to moderate activity if not found
  
  // Calories = MET × weight (kg) × duration (hours)
  const caloriesBurned = met * weight * (duration / 60);
  
  return Math.round(caloriesBurned);
};

/**
 * Get description of BMR range compared to average
 * @param bmr - Calculated BMR value
 * @param gender - 'male' or 'female'
 * @param age - Age in years
 * @returns Object with description and status
 */
export const getBMRRangeDescription = (bmr: number, gender: string, age: number) => {
  // Average BMR ranges by gender and age group
  // These are approximate values and can vary based on different studies
  const averageRanges: Record<string, Record<string, { low: number; high: number }>> = {
    'male': {
      '18-29': { low: 1400, high: 1800 },
      '30-49': { low: 1300, high: 1700 },
      '50+': { low: 1200, high: 1600 }
    },
    'female': {
      '18-29': { low: 1200, high: 1500 },
      '30-49': { low: 1100, high: 1400 },
      '50+': { low: 1000, high: 1300 }
    }
  };
  
  // Determine age group
  let ageGroup = '18-29';
  if (age >= 50) {
    ageGroup = '50+';
  } else if (age >= 30) {
    ageGroup = '30-49';
  }
  
  // Get range for gender and age group
  const range = averageRanges[gender]?.[ageGroup] || { low: 1200, high: 1600 };
  
  // Determine status and description
  let status, description;
  
  if (bmr < range.low * 0.9) {
    status = 'low';
    description = 'Your BMR is significantly lower than average. This could be due to a smaller body size, lower muscle mass, or certain health conditions that affect metabolism.';
  } else if (bmr < range.low) {
    status = 'below-average';
    description = 'Your BMR is slightly below average. This is common for people with smaller frames or less muscle mass.';
  } else if (bmr > range.high * 1.1) {
    status = 'high';
    description = 'Your BMR is significantly higher than average. This is often associated with greater muscle mass, larger body size, or higher metabolic activity.';
  } else if (bmr > range.high) {
    status = 'above-average';
    description = 'Your BMR is slightly above average. This means you burn more calories at rest than most people of your gender and age.';
  } else {
    status = 'average';
    description = 'Your BMR falls within the average range for your gender and age group.';
  }
  
  return { status, description };
};

/**
 * Get nutrition tips based on goal
 * @param goal - Fitness goal (lose, maintain, gain)
 * @returns Array of tips
 */
export const getNutritionTips = (goal: Goal): Array<{ title: string; content: string }> => {
  const commonTips = [
    {
      title: 'Stay Hydrated',
      content: 'Drink at least 8 glasses of water daily. Proper hydration supports metabolism and can help control hunger.'
    },
    {
      title: 'Eat Whole Foods',
      content: 'Focus on minimally processed foods like vegetables, fruits, lean proteins, whole grains, and healthy fats.'
    },
    {
      title: 'Plan Your Meals',
      content: 'Meal planning helps ensure you meet your calorie and macro targets consistently.'
    }
  ];
  
  const goalSpecificTips: Record<Goal, Array<{ title: string; content: string }>> = {
    'lose': [
      {
        title: 'Protein Priority',
        content: 'Aim for 1.6-2.2g of protein per kg of bodyweight to preserve muscle mass while in a calorie deficit.'
      },
      {
        title: 'Volume Eating',
        content: 'Choose foods with high volume but lower calories like vegetables, salads, and broth-based soups to stay fuller longer.'
      },
      {
        title: 'Fiber Focus',
        content: 'Include plenty of fiber-rich foods to improve satiety and digestive health while cutting calories.'
      }
    ],
    'maintain': [
      {
        title: 'Balanced Meals',
        content: 'Aim for meals with a balance of protein, complex carbs, and healthy fats to maintain stable energy levels.'
      },
      {
        title: 'Mindful Eating',
        content: 'Pay attention to hunger and fullness cues to maintain your weight naturally.'
      },
      {
        title: 'Nutrient Density',
        content: 'Focus on getting maximum nutrition from your calories by choosing nutrient-dense foods.'
      }
    ],
    'gain': [
      {
        title: 'Calorie Density',
        content: 'Include calorie-dense foods like nuts, nut butters, avocados, and healthy oils to increase calorie intake without excessive volume.'
      },
      {
        title: 'Protein Distribution',
        content: 'Spread protein intake throughout the day with 20-40g per meal to maximize muscle protein synthesis.'
      },
      {
        title: 'Strategic Carbs',
        content: 'Time carbohydrate intake around workouts to fuel performance and support recovery and growth.'
      }
    ]
  };
  
  return [...commonTips, ...goalSpecificTips[goal]];
};

/**
 * Convert height from imperial to metric (inches to cm)
 */
export const imperialToMetricHeight = (feet: number, inches: number): number => {
  const totalInches = (feet * 12) + inches;
  return Math.round(totalInches * 2.54);
};

/**
 * Convert weight from imperial to metric (lbs to kg)
 */
export const imperialToMetricWeight = (pounds: number): number => {
  return Math.round(pounds / 2.20462);
};

/**
 * Convert height from metric to imperial (cm to feet and inches)
 */
export const metricToImperialHeight = (cm: number): { feet: number, inches: number } => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
};

/**
 * Convert weight from metric to imperial (kg to lbs)
 */
export const metricToImperialWeight = (kg: number): number => {
  return Math.round(kg * 2.20462);
};

/**
 * Get daily calorie needs for different activities
 */
export const getActivityCalories = (weight: number, unit: string = 'metric'): Record<string, number> => {
  // Convert weight to kg if in imperial
  const weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
  
  return {
    walking: Math.round(3.8 * weightInKg * 0.5), // Light walking for 30 min
    jogging: Math.round(7.0 * weightInKg * 0.5), // Jogging for 30 min
    cycling: Math.round(6.2 * weightInKg * 0.5), // Moderate cycling for 30 min
    swimming: Math.round(6.0 * weightInKg * 0.5), // Swimming for 30 min
    weightLifting: Math.round(3.5 * weightInKg * 0.5), // Weight lifting for 30 min
    yoga: Math.round(3.0 * weightInKg * 0.5), // Yoga for 30 min
    hiit: Math.round(10.0 * weightInKg * 0.25), // HIIT for 15 min
    dancing: Math.round(4.5 * weightInKg * 0.5), // Dancing for 30 min
    hiking: Math.round(5.3 * weightInKg * 0.5), // Hiking for 30 min
    tennis: Math.round(7.0 * weightInKg * 0.5) // Tennis for 30 min
  };
}; 