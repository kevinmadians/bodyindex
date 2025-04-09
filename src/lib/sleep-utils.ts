// Sleep cycle durations
export const SLEEP_CYCLE_MINUTES = 90; // Average sleep cycle is 90 minutes
export const FALL_ASLEEP_MINUTES = 14; // Average time to fall asleep

// Sleep recommendation ranges by age group (hours)
export const SLEEP_RECOMMENDATIONS = [
  { age: 'Newborn (0-3 months)', min: 14, max: 17, ideal: 16 },
  { age: 'Infant (4-11 months)', min: 12, max: 15, ideal: 14 },
  { age: 'Toddler (1-2 years)', min: 11, max: 14, ideal: 13 },
  { age: 'Preschool (3-5 years)', min: 10, max: 13, ideal: 12 },
  { age: 'School-age (6-13 years)', min: 9, max: 11, ideal: 10 },
  { age: 'Teen (14-17 years)', min: 8, max: 10, ideal: 9 },
  { age: 'Young Adult (18-25 years)', min: 7, max: 9, ideal: 8 },
  { age: 'Adult (26-64 years)', min: 7, max: 9, ideal: 8 },
  { age: 'Older Adult (65+ years)', min: 7, max: 8, ideal: 7.5 },
];

// Sleep stages
export const SLEEP_STAGES = [
  { 
    name: 'NREM 1 (Light Sleep)', 
    percentage: 5, 
    description: 'Transition from wakefulness to sleep. Muscle activity slows down, and you may experience sudden muscle contractions.' 
  },
  { 
    name: 'NREM 2 (Light Sleep)', 
    percentage: 45, 
    description: 'Body temperature drops, heart rate slows, and brain waves become slower with occasional bursts of rapid waves.'
  },
  { 
    name: 'NREM 3 (Deep Sleep)', 
    percentage: 25, 
    description: 'Most restorative sleep stage. Essential for physical recovery, immune function, and memory consolidation.'
  },
  { 
    name: 'REM (Dream Sleep)', 
    percentage: 25, 
    description: 'Brain activity increases, eyes move rapidly, dreams occur. Essential for cognitive function and emotional processing.'
  },
];

// Sleep quality factors
export const SLEEP_QUALITY_FACTORS = [
  {
    factor: 'Consistency',
    importance: 'High',
    tips: 'Go to bed and wake up at the same time every day, even on weekends.'
  },
  {
    factor: 'Environment',
    importance: 'High',
    tips: 'Keep your bedroom cool (65-68°F/18-20°C), dark, and quiet.'
  },
  {
    factor: 'Screen Time',
    importance: 'High',
    tips: 'Avoid screens 1-2 hours before bedtime due to blue light interference with melatonin.'
  },
  {
    factor: 'Caffeine & Alcohol',
    importance: 'Medium',
    tips: 'Avoid caffeine 6+ hours and alcohol 3+ hours before bedtime.'
  },
  {
    factor: 'Physical Activity',
    importance: 'Medium',
    tips: 'Regular exercise improves sleep quality, but avoid vigorous activity 1-2 hours before bed.'
  },
  {
    factor: 'Stress Management',
    importance: 'Medium',
    tips: 'Try relaxation techniques like deep breathing, meditation, or gentle stretching before bed.'
  },
  {
    factor: 'Diet',
    importance: 'Low',
    tips: 'Avoid heavy, spicy, or large meals within 3 hours of bedtime.'
  },
];

// Functions for calculating optimal sleep times

/**
 * Calculate the time the person should go to bed based on desired wake-up time
 * Accounts for number of sleep cycles and time to fall asleep
 */
export function calculateBedTime(wakeTime: Date, desiredCycles: number = 5): Date[] {
  // Calculate ideal bedtimes for 4, 5, and 6 sleep cycles
  const bedTimes: Date[] = [];
  
  for (let cycles = 4; cycles <= 6; cycles++) {
    const minutesNeeded = (cycles * SLEEP_CYCLE_MINUTES) + FALL_ASLEEP_MINUTES;
    const bedTime = new Date(wakeTime.getTime() - (minutesNeeded * 60 * 1000));
    bedTimes.push(bedTime);
  }
  
  return bedTimes;
}

/**
 * Calculate the time the person should wake up based on bedtime
 * Accounts for number of sleep cycles and time to fall asleep
 */
