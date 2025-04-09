import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CalculatorForm from '@/components/bmr-calculator/CalculatorForm';
import ResultsDisplay from '@/components/bmr-calculator/ResultsDisplay';
import { 
  calculateBMR, 
  calculateTDEE, 
  calculateCalorieNeeds, 
  calculateMacros, 
  getMacroSuggestions,
  FormulaType
} from '@/utils/bmrCalculations';
import usePageTitle from '@/hooks/usePageTitle';
import ToolHeroSection from '@/components/common/ToolHeroSection';

const BMRCalculator: React.FC = () => {
  usePageTitle('BMR Calculator - Body Index');

  // User inputs
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70); // kg
  const [height, setHeight] = useState<number>(175); // cm
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number>(20);
  const [formula, setFormula] = useState<FormulaType>('mifflin');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  const [measurementUnit, setMeasurementUnit] = useState<string>('metric');
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [includeBodyFat, setIncludeBodyFat] = useState<boolean>(false);
  
  // Results
  const [bmr, setBMR] = useState<number>(0);
  const [tdee, setTDEE] = useState<number>(0);
  const [targetCalories, setTargetCalories] = useState<number>(0);
  const [macros, setMacros] = useState({
    protein: { grams: 0, calories: 0, percentage: 30 },
    carbs: { grams: 0, calories: 0, percentage: 40 },
    fat: { grams: 0, calories: 0, percentage: 30 }
  });
  const [showResults, setShowResults] = useState<boolean>(false);
  const [macroSuggestion, setMacroSuggestion] = useState({
    protein: 30,
    carbs: 40,
    fat: 30,
    description: 'Balanced macros for general health maintenance'
  });

  // Handle unit conversion
  useEffect(() => {
    if (measurementUnit === 'imperial') {
      // Convert cm to feet/inches when switching to imperial
      const heightInInches = Math.round(height / 2.54);
      setHeightFt(Math.floor(heightInInches / 12));
      setHeightIn(heightInInches % 12);
      
      // Convert kg to lbs
      setWeight(Math.round(weight * 2.20462));
    } else {
      // Convert feet/inches to cm when switching to metric
      const totalHeightInInches = (heightFt * 12) + heightIn;
      setHeight(Math.round(totalHeightInInches * 2.54));
      
      // Convert lbs to kg
      setWeight(Math.round(weight / 2.20462));
    }
  }, [measurementUnit]);

  // Calculate BMR and related values
  const calculateResults = () => {
    let weightInKg = weight;
    let heightInCm = height;
    
    // Convert imperial to metric for calculations
    if (measurementUnit === 'imperial') {
      weightInKg = weight / 2.20462; // lbs to kg
      heightInCm = ((heightFt * 12) + heightIn) * 2.54; // inches to cm
    }
    
    // Calculate BMR
    const calculatedBMR = calculateBMR(
      gender, 
      age, 
      weightInKg, 
      heightInCm, 
      formula,
      includeBodyFat ? bodyFatPercentage : undefined
    );
    
    // Calculate TDEE based on activity level
    const calculatedTDEE = calculateTDEE(calculatedBMR, activityLevel as any);
    
    // Calculate target calories based on goal
    const calculatedTargetCalories = calculateCalorieNeeds(calculatedTDEE, goal as any);
    
    // Get macro suggestions based on goal
    const macroSuggestions = getMacroSuggestions(goal as any);
    
    // Calculate macros based on target calories and suggested distribution
    const calculatedMacros = calculateMacros(
      calculatedTargetCalories,
      macroSuggestions.protein,
      macroSuggestions.carbs,
      macroSuggestions.fat
    );
    
    // Update state with results
    setBMR(calculatedBMR);
    setTDEE(calculatedTDEE);
    setTargetCalories(calculatedTargetCalories);
    setMacros(calculatedMacros);
    setMacroSuggestion(macroSuggestions);
    
    // Show results
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ToolHeroSection 
          title="Basal Metabolic Rate Calculator"
          description="Calculate your BMR, TDEE, and get personalized nutrition recommendations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <CalculatorForm
              gender={gender}
              setGender={setGender}
              age={age}
              setAge={setAge}
              weight={weight}
              setWeight={setWeight}
              height={height}
              setHeight={setHeight}
              bodyFatPercentage={bodyFatPercentage}
              setBodyFatPercentage={setBodyFatPercentage}
              formula={formula}
              setFormula={setFormula}
              activityLevel={activityLevel}
              setActivityLevel={setActivityLevel}
              goal={goal}
              setGoal={setGoal}
              measurementUnit={measurementUnit}
              setMeasurementUnit={setMeasurementUnit}
              heightFt={heightFt}
              setHeightFt={setHeightFt}
              heightIn={heightIn}
              setHeightIn={setHeightIn}
              includeBodyFat={includeBodyFat}
              setIncludeBodyFat={setIncludeBodyFat}
              calculateResults={calculateResults}
            />
          </div>
          
          <div className="lg:col-span-2" id="results-section">
            {showResults ? (
              <ResultsDisplay
                bmr={bmr}
                tdee={tdee}
                targetCalories={targetCalories}
                macros={macros}
                activityLevel={activityLevel}
                goal={goal}
                formula={formula}
                macroSuggestion={macroSuggestion}
                gender={gender}
                weight={weight}
                measurementUnit={measurementUnit}
                includeBodyFat={includeBodyFat}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Calculate Your BMR</h3>
                  <p className="text-center text-muted-foreground mb-6 max-w-md">
                    Fill out the form to calculate your Basal Metabolic Rate, Total Daily Energy Expenditure, and get personalized nutrition recommendations.
                  </p>
                  <div className="space-y-4 w-full max-w-md text-sm">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span>Choose your measurement system</span>
                      <span className="font-medium">Imperial or Metric</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span>Enter your personal details</span>
                      <span className="font-medium">Age, Gender, Height, Weight</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span>Select activity level & goal</span>
                      <span className="font-medium">Based on your lifestyle</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span>Get personalized results</span>
                      <span className="font-medium">BMR, TDEE, Macros</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">What is BMR?</h2>
              <p className="mb-4">
                Your <span className="font-semibold">Basal Metabolic Rate (BMR)</span> is the number of calories your body needs to perform essential functions while at complete rest. These include breathing, circulating blood, cell production, and maintaining brain function.
              </p>
              <p className="mb-4">
                Think of BMR as your body's "idle speed" - the minimum energy requirement needed to keep your body functioning. It typically accounts for 60-70% of your total daily energy expenditure.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Why BMR Matters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Weight Management</h4>
                  <p className="text-sm text-gray-700">
                    Knowing your BMR helps you set calorie targets for weight loss, maintenance, or muscle gain.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Metabolic Health</h4>
                  <p className="text-sm text-gray-700">
                    BMR can provide insights into your metabolic health and hormonal balance.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Factors That Affect BMR</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><span className="font-medium">Age:</span> BMR decreases by about 2% per decade after age 20</li>
                <li><span className="font-medium">Gender:</span> Men typically have higher BMRs than women</li>
                <li><span className="font-medium">Body Composition:</span> More muscle mass means higher BMR</li>
                <li><span className="font-medium">Height and Weight:</span> Larger bodies need more energy</li>
                <li><span className="font-medium">Hormones:</span> Thyroid function and other hormonal factors</li>
                <li><span className="font-medium">Genetics:</span> Some people naturally have faster metabolisms</li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3">Understanding TDEE</h3>
              <p className="text-sm mb-4">
                <span className="font-semibold">Total Daily Energy Expenditure (TDEE)</span> is the total number of calories you burn each day, including your BMR and all activities.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-bold mb-2">TDEE Components:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">●</span>
                    <strong>BMR (60-70%):</strong> Basal energy needs
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">●</span>
                    <strong>TEF (10%):</strong> Thermic effect of food
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">●</span>
                    <strong>NEAT (15-30%):</strong> Non-exercise activity
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">●</span>
                    <strong>EAT (0-10%):</strong> Exercise activity
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">BMR Formulas:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">●</span>
                    <div>
                      <strong>Mifflin-St Jeor:</strong> 
                      <p className="text-xs text-gray-600">Most accurate for general population</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">●</span>
                    <div>
                      <strong>Harris-Benedict:</strong>
                      <p className="text-xs text-gray-600">Traditional formula, slightly less accurate</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">●</span>
                    <div>
                      <strong>Katch-McArdle:</strong>
                      <p className="text-xs text-gray-600">Uses body fat %, better for fitness enthusiasts</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor your metabolic health over time. Recalculate your BMR every 4-6 weeks, especially when your weight or activity level changes.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="p-4 bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Meal Planning</h3>
            <p className="text-muted-foreground">
              Use your calculated macros and calorie targets to create balanced meal plans that align with your health and fitness goals.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="p-4 bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Consistency Matters</h3>
            <p className="text-muted-foreground">
              Metabolic changes take time. Stick to your nutrition plan consistently for at least 4-6 weeks before evaluating progress.
            </p>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-10 text-sm text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
          <p className="mb-2 font-medium">
            <strong>Medical Disclaimer:</strong> This BMR calculator is for informational purposes only.
          </p>
          <p>
            The Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) calculations are based on
            standardized formulas that may not account for individual metabolic variations, medical conditions,
            or medications. The calorie and macronutrient recommendations should be used as general guidelines.
            Consult with healthcare professionals or registered dietitians before making significant changes to
            your diet or exercise routine, especially if you have any medical conditions.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BMRCalculator; 