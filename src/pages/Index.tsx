
import React from 'react';
import Layout from '@/components/Layout';
import BMICalculator from '@/components/BMICalculator';
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">
            BodyWise BMI Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your Body Mass Index (BMI) and get personalized insights about your health.
          </p>
        </div>

        {/* BMI Calculator Component */}
        <BMICalculator />

        {/* What is BMI Section */}
        <Card className="mb-10">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">What is BMI?</h2>
            <p className="mb-4">
              Body Mass Index (BMI) is a numerical value of your weight in relation to your height. 
              It's a common screening tool used to identify potential weight problems in adults.
            </p>
            <p className="mb-4">
              BMI is calculated by dividing your weight in kilograms by the square of your height in meters, 
              or by using the formula: weight (lb) / [height (in)]² × 703.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">BMI Categories:</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Below 18.5:</span> Underweight</li>
                <li><span className="font-medium">18.5 - 24.9:</span> Normal weight</li>
                <li><span className="font-medium">25.0 - 29.9:</span> Overweight</li>
                <li><span className="font-medium">30.0 - 34.9:</span> Obesity (Class 1)</li>
                <li><span className="font-medium">35.0 - 39.9:</span> Obesity (Class 2)</li>
                <li><span className="font-medium">40.0 and above:</span> Obesity (Class 3)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Health Tips Section */}
        <Card className="mb-10">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Healthy Living Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Eat a variety of fruits, vegetables, whole grains, and lean proteins</li>
                  <li>Limit processed foods, added sugars, and saturated fats</li>
                  <li>Stay hydrated by drinking plenty of water</li>
                  <li>Practice portion control and mindful eating</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Physical Activity</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Aim for at least 150 minutes of moderate aerobic activity per week</li>
                  <li>Include strength training exercises 2-3 times per week</li>
                  <li>Find activities you enjoy to make exercise sustainable</li>
                  <li>Reduce sitting time and incorporate movement throughout your day</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="text-sm text-muted-foreground text-center">
          <p>
            Note: BMI is a screening tool and not a diagnostic of body fatness or health. 
            Consult with healthcare professionals for comprehensive health assessments.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
