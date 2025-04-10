import React from 'react';
import Layout from '@/components/Layout';
import { MacroCalculatorComponent } from '@/components/macro-calculator/MacroCalculatorComponent';
import usePageTitle from '@/hooks/usePageTitle';
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ToolHeroSection from '@/components/common/ToolHeroSection';
import SEO from '@/components/SEO';

const MacroCalculator = () => {
  usePageTitle('Macro Calculator - Body Index');

  return (
    <Layout>
      <SEO 
        title="Macro Calculator - Calculate Your Daily Macronutrients | Body Index"
        description="Calculate your optimal daily protein, carbs, and fat intake with our improved macro calculator. Features required field validation for accurate results based on your body stats and fitness goals."
        keywords="macro calculator, macronutrient calculator, nutrition calculator, protein intake, carbs calculation, fat ratio, required fields, TDEE calculator, meal planning, nutrition planning, fitness calculator"
        canonical="https://bodyindex.net/macro-calculator"
        structuredData={{
          "@type": "SoftwareApplication",
          "name": "Body Index Macro Calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "156"
          }
        }}
      />
      <div className="max-w-5xl mx-auto px-4">
        <ToolHeroSection 
          title="Macro Calculator"
          description="Calculate your optimal macronutrient intake based on your fitness goals, body composition, and activity level"
        />

        {/* Main Calculator Component */}
        <MacroCalculatorComponent />

        {/* Understanding Macros Section */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Understanding Macronutrients</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-[#4F46E5]/5">
                <h3 className="text-xl font-semibold mb-3 text-[#4F46E5]">Protein</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Essential for muscle repair and growth, immune function, enzyme production, and more.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calories per gram:</span>
                    <span className="font-semibold">4 calories</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Primary function:</span>
                    <span className="font-semibold">Building & Repair</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Good sources:</span>
                    <span className="font-semibold">Meat, fish, eggs, dairy</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-[#06B6D4]/5">
                <h3 className="text-xl font-semibold mb-3 text-[#06B6D4]">Carbohydrates</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Your body's preferred energy source, especially for high-intensity activities and brain function.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calories per gram:</span>
                    <span className="font-semibold">4 calories</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Primary function:</span>
                    <span className="font-semibold">Energy & Fuel</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Good sources:</span>
                    <span className="font-semibold">Grains, potatoes, fruits</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-[#14B8A6]/5">
                <h3 className="text-xl font-semibold mb-3 text-[#14B8A6]">Fat</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Crucial for hormone production, cell membrane integrity, vitamin absorption, and long-term energy.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calories per gram:</span>
                    <span className="font-semibold">9 calories</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Primary function:</span>
                    <span className="font-semibold">Hormones & Protection</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Good sources:</span>
                    <span className="font-semibold">Oils, nuts, avocados</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-lg font-semibold mb-3">The Importance of Macronutrient Balance</h3>
              <p className="text-gray-700 mb-4">
                While counting calories is important for weight management, the distribution of those calories between protein, carbohydrates, and fat plays a crucial role in:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Supporting muscle growth and preservation</li>
                <li>Providing sustained energy for workouts and daily activities</li>
                <li>Maintaining hormone balance and metabolic health</li>
                <li>Optimizing recovery after exercise</li>
                <li>Supporting immune function and overall health</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are macronutrients?</AccordionTrigger>
                <AccordionContent>
                  Macronutrients (or "macros") are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fat. Each macro provides energy (calories) and plays specific roles in your body's functions. Protein contains 4 calories per gram, carbohydrates contain 4 calories per gram, and fat contains 9 calories per gram.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How accurate is this calculator?</AccordionTrigger>
                <AccordionContent>
                  While our calculator provides evidence-based estimates based on established formulas, individual metabolism can vary. The calculator offers a starting point—monitor your results over 2-3 weeks and adjust your intake if needed. Including your body fat percentage will increase accuracy.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Should I follow these macros exactly?</AccordionTrigger>
                <AccordionContent>
                  Think of these recommendations as targets rather than strict rules. Aim to get within 5-10g of your protein and fat targets, and use carbs to fill in the rest of your calories. It's typically more important to hit your overall calorie goal and protein target than to hit every macro precisely.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How often should I recalculate my macros?</AccordionTrigger>
                <AccordionContent>
                  Recalculate your macros whenever your weight changes by more than 5-10 pounds, your activity level changes significantly, or you change your fitness goals. Otherwise, reassessing every 8-12 weeks is a good practice to ensure your nutrition plan is still aligned with your needs.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I track my macros?</AccordionTrigger>
                <AccordionContent>
                  The easiest way to track macros is using a food tracking app like MyFitnessPal, Cronometer, or MacroFactor. These apps let you log food and show your macro totals. Many also scan barcodes for quick logging. For accuracy, use a food scale to weigh portions until you're comfortable estimating serving sizes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Practical Tips Section */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Practical Macro Tracking Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Start by tracking without changing your diet to establish a baseline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Invest in a digital food scale for accurate measurements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Prepare meals at home to better control ingredients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Plan meals ahead to make hitting your targets easier</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Building Good Habits</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Focus on protein first in each meal planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Create a collection of go-to meals with known macros</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Plan indulgences into your daily targets rather than avoiding them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Consider weekly averages rather than stressing about daily perfection</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Common Macro-Friendly Foods</h3>
                <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-medium text-primary mb-1">Protein</h4>
                    <ul className="space-y-1">
                      <li>Chicken breast</li>
                      <li>Greek yogurt</li>
                      <li>Egg whites</li>
                      <li>Lean beef</li>
                      <li>Whey protein</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">Carbs</h4>
                    <ul className="space-y-1">
                      <li>Rice</li>
                      <li>Potatoes</li>
                      <li>Oats</li>
                      <li>Fruits</li>
                      <li>Whole grains</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">Fats</h4>
                    <ul className="space-y-1">
                      <li>Avocado</li>
                      <li>Nuts</li>
                      <li>Olive oil</li>
                      <li>Nut butters</li>
                      <li>Fatty fish</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">For Special Situations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Eating out:</strong> Look up restaurant nutrition info in advance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Travel:</strong> Pack protein bars and portable, macro-friendly snacks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Social events:</strong> Save some macros for unexpected foods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Plateaus:</strong> Re-evaluate your calculations as you lose/gain weight</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30 mb-8">
          <p className="mb-2 font-medium">
            <strong>Disclaimer:</strong> This calculator provides estimates based on general formulas.
          </p>
          <p>
            Individual nutritional needs may vary. Consult with a healthcare professional or registered dietitian 
            before making significant changes to your diet, especially if you have any medical conditions.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MacroCalculator; 