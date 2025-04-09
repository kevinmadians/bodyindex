import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info } from 'lucide-react';

const BPCategoryGuide: React.FC = () => {
  const categories = [
    {
      name: "Low Blood Pressure",
      systolic: "Below 90",
      diastolic: "Below 60",
      color: "#3B82F6",
      description: "Also known as hypotension, can cause dizziness, fainting, and in severe cases, shock. Requires monitoring especially if symptomatic."
    },
    {
      name: "Normal",
      systolic: "90-119",
      diastolic: "60-79",
      color: "#10B981",
      description: "Ideal blood pressure range for most adults. Associated with good cardiovascular health and lower risk of heart disease."
    },
    {
      name: "Elevated",
      systolic: "120-129",
      diastolic: "Below 80",
      color: "#FBBF24",
      description: "Higher than normal but not yet considered hypertension. Risk for developing hypertension if lifestyle changes aren't made."
    },
    {
      name: "Hypertension Stage 1",
      systolic: "130-139",
      diastolic: "80-89",
      color: "#F97316",
      description: "Mild hypertension requiring lifestyle changes and possibly medication depending on overall cardiovascular risk."
    },
    {
      name: "Hypertension Stage 2",
      systolic: "140 or higher",
      diastolic: "90 or higher",
      color: "#EF4444",
      description: "Moderate hypertension requiring more aggressive treatment, typically including both lifestyle changes and medication."
    },
    {
      name: "Hypertensive Crisis",
      systolic: "Higher than 180",
      diastolic: "Higher than 120",
      color: "#7F1D1D",
      description: "Severe hypertension requiring immediate medical attention. Can lead to organ damage and is considered a medical emergency."
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 px-2 sm:px-6">
          <h2 className="text-lg font-semibold mb-4">Blood Pressure Categories</h2>
          
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full border-collapse min-w-[600px] sm:min-w-0">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left border">Category</th>
                  <th className="p-2 text-left border">Systolic (mmHg)</th>
                  <th className="p-2 text-left border">Diastolic (mmHg)</th>
                  <th className="p-2 text-left border">What It Means</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td 
                      className="p-2 sm:p-3 border" 
                      style={{ 
                        borderLeft: `4px solid ${category.color}`,
                      }}
                    >
                      <span className="font-medium">{category.name}</span>
                    </td>
                    <td className="p-2 sm:p-3 border">{category.systolic}</td>
                    <td className="p-2 sm:p-3 border">{category.diastolic}</td>
                    <td className="p-2 sm:p-3 border text-xs sm:text-sm">{category.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Alert variant="default" className="bg-muted/50">
        <Info className="h-4 w-4 shrink-0" />
        <AlertDescription className="text-xs sm:text-sm">
          <p className="mb-2"><strong>Understanding Your Blood Pressure Reading</strong></p>
          <p>Blood pressure readings consist of two numbers: systolic (the top number) and diastolic (the bottom number).</p>
          <ul className="list-disc ml-4 sm:ml-5 mt-2 space-y-1">
            <li>The <strong>systolic pressure</strong> measures the force of blood against artery walls when the heart beats.</li>
            <li>The <strong>diastolic pressure</strong> measures the force of blood against artery walls when the heart rests between beats.</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Alert variant="default" className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
        <AlertDescription className="text-xs sm:text-sm">
          <p className="mb-2"><strong>When to Seek Medical Attention</strong></p>
          <ul className="list-disc ml-4 sm:ml-5 space-y-1">
            <li>If your readings consistently fall into Hypertension Stage 1 or 2, consult your doctor.</li>
            <li>If your reading exceeds 180/120 mmHg (Hypertensive Crisis), seek emergency medical care immediately.</li>
            <li>For very low readings (below 90/60 mmHg) with symptoms like dizziness or fainting, consult a healthcare provider.</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="px-0.5">
        <AccordionItem value="factors">
          <AccordionTrigger>Risk Factors for Hypertension</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc ml-4 sm:ml-5 space-y-1 text-muted-foreground text-xs sm:text-sm">
              <li><strong>Age:</strong> Risk increases as you get older</li>
              <li><strong>Family history:</strong> Hypertension often runs in families</li>
              <li><strong>Being overweight or obese:</strong> Excess weight increases blood pressure</li>
              <li><strong>Sedentary lifestyle:</strong> Physical inactivity raises risk</li>
              <li><strong>Tobacco use:</strong> Smoking or chewing tobacco raises blood pressure</li>
              <li><strong>High sodium diet:</strong> Too much salt can retain fluid and increase blood pressure</li>
              <li><strong>Excessive alcohol:</strong> Regular heavy drinking</li>
              <li><strong>Stress:</strong> High levels of stress can raise blood pressure</li>
              <li><strong>Certain chronic conditions:</strong> Kidney disease, diabetes, sleep apnea</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BPCategoryGuide; 