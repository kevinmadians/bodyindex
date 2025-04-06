
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CalculatorFormProps {
  gender: string;
  setGender: (value: string) => void;
  age: number;
  setAge: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;
  neck: number;
  setNeck: (value: number) => void;
  waist: number;
  setWaist: (value: number) => void;
  hip: number;
  setHip: (value: number) => void;
  measurementUnit: string;
  setMeasurementUnit: (value: string) => void;
  measurementMethod: string;
  setMeasurementMethod: (value: string) => void;
  calculateResults: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  gender,
  setGender,
  age,
  setAge,
  height,
  setHeight,
  weight,
  setWeight,
  neck,
  setNeck,
  waist,
  setWaist,
  hip,
  setHip,
  measurementUnit,
  setMeasurementUnit,
  measurementMethod,
  setMeasurementMethod,
  calculateResults,
}) => {
  return (
    <>
      <div className="bg-gray-100 rounded-lg mb-6">
        <div className="grid grid-cols-3">
          <button 
            className={`py-4 px-2 text-center font-medium ${measurementMethod === 'navy' ? 'text-primary' : 'text-gray-500'}`}
            onClick={() => setMeasurementMethod('navy')}
          >
            Navy Method
          </button>
          <button 
            className={`py-4 px-2 text-center font-medium ${measurementMethod === 'bmi' ? 'text-primary' : 'text-gray-500'}`}
            onClick={() => setMeasurementMethod('bmi')}
          >
            BMI Method
          </button>
          <button 
            className={`py-4 px-2 text-center font-medium ${measurementMethod === 'skinfold' ? 'text-primary' : 'text-gray-500'}`}
            onClick={() => setMeasurementMethod('skinfold')}
          >
            Skinfold Method
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Gender</h3>
            <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" className="text-primary" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" className="text-primary" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-6">
            <Label htmlFor="age" className="block mb-2">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="weight" className="block mb-2">
              Weight ({measurementUnit === 'metric' ? 'kg' : 'lbs'})
            </Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="waist" className="block mb-2">
              Waist Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
            </Label>
            <Input
              id="waist"
              type="number"
              value={waist}
              onChange={(e) => setWaist(parseInt(e.target.value) || 0)}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Measurement System</h3>
            <RadioGroup value={measurementUnit} onValueChange={setMeasurementUnit} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="metric" id="metric" className="text-primary" />
                <Label htmlFor="metric">Metric (cm, kg)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="imperial" id="imperial" className="text-primary" />
                <Label htmlFor="imperial">Imperial (in, lbs)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-6">
            <Label htmlFor="height" className="block mb-2">
              Height ({measurementUnit === 'metric' ? 'cm' : 'inches'})
            </Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="neck" className="block mb-2">
              Neck Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
            </Label>
            <Input
              id="neck"
              type="number"
              value={neck}
              onChange={(e) => setNeck(parseInt(e.target.value) || 0)}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          {gender === 'female' && (
            <div className="mb-6">
              <Label htmlFor="hip" className="block mb-2">
                Hip Circumference ({measurementUnit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="hip"
                type="number"
                value={hip}
                onChange={(e) => setHip(parseInt(e.target.value) || 0)}
                className="bg-gray-50 border-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Button 
          onClick={calculateResults} 
          className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white"
        >
          Calculate Body Fat
        </Button>
      </div>
    </>
  );
};

export default CalculatorForm;
