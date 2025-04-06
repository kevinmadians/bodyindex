
import React from 'react';

const BMILogo: React.FC = () => {
  return (
    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white shadow-md flex items-center justify-center group">
      <div className="absolute inset-0 bg-gradient-to-br from-bmi-teal-light to-bmi-blue-dark transition-all duration-300 group-hover:opacity-90"></div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="font-bold text-xs text-primary">BI</span>
        <div className="w-6 h-1 bg-primary/80 rounded-full mt-1"></div>
        <div className="flex space-x-[2px] mt-1">
          <div className="w-1 h-2 bg-bmi-green-dark rounded-sm"></div>
          <div className="w-1 h-3 bg-bmi-blue rounded-sm"></div>
          <div className="w-1 h-1 bg-bmi-orange rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default BMILogo;
