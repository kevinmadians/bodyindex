import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { format } from 'date-fns';

interface SleepCycle {
  stage: string;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
}

interface SleepCycleChartProps {
  cycles: SleepCycle[];
  width?: number;
  height?: number;
}

const stageColors: Record<string, string> = {
  'Falling Asleep': '#6B7280', // Gray
  'NREM 1': '#60A5FA', // Light blue
  'NREM 2': '#3B82F6', // Blue
  'NREM 3': '#1D4ED8', // Dark blue
  'REM': '#8B5CF6', // Purple
};

const SleepCycleChart: React.FC<SleepCycleChartProps> = ({ 
  cycles, 
  width = 600, 
  height = 300 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!cycles || cycles.length === 0 || !svgRef.current) return;
    
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Clear any existing SVG
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Create root SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Get overall start and end times
    const startTime = cycles[0].startTime;
    const endTime = cycles[cycles.length - 1].endTime;
    
    // X scale (time)
    const x = d3.scaleTime()
      .domain([startTime, endTime])
      .range([0, innerWidth]);
    
    // Y scale (sleep stages)
    const stages = ['Falling Asleep', 'NREM 1', 'NREM 2', 'NREM 3', 'REM'];
    
    const y = d3.scaleBand()
      .domain(stages)
      .range([0, innerHeight])
      .padding(0.1);
    
    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x)
        .ticks(6)
        .tickFormat((d) => format(d as Date, 'h:mm a')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');
    
    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));
    
    // Draw rectangles for each sleep stage period
    cycles.forEach(cycle => {
      svg.append('rect')
        .attr('x', x(cycle.startTime))
        .attr('y', y(cycle.stage) || 0)
        .attr('width', x(cycle.endTime) - x(cycle.startTime))
        .attr('height', y.bandwidth())
        .attr('fill', stageColors[cycle.stage] || '#ccc')
        .attr('opacity', 0.8)
        .attr('rx', 3) // Rounded corners
        .attr('ry', 3);
    });
    
    // Add cycle numbers
    let currentCycle = 0;
    let cycleStartX = 0;
    
    cycles.forEach((cycle, i) => {
      // If this is REM sleep, it marks the end of a complete cycle
      if (cycle.stage === 'REM' && i > 0) {
        currentCycle++;
        
        // Calculate center position of this cycle
        const cycleEndX = x(cycle.endTime);
        const cycleCenterX = (cycleStartX + cycleEndX) / 2;
        
        // Add cycle number label
        svg.append('text')
          .attr('x', cycleCenterX)
          .attr('y', innerHeight + 40)
          .attr('text-anchor', 'middle')
          .style('font-size', '12px')
          .style('font-weight', 'bold')
          .text(`Cycle ${currentCycle}`);
        
        // Remember start of next cycle
        cycleStartX = cycleEndX;
      }
      
      // Set initial cycle start (after falling asleep)
      if (cycle.stage === 'NREM 1' && i === 1) {
        cycleStartX = x(cycle.startTime);
      }
    });
    
    // Add title
    svg.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Sleep Cycle Progression');
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${innerWidth - 120}, 0)`);
    
    const legendItems = Object.entries(stageColors);
    
    legendItems.forEach(([stage, color], i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);
      
      legendRow.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', color);
      
      legendRow.append('text')
        .attr('x', 15)
        .attr('y', 10)
        .attr('text-anchor', 'start')
        .style('font-size', '12px')
        .text(stage);
    });
    
  }, [cycles, width, height]);
  
  if (!cycles || cycles.length === 0) {
    return <div className="text-center p-4">No sleep cycle data available</div>;
  }
  
  return (
    <div className="sleep-cycle-chart overflow-x-auto">
      <svg ref={svgRef} className="mx-auto" />
    </div>
  );
};

export default SleepCycleChart; 