
import React from 'react';
import ToolCard from './ToolCard';
import { toolsData } from '@/data/toolsData';

const ToolsSection = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Health Tools</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of calculators and tools designed to help you understand and improve your health metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {toolsData.slice(0, 6).map((tool) => (
          <ToolCard key={tool.id} {...tool} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsData.slice(6).map((tool) => (
          <ToolCard key={tool.id} {...tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolsSection;
