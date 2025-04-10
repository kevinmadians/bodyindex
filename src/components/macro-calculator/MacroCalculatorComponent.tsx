import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { MacroResults } from './MacroResults';
import { toast } from "@/components/ui/use-toast";
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NumericInput } from '@/components/ui/NumericInput';

interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
  mealPlan: {
    meals: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const MacroCalculatorComponent = () => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  const [mealsPerDay, setMealsPerDay] = useState<number>(4);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [useBodyFat, setUseBodyFat] = useState<boolean>(false);
  const [measurementUnit, setMeasurementUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<MacroResult | null>(null);

  const activityLevels = {
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Lightly active (light exercise 1-3 days/week)',
    moderate: 'Moderately active (moderate exercise 3-5 days/week)',
    active: 'Very active (hard exercise 6-7 days/week)',
    extreme: 'Extremely active (very hard exercise & physical job)',
  };

  const goals = {
    lose: 'Weight Loss',
    maintain: 'Maintain Weight',
    gain: 'Muscle Gain',
    performance: 'Athletic Performance',
  };

  const calculateMacros = () => {
    // Validate inputs
    if (!age || age < 15 || age > 80) {
      toast({
        title: "Invalid Age",
        description: age === 0 ? "Age is required" : "Please enter an age between 15 and 80",
        variant: "destructive"
      });
      return;
    }

    if (!height) {
      toast({
        title: "Invalid Height",
        description: "Height is required",
        variant: "destructive"
      });
      return;
    }

    if (!weight || (measurementUnit === 'metric' && (weight < 40 || weight > 200)) || 
        (measurementUnit === 'imperial' && (weight < 88 || weight > 440))) {
      toast({
        title: "Invalid Weight",
        description: weight === 0 ? "Weight is required" : `Please enter a weight between ${measurementUnit === 'metric' ? '40-200 kg' : '88-440 lbs'}`,
        variant: "destructive"
      });
      return;
    }

    if (useBodyFat && (bodyFat === null || bodyFat === 0)) {
      toast({
        title: "Invalid Body Fat Percentage",
        description: "Body fat percentage is required when using body fat calculation method",
        variant: "destructive"
      });
      return;
    }

    // Convert to metric if needed
    const weightInKg = measurementUnit === 'imperial' ? weight * 0.453592 : weight;
    const heightInCm = measurementUnit === 'imperial' ? height * 2.54 : height;

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    
    if (useBodyFat && bodyFat !== null) {
      // If body fat percentage is provided, use the Katch-McArdle formula
      const leanBodyMass = weightInKg * (1 - (bodyFat / 100));
      bmr = 370 + (21.6 * leanBodyMass);
    } else {
      // Otherwise use Mifflin-St Jeor
      if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
      } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      }
    }
    
    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9,
    };
    
    const tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    
    // Adjust calories based on goal
    let targetCalories;
    switch (goal) {
      case 'lose':
        targetCalories = tdee * 0.8; // 20% deficit
        break;
      case 'gain':
        targetCalories = tdee * 1.1; // 10% surplus
        break;
      case 'performance':
        targetCalories = tdee * 1.15; // 15% surplus
        break;
      case 'maintain':
      default:
        targetCalories = tdee;
    }
    
    // Calculate macronutrient distribution based on goal
    let proteinPct, carbsPct, fatPct;
    
    switch (goal) {
      case 'lose':
        proteinPct = 0.35; // 35% protein
        fatPct = 0.35;     // 35% fat
        carbsPct = 0.30;    // 30% carbs
        break;
      case 'gain':
        proteinPct = 0.30; // 30% protein
        carbsPct = 0.45;   // 45% carbs
        fatPct = 0.25;     // 25% fat
        break;
      case 'performance':
        proteinPct = 0.25; // 25% protein
        carbsPct = 0.55;   // 55% carbs
        fatPct = 0.20;     // 20% fat
        break;
      case 'maintain':
      default:
        proteinPct = 0.30; // 30% protein
        carbsPct = 0.40;   // 40% carbs
        fatPct = 0.30;     // 30% fat
    }
    
    // Calculate grams
    const proteinCalories = targetCalories * proteinPct;
    const carbsCalories = targetCalories * carbsPct;
    const fatCalories = targetCalories * fatPct;
    
    const proteinGrams = Math.round(proteinCalories / 4); // 4 calories per gram of protein
    const carbsGrams = Math.round(carbsCalories / 4);     // 4 calories per gram of carbs
    const fatGrams = Math.round(fatCalories / 9);         // 9 calories per gram of fat
    
    // Create meal plan
    const mealPlan = {
      meals: mealsPerDay,
      protein: Math.round(proteinGrams / mealsPerDay),
      carbs: Math.round(carbsGrams / mealsPerDay),
      fat: Math.round(fatGrams / mealsPerDay),
    };
    
    // Set results
    setResult({
      calories: Math.round(targetCalories),
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
      proteinPercentage: Math.round(proteinPct * 100),
      carbsPercentage: Math.round(carbsPct * 100),
      fatPercentage: Math.round(fatPct * 100),
      proteinCalories: Math.round(proteinCalories),
      carbsCalories: Math.round(carbsCalories),
      fatCalories: Math.round(fatCalories),
      mealPlan,
    });
    
    // Scroll to results
    setTimeout(() => {
      if (resultRef.current) {
        const yOffset = -80; // Offset to ensure the heading is visible
        const element = resultRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 300); // Increased delay to ensure content is rendered
  };

  return (
    <div className="space-y-6 mb-10">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Gender</Label>
                <RadioGroup 
                  value={gender} 
                  onValueChange={(value) => setGender(value as 'male' | 'female')}
                  className="flex gap-4 mt-2"
                >
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
                <NumericInput
                  id="age"
                  value={age === 0 ? '' : age.toString()}
                  onValueChange={(value) => setAge(value || 0)}
                  min={15}
                  max={80}
                  className="mt-1"
                  required
                  error={age === 0 ? "Age is required" : (age < 15 || age > 80) ? `Age should be between 15-80 years` : undefined}
                />
              </div>
              
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="measurementUnit">Units</Label>
                </div>
                <RadioGroup 
                  value={measurementUnit} 
                  onValueChange={(value) => setMeasurementUnit(value as 'metric' | 'imperial')}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric">Metric (kg/cm)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial">Imperial (lb/in)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="height">
                  Height ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                </Label>
                <NumericInput
                  id="height"
                  value={height === 0 ? '' : height.toString()}
                  onValueChange={(value) => setHeight(value || 0)}
                  min={measurementUnit === 'metric' ? 140 : 55}
                  max={measurementUnit === 'metric' ? 220 : 87}
                  className="mt-1"
                  required
                  error={height === 0 ? "Height is required" : (measurementUnit === 'metric' && (height < 140 || height > 220)) || (measurementUnit === 'imperial' && (height < 55 || height > 87)) ? `Height should be between ${measurementUnit === 'metric' ? '140-220 cm' : '55-87 inches'}` : undefined}
                />
              </div>
              
              <div>
                <Label htmlFor="weight">
                  Weight ({measurementUnit === 'metric' ? 'kg' : 'lbs'})
                </Label>
                <NumericInput
                  id="weight"
                  value={weight === 0 ? '' : weight.toString()}
                  onValueChange={(value) => setWeight(value || 0)}
                  min={measurementUnit === 'metric' ? 40 : 88}
                  max={measurementUnit === 'metric' ? 200 : 440}
                  className="mt-1"
                  required
                  error={weight === 0 ? "Weight is required" : (measurementUnit === 'metric' && (weight < 40 || weight > 200)) || (measurementUnit === 'imperial' && (weight < 88 || weight > 440)) ? `Weight should be between ${measurementUnit === 'metric' ? '40-200 kg' : '88-440 lbs'}` : undefined}
                />
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <input 
                    type="checkbox" 
                    id="useBodyFat" 
                    checked={useBodyFat}
                    onChange={(e) => setUseBodyFat(e.target.checked)}
                    className="rounded text-primary"
                  />
                  <Label htmlFor="useBodyFat" className="cursor-pointer">
                    Include Body Fat % 
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-4 w-4 inline-block text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Including your body fat percentage will make the calculation more accurate.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                </div>
                
                {useBodyFat && (
                  <>
                    <Label htmlFor="bodyFat">Body Fat Percentage (%)</Label>
                    <NumericInput
                      id="bodyFat"
                      value={bodyFat === null ? '' : bodyFat.toString()}
                      onValueChange={(value) => setBodyFat(value || 0)}
                      min={5}
                      max={50}
                      placeholder="Enter your body fat %"
                      className="mt-1"
                      required
                      error={bodyFat === null || bodyFat === 0 ? "Body fat percentage is required" : (bodyFat < 5 || bodyFat > 50) ? `Body fat should be between 5-50%` : undefined}
                    />
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(activityLevels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(goals).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label>Meals Per Day: {mealsPerDay}</Label>
                </div>
                <Slider
                  value={[mealsPerDay]}
                  min={3}
                  max={6}
                  step={1}
                  onValueChange={(values) => setMealsPerDay(values[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="flex items-center justify-center mt-6 pt-6">
                <Button onClick={calculateMacros} className="w-full bg-primary">
                  Calculate Macros
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div ref={resultRef} className="scroll-mt-20">
        {result && (
          <MacroResults result={result} goal={goal} />
        )}
      </div>
    </div>
  );
}; 