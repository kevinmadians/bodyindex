import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CalculatorForm from '@/components/bmr-calculator/CalculatorForm';
import ResultsDisplay from '@/components/bmr-calculator/ResultsDisplay';
import AnimatedResults from '@/components/common/AnimatedResults';
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
import SEO from '@/components/SEO';
import seoData from '@/data/seoData';

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
    
    // If Katch-McArdle is selected but body fat is not included, switch to Mifflin-St Jeor
    let calculationFormula = formula;
    if (formula === 'katch' && !includeBodyFat) {
      calculationFormula = 'mifflin';
    }
    
    // Calculate BMR
    const calculatedBMR = calculateBMR(
      gender, 
      age, 
      weightInKg, 
      heightInCm, 
      calculationFormula,
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
        const yOffset = -80; // Offset to ensure the "Your Results" heading is visible
        const y = resultsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 300); // Increased delay to ensure content is rendered
  };

  return (
    <Layout>
      <SEO 
        title={seoData.bmrCalculator.title}
        description={seoData.bmrCalculator.description}
        keywords={seoData.bmrCalculator.keywords}
        structuredData={seoData.bmrCalculator.structuredData}
        canonical="https://bodyindex.net/bmr-calculator"
      />
      <div className="max-w-5xl mx-auto px-4">
        <ToolHeroSection 
          title="BMR Calculator"
          description="Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)"
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
            <AnimatedResults show={showResults} disableAutoScroll={true}>
              {showResults && (
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
              )}
            </AnimatedResults>
            
            {!showResults && (
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
                    <div className="flex items-center p-3 border rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-500 text-sm font-semibold">1</span>
                      </div>
                      <div>
                        <p>Enter your physical details</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-500 text-sm font-semibold">2</span>
                      </div>
                      <div>
                        <p>Select activity level and goals</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-500 text-sm font-semibold">3</span>
                      </div>
                      <div>
                        <p>Get personalized calorie and macro recommendations</p>
                      </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Body Composition</h4>
                  <p className="text-sm text-gray-700">
                    Muscle tissue burns more calories than fat tissue, even at rest. Higher muscle mass increases BMR.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Age</h4>
                  <p className="text-sm text-gray-700">
                    BMR typically decreases with age due to the natural loss of muscle mass and hormonal changes.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Gender</h4>
                  <p className="text-sm text-gray-700">
                    Men generally have higher BMRs than women due to higher muscle mass and testosterone levels.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Genetics and Health</h4>
                  <p className="text-sm text-gray-700">
                    Genetics, thyroid health, and other medical factors can influence your baseline metabolic rate.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">BMR Calculation Methods</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Mifflin-St Jeor Equation</h4>
                  <p className="text-sm text-gray-700">
                    Published in 1990, this is currently considered the most accurate formula for the general population. It accounts for weight, height, age, and gender.
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Male: 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5<br />
                    Female: 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Harris-Benedict Equation</h4>
                  <p className="text-sm text-gray-700">
                    This classic formula was developed in 1919 and revised in 1984. It's slightly less accurate for modern populations but still widely used.
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Male: 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)<br />
                    Female: 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Katch-McArdle Formula</h4>
                  <p className="text-sm text-gray-700">
                    This formula includes body fat percentage for greater accuracy. It's ideal for those with an athletic build or who know their body composition.
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    BMR = 370 + (21.6 × Lean Body Mass in kg)<br />
                    Where Lean Body Mass = Weight × (1 - (Body Fat % / 100))
                  </p>
                </div>
              </div>
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