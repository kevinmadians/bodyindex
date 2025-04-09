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
    if (isNaN(age) || age <= 0 || age > 120) {
      toast({
        title: "Invalid Age",
        description: "Please enter a valid age between 1 and 120",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(restingHeartRate) || restingHeartRate <= 30 || restingHeartRate > 120) {
      toast({
        title: "Invalid Resting Heart Rate",
        description: "Please enter a valid resting heart rate between 30 and 120 bpm",
        variant: "destructive",
      });
      return;
    }

    // Proceed with calculation if validation passes
    const calculatedResults = calculateHeartRateZones(age, restingHeartRate, fitnessLevel);
    setResults(calculatedResults);
    
    // Scroll to results after a short delay to ensure the results are rendered
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
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
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  min="18"
                  max="100"
                />
              </div>
              
              <div>
                <Label htmlFor="restingHeartRate">Resting Heart Rate (bpm)</Label>
                <Input
                  id="restingHeartRate"
                  type="number"
                  value={restingHeartRate}
                  onChange={(e) => setRestingHeartRate(Number(e.target.value))}
                  min="40"
                  max="100"
                />
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
              <Label>Training Goals</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="weight_loss"
                    checked={goals.includes('weight_loss')}
                    onCheckedChange={() => handleGoalChange('weight_loss')}
                  />
                  <Label htmlFor="weight_loss">Weight Loss</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="endurance"
                    checked={goals.includes('endurance')}
                    onCheckedChange={() => handleGoalChange('endurance')}
                  />
                  <Label htmlFor="endurance">Endurance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="performance"
                    checked={goals.includes('performance')}
                    onCheckedChange={() => handleGoalChange('performance')}
                  />
                  <Label htmlFor="performance">Performance</Label>
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

      {results && (
        <div ref={resultsRef} className="scroll-mt-6">
          <HeartRateResultsDisplay 
            results={results}
            fitnessLevel={fitnessLevel}
            goals={goals}
          />
        </div>
      )}

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