import React from 'react';
import Layout from '@/components/Layout';
import usePageTitle from '@/hooks/usePageTitle';
import SEO from '@/components/SEO';
import seoData from '@/data/seoData';
import { Card, CardContent } from "@/components/ui/card";

const TermsOfUse = () => {
  usePageTitle('Terms of Use - Body Index');

  return (
    <Layout>
      <SEO 
        title={seoData.termsOfUse.title}
        description={seoData.termsOfUse.description}
        keywords={seoData.termsOfUse.keywords}
        canonical="https://bodyindex.net/terms-of-use"
      />
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">Terms of Use</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing or using Body Index, you agree to be bound by these Terms of Use. 
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Use of Services</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our calculators and tools are provided for informational purposes only. While we strive 
                for accuracy, the results should not be considered as medical advice.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the tools responsibly and in accordance with their intended purpose</li>
                <li>Do not attempt to manipulate or misuse the calculators</li>
                <li>Consult healthcare professionals for medical advice</li>
                <li>Results are estimates and may vary based on individual circumstances</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Medical Disclaimer</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Body Index is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Always seek the advice of qualified health providers</li>
                <li>Never disregard professional medical advice based on our calculator results</li>
                <li>If you suspect a medical emergency, contact emergency services immediately</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                All content on Body Index, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Text, graphics, logos, and images</li>
                <li>Calculator algorithms and formulas</li>
                <li>Website design and functionality</li>
                <li>User interface elements</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Are the exclusive property of Body Index and are protected by intellectual property laws.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Body Index and its operators shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Decisions made based on calculator results</li>
                <li>Technical inaccuracies or errors</li>
                <li>Service interruptions or data loss</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of Body Index after changes constitutes 
              acceptance of the modified terms.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Use, please contact us at:
              <br />
              <a href="mailto:terms@bodyindex.com" className="text-primary hover:underline">
                terms@bodyindex.com
              </a>
            </p>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground text-center mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse; 