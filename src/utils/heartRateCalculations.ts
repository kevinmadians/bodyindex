export interface HeartRateZones {
  zone1: { min: number; max: number; name: string; description: string; color: string };
  zone2: { min: number; max: number; name: string; description: string; color: string };
  zone3: { min: number; max: number; name: string; description: string; color: string };
  zone4: { min: number; max: number; name: string; description: string; color: string };
  zone5: { min: number; max: number; name: string; description: string; color: string };
}

export interface HeartRateResults {
  maxHeartRate: number;
  restingHeartRate: number;
  heartRateReserve: number;
  zones: HeartRateZones;
  recoveryHeartRate: number;
  targetHeartRate: number;
  vo2MaxEstimate: number;
}

export const calculateHeartRateZones = (
  age: number,
  restingHeartRate: number,
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
): HeartRateResults => {
  // Input validation
  if (age <= 0 || age > 120) {
    age = 30; // Default to a reasonable age
  }

  if (restingHeartRate <= 30 || restingHeartRate > 120) {
    restingHeartRate = 70; // Default to a reasonable resting heart rate
  }

  // Calculate maximum heart rate using Tanaka formula (more accurate than 220-age)
  const maxHeartRate = Math.max(Math.round(208 - (0.7 * age)), restingHeartRate + 1);
  
  // Calculate Heart Rate Reserve (HRR)
  const heartRateReserve = Math.max(maxHeartRate - restingHeartRate, 1); // Ensure at least 1
  
  // Calculate zones based on HRR
  const zones: HeartRateZones = {
    zone1: {
      min: Math.round(restingHeartRate + (heartRateReserve * 0.5)),
      max: Math.round(restingHeartRate + (heartRateReserve * 0.6)),
      name: 'Very Light',
      description: 'Warm-up, recovery, and fat burning',
      color: '#4ade80' // green
    },
    zone2: {
      min: Math.round(restingHeartRate + (heartRateReserve * 0.6)),
      max: Math.round(restingHeartRate + (heartRateReserve * 0.7)),
      name: 'Light',
      description: 'Endurance training and aerobic fitness',
      color: '#60a5fa' // blue
    },
    zone3: {
      min: Math.round(restingHeartRate + (heartRateReserve * 0.7)),
      max: Math.round(restingHeartRate + (heartRateReserve * 0.8)),
      name: 'Moderate',
      description: 'Aerobic capacity and stamina',
      color: '#fbbf24' // yellow
    },
    zone4: {
      min: Math.round(restingHeartRate + (heartRateReserve * 0.8)),
      max: Math.round(restingHeartRate + (heartRateReserve * 0.9)),
      name: 'Hard',
      description: 'Anaerobic threshold and performance',
      color: '#f87171' // red
    },
    zone5: {
      min: Math.round(restingHeartRate + (heartRateReserve * 0.9)),
      max: maxHeartRate,
      name: 'Maximum',
      description: 'Maximum effort and sprint training',
      color: '#dc2626' // dark red
    }
  };

  // Calculate recovery heart rate (1-minute recovery)
  const recoveryHeartRate = Math.round(restingHeartRate + (heartRateReserve * 0.3));

  // Calculate target heart rate based on fitness level
  let targetHeartRate;
  switch (fitnessLevel) {
    case 'beginner':
      targetHeartRate = Math.round(restingHeartRate + (heartRateReserve * 0.6));
      break;
    case 'intermediate':
      targetHeartRate = Math.round(restingHeartRate + (heartRateReserve * 0.7));
      break;
    case 'advanced':
      targetHeartRate = Math.round(restingHeartRate + (heartRateReserve * 0.8));
      break;
    default:
      targetHeartRate = Math.round(restingHeartRate + (heartRateReserve * 0.7));
  }

  // Estimate VO2 Max using the Uth-Sørensen-Overgaard-Pedersen estimation
  // Handle division by zero or very small values
  const vo2MaxEstimate = restingHeartRate > 0 
    ? Math.round(15.3 * (maxHeartRate / restingHeartRate))
    : 40; // Default to average value if calculation fails

  return {
    maxHeartRate,
    restingHeartRate,
    heartRateReserve,
    zones,
    recoveryHeartRate,
    targetHeartRate,
    vo2MaxEstimate
  };
};

export const getZoneColor = (zone: keyof HeartRateZones): string => {
  const colors: Record<keyof HeartRateZones, string> = {
    zone1: '#4ade80', // green
    zone2: '#60a5fa', // blue
    zone3: '#fbbf24', // yellow
    zone4: '#f87171', // red
    zone5: '#dc2626'  // dark red
  };
  return colors[zone];
};

export const getZoneDescription = (zone: keyof HeartRateZones): string => {
  const descriptions: Record<keyof HeartRateZones, string> = {
    zone1: 'Warm-up, recovery, and fat burning zone. Perfect for beginners and active recovery.',
    zone2: 'Endurance training zone. Improves aerobic capacity and fat burning.',
    zone3: 'Aerobic capacity zone. Enhances cardiovascular fitness and endurance.',
    zone4: 'Anaerobic threshold zone. Improves speed and performance.',
    zone5: 'Maximum effort zone. For short bursts of high-intensity training.'
  };
  return descriptions[zone];
};

export const getTrainingRecommendations = (
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced',
  goals: string[]
): string[] => {
  const recommendations: string[] = [];
  
  if (goals.includes('weight_loss')) {
    recommendations.push(
      'Focus on Zone 2 training (60-70% of max HR) for optimal fat burning',
      'Include 2-3 sessions of Zone 3 training per week to boost metabolism',
      'Add 1-2 high-intensity interval training (HIIT) sessions in Zone 4-5'
    );
  }
  
  if (goals.includes('endurance')) {
    recommendations.push(
      'Spend 70-80% of training time in Zone 2 for base endurance',
      'Include 1-2 long sessions in Zone 3 per week',
      'Add tempo runs in Zone 4 once a week'
    );
  }
  
  if (goals.includes('performance')) {
    recommendations.push(
      'Focus on Zone 4-5 training for speed and power',
      'Include interval training with specific work:rest ratios',
      'Maintain 1-2 long endurance sessions in Zone 2-3'
    );
  }
  
  if (goals.includes('recovery')) {
    recommendations.push(
      'Prioritize Zone 1 training (50-60% of max HR) for active recovery days',
      'Keep heart rate low during recovery sessions to promote healing',
      'Consider alternating hard training days with Zone 1 recovery days'
    );
  }
  
  if (goals.includes('health')) {
    recommendations.push(
      'Aim for a balanced approach across all heart rate zones',
      'Spend most training time in Zone 2 for cardiovascular health',
      'Include at least 150 minutes of moderate activity per week per health guidelines'
    );
  }
  
  // Add fitness level specific recommendations
  switch (fitnessLevel) {
    case 'beginner':
      recommendations.push(
        'Start with 2-3 sessions per week',
        'Keep intensity in Zone 1-2 for the first month',
        'Gradually increase duration before intensity'
      );
      break;
    case 'intermediate':
      recommendations.push(
        'Train 3-5 times per week',
        'Mix different zones in your training',
        'Include one long session and one interval session weekly'
      );
      break;
    case 'advanced':
      recommendations.push(
        'Train 5-6 times per week',
        'Focus on specific zones based on training phase',
        'Include periodization in your training plan'
      );
      break;
  }
  
  return recommendations;
}; 