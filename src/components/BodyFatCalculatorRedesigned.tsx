import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import CalculatorForm from './body-fat-calculator/CalculatorForm';
import ResultsDisplay from '@/components/body-fat-calculator/ResultsDisplay';
import { calculateBodyFat, getCategory, getCategoryColor, getHealthInfo, getIdealRange } from '@/utils/bodyFatCalculations';
import { toast } from '@/components/ui/use-toast';
import AnimatedResults from './common/AnimatedResults';

// Define safe default values within the recommended ranges
const DEFAULT_VALUES = {
  metric: {
    age: 27,
    height: 170, // cm (100-250 cm range)
    weight: 70, // kg (30-250 kg range)
    neck: 35, // cm (20-60 cm range)
    waist: 80, // cm (50-200 cm range)
    hip: 95, // cm (50-200 cm range)
    triceps: 10, // mm (2-100 mm range)
    subscapular: 12, // mm (2-100 mm range)
    suprailiac: 15, // mm (2-100 mm range)
    thigh: 18, // mm (2-100 mm range)
  },
  imperial: {
    age: 27,
    height: 67, // inches (39-98 inches range)
    weight: 154, // lbs (66-550 lbs range)
    neck: 14, // inches (8-24 inches range)
    waist: 31, // inches (20-80 inches range)
    hip: 37, // inches (20-80 inches range)
    triceps: 0.4, // inches
    subscapular: 0.5, // inches
    suprailiac: 0.6, // inches
    thigh: 0.7, // inches
  }
};

