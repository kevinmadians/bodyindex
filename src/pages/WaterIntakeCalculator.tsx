import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import usePageTitle from '@/hooks/usePageTitle';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Droplet, Info, Trophy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ReactConfetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";
import ToolHeroSection from '@/components/common/ToolHeroSection';
import { NumericInput } from '@/components/ui/NumericInput';
import SEO from '@/components/SEO';
import seoData from '@/data/seoData';

interface WaterIntakeResult {
  dailyIntake: number;
  hourlyBreakdown: number[];
  recommendations: string[];
}

// Achievement Badge Component
const AchievementBadge = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
      >
        <Trophy className="w-6 h-6" />
      </motion.div>
    )}
  </AnimatePresence>
);

// Enhanced Water Level Visualization
const WaterLevelVisualization = ({ percentage }: { percentage: number }) => {
  return (
    <motion.div 
      className="relative w-32 h-32 mx-auto mb-4"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-primary/20 rounded-b-full transition-all duration-500 ease-out"
        style={{ 
          height: `${Math.min(percentage, 100)}%`,
          backgroundColor: `hsl(221, 83%, ${60 + (percentage * 0.2)}%)`,
        }}
        initial={{ height: "0%" }}
        animate={{ height: `${Math.min(percentage, 100)}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Droplet className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-lg font-bold text-primary">{Math.round(percentage)}%</span>
      </motion.div>
      <AchievementBadge isVisible={percentage >= 90} />
    </motion.div>
  );
};

// Daily intake breakdown component
const DailyIntakeBreakdown = ({ hourlyBreakdown }: { hourlyBreakdown: number[] }) => {
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Daily Schedule</h3>
      <div className="grid grid-cols-4 gap-2">
        {hourlyBreakdown.map((amount, index) => {
          const hour = 6 + index; // Assuming day starts at 6 AM
          const isPast = hour <= currentHour;
          const isCurrent = hour === currentHour;
          
          return (
            <div 
              key={hour}
              className={`p-2 rounded-lg text-center ${
                isCurrent ? 'bg-primary text-white' : 
                isPast ? 'bg-primary/10' : 'bg-muted'
              }`}
            >
              <div className="text-sm font-medium">
                {hour % 12 || 12}{hour < 12 ? 'am' : 'pm'}
              </div>
              <div className="text-xs opacity-80">
                {amount.toFixed(2)}L
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced Hydration Status
const HydrationStatus = ({ percentage }: { percentage: number }) => {
  const getStatus = () => {
    if (percentage >= 90) return { status: 'Optimal', color: 'text-green-500', bgColor: 'bg-green-100' };
    if (percentage >= 70) return { status: 'Good', color: 'text-blue-500', bgColor: 'bg-blue-100' };
    if (percentage >= 50) return { status: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
    return { status: 'Need Water', color: 'text-red-500', bgColor: 'bg-red-100' };
  };

  const { status, color, bgColor } = getStatus();

  return (
    <motion.div 
      className="text-center mb-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <h3 className="text-lg font-semibold mb-2">Hydration Status</h3>
      <motion.div 
        className={`text-2xl font-bold ${color} ${bgColor} py-2 px-4 rounded-full inline-block`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {status}
      </motion.div>
    </motion.div>
  );
};

// Urine Color Chart Component
const UrineColorChart = () => {
  const colorGuide = [
    { color: '#FFE168', status: 'Dehydrated', description: 'Drink water immediately' },
    { color: '#DDCD7E', status: 'Under-hydrated', description: 'Increase water intake' },
    { color: '#D3C37E', status: 'Slightly dehydrated', description: 'Drink some water' },
    { color: '#B8C67A', status: 'Normal', description: 'Maintain current intake' },
    { color: '#A3BE7C', status: 'Well hydrated', description: 'Excellent hydration' },
    { color: '#85B682', status: 'Very well hydrated', description: 'Perfect hydration level' },
  ];

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold" style={{ color: '#0FA8BD' }}>Hydration Guide</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Use this chart as a quick reference to check your hydration level based on urine color.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {colorGuide.map((item, index) => (
            <div key={index} className="p-4 rounded-lg border">
              <div 
                className="w-full h-8 rounded-md mb-2" 
                style={{ backgroundColor: item.color }}
              />
              <div className="text-sm font-medium">{item.status}</div>
              <div className="text-xs text-muted-foreground">{item.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// FAQ Component
const FAQ = () => {
  const faqs = [
    {
      question: "How much water should I drink per day?",
      answer: "The ideal amount varies based on factors like weight, activity level, and climate. Our calculator provides a personalized recommendation, but generally, the '8 glasses a day' rule is a good starting point."
    },
    {
      question: "What are signs of dehydration?",
      answer: "Common signs include dark urine, thirst, dry mouth, headache, fatigue, dizziness, and decreased urine output. Severe dehydration may require medical attention."
    },
    {
      question: "Can I drink too much water?",
      answer: "Yes, overhydration (water intoxication) is possible but rare. It occurs when you drink more water than your kidneys can process, typically more than 3-4 liters in a few hours."
    },
    {
      question: "Does coffee or tea count towards daily water intake?",
      answer: "Yes, but moderately. While caffeinated beverages have a mild diuretic effect, they still contribute to your daily fluid intake. However, water remains the best choice for hydration."
    },
    {
      question: "When is the best time to drink water?",
      answer: "Spread your water intake throughout the day. Key times include: upon waking, before/during/after exercise, before meals, and when you feel thirsty. Avoid drinking large amounts right before bed."
    }
  ];

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Quick Tips Component
const QuickTips = () => {
  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Quick Hydration Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <motion.div
            className="p-4 rounded-lg bg-primary/5 flex items-start space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-[#0FA8BD] p-2 rounded-full text-white">1</div>
            <div>
              <h3 className="font-medium mb-1">Set Reminders</h3>
              <p className="text-sm text-muted-foreground">Use phone alerts or apps to remind you to drink water regularly.</p>
            </div>
          </motion.div>
          <motion.div
            className="p-4 rounded-lg bg-primary/5 flex items-start space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-[#0FA8BD] p-2 rounded-full text-white">2</div>
            <div>
              <h3 className="font-medium mb-1">Track Your Intake</h3>
              <p className="text-sm text-muted-foreground">Keep a water bottle marked with time-based goals.</p>
            </div>
          </motion.div>
          <motion.div
            className="p-4 rounded-lg bg-primary/5 flex items-start space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-[#0FA8BD] p-2 rounded-full text-white">3</div>
            <div>
              <h3 className="font-medium mb-1">Enhance Flavor</h3>
              <p className="text-sm text-muted-foreground">Add natural flavors like lemon, cucumber, or mint to your water.</p>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

const WaterIntakeCalculator = () => {
  usePageTitle('Water Intake Calculator - Body Index');
  const resultRef = useRef<HTMLDivElement>(null);
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const prevUnitRef = useRef(weightUnit);
  
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [climate, setClimate] = useState<string>('moderate');
  const [result, setResult] = useState<WaterIntakeResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (progress >= 90) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Convert weight when unit changes (not when weight itself changes)
  useEffect(() => {
    // Only do conversion if the unit actually changed
    if (weight > 0) {
      if (weightUnit === 'lbs' && prevUnitRef.current === 'kg') {
        // Convert from kg to lbs
        setWeight(Math.round(weight * 2.20462));
      } else if (weightUnit === 'kg' && prevUnitRef.current === 'lbs') {
        // Convert from lbs to kg
        setWeight(Math.round(weight / 2.20462));
      }
    }
    
    // Update ref to current unit
    prevUnitRef.current = weightUnit;
  }, [weightUnit]); // Only depend on weightUnit, not weight

  const activityLevels = {
    sedentary: 'Sedentary (Little to no exercise)',
    light: 'Light (Exercise 1-3 times/week)',
    moderate: 'Moderate (Exercise 3-5 times/week)',
    active: 'Active (Exercise 6-7 times/week)',
    veryActive: 'Very Active (Professional athlete/Physical job)',
  };

  const climateTypes = {
    cold: 'Cold (Below 10°C/50°F)',
    moderate: 'Moderate (10-25°C/50-77°F)',
    warm: 'Warm (25-30°C/77-86°F)',
    hot: 'Hot (Above 30°C/86°F)',
  };

  const calculateWaterIntake = () => {
    // Validate inputs
    if (!weight || weight <= 0) {
      toast({
        title: "Missing weight",
        description: "Please enter a valid weight value",
        variant: "destructive"
      });
      return;
    }

    if ((weightUnit === 'kg' && (weight < 30 || weight > 250)) || 
        (weightUnit === 'lbs' && (weight < 66 || weight > 550))) {
      toast({
        title: "Invalid weight",
        description: `Please enter a weight between ${weightUnit === 'kg' ? '30-250 kg' : '66-550 lbs'}`,
        variant: "destructive"
      });
      return;
    }

    // Calculate base water intake based on weight
    const baseIntake = weightUnit === 'kg' 
      ? weight * 0.033 
      : (weight * 0.033) / 2.205;
    
    // Activity level adjustments
    const activityMultipliers = {
      sedentary: 1,
      light: 1.1,
      moderate: 1.2,
      active: 1.3,
      veryActive: 1.4,
    };
    
    // Climate adjustments
    const climateMultipliers = {
      cold: 0.9,
      moderate: 1,
      warm: 1.1,
      hot: 1.2,
    };

    const dailyIntake = baseIntake * 
      activityMultipliers[activityLevel as keyof typeof activityMultipliers] * 
      climateMultipliers[climate as keyof typeof climateMultipliers];

    // Create hourly breakdown (assuming 16 waking hours)
    const hourlyBreakdown = Array(16).fill(dailyIntake / 16);
    
    // Generate recommendations
    const recommendations = [
      "Start your day with a glass of water",
      "Keep a reusable water bottle with you",
      "Set reminders to drink water every hour",
      "Drink water before, during, and after exercise",
      "Have a glass of water with every meal",
    ];
    
    setResult({
      dailyIntake: Math.round(dailyIntake * 100) / 100,
      hourlyBreakdown,
      recommendations,
    });
    
    // Scroll to result after a short delay to ensure rendering
    setTimeout(() => {
      if (resultRef.current) {
        const yOffset = -80; // Offset to ensure the "Your Results" heading is visible
        const element = resultRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 300); // Increased delay to ensure content is rendered
  };

  useEffect(() => {
    if (result) {
      const percentage = (currentIntake / result.dailyIntake) * 100;
      setProgress(Math.min(percentage, 100));
    }
  }, [currentIntake, result]);

  const addWater = (amount: number) => {
    setCurrentIntake(prev => {
      const newIntake = Math.min(prev + amount, result?.dailyIntake || 0);
      const newPercentage = (newIntake / (result?.dailyIntake || 1)) * 100;
      
      // Trigger confetti if crossing 90% threshold
      if (newPercentage >= 90 && (prev / (result?.dailyIntake || 1)) * 100 < 90) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      
      return newIntake;
    });
  };

  return (
    <Layout>
      <SEO 
        title={seoData.waterIntakeCalculator.title}
        description={seoData.waterIntakeCalculator.description}
        keywords={seoData.waterIntakeCalculator.keywords}
        structuredData={seoData.waterIntakeCalculator.structuredData}
        canonical="https://bodyindex.net/water-intake-calculator"
      />
      <div className="max-w-5xl mx-auto">
        <ToolHeroSection 
          title="Water Intake Calculator"
          description="Calculate your daily water needs and track your hydration for optimal health and performance."
        />
        
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={isMobile ? 100 : 200}
            gravity={0.2}
            tweenDuration={isMobile ? 4000 : 6000}
            confettiSource={{
              x: 0,
              y: 0,
              w: windowSize.width,
              h: 0
            }}
            initialVelocityX={isMobile ? { min: -3, max: 3 } : { min: -5, max: 5 }}
            initialVelocityY={isMobile ? { min: 5, max: 15 } : { min: 10, max: 25 }}
            colors={['#4F46E5', '#3B82F6', '#0FA8BD', '#06B6D4', '#14B8A6', '#10B981', '#A3BE7C']}
            wind={0.05}
            friction={0.97}
            onConfettiComplete={() => setShowConfetti(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          />
        )}
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Calculate Your Needs</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label>Weight</Label>
                    <div className="flex gap-4">
                      <NumericInput
                        value={weight.toString()}
                        onValueChange={(value) => {
                          // Allow editing the field freely
                          setWeight(value !== null ? value : 0);
                        }}
                        className="flex-1"
                        placeholder={`Enter weight in ${weightUnit}`}
                        min={weightUnit === 'kg' ? 30 : 66}
                        max={weightUnit === 'kg' ? 250 : 550}
                        error={
                          weight !== 0 && (
                            (weightUnit === 'kg' && (weight < 30 || weight > 250)) || 
                            (weightUnit === 'lbs' && (weight < 66 || weight > 550))
                          ) 
                            ? `Valid range: ${weightUnit === 'kg' ? '30-250 kg' : '66-550 lbs'}` 
                            : undefined
                        }
                        required
                      />
                      <RadioGroup
                        value={weightUnit}
                        onValueChange={(value) => setWeightUnit(value as 'kg' | 'lbs')}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="kg" id="kg" />
                          <Label htmlFor="kg">kg</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="lbs" id="lbs" />
                          <Label htmlFor="lbs">lbs</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Label>Activity Level</Label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(activityLevels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Climate</Label>
                    <Select value={climate} onValueChange={setClimate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(climateTypes).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={calculateWaterIntake} className="w-full">
                    Calculate Water Intake
                  </Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <div ref={resultRef} className="scroll-mt-20">
                <Card className="mb-8 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-primary">Your Results</h2>
                    
                    <div className="space-y-6">
                      <div className="text-center">
                        <WaterLevelVisualization percentage={progress} />
                        <HydrationStatus percentage={progress} />
                        <h3 className="text-lg font-semibold mb-2">Daily Water Intake Goal</h3>
                        <p className="text-3xl font-bold text-primary">
                          {result.dailyIntake.toFixed(1)} Liters
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Today's Progress</h3>
                        <Progress value={progress} className="h-4 mb-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          {currentIntake.toFixed(1)} / {result.dailyIntake.toFixed(1)} L
                        </p>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <Button variant="outline" onClick={() => addWater(0.25)}>
                            + 250ml
                          </Button>
                          <Button variant="outline" onClick={() => addWater(0.5)}>
                            + 500ml
                          </Button>
                          <Button variant="outline" onClick={() => setCurrentIntake(0)}>
                            Reset
                          </Button>
                        </div>
                      </div>

                      <DailyIntakeBreakdown hourlyBreakdown={result.hourlyBreakdown} />

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {result.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <QuickTips />
          
          <UrineColorChart />

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Water Intake Benefits by Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="text-lg font-semibold mb-2">Morning (6-9 AM)</div>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Rehydrates after sleep</li>
                    <li>• Boosts metabolism</li>
                    <li>• Enhances alertness</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="text-lg font-semibold mb-2">Mid-Day (10-2 PM)</div>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Maintains energy levels</li>
                    <li>• Aids digestion</li>
                    <li>• Prevents fatigue</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="text-lg font-semibold mb-2">Afternoon (3-6 PM)</div>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Prevents afternoon slump</li>
                    <li>• Supports concentration</li>
                    <li>• Regulates temperature</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="text-lg font-semibold mb-2">Evening (7-10 PM)</div>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Aids recovery</li>
                    <li>• Supports detoxification</li>
                    <li>• Prepares for sleep</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Why Water Intake Matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Body Functions</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Regulates body temperature</li>
                    <li>• Transports nutrients</li>
                    <li>• Removes waste products</li>
                    <li>• Lubricates joints</li>
                  </ul>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Health Benefits</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Improves brain function</li>
                    <li>• Boosts energy levels</li>
                    <li>• Aids digestion</li>
                    <li>• Promotes healthy skin</li>
                  </ul>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Dehydration Signs</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Dark urine color</li>
                    <li>• Thirst and dry mouth</li>
                    <li>• Fatigue</li>
                    <li>• Headache</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <FAQ />
          
          {/* Disclaimer */}
          <div className="mt-10 text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
            <p className="mb-2 font-medium">
              <strong>Medical Disclaimer:</strong> This water intake calculator is for informational purposes only.
            </p>
            <p>
              Hydration needs vary among individuals based on numerous factors including health conditions and medications.
              The recommended water intake is an estimate and may need adjustment based on your specific circumstances.
              Consult with healthcare professionals for personalized hydration advice, especially if you have kidney
              disease, heart conditions, or are taking medications that affect fluid balance.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WaterIntakeCalculator; 