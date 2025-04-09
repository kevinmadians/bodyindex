import React, { useState, useEffect } from 'react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  BarChart, 
  Calendar, 
  ActivitySquare, 
  Loader2, 
  Info, 
  AlertTriangle, 
  Check,
  BookOpen
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  BPReading,
  getBPCategory,
  getBPCategoryColor,
  calculateMAP,
  calculatePulsePressure,
  filterBPReadingsByDateRange,
  calculateAverageBP
} from '@/lib/blood-pressure-utils';
import BPCalculator from './BPCalculator';
import BPHistory from './BPHistory';
import BPChart from './BPChart';
import BPCategoryGuide from './BPCategoryGuide';

interface BPStats {
  totalReadings: number;
  averageSystolic: number;
  averageDiastolic: number;
  averageMAP: number;
  averagePP: number;
  mostCommonCategory: string;
  latestReading: BPReading | null;
  weeklyTrend: 'improving' | 'stable' | 'worsening' | 'insufficient';
}

export const BPTracking = () => {
  const { toast } = useToast();
  const [readings, setReadings] = useState<BPReading[]>([]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');
  const [stats, setStats] = useState<BPStats>({
    totalReadings: 0,
    averageSystolic: 0,
    averageDiastolic: 0,
    averageMAP: 0,
    averagePP: 0,
    mostCommonCategory: 'N/A',
    latestReading: null,
    weeklyTrend: 'insufficient'
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load readings from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedReadings = localStorage.getItem('bpReadings');
    if (savedReadings) {
      try {
        const parsedReadings = JSON.parse(savedReadings);
        setReadings(parsedReadings);
        calculateStats(parsedReadings);
      } catch (error) {
        console.error('Error parsing saved readings:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading your saved blood pressure readings.",
          variant: "destructive"
        });
      }
    }
    setIsLoading(false);
  }, []);

  // Save readings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bpReadings', JSON.stringify(readings));
    calculateStats(readings);
  }, [readings, timeRange]);

  // Calculate statistics based on readings
  const calculateStats = (data: BPReading[]) => {
    if (data.length === 0) {
      setStats({
        totalReadings: 0,
        averageSystolic: 0,
        averageDiastolic: 0,
        averageMAP: 0,
        averagePP: 0,
        mostCommonCategory: 'N/A',
        latestReading: null,
        weeklyTrend: 'insufficient'
      });
      return;
    }

    // Filter readings based on selected time range
    let filteredData = [...data];
    const now = new Date();
    
    if (timeRange === 'week') {
      const oneWeekAgo = subDays(now, 7);
      filteredData = filterBPReadingsByDateRange(data, startOfDay(oneWeekAgo), endOfDay(now));
    } else if (timeRange === 'month') {
      const oneMonthAgo = subDays(now, 30);
      filteredData = filterBPReadingsByDateRange(data, startOfDay(oneMonthAgo), endOfDay(now));
    }

    // Sort readings by date (newest first)
    const sortedData = [...filteredData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Get latest reading
    const latestReading = sortedData.length > 0 ? sortedData[0] : null;

    // Calculate average values
    const averages = calculateAverageBP(filteredData);

    // Determine most common category
    const categories: Record<string, number> = {};
    filteredData.forEach(reading => {
      const category = getBPCategory(reading.systolic, reading.diastolic);
      categories[category] = (categories[category] || 0) + 1;
    });

    const mostCommonCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    // Determine weekly trend
    let weeklyTrend: 'improving' | 'stable' | 'worsening' | 'insufficient' = 'insufficient';
    
    if (filteredData.length >= 3) {
      // Split readings into newer half and older half
      const halfPoint = Math.floor(filteredData.length / 2);
      const newerReadings = sortedData.slice(0, halfPoint);
      const olderReadings = sortedData.slice(halfPoint);
      
      // Calculate averages for both halves
      const newerAvg = calculateAverageBP(newerReadings);
      const olderAvg = calculateAverageBP(olderReadings);
      
      // Compare systolic and diastolic values to determine trend
      const systolicDiff = newerAvg.systolic - olderAvg.systolic;
      const diastolicDiff = newerAvg.diastolic - olderAvg.diastolic;
      
      // If both values improved by at least 3 points
      if (systolicDiff < -3 && diastolicDiff < -3) {
        weeklyTrend = 'improving';
      } 
      // If both values worsened by at least 3 points
      else if (systolicDiff > 3 && diastolicDiff > 3) {
        weeklyTrend = 'worsening';
      } 
      // Otherwise consider it stable
      else {
        weeklyTrend = 'stable';
      }
    }

    setStats({
      totalReadings: filteredData.length,
      averageSystolic: averages.systolic,
      averageDiastolic: averages.diastolic,
      averageMAP: calculateMAP(averages.systolic, averages.diastolic),
      averagePP: calculatePulsePressure(averages.systolic, averages.diastolic),
      mostCommonCategory,
      latestReading,
      weeklyTrend
    });
  };

  // Handle saving a new reading (from calculator)
  const handleSaveReading = (reading: BPReading) => {
    setReadings(prev => [reading, ...prev]);
    toast({
      title: "Reading saved",
      description: "Your blood pressure reading has been saved successfully.",
    });
    
    // Switch to dashboard after saving
    setActiveTab('dashboard');
  };

  // Handle deleting a reading
  const handleDeleteReading = (id: string) => {
    setReadings(prev => prev.filter(reading => reading.id !== id));
    toast({
      title: "Reading deleted",
      description: "The blood pressure reading has been removed.",
    });
  };

  // Handle clearing all readings
  const handleClearAllReadings = () => {
    if (window.confirm('Are you sure you want to delete all saved readings? This action cannot be undone.')) {
      setReadings([]);
      toast({
        title: "All readings cleared",
        description: "All your blood pressure readings have been deleted.",
      });
    }
  };

  // Handle exporting data
  const handleExportData = () => {
    if (readings.length === 0) {
      toast({
        title: "No data to export",
        description: "You don't have any saved readings to export.",
        variant: "destructive"
      });
      return;
    }

    // Create CSV header
    const csvHeader = "Date,Time,Systolic (mmHg),Diastolic (mmHg),Pulse (bpm),Category,MAP (mmHg),Pulse Pressure (mmHg),Notes\n";
    
    // Create CSV rows
    const csvRows = readings.map(reading => {
      const date = new Date(reading.date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const category = getBPCategory(reading.systolic, reading.diastolic);
      const map = calculateMAP(reading.systolic, reading.diastolic);
      const pulsePressure = calculatePulsePressure(reading.systolic, reading.diastolic);
      const notes = reading.notes ? reading.notes.replace(/,/g, ';').replace(/\n/g, ' ') : '';
      
      return `${formattedDate},${reading.time || ''},${reading.systolic},${reading.diastolic},${reading.pulse || ''},${category},${map.toFixed(1)},${pulsePressure},"${notes}"`;
    }).join('\n');
    
    // Combine header and rows
    const csvContent = csvHeader + csvRows;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `blood-pressure-data-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Data exported",
      description: "Your blood pressure data has been exported as a CSV file.",
    });
  };

  // Get color for trend
  const getTrendColor = () => {
    switch (stats.weeklyTrend) {
      case 'improving': return 'text-green-500';
      case 'stable': return 'text-amber-500';
      case 'worsening': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  // Get text for trend
  const getTrendText = () => {
    switch (stats.weeklyTrend) {
      case 'improving': return 'Improving';
      case 'stable': return 'Stable';
      case 'worsening': return 'Worsening';
      default: return 'Insufficient data';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Blood Pressure Tracking</h2>
        <Button 
          variant="outline" 
          onClick={() => setActiveTab('add')}
          className="hidden sm:flex"
        >
          Add New Reading
        </Button>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">
            <ActivitySquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="add">
            <LineChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Reading</span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="trends">
            <BarChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Trends</span>
          </TabsTrigger>
          <TabsTrigger value="education">
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Learn</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Time range selector */}
              <Card className="col-span-full">
                <CardContent className="pt-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Blood Pressure Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your blood pressure readings and trends
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant={timeRange === 'week' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeRange('week')}
                    >
                      Week
                    </Button>
                    <Button 
                      variant={timeRange === 'month' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeRange('month')}
                    >
                      Month
                    </Button>
                    <Button 
                      variant={timeRange === 'all' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeRange('all')}
                    >
                      All Time
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Latest Reading */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Latest Reading</CardTitle>
                  <CardDescription>
                    {stats.latestReading ? 
                      format(new Date(stats.latestReading.date), 'PPP') + 
                      (stats.latestReading.time ? ` at ${stats.latestReading.time}` : '') 
                      : 'No readings yet'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.latestReading ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-3xl font-bold">
                            {stats.latestReading.systolic}/{stats.latestReading.diastolic}
                          </div>
                          <div className="text-sm text-muted-foreground">mmHg</div>
                        </div>
                        <div>
                          <Badge
                            className="ml-2"
                            style={{
                              backgroundColor: `${getBPCategoryColor(getBPCategory(stats.latestReading.systolic, stats.latestReading.diastolic))}20`,
                              color: getBPCategoryColor(getBPCategory(stats.latestReading.systolic, stats.latestReading.diastolic))
                            }}
                          >
                            {getBPCategory(stats.latestReading.systolic, stats.latestReading.diastolic)}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted/40 p-2 rounded">
                          <div className="text-xs text-muted-foreground">MAP</div>
                          <div className="text-lg font-medium">
                            {calculateMAP(stats.latestReading.systolic, stats.latestReading.diastolic).toFixed(1)}
                          </div>
                        </div>
                        <div className="bg-muted/40 p-2 rounded">
                          <div className="text-xs text-muted-foreground">Pulse Pressure</div>
                          <div className="text-lg font-medium">
                            {calculatePulsePressure(stats.latestReading.systolic, stats.latestReading.diastolic)}
                          </div>
                        </div>
                      </div>
                      {stats.latestReading.pulse && (
                        <div className="pt-2">
                          <div className="text-xs text-muted-foreground">Pulse</div>
                          <div className="text-lg font-medium">{stats.latestReading.pulse} bpm</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                      <Info className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                      <p className="text-muted-foreground">No readings available</p>
                      <Button 
                        variant="link" 
                        onClick={() => setActiveTab('add')} 
                        className="mt-2"
                      >
                        Add your first reading
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Average */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Average 
                    {timeRange === 'week' && ' (Last 7 days)'}
                    {timeRange === 'month' && ' (Last 30 days)'}
                    {timeRange === 'all' && ' (All time)'}
                  </CardTitle>
                  <CardDescription>
                    Based on {stats.totalReadings} reading{stats.totalReadings !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.totalReadings > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-3xl font-bold">
                            {Math.round(stats.averageSystolic)}/{Math.round(stats.averageDiastolic)}
                          </div>
                          <div className="text-sm text-muted-foreground">mmHg</div>
                        </div>
                        <div>
                          <Badge
                            className="ml-2"
                            style={{
                              backgroundColor: `${getBPCategoryColor(getBPCategory(stats.averageSystolic, stats.averageDiastolic))}20`,
                              color: getBPCategoryColor(getBPCategory(stats.averageSystolic, stats.averageDiastolic))
                            }}
                          >
                            {getBPCategory(stats.averageSystolic, stats.averageDiastolic)}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted/40 p-2 rounded">
                          <div className="text-xs text-muted-foreground">Avg. MAP</div>
                          <div className="text-lg font-medium">
                            {stats.averageMAP.toFixed(1)}
                          </div>
                        </div>
                        <div className="bg-muted/40 p-2 rounded">
                          <div className="text-xs text-muted-foreground">Avg. Pulse Pressure</div>
                          <div className="text-lg font-medium">
                            {stats.averagePP.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                      <Info className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                      <p className="text-muted-foreground">No data for this period</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">BP Trend</CardTitle>
                  <CardDescription>
                    {timeRange === 'week' ? 'Last 7 days' : timeRange === 'month' ? 'Last 30 days' : 'Overall trend'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.totalReadings >= 3 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className={`text-2xl font-bold ${getTrendColor()}`}>
                            {getTrendText()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stats.weeklyTrend === 'improving' && 'Your blood pressure is trending better'}
                            {stats.weeklyTrend === 'stable' && 'Your blood pressure is relatively stable'}
                            {stats.weeklyTrend === 'worsening' && 'Your blood pressure is trending higher'}
                          </div>
                        </div>
                        <div>
                          {stats.weeklyTrend === 'improving' && <Check className="h-8 w-8 text-green-500" />}
                          {stats.weeklyTrend === 'stable' && <Info className="h-8 w-8 text-amber-500" />}
                          {stats.weeklyTrend === 'worsening' && <AlertTriangle className="h-8 w-8 text-red-500" />}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Most common category: <span className="font-medium">{stats.mostCommonCategory}</span></p>
                      </div>
                      {stats.weeklyTrend === 'worsening' && (
                        <div className="p-2 rounded bg-red-50 dark:bg-red-950/20 text-sm border border-red-100 dark:border-red-900/30 mt-2">
                          <p className="font-medium text-red-800 dark:text-red-300">Recommendations:</p>
                          <ul className="list-disc list-inside text-red-700 dark:text-red-400 mt-1 text-xs">
                            <li>Consider consulting with your healthcare provider</li>
                            <li>Check your medication adherence if applicable</li>
                            <li>Monitor your salt intake and stress levels</li>
                            <li>Take more frequent readings to track changes</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                      <Info className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                      <p className="text-muted-foreground">Need at least 3 readings to analyze trends</p>
                      {stats.totalReadings > 0 && stats.totalReadings < 3 && (
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab('add')} 
                          className="mt-2"
                        >
                          Add more readings
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Mini chart */}
              <Card className="col-span-full md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-base">Blood Pressure Trend Chart</CardTitle>
                  <CardDescription>
                    Visual representation of your blood pressure over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {readings.length > 0 ? (
                    <BPChart readings={readings.slice(0, 14)} />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Info className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                      <p className="text-muted-foreground">Add readings to see your trend chart</p>
                      <Button 
                        variant="link" 
                        onClick={() => setActiveTab('add')} 
                        className="mt-2"
                      >
                        Add your first reading
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        {/* Add Reading Tab */}
        <TabsContent value="add">
          <BPCalculator 
            onSaveReading={handleSaveReading}
          />
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history">
          <BPHistory 
            readings={readings} 
            onDeleteReading={handleDeleteReading}
            onClearAll={handleClearAllReadings}
            onExportData={handleExportData}
          />
        </TabsContent>
        
        {/* Trends Tab */}
        <TabsContent value="trends">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Blood Pressure Chart</CardTitle>
                <CardDescription>View your readings over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {readings.length > 0 ? (
                  <BPChart readings={readings} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Info className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                    <p className="text-muted-foreground">No readings available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">BP Category Distribution</CardTitle>
                <CardDescription>Breakdown of your blood pressure categories</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {readings.length > 0 ? (
                  <div className="space-y-4 h-full flex flex-col justify-center">
                    {/* Simple category distribution visualization */}
                    {['Low Blood Pressure', 'Normal', 'Elevated', 'Hypertension Stage 1', 'Hypertension Stage 2', 'Hypertensive Crisis'].map(category => {
                      const categoryReadings = readings.filter(r => 
                        getBPCategory(r.systolic, r.diastolic) === category
                      );
                      const percentage = readings.length > 0 
                        ? (categoryReadings.length / readings.length) * 100 
                        : 0;
                      
                      return (
                        <div key={category}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium">{category}</div>
                            <div className="text-sm text-muted-foreground">
                              {categoryReadings.length} ({percentage.toFixed(1)}%)
                            </div>
                          </div>
                          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: getBPCategoryColor(category)
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Info className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                    <p className="text-muted-foreground">No readings available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Education Tab */}
        <TabsContent value="education">
          <BPCategoryGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BPTracking; 