export interface BPReading {
  id: string;
  systolic: number;
  diastolic: number;
  pulse?: number;
  date: Date | string;
  time?: string;
  notes?: string;
}

export type BPCategory = 
  | "Low Blood Pressure"
  | "Normal"
  | "Elevated"
  | "Hypertension Stage 1"
  | "Hypertension Stage 2"
  | "Hypertensive Crisis";

/**
 * Determines the blood pressure category based on systolic and diastolic values
 */
export function getBPCategory(systolic: number, diastolic: number): BPCategory {
  if (systolic < 90 || diastolic < 60) {
    return "Low Blood Pressure";
  } else if (systolic < 120 && diastolic < 80) {
    return "Normal";
  } else if (systolic < 130 && diastolic < 80) {
    return "Elevated";
  } else if (systolic < 140 || diastolic < 90) {
    return "Hypertension Stage 1";
  } else if (systolic < 180 || diastolic < 120) {
    return "Hypertension Stage 2";
  } else {
    return "Hypertensive Crisis";
  }
}

/**
 * Returns a color based on blood pressure category
 */
export function getBPCategoryColor(category: BPCategory): string {
  switch (category) {
    case "Low Blood Pressure":
      return "#3B82F6"; // blue
    case "Normal":
      return "#10B981"; // green
    case "Elevated":
      return "#FBBF24"; // yellow
    case "Hypertension Stage 1":
      return "#F97316"; // orange
    case "Hypertension Stage 2":
      return "#EF4444"; // red
    case "Hypertensive Crisis":
      return "#7F1D1D"; // dark red
    default:
      return "#6B7280"; // gray
  }
}

/**
 * Calculate Mean Arterial Pressure (MAP)
 * MAP = (SBP + 2 × DBP) ÷ 3
 */
export function calculateMAP(systolic: number, diastolic: number): number {
  return Math.round((systolic + 2 * diastolic) / 3);
}

/**
 * Calculate Pulse Pressure (PP)
 * PP = SBP - DBP
 */
export function calculatePP(systolic: number, diastolic: number): number {
  return systolic - diastolic;
}

/**
 * Alias for calculatePP for better readability
 */
export const calculatePulsePressure = calculatePP;

/**
 * Get MAP category with recommended range
 */
export function getMAPCategory(map: number): { status: string; color: string } {
  if (map < 70) {
    return { status: "Low", color: "#3B82F6" };
  } else if (map >= 70 && map <= 100) {
    return { status: "Normal", color: "#10B981" };
  } else if (map > 100 && map <= 110) {
    return { status: "Elevated", color: "#FBBF24" };
  } else {
    return { status: "High", color: "#EF4444" };
  }
}

/**
 * Get Pulse Pressure category with recommended range
 */
export function getPPCategory(pp: number): { status: string; color: string } {
  if (pp < 40) {
    return { status: "Low", color: "#3B82F6" };
  } else if (pp >= 40 && pp <= 60) {
    return { status: "Normal", color: "#10B981" };
  } else if (pp > 60 && pp <= 80) {
    return { status: "Elevated", color: "#FBBF24" };
  } else {
    return { status: "High", color: "#EF4444" };
  }
}

/**
 * Filter blood pressure readings by date range
 */
export function filterBPReadingsByDateRange(
  readings: BPReading[],
  startDate: Date | null,
  endDate: Date | null
): BPReading[] {
  if (!startDate && !endDate) return readings;

  return readings.filter((reading) => {
    const readingDate = new Date(reading.date);
    
    if (startDate && endDate) {
      return readingDate >= startDate && readingDate <= endDate;
    } else if (startDate) {
      return readingDate >= startDate;
    } else if (endDate) {
      return readingDate <= endDate;
    }
    
    return true;
  });
}

/**
 * Calculate average blood pressure from a collection of readings
 */
export function calculateAverageBP(readings: BPReading[]): { avgSystolic: number; avgDiastolic: number; avgPulse: number | null } {
  if (!readings.length) {
    return { avgSystolic: 0, avgDiastolic: 0, avgPulse: null };
  }

  const sum = readings.reduce(
    (acc, reading) => {
      acc.systolic += reading.systolic;
      acc.diastolic += reading.diastolic;
      if (reading.pulse) {
        acc.pulse += reading.pulse;
        acc.pulseCount += 1;
      }
      return acc;
    },
    { systolic: 0, diastolic: 0, pulse: 0, pulseCount: 0 }
  );

  const avgSystolic = Math.round(sum.systolic / readings.length);
  const avgDiastolic = Math.round(sum.diastolic / readings.length);
  const avgPulse = sum.pulseCount ? Math.round(sum.pulse / sum.pulseCount) : null;

  return { avgSystolic, avgDiastolic, avgPulse };
}

/**
 * Get health recommendations based on blood pressure category
 */
