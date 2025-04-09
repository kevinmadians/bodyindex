import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import * as d3 from 'd3';

interface MacroResultProps {
  result: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    proteinPercentage: number;
    carbsPercentage: number;
    fatPercentage: number;
    proteinCalories: number;
    carbsCalories: number;
    fatCalories: number;
    mealPlan: {
      meals: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  goal: string;
}

export const MacroResults: React.FC<MacroResultProps> = ({ result, goal }) => {
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);

  // Goal-specific messages
  const goalMessages = {
    lose: {
      title: 'Weight Loss Plan',
      description: 'This calorie deficit plan is designed to help you lose weight gradually while preserving muscle mass.',
      tips: [
        'Focus on high protein foods to stay fuller longer',
        'Prioritize nutrient-dense, low-calorie foods',
        'Incorporate both strength training and cardio',
        'Drink plenty of water to help manage hunger'
      ]
    },
    maintain: {
      title: 'Maintenance Plan',
      description: 'This balanced plan provides the calories and nutrients you need to maintain your current weight and support overall health.',
      tips: [
        'Eat balanced meals with protein, quality carbs, and healthy fats',
        'Focus on portion control and mindful eating',
        'Maintain regular physical activity',
        'Listen to your body\'s hunger and fullness cues'
      ]
    },
    gain: {
      title: 'Muscle Gain Plan',
      description: 'This plan provides a calorie surplus with increased protein to support muscle growth and recovery.',
      tips: [
        'Prioritize protein intake around your workouts',
        'Focus on progressive overload in strength training',
        'Eat enough carbs to fuel intense workouts',
        'Don\'t neglect quality fats for hormonal health'
      ]
    },
    performance: {
      title: 'Athletic Performance Plan',
      description: 'This carbohydrate-focused plan is designed to fuel intense athletic activity and support recovery.',
      tips: [
        'Time carbohydrates around your training sessions',
        'Consume protein regularly throughout the day',
        'Stay properly hydrated before, during, and after exercise',
        'Use carb-rich snacks before intense training sessions'
      ]
    }
  };

  const currentGoal = goal as keyof typeof goalMessages;

