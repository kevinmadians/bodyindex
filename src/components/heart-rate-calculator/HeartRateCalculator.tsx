import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { calculateHeartRateZones, getTrainingRecommendations, HeartRateResults } from '@/utils/heartRateCalculations';
import { HeartRateResultsDisplay } from './HeartRateResultsDisplay';
import { AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import AnimatedResults from '@/components/common/AnimatedResults';
import { NumericInput } from '@/components/ui/NumericInput';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const HeartRateCalculator = () => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [age, setAge] = useState<number>(30);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(70);
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [goals, setGoals] = useState<string[]>(['weight_loss']);
  const [results, setResults] = useState<HeartRateResults | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleCalculate = () => {
    // Validate inputs
    if (!age || age < 18 || age > 100) {
      toast({
        title: "Invalid Age",
        description: "Please enter a valid age between 18 and 100",
        variant: "destructive",
      });
      return;
    }

    if (!restingHeartRate || restingHeartRate < 40 || restingHeartRate > 120) {
      toast({
        title: "Invalid Resting Heart Rate",
        description: "Please enter a valid resting heart rate between 40 and 120 bpm",
        variant: "destructive",
      });
      return;
    }

    // Proceed with calculation if validation passes
    const calculatedResults = calculateHeartRateZones(age, restingHeartRate, fitnessLevel);
    setResults(calculatedResults);
    
    // Add a small delay before scrolling to results
    setTimeout(() => {
      if (resultsRef.current) {
        const yOffset = -80; // Offset to ensure "Key Heart Rate Metrics" heading is visible
        const element = resultsRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const handleGoalChange = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <NumericInput
                  id="age"
                  value={age === 0 ? '' : age.toString()}
                  onValueChange={(value) => {
                    // Allow empty field or user input
                    setAge(value !== null ? value : 0);
                  }}
                  min={18}
                  max={100}
                  className="bg-gray-50 border-gray-200"
                  error={(age !== 0 && (age < 18 || age > 100)) ? `Age should be between 18-100 years` : undefined}
                  required
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Recommended range: 18-100 years
                </div>
              </div>
              
              <div>
                <Label htmlFor="restingHeartRate">Resting Heart Rate (bpm)</Label>
                <NumericInput
                  id="restingHeartRate"
                  value={restingHeartRate === 0 ? '' : restingHeartRate.toString()}
                  onValueChange={(value) => {
                    // Allow empty field or user input
                    setRestingHeartRate(value !== null ? value : 0);
                  }}
                  min={40}
                  max={120}
                  className="bg-gray-50 border-gray-200"
                  error={(restingHeartRate !== 0 && (restingHeartRate < 40 || restingHeartRate > 120)) ? `Resting heart rate should be between 40-120 bpm` : undefined}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Recommended range: 40-120 bpm
                </div>
              </div>
              
              <div>
                <Label>Fitness Level</Label>
                <Select
                  value={fitnessLevel}
                  onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setFitnessLevel(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fitness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Training Goals (Select all that apply)</Label>
              <div className="space-y-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="weight_loss"
                    checked={goals.includes('weight_loss')}
                    onCheckedChange={() => handleGoalChange('weight_loss')}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="weight-loss" className="cursor-pointer">Weight Loss</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-pointer hidden sm:inline" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Focuses on Zone 2 training (fat burning zone) to optimize calorie burn during workouts.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="endurance"
                    checked={goals.includes('endurance')}
                    onCheckedChange={() => handleGoalChange('endurance')}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="endurance" className="cursor-pointer">Endurance</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-pointer hidden sm:inline" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Emphasizes Zone 2-3 training to build aerobic capacity and cardiovascular endurance.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="performance"
                    checked={goals.includes('performance')}
                    onCheckedChange={() => handleGoalChange('performance')}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="performance" className="cursor-pointer">Performance</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-pointer hidden sm:inline" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Incorporates higher intensity Zone 4-5 training to improve athletic performance and speed.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recovery"
                    checked={goals.includes('recovery')}
                    onCheckedChange={() => handleGoalChange('recovery')}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="recovery" className="cursor-pointer">Active Recovery</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-pointer hidden sm:inline" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Emphasizes Zone 1 training for recovery between harder workouts and injury prevention.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="health"
                    checked={goals.includes('health')}
                    onCheckedChange={() => handleGoalChange('health')}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="health" className="cursor-pointer">General Health</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-pointer hidden sm:inline" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Balanced training across all zones with emphasis on Zone 2 for overall health and wellbeing.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCalculate}
              >
                Calculate Heart Rate Zones
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div ref={resultsRef} className="scroll-mt-20">
        <AnimatedResults show={!!results} disableAutoScroll={true}>
          {results && (
            <HeartRateResultsDisplay 
              results={results}
              fitnessLevel={fitnessLevel}
              goals={goals}
            />
          )}
        </AnimatedResults>
      </div>

      <Alert className="cursor-pointer bg-blue-50" onClick={() => setShowInfo(!showInfo)}>
        <Info className="h-4 w-4" />
        <AlertTitle>How to measure your resting heart rate</AlertTitle>
        <AlertDescription>
          {showInfo ? (
            <div className="mt-2 space-y-2">
              <p>For the most accurate measurement:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Measure first thing in the morning, before getting out of bed</li>
                <li>Count your pulse for 60 seconds</li>
                <li>Repeat for 3-4 days and take the average</li>
                <li>Make sure you're well-rested and haven't consumed caffeine</li>
              </ul>
            </div>
          ) : (
            "Click to learn how to measure your resting heart rate accurately"
          )}
        </AlertDescription>
      </Alert>

      <Alert className="bg-orange-50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          These calculations are estimates. For the most accurate heart rate zones, consider getting a professional assessment or using a heart rate monitor during exercise.
        </AlertDescription>
      </Alert>
    </div>
  );
}; 