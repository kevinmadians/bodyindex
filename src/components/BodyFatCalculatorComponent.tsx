
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BodyFatChart from './BodyFatChart';
import BodyFatResults from './BodyFatResults';

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

const BodyFatCalculatorComponent = () => {
  const { toast } = useToast();
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(70); // kg
  const [neck, setNeck] = useState(35); // cm
  const [waist, setWaist] = useState(80); // cm
  const [hip, setHip] = useState(90); // cm (only for women)
  const [measurementUnit, setMeasurementUnit] = useState('metric');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);
  const [fatMass, setFatMass] = useState<number | null>(null);
  const [leanMass, setLeanMass] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('calculator');

  // Convert imperial to metric for calculation
  const convertToMetric = (value: number, type: 'height' | 'weight' | 'circumference') => {
    if (measurementUnit === 'imperial') {
      if (type === 'height') {
        return value * 2.54; // inches to cm
      } else if (type === 'weight') {
        return value * 0.453592; // lbs to kg
      } else if (type === 'circumference') {
        return value * 2.54; // inches to cm
      }
    }
    return value;
  };

  // Calculate body fat when button is clicked
  const calculateResults = () => {
    // Convert values to metric for calculation
    const heightInCm = convertToMetric(height, 'height');
    const waistInCm = convertToMetric(waist, 'circumference');
    const neckInCm = convertToMetric(neck, 'circumference');
    const hipInCm = gender === 'female' ? convertToMetric(hip, 'circumference') : undefined;
    const weightInKg = convertToMetric(weight, 'weight');

    // Calculate body fat percentage
    const bodyFat = calculateBodyFat(gender, waistInCm, neckInCm, heightInCm, hipInCm);
    
    // Round to 1 decimal place
    const roundedBodyFat = Math.round(bodyFat * 10) / 10;
    
    // Calculate fat mass and lean mass
    const fatMassValue = (roundedBodyFat / 100) * weightInKg;
    const leanMassValue = weightInKg - fatMassValue;
    
    setBodyFatPercentage(roundedBodyFat);
    setFatMass(Math.round(fatMassValue * 10) / 10);
    setLeanMass(Math.round(leanMassValue * 10) / 10);

    // Switch to the results tab
    setActiveTab('results');

    toast({
      title: "Body Fat Calculated",
      description: `Your estimated body fat percentage is ${roundedBodyFat}%`,
    });
  };

  // Update measurements when unit changes
  useEffect(() => {
    if (measurementUnit === 'imperial') {
      // Convert metric to imperial
      setHeight(Math.round(height / 2.54)); // cm to inches
      setWeight(Math.round(weight / 0.453592)); // kg to lbs
      setNeck(Math.round(neck / 2.54)); // cm to inches
      setWaist(Math.round(waist / 2.54)); // cm to inches
      setHip(Math.round(hip / 2.54)); // cm to inches
    } else {
      // Convert imperial to metric
      setHeight(Math.round(height * 2.54)); // inches to cm
      setWeight(Math.round(weight * 0.453592)); // lbs to kg
      setNeck(Math.round(neck * 2.54)); // inches to cm
      setWaist(Math.round(waist * 2.54)); // inches to cm
      setHip(Math.round(hip * 2.54)); // inches to cm
    }
  }, [measurementUnit]);

  return (
    <Card className="mb-10 shadow-md">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results" disabled={bodyFatPercentage === null}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              <Button 
                variant={measurementUnit === 'metric' ? 'default' : 'outline'} 
                onClick={() => setMeasurementUnit('metric')}
                className="w-32"
              >
                Metric
              </Button>
              <Button 
                variant={measurementUnit === 'imperial' ? 'default' : 'outline'} 
                onClick={() => setMeasurementUnit('imperial')}
                className="w-32"
              >
                Imperial
              </Button>
            </div>
            
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
                <div className="flex justify-between mb-2">
                  <Label htmlFor="age">Age: {age} years</Label>
                </div>
                <Slider
                  id="age"
                  min={18}
                  max={80}
                  step={1}
                  value={[age]}
                  onValueChange={(value) => setAge(value[0])}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <div className="pt-4">
                <Button onClick={calculateResults} className="w-full">Calculate Body Fat</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {bodyFatPercentage !== null && (
              <div>
                <BodyFatResults 
                  bodyFatPercentage={bodyFatPercentage} 
                  fatMass={fatMass || 0} 
                  leanMass={leanMass || 0} 
                  gender={gender}
                  unit={measurementUnit === 'metric' ? 'kg' : 'lbs'}
                />
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Body Fat Visualization</h3>
                  <div className="h-80">
                    <BodyFatChart bodyFatPercentage={bodyFatPercentage} gender={gender} />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg text-sm">
          <p className="font-medium mb-1">How to measure:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Neck: Measure around the middle of your neck</li>
            <li>Waist: Measure at the narrowest point or at belly button level</li>
            {gender === 'female' && <li>Hip: Measure at the widest point around your buttocks</li>}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            This calculator uses the U.S. Navy method to estimate body fat percentage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BodyFatCalculatorComponent;
