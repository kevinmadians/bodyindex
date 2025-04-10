import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, AlertCircle } from "lucide-react";
import { NumericInput } from "@/components/ui/NumericInput";

// Safe default values for human measurements
const SAFE_DEFAULTS = {
  metric: {
    age: 27, // years - average adult age
    height: 170, // cm - average adult height
    weight: 70, // kg - average adult weight
    neck: 35, // cm - average neck circumference
    waist: 80, // cm - average waist circumference
    hip: 95, // cm - average hip circumference
    triceps: 10, // mm
    subscapular: 12, // mm
    suprailiac: 15, // mm
    thigh: 18, // mm
  },
  imperial: {
    age: 27, // years
    height: 67, // inches (5'7")
    weight: 154, // pounds
    neck: 14, // inches
    waist: 31, // inches
    hip: 37, // inches
    triceps: 0.4, // inches
    subscapular: 0.5, // inches
    suprailiac: 0.6, // inches
    thigh: 0.7, // inches
  }
};

interface CalculatorFormProps {
  gender: string;
  setGender: (value: string) => void;
  age: number;
  setAge: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;
  neck: number;
  setNeck: (value: number) => void;
  waist: number;
  setWaist: (value: number) => void;
  hip: number;
  setHip: (value: number) => void;
  measurementUnit: string;
  setMeasurementUnit: (value: string) => void;
  measurementMethod: string;
  setMeasurementMethod: (value: string) => void;
  calculateResults: () => void;
  // Skinfold measurements
  triceps: number;
  setTriceps: (value: number) => void;
  subscapular: number;
  setSubscapular: (value: number) => void;
  suprailiac: number;
  setSuprailiac: (value: number) => void;
  thigh: number;
  setThigh: (value: number) => void;
  // Component state
  isInitialized?: boolean;
  // Results state
  setShowResults: (show: boolean) => void;
}

