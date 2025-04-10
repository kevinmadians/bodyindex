import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FormulaType } from '@/utils/bmrCalculations';
import { NumericInput } from '@/components/ui/NumericInput';
import { AlertCircle } from 'lucide-react';

interface CalculatorFormProps {
  gender: string;
  setGender: (value: string) => void;
  age: number;
  setAge: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  bodyFatPercentage: number;
  setBodyFatPercentage: (value: number) => void;
  formula: FormulaType;
  setFormula: (value: FormulaType) => void;
  activityLevel: string;
  setActivityLevel: (value: string) => void;
  goal: string;
  setGoal: (value: string) => void;
  measurementUnit: string;
  setMeasurementUnit: (value: string) => void;
  heightFt: number;
  setHeightFt: (value: number) => void;
  heightIn: number;
  setHeightIn: (value: number) => void;
  includeBodyFat: boolean;
  setIncludeBodyFat: (value: boolean) => void;
  calculateResults: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  gender,
  setGender,
  age,
  setAge,
  weight,
  setWeight,
  height,
  setHeight,
  bodyFatPercentage,
  setBodyFatPercentage,
  formula,
  setFormula,
  activityLevel,
  setActivityLevel,
  goal,
  setGoal,
  measurementUnit,
  setMeasurementUnit,
  heightFt,
  setHeightFt,
  heightIn,
  setHeightIn,
  includeBodyFat,
  setIncludeBodyFat,
  calculateResults,
}) => {
  // State for input errors
  const [errors, setErrors] = useState<{
    age?: string;
    weight?: string;
    height?: string;
    heightFt?: string;
    heightIn?: string;
  }>({});

  // Handle form inputs
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAge(value);
      setErrors({ ...errors, age: undefined });
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWeight(value);
      setErrors({ ...errors, weight: undefined });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setHeight(value);
      setErrors({ ...errors, height: undefined });
    }
  };

  const handleHeightFtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setHeightFt(value);
      setErrors({ ...errors, heightFt: undefined });
    }
  };

  const handleHeightInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value < 12) {
      setHeightIn(value);
      setErrors({ ...errors, heightIn: undefined });
    }
  };

  const handleBodyFatChange = (value: number[]) => {
    setBodyFatPercentage(value[0]);
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Age validation
    if (age < 15 || age > 100) {
      newErrors.age = 'Age should be between 15-100 years for accurate results';
    }
    
    // Weight validation
    if (measurementUnit === 'metric') {
      if (weight < 30 || weight > 250) {
        newErrors.weight = 'Weight should be between 30-250 kg for accurate results';
      }
    } else {
      if (weight < 66 || weight > 550) {
        newErrors.weight = 'Weight should be between 66-550 lbs for accurate results';
      }
    }
    
    // Height validation
    if (measurementUnit === 'metric') {
      if (height < 100 || height > 250) {
        newErrors.height = 'Height should be between 100-250 cm for accurate results';
      }
    } else {
      const totalInches = (heightFt * 12) + heightIn;
      if (totalInches < 39 || totalInches > 98) {
        newErrors.heightFt = 'Height should be between 3\'3" and 8\'2" for accurate results';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      calculateResults();
    }
  };

  // Update formula if body fat toggle changes
  useEffect(() => {
    if (formula === 'katch' && !includeBodyFat) {
      setFormula('mifflin');
    }
  }, [includeBodyFat, formula, setFormula]);

  return (
    <Card className="shadow-md animate-fade-in">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Calculate Your BMR</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="mb-6">
              <Label className="mb-2 block">Gender</Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
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

            <div className="mb-6">
              <Label htmlFor="age" className="mb-2 block">Age (years)</Label>
              <NumericInput
                id="age"
                value={age.toString()}
                onValueChange={(value) => {
                  setAge(value || 0);
                  setErrors({ ...errors, age: undefined });
                }}
                min={15}
                max={100}
                className={`w-full ${errors.age ? 'border-red-500' : ''}`}
              />
              {errors.age && (
                <div className="flex items-center text-xs text-red-500 mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.age}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">Recommended range: 15-100 years</div>
            </div>

            {/* Height Input */}
            {measurementUnit === 'metric' ? (
              <div className="mb-6">
                <Label htmlFor="height" className="mb-2 block">Height (cm)</Label>
                <NumericInput
                  id="height"
                  value={height.toString()}
                  onValueChange={(value) => {
                    setHeight(value || 0);
                    setErrors({ ...errors, height: undefined });
                  }}
                  min={100}
                  max={250}
                  className={`w-full ${errors.height ? 'border-red-500' : ''}`}
                />
                {errors.height && (
                  <div className="flex items-center text-xs text-red-500 mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.height}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">Recommended range: 100-250 cm</div>
              </div>
            ) : (
              <div className="mb-6">
                <Label className="mb-2 block">Height (ft & in)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <NumericInput
                      id="heightFt"
                      value={heightFt.toString()}
                      onValueChange={(value) => {
                        setHeightFt(value || 0);
                        setErrors({ ...errors, heightFt: undefined });
                      }}
                      min={3}
                      max={8}
                      placeholder="ft"
                      className={`w-full ${errors.heightFt ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <div>
                    <NumericInput
                      id="heightIn"
                      value={heightIn.toString()}
                      onValueChange={(value) => {
                        setHeightIn(value || 0);
                        setErrors({ ...errors, heightIn: undefined });
                      }}
                      min={0}
                      max={11}
                      placeholder="in"
                      className="w-full"
                    />
                  </div>
                </div>
                {errors.heightFt && (
                  <div className="flex items-center text-xs text-red-500 mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.heightFt}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">Recommended range: 3'3" to 8'2"</div>
              </div>
            )}

            {/* Weight Input */}
            <div className="mb-6">
              <Label htmlFor="weight" className="mb-2 block">
                Weight ({measurementUnit === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <NumericInput
                id="weight"
                value={weight.toString()}
                onValueChange={(value) => {
                  setWeight(value || 0);
                  setErrors({ ...errors, weight: undefined });
                }}
                min={measurementUnit === 'metric' ? 30 : 66}
                max={measurementUnit === 'metric' ? 250 : 550}
                className={`w-full ${errors.weight ? 'border-red-500' : ''}`}
              />
              {errors.weight && (
                <div className="flex items-center text-xs text-red-500 mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.weight}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                Recommended range: {measurementUnit === 'metric' ? '30-250 kg' : '66-550 lbs'}
              </div>
            </div>

            {/* Body Fat Percentage Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="includeBodyFat">Include Body Fat %</Label>
                <Switch
                  id="includeBodyFat"
                  checked={includeBodyFat}
                  onCheckedChange={setIncludeBodyFat}
                />
              </div>
              {includeBodyFat && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Body Fat: {bodyFatPercentage}%</span>
                  </div>
                  <Slider
                    value={[bodyFatPercentage]}
                    min={5}
                    max={50}
                    step={0.5}
                    onValueChange={(value) => setBodyFatPercentage(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5%</span>
                    <span>25%</span>
                    <span>50%</span>
                  </div>
                </div>
              )}
            </div>

            {/* BMR Formula Selection */}
            <div className="mb-6">
              <Label className="mb-2 block">BMR Formula</Label>
              <Select 
                value={formula} 
                onValueChange={(value: FormulaType) => setFormula(value)}
                disabled={formula === 'katch' && !includeBodyFat}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mifflin">Mifflin-St Jeor</SelectItem>
                  <SelectItem value="harris">Harris-Benedict</SelectItem>
                  <SelectItem value="katch" disabled={!includeBodyFat}>
                    Katch-McArdle {!includeBodyFat && "(requires body fat %)"}
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground mt-1">
                {formula === 'mifflin' && "Most accurate for general population"}
                {formula === 'harris' && "Classic formula, slightly less accurate for modern populations"}
                {formula === 'katch' && "Most accurate when body fat % is known"}
              </div>
            </div>

            {/* Activity Level Selection */}
            <div className="mb-6">
              <Label className="mb-2 block">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Lightly Active (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Very Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Extremely Active (athletes, 2x/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Goal Selection */}
            <div className="mb-6">
              <Label className="mb-2 block">Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Measurement Unit Selection */}
            <div className="mb-6">
              <Label className="mb-2 block">Measurement System</Label>
              <RadioGroup value={measurementUnit} onValueChange={setMeasurementUnit} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="metric" id="metric" />
                  <Label htmlFor="metric">Metric (kg, cm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="imperial" id="imperial" />
                  <Label htmlFor="imperial">Imperial (lb, ft/in)</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">Calculate</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CalculatorForm; 