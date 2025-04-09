import React from 'react';
import Layout from '@/components/Layout';
import { BPCalculator } from '@/components/blood-pressure/BPCalculator';
import usePageTitle from '@/hooks/usePageTitle';
import ToolHeroSection from '@/components/common/ToolHeroSection';

const BloodPressureChecker = () => {
  usePageTitle('Blood Pressure Checker - Body Index');

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ToolHeroSection 
          title="Blood Pressure Checker"
          description="Monitor your blood pressure readings, track changes over time, and get personalized recommendations."
        />
        
        <BPCalculator />
        
        {/* Disclaimer */}
        <div className="mt-10 text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
          <p className="mb-2 font-medium">
            <strong>Medical Disclaimer:</strong> This blood pressure tool is for informational purposes only.
          </p>
          <p>
            This tool does not provide medical advice, diagnosis, or treatment. The measurements and recommendations provided 
            are based on general guidelines. Consult with a healthcare professional for proper interpretation of your blood 
            pressure readings and before making any health-related decisions. If you experience symptoms of hypertensive crisis, 
            seek immediate medical attention.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BloodPressureChecker; 