  // Create pie chart for macronutrient percentages
  useEffect(() => {
    if (!pieChartRef.current) return;

    // Clear any existing chart
    d3.select(pieChartRef.current).selectAll('*').remove();

    // Set up dimensions
    const width = 220;
    const height = 220;
    const radius = Math.min(width, height) / 2;

    // Create SVG element
    const svg = d3.select(pieChartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Data for the pie chart
    const data = [
      { name: 'Protein', value: result.proteinPercentage, color: '#4F46E5' },
      { name: 'Carbs', value: result.carbsPercentage, color: '#06B6D4' },
      { name: 'Fat', value: result.fatPercentage, color: '#14B8A6' }
    ];

    // Set up pie generator
    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null);

    // Set up arc generator
    const arc = d3.arc<any>()
      .innerRadius(radius * 0.4) // Make it a donut chart
      .outerRadius(radius * 0.8);

    // Set up arc for labels
    const labelArc = d3.arc<any>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Generate pie slices
    const slices = svg.selectAll('.slice')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'slice');

    // Add slice paths
    slices.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(i(t));
        };
      });

    // Add central text
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('class', 'text-sm font-medium')
      .text(`${result.calories}`);

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('class', 'text-xs')
      .text('calories');

    // Add labels with percentages
    slices.append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs font-bold')
      .text(d => `${d.data.value}%`)
      .style('fill', d => d.data.color)
      .style('opacity', 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);
  }, [result]);

  // Create bar chart for macronutrient grams and calories
  useEffect(() => {
    if (!barChartRef.current) return;

    // Clear any existing chart
    d3.select(barChartRef.current).selectAll('*').remove();

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 280 - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select(barChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Data for the bar chart
    const data = [
      { name: 'Protein', grams: result.protein, calories: result.proteinCalories, color: '#4F46E5' },
      { name: 'Carbs', grams: result.carbs, calories: result.carbsCalories, color: '#06B6D4' },
      { name: 'Fat', grams: result.fat, calories: result.fatCalories, color: '#14B8A6' }
    ];

    // Set up scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.3);

    const yGrams = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.grams) as number * 1.2])
      .range([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('font-size', '12px');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(yGrams).ticks(5))
      .selectAll('text')
      .attr('font-size', '10px');

    // Add Y axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left / 1.5}, ${height / 2}) rotate(-90)`)
      .attr('font-size', '12px')
      .text('Grams per day');

    // Add bars with transition
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name) as number)
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', d => d.color)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200)
      .attr('y', d => yGrams(d.grams))
      .attr('height', d => height - yGrams(d.grams));

    // Add values on top of bars
    svg.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('x', d => (x(d.name) as number) + x.bandwidth() / 2)
      .attr('y', d => yGrams(d.grams) - 5)
      .attr('font-size', '10px')
      .attr('opacity', 0)
      .text(d => `${d.grams}g`)
      .transition()
      .duration(500)
      .delay((d, i) => 1000 + i * 200)
      .attr('opacity', 1);
  }, [result]);

  const handleDownload = () => {
    // Create content string
    const content = `
MACRO NUTRITION PLAN
============================
Daily Calorie Target: ${result.calories} calories

MACRONUTRIENT BREAKDOWN
----------------------------
Protein: ${result.protein}g (${result.proteinPercentage}% - ${result.proteinCalories} calories)
Carbohydrates: ${result.carbs}g (${result.carbsPercentage}% - ${result.carbsCalories} calories)
Fat: ${result.fat}g (${result.fatPercentage}% - ${result.fatCalories} calories)

PER MEAL BREAKDOWN (${result.mealPlan.meals} meals per day)
----------------------------
Protein per meal: ${result.mealPlan.protein}g
Carbohydrates per meal: ${result.mealPlan.carbs}g
Fat per meal: ${result.mealPlan.fat}g

TIPS FOR ${goalMessages[currentGoal].title.toUpperCase()}
----------------------------
${goalMessages[currentGoal].tips.join('\n')}

Generated by Body Index - Your Health Companion
https://bodyindex.health
    `.trim();

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'macro-nutrition-plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <motion.h2 
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {goalMessages[currentGoal].title}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {goalMessages[currentGoal].description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Daily Macros Distribution</h3>
            <div className="flex justify-center">
              <div ref={pieChartRef} className="flex justify-center"></div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4F46E5]"></div>
                <span className="text-sm font-medium">Protein</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#06B6D4]"></div>
                <span className="text-sm font-medium">Carbs</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#14B8A6]"></div>
                <span className="text-sm font-medium">Fat</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Macros in Grams</h3>
            <div ref={barChartRef} className="flex justify-center"></div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-primary/5 p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-center mb-2">Daily Targets</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Calories:</span>
                <span className="font-semibold">{result.calories} kcal</span>
              </li>
              <li className="flex justify-between">
                <span>Protein:</span>
                <span className="font-semibold">{result.protein}g ({result.proteinPercentage}%)</span>
              </li>
              <li className="flex justify-between">
                <span>Carbs:</span>
                <span className="font-semibold">{result.carbs}g ({result.carbsPercentage}%)</span>
              </li>
              <li className="flex justify-between">
                <span>Fat:</span>
                <span className="font-semibold">{result.fat}g ({result.fatPercentage}%)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-primary/5 p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-center mb-2">Per Meal ({result.mealPlan.meals}x daily)</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Calories:</span>
                <span className="font-semibold">{Math.round(result.calories / result.mealPlan.meals)} kcal</span>
              </li>
              <li className="flex justify-between">
                <span>Protein:</span>
                <span className="font-semibold">{result.mealPlan.protein}g</span>
              </li>
              <li className="flex justify-between">
                <span>Carbs:</span>
                <span className="font-semibold">{result.mealPlan.carbs}g</span>
              </li>
              <li className="flex justify-between">
                <span>Fat:</span>
                <span className="font-semibold">{result.mealPlan.fat}g</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-primary/5 p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-center mb-2">Key Tips</h3>
            <ul className="space-y-1 text-sm">
              {goalMessages[currentGoal].tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            variant="outline" 
            className="flex gap-2 items-center" 
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            Download Plan
          </Button>
          <Button 
            variant="outline" 
            className="flex gap-2 items-center"
            onClick={() => {
              navigator.clipboard.writeText(
                `My daily macro targets: ${result.calories} calories, ${result.protein}g protein (${result.proteinPercentage}%), ${result.carbs}g carbs (${result.carbsPercentage}%), ${result.fat}g fat (${result.fatPercentage}%). Check your own at https://bodyindex.health`
              );
              alert('Macro plan copied to clipboard!');
            }}
          >
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}; 