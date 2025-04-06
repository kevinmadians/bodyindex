
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import ToolsSection from '@/components/home/ToolsSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import CallToActionSection from '@/components/home/CallToActionSection';

const HomePage = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto mb-16">
        <HeroSection />
        <ToolsSection />
        <BenefitsSection />
        <CallToActionSection />
      </div>
    </Layout>
  );
};

export default HomePage;