const CalculatorForm = ({
  gender,
  setGender,
  age,
  setAge,
  height,
  setHeight,
  weight,
  setWeight,
  neck,
  setNeck,
  waist,
  setWaist,
  hip,
  setHip,
  measurementUnit,
  setMeasurementUnit,
  measurementMethod,
  setMeasurementMethod,
  calculateResults,
  triceps,
  setTriceps,
  subscapular,
  setSubscapular,
  suprailiac,
  setSuprailiac,
  thigh,
  setThigh,
  isInitialized,
  setShowResults
}: CalculatorFormProps) => {
  // State for input errors
  const [errors, setErrors] = useState<{
    age?: string;
    weight?: string;
    height?: string;
    neck?: string;
    waist?: string;
    hip?: string;
    triceps?: string;
    subscapular?: string;
    suprailiac?: string;
    thigh?: string;
  }>({});

  // Force check for invalid values and reset them to safe defaults only on init
  useEffect(() => {
    // Only apply default values on first render, not when users are editing
    if (!isInitialized) {
      // Check if height is outside normal range and reset it
      const safeHeight = SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].height;
      if (height < 50 || height > 300) {
        setHeight(safeHeight);
      }
      
      // Reset neck if abnormal
      const safeNeck = SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].neck;
      if (neck < 10 || neck > 100) {
        setNeck(safeNeck);
      }
      
      // Reset waist if abnormal
      const safeWaist = SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].waist;
      if (waist < 40 || waist > 250) {
        setWaist(safeWaist);
      }
    }
  }, [isInitialized, measurementUnit]);

  // Method descriptions for tooltips
  const methodDescriptions = {
    navy: "The Navy Method uses circumference measurements to estimate body fat. It's widely used by the US Navy and is considered accurate for most people.",
    bmi: "The BMI Method estimates body fat based on your BMI, age, and gender. It's simple but less accurate for athletes and older adults.",
    skinfold: "The skinfold method measures subcutaneous fat at specific sites using calipers. It's widely used in fitness assessments."
  };

  // Handle measurement method change
  const handleMethodChange = (method: string) => {
    setMeasurementMethod(method);
    // Hide results when method changes
    setShowResults(false);
    // Clear errors when changing method
    setErrors({});
  };

  // Handle measurement unit change
  const handleUnitChange = (unit: string) => {
    setMeasurementUnit(unit);
    // Hide results when unit changes
    setShowResults(false);
    // Don't automatically override user-entered values
  };

  // Directly set a safe value for height input
  const getSafeHeight = () => {
    // Return the current height value without overriding
    return height.toString();
  };

  // Directly set a safe value for neck input
  const getSafeNeck = () => {
    // Return the current neck value without overriding
    return neck.toString();
  };

  // Directly set a safe value for waist input
  const getSafeWaist = () => {
    // Return the current waist value without overriding
    return waist.toString();
  };

  // Validate inputs before calculation
  const validateInputs = () => {
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
      if (height < 39 || height > 98) {
        newErrors.height = 'Height should be between 39-98 inches for accurate results';
      }
    }
    
    // Navy method specific validations
    if (measurementMethod === 'navy') {
      // Neck validation
      if (measurementUnit === 'metric') {
        if (neck < 20 || neck > 60) {
          newErrors.neck = 'Neck should be between 20-60 cm';
        }
      } else {
        if (neck < 8 || neck > 24) {
          newErrors.neck = 'Neck should be between 8-24 inches';
        }
      }
      
      // Waist validation
      if (measurementUnit === 'metric') {
        if (waist < 50 || waist > 200) {
          newErrors.waist = 'Waist should be between 50-200 cm';
        }
      } else {
        if (waist < 20 || waist > 80) {
          newErrors.waist = 'Waist should be between 20-80 inches';
        }
      }
      
      // Hip validation (only for women)
      if (gender === 'female') {
        if (measurementUnit === 'metric') {
          if (hip < 50 || hip > 200) {
            newErrors.hip = 'Hip should be between 50-200 cm';
          }
        } else {
          if (hip < 20 || hip > 80) {
            newErrors.hip = 'Hip should be between 20-80 inches';
          }
        }
      }
    }
    
    // Skinfold method specific validations
    if (measurementMethod === 'skinfold') {
      // Triceps skinfold validation
      if (measurementUnit === 'metric') {
        if (triceps < 2 || triceps > 100) {
          newErrors.triceps = 'Triceps skinfold should be between 2-100 mm';
        }
      } else {
        if (triceps < 0.08 || triceps > 4) {
          newErrors.triceps = 'Triceps skinfold should be between 0.08-4 inches';
        }
      }
      
      // Subscapular skinfold validation
      if (measurementUnit === 'metric') {
        if (subscapular < 2 || subscapular > 100) {
          newErrors.subscapular = 'Subscapular skinfold should be between 2-100 mm';
        }
      } else {
        if (subscapular < 0.08 || subscapular > 4) {
          newErrors.subscapular = 'Subscapular skinfold should be between 0.08-4 inches';
        }
      }
      
      // Suprailiac skinfold validation
      if (measurementUnit === 'metric') {
        if (suprailiac < 2 || suprailiac > 100) {
          newErrors.suprailiac = 'Suprailiac skinfold should be between 2-100 mm';
        }
      } else {
        if (suprailiac < 0.08 || suprailiac > 4) {
          newErrors.suprailiac = 'Suprailiac skinfold should be between 0.08-4 inches';
        }
      }
      
      // Thigh skinfold validation (only for women)
      if (gender === 'female') {
        if (measurementUnit === 'metric') {
          if (thigh < 2 || thigh > 100) {
            newErrors.thigh = 'Thigh skinfold should be between 2-100 mm';
          }
        } else {
          if (thigh < 0.08 || thigh > 4) {
            newErrors.thigh = 'Thigh skinfold should be between 0.08-4 inches';
          }
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleCalculate = () => {
    if (validateInputs()) {
      calculateResults();
    }
  };

  // Handle gender change
  const handleGenderChange = (value: string) => {
    setGender(value);
    // Hide results when gender changes
    setShowResults(false);
  };

  return (
    <>
      <div className="bg-gray-100 rounded-lg mb-6">
        <div className="grid grid-cols-3 gap-px">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={`py-3 sm:py-4 px-1 sm:px-2 text-center font-medium text-sm sm:text-base ${
                    measurementMethod === 'navy' ? 'bg-primary text-white' : 'text-gray-500'
                  } rounded-l-lg flex items-center justify-center`}
                  onClick={() => handleMethodChange('navy')}
                >
                  <span>Navy Method</span>
                  <InfoIcon className="ml-1 h-4 w-4 hidden sm:inline" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="hidden sm:block">
                <p className="max-w-xs">{methodDescriptions.navy}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={`py-3 sm:py-4 px-1 sm:px-2 text-center font-medium text-sm sm:text-base ${
                    measurementMethod === 'bmi' ? 'bg-primary text-white' : 'text-gray-500'
                  } flex items-center justify-center`}
                  onClick={() => handleMethodChange('bmi')}
                >
                  <span>BMI Method</span>
                  <InfoIcon className="ml-1 h-4 w-4 hidden sm:inline" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="hidden sm:block">
                <p className="max-w-xs">{methodDescriptions.bmi}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={`py-3 sm:py-4 px-1 sm:px-2 text-center font-medium text-sm sm:text-base ${
                    measurementMethod === 'skinfold' ? 'bg-primary text-white' : 'text-gray-500'
                  } rounded-r-lg flex items-center justify-center`}
                  onClick={() => handleMethodChange('skinfold')}
                >
                  <span>Skinfold</span>
                  <span className="hidden sm:inline"> Method</span>
                  <InfoIcon className="ml-1 h-4 w-4 hidden sm:inline" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="hidden sm:block">
                <p className="max-w-xs">{methodDescriptions.skinfold}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Gender</h3>
            <RadioGroup value={gender} onValueChange={handleGenderChange} className="flex space-x-4">
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
            <NumericInput
              id="age"
              value={age.toString()}
              onValueChange={(value) => {
                setAge(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].age);
                setErrors({...errors, age: undefined});
                // Hide results when input changes
                setShowResults(false);
              }}
              min={15}
              max={100}
              className={`bg-gray-50 border-gray-200 ${errors.age ? 'border-red-500' : ''}`}
            />
            {errors.age && (
              <div className="flex items-center text-xs text-red-500 mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.age}
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-1">Recommended range: 15-100 years</div>
          </div>

          <div className="mb-6">
            <Label htmlFor="weight" className="block mb-2">
              Weight ({measurementUnit === 'metric' ? 'kg' : 'lbs'})
            </Label>
            <NumericInput
              id="weight"
              value={weight.toString()}
              onValueChange={(value) => {
                setWeight(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].weight);
                setErrors({...errors, weight: undefined});
              }}
              min={measurementUnit === 'metric' ? 30 : 66}
              max={measurementUnit === 'metric' ? 250 : 550}
              className={`bg-gray-50 border-gray-200 ${errors.weight ? 'border-red-500' : ''}`}
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

          {measurementMethod === 'navy' && (
            <div className="mb-6">
              <Label htmlFor="waist" className="block mb-2">
                Waist Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-1 h-4 w-4 inline text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Measure at the narrowest part of your torso, usually at the level of your navel.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <NumericInput
                id="waist"
                value={getSafeWaist()}
                onValueChange={(value) => {
                  setWaist(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].waist);
                  setErrors({...errors, waist: undefined});
                }}
                min={measurementUnit === 'metric' ? 50 : 20}
                max={measurementUnit === 'metric' ? 200 : 80}
                className={`bg-gray-50 border-gray-200 ${errors.waist ? 'border-red-500' : ''}`}
              />
              {errors.waist && (
                <div className="flex items-center text-xs text-red-500 mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.waist}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                Recommended range: {measurementUnit === 'metric' ? '50-200 cm' : '20-80 inches'}
              </div>
            </div>
          )}

          {measurementMethod === 'skinfold' && (
            <>
              <div className="mb-6">
                <Label htmlFor="triceps" className="block mb-2">
                  Triceps Skinfold ({measurementUnit === 'metric' ? 'mm' : 'inches'})
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="ml-1 h-4 w-4 inline text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Measure at the back of the upper arm, halfway between the shoulder and the elbow.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <NumericInput
                  id="triceps"
                  value={triceps.toString()}
                  onValueChange={(value) => {
                    setTriceps(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].triceps);
                    setErrors({...errors, triceps: undefined});
                  }}
                  min={measurementUnit === 'metric' ? 2 : 0.08}
                  max={measurementUnit === 'metric' ? 100 : 4}
                  className={`bg-gray-50 border-gray-200 ${errors.triceps ? 'border-red-500' : ''}`}
                />
                {errors.triceps && (
                  <div className="flex items-center text-xs text-red-500 mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.triceps}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  Recommended range: {measurementUnit === 'metric' ? '2-100 mm' : '0.08-4 inches'}
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="subscapular" className="block mb-2">
                  Subscapular Skinfold ({measurementUnit === 'metric' ? 'mm' : 'inches'})
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="ml-1 h-4 w-4 inline text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Measure just below your shoulder blade.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <NumericInput
                  id="subscapular"
                  value={subscapular.toString()}
                  onValueChange={(value) => {
                    setSubscapular(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].subscapular);
                    setErrors({...errors, subscapular: undefined});
                  }}
                  min={measurementUnit === 'metric' ? 2 : 0.08}
                  max={measurementUnit === 'metric' ? 100 : 4}
                  className={`bg-gray-50 border-gray-200 ${errors.subscapular ? 'border-red-500' : ''}`}
                />
                {errors.subscapular && (
                  <div className="flex items-center text-xs text-red-500 mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.subscapular}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  Recommended range: {measurementUnit === 'metric' ? '2-100 mm' : '0.08-4 inches'}
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Measurement System</h3>
            <RadioGroup value={measurementUnit} onValueChange={handleUnitChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="metric" id="metric" className="text-primary" />
                <Label htmlFor="metric">Metric (cm, kg, mm)</Label>
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
            <NumericInput
              id="height"
              value={getSafeHeight()}
              onValueChange={(value) => {
                setHeight(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].height);
                setErrors({...errors, height: undefined});
                // Hide results when input changes
                setShowResults(false);
              }}
              min={measurementUnit === 'metric' ? 100 : 39}
              max={measurementUnit === 'metric' ? 250 : 98}
              className={`bg-gray-50 border-gray-200 ${errors.height ? 'border-red-500' : ''}`}
            />
            {errors.height && (
              <div className="flex items-center text-xs text-red-500 mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.height}
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-1">
              Recommended range: {measurementUnit === 'metric' ? '100-250 cm' : '39-98 inches'}
            </div>
          </div>

          {measurementMethod === 'navy' && (
            <div className="mb-6">
              <Label htmlFor="neck" className="block mb-2">
                Neck Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-1 h-4 w-4 inline text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Measure around your neck, just below the Adam's apple.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <NumericInput
                id="neck"
                value={getSafeNeck()}
                onValueChange={(value) => {
                  setNeck(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].neck);
                  setErrors({...errors, neck: undefined});
                }}
                min={measurementUnit === 'metric' ? 20 : 8}
                max={measurementUnit === 'metric' ? 60 : 24}
                className={`bg-gray-50 border-gray-200 ${errors.neck ? 'border-red-500' : ''}`}
              />
              {errors.neck && (
                <div className="flex items-center text-xs text-red-500 mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.neck}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                Recommended range: {measurementUnit === 'metric' ? '20-60 cm' : '8-24 inches'}
              </div>
            </div>
          )}

          {gender === 'female' && measurementMethod === 'navy' && (
            <div className="mb-6">
              <Label htmlFor="hip" className="block mb-2">
                Hip Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-1 h-4 w-4 inline text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Measure around the widest part of your hips.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <NumericInput
                id="hip"
                value={hip.toString()}
                onValueChange={(value) => {
                  setHip(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].hip);
                  setErrors({...errors, hip: undefined});
                }}
                min={measurementUnit === 'metric' ? 50 : 20}
                max={measurementUnit === 'metric' ? 200 : 80}
                className={`bg-gray-50 border-gray-200 ${errors.hip ? 'border-red-500' : ''}`}
              />
              {errors.hip && (
                <div className="flex items-center text-xs text-red-500 mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.hip}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                Recommended range: {measurementUnit === 'metric' ? '50-200 cm' : '20-80 inches'}
              </div>
            </div>
          )}

          {measurementMethod === 'skinfold' && (
            <>
              <div className="mb-6">
                <Label htmlFor="suprailiac" className="block mb-2">
                  Suprailiac Skinfold ({measurementUnit === 'metric' ? 'mm' : 'inches'})
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="ml-1 h-4 w-4 inline text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Measure just above the iliac crest (hip bone).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <NumericInput
                  id="suprailiac"
                  value={suprailiac.toString()}
                  onValueChange={(value) => {
                    setSuprailiac(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].suprailiac);
                    setErrors({...errors, suprailiac: undefined});
                  }}
                  min={measurementUnit === 'metric' ? 2 : 0.08}
                  max={measurementUnit === 'metric' ? 100 : 4}
                  className={`bg-gray-50 border-gray-200 ${errors.suprailiac ? 'border-red-500' : ''}`}
                />
                {errors.suprailiac && (
                  <div className="flex items-center text-xs text-red-500 mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.suprailiac}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  Recommended range: {measurementUnit === 'metric' ? '2-100 mm' : '0.08-4 inches'}
                </div>
              </div>

              {gender === 'female' && (
                <div className="mb-6">
                  <Label htmlFor="thigh" className="block mb-2">
                    Thigh Skinfold ({measurementUnit === 'metric' ? 'mm' : 'inches'})
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="ml-1 h-4 w-4 inline text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Measure at the midpoint of the front thigh.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <NumericInput
                    id="thigh"
                    value={thigh.toString()}
                    onValueChange={(value) => {
                      setThigh(value !== null ? value : SAFE_DEFAULTS[measurementUnit as 'metric' | 'imperial'].thigh);
                      setErrors({...errors, thigh: undefined});
                    }}
                    min={measurementUnit === 'metric' ? 2 : 0.08}
                    max={measurementUnit === 'metric' ? 100 : 4}
                    className={`bg-gray-50 border-gray-200 ${errors.thigh ? 'border-red-500' : ''}`}
                  />
                  {errors.thigh && (
                    <div className="flex items-center text-xs text-red-500 mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.thigh}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    Recommended range: {measurementUnit === 'metric' ? '2-100 mm' : '0.08-4 inches'}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Button 
          onClick={handleCalculate}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          Calculate Body Fat
        </Button>
      </div>
    </>
  );
};

export default CalculatorForm;
