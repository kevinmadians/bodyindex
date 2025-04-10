import React from 'react';
import Layout from '@/components/Layout';
import BMICalculator from '@/components/BMICalculator';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import usePageTitle from '@/hooks/usePageTitle';
import SEO from '@/components/SEO';
import seoData from '@/data/seoData';
// import ToolHeroSection from '@/components/common/ToolHeroSection';

const Index = () => {
  usePageTitle('BMI Calculator - Body Index');

  return (
    <Layout>
      <SEO 
        title={seoData.bmiCalculator.title}
        description={seoData.bmiCalculator.description}
        keywords={seoData.bmiCalculator.keywords}
        canonical="https://bodyindex.net/bmi-calculator"
        structuredData={seoData.bmiCalculator.structuredData}
      />
      
      <div className="max-w-5xl mx-auto">
        {/* Direct implementation of hero section with enhanced styling */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Body Mass Index (BMI) Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) and get personalized insights about your health.
          </p>
        </div>

        {/* BMI Calculator Component */}
        <BMICalculator />

        {/* What is BMI Section - Enhanced */}
        <Card className="mb-10 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Understanding BMI</h2>
            <p className="mb-4 text-base">
              Body Mass Index (BMI) is a numerical value derived from your weight and height. It provides a simple way to categorize 
              individuals as underweight, normal weight, overweight, or obese.
            </p>
            <p className="mb-6">
              BMI is calculated by dividing your weight in kilograms by the square of your height in meters:
            </p>
            
            <div className="p-5 bg-muted rounded-lg mb-6 text-center">
              <p className="font-bold text-lg mb-2">BMI = Weight (kg) ÷ Height² (m²)</p>
              <p className="text-sm text-muted-foreground">or</p>
              <p className="font-bold text-lg mt-2">BMI = [Weight (lbs) ÷ Height² (in²)] × 703</p>
            </div>
            
            <div className="p-5 bg-muted/50 rounded-lg border mb-6">
              <h3 className="font-bold mb-3 text-lg">BMI Categories:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-100 rounded-md">
                  <h4 className="font-semibold text-blue-800">Underweight</h4>
                  <p className="text-sm">Below 18.5</p>
                </div>
                <div className="p-3 bg-green-100 rounded-md">
                  <h4 className="font-semibold text-green-800">Normal Weight</h4>
                  <p className="text-sm">18.5 - 24.9</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-md">
                  <h4 className="font-semibold text-yellow-800">Overweight</h4>
                  <p className="text-sm">25.0 - 29.9</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-md">
                  <h4 className="font-semibold text-orange-800">Obesity Class 1</h4>
                  <p className="text-sm">30.0 - 34.9</p>
                </div>
                <div className="p-3 bg-orange-200 rounded-md">
                  <h4 className="font-semibold text-orange-900">Obesity Class 2</h4>
                  <p className="text-sm">35.0 - 39.9</p>
                </div>
                <div className="p-3 bg-red-100 rounded-md">
                  <h4 className="font-semibold text-red-800">Obesity Class 3</h4>
                  <p className="text-sm">40.0 or higher</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Tips Section - Enhanced */}
        <Card className="mb-10 shadow-md">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Healthy Living Guidelines</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Nutrition</h3>
                </div>
                <ul className="space-y-3 list-disc pl-12">
                  <li>
                    <span className="font-medium">Balanced Diet:</span> Include a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats
                  </li>
                  <li>
                    <span className="font-medium">Portion Control:</span> Be mindful of serving sizes to avoid overeating
                  </li>
                  <li>
                    <span className="font-medium">Hydration:</span> Drink at least 8 glasses of water daily
                  </li>
                  <li>
                    <span className="font-medium">Limit Processed Foods:</span> Reduce intake of foods high in added sugars, sodium, and unhealthy fats
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Physical Activity</h3>
                </div>
                <ul className="space-y-3 list-disc pl-12">
                  <li>
                    <span className="font-medium">Aerobic Exercise:</span> Aim for at least 150 minutes of moderate-intensity activity per week
                  </li>
                  <li>
                    <span className="font-medium">Strength Training:</span> Include muscle-strengthening activities 2-3 times per week
                  </li>
                  <li>
                    <span className="font-medium">Flexibility:</span> Incorporate stretching exercises to maintain mobility
                  </li>
                  <li>
                    <span className="font-medium">Consistency:</span> Regular activity is more beneficial than occasional intense workouts
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New: FAQ Section */}
        <Card className="mb-10 shadow-md">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Why might BMI not be accurate for everyone?</h3>
                <p>
                  BMI doesn't distinguish between muscle and fat mass. Athletes with high muscle mass may have a high BMI despite low body fat. Similarly, older adults or those with less muscle mass might have a "normal" BMI despite having excess body fat.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">How often should I recalculate my BMI?</h3>
                <p>
                  For general health tracking, checking your BMI every 3-6 months is sufficient. If you're actively working on weight management, monthly calculations can help track progress, but focus on long-term trends rather than small fluctuations.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">What are other health metrics I should track besides BMI?</h3>
                <p>
                  Consider tracking waist circumference, body fat percentage, blood pressure, cholesterol levels, blood glucose, and fitness metrics like endurance and strength. A healthcare provider can help determine which measurements are most relevant for your health status.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer - Enhanced */}
        <div className="text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
          <p className="mb-2 font-medium">
            <strong>Medical Disclaimer:</strong> This calculator is for informational purposes only.
          </p>
          <p>
            BMI is a screening tool and not a diagnostic of body fatness or health. 
            Consult with healthcare professionals for comprehensive health assessments and before making any significant changes to your diet or exercise routine.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
