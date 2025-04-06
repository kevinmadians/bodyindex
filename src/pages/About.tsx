
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">
            About Body Mass Index (BMI)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding BMI, its history, applications, and limitations
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What is BMI?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Body Mass Index (BMI) is a value derived from the weight and height of a person. 
              It is defined as the body mass divided by the square of the body height, and is 
              expressed in units of kg/m², resulting from mass in kilograms and height in meters.
            </p>
            <p className="mb-4">
              BMI was developed by Belgian mathematician Adolphe Quetelet in the 1830s as a simple 
              way to assess the degree of obesity of the general population and to assist in determining 
              appropriate use of healthcare resources.
            </p>
            <p>
              Today, BMI is widely used as a screening tool to identify possible weight problems for adults. 
              It's an inexpensive and easy-to-perform method of screening that can help identify potential 
              health risks related to weight.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>BMI Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">Category</th>
                    <th className="border p-2 text-left">BMI Range (kg/m²)</th>
                    <th className="border p-2 text-left">Health Risk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-medium">Underweight</td>
                    <td className="border p-2">Less than 18.5</td>
                    <td className="border p-2">Risk of nutritional deficiency and osteoporosis</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-2 font-medium">Normal weight</td>
                    <td className="border p-2">18.5 - 24.9</td>
                    <td className="border p-2">Low risk for most health problems</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">Overweight</td>
                    <td className="border p-2">25.0 - 29.9</td>
                    <td className="border p-2">Increased risk of heart disease, high blood pressure</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-2 font-medium">Obesity (Class 1)</td>
                    <td className="border p-2">30.0 - 34.9</td>
                    <td className="border p-2">High risk of type 2 diabetes, high blood pressure</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">Obesity (Class 2)</td>
                    <td className="border p-2">35.0 - 39.9</td>
                    <td className="border p-2">Very high risk of health problems</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-2 font-medium">Obesity (Class 3)</td>
                    <td className="border p-2">40.0 or higher</td>
                    <td className="border p-2">Extremely high risk of serious health conditions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Limitations of BMI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              While BMI is a useful screening tool, it does have several important limitations:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Doesn't differentiate between fat and muscle:</strong> Athletes or muscular individuals may have a high BMI due to muscle mass, not excess fat.
              </li>
              <li>
                <strong>Doesn't account for body composition:</strong> BMI doesn't consider where fat is distributed in the body, which is significant as abdominal fat carries more health risks.
              </li>
              <li>
                <strong>Age and sex considerations:</strong> BMI doesn't account for variations by age, sex, or ethnicity. For example, older adults often have more body fat than younger adults with the same BMI.
              </li>
              <li>
                <strong>Not suitable for children:</strong> For children and teens, age and sex-specific percentiles are used instead of the standard BMI categories.
              </li>
              <li>
                <strong>Pregnancy:</strong> BMI is not applicable during pregnancy.
              </li>
            </ul>
            <p>
              Due to these limitations, BMI should be considered as one of several tools to assess health risks related to weight.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How accurate is BMI?</AccordionTrigger>
                <AccordionContent>
                  BMI is a useful screening tool, but it's not a diagnostic tool. It doesn't directly measure body fat or take into account factors like muscle mass, bone density, and overall body composition. For most adults, BMI provides a reasonable estimate of body fat, but it should be used in conjunction with other assessments.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Can BMI be applied to all adults the same way?</AccordionTrigger>
                <AccordionContent>
                  No, BMI may not be equally applicable to all demographic groups. For example, at the same BMI, older adults tend to have more body fat than younger adults, and women typically have more body fat than men. Additionally, studies suggest that different ethnic groups may have different associations between BMI and health risks.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What other measurements should be used alongside BMI?</AccordionTrigger>
                <AccordionContent>
                  Complementary measurements include: waist circumference (abdominal fat is a better predictor of health risks), waist-to-hip ratio, body fat percentage, blood pressure, blood glucose levels, cholesterol levels, and family medical history. A healthcare provider can help determine which assessments are most appropriate for your situation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How was the BMI scale developed?</AccordionTrigger>
                <AccordionContent>
                  BMI was developed by Belgian mathematician Adolphe Quetelet in the 1830s. The current categories (underweight, normal, overweight, obese) were established much later, in the 1990s, by the World Health Organization based on research linking BMI values to health outcomes and mortality rates in populations.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Should I be concerned if my BMI is outside the normal range?</AccordionTrigger>
                <AccordionContent>
                  A BMI outside the normal range (18.5-24.9) is a potential indicator that you might be at higher risk for certain health conditions. However, it's not a diagnosis by itself. If your BMI is outside the normal range, consider discussing it with a healthcare provider who can provide personalized advice based on your overall health, lifestyle, and other risk factors.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
