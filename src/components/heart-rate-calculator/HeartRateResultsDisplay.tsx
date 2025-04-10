import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { HeartRateResults } from '@/utils/heartRateCalculations';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Heart, Zap, Target, TrendingUp } from 'lucide-react';

interface HeartRateResultsDisplayProps {
  results: HeartRateResults;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

export const HeartRateResultsDisplay: React.FC<HeartRateResultsDisplayProps> = ({
  results,
  fitnessLevel,
  goals
}) => {
  // Ensure all values are valid positive numbers
  const maxHeartRate = Math.max(results.maxHeartRate, 0);
  const restingHeartRate = Math.max(results.restingHeartRate, 0);
  const heartRateReserve = Math.max(results.heartRateReserve, 0);
  const recoveryHeartRate = Math.max(results.recoveryHeartRate, 0);
  const targetHeartRate = Math.max(results.targetHeartRate, 0);
  const vo2MaxEstimate = Math.max(results.vo2MaxEstimate, 0);

  // Sanitize zones data
  const sanitizedZones = Object.entries(results.zones).reduce((acc, [key, zone]) => {
    return {
      ...acc,
      [key]: {
        ...zone,
        min: Math.max(zone.min, 0),
        max: Math.max(zone.max, 0)
      }
    };
  }, {} as typeof results.zones);

  // Prepare data for the bar chart
  const zoneData = Object.entries(sanitizedZones).map(([key, zone]) => ({
    name: zone.name,
    range: `${zone.min}-${zone.max}`,
    min: zone.min,
    max: zone.max,
    color: zone.color
  }));

  // Calculate the percentage of max heart rate for each zone
  const zonePercentages = Object.entries(sanitizedZones).map(([key, zone]) => ({
    name: zone.name,
    percentage: ((zone.max - zone.min) / (maxHeartRate - restingHeartRate)) * 100,
    color: zone.color
  }));

  return (
    <div className="space-y-6">
      {/* Key Metrics Card */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-4">Key Heart Rate Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Max Heart Rate</span>
              </div>
              <p className="text-2xl font-bold">{maxHeartRate} bpm</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span className="font-medium">Heart Rate Reserve</span>
              </div>
              <p className="text-2xl font-bold">{heartRateReserve} bpm</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Target Heart Rate</span>
              </div>
              <p className="text-2xl font-bold">{targetHeartRate} bpm</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <span className="font-medium">VO2 Max Estimate</span>
              </div>
              <p className="text-2xl font-bold">{vo2MaxEstimate} ml/kg/min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heart Rate Zones Visualization */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Heart Rate Zones</h3>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[restingHeartRate, maxHeartRate]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="min" stackId="a" fill="transparent" />
                <Bar dataKey="max" stackId="a">
                  {zoneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {Object.entries(sanitizedZones).map(([key, zone]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: zone.color }}
                    />
                    <span className="font-medium">{zone.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {zone.min} - {zone.max} bpm
                  </span>
                </div>
                <Progress 
                  value={((zone.max - zone.min) / (maxHeartRate - restingHeartRate)) * 100}
                  className="h-2"
                  style={{ backgroundColor: zone.color + '20' }}
                />
                <p className="text-sm text-muted-foreground">{zone.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Recommendations */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Training Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Based on your fitness level ({fitnessLevel})</h4>
              <ul className="list-disc pl-5 space-y-1">
                {fitnessLevel === 'beginner' && (
                  <>
                    <li>Start with 2-3 sessions per week</li>
                    <li>Focus on Zone 1-2 for the first month</li>
                    <li>Gradually increase duration before intensity</li>
                  </>
                )}
                {fitnessLevel === 'intermediate' && (
                  <>
                    <li>Train 3-5 times per week</li>
                    <li>Mix different zones in your training</li>
                    <li>Include one long session and one interval session weekly</li>
                  </>
                )}
                {fitnessLevel === 'advanced' && (
                  <>
                    <li>Train 5-6 times per week</li>
                    <li>Focus on specific zones based on training phase</li>
                    <li>Include periodization in your training plan</li>
                  </>
                )}
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Based on your goals</h4>
              <ul className="list-disc pl-5 space-y-1">
                {goals.includes('weight_loss') && (
                  <>
                    <li>Focus on Zone 2 training for optimal fat burning</li>
                    <li>Include 2-3 sessions of Zone 3 training per week</li>
                    <li>Add 1-2 HIIT sessions in Zone 4-5</li>
                  </>
                )}
                {goals.includes('endurance') && (
                  <>
                    <li>Spend 70-80% of training time in Zone 2</li>
                    <li>Include 1-2 long sessions in Zone 3 per week</li>
                    <li>Add tempo runs in Zone 4 once a week</li>
                  </>
                )}
                {goals.includes('performance') && (
                  <>
                    <li>Focus on Zone 4-5 training for speed and power</li>
                    <li>Include interval training with specific work:rest ratios</li>
                    <li>Maintain 1-2 long endurance sessions in Zone 2-3</li>
                  </>
                )}
                {goals.includes('recovery') && (
                  <>
                    <li>Prioritize Zone 1 training (50-60% of max HR) for active recovery days</li>
                    <li>Keep heart rate low during recovery sessions to promote healing</li>
                    <li>Consider alternating hard training days with Zone 1 recovery days</li>
                  </>
                )}
                {goals.includes('health') && (
                  <>
                    <li>Aim for a balanced approach across all heart rate zones</li>
                    <li>Spend most training time in Zone 2 for cardiovascular health</li>
                    <li>Include at least 150 minutes of moderate activity per week</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 