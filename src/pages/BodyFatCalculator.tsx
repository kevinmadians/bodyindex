
import React from 'react';
import Layout from '@/components/Layout';
import BodyFatCalculatorComponent from '@/components/BodyFatCalculatorComponent';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BodyFatCalculator = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Body Fat Percentage Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estimate your body fat percentage and understand what it means for your health and fitness goals.
          </p>
        </div>

        {/* Body Fat Calculator Component */}
        <BodyFatCalculatorComponent />

        {/* Understanding Body Fat Section */}
        <Card className="mb-10 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Understanding Body Fat Percentage</h2>
            <p className="mb-4 text-base">
              Body fat percentage represents the total mass of fat divided by total body mass. Unlike BMI, it specifically measures 
              the percentage of your body that is made up of fat, providing a more accurate picture of health and fitness.
            </p>
            
            <div className="p-5 bg-muted/50 rounded-lg border mb-6">
              <h3 className="font-bold mb-3 text-lg">Body Fat Categories:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">For Men</h4>
                  <div className="p-3 bg-blue-100 rounded-md">
                    <h5 className="font-semibold text-blue-800">Essential Fat</h5>
                    <p className="text-sm">2-5%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-md">
                    <h5 className="font-semibold text-green-800">Athletic</h5>
                    <p className="text-sm">6-13%</p>
                  </div>
                  <div className="p-3 bg-teal-100 rounded-md">
                    <h5 className="font-semibold text-teal-800">Fitness</h5>
                    <p className="text-sm">14-17%</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-md">
                    <h5 className="font-semibold text-yellow-800">Average</h5>
                    <p className="text-sm">18-24%</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-md">
                    <h5 className="font-semibold text-orange-800">Overweight</h5>
                    <p className="text-sm">25-30%</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-md">
                    <h5 className="font-semibold text-red-800">Obese</h5>
                    <p className="text-sm">31%+</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">For Women</h4>
                  <div className="p-3 bg-blue-100 rounded-md">
                    <h5 className="font-semibold text-blue-800">Essential Fat</h5>
                    <p className="text-sm">10-13%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-md">
                    <h5 className="font-semibold text-green-800">Athletic</h5>
                    <p className="text-sm">14-20%</p>
                  </div>
                  <div className="p-3 bg-teal-100 rounded-md">
                    <h5 className="font-semibold text-teal-800">Fitness</h5>
                    <p className="text-sm">21-24%</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-md">
                    <h5 className="font-semibold text-yellow-800">Average</h5>
                    <p className="text-sm">25-31%</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-md">
                    <h5 className="font-semibold text-orange-800">Overweight</h5>
                    <p className="text-sm">32-37%</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-md">
                    <h5 className="font-semibold text-red-800">Obese</h5>
                    <p className="text-sm">38%+</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Methods Section */}
        <Card className="mb-10 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Body Fat Measurement Methods</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v1.5a1 1 0 0 1-2 0v-1.5a1 1 0 0 1 2 0zm0 4v4.75a1 1 0 0 1-2 0V8.75a1 1 0 0 1 2 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Navy Method</h3>
                </div>
                <p>
                  The Navy Method uses a tape measure to determine body fat percentage. It measures the circumference of specific body parts and uses a formula to calculate body fat percentage. This method is what our calculator uses.
                </p>
                <p className="text-sm text-muted-foreground">
                  Accuracy level: Moderate (±3-4%)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v1.5a1 1 0 0 1-2 0v-1.5a1 1 0 0 1 2 0zm0 4v4.75a1 1 0 0 1-2 0V8.75a1 1 0 0 1 2 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Skinfold Calipers</h3>
                </div>
                <p>
                  Measures the thickness of skinfolds at various sites on the body. The measurements are then used with specific formulas to calculate body fat percentage.
                </p>
                <p className="text-sm text-muted-foreground">
                  Accuracy level: Good (±3%) when performed by a trained professional
                </p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:shadow-md transition-all">
                <h4 className="font-medium mb-2 text-primary">DEXA Scan</h4>
                <p className="text-sm">
                  Dual-energy X-ray absorptiometry (DEXA) is considered one of the most accurate methods. It uses X-rays to scan the entire body and measures fat, lean mass, and bone density.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Accuracy level: Very high (±1-2%)
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-all">
                <h4 className="font-medium mb-2 text-primary">Hydrostatic Weighing</h4>
                <p className="text-sm">
                  Involves being completely submerged in water and measuring the volume of water displaced. This method is based on the principle that fat floats while muscle sinks.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Accuracy level: High (±1.5-2%)
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-all">
                <h4 className="font-medium mb-2 text-primary">Bioelectrical Impedance</h4>
                <p className="text-sm">
                  Sends a small electrical current through the body and measures the resistance. Since fat conducts electricity poorly compared to muscle, the resistance can be used to estimate body fat.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Accuracy level: Variable (±3-8% depending on the device)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-10 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">How often should I measure my body fat percentage?</h3>
                <p>
                  For general health tracking, measuring body fat percentage every 4-6 weeks is sufficient. More frequent measurements might not show significant changes and can be discouraged as daily fluctuations are normal.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Is body fat percentage more accurate than BMI?</h3>
                <p>
                  Yes, body fat percentage is generally a more accurate indicator of health than BMI. BMI doesn't distinguish between fat and muscle, so athletic individuals with high muscle mass may be incorrectly classified as overweight using BMI alone.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">How can I reduce my body fat percentage?</h3>
                <p>
                  Reducing body fat percentage typically involves a combination of regular exercise (both cardiovascular and strength training), a balanced diet with a moderate caloric deficit, adequate protein intake, proper hydration, and sufficient sleep. The most effective approach varies by individual.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Why is some body fat essential?</h3>
                <p>
                  Essential body fat is necessary for normal physiological functioning. It plays crucial roles in hormone regulation, vitamin absorption, body temperature regulation, and organ protection. Men need at least 2-5% essential fat, while women need 10-13% for proper hormonal function and reproductive health.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
          <p className="mb-2 font-medium">
            <strong>Medical Disclaimer:</strong> This calculator is for informational purposes only.
          </p>
          <p>
            The body fat percentage calculator provides an estimate and should not be used as a medical diagnosis. 
            Various factors can affect the accuracy of the calculation. Consult with healthcare professionals for comprehensive health assessments.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BodyFatCalculator;
