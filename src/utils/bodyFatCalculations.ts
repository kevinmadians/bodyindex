
// Navy Method Formula
export const calculateBodyFat = (gender: string, waist: number, neck: number, height: number, hip?: number) => {
  if (gender === 'male') {
    // US Navy formula for men
    return Math.max(0, 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450);
  } else {
    // US Navy formula for women (requires hip measurement)
    if (hip === undefined) return 0;
    return Math.max(0, 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450);
  }
};

// Get category based on body fat percentage and gender
export const getCategory = (bodyFat: number, gender: string): string => {
  if (gender === 'male') {
    if (bodyFat < 6) return 'Essential Fat';
    if (bodyFat < 14) return 'Athletic';
    if (bodyFat < 18) return 'Fitness';
    if (bodyFat < 25) return 'Average';
    return 'Obese';
  } else {
    if (bodyFat < 14) return 'Essential Fat';
    if (bodyFat < 21) return 'Athletic';
    if (bodyFat < 25) return 'Fitness';
    if (bodyFat < 32) return 'Average';
    return 'Obese';
  }
};

// Get category color
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Essential Fat': return '#2196F3';
    case 'Athletic': return '#4CAF50';
    case 'Fitness': return '#00BCD4';
    case 'Average': return '#FFEB3B';
    case 'Obese': return '#F44336';
    default: return '#00BCD4';
  }
};
