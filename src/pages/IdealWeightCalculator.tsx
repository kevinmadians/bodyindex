import React, { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import CalculatorForm from '@/components/ideal-weight-calculator/CalculatorForm';
import ResultsDisplay from '@/components/ideal-weight-calculator/ResultsDisplay';
import { calculateIdealWeight } from '@/utils/idealWeightCalculations';
import { Card, CardContent } from '@/components/ui/card';
import usePageTitle from '@/hooks/usePageTitle';
import ToolHeroSection from '@/components/common/ToolHeroSection';
import { Scale, Heart, Award, ArrowDown, Activity } from 'lucide-react';

const IdealWeightCalculator: React.FC = () => {
  usePageTitle('Ideal Weight Calculator - Body Index');

  const [results, setResults] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [calculating, setCalculating] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (data: {
    height: number;
    gender: 'male' | 'female';
    age: number;
    bodyFrame: 'small' | 'medium' | 'large';
  }) => {
    // Show calculating state
    setCalculating(true);
    setResults(null);

    // Calculate after a short delay for animation effect
    setTimeout(() => {
      const calculatedResults = calculateIdealWeight(
        data.height,
        data.gender,
        data.age,
        data.bodyFrame
      );
      setResults(calculatedResults);
      setUserData(data);
      setCalculating(false);
      
      // Auto-scroll to results section
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }, 600);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ToolHeroSection 
          title="Ideal Weight Calculator"
          description="Discover your ideal weight range based on scientific formulas, body frame size, gender, and age."
          icon={<Scale className="w-8 h-8 text-primary" />}
        />
      
        <div className="mt-2 mb-8 relative">
          <div className="absolute -top-6 left-4 w-16 h-16 bg-primary/10 rounded-full -z-10"></div>
          <div className="absolute top-10 right-8 w-24 h-24 bg-secondary/10 rounded-full -z-10"></div>
          
          <CalculatorForm onSubmit={handleCalculate} />
          
          {calculating && (
            <div className="flex flex-col items-center justify-center py-12 mt-8 animate-pulse">
              <Activity className="w-12 h-12 text-primary mb-4" />
              <p className="text-lg font-semibold">Calculating your ideal weight...</p>
            </div>
          )}
        </div>

        <div ref={resultsRef}>
          {results && userData && (
            <div className="animate-fade-in">
              <ResultsDisplay
                results={results}
                gender={userData.gender}
                age={userData.age}
                height={userData.height}
                bodyFrame={userData.bodyFrame}
              />
            </div>
          )}
        </div>

        <Card className="mt-8 bg-muted/30 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-primary mr-2" />
              <p className="text-sm font-medium">Professional Insight</p>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              This calculator provides estimates based on scientific formulas. Individual results may vary.
              Consult with a healthcare professional before making significant changes to your diet or exercise routine.
            </p>
          </CardContent>
        </Card>

        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Understanding Ideal Weight</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Why your ideal weight matters and what factors influence it</p>
            <div className="flex justify-center mt-4">
              <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-primary/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">What is Ideal Weight?</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Ideal weight refers to an estimated weight range considered healthy for an individual 
                  based on factors like height, gender, age, and body frame. Unlike a single fixed number, 
                  it's better understood as a range where your body can function optimally.
                </p>
                <p className="text-muted-foreground">
                  There are several scientific methods to calculate ideal weight, each with its own 
                  strengths and applications. Our calculator combines multiple methods to give you 
                  a comprehensive understanding of your ideal weight range.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Key Influencing Factors</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    </span>
                    <div>
                      <span className="font-medium">Body Frame Size</span>
                      <p className="text-sm text-muted-foreground">Your skeletal structure affects your ideal weight range</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    </span>
                    <div>
                      <span className="font-medium">Age</span>
                      <p className="text-sm text-muted-foreground">Metabolic changes throughout life influence ideal weight</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    </span>
                    <div>
                      <span className="font-medium">Muscle-to-Fat Ratio</span>
                      <p className="text-sm text-muted-foreground">More muscle mass can mean a higher healthy weight</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    </span>
                    <div>
                      <span className="font-medium">Gender</span>
                      <p className="text-sm text-muted-foreground">Different body compositions between males and females</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-10 text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
          <p className="mb-2 font-medium">
            <strong>Medical Disclaimer:</strong> This calculator is for informational purposes only.
          </p>
          <p>
            The ideal weight estimates are based on general formulas and may not account for all individual factors.
            Consult with healthcare professionals before making significant changes to your diet or exercise routine.
            What constitutes a "healthy" weight varies among individuals based on multiple factors.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default IdealWeightCalculator; 