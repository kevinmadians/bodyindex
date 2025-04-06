
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import CalculatorForm from './body-fat-calculator/CalculatorForm';
import ResultsDisplay from './body-fat-calculator/ResultsDisplay';
import { calculateBodyFat, getCategory, getCategoryColor } from '@/utils/bodyFatCalculations';

const BodyFatCalculatorRedesigned = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(27);
  const [height, setHeight] = useState(183); // cm
  const [weight, setWeight] = useState(77); // kg
  const [neck, setNeck] = useState(36); // cm
  const [waist, setWaist] = useState(85); // cm
  const [hip, setHip] = useState(90); // cm (only for women)
  const [measurementUnit, setMeasurementUnit] = useState('metric');
  const [measurementMethod, setMeasurementMethod] = useState('navy');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(17.1);
  const [bodyFatCategory, setBodyFatCategory] = useState<string>('Fitness');
  const [categoryColor, setCategoryColor] = useState<string>('#00BCD4');
  const [showResults, setShowResults] = useState(true);

  // Calculate body fat when button is clicked
  const calculateResults = () => {
    // Convert values to metric for calculation if needed
    const heightInCm = measurementUnit === 'imperial' ? height * 2.54 : height;
    const waistInCm = measurementUnit === 'imperial' ? waist * 2.54 : waist;
    const neckInCm = measurementUnit === 'imperial' ? neck * 2.54 : neck;
    const hipInCm = gender === 'female' && measurementUnit === 'imperial' ? hip * 2.54 : hip;

    // Calculate body fat percentage
    const bodyFat = calculateBodyFat(gender, waistInCm, neckInCm, heightInCm, hipInCm);
    
    // Round to 1 decimal place
    const roundedBodyFat = Math.round(bodyFat * 10) / 10;
    
    setBodyFatPercentage(roundedBodyFat);
    
    // Set category and color
    const category = getCategory(roundedBodyFat, gender);
    setBodyFatCategory(category);
    setCategoryColor(getCategoryColor(category));
    setShowResults(true);
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
          />
        </CardContent>
      </Card>

      {showResults && bodyFatPercentage !== null && (
        <ResultsDisplay
          bodyFatPercentage={bodyFatPercentage}
          bodyFatCategory={bodyFatCategory}
          gender={gender}
        />
      )}
    </div>
  );
};

export default BodyFatCalculatorRedesigned;
