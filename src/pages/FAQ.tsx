
import React from 'react';
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const FAQ: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about BMI, weight management, and health
            </p>
          </div>

          <Separator className="my-6" />

          <Card>
            <CardHeader>
              <CardTitle>General BMI Questions</CardTitle>
              <CardDescription>Basic information about Body Mass Index</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is BMI and how is it calculated?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Body Mass Index (BMI) is a numerical value calculated from your weight and height. 
                      It is used as a screening tool to categorize individuals as underweight, normal weight, 
                      overweight, or obese.
                    </p>
                    <p className="mt-2">
                      The formula for BMI is: weight (kg) / [height (m)]². In imperial units, 
                      it's: 703 × weight (lb) / [height (in)]².
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How accurate is BMI as a health indicator?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      BMI is a useful screening tool for populations but has limitations for individuals. 
                      It doesn't distinguish between muscle and fat mass, which can lead to misclassification, 
                      especially for athletes, elderly people, and certain ethnic groups.
                    </p>
                    <p className="mt-2">
                      It's best used as one of several health measurements, alongside waist circumference, 
                      body fat percentage, and other health markers.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>What are the BMI categories?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Below 18.5: Underweight</li>
                      <li>18.5 – 24.9: Normal weight</li>
                      <li>25.0 – 29.9: Overweight</li>
                      <li>30.0 – 34.9: Obesity Class I</li>
                      <li>35.0 – 39.9: Obesity Class II</li>
                      <li>40.0 and above: Obesity Class III</li>
                    </ul>
                    <p className="mt-2">
                      These categories are the same for men and women of all body types and ages over 20.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is BMI suitable for everyone?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      No, BMI has several limitations. It may not be suitable for:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Athletes and muscular individuals (may overestimate body fat)</li>
                      <li>Elderly people (doesn't account for muscle loss with age)</li>
                      <li>Pregnant or lactating women</li>
                      <li>Children and teenagers (specialized BMI charts are used)</li>
                      <li>Certain ethnic groups (may have different body compositions)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weight Management</CardTitle>
              <CardDescription>Questions about healthy weight and management strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger>What is a healthy weight loss rate?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Most health professionals recommend a gradual weight loss of 1-2 pounds (0.5-1 kg) per week. 
                      This pace is both sustainable and more likely to result in long-term success.
                    </p>
                    <p className="mt-2">
                      Faster weight loss may be recommended in certain medical situations, but only under healthcare supervision.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>How many calories should I cut to lose weight?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      A general guideline is that a caloric deficit of 500-1000 calories per day can lead to a 
                      weight loss of 1-2 pounds per week. However, this varies based on your starting weight, 
                      activity level, and metabolic factors.
                    </p>
                    <p className="mt-2">
                      Rather than severe restriction, focus on high-quality, nutrient-dense foods and an 
                      appropriate portion size for your needs.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger>Why do I gain weight despite eating healthy?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Several factors can contribute to weight gain even with a healthy diet:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Portion sizes may be too large</li>
                      <li>Underestimating calorie intake or overestimating activity</li>
                      <li>Hormonal issues (thyroid, insulin resistance, etc.)</li>
                      <li>Medications that affect weight</li>
                      <li>Stress and sleep issues</li>
                      <li>Age-related metabolic changes</li>
                      <li>Water retention</li>
                    </ul>
                    <p className="mt-2">
                      Consider consulting with a healthcare provider to identify potential contributing factors.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger>Is it better to focus on diet or exercise for weight loss?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Both diet and exercise are important, but dietary changes typically have a greater impact on weight loss. 
                      The saying "you can't outrun a bad diet" has some truth to it.
                    </p>
                    <p className="mt-2">
                      For optimal health and sustainable weight management, a combination approach is best:
                    </p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Diet for calorie management and nutrition</li>
                      <li>Exercise for fitness, metabolism, and maintaining muscle mass</li>
                      <li>Lifestyle changes for stress management and sleep quality</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Concerns & Guidance</CardTitle>
              <CardDescription>Medical considerations and professional advice</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-9">
                  <AccordionTrigger>When should I consult a doctor about my weight?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Consider consulting a healthcare provider if:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Your BMI is below 18.5 or above 30</li>
                      <li>You've experienced unexplained weight loss or gain</li>
                      <li>You have weight-related health concerns (high blood pressure, joint pain, etc.)</li>
                      <li>Previous weight management attempts have been unsuccessful</li>
                      <li>You're considering a significant change to your diet or exercise routine</li>
                      <li>You have a history of eating disorders</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10">
                  <AccordionTrigger>What health risks are associated with a high BMI?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      A higher BMI (overweight or obese categories) is associated with increased risk for:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Cardiovascular diseases (heart disease, stroke)</li>
                      <li>Type 2 diabetes</li>
                      <li>Hypertension (high blood pressure)</li>
                      <li>Dyslipidemia (high cholesterol, triglycerides)</li>
                      <li>Sleep apnea and breathing problems</li>
                      <li>Osteoarthritis and joint problems</li>
                      <li>Certain types of cancer</li>
                      <li>Mental health issues like depression and anxiety</li>
                    </ul>
                    <p className="mt-2">
                      Even modest weight loss (5-10% of body weight) can significantly reduce these risks.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-11">
                  <AccordionTrigger>Are there health risks associated with a low BMI?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Yes, having a BMI below 18.5 (underweight) can pose several health risks:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Malnutrition and vitamin deficiencies</li>
                      <li>Weakened immune system</li>
                      <li>Bone loss and increased risk of osteoporosis</li>
                      <li>Anemia</li>
                      <li>Hormone imbalances</li>
                      <li>Fertility issues</li>
                      <li>Increased risk of complications during surgery</li>
                      <li>In severe cases, heart and other organ problems</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-12">
                  <AccordionTrigger>What alternative health measurements complement BMI?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Several measurements provide additional health insights beyond BMI:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Waist circumference (abdominal fat is linked to higher health risks)</li>
                      <li>Waist-to-hip ratio</li>
                      <li>Body fat percentage</li>
                      <li>Blood pressure</li>
                      <li>Blood glucose levels</li>
                      <li>Cholesterol levels</li>
                      <li>Fitness assessments (cardiovascular endurance, strength, flexibility)</li>
                    </ul>
                    <p className="mt-2">
                      A comprehensive health assessment should include multiple measures, not just BMI.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
