
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface BodyFatChartProps {
  bodyFatPercentage: number;
  gender: string;
}

const BodyFatChart: React.FC<BodyFatChartProps> = ({ bodyFatPercentage, gender }) => {
  // Define categories based on gender
  const categories = gender === 'male' 
    ? [
        { name: 'Essential Fat', min: 2, max: 5, color: '#2196F3' },
        { name: 'Athletic', min: 6, max: 13, color: '#4CAF50' },
        { name: 'Fitness', min: 14, max: 17, color: '#00BCD4' },
        { name: 'Average', min: 18, max: 24, color: '#FFEB3B' },
        { name: 'Overweight', min: 25, max: 30, color: '#FF9800' },
        { name: 'Obese', min: 31, max: 50, color: '#F44336' }
      ]
    : [
        { name: 'Essential Fat', min: 10, max: 13, color: '#2196F3' },
        { name: 'Athletic', min: 14, max: 20, color: '#4CAF50' },
        { name: 'Fitness', min: 21, max: 24, color: '#00BCD4' },
        { name: 'Average', min: 25, max: 31, color: '#FFEB3B' },
        { name: 'Overweight', min: 32, max: 37, color: '#FF9800' },
        { name: 'Obese', min: 38, max: 50, color: '#F44336' }
      ];

  // Find the category for the current body fat percentage
  const currentCategory = categories.find(
    category => bodyFatPercentage >= category.min && bodyFatPercentage <= category.max
  ) || categories[categories.length - 1];

  // Create data for the chart
  const chartData = categories.map(category => ({
    name: category.name,
    range: category.max - category.min,
    min: category.min,
    max: category.max,
    color: category.color,
    isCurrent: category.name === currentCategory.name
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{`Range: ${data.min}% - ${data.max}%`}</p>
          {data.isCurrent && (
            <p className="text-sm font-semibold text-primary mt-1">
              Your body fat: {bodyFatPercentage}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, gender === 'male' ? 50 : 50]}
          label={{ value: 'Body Fat Percentage (%)', position: 'insideBottom', offset: -5 }}
        />
        <YAxis dataKey="name" type="category" />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="range" 
          barSize={20}
          fill="var(--primary)"
          background={{ fill: '#eee' }}
        >
          {chartData.map((entry, index) => (
            <rect 
              key={`cell-${index}`}
              x={entry.min}
              width={entry.range}
              y={index * 40 + 10}
              height={20}
              fill={entry.isCurrent ? 'var(--primary)' : entry.color}
              opacity={entry.isCurrent ? 1 : 0.7}
            />
          ))}
        </Bar>
        <ReferenceLine
          x={bodyFatPercentage}
          stroke="var(--primary)"
          strokeWidth={2}
          label={{
            value: `${bodyFatPercentage}%`,
            position: 'top',
            fill: 'var(--primary)',
            fontSize: 14,
            fontWeight: 'bold'
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BodyFatChart;
