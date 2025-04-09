import React from 'react';
import Layout from '@/components/Layout';
import { HeartRateCalculator as HRCalc } from '@/components/heart-rate-calculator/HeartRateCalculator';
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Heart, Zap, Target, TrendingUp } from 'lucide-react';
import usePageTitle from '@/hooks/usePageTitle';
import ToolHeroSection from '@/components/common/ToolHeroSection';

const HeartRateCalculator = () => {
  usePageTitle('Heart Rate Zone Calculator - Body Index');

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ToolHeroSection 
          title="Heart Rate Zone Calculator" 
          description="Calculate your personalized heart rate zones for optimal training and cardiovascular health."
        />
        
        <HRCalc />

        {/* Understanding Heart Rate Zones Section */}
        <Card className="mt-10 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Understanding Heart Rate Zones</h2>
            <p className="mb-4 text-base">
              Heart rate zones are ranges of heartbeats per minute (bpm) that correspond to different levels of exercise intensity. 
              Training in specific zones can help you achieve different fitness goals, from fat burning to performance improvement.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Heart size={20} />
                  </div>
                  <h3 className="text-lg font-semibold">Zone 1: Very Light (50-60%)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Perfect for warm-ups, cool-downs, and recovery. This zone improves blood circulation and helps with active recovery.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Activity size={20} />
                  </div>
                  <h3 className="text-lg font-semibold">Zone 2: Light (60-70%)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  The fat-burning zone. Improves aerobic capacity and endurance. Most of your training should be in this zone.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <Target size={20} />
                  </div>
                  <h3 className="text-lg font-semibold">Zone 3: Moderate (70-80%)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Improves aerobic capacity and stamina. This zone is great for improving cardiovascular fitness.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Zap size={20} />
                  </div>
                  <h3 className="text-lg font-semibold">Zone 4: Hard (80-90%)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Improves anaerobic threshold and performance. This zone is for high-intensity interval training.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Tips Section */}
        <Card className="mt-10 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Training Tips</h2>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Measuring Your Heart Rate</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Use a heart rate monitor for accurate readings during exercise</li>
                  <li>Measure your resting heart rate first thing in the morning</li>
                  <li>Take multiple readings and use the average for better accuracy</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Training Progression</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Start with lower intensity zones and gradually increase</li>
                  <li>Include a mix of different zones in your training</li>
                  <li>Listen to your body and adjust intensity as needed</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">Recovery</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Include proper warm-up and cool-down periods</li>
                  <li>Allow adequate rest between intense sessions</li>
                  <li>Monitor your recovery heart rate to track fitness progress</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-10 text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
          <p className="mb-2 font-medium">
            <strong>Medical Disclaimer:</strong> This calculator is for informational purposes only.
          </p>
          <p>
            Consult with healthcare professionals before starting any exercise program, especially if you have any medical conditions or concerns.
            The heart rate zones provided are estimates and may need to be adjusted based on individual factors.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HeartRateCalculator; 