import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import ToolsSection from '@/components/home/ToolsSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import usePageTitle from '@/hooks/usePageTitle';
import SEO from '@/components/SEO';
import seoData from '@/data/seoData';

const HomePage = () => {
  usePageTitle('Body Index - Your Health Companion');

  return (
    <Layout>
      <SEO 
        title={seoData.home.title}
        description={seoData.home.description}
        keywords={seoData.home.keywords}
        canonical="https://bodyindex.net"
        structuredData={seoData.home.structuredData}
      />
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
