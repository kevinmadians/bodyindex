import React from 'react';
import Layout from '@/components/Layout';
import usePageTitle from '@/hooks/usePageTitle';
import SEO from '@/components/SEO';
import seoData from '@/data/seoData';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  usePageTitle('About - Body Index');

  return (
    <Layout>
      <SEO 
        title={seoData.about.title}
        description={seoData.about.description}
        keywords={seoData.about.keywords}
        canonical="https://bodyindex.net/about"
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">About Body Index</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted companion for health and wellness calculations
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              At Body Index, we believe that understanding your body is the first step toward better health. 
              Our mission is to provide accurate, easy-to-use health calculation tools that help you make 
              informed decisions about your wellness journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">What We Offer</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Accurate health calculators</li>
                  <li>• Evidence-based recommendations</li>
                  <li>• User-friendly interface</li>
                  <li>• Comprehensive health insights</li>
                  <li>• Privacy-focused approach</li>
                </ul>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Our Values</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Accuracy in calculations</li>
                  <li>• User privacy protection</li>
                  <li>• Accessible health information</li>
                  <li>• Continuous improvement</li>
                  <li>• Community well-being</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose Body Index?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Accuracy</h3>
                <p className="text-muted-foreground">
                  Our calculators use scientifically validated formulas to ensure accurate results.
                </p>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-muted-foreground">
                  We provide detailed explanations and insights with every calculation.
                </p>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Privacy</h3>
                <p className="text-muted-foreground">
                  Your data stays on your device. We don't store any personal information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Our Commitment</h2>
            <p className="text-muted-foreground mb-4">
              We are committed to providing reliable, user-friendly tools that help you understand and 
              improve your health metrics. Our team regularly updates our calculators based on the latest 
              research and user feedback.
            </p>
            <p className="text-muted-foreground">
              While our tools provide valuable insights, we always recommend consulting with healthcare 
              professionals for personalized medical advice. Our calculators are designed to complement, 
              not replace, professional medical guidance.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About; 