export function getBPRecommendations(category: BPCategory): string[] {
  switch (category) {
    case "Low Blood Pressure":
      return [
        "Stay hydrated throughout the day",
        "Include more salt in your diet (if approved by doctor)",
        "Avoid alcohol",
        "Stand up slowly from sitting or lying positions",
        "Eat smaller, more frequent meals",
        "Wear compression stockings (if recommended)",
        "Consult your doctor if symptoms persist"
      ];
    case "Normal":
      return [
        "Maintain a healthy diet with plenty of fruits and vegetables",
        "Exercise regularly (at least 150 minutes per week)",
        "Limit alcohol consumption",
        "Maintain a healthy weight",
        "Get regular sleep (7-8 hours per night)",
        "Continue monitoring your blood pressure"
      ];
    case "Elevated":
      return [
        "Reduce sodium intake (under 2,300mg daily)",
        "Exercise for 30 minutes most days of the week",
        "Maintain a healthy weight or lose weight if needed",
        "Limit alcohol consumption",
        "Reduce caffeine intake",
        "Manage stress through meditation or other relaxation techniques",
        "Monitor your blood pressure regularly"
      ];
    case "Hypertension Stage 1":
      return [
        "Follow the DASH diet (Dietary Approaches to Stop Hypertension)",
        "Reduce sodium to 1,500mg daily",
        "Exercise for at least 150 minutes per week",
        "Lose weight if overweight (even 5-10 pounds can help)",
        "Limit alcohol to 1 drink per day for women, 2 for men",
        "Quit smoking if applicable",
        "Reduce stress",
        "Take prescribed medications as directed",
        "Monitor your blood pressure regularly"
      ];
    case "Hypertension Stage 2":
      return [
        "Take all prescribed medications as directed",
        "Follow the DASH diet strictly",
        "Limit sodium intake to 1,500mg daily",
        "Exercise regularly as recommended by your doctor",
        "Lose weight if needed",
        "Avoid alcohol and smoking",
        "Practice stress management",
        "Monitor your blood pressure daily",
        "Keep all scheduled doctor appointments"
      ];
    case "Hypertensive Crisis":
      return [
        "Seek emergency medical attention immediately",
        "Do not delay treatment",
        "Take prescribed medications exactly as directed",
        "Follow up with your doctor as recommended",
        "Strictly adhere to all lifestyle and medication recommendations"
      ];
    default:
      return [
        "Maintain a healthy diet and exercise regularly",
        "Monitor your blood pressure",
        "Consult with a healthcare professional"
      ];
  }
}

// Function to get description based on blood pressure category
export const getBPDescription = (category: string): string => {
  switch (category) {
    case "Low Blood Pressure":
      return "Your blood pressure is below the typical range. If you're experiencing symptoms like dizziness, fatigue, or fainting, consult a healthcare provider.";
    case "Normal":
      return "Your blood pressure is in the healthy range. Continue maintaining a healthy lifestyle with regular exercise and a balanced diet.";
    case "Elevated":
      return "Your blood pressure is slightly above normal. Consider lifestyle changes to prevent progression to hypertension.";
    case "Hypertension Stage 1":
      return "Your blood pressure is moderately elevated. Lifestyle changes are recommended, and your doctor may consider medication based on your cardiovascular risk.";
    case "Hypertension Stage 2":
      return "Your blood pressure is significantly elevated. Lifestyle changes and medication are typically recommended. Follow up with your healthcare provider.";
    case "Hypertensive Crisis":
      return "Your blood pressure is severely elevated. This is a medical emergency - seek immediate medical attention if you're also experiencing symptoms like chest pain, shortness of breath, or neurological symptoms.";
    default:
      return "Invalid blood pressure reading.";
  }
};

// Function to get risk factors for high blood pressure
export const getHypertensionRiskFactors = (): { factor: string; description: string }[] => {
  return [
    {
      factor: "Age",
      description: "Risk increases with age due to natural stiffening of blood vessels."
    },
    {
      factor: "Family History",
      description: "High blood pressure tends to run in families."
    },
    {
      factor: "Race/Ethnicity",
      description: "High blood pressure is particularly common among people of African heritage."
    },
    {
      factor: "Obesity",
      description: "Excess weight requires more blood to supply oxygen and nutrients to tissues."
    },
    {
      factor: "Physical Inactivity",
      description: "Inactive people tend to have higher heart rates and higher blood pressure."
    },
    {
      factor: "Tobacco Use",
      description: "Smoking or chewing tobacco immediately raises blood pressure and damages vessel walls."
    },
    {
      factor: "Sodium Intake",
      description: "Too much sodium in your diet can cause your body to retain fluid, increasing blood pressure."
    },
    {
      factor: "Potassium Deficiency",
      description: "Potassium helps balance sodium in cells. Low potassium can contribute to high blood pressure."
    },
    {
      factor: "Stress",
      description: "High stress levels can temporarily increase blood pressure."
    },
    {
      factor: "Chronic Conditions",
      description: "Conditions like diabetes, kidney disease, and sleep apnea increase risk."
    },
    {
      factor: "Alcohol Consumption",
      description: "Regular, heavy use of alcohol can increase blood pressure dramatically."
    }
  ];
}; 