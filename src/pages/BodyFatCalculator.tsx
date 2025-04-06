
import React from 'react';
import Layout from '@/components/Layout';
import BodyFatCalculatorRedesigned from '@/components/BodyFatCalculatorRedesigned';

const BodyFatCalculator = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Body Fat Percentage Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estimate your body fat percentage using different methods and get insights about your body composition.
          </p>
        </div>

        {/* Body Fat Calculator Component */}
        <BodyFatCalculatorRedesigned />
      </div>
    </Layout>
  );
};

export default BodyFatCalculator;
