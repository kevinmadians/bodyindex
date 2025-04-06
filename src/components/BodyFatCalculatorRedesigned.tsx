
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Navy Method Formula
const calculateBodyFat = (gender: string, waist: number, neck: number, height: number, hip?: number) => {
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
const getCategory = (bodyFat: number, gender: string): string => {
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
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Essential Fat': return '#2196F3';
    case 'Athletic': return '#4CAF50';
    case 'Fitness': return '#00BCD4';
    case 'Average': return '#FFEB3B';
    case 'Obese': return '#F44336';
    default: return '#00BCD4';
  }
};

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
          <div className="bg-gray-100 rounded-lg mb-6">
            <div className="grid grid-cols-3">
              <button 
                className={`py-4 px-2 text-center font-medium ${measurementMethod === 'navy' ? 'text-primary' : 'text-gray-500'}`}
                onClick={() => setMeasurementMethod('navy')}
              >
                Navy Method
              </button>
              <button 
                className={`py-4 px-2 text-center font-medium ${measurementMethod === 'bmi' ? 'text-primary' : 'text-gray-500'}`}
                onClick={() => setMeasurementMethod('bmi')}
              >
                BMI Method
              </button>
              <button 
                className={`py-4 px-2 text-center font-medium ${measurementMethod === 'skinfold' ? 'text-primary' : 'text-gray-500'}`}
                onClick={() => setMeasurementMethod('skinfold')}
              >
                Skinfold Method
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Gender</h3>
                <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="text-primary" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="text-primary" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-6">
                <Label htmlFor="age" className="block mb-2">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="weight" className="block mb-2">
                  Weight ({measurementUnit === 'metric' ? 'kg' : 'lbs'})
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="waist" className="block mb-2">
                  Waist Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                </Label>
                <Input
                  id="waist"
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Measurement System</h3>
                <RadioGroup value={measurementUnit} onValueChange={setMeasurementUnit} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" className="text-primary" />
                    <Label htmlFor="metric">Metric (cm, kg)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" className="text-primary" />
                    <Label htmlFor="imperial">Imperial (in, lbs)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-6">
                <Label htmlFor="height" className="block mb-2">
                  Height ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="neck" className="block mb-2">
                  Neck Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                </Label>
                <Input
                  id="neck"
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              {gender === 'female' && (
                <div className="mb-6">
                  <Label htmlFor="hip" className="block mb-2">
                    Hip Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                  </Label>
                  <Input
                    id="hip"
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(parseInt(e.target.value) || 0)}
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Button 
              onClick={calculateResults} 
              className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white"
            >
              Calculate Body Fat
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && bodyFatPercentage !== null && (
        <Card className="mb-6 shadow-md bg-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-1">Your Results</h2>
            <p className="text-sm text-gray-500 mb-6">Based on the Navy method</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-64 h-64 mb-4">
                  <CircularProgressbar
                    value={bodyFatPercentage}
                    text={`${bodyFatPercentage}%`}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: '#00BCD4',
                      textColor: '#00BCD4',
                      trailColor: '#F3F4F6',
                    })}
                  />
                  <p className="text-center text-sm text-gray-500 mt-2">Body Fat</p>
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-full px-6 py-1 border-2 border-[#00BCD4] text-[#00BCD4]"
                >
                  {bodyFatCategory}
                </Button>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">What Your Result Means</h3>
                <p className="mb-4">
                  Your body fat percentage of <span className="font-bold text-[#00BCD4]">{bodyFatPercentage}%</span> places you in the <span className="font-bold text-[#00BCD4]">{bodyFatCategory}</span> category for {gender === 'male' ? 'men' : 'women'}.
                </p>

                <h4 className="font-bold mt-6 mb-4">Body Fat Categories for {gender === 'male' ? 'Men' : 'Women'}</h4>
                <div className="space-y-3">
                  {gender === 'male' ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span>Essential Fat (2-5%)</span>
                        <div className="h-3 w-40 bg-[#2196F3] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Athletic (6-13%)</span>
                        <div className="h-3 w-40 bg-[#4CAF50] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Fitness (14-17%)</span>
                        <div className="h-3 w-40 bg-[#00BCD4] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Average (18-24%)</span>
                        <div className="h-3 w-40 bg-[#FFEB3B] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Obese (25%+)</span>
                        <div className="h-3 w-40 bg-[#F44336] rounded-full"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span>Essential Fat (10-13%)</span>
                        <div className="h-3 w-40 bg-[#2196F3] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Athletic (14-20%)</span>
                        <div className="h-3 w-40 bg-[#4CAF50] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Fitness (21-24%)</span>
                        <div className="h-3 w-40 bg-[#00BCD4] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Average (25-31%)</span>
                        <div className="h-3 w-40 bg-[#FFEB3B] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Obese (32%+)</span>
                        <div className="h-3 w-40 bg-[#F44336] rounded-full"></div>
                      </div>
                    </>
                  )}
                </div>

                <div className="w-full bg-gray-100 h-3 rounded-full mt-6">
                  <div className="bg-gradient-to-r from-[#2196F3] via-[#4CAF50] to-[#F44336] h-3 rounded-full flex">
                    <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Essential</div>
                    <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Athletic</div>
                    <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Fitness</div>
                    <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Average</div>
                    <div className="flex-1 text-[9px] text-center text-white font-semibold pt-0.5">Obese</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BodyFatCalculatorRedesigned;