const BodyFatCalculatorRedesigned = () => {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // State to track if the component has been initialized
  const [isInitialized, setIsInitialized] = useState(false);
  const [measurementUnit, setMeasurementUnit] = useState('metric');
  
  // Initialize state with safe default values
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(DEFAULT_VALUES.metric.age);
  const [height, setHeight] = useState(DEFAULT_VALUES.metric.height);
  const [weight, setWeight] = useState(DEFAULT_VALUES.metric.weight);
  const [neck, setNeck] = useState(DEFAULT_VALUES.metric.neck);
  const [waist, setWaist] = useState(DEFAULT_VALUES.metric.waist);
  const [hip, setHip] = useState(DEFAULT_VALUES.metric.hip);
  const [measurementMethod, setMeasurementMethod] = useState('navy');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);
  const [bodyFatCategory, setBodyFatCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('#00BCD4');
  const [showResults, setShowResults] = useState(false);
  const [healthInfo, setHealthInfo] = useState<string>('');
  const [idealRange, setIdealRange] = useState<{min: number, max: number}>({min: 8, max: 20});
  const [triceps, setTriceps] = useState(DEFAULT_VALUES.metric.triceps);
  const [subscapular, setSubscapular] = useState(DEFAULT_VALUES.metric.subscapular);
  const [suprailiac, setSuprailiac] = useState(DEFAULT_VALUES.metric.suprailiac);
  const [thigh, setThigh] = useState(DEFAULT_VALUES.metric.thigh);

  // Initialize default values on mount - this runs once when component loads
  useEffect(() => {
    // Force safe default values on component mount
    resetToDefaults(measurementUnit);
    setIsInitialized(true);
  }, []);

  // Function to reset all values to defaults based on current unit
  const resetToDefaults = (unit: string) => {
    const defaults = DEFAULT_VALUES[unit as 'metric' | 'imperial'];
    setAge(defaults.age);
    setHeight(defaults.height);
    setWeight(defaults.weight);
    setNeck(defaults.neck);
    setWaist(defaults.waist);
    setHip(defaults.hip);
    setTriceps(defaults.triceps);
    setSubscapular(defaults.subscapular);
    setSuprailiac(defaults.suprailiac);
    setThigh(defaults.thigh);
  };

  // Handle unit changes with safe conversion
  useEffect(() => {
    // Skip on first render
    if (!isInitialized) return;

    // Reset to defaults for the selected unit instead of trying to convert
    // This prevents any abnormal values from persisting through unit changes
    resetToDefaults(measurementUnit);
    
  }, [measurementUnit, isInitialized]);

  // Reset relevant measurements when method changes
  useEffect(() => {
    // Skip on first render
    if (!isInitialized) return;
    
    const defaults = DEFAULT_VALUES[measurementUnit as 'metric' | 'imperial'];
    
    // Reset only the relevant measurements for the selected method
    if (measurementMethod === 'navy') {
      setNeck(defaults.neck);
      setWaist(defaults.waist);
      setHip(defaults.hip);
    } else if (measurementMethod === 'skinfold') {
      setTriceps(defaults.triceps);
      setSubscapular(defaults.subscapular);
      setSuprailiac(defaults.suprailiac);
      setThigh(defaults.thigh);
    }
  }, [measurementMethod, measurementUnit, isInitialized]);

  // Calculate body fat when button is clicked
  const calculateResults = () => {
    try {
      // Get the safe defaults for current unit
      const defaults = DEFAULT_VALUES[measurementUnit as 'metric' | 'imperial'];
      
      // Use the actual input values without overriding them with defaults
      const heightInCm = measurementUnit === 'imperial' ? height * 2.54 : height;
      const weightInKg = measurementUnit === 'imperial' ? weight * 0.453592 : weight;
      const waistInCm = measurementUnit === 'imperial' ? waist * 2.54 : waist;
      const neckInCm = measurementUnit === 'imperial' ? neck * 2.54 : neck;
      const hipInCm = gender === 'female' && measurementUnit === 'imperial' ? hip * 2.54 : hip;
      
      // Convert skinfold measurements if needed
      const tricepsInMm = measurementUnit === 'imperial' ? triceps * 25.4 : triceps;
      const subscapularInMm = measurementUnit === 'imperial' ? subscapular * 25.4 : subscapular;
      const suprailiacInMm = measurementUnit === 'imperial' ? suprailiac * 25.4 : suprailiac;
      const thighInMm = measurementUnit === 'imperial' ? thigh * 25.4 : thigh;

      console.log('Debug - Measurement values:', {
        method: measurementMethod,
        gender,
        height: heightInCm,
        weight: weightInKg,
        neck: neckInCm,
        waist: waistInCm,
        hip: hipInCm,
        triceps: tricepsInMm,
        subscapular: subscapularInMm,
        suprailiac: suprailiacInMm,
        thigh: thighInMm
      });

      // Validation based on measurement method
      if (measurementMethod === 'navy') {
        if (waistInCm <= 0 || neckInCm <= 0 || heightInCm <= 0) {
          throw new Error("Please enter valid measurements for waist, neck, and height");
        }
        if (gender === 'female' && hipInCm <= 0) {
          throw new Error("Please enter a valid hip measurement");
        }
        
        // Additional validation to ensure values are reasonable
        if (heightInCm < 100 || heightInCm > 250) {
          throw new Error("Height should be between 100-250 cm for accurate results");
        }
        if (neckInCm < 20 || neckInCm > 60) {
          throw new Error("Neck circumference should be between 20-60 cm");
        }
        if (waistInCm < 50 || waistInCm > 200) {
          throw new Error("Waist circumference should be between 50-200 cm");
        }
        if (gender === 'female' && (hipInCm < 50 || hipInCm > 200)) {
          throw new Error("Hip circumference should be between 50-200 cm");
        }
        
        // Check for invalid logarithm conditions 
        if (gender === 'male' && waistInCm <= neckInCm) {
          throw new Error("Waist circumference must be greater than neck circumference");
        }
        if (gender === 'female' && (waistInCm + hipInCm) <= neckInCm) {
          throw new Error("Sum of waist and hip must be greater than neck circumference");
        }
      } else if (measurementMethod === 'bmi') {
        if (weightInKg <= 0 || heightInCm <= 0 || age <= 0) {
          throw new Error("Please enter valid measurements for weight, height, and age");
        }
        if (heightInCm < 100 || heightInCm > 250) {
          throw new Error("Height should be between 100-250 cm for accurate results");
        }
        if (weightInKg < 30 || weightInKg > 250) {
          throw new Error("Weight should be between 30-250 kg for accurate results");
        }
      } else if (measurementMethod === 'skinfold') {
        if (tricepsInMm <= 0 || subscapularInMm <= 0 || suprailiacInMm <= 0) {
          throw new Error("Please enter valid skinfold measurements");
        }
        if (gender === 'female' && thighInMm <= 0) {
          throw new Error("Please enter a valid thigh skinfold measurement");
        }
        if (heightInCm < 100 || heightInCm > 250) {
          throw new Error("Height should be between 100-250 cm for accurate results");
        }
      }

      // Calculate body fat percentage based on selected method
      let bodyFat = 0;
      
      if (measurementMethod === 'skinfold') {
        // Skinfold calculation using Jackson-Pollock method
        if (gender === 'male') {
          // For men - using 3-site formula (chest, abdomen, thigh)
          const sum = tricepsInMm + subscapularInMm + suprailiacInMm;
          
          // Check for valid sum value
          if (sum <= 0) {
            throw new Error("Invalid skinfold measurements. Please check your values.");
          }
          
          // Jackson-Pollock formula for men
          const bodyDensity = 1.10938 - (0.0008267 * sum) + 
                              (0.0000016 * sum * sum) - 
                              (0.0002574 * age);
                              
          // Safeguard against division by zero or negative values
          if (bodyDensity <= 0) {
            throw new Error("Could not calculate body fat with the given measurements. Please check your values.");
          }
          
          bodyFat = (495 / bodyDensity - 450);
        } else {
          // For women - using 4-site formula (triceps, suprailiac, abdomen, thigh)
          const sum = tricepsInMm + subscapularInMm + suprailiacInMm + thighInMm;
          
          // Check for valid sum value
          if (sum <= 0) {
            throw new Error("Invalid skinfold measurements. Please check your values.");
          }
          
          // Jackson-Pollock formula for women
          const bodyDensity = 1.097 - (0.00046971 * sum) + 
                             (0.00000056 * sum * sum) - 
                             (0.00012828 * age);
                             
          // Safeguard against division by zero or negative values
          if (bodyDensity <= 0) {
            throw new Error("Could not calculate body fat with the given measurements. Please check your values.");
          }
          
          bodyFat = (495 / bodyDensity - 450);
        }
        console.log('Debug - Skinfold sum:', gender === 'male' ? 
                    (tricepsInMm + subscapularInMm + suprailiacInMm) : 
                    (tricepsInMm + subscapularInMm + suprailiacInMm + thighInMm));
        console.log('Debug - Skinfold calculation result:', bodyFat);
      } else {
        // Navy or BMI method
        bodyFat = calculateBodyFat(
          gender, 
          waistInCm, 
          neckInCm, 
          heightInCm, 
          hipInCm, 
          weightInKg, 
          age,
          measurementMethod
        );
        console.log('Debug - Navy/BMI calculation result:', bodyFat);
      }
      
      // Round to 1 decimal place
      const roundedBodyFat = Math.round(bodyFat * 10) / 10;
      
      // Validate the calculated result
      if (isNaN(roundedBodyFat) || roundedBodyFat < 2 || roundedBodyFat > 70) {
        throw new Error("Could not calculate a valid body fat percentage. Please check your measurements.");
      }
      
      setBodyFatPercentage(roundedBodyFat);
      
      // Set category and color
      const category = getCategory(roundedBodyFat, gender);
      setBodyFatCategory(category);
      setCategoryColor(getCategoryColor(category));
      
      // Set health information
      setHealthInfo(getHealthInfo(category, gender));
      
      // Set ideal range based on gender and age
      setIdealRange(getIdealRange(gender, age));
      
      // Show results after calculation
      setShowResults(true);
      
      // Add a small delay before scrolling to results
      setTimeout(() => {
        if (resultsRef.current) {
          const yOffset = -80; // Offset to show the heading properly (adjust as needed)
          const element = resultsRef.current;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 300);
      
    } catch (error) {
      if (error instanceof Error) {
        console.error("Body fat calculation error:", error.message);
        // Display error to user
        toast({
          title: "Calculation Error",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mb-6">
      <Card className="mb-6 shadow-md bg-white">
        <CardContent className="p-6">
          <CalculatorForm
            gender={gender}
            setGender={setGender}
            age={age}
            setAge={setAge}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            neck={neck}
            setNeck={setNeck}
            waist={waist}
            setWaist={setWaist}
            hip={hip}
            setHip={setHip}
            measurementUnit={measurementUnit}
            setMeasurementUnit={setMeasurementUnit}
            measurementMethod={measurementMethod}
            setMeasurementMethod={setMeasurementMethod}
            calculateResults={calculateResults}
            triceps={triceps}
            setTriceps={setTriceps}
            subscapular={subscapular}
            setSubscapular={setSubscapular}
            suprailiac={suprailiac}
            setSuprailiac={setSuprailiac}
            thigh={thigh}
            setThigh={setThigh}
            isInitialized={isInitialized}
            setShowResults={setShowResults}
          />
        </CardContent>
      </Card>

      {/* Only render results when there's something to show */}
      {showResults && bodyFatPercentage !== null && (
        <div ref={resultsRef} className="mt-8">
          <AnimatedResults show={true} disableAutoScroll={false}>
            <ResultsDisplay
              bodyFatPercentage={bodyFatPercentage || 0}
              bodyFatCategory={bodyFatCategory}
              gender={gender}
              age={age}
              healthInfo={healthInfo}
              idealRange={idealRange}
              categoryColor={categoryColor}
              measurementMethod={measurementMethod}
            />
          </AnimatedResults>
        </div>
      )}
    </div>
  );
};

export default BodyFatCalculatorRedesigned;
