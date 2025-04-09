import React, { ReactNode } from 'react';

interface ToolHeroSectionProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

/**
 * Standardized hero section component for all tool pages
 * Uses consistent font sizes and styling matching the Blood Pressure Checker page
 */
const ToolHeroSection: React.FC<ToolHeroSectionProps> = ({ title, description, icon }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-primary mb-3">{title}</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ToolHeroSection; 