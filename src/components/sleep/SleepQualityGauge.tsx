import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SleepQualityGaugeProps {
  score: number;
  width?: number;
  height?: number;
}

const SleepQualityGauge: React.FC<SleepQualityGaugeProps> = ({ 
  score, 
  width = 300, 
  height = 180 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any existing SVG
    d3.select(svgRef.current).selectAll('*').remove();
    
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create the SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height - 10})`);
    
    // Parameters for the gauge
    const radius = Math.min(innerWidth, innerHeight * 2) / 2;
    const startAngle = -Math.PI / 2 - Math.PI / 4; // -135 degrees
    const endAngle = Math.PI / 2 + Math.PI / 4; // 135 degrees
    
    // Scale for the gauge
    const scale = d3.scaleLinear()
      .domain([0, 100])
      .range([startAngle, endAngle]);
    
    // Color scale for the arc
    const colorScale = d3.scaleLinear<string>()
      .domain([0, 40, 60, 75, 100])
      .range(['#EF4444', '#F59E0B', '#FBBF24', '#22C55E', '#15803D'])
      .interpolate(d3.interpolateRgb);
    
    // Create arc generator for background
    const backgroundArc = d3.arc()
      .innerRadius(radius * 0.65)
      .outerRadius(radius)
      .startAngle(startAngle)
      .endAngle(endAngle);
    
    // Create arc generator for foreground (the value)
    const foregroundArc = d3.arc()
      .innerRadius(radius * 0.65)
      .outerRadius(radius)
      .startAngle(startAngle)
      .endAngle(scale(score));
    
    // Add the background arc
    svg.append('path')
      .attr('d', backgroundArc as any)
      .style('fill', '#f3f4f6');
    
    // Add the foreground arc (the value)
    svg.append('path')
      .attr('d', foregroundArc as any)
      .style('fill', colorScale(score));
    
    // Add the score text
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius * 0.15)
      .attr('text-anchor', 'middle')
      .style('font-size', `${radius * 0.25}px`)
      .style('font-weight', 'bold')
      .text(Math.round(score));
    
    // Add the "Sleep Quality" label
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius * 0.4)
      .attr('text-anchor', 'middle')
      .style('font-size', `${radius * 0.15}px`)
      .style('fill', '#6B7280')
      .text('Sleep Quality');
    
    // Add quality text
    let qualityText = '';
    if (score >= 90) qualityText = 'Excellent';
    else if (score >= 75) qualityText = 'Good';
    else if (score >= 60) qualityText = 'Moderate';
    else if (score >= 40) qualityText = 'Poor';
    else qualityText = 'Very Poor';
    
    svg.append('text')
      .attr('x', 0)
      .attr('y', radius * 0.1)
      .attr('text-anchor', 'middle')
      .style('font-size', `${radius * 0.16}px`)
      .style('fill', colorScale(score))
      .style('font-weight', 'bold')
      .text(qualityText);
    
    // Add tick marks
    const ticks = [0, 25, 50, 75, 100];
    
    ticks.forEach(tick => {
      const tickAngle = scale(tick);
      const x1 = (radius - 5) * Math.cos(tickAngle);
      const y1 = (radius - 5) * Math.sin(tickAngle);
      const x2 = (radius + 5) * Math.cos(tickAngle);
      const y2 = (radius + 5) * Math.sin(tickAngle);
      
      svg.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .style('stroke', '#6B7280')
        .style('stroke-width', 2);
      
      // Add tick labels
      const labelX = (radius + 15) * Math.cos(tickAngle);
      const labelY = (radius + 15) * Math.sin(tickAngle);
      
      svg.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('font-size', `${radius * 0.12}px`)
        .style('fill', '#6B7280')
        .text(tick);
    });
    
  }, [score, width, height]);
  
  return (
    <div className="sleep-quality-gauge flex justify-center items-center">
      <svg ref={svgRef} className="mx-auto" />
    </div>
  );
};

export default SleepQualityGauge; 