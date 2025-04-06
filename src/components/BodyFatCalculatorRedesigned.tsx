
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Check, Info } from 'lucide-react';

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
    if (bodyFat < 30) return 'Overweight';
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
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Essential Fat': return '#00BCD4';
    case 'Athletic': return '#4CAF50';
    case 'Fitness': return '#8BC34A';
    case 'Average': return '#FFEB3B';
    case 'Overweight': return '#FF9800';
    case 'Obese': return '#F44336';
    default: return '#00BCD4';
  }
};

const BodyFatCalculatorRedesigned = () => {
  const { toast } = useToast();
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(70); // kg
  const [neck, setNeck] = useState(35); // cm
  const [waist, setWaist] = useState(80); // cm
  const [hip, setHip] = useState(90); // cm (only for women)
  const [measurementUnit, setMeasurementUnit] = useState('metric');
  const [measurementMethod, setMeasurementMethod] = useState('navy');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);
  const [bodyFatCategory, setBodyFatCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('#00BCD4');

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

    toast({
      title: "Body Fat Calculated",
      description: `Your estimated body fat percentage is ${roundedBodyFat}%`,
    });
  };

  return (
    <div className="max-w-5xl mx-auto mb-8">
      <Card className="mb-10 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <Tabs defaultValue="navy" onValueChange={setMeasurementMethod} className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="navy">Navy Method</TabsTrigger>
                  <TabsTrigger value="bia">BIA Method</TabsTrigger>
                  <TabsTrigger value="caliper">Caliper Method</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Left Column - Input Fields */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Gender</h3>
                <RadioGroup defaultValue="male" value={gender} onValueChange={setGender} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="weight">
                  Weight ({measurementUnit === 'metric' ? 'kg' : 'lbs'})
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="waist">
                  Waist Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                </Label>
                <Input
                  id="waist"
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Middle Column - More Input Fields */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Measurement System</h3>
                <RadioGroup defaultValue="metric" value={measurementUnit} onValueChange={setMeasurementUnit} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric">Metric (kg, cm)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial">Imperial (lb, in)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="height">
                  Height ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="neck">
                  Neck Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                </Label>
                <Input
                  id="neck"
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>

              {gender === 'female' && (
                <div>
                  <Label htmlFor="hip">
                    Hip Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                  </Label>
                  <Input
                    id="hip"
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(parseInt(e.target.value) || 0)}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            {/* Right Column - Calculate Button and Results */}
            <div className="flex flex-col">
              <Button 
                onClick={calculateResults} 
                className="w-full bg-teal-500 hover:bg-teal-600 my-6 text-white"
              >
                Calculate Body Fat
              </Button>

              {bodyFatPercentage !== null && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-center">Your Results</h3>
                  <p className="text-sm text-center text-gray-500 mb-6">Based on the Navy method</p>
                  
                  <div className="w-44 h-44 mx-auto mb-4">
                    <CircularProgressbar
                      value={bodyFatPercentage}
                      text={`${bodyFatPercentage}%`}
                      maxValue={gender === 'male' ? 35 : 42}
                      styles={buildStyles({
                        textSize: '16px',
                        pathColor: categoryColor,
                        textColor: categoryColor,
                        trailColor: '#F3F4F6',
                      })}
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      className="rounded-full px-4 py-1 text-sm border-2"
                      style={{ borderColor: categoryColor, color: categoryColor }}
                    >
                      {bodyFatCategory}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {bodyFatPercentage !== null && (
        <Card className="mb-10 shadow-md">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">What Your Result Means</h3>
                <p className="mb-4">
                  Your body fat percentage of <span className="font-bold text-teal-500">{bodyFatPercentage}%</span> places you in the <span className="font-bold" style={{ color: categoryColor }}>{bodyFatCategory}</span> category for {gender === 'male' ? 'men' : 'women'}.
                </p>

                <h4 className="font-bold mt-6 mb-2">Body Fat Categories for {gender === 'male' ? 'Men' : 'Women'}</h4>
                <div className="space-y-2">
                  {gender === 'male' ? (
                    <>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#00BCD4] mr-2"></div>
                        <span>Essential Fat (2-5%)</span>
                        <div className={`ml-auto h-3 w-24 bg-[#00BCD4] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#4CAF50] mr-2"></div>
                        <span>Athletic (6-13%)</span>
                        <div className={`ml-auto h-3 w-32 bg-[#4CAF50] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#8BC34A] mr-2"></div>
                        <span>Fitness (14-17%)</span>
                        <div className={`ml-auto h-3 w-28 bg-[#8BC34A] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#FFEB3B] mr-2"></div>
                        <span>Average (18-24%)</span>
                        <div className={`ml-auto h-3 w-40 bg-[#FFEB3B] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#FF9800] mr-2"></div>
                        <span>Overweight (25-30%)</span>
                        <div className={`ml-auto h-3 w-36 bg-[#FF9800] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#F44336] mr-2"></div>
                        <span>Obese (31%+)</span>
                        <div className={`ml-auto h-3 w-48 bg-[#F44336] rounded-full`}></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#00BCD4] mr-2"></div>
                        <span>Essential Fat (10-13%)</span>
                        <div className={`ml-auto h-3 w-24 bg-[#00BCD4] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#4CAF50] mr-2"></div>
                        <span>Athletic (14-20%)</span>
                        <div className={`ml-auto h-3 w-32 bg-[#4CAF50] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#8BC34A] mr-2"></div>
                        <span>Fitness (21-24%)</span>
                        <div className={`ml-auto h-3 w-28 bg-[#8BC34A] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#FFEB3B] mr-2"></div>
                        <span>Average (25-31%)</span>
                        <div className={`ml-auto h-3 w-40 bg-[#FFEB3B] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#FF9800] mr-2"></div>
                        <span>Overweight (32-37%)</span>
                        <div className={`ml-auto h-3 w-36 bg-[#FF9800] rounded-full`}></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#F44336] mr-2"></div>
                        <span>Obese (38%+)</span>
                        <div className={`ml-auto h-3 w-48 bg-[#F44336] rounded-full`}></div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Body Fat Distribution</h3>
                <p className="mb-4">
                  Body fat doesn't just accumulate in one area. Where your body stores fat can be just as important for your health as how much fat you have. There are two main patterns:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold text-teal-500 mb-2">Android (Apple Shape)</h4>
                    <p className="text-sm">
                      Fat concentrated around the abdomen. Associated with higher metabolic and cardiovascular disease risks.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold text-teal-500 mb-2">Gynoid (Pear Shape)</h4>
                    <p className="text-sm">
                      Fat distributed in the hips, buttocks, and thighs. Generally associated with lower health risks.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold mb-2">Health Tip</h4>
                  <p className="text-sm">
                    Waist circumference is a good indicator of visceral fat around organs, which poses more health risks than subcutaneous fat just beneath the skin.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-10 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Understanding Body Fat Percentage</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">What is Body Fat Percentage?</h4>
                  <p className="text-sm">
                    Body fat percentage is the amount of fat mass relative to total body weight. It's a more accurate measure than BMI because it differentiates between fat mass and lean tissue (muscle, bones, organs, etc.).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Why It Matters</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Strong correlation with overall health and fitness level</li>
                    <li>Improved balance and metabolic health</li>
                    <li>Reduced risk of chronic diseases like diabetes and heart disease</li>
                    <li>Improved athletic performance</li>
                    <li>Better long-term weight management</li>
                    <li>Overall wellness and longevity</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Measurement Methods Explained</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border rounded-lg p-3">
                  <h4 className="font-bold text-teal-500 text-sm">Navy Method</h4>
                  <p className="text-xs mb-2">
                    Uses circumference measurements of neck, waist (and hips for women) to estimate body fat.
                  </p>
                  <div className="flex mb-1">
                    <span className="text-xs mr-2">Accuracy</span>
                    <div className="flex">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-xs mr-2">Convenience</span>
                    <div className="flex">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h4 className="font-bold text-teal-500 text-sm">BIA Method</h4>
                  <p className="text-xs mb-2">
                    Bioelectrical impedance using BIA scales measures resistance to small electrical currents to estimate body fat.
                  </p>
                  <div className="flex mb-1">
                    <span className="text-xs mr-2">Accuracy</span>
                    <div className="flex">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-xs mr-2">Convenience</span>
                    <div className="flex">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h4 className="font-bold text-teal-500 text-sm">Caliper Method</h4>
                  <p className="text-xs mb-2">
                    Measures skin fold thickness at specific body sites to estimate subcutaneous fat.
                  </p>
                  <div className="flex mb-1">
                    <span className="text-xs mr-2">Accuracy</span>
                    <div className="flex">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-xs mr-2">Convenience</span>
                    <div className="flex">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-teal-500 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 mx-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="font-bold mt-6 mb-3">Other Professional Methods</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-bold text-sm mb-1">DEXA Scan (Gold Standard)</h5>
                  <p className="text-xs">
                    Uses X-ray absorptiometry to provide precise body composition measurements. Considered the gold standard for body fat assessment.
                  </p>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-bold text-sm mb-1">Hydrostatic Weighing</h5>
                  <p className="text-xs">
                    Based on Archimedes' principle, this method uses underwater weighing to determine body volume and calculate fat percentage. Very accurate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-10 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Tips for Managing Body Fat</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-center mb-3">Nutrition Strategy</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Create a moderate caloric deficit (250-500 cals/day) for sustainable fat loss</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Prioritize protein intake (1.6-2.2g per kg bodyweight)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Focus on whole, minimally processed foods</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Include healthy fats for hormone regulation</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-center mb-3">Exercise Approach</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Combine resistance training with cardiovascular exercise</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Perform compound movements that engage multiple muscle groups</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Include high-intensity interval training (HIIT)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Aim for 150+ minutes of activity weekly</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-center mb-3">Lifestyle Factors</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Prioritize quality sleep (7-9 hours nightly)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Manage stress through meditation and relaxation techniques</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Stay hydrated (aim for 3 liters daily)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-teal-500" />
                  <span className="text-sm">Be consistent and patient with your approach</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="p-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg">
        <p><strong>Medical Disclaimer:</strong> This calculator is for informational purposes only.</p>
        <p className="mt-1">
          Body fat percentage calculations are estimates and may vary from professional measurements. Consult with healthcare professionals before making any significant changes to your diet or exercise regimen.
        </p>
        <p className="mt-4 text-xs">© 2023 Body Index Calculator. All rights reserved.</p>
      </div>
    </div>
  );
};

export default BodyFatCalculatorRedesigned;
