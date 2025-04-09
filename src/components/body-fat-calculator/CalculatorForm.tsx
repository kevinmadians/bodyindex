import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

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
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
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
  setThigh
}) => {
  // Method descriptions for tooltips
  const methodDescriptions = {
    navy: "The Navy Method uses circumference measurements to estimate body fat. It's widely used by the US Navy and is considered accurate for most people.",
    bmi: "The BMI Method estimates body fat based on your BMI, age, and gender. It's simple but less accurate for athletes and older adults.",
    skinfold: "The skinfold method measures subcutaneous fat at specific sites using calipers. It's widely used in fitness assessments."
  };

  // Handle measurement method change
  const handleMethodChange = (method: string) => {
    setMeasurementMethod(method);
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
              <Input
                id="waist"
                type="number"
                value={waist}
                onChange={(e) => setWaist(parseInt(e.target.value) || 0)}
                className="bg-gray-50 border-gray-200"
              />
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
                <Input
                  id="triceps"
                  type="number"
                  value={triceps}
                  onChange={(e) => setTriceps(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200"
                />
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
                <Input
                  id="subscapular"
                  type="number"
                  value={subscapular}
                  onChange={(e) => setSubscapular(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Measurement System</h3>
            <RadioGroup value={measurementUnit} onValueChange={setMeasurementUnit} className="flex space-x-4">
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
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
              className="bg-gray-50 border-gray-200"
            />
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
              <Input
                id="neck"
                type="number"
                value={neck}
                onChange={(e) => setNeck(parseInt(e.target.value) || 0)}
                className="bg-gray-50 border-gray-200"
              />
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
              <Input
                id="hip"
                type="number"
                value={hip}
                onChange={(e) => setHip(parseInt(e.target.value) || 0)}
                className="bg-gray-50 border-gray-200"
              />
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
                <Input
                  id="suprailiac"
                  type="number"
                  value={suprailiac}
                  onChange={(e) => setSuprailiac(parseInt(e.target.value) || 0)}
                  className="bg-gray-50 border-gray-200"
                />
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
                  <Input
                    id="thigh"
                    type="number"
                    value={thigh}
                    onChange={(e) => setThigh(parseInt(e.target.value) || 0)}
                    className="bg-gray-50 border-gray-200"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Button 
          onClick={calculateResults} 
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          Calculate Body Fat
        </Button>
      </div>
    </>
  );
};

export default CalculatorForm;
