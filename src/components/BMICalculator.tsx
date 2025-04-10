import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { calculateBMI, getBMICategory, getBMICategoryColor, getHealthRisks, getRecommendations, getIdealWeightRange } from "@/lib/bmi-utils";
import BMIResults from "@/components/BMIResults";
import BMIChart from "@/components/BMIChart";
import AnimatedResults from "@/components/common/AnimatedResults";

const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [bmi, setBMI] = useState<number>(0);
  const [bmiCategory, setBMICategory] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("");
  const [healthRisks, setHealthRisks] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [idealWeightRange, setIdealWeightRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });

  // Ensure the component scrolls to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Min and max limits for inputs
  const limits = {
    metric: {
      weight: { min: 30, max: 250 },
      height: { min: 100, max: 250 }
    },
    imperial: {
      weight: { min: 66, max: 550 },
      heightFt: { min: 3, max: 8 },
      heightIn: { min: 0, max: 11 }
    }
  };

  // Calculate total height in inches for imperial
  const calculateTotalHeightInches = (): number => {
    return (heightFt * 12) + heightIn;
  };

  // Update BMI whenever inputs change
  useEffect(() => {
    let calculatedBMI: number;
    
    if (unit === 'metric') {
      calculatedBMI = calculateBMI(weight, height, 'metric');
    } else {
      const heightInches = calculateTotalHeightInches();
      calculatedBMI = calculateBMI(weight, heightInches, 'imperial');
    }
    
    setBMI(calculatedBMI);
    setBMICategory(getBMICategory(calculatedBMI));
    setCategoryColor(getBMICategoryColor(calculatedBMI));
    setHealthRisks(getHealthRisks(calculatedBMI));
    setRecommendations(getRecommendations(calculatedBMI));
    
    // Calculate ideal weight range
    if (unit === 'metric') {
      setIdealWeightRange(getIdealWeightRange(height, 'metric'));
    } else {
      setIdealWeightRange(getIdealWeightRange(calculateTotalHeightInches(), 'imperial'));
    }
  }, [weight, height, heightFt, heightIn, unit]);

  // Handle weight input change
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      const min = limits[unit].weight.min;
      const max = limits[unit].weight.max;
      if (value >= min && value <= max) {
        setWeight(value);
      }
    }
  };

  // Handle weight slider change
  const handleWeightSliderChange = (value: number[]) => {
    setWeight(value[0]);
  };

  // Handle height input change for metric
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      const min = limits.metric.height.min;
      const max = limits.metric.height.max;
      if (value >= min && value <= max) {
        setHeight(value);
      }
    }
  };

  // Handle height slider change for metric
  const handleHeightSliderChange = (value: number[]) => {
    setHeight(value[0]);
  };

  // Handle feet input change for imperial
  const handleHeightFtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      const min = limits.imperial.heightFt.min;
      const max = limits.imperial.heightFt.max;
      if (value >= min && value <= max) {
        setHeightFt(value);
      }
    }
  };

  // Handle inches input change for imperial
  const handleHeightInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      const min = limits.imperial.heightIn.min;
      const max = limits.imperial.heightIn.max;
      if (value >= min && value <= max) {
        setHeightIn(value);
      }
    }
  };

  // Reset to default values
  const handleReset = () => {
    if (unit === 'metric') {
      setWeight(70);
      setHeight(170);
    } else {
      setWeight(154);
      setHeightFt(5);
      setHeightIn(10);
    }
  };

  // Switch between units
  const handleUnitChange = (value: string) => {
    const newUnit = value as 'metric' | 'imperial';
    if (newUnit !== unit) {
      setUnit(newUnit);
      
      // Convert values when switching units
      if (newUnit === 'metric') {
        // Convert from imperial to metric
        setWeight(Math.round(weight / 2.20462));
        const totalInches = calculateTotalHeightInches();
        setHeight(Math.round(totalInches * 2.54));
      } else {
        // Convert from metric to imperial
        setWeight(Math.round(weight * 2.20462));
        setHeightFt(Math.floor((height / 2.54) / 12));
        setHeightIn(Math.round((height / 2.54) % 12));
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card className="mb-8 shadow-lg border-t-4 border-t-primary">
        <CardContent className="p-6">
          <Tabs defaultValue="metric" className="w-full" onValueChange={handleUnitChange}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">BMI Calculator</h2>
              <TabsList>
                <TabsTrigger value="metric">Metric</TabsTrigger>
                <TabsTrigger value="imperial">Imperial</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="metric" className="space-y-6">
              {/* Weight Input - Metric */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="weight-metric">Weight (kg)</Label>
                  <span className="text-sm text-muted-foreground">
                    {weight} kg
                  </span>
                </div>
                <Slider
                  id="weight-slider-metric"
                  min={limits.metric.weight.min}
                  max={limits.metric.weight.max}
                  step={1}
                  value={[weight]}
                  onValueChange={handleWeightSliderChange}
                  className="mb-2"
                />
                <Input
                  id="weight-metric"
                  type="number"
                  value={weight}
                  onChange={handleWeightChange}
                  min={limits.metric.weight.min}
                  max={limits.metric.weight.max}
                  className="w-full"
                />
              </div>
              
              {/* Height Input - Metric */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="height-metric">Height (cm)</Label>
                  <span className="text-sm text-muted-foreground">
                    {height} cm
                  </span>
                </div>
                <Slider
                  id="height-slider-metric"
                  min={limits.metric.height.min}
                  max={limits.metric.height.max}
                  step={1}
                  value={[height]}
                  onValueChange={handleHeightSliderChange}
                  className="mb-2"
                />
                <Input
                  id="height-metric"
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  min={limits.metric.height.min}
                  max={limits.metric.height.max}
                  className="w-full"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="imperial" className="space-y-6">
              {/* Weight Input - Imperial */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="weight-imperial">Weight (lbs)</Label>
                  <span className="text-sm text-muted-foreground">
                    {weight} lbs
                  </span>
                </div>
                <Slider
                  id="weight-slider-imperial"
                  min={limits.imperial.weight.min}
                  max={limits.imperial.weight.max}
                  step={1}
                  value={[weight]}
                  onValueChange={handleWeightSliderChange}
                  className="mb-2"
                />
                <Input
                  id="weight-imperial"
                  type="number"
                  value={weight}
                  onChange={handleWeightChange}
                  min={limits.imperial.weight.min}
                  max={limits.imperial.weight.max}
                  className="w-full"
                />
              </div>
              
              {/* Height Input - Imperial (feet and inches) */}
              <div className="space-y-2">
                <Label>Height (ft, in)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height-ft" className="text-sm text-muted-foreground mb-1 block">
                      Feet
                    </Label>
                    <Input
                      id="height-ft"
                      type="number"
                      value={heightFt}
                      onChange={handleHeightFtChange}
                      min={limits.imperial.heightFt.min}
                      max={limits.imperial.heightFt.max}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height-in" className="text-sm text-muted-foreground mb-1 block">
                      Inches
                    </Label>
                    <Input
                      id="height-in"
                      type="number"
                      value={heightIn}
                      onChange={handleHeightInChange}
                      min={limits.imperial.heightIn.min}
                      max={limits.imperial.heightIn.max}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={handleReset} className="mr-2">
                Reset
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* BMI Results Component */}
      <AnimatedResults show={bmi > 0} disableAutoScroll={true}>
        <BMIResults 
          bmi={bmi}
          bmiCategory={bmiCategory}
          categoryColor={categoryColor}
          healthRisks={healthRisks}
          recommendations={recommendations}
          idealWeightRange={idealWeightRange}
          unit={unit}
        />
      </AnimatedResults>
      
      {/* BMI Chart/Visual Component */}
      <BMIChart 
        bmi={bmi}
        bmiCategory={bmiCategory}
      />
    </div>
  );
};

export default BMICalculator;
