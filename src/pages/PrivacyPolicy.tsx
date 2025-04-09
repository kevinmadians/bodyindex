import React from 'react';
import Layout from '@/components/Layout';
import usePageTitle from '@/hooks/usePageTitle';
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  usePageTitle('Privacy Policy - Body Index');

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How we protect and handle your information
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-6">
              At Body Index, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, and protect your information when you use our website and services. By using Body Index, 
              you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Information Collection</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Information You Provide</h3>
                <p className="text-muted-foreground">
                  When using our calculators, you may input personal health information such as:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Height and weight</li>
                  <li>Age and gender</li>
                  <li>Body measurements</li>
                  <li>Activity levels</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Technical Information</h3>
                <p className="text-muted-foreground">
                  We automatically collect certain technical information when you visit our website:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Device information</li>
                  <li>Usage statistics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We use the information you provide solely for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Performing calculations and providing results</li>
                <li>Improving our calculators and services</li>
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Technical maintenance and troubleshooting</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>Important:</strong> All calculations are performed locally in your browser. 
                We do not store or transmit your personal health information to our servers.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>All calculations are performed client-side</li>
                <li>No personal health data is stored on our servers</li>
                <li>Secure HTTPS encryption for all web traffic</li>
                <li>Regular security audits and updates</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We use essential cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Remember your preferences</li>
                <li>Improve site functionality</li>
                <li>Analyze site usage</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@bodyindex.com" className="text-primary hover:underline">
                privacy@bodyindex.com
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

export default PrivacyPolicy; 