export function calculateWakeTime(bedTime: Date, desiredCycles: number = 5): Date[] {
  // Calculate ideal wake times for 4, 5, and 6 sleep cycles
  const wakeTimes: Date[] = [];
  
  for (let cycles = 4; cycles <= 6; cycles++) {
    const minutesNeeded = (cycles * SLEEP_CYCLE_MINUTES) + FALL_ASLEEP_MINUTES;
    const wakeTime = new Date(bedTime.getTime() + (minutesNeeded * 60 * 1000));
    wakeTimes.push(wakeTime);
  }
  
  return wakeTimes;
}

/**
 * Get sleep recommendation by age group
 */
export function getSleepRecommendationByAge(ageGroup: string) {
  return SLEEP_RECOMMENDATIONS.find(group => group.age === ageGroup) || SLEEP_RECOMMENDATIONS[7]; // Default to adult
}

/**
 * Calculate sleep quality score based on various factors
 */
export interface SleepQualityInput {
  duration: number;         // Hours slept
  consistency: number;      // 1-10 scale (how consistent is sleep schedule)
  wakeups: number;          // Number of times woken up during the night
  environment: number;      // 1-10 scale (how good is sleep environment)
  feeling: number;          // 1-10 scale (how rested do you feel)
  ageGroup: string;         // Age group for recommended duration
}

export function calculateSleepQuality(input: SleepQualityInput): {
  score: number;            // 0-100 scale
  durationScore: number;    // 0-25 scale
  consistencyScore: number; // 0-25 scale
  disruptionScore: number;  // 0-20 scale
  environmentScore: number; // 0-15 scale
  feelingScore: number;     // 0-15 scale
  feedback: string;
} {
  // Get recommended sleep duration for age group
  const recommendation = getSleepRecommendationByAge(input.ageGroup);
  
  // Duration score (0-25 points)
  let durationScore = 0;
  if (input.duration >= recommendation.min && input.duration <= recommendation.max) {
    // Full points if within recommended range
    durationScore = 25;
  } else if (input.duration < recommendation.min) {
    // Partial points if below recommended range (linear scale)
    const shortfall = recommendation.min - input.duration;
    durationScore = Math.max(0, 25 - (shortfall * 8));
  } else {
    // Partial points if above recommended range (less penalty)
    const excess = input.duration - recommendation.max;
    durationScore = Math.max(0, 25 - (excess * 5));
  }
  
  // Consistency score (0-25 points)
  const consistencyScore = (input.consistency / 10) * 25;
  
  // Disruption score (0-20 points)
  const disruptionScore = Math.max(0, 20 - (input.wakeups * 5));
  
  // Environment score (0-15 points)
  const environmentScore = (input.environment / 10) * 15;
  
  // Feeling score (0-15 points)
  const feelingScore = (input.feeling / 10) * 15;
  
  // Total score
  const score = Math.round(durationScore + consistencyScore + disruptionScore + environmentScore + feelingScore);
  
  // Feedback
  let feedback = '';
  if (score >= 90) {
    feedback = 'Excellent sleep quality! Your sleep habits are optimal.';
  } else if (score >= 75) {
    feedback = 'Good sleep quality. Minor improvements could optimize your rest.';
  } else if (score >= 60) {
    feedback = 'Moderate sleep quality. Consider addressing the lower scoring areas.';
  } else if (score >= 40) {
    feedback = 'Poor sleep quality. Your sleep habits need significant improvement.';
  } else {
    feedback = 'Very poor sleep quality. Consider consulting a sleep specialist.';
  }
  
  return {
    score,
    durationScore,
    consistencyScore,
    disruptionScore,
    environmentScore,
    feelingScore,
    feedback
  };
}

/**
 * Calculate sleep cycle progression for visualization
 */
