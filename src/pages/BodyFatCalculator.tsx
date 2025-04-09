import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import usePageTitle from '@/hooks/usePageTitle';
import ToolHeroSection from '@/components/common/ToolHeroSection';
import BodyFatCalculatorRedesigned from '@/components/BodyFatCalculatorRedesigned';

const BodyFatCalculator = () => {
  usePageTitle('Body Fat Calculator - Body Index');

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ToolHeroSection 
          title="Body Fat Calculator" 
          description="Estimate your body fat percentage using multiple methods and get personalized insights about your body composition."
        />

        {/* Body Fat Calculator Component */}
        <BodyFatCalculatorRedesigned />

        <div className="bg-white rounded-lg shadow-md p-6 my-8">
          <h2 className="text-2xl font-bold mb-6">What Your Results Mean</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <h3 className="text-lg font-semibold">Athletic (6-13% M / 14-20% F)</h3>
              </div>
              <p className="text-sm">
                Characterized by defined muscles and minimal fat. Common in competitive athletes, 
                particularly in sports requiring speed, agility, and power. Not sustainable for most people long-term.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#00BCD4] rounded-full flex items-center justify-center text-white font-bold mr-3">
                  F
                </div>
                <h3 className="text-lg font-semibold">Fitness (14-17% M / 21-24% F)</h3>
              </div>
              <p className="text-sm">
                A healthy, sustainable range for active individuals. Muscles are still defined but with 
                a thin layer of fat. This range balances health, aesthetics, and athletic performance.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#F6C70B] rounded-full flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <h3 className="text-lg font-semibold">Average (18-24% M / 25-31% F)</h3>
              </div>
              <p className="text-sm">
                Typical for the general population. Some muscle definition may be visible, but there's 
                a noticeable layer of fat. Not associated with immediate health risks for most people.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-50 rounded-lg p-5 border-l-4 border-primary">
            <h3 className="text-lg font-semibold mb-2">Body Fat vs. BMI</h3>
            <p className="text-sm">
              While BMI (Body Mass Index) is a commonly used metric, body fat percentage provides a more accurate 
              picture of your health. BMI doesn't differentiate between fat and muscle mass, meaning a muscular 
              athlete might be classified as "overweight" despite having low body fat. Body fat percentage directly 
              measures the proportion of fat in your body, giving you more meaningful information about your health 
              and fitness level.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 my-8">
          <h2 className="text-2xl font-bold mb-6">Measurement Methods Explained</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cyan-500 mb-2">Navy Method</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Uses circumference measurements of neck, waist, and hips (for women) to estimate body fat.
              </p>
              
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <div className="flex">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Convenience</span>
                  <div className="flex">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cyan-500 mb-2">BMI Method</h3>
              <p className="text-gray-600 mb-4 text-sm">
                A simplified approach using BMI with adjustments for age and gender.
              </p>
              
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <div className="flex">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Convenience</span>
                  <div className="flex">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cyan-500 mb-2">Skinfold Method</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Uses caliper measurements at specific body sites to estimate subcutaneous fat.
              </p>
              
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <div className="flex">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Convenience</span>
                  <div className="flex">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-500 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-200 mx-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-10 mb-4">Other Professional Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">DEXA Scan (Gold Standard)</h3>
              <p className="text-gray-600 text-sm">
                Uses dual-energy X-ray absorptiometry to provide precise body composition data, including regional fat distribution. Considered the most accurate method available.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Hydrostatic Weighing</h3>
              <p className="text-gray-600 text-sm">
                Based on Archimedes' principle, this method uses underwater weighing to determine body density and calculate fat percentage. Very accurate but requires specialized equipment.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Bioelectrical Impedance (BIA)</h3>
              <p className="text-gray-600 text-sm">
                Sends a small electrical current through the body to measure impedance. Fast and convenient but accuracy can be affected by hydration, recent exercise, and food intake.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Air Displacement (Bod Pod)</h3>
              <p className="text-gray-600 text-sm">
                Uses air displacement to measure body volume and density. More comfortable than hydrostatic weighing with similar accuracy levels.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Understanding Body Fat Percentage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">What is Body Fat Percentage?</h3>
              <p className="text-gray-700 mb-4">
                Body fat percentage is the amount of fat mass in your body compared to your total body weight. It's a more accurate measure of fitness than weight or BMI since it distinguishes between fat and lean mass (muscle, bone, organs, etc.).
              </p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Why It Matters</h3>
              <p className="text-gray-700 mb-2">Maintaining a healthy body fat percentage is important for:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Hormonal balance and metabolic health</li>
                <li>Reduced risk of chronic diseases like diabetes and heart disease</li>
                <li>Improved athletic performance</li>
                <li>Better long-term weight management</li>
                <li>Overall wellness and longevity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Body Fat Distribution</h3>
              <p className="text-gray-700 mb-4">
                Where your body stores fat matters almost as much as how much fat you have. There are two main patterns:
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold">Android (Apple Shape)</h4>
                  <p className="text-sm text-gray-700">
                    Fat concentrated around the abdomen. Associated with higher health risks and metabolic disorders.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold">Gynoid (Pear Shape)</h4>
                  <p className="text-sm text-gray-700">
                    Fat concentrated in the hips and thighs. Generally associated with fewer health risks.
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-bold text-gray-800">Health Tip:</h4>
                <p className="text-sm text-gray-700">
                  Waist circumference is a good indicator of visceral fat around organs, which poses more health risks than subcutaneous fat just beneath the skin.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 my-8">
          <h2 className="text-2xl font-bold mb-6">Tips for Managing Body Fat</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Nutrition Strategy</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Create a moderate calorie deficit (10-15%) for sustainable fat loss</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Prioritize protein intake (1.6-2.2g per kg of body weight)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Focus on whole, minimally processed foods</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Include healthy fats for hormone regulation</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Exercise Approach</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Combine resistance training with cardiovascular exercise</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Prioritize compound movements (squats, deadlifts, etc.)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Include high-intensity interval training (HIIT)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Aim for 150+ minutes of activity weekly</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Lifestyle Factors</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Prioritize quality sleep (7-9 hours nightly)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Manage stress through meditation, yoga, or other techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Stay hydrated (aim for 2-3 liters daily)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Be consistent and patient with your approach</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
          <p className="mb-2 font-medium">
            <strong>Medical Disclaimer:</strong> This body fat calculator is for informational purposes only.
          </p>
          <p>
            Body fat percentage estimates are approximations based on general formulas and may differ from more accurate
            clinical methods. Various factors can affect body composition beyond what this calculator can measure.
            Consult with healthcare professionals before making significant changes to your diet or exercise routine
            based on these results, especially if you have any medical conditions.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BodyFatCalculator;
