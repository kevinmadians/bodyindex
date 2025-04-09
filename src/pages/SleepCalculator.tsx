import React, { useState, useEffect } from 'react';
import { format, addMinutes, setHours, setMinutes, parseISO } from 'date-fns';
import Layout from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, Clock, Moon, Sun, Bed, Calendar, BarChart, Heart } from 'lucide-react';
import { 
  calculateBedTime, 
  calculateWakeTime, 
  calculateSleepCycles,
  calculateSleepQuality,
  SLEEP_RECOMMENDATIONS,
  SLEEP_STAGES,
  SLEEP_QUALITY_FACTORS
} from '@/lib/sleep-utils';
import SleepCycleChart from '@/components/sleep/SleepCycleChart';
import SleepQualityGauge from '@/components/sleep/SleepQualityGauge';
import usePageTitle from '@/hooks/usePageTitle';
import ToolHeroSection from '@/components/common/ToolHeroSection';

const SleepCalculator = () => {
  usePageTitle('Sleep Calculator - Body Index');

  // State for bedtime calculator
  const [calculatorMode, setCalculatorMode] = useState<'wake-up' | 'bedtime'>('wake-up');
  const [wakeUpTime, setWakeUpTime] = useState('07:30');
  const [bedTime, setBedTime] = useState('23:00');
  const [results, setResults] = useState<Date[]>([]);
  const [cycleResults, setCycleResults] = useState<any[]>([]);
  
  // State for sleep quality assessment
  const [ageGroup, setAgeGroup] = useState('Adult (26-64 years)');
  const [sleepDuration, setSleepDuration] = useState(7.5);
  const [consistency, setConsistency] = useState(7);
  const [wakeups, setWakeups] = useState(1);
  const [environment, setEnvironment] = useState(8);
  const [feeling, setFeeling] = useState(7);
  const [qualityResults, setQualityResults] = useState<any>(null);
  
  // Calculate results when inputs change
  useEffect(() => {
    if (calculatorMode === 'wake-up') {
      // Convert wake-up time string to Date
      const [hours, minutes] = wakeUpTime.split(':').map(Number);
      const wakeUpDate = new Date();
      wakeUpDate.setHours(hours, minutes, 0, 0);
      
      // Calculate bedtime options
      const bedTimeOptions = calculateBedTime(wakeUpDate);
      setResults(bedTimeOptions);
      
      // Calculate sleep cycles for the middle option (5 cycles)
      if (bedTimeOptions.length >= 2) {
        const cycles = calculateSleepCycles(bedTimeOptions[1], wakeUpDate);
        setCycleResults(cycles);
      }
    } else {
      // Convert bedtime string to Date
      const [hours, minutes] = bedTime.split(':').map(Number);
      const bedTimeDate = new Date();
      bedTimeDate.setHours(hours, minutes, 0, 0);
      
      // If bedtime is after 8pm, consider it as today, otherwise tomorrow
      if (hours < 20) {
        bedTimeDate.setDate(bedTimeDate.getDate() + 1);
      }
      
      // Calculate wake-up options
      const wakeUpOptions = calculateWakeTime(bedTimeDate);
      setResults(wakeUpOptions);
      
      // Calculate sleep cycles for the middle option (5 cycles)
      if (wakeUpOptions.length >= 2) {
        const cycles = calculateSleepCycles(bedTimeDate, wakeUpOptions[1]);
        setCycleResults(cycles);
      }
    }
  }, [calculatorMode, wakeUpTime, bedTime]);
  
  // Calculate sleep quality when inputs change
  useEffect(() => {
    const quality = calculateSleepQuality({
      duration: sleepDuration,
      consistency,
      wakeups,
      environment,
      feeling,
      ageGroup
    });
    
    setQualityResults(quality);
  }, [sleepDuration, consistency, wakeups, environment, feeling, ageGroup]);
  
  const formatTimeResult = (time: Date) => {
    return format(time, 'h:mm a');
  };
  
  // Get sleep recommendation based on age group
  const recommendation = SLEEP_RECOMMENDATIONS.find(rec => rec.age === ageGroup) || SLEEP_RECOMMENDATIONS[7];
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ToolHeroSection 
          title="Sleep Calculator"
          description="Optimize your sleep schedule, understand your sleep cycles, and improve your overall sleep quality."
        />
        
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Sleep Time Calculator</TabsTrigger>
            <TabsTrigger value="quality">Sleep Quality Assessment</TabsTrigger>
          </TabsList>
          
          {/* Sleep Time Calculator Tab */}
          <TabsContent value="calculator">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Optimal Sleep Time Calculator</h2>
                    <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                      Calculate the ideal times to go to bed or wake up based on sleep cycles. Each sleep cycle takes approximately 90 minutes, and the average person needs 5 cycles per night.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <Button 
                        variant={calculatorMode === 'wake-up' ? "default" : "outline"} 
                        onClick={() => setCalculatorMode('wake-up')}
                        className="flex-1 flex items-center gap-2"
                      >
                        <Sun className="h-4 w-4" />
                        I want to wake up at...
                      </Button>
                      <Button 
                        variant={calculatorMode === 'bedtime' ? "default" : "outline"} 
                        onClick={() => setCalculatorMode('bedtime')}
                        className="flex-1 flex items-center gap-2"
                      >
                        <Moon className="h-4 w-4" />
                        I want to go to bed at...
                      </Button>
                    </div>
                    
                    {calculatorMode === 'wake-up' ? (
                      <div className="mb-8">
                        <Label htmlFor="wakeUpTime" className="mb-4 block text-center text-lg">
                          What time do you want to wake up?
                        </Label>
                        <div className="flex flex-col items-center">
                          <div className="w-full max-w-xs mx-auto bg-background border-2 border-input rounded-xl px-6 py-5 shadow-md">
                            <div className="flex flex-col items-center gap-4">
                              <div className="flex items-center justify-center gap-4">
                                <select 
                                  value={wakeUpTime.split(':')[0]} 
                                  onChange={(e) => {
                                    const [, minutes] = wakeUpTime.split(':');
                                    setWakeUpTime(`${e.target.value}:${minutes}`);
                                  }}
                                  className="text-3xl font-bold text-center bg-transparent border-0 focus:ring-0 appearance-none cursor-pointer w-20"
                                >
                                  {Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i).map(hour => (
                                    <option key={hour} value={hour < 10 ? `0${hour}` : String(hour)}>
                                      {hour}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-3xl font-bold">:</span>
                                <select 
                                  value={wakeUpTime.split(':')[1]} 
                                  onChange={(e) => {
                                    const [hours] = wakeUpTime.split(':');
                                    setWakeUpTime(`${hours}:${e.target.value}`);
                                  }}
                                  className="text-3xl font-bold text-center bg-transparent border-0 focus:ring-0 appearance-none cursor-pointer w-20"
                                >
                                  {Array.from({ length: 4 }, (_, i) => i * 15).map(minute => (
                                    <option key={minute} value={minute < 10 ? `0${minute}` : String(minute)}>
                                      {minute < 10 ? `0${minute}` : minute}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              
                              <div className="flex gap-4 mt-2">
                                <button
                                  type="button"
                                  className={`px-4 py-2 rounded-md text-lg font-medium ${
                                    parseInt(wakeUpTime.split(':')[0]) < 12 
                                      ? 'bg-primary text-white' 
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                  onClick={() => {
                                    const [hours, minutes] = wakeUpTime.split(':');
                                    const hour = parseInt(hours);
                                    if (hour >= 12) {
                                      const newHour = hour - 12;
                                      setWakeUpTime(`${newHour < 10 ? `0${newHour}` : newHour}:${minutes}`);
                                    }
                                  }}
                                >
                                  AM
                                </button>
                                <button
                                  type="button"
                                  className={`px-4 py-2 rounded-md text-lg font-medium ${
                                    parseInt(wakeUpTime.split(':')[0]) >= 12 
                                      ? 'bg-primary text-white' 
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                  onClick={() => {
                                    const [hours, minutes] = wakeUpTime.split(':');
                                    const hour = parseInt(hours);
                                    if (hour < 12) {
                                      const newHour = hour + 12;
                                      setWakeUpTime(`${newHour}:${minutes}`);
                                    }
                                  }}
                                >
                                  PM
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-8">
                        <Label htmlFor="bedTime" className="mb-4 block text-center text-lg">
                          What time do you plan to go to bed?
                        </Label>
                        <div className="flex flex-col items-center">
                          <div className="w-full max-w-xs mx-auto bg-background border-2 border-input rounded-xl px-6 py-5 shadow-md">
                            <div className="flex flex-col items-center gap-4">
                              <div className="flex items-center justify-center gap-4">
                                <select 
                                  value={bedTime.split(':')[0]} 
                                  onChange={(e) => {
                                    const [, minutes] = bedTime.split(':');
                                    setBedTime(`${e.target.value}:${minutes}`);
                                  }}
                                  className="text-3xl font-bold text-center bg-transparent border-0 focus:ring-0 appearance-none cursor-pointer w-20"
                                >
                                  {Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i).map(hour => (
                                    <option key={hour} value={hour < 10 ? `0${hour}` : String(hour)}>
                                      {hour}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-3xl font-bold">:</span>
                                <select 
                                  value={bedTime.split(':')[1]} 
                                  onChange={(e) => {
                                    const [hours] = bedTime.split(':');
                                    setBedTime(`${hours}:${e.target.value}`);
                                  }}
                                  className="text-3xl font-bold text-center bg-transparent border-0 focus:ring-0 appearance-none cursor-pointer w-20"
                                >
                                  {Array.from({ length: 4 }, (_, i) => i * 15).map(minute => (
                                    <option key={minute} value={minute < 10 ? `0${minute}` : String(minute)}>
                                      {minute < 10 ? `0${minute}` : minute}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              
                              <div className="flex gap-4 mt-2">
                                <button
                                  type="button"
                                  className={`px-4 py-2 rounded-md text-lg font-medium ${
                                    parseInt(bedTime.split(':')[0]) < 12 
                                      ? 'bg-primary text-white' 
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                  onClick={() => {
                                    const [hours, minutes] = bedTime.split(':');
                                    const hour = parseInt(hours);
                                    if (hour >= 12) {
                                      const newHour = hour - 12;
                                      setBedTime(`${newHour < 10 ? `0${newHour}` : newHour}:${minutes}`);
                                    }
                                  }}
                                >
                                  AM
                                </button>
                                <button
                                  type="button"
                                  className={`px-4 py-2 rounded-md text-lg font-medium ${
                                    parseInt(bedTime.split(':')[0]) >= 12 
                                      ? 'bg-primary text-white' 
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                  onClick={() => {
                                    const [hours, minutes] = bedTime.split(':');
                                    const hour = parseInt(hours);
                                    if (hour < 12) {
                                      const newHour = hour + 12;
                                      setBedTime(`${newHour}:${minutes}`);
                                    }
                                  }}
                                >
                                  PM
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Results */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">
                        {calculatorMode === 'wake-up' 
                          ? `You should go to bed at one of these times:` 
                          : `You should wake up at one of these times:`
                        }
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {results.map((time, index) => (
                          <Card key={index} className={`p-4 text-center ${index === 1 ? 'border-primary border-2' : ''}`}>
                            <div className="text-muted-foreground text-sm mb-1">
                              {4 + index} sleep cycles ({(4 + index) * 90 / 60} hours)
                            </div>
                            <div className="text-2xl font-bold">
                              {formatTimeResult(time)}
                            </div>
                            {index === 1 && (
                              <div className="mt-2 text-xs text-primary font-medium">Recommended</div>
                            )}
                          </Card>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>It takes the average person 14 minutes to fall asleep. This has been factored into the calculations.</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sleep Cycle Visualization */}
                  {cycleResults.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">Your Sleep Cycle Visualization</h3>
                      <div className="w-full overflow-x-auto">
                        <SleepCycleChart 
                          cycles={cycleResults} 
                          width={780} 
                          height={300} 
                        />
                      </div>
                      <div className="mt-4 bg-blue-50 p-4 rounded-md text-sm">
                        <p className="text-blue-800">
                          <strong>About this chart:</strong> This visualization shows how you'll progress through different sleep stages during the night. The chart includes NREM stages (light and deep sleep) and REM (dream sleep). A complete sleep cycle typically takes 90 minutes, and healthy sleep consists of 4-6 complete cycles per night.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Sleep Quality Assessment Tab */}
          <TabsContent value="quality">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Sleep Quality Assessment</h2>
                    <p className="text-muted-foreground mb-6">
                      Evaluate your sleep quality based on duration, consistency, disruptions, environment, and how rested you feel upon waking up.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-6">
                          <Label htmlFor="ageGroup" className="mb-2 block">
                            Age Group
                          </Label>
                          <Select value={ageGroup} onValueChange={setAgeGroup}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select age group" />
                            </SelectTrigger>
                            <SelectContent>
                              {SLEEP_RECOMMENDATIONS.map((rec) => (
                                <SelectItem key={rec.age} value={rec.age}>
                                  {rec.age}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-muted-foreground mt-1">
                            Recommended: {recommendation.min}-{recommendation.max} hours
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <Label className="mb-2 block">
                            Sleep Duration: {sleepDuration} hours
                          </Label>
                          <Slider
                            value={[sleepDuration]}
                            min={4}
                            max={12}
                            step={0.5}
                            onValueChange={([value]) => setSleepDuration(value)}
                          />
                        </div>
                        
                        <div className="mb-6">
                          <Label className="mb-2 block">
                            Sleep Schedule Consistency: {consistency}/10
                          </Label>
                          <Slider
                            value={[consistency]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={([value]) => setConsistency(value)}
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            How consistent is your sleep/wake schedule?
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <Label className="mb-2 block">
                            Night Wakeups: {wakeups} times
                          </Label>
                          <Slider
                            value={[wakeups]}
                            min={0}
                            max={5}
                            step={1}
                            onValueChange={([value]) => setWakeups(value)}
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            How many times do you typically wake up during the night?
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <Label className="mb-2 block">
                            Sleep Environment: {environment}/10
                          </Label>
                          <Slider
                            value={[environment]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={([value]) => setEnvironment(value)}
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            How conducive is your bedroom for sleep? (dark, quiet, cool)
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <Label className="mb-2 block">
                            How Rested You Feel: {feeling}/10
                          </Label>
                          <Slider
                            value={[feeling]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={([value]) => setFeeling(value)}
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            How refreshed do you feel upon waking up?
                          </p>
                        </div>
                      </div>
                      
                      {/* Results */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4 text-center">
                          Your Sleep Quality Score
                        </h3>
                        
                        {qualityResults && (
                          <div className="flex flex-col items-center">
                            <SleepQualityGauge score={qualityResults.score} />
                            
                            <div className="mt-4 text-center mb-6">
                              <p className="font-medium">{qualityResults.feedback}</p>
                            </div>
                            
                            <div className="w-full">
                              <h4 className="font-medium mb-2">Score Breakdown</h4>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Sleep Duration</span>
                                    <span>{qualityResults.durationScore}/25</span>
                                  </div>
                                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-primary h-full rounded-full" 
                                      style={{ width: `${(qualityResults.durationScore / 25) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Consistency</span>
                                    <span>{qualityResults.consistencyScore}/25</span>
                                  </div>
                                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-primary h-full rounded-full" 
                                      style={{ width: `${(qualityResults.consistencyScore / 25) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Uninterrupted Sleep</span>
                                    <span>{qualityResults.disruptionScore}/20</span>
                                  </div>
                                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-primary h-full rounded-full" 
                                      style={{ width: `${(qualityResults.disruptionScore / 20) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Sleep Environment</span>
                                    <span>{qualityResults.environmentScore}/15</span>
                                  </div>
                                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-primary h-full rounded-full" 
                                      style={{ width: `${(qualityResults.environmentScore / 15) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Subjective Feeling</span>
                                    <span>{qualityResults.feelingScore}/15</span>
                                  </div>
                                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-primary h-full rounded-full" 
                                      style={{ width: `${(qualityResults.feelingScore / 15) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Sleep Science Section */}
        <div className="mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Sleep Science & Education</h2>
                  <p className="text-muted-foreground mb-6">
                    Learn more about sleep cycles, optimal sleep strategies, and the science behind healthy rest.
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {/* Sleep Cycles */}
                    <AccordionItem value="sleep-cycles">
                      <AccordionTrigger className="text-lg font-medium py-4">
                        Sleep Cycles
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Sleep Cycles Explained</h3>
                            <p className="mb-4 text-muted-foreground">
                              A complete sleep cycle takes approximately 90 minutes and consists of both NREM (Non-Rapid Eye Movement) and REM (Rapid Eye Movement) sleep. During the night, you typically go through 4-6 complete sleep cycles.
                            </p>
                            
                            <div className="space-y-4 mt-6">
                              {SLEEP_STAGES.map((stage, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-md">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium">{stage.name}</h5>
                                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                                      {stage.percentage}% of sleep
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Sleep Cycle Visualization</h3>
                            <div className="relative h-[300px] w-full bg-gray-50 rounded-md p-4 flex items-center justify-center">
                              <div className="w-full h-full relative">
                                <div className="absolute inset-0 flex flex-col">
                                  <div style={{height: '20%'}} className="bg-[#6B7280] opacity-70 border-b border-white p-2">
                                    <span className="text-white text-xs">Awake</span>
                                  </div>
                                  <div style={{height: '15%'}} className="bg-[#60A5FA] opacity-70 border-b border-white p-2">
                                    <span className="text-white text-xs">NREM 1</span>
                                  </div>
                                  <div style={{height: '30%'}} className="bg-[#3B82F6] opacity-70 border-b border-white p-2">
                                    <span className="text-white text-xs">NREM 2</span>
                                  </div>
                                  <div style={{height: '20%'}} className="bg-[#1D4ED8] opacity-70 border-b border-white p-2">
                                    <span className="text-white text-xs">NREM 3</span>
                                  </div>
                                  <div style={{height: '15%'}} className="bg-[#8B5CF6] opacity-70 p-2">
                                    <span className="text-white text-xs">REM</span>
                                  </div>
                                </div>
                                
                                {/* Sleep cycle overlay */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <path 
                                    d="M0,20 C5,20 10,15 15,50 C20,85 25,50 30,30 C35,10 40,75 45,80 C50,85 55,40 60,25 C65,10 70,50 75,75 C80,100 85,50 90,30 C95,10 100,20 100,20" 
                                    fill="none" 
                                    stroke="rgba(79, 70, 229, 0.8)" 
                                    strokeWidth="1.5"
                                  />
                                  <text x="10" y="95" fontSize="3" fill="#4F46E5">Cycle 1</text>
                                  <text x="35" y="95" fontSize="3" fill="#4F46E5">Cycle 2</text>
                                  <text x="60" y="95" fontSize="3" fill="#4F46E5">Cycle 3</text>
                                  <text x="85" y="95" fontSize="3" fill="#4F46E5">Cycle 4</text>
                                </svg>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Why Sleep Cycles Matter</h4>
                              <p className="text-sm text-muted-foreground">
                                Waking up between sleep cycles rather than during deep sleep helps you feel more refreshed and alert. This is why our calculator suggests bedtimes based on complete sleep cycles.
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Brain & Sleep */}
                    <AccordionItem value="brain-sleep">
                      <AccordionTrigger className="text-lg font-medium py-4">
                        Brain & Sleep
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">How Sleep Affects Your Brain</h3>
                            <p className="mb-4 text-muted-foreground">
                              Sleep is essential for cognitive function, memory consolidation, and emotional regulation. During sleep, your brain processes information from the day and forms new neural connections.
                            </p>
                            
                            <div className="space-y-4">
                              <div className="bg-blue-50 p-4 rounded-md">
                                <h4 className="font-medium mb-1">Memory Consolidation</h4>
                                <p className="text-sm text-muted-foreground">
                                  During deep sleep, your brain transfers information from short-term to long-term memory. This process is crucial for learning and retaining new information.
                                </p>
                              </div>
                              
                              <div className="bg-indigo-50 p-4 rounded-md">
                                <h4 className="font-medium mb-1">Emotional Processing</h4>
                                <p className="text-sm text-muted-foreground">
                                  REM sleep helps process emotional experiences and reduce negative emotional responses. Lack of REM sleep can lead to mood disturbances and increased stress reactivity.
                                </p>
                              </div>
                              
                              <div className="bg-purple-50 p-4 rounded-md">
                                <h4 className="font-medium mb-1">Brain Detoxification</h4>
                                <p className="text-sm text-muted-foreground">
                                  During sleep, the glymphatic system clears waste products from the brain, including proteins linked to neurodegenerative diseases like Alzheimer's.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Sleep Hormones & Circadian Rhythm</h3>
                            <div className="mt-2 relative h-[200px] w-full bg-gray-50 rounded-md p-4">
                              <div className="absolute inset-0 p-4">
                                <svg className="w-full h-full" viewBox="0 0 24 10" preserveAspectRatio="none">
                                  {/* Melatonin curve */}
                                  <path 
                                    d="M0,9 C2,9 4,8 6,5 C8,2 10,1 12,1 C14,1 16,2 18,5 C20,8 22,9 24,9" 
                                    fill="none" 
                                    stroke="#8B5CF6" 
                                    strokeWidth="0.2"
                                  />
                                  <text x="12" y="2.5" fontSize="0.7" fill="#8B5CF6" textAnchor="middle">Melatonin</text>
                                  
                                  {/* Cortisol curve */}
                                  <path 
                                    d="M0,1 C2,1 4,2 6,5 C8,8 10,9 12,9 C14,9 16,8 18,5 C20,2 22,1 24,1" 
                                    fill="none" 
                                    stroke="#F59E0B" 
                                    strokeWidth="0.2"
                                  />
                                  <text x="12" y="7.5" fontSize="0.7" fill="#F59E0B" textAnchor="middle">Cortisol</text>
                                  
                                  {/* Time labels */}
                                  <text x="0" y="10" fontSize="0.6" fill="#6B7280">6am</text>
                                  <text x="6" y="10" fontSize="0.6" fill="#6B7280">12pm</text>
                                  <text x="12" y="10" fontSize="0.6" fill="#6B7280">6pm</text>
                                  <text x="18" y="10" fontSize="0.6" fill="#6B7280">12am</text>
                                  <text x="24" y="10" fontSize="0.6" fill="#6B7280" textAnchor="end">6am</text>
                                </svg>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">The Circadian Rhythm</h4>
                              <p className="text-sm text-muted-foreground">
                                Your body's internal clock regulates sleep-wake cycles through hormones like melatonin and cortisol. Melatonin rises in the evening, promoting sleep, while cortisol peaks in the morning, increasing alertness.
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                Disruptions to your circadian rhythm from shift work, jet lag, or irregular sleep schedules can negatively impact sleep quality and overall health.
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Age Recommendations */}
                    <AccordionItem value="age-recommendations">
                      <AccordionTrigger className="text-lg font-medium py-4">
                        Age Recommendations
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2">
                          <h3 className="text-lg font-semibold mb-4">Sleep Duration Recommendations by Age</h3>
                          <p className="mb-4 text-muted-foreground">
                            Sleep needs vary significantly across the lifespan. The National Sleep Foundation recommends these sleep durations:
                          </p>
                          
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Age Group</th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Recommended</th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Appropriate Range</th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Not Recommended</th>
                                </tr>
                              </thead>
                              <tbody>
                                {SLEEP_RECOMMENDATIONS.map((rec, index) => (
                                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-3">{rec.age}</td>
                                    <td className="px-4 py-3 font-medium text-primary">{rec.ideal} hours</td>
                                    <td className="px-4 py-3">{rec.min}-{rec.max} hours</td>
                                    <td className="px-4 py-3 text-gray-500">&lt;{rec.min} or &gt;{rec.max} hours</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h4 className="font-medium mb-2">Why Sleep Needs Change With Age</h4>
                              <p className="text-sm text-muted-foreground">
                                Sleep requirements change throughout life due to developmental needs, hormonal changes, and aging processes. Infants need more sleep for brain development, while older adults often experience changes in sleep architecture that reduce total sleep need.
                              </p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h4 className="font-medium mb-2">Sleep Quality vs. Quantity</h4>
                              <p className="text-sm text-muted-foreground">
                                While meeting the recommended hours is important, sleep quality matters just as much. Factors like sleep continuity, depth of sleep, and proper cycling through sleep stages determine how restorative your sleep is, regardless of total duration.
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Sleep Disorders */}
                    <AccordionItem value="sleep-disorders">
                      <AccordionTrigger className="text-lg font-medium py-4">
                        Sleep Disorders
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2">
                          <h3 className="text-lg font-semibold mb-4">Common Sleep Disorders</h3>
                          <p className="mb-4 text-muted-foreground">
                            If you consistently struggle with sleep despite good habits, you may want to consult a healthcare provider about these common sleep disorders:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h5 className="font-medium mb-1">Insomnia</h5>
                              <p className="text-sm text-muted-foreground">Difficulty falling asleep or staying asleep, even when you have the chance to do so. Can be acute (short-term) or chronic (long-term).</p>
                              <p className="text-sm text-muted-foreground mt-2"><strong>Symptoms:</strong> Trouble falling asleep, waking up during the night, waking too early, daytime fatigue.</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h5 className="font-medium mb-1">Sleep Apnea</h5>
                              <p className="text-sm text-muted-foreground">Breathing repeatedly stops and starts during sleep, causing oxygen deprivation and sleep disruption.</p>
                              <p className="text-sm text-muted-foreground mt-2"><strong>Symptoms:</strong> Loud snoring, gasping for air during sleep, morning headaches, excessive daytime sleepiness.</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h5 className="font-medium mb-1">Restless Legs Syndrome (RLS)</h5>
                              <p className="text-sm text-muted-foreground">Uncomfortable sensations in the legs and an irresistible urge to move them, particularly in the evening.</p>
                              <p className="text-sm text-muted-foreground mt-2"><strong>Symptoms:</strong> Creeping, crawling, or tingling sensations in legs; symptoms worsen at rest and improve with movement.</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h5 className="font-medium mb-1">Narcolepsy</h5>
                              <p className="text-sm text-muted-foreground">A chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep.</p>
                              <p className="text-sm text-muted-foreground mt-2"><strong>Symptoms:</strong> Excessive daytime sleepiness, sudden loss of muscle tone (cataplexy), sleep paralysis, hallucinations when falling asleep.</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">When to Seek Help</h4>
                            <p className="text-sm text-muted-foreground">
                              Consider consulting a sleep specialist or healthcare provider if:
                            </p>
                            <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                              <li>You regularly have trouble falling or staying asleep</li>
                              <li>You experience excessive daytime sleepiness affecting daily activities</li>
                              <li>Your partner notices that you stop breathing during sleep</li>
                              <li>You have persistent, loud snoring</li>
                              <li>You experience unusual behaviors during sleep</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  {/* Disclaimer */}
                  <div className="mt-8 bg-amber-50 border border-amber-200 p-4 rounded-md">
                    <h3 className="text-amber-800 font-semibold mb-2 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Medical Disclaimer
                    </h3>
                    <p className="text-sm text-amber-800">
                      The information provided in this sleep education section is for general informational and educational purposes only. It is not intended as medical advice and should not be used to diagnose, treat, cure, or prevent any disease or sleep disorder.
                    </p>
                    <p className="text-sm text-amber-800 mt-2">
                      Individual sleep needs may vary. If you have persistent sleep problems or suspect you may have a sleep disorder, please consult with a qualified healthcare professional or sleep specialist.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SleepCalculator; 