
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Apple, Dumbbell, Heart, Moon, Sun } from 'lucide-react';

const HealthTips: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Health Tips & Recommendations
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Practical advice to improve your health based on your BMI results
            </p>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-xl">Nutrition Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Focus on whole, unprocessed foods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Include plenty of fruits and vegetables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Choose lean proteins and healthy fats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Stay hydrated with water throughout the day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>Practice portion control and mindful eating</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-xl">Exercise Recommendations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Aim for 150+ minutes of moderate activity weekly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Include both cardio and strength training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Find activities you enjoy to ensure consistency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Start slowly and gradually increase intensity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Remember that any movement is better than none</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-indigo-500" />
                  <CardTitle className="text-xl">Sleep & Recovery</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>Aim for 7-9 hours of quality sleep each night</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>Maintain a consistent sleep schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>Create a relaxing bedtime routine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>Limit screen time before bed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>Make your bedroom dark, quiet, and cool</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <CardTitle className="text-xl">Mental Wellbeing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Practice stress management techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Try meditation or mindfulness exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Connect with supportive friends and family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Set realistic health goals and celebrate progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Consider professional support when needed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Tailored Recommendations by BMI Category</CardTitle>
              <CardDescription>Specific advice based on your BMI result</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">For BMI below 18.5 (Underweight)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Increase calorie intake with nutrient-dense foods</li>
                  <li>Focus on protein-rich foods to build muscle</li>
                  <li>Consider strength training to increase muscle mass</li>
                  <li>Consult with a healthcare provider to rule out underlying conditions</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">For BMI 18.5-24.9 (Healthy Weight)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Maintain your balanced diet and regular exercise routine</li>
                  <li>Continue regular health check-ups</li>
                  <li>Focus on fitness goals beyond weight maintenance</li>
                  <li>Consider preventive health measures for long-term wellbeing</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">For BMI 25.0-29.9 (Overweight)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Aim for gradual weight loss of 1-2 pounds per week</li>
                  <li>Increase physical activity with a mix of cardio and strength training</li>
                  <li>Focus on portion control and reducing processed foods</li>
                  <li>Consider working with a nutritionist or health coach</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">For BMI 30.0 and above (Obesity)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Consult with healthcare providers for a comprehensive plan</li>
                  <li>Set realistic, sustainable weight loss goals</li>
                  <li>Consider medically supervised weight management programs</li>
                  <li>Monitor related health factors (blood pressure, blood sugar, etc.)</li>
                  <li>Focus on health improvements beyond the scale</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HealthTips;
