import React, { useState } from 'react';
import { Gender } from '@/types/health';
import { getFrameSize } from '@/utils/idealWeightCalculations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Ruler, Wand2, Zap, ArrowRight, User, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NumericInput } from '@/components/ui/NumericInput';

interface CalculatorFormProps {
  onSubmit: (data: {
    height: number;
    gender: Gender;
    age: number;
    bodyFrame: 'small' | 'medium' | 'large';
  }) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onSubmit }) => {
  const [height, setHeight] = useState<number>(170);
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number>(30);
  const [wristCircumference, setWristCircumference] = useState<number>(17);
  const [measurementUnit, setMeasurementUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(7);
  const [errors, setErrors] = useState<{
    height?: string;
    age?: string;
    wrist?: string;
    heightFt?: string;
    heightIn?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (measurementUnit === 'metric') {
      if (height < 150 || height > 220) {
        newErrors.height = 'Height must be between 150-220 cm for accurate results';
      }
    } else {
      const totalInches = (heightFt * 12) + heightIn;
      if (totalInches < 59 || totalInches > 87) {
        newErrors.heightFt = 'Height must be between 4\'11" and 7\'3" for accurate results';
      }
    }

    if (age < 18 || age > 100) {
      newErrors.age = 'Age must be between 18-100 years for accurate results';
    }

    const minWrist = gender === 'male' ? 15 : 14;
    const maxWrist = gender === 'male' ? 19 : 16;
    if (wristCircumference < minWrist || wristCircumference > maxWrist) {
      newErrors.wrist = `Wrist circumference must be between ${minWrist}-${maxWrist} cm for ${gender === 'male' ? 'men' : 'women'}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    let heightInCm = height;
    if (measurementUnit === 'imperial') {
      heightInCm = ((heightFt * 12) + heightIn) * 2.54;
    }
    
    const bodyFrame = getFrameSize(wristCircumference, gender, heightInCm);
    
    onSubmit({
      height: heightInCm,
      gender,
      age,
      bodyFrame
    });
  };

  return (
    <Card className="shadow-md border-t-4 border-t-primary overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Ruler className="h-5 w-5 mr-2 text-primary" />
            Enter Your Measurements
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-primary/10 p-1.5 rounded-full mt-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">We'll calculate your ideal weight using 6 scientific formulas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 bg-muted/20 p-4 rounded-lg transition-colors duration-200 hover:bg-muted/30">
              <Label className="text-base font-medium flex items-center">
                <span className="bg-primary/20 p-1 rounded-full mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </span>
                Measurement System
              </Label>
              <RadioGroup
                value={measurementUnit}
                onValueChange={(value) => setMeasurementUnit(value as 'metric' | 'imperial')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="metric" id="metric" />
                  <Label htmlFor="metric" className="cursor-pointer">Metric (cm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="imperial" id="imperial" />
                  <Label htmlFor="imperial" className="cursor-pointer">Imperial (ft/in)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2 bg-muted/20 p-4 rounded-lg transition-colors duration-200 hover:bg-muted/30">
              <Label className="text-base font-medium flex items-center">
                <span className="bg-primary/20 p-1 rounded-full mr-2">
                  <User className="h-4 w-4 text-primary" />
                </span>
                Gender
              </Label>
              <RadioGroup
                value={gender}
                onValueChange={(value) => setGender(value as Gender)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2 bg-pink-50 px-3 py-2 rounded-lg">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {measurementUnit === 'metric' ? (
              <div className="space-y-2 group">
                <Label htmlFor="height" className="text-base font-medium flex items-center">
                  <span className="bg-primary/20 p-1 rounded-full mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 22v-7"/>
                      <path d="M9 6V3h6v3"/>
                      <path d="M9 12V8h6v4"/>
                      <path d="M9 19v-4h6v4"/>
                    </svg>
                  </span>
                  Height (cm)
                </Label>
                <NumericInput
                  id="height"
                  value={height === 0 ? '' : height.toString()}
                  onValueChange={(value: number | undefined) => {
                    setHeight(value || height);
                    setErrors({ ...errors, height: undefined });
                  }}
                  min={150}
                  max={220}
                  className={`border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40 ${errors.height ? 'border-red-500' : ''}`}
                />
                {errors.height && (
                  <div className="flex items-center text-xs text-red-500 pl-7 mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.height}
                  </div>
                )}
                <div className="text-xs text-muted-foreground pl-7">Recommended range: 150-220 cm</div>
              </div>
            ) : (
              <>
                <div className="space-y-2 group">
                  <Label htmlFor="height-ft" className="text-base font-medium flex items-center">
                    <span className="bg-primary/20 p-1 rounded-full mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M12 22v-7"/>
                        <path d="M9 6V3h6v3"/>
                        <path d="M9 12V8h6v4"/>
                        <path d="M9 19v-4h6v4"/>
                      </svg>
                    </span>
                    Height (feet)
                  </Label>
                  <NumericInput
                    id="height-ft"
                    value={heightFt === 0 ? '' : heightFt.toString()}
                    onValueChange={(value: number | undefined) => {
                      setHeightFt(value || heightFt);
                      setErrors({ ...errors, heightFt: undefined });
                    }}
                    min={3}
                    max={8}
                    placeholder="ft"
                    className={`border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40 ${errors.heightFt ? 'border-red-500' : ''}`}
                  />
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="height-in" className="text-base font-medium flex items-center">
                    <span className="bg-primary/20 p-1 rounded-full mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M12 22v-7"/>
                        <path d="M9 6V3h6v3"/>
                        <path d="M9 12V8h6v4"/>
                        <path d="M9 19v-4h6v4"/>
                      </svg>
                    </span>
                    Height (inches)
                  </Label>
                  <NumericInput
                    id="height-in"
                    value={heightIn === 0 ? '' : heightIn.toString()}
                    onValueChange={(value: number | undefined) => {
                      setHeightIn(value || heightIn);
                      setErrors({ ...errors, heightIn: undefined });
                    }}
                    min={0}
                    max={11}
                    placeholder="in"
                    className={`border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40 ${errors.heightIn ? 'border-red-500' : ''}`}
                  />
                </div>
              </>
            )}

            <div className="space-y-2 group">
              <Label htmlFor="age" className="text-base font-medium flex items-center">
                <span className="bg-primary/20 p-1 rounded-full mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                Age
              </Label>
              <NumericInput
                id="age"
                value={age === 0 ? '' : age.toString()}
                onValueChange={(value: number | undefined) => {
                  setAge(value || age);
                  setErrors({ ...errors, age: undefined });
                }}
                min={18}
                max={100}
                className={`border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40 ${errors.age ? 'border-red-500' : ''}`}
              />
              {errors.age && (
                <div className="flex items-center text-xs text-red-500 pl-7 mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.age}
                </div>
              )}
              <div className="text-xs text-muted-foreground pl-7">Enter your current age (18-100 years)</div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="wrist" className="text-base font-medium flex items-center">
                <span className="bg-primary/20 p-1 rounded-full mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                  </svg>
                </span>
                Wrist Circumference (cm)
              </Label>
              <NumericInput
                id="wrist"
                value={wristCircumference === 0 ? '' : wristCircumference.toString()}
                onValueChange={(value: number | undefined) => {
                  setWristCircumference(value || wristCircumference);
                  setErrors({ ...errors, wrist: undefined });
                }}
                min={gender === 'male' ? 15 : 14}
                max={gender === 'male' ? 19 : 16}
                className={`border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40 ${errors.wrist ? 'border-red-500' : ''}`}
              />
              {errors.wrist && (
                <div className="flex items-center text-xs text-red-500 pl-7 mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.wrist}
                </div>
              )}
              <div className="flex items-center pl-7">
                <p className="text-xs text-muted-foreground">
                  Measure around the wrist bone
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="ml-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-xs max-w-xs">
                        This helps determine your body frame size. Typical values:
                        <br />• Men: 15-19 cm
                        <br />• Women: 14-16 cm
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 transition-all duration-300 px-8 py-6 h-auto group"
            >
              <span className="flex items-center">
                <Wand2 className="h-5 w-5 mr-2" />
                Calculate Ideal Weight
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CalculatorForm; 