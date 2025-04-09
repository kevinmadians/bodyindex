import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, AlertCircle, Dumbbell, Flame } from 'lucide-react';

interface ResultsDisplayProps {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: {
    protein: { grams: number; calories: number; percentage: number };
    carbs: { grams: number; calories: number; percentage: number };
    fat: { grams: number; calories: number; percentage: number };
  };
  activityLevel: string;
  goal: string;
  formula: string;
  macroSuggestion: {
    protein: number;
    carbs: number;
    fat: number;
    description: string;
  };
  gender: string;
  weight: number;
  measurementUnit: string;
  includeBodyFat: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  bmr,
  tdee,
  targetCalories,
  macros,
  activityLevel,
  goal,
  formula,
  macroSuggestion,
  gender,
  weight,
  measurementUnit,
  includeBodyFat
}) => {
  // Format names for display
  const formulaNames = {
    'harris': 'Harris-Benedict',
    'mifflin': 'Mifflin-St Jeor',
    'katch': 'Katch-McArdle',
    'cunningham': 'Cunningham'
  };

  const activityNames = {
    'sedentary': 'Sedentary',
    'light': 'Light Activity',
    'moderate': 'Moderate Activity',
    'active': 'Very Active',
    'very active': 'Extremely Active'
  };

  const goalNames = {
    'lose': 'Weight Loss',
    'maintain': 'Maintain Weight',
    'gain': 'Weight Gain',
    'gain-muscle': 'Build Muscle'
  };

  // Data for charts
  const tdeeBreakdownData = [
    { name: 'BMR', value: bmr, color: '#4CAF50' },
    { name: 'Activity', value: tdee - bmr, color: '#2196F3' }
  ];

  const macroData = [
    { name: 'Protein', value: macros.protein.percentage, grams: macros.protein.grams, calories: macros.protein.calories, color: '#F44336' },
    { name: 'Carbs', value: macros.carbs.percentage, grams: macros.carbs.grams, calories: macros.carbs.calories, color: '#2196F3' },
    { name: 'Fat', value: macros.fat.percentage, grams: macros.fat.grams, calories: macros.fat.calories, color: '#FFEB3B' }
  ];

  // Activity data
  const activityData = [
    { name: 'Walking (30 min)', calories: Math.round(3.8 * (measurementUnit === 'metric' ? weight : weight / 2.20462) * 0.5) },
    { name: 'Jogging (30 min)', calories: Math.round(7.0 * (measurementUnit === 'metric' ? weight : weight / 2.20462) * 0.5) },
    { name: 'Cycling (30 min)', calories: Math.round(6.2 * (measurementUnit === 'metric' ? weight : weight / 2.20462) * 0.5) },
    { name: 'Swimming (30 min)', calories: Math.round(6.0 * (measurementUnit === 'metric' ? weight : weight / 2.20462) * 0.5) },
    { name: 'Weight Training (30 min)', calories: Math.round(3.5 * (measurementUnit === 'metric' ? weight : weight / 2.20462) * 0.5) },
    { name: 'HIIT (15 min)', calories: Math.round(10.0 * (measurementUnit === 'metric' ? weight : weight / 2.20462) * 0.25) }
  ];

  return (
    <div id="results-section" className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Results</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Formula: {formulaNames[formula as keyof typeof formulaNames] || 'Mifflin-St Jeor'}</span>
              {includeBodyFat && <span className="ml-2 px-2 py-0.5 bg-primary/10 rounded-full text-primary text-xs">Body Fat Included</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* BMR Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 shadow-sm">
              <div className="flex items-center mb-3">
                <Flame className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Basal Metabolic Rate</h3>
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-2">{bmr} calories</div>
              <p className="text-sm text-blue-700 opacity-75">
                Calories your body needs at complete rest
              </p>
            </div>
            
            {/* TDEE Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 shadow-sm">
              <div className="flex items-center mb-3">
                <Activity className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold">Total Daily Energy</h3>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2">{tdee} calories</div>
              <p className="text-sm text-green-700 opacity-75">
                Calories burned daily with {activityNames[activityLevel as keyof typeof activityNames]?.toLowerCase() || 'your activity level'}
              </p>
            </div>
            
            {/* Target Calories Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 shadow-sm">
              <div className="flex items-center mb-3">
                <Dumbbell className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold">{goalNames[goal as keyof typeof goalNames] || 'Maintain'} Goal</h3>
              </div>
              <div className="text-3xl font-bold text-purple-700 mb-2">{targetCalories} calories</div>
              <p className="text-sm text-purple-700 opacity-75">
                Daily calorie target for your selected goal
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="macros" className="mt-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="macros">Macro Breakdown</TabsTrigger>
              <TabsTrigger value="charts">Analysis</TabsTrigger>
              <TabsTrigger value="activity">Activity Calories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="macros" className="space-y-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-1">Recommended Macro Split</h3>
                <p className="text-sm text-muted-foreground">{macroSuggestion.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Protein Card */}
                <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Protein</h4>
                    <span className="text-sm font-bold px-2 py-1 bg-red-100 text-red-700 rounded-full">{macros.protein.percentage}%</span>
                  </div>
                  <div className="text-2xl font-bold mb-2">{macros.protein.grams}g</div>
                  <Progress value={macros.protein.percentage} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{macros.protein.calories} calories</span>
                    <span>{Math.round(macros.protein.grams / weight * (measurementUnit === 'imperial' ? 2.2 : 1) * 10) / 10}g/kg</span>
                  </div>
                </div>
                
                {/* Carbs Card */}
                <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Carbohydrates</h4>
                    <span className="text-sm font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{macros.carbs.percentage}%</span>
                  </div>
                  <div className="text-2xl font-bold mb-2">{macros.carbs.grams}g</div>
                  <Progress value={macros.carbs.percentage} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{macros.carbs.calories} calories</span>
                    <span>4 calories per gram</span>
                  </div>
                </div>
                
                {/* Fat Card */}
                <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Fats</h4>
                    <span className="text-sm font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">{macros.fat.percentage}%</span>
                  </div>
                  <div className="text-2xl font-bold mb-2">{macros.fat.grams}g</div>
                  <Progress value={macros.fat.percentage} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{macros.fat.calories} calories</span>
                    <span>9 calories per gram</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="charts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-center">Energy Expenditure</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={tdeeBreakdownData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value, percent }) => `${name}: ${value} cal (${(percent * 100).toFixed(0)}%)`}
                          labelLine={false}
                        >
                          {tdeeBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} calories`} />
                        <Legend verticalAlign="bottom" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-center">Macronutrient Ratio</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-1">Calories Burned By Activities</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These estimates show how many calories you might burn during different activities
                  based on your weight of {weight} {measurementUnit === 'metric' ? 'kg' : 'lbs'}.
                </p>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activityData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip formatter={(value) => [`${value} calories`, 'Calories Burned']} />
                      <Bar dataKey="calories" fill="#8884d8">
                        {activityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4CAF50' : '#2196F3'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Activity Tip</h4>
                      <p className="text-sm text-muted-foreground">
                        Aim for at least 150 minutes of moderate-intensity exercise per week, plus 
                        muscle-strengthening activities twice weekly for optimal health.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay; 