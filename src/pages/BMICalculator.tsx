import React, { useState, useEffect } from 'react';
import usePageTitle from '@/hooks/usePageTitle';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NumericInput } from '@/components/ui/NumericInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SEO from '@/components/SEO';
import seoData from '@/data/seoData';
import ToolHeroSection from '@/components/common/ToolHeroSection';
import BMICalculatorComponent from '@/components/BMICalculator';

const BMICalculator = () => {
  usePageTitle('BMI Calculator - Body Index');
  
  // Ensure the page always loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [showError, setShowError] = useState(false);

  const calculateBMI = () => {
    if (height === null || weight === null) {
      setShowError(true);
      return;
    }

    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(Number(calculatedBMI.toFixed(1)));
    
    // Determine BMI category
    if (calculatedBMI < 18.5) {
      setBmiCategory('Underweight');
    } else if (calculatedBMI < 25) {
      setBmiCategory('Normal weight');
    } else if (calculatedBMI < 30) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obese');
    }
  };

  return (
    <Layout>
      <SEO 
        title={seoData.bmiCalculator.title}
        description={seoData.bmiCalculator.description}
        keywords={seoData.bmiCalculator.keywords}
        structuredData={seoData.bmiCalculator.structuredData}
        canonical="https://bodyindex.net/bmi-calculator"
      />
      <div className="max-w-5xl mx-auto px-4">
        <ToolHeroSection 
          title="BMI Calculator"
          description="Calculate your Body Mass Index (BMI) and see where you fall on the BMI chart"
        />
        
        <BMICalculatorComponent />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">BMI Calculator</h1>
            
            <Card className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NumericInput
                  label="Height (cm)"
                  placeholder="Enter height in centimeters"
                  required
                  onValueChange={setHeight}
                />
                <NumericInput
                  label="Weight (kg)"
                  placeholder="Enter weight in kilograms"
                  required
                  onValueChange={setWeight}
                />
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={calculateBMI}
                  className="w-full"
                >
                  Calculate BMI
                </Button>
              </div>

              {showError && (height === null || weight === null) && (
                <p className="text-red-500 text-sm mt-2">
                  Please fill in all required fields
                </p>
              )}

              {bmi !== null && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">Your BMI Result</h2>
                  <p className="text-3xl font-bold text-primary">{bmi}</p>
                  <p className="text-lg mt-2">Category: {bmiCategory}</p>
                </div>
              )}
            </Card>

            <Tabs defaultValue="about" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About BMI</TabsTrigger>
                <TabsTrigger value="categories">BMI Categories</TabsTrigger>
                <TabsTrigger value="tips">Health Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">About BMI</h2>
                  <p className="mb-4">
                    Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
                  </p>
                  <p className="mb-4">
                    While BMI is a useful indicator of healthy body weight, it does have some limitations:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>It may not accurately reflect body fat in athletes or muscular individuals</li>
                    <li>It doesn't account for differences in body composition between ethnic groups</li>
                    <li>It may not be suitable for pregnant women, children, or the elderly</li>
                  </ul>
                </Card>
              </TabsContent>
              
              <TabsContent value="categories">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">BMI Categories</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Underweight</h3>
                      <p>BMI less than 18.5</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Normal weight</h3>
                      <p>BMI between 18.5 and 24.9</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Overweight</h3>
                      <p>BMI between 25 and 29.9</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Obese</h3>
                      <p>BMI 30 or greater</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="tips">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Health Tips</h2>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="underweight">
                      <AccordionTrigger>Tips for Underweight Individuals</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6">
                          <li>Eat more frequent, smaller meals throughout the day</li>
                          <li>Include protein-rich foods in your diet</li>
                          <li>Add healthy fats like avocados and nuts</li>
                          <li>Consider strength training to build muscle mass</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="normal">
                      <AccordionTrigger>Maintaining a Healthy Weight</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6">
                          <li>Maintain a balanced diet with plenty of fruits and vegetables</li>
                          <li>Stay physically active with regular exercise</li>
                          <li>Get adequate sleep</li>
                          <li>Manage stress effectively</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="overweight">
                      <AccordionTrigger>Tips for Overweight Individuals</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6">
                          <li>Focus on portion control</li>
                          <li>Increase physical activity gradually</li>
                          <li>Choose whole, unprocessed foods</li>
                          <li>Stay hydrated and limit sugary drinks</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BMICalculator; 