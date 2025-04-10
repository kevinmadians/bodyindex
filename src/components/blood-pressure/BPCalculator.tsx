import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, Copy, Download, AlertTriangle, Info, Trash2, Activity } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  getBPCategory,
  getBPCategoryColor,
  getBPDescription,
  getBPRecommendations,
  calculateMAP,
  calculatePulsePressure,
  BPReading
} from '@/lib/blood-pressure-utils';
import BPChart from '@/components/blood-pressure/BPChart';
import BPHistory from '@/components/blood-pressure/BPHistory';
import BPCategoryGuide from '@/components/blood-pressure/BPCategoryGuide';

export const BPCalculator = () => {
  const { toast } = useToast();
  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [pulse, setPulse] = useState<number>(72);
  const [notes, setNotes] = useState<string>('');
  const [readings, setReadings] = useState<BPReading[]>([]);
  const [activeTab, setActiveTab] = useState<string>('input');
  const [copied, setCopied] = useState<boolean>(false);
  
  // Ref for the results section
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load readings from localStorage on component mount
  useEffect(() => {
    const savedReadings = localStorage.getItem('bpReadings');
    if (savedReadings) {
      try {
        setReadings(JSON.parse(savedReadings));
      } catch (error) {
        console.error('Error parsing saved readings:', error);
      }
    }
  }, []);

  // Save readings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bpReadings', JSON.stringify(readings));
  }, [readings]);

  // Get current blood pressure category and info
  const category = getBPCategory(systolic, diastolic);
  const categoryColor = getBPCategoryColor(category);
  const description = getBPDescription(category);
  const recommendations = getBPRecommendations(category);
  const map = calculateMAP(systolic, diastolic);
  const pulsePressure = calculatePulsePressure(systolic, diastolic);

  // Handle saving a reading
  const handleSaveReading = () => {
    const now = new Date();
    // Ensure all properties match the BPReading interface
    const newReading: BPReading = {
      id: uuidv4(),
      date: now.toISOString(),
      time: format(now, 'HH:mm'),
      systolic,
      diastolic,
      pulse,
      notes: notes || undefined
    };

    setReadings(prev => [newReading, ...prev]);
    toast({
      title: "Reading saved",
      description: "Your blood pressure reading has been saved successfully.",
      duration: 2000, // 2 seconds only
      className: "bg-primary/90 text-white border-none"
    });
    setNotes('');
    
    // Scroll to results section
    setTimeout(() => {
      if (resultsRef.current) {
        const yOffset = -80; // Offset to ensure the "Your Results" heading is visible
        const element = resultsRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 300); // Increased delay to ensure content is rendered
  };

  // Handle deleting a reading
  const handleDeleteReading = (id: string) => {
    setReadings(prev => prev.filter(reading => reading.id !== id));
    toast({
      title: "Reading deleted",
      description: "The blood pressure reading has been removed.",
      duration: 2000, // 2 seconds only
      className: "bg-destructive/90 text-white border-none"
    });
  };

  // Handle clearing all readings
  const handleClearAllReadings = () => {
    if (window.confirm('Are you sure you want to delete all saved readings? This action cannot be undone.')) {
      setReadings([]);
      toast({
        title: "All readings cleared",
        description: "All your blood pressure readings have been deleted.",
        duration: 2000, // 2 seconds only
        className: "bg-destructive/90 text-white border-none"
      });
    }
  };

  // Handle copying results to clipboard
  const handleCopyResults = () => {
    const resultsText = `
Blood Pressure Reading:
Systolic: ${systolic} mmHg
Diastolic: ${diastolic} mmHg
Pulse: ${pulse} bpm
Category: ${category}
MAP: ${map.toFixed(1)} mmHg
Pulse Pressure: ${pulsePressure} mmHg
Date: ${format(new Date(), 'PPP')}
Time: ${format(new Date(), 'p')}
${notes ? `Notes: ${notes}` : ''}
    `.trim();

    navigator.clipboard.writeText(resultsText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Blood pressure results have been copied to your clipboard.",
        duration: 2000, // 2 seconds only
        className: "bg-primary/90 text-white border-none"
      });
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  };

  // Handle exporting data as CSV
  const handleExportData = () => {
    if (readings.length === 0) {
      toast({
        title: "No data to export",
        description: "You don't have any saved readings to export.",
        variant: "destructive",
        duration: 2000, // 2 seconds only
        className: "bg-destructive/90 text-white border-none"
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
      
      return `${formattedDate},${reading.time},${reading.systolic},${reading.diastolic},${reading.pulse || ''},${category},${map.toFixed(1)},${pulsePressure},"${notes}"`;
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
      duration: 2000, // 2 seconds only
      className: "bg-primary/90 text-white border-none"
    });
  };

  // Emergency alert if in hypertensive crisis
  const showEmergencyAlert = category === 'Hypertensive Crisis';

  return (
    <div className="space-y-6">
      {showEmergencyAlert && (
        <Alert variant="destructive" className="animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Emergency Medical Attention Required</AlertTitle>
          <AlertDescription>
            Your blood pressure reading indicates a hypertensive crisis. Seek immediate medical attention if you are experiencing chest pain, shortness of breath, back pain, numbness/weakness, change in vision, or difficulty speaking.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="input" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Blood Pressure Check</TabsTrigger>
          <TabsTrigger value="history">Your History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Enter Your Blood Pressure Reading</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="systolic" className="block mb-2">
                        Systolic (mmHg)
                      </Label>
                      <Input
                        id="systolic"
                        type="number"
                        value={systolic}
                        onChange={(e) => setSystolic(Number(e.target.value))}
                        min={70}
                        max={250}
                        className="w-full"
                      />
                      <Slider 
                        value={[systolic]} 
                        min={70} 
                        max={220} 
                        step={1} 
                        onValueChange={(value) => setSystolic(value[0])}
                        className="mt-2" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="diastolic" className="block mb-2">
                        Diastolic (mmHg)
                      </Label>
                      <Input
                        id="diastolic"
                        type="number"
                        value={diastolic}
                        onChange={(e) => setDiastolic(Number(e.target.value))}
                        min={40}
                        max={150}
                        className="w-full"
                      />
                      <Slider 
                        value={[diastolic]} 
                        min={40} 
                        max={140} 
                        step={1} 
                        onValueChange={(value) => setDiastolic(value[0])}
                        className="mt-2" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="pulse" className="block mb-2">
                      Pulse Rate (bpm)
                    </Label>
                    <Input
                      id="pulse"
                      type="number"
                      value={pulse}
                      onChange={(e) => setPulse(Number(e.target.value))}
                      min={40}
                      max={220}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes" className="block mb-2">
                      Notes (optional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any relevant information about this reading (time of day, after exercise, medication, etc.)"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button onClick={handleSaveReading} className="flex-1">
                      Save Reading
                    </Button>
                    <Button variant="outline" onClick={handleCopyResults} className="flex items-center gap-2 flex-1">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Copied' : 'Copy Results'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="pt-6">
                <div ref={resultsRef} className="scroll-mt-20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Your Results</h3>
                    <div 
                      className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                      style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColor }}></div>
                      {category}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32 flex items-center justify-center bg-gray-100 rounded-full">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{systolic}/{diastolic}</div>
                        <div className="text-xs text-gray-500">mmHg</div>
                      </div>
                      <div className="absolute -bottom-2 bg-primary text-white px-2 py-0.5 rounded-full text-xs">
                        {pulse} bpm
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Mean Arterial Pressure</div>
                      <div className="text-xl font-semibold">{map.toFixed(1)} mmHg</div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Pulse Pressure</div>
                      <div className="text-xl font-semibold">{pulsePressure} mmHg</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Analysis</h4>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="text-sm space-y-1">
                      {recommendations.slice(0, 4).map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                          <span className="text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                    {recommendations.length > 4 && (
                      <p className="text-xs text-primary mt-2 cursor-pointer hover:underline">
                        See more recommendations below ↓
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Only show trend card if there are readings */}
          {readings.length > 0 && (
            <Card className="mt-6 mb-16">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Blood Pressure Trend</h3>
                  <Button variant="outline" size="sm" onClick={handleExportData} className="text-xs flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    Export Data
                  </Button>
                </div>
                <div className="h-[300px]">
                  <BPChart readings={readings.slice(0, 10).reverse()} />
                </div>
              </CardContent>
            </Card>
          )}
          
          <div id="bp-categories" className="scroll-mt-16">
            <h2 className="text-2xl font-bold text-center mb-6 sm:mb-8 text-primary">
              Understanding Blood Pressure Categories
            </h2>
            
            <Card className="border-t-4 border-primary shadow-md mx-0">
              <CardContent className="pt-6 px-0 sm:px-6">
                <BPCategoryGuide />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <BPHistory 
            readings={readings} 
            onDeleteReading={handleDeleteReading} 
            onClearAllReadings={handleClearAllReadings}
            onExportData={handleExportData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}; 