import React from 'react';

interface BMILogoProps {
  size?: 'default' | 'small';
}

const BMILogo: React.FC<BMILogoProps> = ({ size = 'default' }) => {
  const isSmall = size === 'small';
  
  return (
    <div className={`relative ${isSmall ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg overflow-hidden bg-white shadow-md flex items-center justify-center group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-bmi-teal-light to-bmi-blue-dark transition-all duration-300 group-hover:opacity-90"></div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className={`font-bold ${isSmall ? 'text-[10px]' : 'text-xs'} text-white`}>BI</span>
        <div className={`${isSmall ? 'w-5 h-[3px]' : 'w-6 h-1'} bg-white/80 rounded-full mt-[2px]`}></div>
        <div className={`flex space-x-[2px] ${isSmall ? 'mt-[2px]' : 'mt-1'}`}>
          <div className={`${isSmall ? 'w-[3px] h-[6px]' : 'w-1 h-2'} bg-bmi-green-dark rounded-sm`}></div>
          <div className={`${isSmall ? 'w-[3px] h-[8px]' : 'w-1 h-3'} bg-bmi-blue rounded-sm`}></div>
          <div className={`${isSmall ? 'w-[3px] h-[4px]' : 'w-1 h-1'} bg-bmi-orange rounded-sm`}></div>
        </div>
      </div>
    </div>
  );
};

export default BMILogo;
