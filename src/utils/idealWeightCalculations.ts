import { Gender } from '@/types/health';

export type IdealWeightMethod = 'hamwi' | 'devine' | 'robinson' | 'miller' | 'bmi' | 'peterson';

export interface IdealWeightResult {
  hamwi: number;
  devine: number;
  robinson: number;
  miller: number;
  bmi: number;
  peterson: number;
  average: number;
  range: {
    min: number;
    max: number;
  };
}

export interface IdealWeightInfo {
  method: IdealWeightMethod;
  formula: string;
  description: string;
  accuracy: string;
  bestFor: string;
}

export const calculateIdealWeight = (
  height: number, // in cm
  gender: Gender,
  age: number,
  bodyFrame: 'small' | 'medium' | 'large' = 'medium'
): IdealWeightResult => {
  // Convert height to inches for formulas that use imperial units
  const heightInInches = height / 2.54;

  // Hamwi Formula (1964)
  const hamwi = gender === 'male'
    ? 48.0 + 2.7 * (heightInInches - 60)
    : 45.5 + 2.2 * (heightInInches - 60);

  // Devine Formula (1974)
  const devine = gender === 'male'
    ? 50.0 + 2.3 * (heightInInches - 60)
    : 45.5 + 2.3 * (heightInInches - 60);

  // Robinson Formula (1983)
  const robinson = gender === 'male'
    ? 52.0 + 1.9 * (heightInInches - 60)
    : 49.0 + 1.7 * (heightInInches - 60);

  // Miller Formula (1983)
  const miller = gender === 'male'
    ? 56.2 + 1.41 * (heightInInches - 60)
    : 53.1 + 1.36 * (heightInInches - 60);

  // BMI-based calculation (using BMI range 18.5-24.9)
  const heightInMeters = height / 100;
  const bmiMin = 18.5;
  const bmiMax = 24.9;
  const bmi = (bmiMin + bmiMax) / 2 * (heightInMeters * heightInMeters);

  // Peterson Formula (2016) - More accurate for modern populations
  const peterson = gender === 'male'
    ? 2.2 * bmi + 3.5 * bmi * (heightInMeters - 1.5)
    : 2.2 * bmi + 3.5 * bmi * (heightInMeters - 1.5) * 0.9;

  // Calculate average of all methods
  const average = (hamwi + devine + robinson + miller + bmi + peterson) / 6;

  // Adjust for body frame
  const frameAdjustment = bodyFrame === 'small' ? -0.9 : bodyFrame === 'large' ? 0.9 : 0;

  // Calculate range (±10% of average)
  const range = {
    min: average * 0.9 + frameAdjustment,
    max: average * 1.1 + frameAdjustment
  };

  return {
    hamwi,
    devine,
    robinson,
    miller,
    bmi,
    peterson,
    average: average + frameAdjustment,
    range
  };
};

export const getIdealWeightInfo = (): IdealWeightInfo[] => [
  {
    method: 'hamwi',
    formula: 'Male: 48.0 kg + 2.7 kg per inch over 5 feet\nFemale: 45.5 kg + 2.2 kg per inch over 5 feet',
    description: 'Developed in 1964, this formula was based on insurance data and is one of the most commonly used methods.',
    accuracy: 'Moderate',
    bestFor: 'General population, quick estimates'
  },
  {
    method: 'devine',
    formula: 'Male: 50.0 kg + 2.3 kg per inch over 5 feet\nFemale: 45.5 kg + 2.3 kg per inch over 5 feet',
    description: 'Created in 1974 for medical dosage calculations, this formula is widely used in clinical settings.',
    accuracy: 'Moderate',
    bestFor: 'Clinical applications, medication dosing'
  },
  {
    method: 'robinson',
    formula: 'Male: 52.0 kg + 1.9 kg per inch over 5 feet\nFemale: 49.0 kg + 1.7 kg per inch over 5 feet',
    description: 'Developed in 1983, this formula tends to produce slightly higher weight estimates than other methods.',
    accuracy: 'Good',
    bestFor: 'Athletic individuals'
  },
  {
    method: 'miller',
    formula: 'Male: 56.2 kg + 1.41 kg per inch over 5 feet\nFemale: 53.1 kg + 1.36 kg per inch over 5 feet',
    description: 'Created in 1983, this formula generally produces higher weight estimates than other methods.',
    accuracy: 'Good',
    bestFor: 'Individuals with higher muscle mass'
  },
  {
    method: 'bmi',
    formula: 'Weight (kg) = BMI × (Height in meters)²\nUsing BMI range 18.5-24.9',
    description: 'Based on Body Mass Index calculations, this method provides a range rather than a single value.',
    accuracy: 'Good',
    bestFor: 'General health assessment'
  },
  {
    method: 'peterson',
    formula: 'Complex formula based on height and gender',
    description: 'Developed in 2016, this is one of the most recent and accurate formulas, accounting for modern body compositions.',
    accuracy: 'Very Good',
    bestFor: 'Modern populations, all body types'
  }
];

export const getFrameSize = (
  wristCircumference: number, // in cm
  gender: Gender,
  height: number // in cm
): 'small' | 'medium' | 'large' => {
  const heightInInches = height / 2.54;
  const wristInInches = wristCircumference / 2.54;

  if (gender === 'male') {
    if (heightInInches > 65) { // 5'5" = 65 inches
      if (wristInInches < 6.25) return 'small';
      if (wristInInches > 6.75) return 'large';
      return 'medium';
    } else {
      if (wristInInches < 6.25) return 'small';
      if (wristInInches > 6.5) return 'large';
      return 'medium';
    }
  } else {
    if (heightInInches > 65) { // 5'5" = 65 inches
      if (wristInInches < 5.75) return 'small';
      if (wristInInches > 6.25) return 'large';
      return 'medium';
    } else {
      if (wristInInches < 5.5) return 'small';
      if (wristInInches > 6) return 'large';
      return 'medium';
    }
  }
}; 