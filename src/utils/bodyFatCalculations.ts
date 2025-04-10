// Navy Method Formula
export const calculateBodyFat = (
  gender: string, 
  waist: number, 
  neck: number, 
  height: number, 
  hip?: number, 
  weight?: number, 
  age?: number,
  method: string = 'navy'
) => {
  console.log('Debug - Calculating', method, 'with values:', { gender, waist, neck, height, hip, weight, age });
  
  if (method === 'navy') {
    // Validate inputs for Navy method
    if (waist <= 0 || neck <= 0 || height <= 0) {
      console.error('Navy method requires valid waist, neck, and height measurements');
      return 0;
    }
    
    if (gender === 'female' && (hip === undefined || hip <= 0)) {
      console.error('Navy method for women requires valid hip measurement');
      return 0;
    }
    
    if (gender === 'male') {
      // US Navy formula for men
      const logValue = Math.log10(waist - neck);
      const logHeight = Math.log10(height);
      
      console.log('Debug - Navy male calculation:', { logValue, logHeight });
      
      if (isNaN(logValue) || isNaN(logHeight)) {
        console.error('Invalid logarithm values in calculation');
        return 0;
      }
      
      return Math.max(0, 495 / (1.0324 - 0.19077 * logValue + 0.15456 * logHeight) - 450);
    } else {
      // US Navy formula for women (requires hip measurement)
      if (hip === undefined) {
        console.error('Hip measurement is required for women');
        return 0;
      }
      
      const logValue = Math.log10(waist + hip - neck);
      const logHeight = Math.log10(height);
      
      console.log('Debug - Navy female calculation:', { logValue, logHeight });
      
      if (isNaN(logValue) || isNaN(logHeight)) {
        console.error('Invalid logarithm values in calculation');
        return 0;
      }
      
      return Math.max(0, 495 / (1.29579 - 0.35004 * logValue + 0.22100 * logHeight) - 450);
    }
  } else if (method === 'bmi') {
    // BMI-based body fat estimation (requires weight)
    if (weight === undefined || age === undefined) {
      console.error('BMI method requires valid weight and age');
      return 0;
    }
    
    const bmi = (weight / ((height / 100) * (height / 100)));
    
    console.log('Debug - BMI calculation:', { bmi });
    
    if (gender === 'male') {
      // For men: (1.20 × BMI) + (0.23 × Age) - 16.2
      return Math.max(0, (1.20 * bmi) + (0.23 * age) - 16.2);
    } else {
      // For women: (1.20 × BMI) + (0.23 × Age) - 5.4
      return Math.max(0, (1.20 * bmi) + (0.23 * age) - 5.4);
    }
  }
  
  return 0;
};

// Get category based on body fat percentage and gender
export const getCategory = (bodyFat: number, gender: string): string => {
  if (gender === 'male') {
    if (bodyFat < 6) return 'Essential Fat';
    if (bodyFat < 14) return 'Athletic';
    if (bodyFat < 18) return 'Fitness';
    if (bodyFat < 25) return 'Average';
    if (bodyFat < 32) return 'Overweight';
    return 'Obese';
  } else {
    if (bodyFat < 14) return 'Essential Fat';
    if (bodyFat < 21) return 'Athletic';
    if (bodyFat < 25) return 'Fitness';
    if (bodyFat < 32) return 'Average';
    if (bodyFat < 38) return 'Overweight';
    return 'Obese';
  }
};

// Get category color
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Essential Fat': return '#2196F3';
    case 'Athletic': return '#4CAF50';
    case 'Fitness': return '#00BCD4';
    case 'Average': return '#F6C70B';
    case 'Overweight': return '#FF9800';
    case 'Obese': return '#F44336';
    default: return '#00BCD4';
  }
};

// Get health implications for each category
export const getHealthInfo = (category: string, gender: string): string => {
  switch (category) {
    case 'Essential Fat':
      return `This is the minimum amount of fat needed for basic physical and physiological health. ${gender === 'male' ? 'Men' : 'Women'} should not aim to have body fat percentages lower than this, as it can lead to health issues.`;
    case 'Athletic':
      return `This range is typical for athletes and those with very active lifestyles. It's characterized by visible muscle definition and minimal fat storage.`;
    case 'Fitness':
      return `This is a healthy and sustainable range associated with good fitness. Most active individuals maintain body fat in this range.`;
    case 'Average':
      return `This is considered normal for the general population. While not optimal for athletic performance, it's generally not associated with increased health risks.`;
    case 'Overweight':
      return `This range indicates excess fat that may begin to pose health risks. Consider lifestyle changes to reduce body fat percentage.`;
    case 'Obese':
      return `This range is associated with increased risk of health problems including heart disease, type 2 diabetes, and certain cancers. Medical guidance is recommended.`;
    default:
      return 'Body fat is essential for health. The ideal range varies by gender, age, and fitness goals.';
  }
};

// Get ideal body fat range based on gender and age
export const getIdealRange = (gender: string, age: number): { min: number, max: number } => {
  if (gender === 'male') {
    if (age < 20) return { min: 8, max: 19 };
    if (age < 30) return { min: 8, max: 20 };
    if (age < 40) return { min: 11, max: 21 };
    if (age < 50) return { min: 13, max: 23 };
    if (age < 60) return { min: 15, max: 24 };
    return { min: 15, max: 26 };
  } else {
    if (age < 20) return { min: 17, max: 26 };
    if (age < 30) return { min: 18, max: 27 };
    if (age < 40) return { min: 19, max: 28 };
    if (age < 50) return { min: 20, max: 30 };
    if (age < 60) return { min: 21, max: 31 };
    return { min: 22, max: 33 };
  }
};