export function calculateSleepCycles(bedTime: Date, wakeTime: Date): {
  stage: string;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
}[] {
  const cycles = [];
  const totalMinutes = (wakeTime.getTime() - bedTime.getTime()) / (60 * 1000);
  const numFullCycles = Math.floor((totalMinutes - FALL_ASLEEP_MINUTES) / SLEEP_CYCLE_MINUTES);
  
  // Add falling asleep period
  let currentTime = new Date(bedTime.getTime());
  cycles.push({
    stage: 'Falling Asleep',
    startTime: currentTime,
    endTime: new Date(currentTime.getTime() + (FALL_ASLEEP_MINUTES * 60 * 1000)),
    durationMinutes: FALL_ASLEEP_MINUTES
  });
  
  // Update current time
  currentTime = new Date(currentTime.getTime() + (FALL_ASLEEP_MINUTES * 60 * 1000));
  
  // Add each sleep cycle
  for (let i = 0; i < numFullCycles; i++) {
    // NREM 1 (5% of cycle)
    const nrem1Minutes = SLEEP_CYCLE_MINUTES * 0.05;
    const nrem1End = new Date(currentTime.getTime() + (nrem1Minutes * 60 * 1000));
    cycles.push({
      stage: 'NREM 1',
      startTime: currentTime,
      endTime: nrem1End,
      durationMinutes: nrem1Minutes
    });
    currentTime = nrem1End;
    
    // NREM 2 (45% of cycle)
    const nrem2Minutes = SLEEP_CYCLE_MINUTES * 0.45;
    const nrem2End = new Date(currentTime.getTime() + (nrem2Minutes * 60 * 1000));
    cycles.push({
      stage: 'NREM 2',
      startTime: currentTime,
      endTime: nrem2End,
      durationMinutes: nrem2Minutes
    });
    currentTime = nrem2End;
    
    // NREM 3 (Deep sleep, 25% of cycle)
    const nrem3Minutes = SLEEP_CYCLE_MINUTES * 0.25;
    const nrem3End = new Date(currentTime.getTime() + (nrem3Minutes * 60 * 1000));
    cycles.push({
      stage: 'NREM 3',
      startTime: currentTime,
      endTime: nrem3End,
      durationMinutes: nrem3Minutes
    });
    currentTime = nrem3End;
    
    // REM (25% of cycle)
    const remMinutes = SLEEP_CYCLE_MINUTES * 0.25;
    const remEnd = new Date(currentTime.getTime() + (remMinutes * 60 * 1000));
    cycles.push({
      stage: 'REM',
      startTime: currentTime,
      endTime: remEnd,
      durationMinutes: remMinutes
    });
    currentTime = remEnd;
  }
  
  // Add partial final cycle if there's remaining time
  const remainingMinutes = totalMinutes - FALL_ASLEEP_MINUTES - (numFullCycles * SLEEP_CYCLE_MINUTES);
  if (remainingMinutes > 0) {
    let minutesLeft = remainingMinutes;
    
    // NREM 1 (5% of cycle)
    const nrem1Minutes = Math.min(minutesLeft, SLEEP_CYCLE_MINUTES * 0.05);
    if (nrem1Minutes > 0) {
      const nrem1End = new Date(currentTime.getTime() + (nrem1Minutes * 60 * 1000));
      cycles.push({
        stage: 'NREM 1',
        startTime: currentTime,
        endTime: nrem1End,
        durationMinutes: nrem1Minutes
      });
      currentTime = nrem1End;
      minutesLeft -= nrem1Minutes;
    }
    
    // NREM 2 (45% of cycle)
    const nrem2Minutes = Math.min(minutesLeft, SLEEP_CYCLE_MINUTES * 0.45);
    if (nrem2Minutes > 0) {
      const nrem2End = new Date(currentTime.getTime() + (nrem2Minutes * 60 * 1000));
      cycles.push({
        stage: 'NREM 2',
        startTime: currentTime,
        endTime: nrem2End,
        durationMinutes: nrem2Minutes
      });
      currentTime = nrem2End;
      minutesLeft -= nrem2Minutes;
    }
    
    // NREM 3 (25% of cycle)
    const nrem3Minutes = Math.min(minutesLeft, SLEEP_CYCLE_MINUTES * 0.25);
    if (nrem3Minutes > 0) {
      const nrem3End = new Date(currentTime.getTime() + (nrem3Minutes * 60 * 1000));
      cycles.push({
        stage: 'NREM 3',
        startTime: currentTime,
        endTime: nrem3End,
        durationMinutes: nrem3Minutes
      });
      currentTime = nrem3End;
      minutesLeft -= nrem3Minutes;
    }
    
    // REM (25% of cycle)
    const remMinutes = Math.min(minutesLeft, SLEEP_CYCLE_MINUTES * 0.25);
    if (remMinutes > 0) {
      const remEnd = new Date(currentTime.getTime() + (remMinutes * 60 * 1000));
      cycles.push({
        stage: 'REM',
        startTime: currentTime,
        endTime: remEnd,
        durationMinutes: remMinutes
      });
    }
  }
  
  return cycles;
} 