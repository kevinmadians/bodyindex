import React, { useState } from 'react';
import { Gender } from '@/types/health';
import { getFrameSize } from '@/utils/idealWeightCalculations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Ruler, Wand2, Zap, ArrowRight, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Ruler className="h-5 w-5 mr-2 text-primary" />
            Enter Your Measurements
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-primary/10 p-1.5 rounded-full">
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
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min="100"
                  max="250"
                  required
                  className="border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40"
                />
                <div className="text-xs text-muted-foreground pl-7">Typical range: 150-190 cm</div>
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
                  <Input
                    id="height-ft"
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    min="3"
                    max="8"
                    required
                    className="border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40"
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
                  <Input
                    id="height-in"
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    min="0"
                    max="11"
                    required
                    className="border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40"
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
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min="18"
                max="120"
                required
                className="border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40"
              />
              <div className="text-xs text-muted-foreground pl-7">Enter your current age (18-120 years)</div>
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
              <Input
                id="wrist"
                type="number"
                value={wristCircumference}
                onChange={(e) => setWristCircumference(Number(e.target.value))}
                min="10"
                max="25"
                step="0.1"
                required
                className="border-primary/20 focus:border-primary transition-colors group-hover:border-primary/40"
              />
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