import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardContent } from "@/components/ui/card";
import { getBPCategory, getBPCategoryColor, BPReading } from '@/lib/blood-pressure-utils';

interface BPChartProps {
  readings: BPReading[];
  timeRange?: '7days' | '30days' | '90days' | 'all';
}

const BPChart: React.FC<BPChartProps> = ({ 
  readings,
  timeRange = '30days' 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Filter readings based on time range
  const getFilteredReadings = () => {
    if (timeRange === 'all' || readings.length === 0) return readings;
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (timeRange) {
      case '7days':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        filterDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        filterDate.setDate(now.getDate() - 90);
        break;
      default:
        filterDate.setDate(now.getDate() - 30);
    }
    
    return readings.filter(reading => new Date(reading.date) >= filterDate);
  };

  const filteredReadings = getFilteredReadings();
  
  // Sort readings by date for the chart
  const sortedReadings = [...filteredReadings].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  useEffect(() => {
    if (!chartRef.current || sortedReadings.length === 0) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Chart dimensions and margins
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create x scale (dates)
    const x = d3
      .scaleTime()
      .domain(d3.extent(sortedReadings, d => new Date(d.date)) as [Date, Date])
      .range([0, width]);

    // Create y scale (blood pressure values)
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(sortedReadings, d => Math.min(d.systolic, d.diastolic)) || 0,
        d3.max(sortedReadings, d => Math.max(d.systolic, d.diastolic) + 10) || 200
      ])
      .nice()
      .range([height, 0]);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%b %d") as any))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Add y-axis
    svg.append("g").call(d3.axisLeft(y));

    // Add background areas for BP categories
    const categories = [
      { name: "Hypertensive Crisis", min: 180, color: "#7F1D1D" },
      { name: "Hypertension Stage 2", min: 140, color: "#EF4444" },
      { name: "Hypertension Stage 1", min: 130, color: "#F97316" },
      { name: "Elevated", min: 120, color: "#FBBF24" },
      { name: "Normal", min: 90, color: "#10B981" },
      { name: "Low", min: 0, color: "#3B82F6" }
    ];

    // Add light background colors for categories
    categories.forEach((category, i) => {
      const nextMin = i < categories.length - 1 ? categories[i + 1].min : 0;
      svg.append("rect")
        .attr("x", 0)
        .attr("y", y(category.min))
        .attr("width", width)
        .attr("height", y(nextMin) - y(category.min))
        .attr("fill", `${category.color}20`) // 20% opacity
        .attr("stroke", "none");
    });

    // Add grid lines
    svg.selectAll("line.grid")
      .data(y.ticks())
      .enter()
      .append("line")
      .attr("class", "grid")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .attr("stroke", "#e5e5e5")
      .attr("stroke-dasharray", "3,3");

    // Create line function for systolic
    const systolicLine = d3
      .line<BPReading>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.systolic))
      .curve(d3.curveMonotoneX);

    // Create line function for diastolic
    const diastolicLine = d3
      .line<BPReading>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.diastolic))
      .curve(d3.curveMonotoneX);

    // Draw systolic line
    svg
      .append("path")
      .datum(sortedReadings)
      .attr("fill", "none")
      .attr("stroke", "#f43f5e")
      .attr("stroke-width", 2)
      .attr("d", systolicLine);

    // Draw diastolic line
    svg
      .append("path")
      .datum(sortedReadings)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", diastolicLine);

    // Add circles for each reading
    svg
      .selectAll(".systolic-point")
      .data(sortedReadings)
      .enter()
      .append("circle")
      .attr("class", "systolic-point")
      .attr("cx", d => x(new Date(d.date)))
      .attr("cy", d => y(d.systolic))
      .attr("r", 4)
      .attr("fill", "#f43f5e")
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    svg
      .selectAll(".diastolic-point")
      .data(sortedReadings)
      .enter()
      .append("circle")
      .attr("class", "diastolic-point")
      .attr("cx", d => x(new Date(d.date)))
      .attr("cy", d => y(d.diastolic))
      .attr("r", 4)
      .attr("fill", "#3b82f6")
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    // Add tooltip
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 10);

    // Add hover functionality
    svg
      .selectAll("circle")
      .on("mouseover", function(event, d) {
        const reading = d as BPReading;
        const category = getBPCategory(reading.systolic, reading.diastolic);
        const formattedDate = new Date(reading.date).toLocaleDateString();
        
        tooltip
          .html(
            `<div>
               <div><strong>Date:</strong> ${formattedDate}</div>
               <div><strong>Systolic:</strong> ${reading.systolic} mmHg</div>
               <div><strong>Diastolic:</strong> ${reading.diastolic} mmHg</div>
               <div><strong>Category:</strong> ${category}</div>
             </div>`
          )
          .style("left", `${event.pageX + 15}px`)
          .style("top", `${event.pageY - 28}px`)
          .transition()
          .duration(200)
          .style("opacity", 0.9);

        d3.select(this)
          .attr("r", 6)
          .attr("stroke-width", 2);
      })
      .on("mouseout", function() {
        tooltip
          .transition()
          .duration(500)
          .style("opacity", 0);

        d3.select(this)
          .attr("r", 4)
          .attr("stroke-width", 1);
      });

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(10, ${height + 35})`);

    // Systolic legend
    legend
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 4)
      .attr("fill", "#f43f5e");

    legend
      .append("text")
      .attr("x", 10)
      .attr("y", 4)
      .text("Systolic")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

    // Diastolic legend
    legend
      .append("circle")
      .attr("cx", 80)
      .attr("cy", 0)
      .attr("r", 4)
      .attr("fill", "#3b82f6");

    legend
      .append("text")
      .attr("x", 90)
      .attr("y", 4)
      .text("Diastolic")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

  }, [sortedReadings, timeRange]);

  // If no readings are available
  if (sortedReadings.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center h-64 text-center">
          <div className="text-muted-foreground">
            <p className="mb-2 text-lg">No blood pressure readings available</p>
            <p className="text-sm">Take and save a reading to see your chart</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div ref={chartRef} className="w-full h-[300px]"></div>
        <div className="text-xs text-center text-muted-foreground mt-2">
          Showing {sortedReadings.length} readings over the selected period
        </div>
      </CardContent>
    </Card>
  );
};

export default BPChart; 