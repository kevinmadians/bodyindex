import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import CalculatorForm from './body-fat-calculator/CalculatorForm';
import ResultsDisplay from './body-fat-calculator/ResultsDisplay';
import { calculateBodyFat, getCategory, getCategoryColor, getHealthInfo, getIdealRange } from '@/utils/bodyFatCalculations';

const BodyFatCalculatorRedesigned = () => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(27);
  const [height, setHeight] = useState(183); // cm
  const [weight, setWeight] = useState(77); // kg
  const [neck, setNeck] = useState(36); // cm
  const [waist, setWaist] = useState(85); // cm
  const [hip, setHip] = useState(90); // cm (only for women)
  const [measurementUnit, setMeasurementUnit] = useState('metric');
  const [measurementMethod, setMeasurementMethod] = useState('navy');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);
  const [bodyFatCategory, setBodyFatCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('#00BCD4');
  const [showResults, setShowResults] = useState(false);
  const [healthInfo, setHealthInfo] = useState<string>('');
  const [idealRange, setIdealRange] = useState<{min: number, max: number}>({min: 8, max: 20});
  // For skinfold measurements
  const [triceps, setTriceps] = useState(15); // mm
  const [subscapular, setSubscapular] = useState(18); // mm
  const [suprailiac, setSuprailiac] = useState(20); // mm
  const [thigh, setThigh] = useState(20); // mm - for women

  // Calculate body fat when button is clicked
  const calculateResults = () => {
    // Convert values to metric for calculation if needed
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

    // Calculate body fat percentage based on selected method
    let bodyFat = 0;
    
    if (measurementMethod === 'skinfold') {
      // Skinfold calculation using Jackson-Pollock method
      if (gender === 'male') {
        // For men - using 3-site formula (chest, abdomen, thigh)
        const sum = tricepsInMm + subscapularInMm + suprailiacInMm;
        const bodyDensity = 1.10938 - (0.0008267 * sum) + 
                            (0.0000016 * sum * sum) - 
                            (0.0002574 * age);
        bodyFat = (4.95 / bodyDensity - 4.50) * 100;
      } else {
        // For women - using 4-site formula (triceps, suprailiac, abdomen, thigh)
        const sum = tricepsInMm + subscapularInMm + suprailiacInMm + thighInMm;
        const bodyDensity = 1.096095 - (0.0006952 * sum) + 
                            (0.0000011 * sum * sum) - 
                            (0.0000714 * age);
        bodyFat = (4.95 / bodyDensity - 4.50) * 100;
      }
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
    }
    
    // Round to 1 decimal place
    const roundedBodyFat = Math.round(bodyFat * 10) / 10;
    
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
    
    // Scroll to results after a short delay to ensure the results are rendered
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto mb-8">
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
          />
        </CardContent>
      </Card>

      {showResults && bodyFatPercentage !== null && (
        <div ref={resultsRef} className="scroll-mt-6">
          <ResultsDisplay
            bodyFatPercentage={bodyFatPercentage}
            bodyFatCategory={bodyFatCategory}
            gender={gender}
            age={age}
            healthInfo={healthInfo}
            idealRange={idealRange}
            categoryColor={categoryColor}
            measurementMethod={measurementMethod}
          />
        </div>
      )}
    </div>
  );
};

export default BodyFatCalculatorRedesigned;
