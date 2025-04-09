import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  // Handle form inputs
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAge(value);
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWeight(value);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setHeight(value);
    }
  };

  const handleHeightFtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setHeightFt(value);
    }
  };

  const handleHeightInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value < 12) {
      setHeightIn(value);
    }
  };

  const handleBodyFatChange = (value: number[]) => {
    setBodyFatPercentage(value[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateResults();
  };

  return (
    <Card className="shadow-md animate-fade-in">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Calculate Your BMR</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Measurement System Selection */}
          <div className="mb-6">
            <Label className="mb-2 block">Measurement System</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={measurementUnit === 'metric' ? 'default' : 'outline'}
                onClick={() => setMeasurementUnit('metric')}
                className="w-1/2"
              >
                Metric
              </Button>
              <Button
                type="button"
                variant={measurementUnit === 'imperial' ? 'default' : 'outline'}
                onClick={() => setMeasurementUnit('imperial')}
                className="w-1/2"
              >
                Imperial
              </Button>
            </div>
          </div>
          
          {/* Gender Selection */}
          <div className="mb-6">
            <Label className="mb-2 block">Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
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

          {/* Age Input */}
          <div className="mb-6">
            <Label htmlFor="age" className="mb-2 block">Age (years)</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={handleAgeChange}
              min="15"
              max="100"
              className="w-full"
            />
          </div>

          {/* Height Input */}
          {measurementUnit === 'metric' ? (
            <div className="mb-6">
              <Label htmlFor="height" className="mb-2 block">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={handleHeightChange}
                min="100"
                max="250"
                className="w-full"
              />
            </div>
          ) : (
            <div className="mb-6">
              <Label className="mb-2 block">Height (ft & in)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    id="heightFt"
                    type="number"
                    value={heightFt}
                    onChange={handleHeightFtChange}
                    min="3"
                    max="8"
                    placeholder="ft"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    id="heightIn"
                    type="number"
                    value={heightIn}
                    onChange={handleHeightInChange}
                    min="0"
                    max="11"
                    placeholder="in"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Weight Input */}
          <div className="mb-6">
            <Label htmlFor="weight" className="mb-2 block">
              Weight ({measurementUnit === 'metric' ? 'kg' : 'lbs'})
            </Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={handleWeightChange}
              min="30"
              max={measurementUnit === 'metric' ? '250' : '550'}
              step="0.1"
              className="w-full"
            />
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
                  onValueChange={handleBodyFatChange}
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
            <Label htmlFor="formula" className="mb-2 block">BMR Formula</Label>
            <Select value={formula} onValueChange={(value) => setFormula(value as FormulaType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select formula" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mifflin">
                  <div className="flex flex-col">
                    <span>Mifflin-St Jeor</span>
                    <span className="text-xs text-muted-foreground">Most accurate for general population</span>
                  </div>
                </SelectItem>
                <SelectItem value="harris">
                  <div className="flex flex-col">
                    <span>Harris-Benedict</span>
                    <span className="text-xs text-muted-foreground">Traditional formula</span>
                  </div>
                </SelectItem>
                <SelectItem value="katch" disabled={!includeBodyFat}>
                  <div className="flex flex-col">
                    <span>Katch-McArdle {!includeBodyFat && '(Requires Body Fat %)'}</span>
                    <span className="text-xs text-muted-foreground">Best when body fat % is known</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {formula === 'katch' && !includeBodyFat && (
              <p className="text-xs text-red-500 mt-1">Enable body fat % to use Katch-McArdle formula</p>
            )}
          </div>

          {/* Activity Level Selection */}
          <div className="mb-6">
            <Label htmlFor="activityLevel" className="mb-2 block">Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">
                  <div className="flex flex-col">
                    <span>Sedentary</span>
                    <span className="text-xs text-muted-foreground">Little or no exercise</span>
                  </div>
                </SelectItem>
                <SelectItem value="light">
                  <div className="flex flex-col">
                    <span>Lightly Active</span>
                    <span className="text-xs text-muted-foreground">Light exercise 1-3 days/week</span>
                  </div>
                </SelectItem>
                <SelectItem value="moderate">
                  <div className="flex flex-col">
                    <span>Moderately Active</span>
                    <span className="text-xs text-muted-foreground">Moderate exercise 3-5 days/week</span>
                  </div>
                </SelectItem>
                <SelectItem value="active">
                  <div className="flex flex-col">
                    <span>Very Active</span>
                    <span className="text-xs text-muted-foreground">Hard exercise 6-7 days/week</span>
                  </div>
                </SelectItem>
                <SelectItem value="very-active">
                  <div className="flex flex-col">
                    <span>Extremely Active</span>
                    <span className="text-xs text-muted-foreground">Very hard exercise & physical job</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Goal Selection */}
          <div className="mb-6">
            <Label htmlFor="goal" className="mb-2 block">Your Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">
                  <div className="flex flex-col">
                    <span>Weight Loss</span>
                    <span className="text-xs text-muted-foreground">Target a calorie deficit</span>
                  </div>
                </SelectItem>
                <SelectItem value="maintain">
                  <div className="flex flex-col">
                    <span>Maintenance</span>
                    <span className="text-xs text-muted-foreground">Maintain current weight</span>
                  </div>
                </SelectItem>
                <SelectItem value="gain">
                  <div className="flex flex-col">
                    <span>Weight Gain</span>
                    <span className="text-xs text-muted-foreground">Build muscle mass</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Calculate Button */}
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Calculate
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default CalculatorForm; 