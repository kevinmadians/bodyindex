
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Award, CheckCircle, Info } from 'lucide-react';

const Guide: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Complete BMI Guide
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Body Mass Index, how to interpret your results, and what actions to take.
            </p>
          </div>

          <Separator className="my-6" />

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What is BMI?</CardTitle>
              <CardDescription>Understanding the basics of Body Mass Index</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Body Mass Index (BMI) is a numerical value of your weight in relation to your height. It provides a simple way to classify whether a person has an appropriate weight for their height.
              </p>
              <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">BMI Formula</h4>
                  <p className="text-sm text-muted-foreground">BMI = weight(kg) / [height(m)]²</p>
                  <p className="text-sm text-muted-foreground">For imperial units: BMI = 703 × weight(lb) / [height(in)]²</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>BMI Categories</CardTitle>
              <CardDescription>Standard weight status categories associated with BMI ranges for adults</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">BMI Range</th>
                      <th className="text-left py-2 px-4">Weight Status</th>
                      <th className="text-left py-2 px-4">Health Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2 px-4">Below 18.5</td>
                      <td className="py-2 px-4">Underweight</td>
                      <td className="py-2 px-4">Potential nutritional deficiency</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">18.5 – 24.9</td>
                      <td className="py-2 px-4">Normal weight</td>
                      <td className="py-2 px-4">Lowest risk</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">25.0 – 29.9</td>
                      <td className="py-2 px-4">Overweight</td>
                      <td className="py-2 px-4">Increased risk</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">30.0 – 34.9</td>
                      <td className="py-2 px-4">Obesity Class I</td>
                      <td className="py-2 px-4">High risk</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">35.0 – 39.9</td>
                      <td className="py-2 px-4">Obesity Class II</td>
                      <td className="py-2 px-4">Very high risk</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">40.0 and above</td>
                      <td className="py-2 px-4">Obesity Class III</td>
                      <td className="py-2 px-4">Extremely high risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Limitations of BMI</CardTitle>
              <CardDescription>Understanding when BMI might not be accurate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                While BMI is a useful screening tool, it does have some limitations:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                  <span>Does not distinguish between muscle and fat mass</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                  <span>May overestimate body fat in athletes and muscular individuals</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                  <span>May underestimate body fat in older persons and those with muscle loss</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                  <span>Not suitable for pregnant women, children or the elderly</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center p-4 max-w-md bg-blue-50 rounded-lg">
              <Award className="h-8 w-8 text-blue-500 mr-3" />
              <p className="text-blue-700 font-medium">
                Remember: BMI is just one measure of health. Consult with healthcare professionals for a comprehensive health assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guide;
