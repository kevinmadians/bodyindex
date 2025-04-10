import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IdealWeightResult, IdealWeightInfo, getIdealWeightInfo } from '@/utils/idealWeightCalculations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Weight, ChevronRight, BarChart3, HeartPulse, BookOpen, Target, Award } from 'lucide-react';

interface ResultsDisplayProps {
  results: IdealWeightResult;
  gender: 'male' | 'female';
  age: number;
  height: number;
  bodyFrame: 'small' | 'medium' | 'large';
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  gender,
  age,
  height,
  bodyFrame
}) => {
  const idealWeightInfo = getIdealWeightInfo();

  const chartData = [
    { name: 'Hamwi', value: results.hamwi },
    { name: 'Devine', value: results.devine },
    { name: 'Robinson', value: results.robinson },
    { name: 'Miller', value: results.miller },
    { name: 'BMI', value: results.bmi },
    { name: 'Peterson', value: results.peterson },
    { name: 'Average', value: results.average }
  ];

  // Helper function to get animation delay for staggered animations
  const getDelay = (index: number) => `${100 + (index * 50)}ms`;

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="border-t-4 border-t-primary overflow-hidden shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-center justify-center">
            <Weight className="h-6 w-6 text-primary mr-3" />
            <CardTitle className="text-2xl font-bold">Your Ideal Weight Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" /> 
                Summary
              </h3>
              <div 
                className="border-l-4 border-primary p-4 rounded-lg flex items-center justify-between bg-primary/5 animate-in slide-in-from-left"
                style={{ animationDuration: '0.5s', animationDelay: getDelay(0) }}
              >
                <div>
                  <span className="font-medium">Average Ideal Weight</span>
                  <div className="text-xs text-muted-foreground">Based on six different formulas</div>
                </div>
                <Badge variant="outline" className="text-lg font-semibold bg-white">
                  {results.average.toFixed(1)} kg
                </Badge>
              </div>
              <div 
                className="border p-4 rounded-lg flex items-center justify-between animate-in slide-in-from-left"
                style={{ animationDuration: '0.5s', animationDelay: getDelay(1) }}
              >
                <div>
                  <span className="font-medium">Healthy Weight Range</span>
                  <div className="text-xs text-muted-foreground">Recommended range for your profile</div>
                </div>
                <span className="text-primary font-semibold">
                  {results.range.min.toFixed(1)} - {results.range.max.toFixed(1)} kg
                </span>
              </div>
              <div 
                className="border p-4 rounded-lg flex items-center justify-between animate-in slide-in-from-left"
                style={{ animationDuration: '0.5s', animationDelay: getDelay(2) }}
              >
                <div>
                  <span className="font-medium">Body Frame Size</span>
                  <div className="text-xs text-muted-foreground">Based on wrist circumference & height</div>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {bodyFrame}
                </Badge>
              </div>
              <div 
                className="border p-4 rounded-lg flex items-center gap-3 animate-in slide-in-from-left"
                style={{ animationDuration: '0.5s', animationDelay: getDelay(3) }}
              >
                <div className="bg-muted/50 rounded-full p-2">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Your Profile</div>
                  <div className="text-muted-foreground">
                    {gender === 'male' ? 'Male' : 'Female'}, {age} years, {(height / 100).toFixed(2)}m
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className="animate-in slide-in-from-right"
              style={{ animationDuration: '0.7s' }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Method Comparison
              </h3>
              <div className="h-64 border rounded-lg p-4 bg-gradient-to-b from-primary/5 to-transparent">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} kg`, 'Weight']} 
                      labelFormatter={(name) => `${name} Formula`}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))" 
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <Tabs defaultValue="methods" className="mt-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2">
              <TabsTrigger 
                value="methods" 
                className="flex items-center justify-center gap-2 px-2 py-3 md:py-2 bg-[#F1F5F9] data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm whitespace-normal text-center">Calculation Methods</span>
              </TabsTrigger>
              <TabsTrigger 
                value="implications" 
                className="flex items-center justify-center gap-2 px-2 py-3 md:py-2 bg-[#F1F5F9] data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <HeartPulse className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm whitespace-normal text-center">Health Implications</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tips" 
                className="flex items-center justify-center gap-2 px-2 py-3 md:py-2 bg-[#F1F5F9] data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm whitespace-normal text-center">Actionable Tips</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-[150px] md:mt-8">
              <TabsContent value="methods">
                <div className="space-y-4">
                  {idealWeightInfo.map((info, index) => (
                    <Card 
                      key={info.method} 
                      className="border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium flex items-center">
                            <span className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-primary text-xs mr-2">
                              {index + 1}
                            </span>
                            {info.method.charAt(0).toUpperCase() + info.method.slice(1)} Method
                          </h4>
                          <Badge variant="outline">{results[info.method].toFixed(1)} kg</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Formula:</span>
                            <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-x-auto">{info.formula}</pre>
                          </div>
                          <div className="space-y-2">
                            <p className="flex items-center">
                              <span className="bg-primary/20 p-1 rounded-full mr-1 inline-block">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M12 22v-7"/>
                                  <path d="M12 8V2"/>
                                  <path d="M4.73 19.61a10.2 10.2 0 0 1-1.2-1.3"/>
                                  <path d="M2.05 10.1a10.2 10.2 0 0 1 5.72-5.3"/>
                                  <path d="M20.44 18.4c.33-.4.61-.84.85-1.3"/>
                                  <path d="M21.94 10.07a10.2 10.2 0 0 0-2.77-5.3"/>
                                  <path d="M12 13h.01"/>
                                </svg>
                              </span>
                              <span className="font-medium mr-2">Accuracy:</span> {info.accuracy}
                            </p>
                            <p className="flex items-center">
                              <span className="bg-primary/20 p-1 rounded-full mr-1 inline-block">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                  <path d="M2 17l10 5 10-5"/>
                                  <path d="M2 12l10 5 10-5"/>
                                </svg>
                              </span>
                              <span className="font-medium mr-2">Best For:</span> {info.bestFor}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="implications">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-blue-200 bg-blue-50/50 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 flex items-center text-blue-700">
                        <span className="bg-blue-100 p-1.5 rounded-full mr-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                        </span>
                        Benefits of Maintaining Ideal Weight
                      </h4>
                      <ul className="list-disc list-inside text-sm space-y-2 text-blue-800/80">
                        <li>Reduced risk of chronic diseases (diabetes, heart disease)</li>
                        <li>Improved cardiovascular health and circulation</li>
                        <li>Better joint health and reduced strain on your body</li>
                        <li>Enhanced energy levels throughout the day</li>
                        <li>Improved sleep quality and mental well-being</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border border-red-200 bg-red-50/50 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 flex items-center text-red-700">
                        <span className="bg-red-100 p-1.5 rounded-full mr-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                          </svg>
                        </span>
                        Risks of Being Outside Ideal Range
                      </h4>
                      <ul className="list-disc list-inside text-sm space-y-2 text-red-800/80">
                        <li>Increased risk of type 2 diabetes and insulin resistance</li>
                        <li>Higher blood pressure and cardiovascular issues</li>
                        <li>Greater risk of heart disease and stroke</li>
                        <li>Joint problems, arthritis, and mobility issues</li>
                        <li>Sleep apnea, breathing difficulties, and reduced stamina</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="tips">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-green-200 bg-green-50/50 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 flex items-center text-green-700">
                        <span className="bg-green-100 p-1.5 rounded-full mr-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                          </svg>
                        </span>
                        Nutrition
                      </h4>
                      <ul className="list-disc list-inside text-sm space-y-2 text-green-800/80">
                        <li>Prioritize whole, unprocessed foods</li>
                        <li>Balance proteins, healthy fats, and complex carbs</li>
                        <li>Practice portion control with mindful eating</li>
                        <li>Stay hydrated with water throughout the day</li>
                        <li>Minimize added sugars and processed foods</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border border-amber-200 bg-amber-50/50 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 flex items-center text-amber-700">
                        <span className="bg-amber-100 p-1.5 rounded-full mr-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                          </svg>
                        </span>
                        Exercise
                      </h4>
                      <ul className="list-disc list-inside text-sm space-y-2 text-amber-800/80">
                        <li>Combine cardio and strength training</li>
                        <li>Aim for 150 minutes of activity weekly</li>
                        <li>Include flexibility and mobility exercises</li>
                        <li>Find activities you enjoy for sustainability</li>
                        <li>Build consistency with a regular routine</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border border-purple-200 bg-purple-50/50 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 flex items-center text-purple-700">
                        <span className="bg-purple-100 p-1.5 rounded-full mr-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                          </svg>
                        </span>
                        Lifestyle
                      </h4>
                      <ul className="list-disc list-inside text-sm space-y-2 text-purple-800/80">
                        <li>Prioritize quality sleep (7-9 hours nightly)</li>
                        <li>Manage stress with mindfulness practices</li>
                        <li>Track progress with realistic goals</li>
                        <li>Build a support system for accountability</li>
                        <li>Focus on sustainable changes, not quick fixes</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay; 