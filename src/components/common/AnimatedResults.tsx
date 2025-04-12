import React, { useEffect, useRef, useState, CSSProperties } from 'react';

interface AnimatedResultsProps {
  children: React.ReactNode;
  show: boolean;
  onAnimationComplete?: () => void;
  disableAutoScroll?: boolean;
}

/**
 * A wrapper component that adds smooth animations to calculator results
 */
const AnimatedResults: React.FC<AnimatedResultsProps> = ({ 
  children, 
  show, 
  onAnimationComplete,
  disableAutoScroll = true // Default to disabling auto-scroll
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Control the visibility of the component based on the show prop
  useEffect(() => {
    if (show) {
      // Small delay to ensure clean animation for initial reveal
      setTimeout(() => {
        setIsVisible(true);
        if (!hasInitialized) {
          setHasInitialized(true);
        }
        
        // Only auto-scroll if explicitly enabled on initial display
        if (!disableAutoScroll && resultsRef.current && !hasInitialized) {
          setTimeout(() => {
            const yOffset = -80; // Offset to ensure the header is visible
            const element = resultsRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          }, 100);
        }
        
        // Call the callback if provided
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 50);
    } else {
      setIsVisible(false);
    }
  }, [show, onAnimationComplete, disableAutoScroll, hasInitialized]);

  // Apply CSS classes conditionally for animation
  const animationClasses = `
    transition-all duration-500 ease-in-out
    ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}
  `;

  const containerStyles: CSSProperties = {
    visibility: show ? 'visible' : 'hidden',
    animationFillMode: 'forwards',
    height: show ? 'auto' : '0px',
    overflow: show ? 'visible' : 'hidden',
    margin: show ? 'inherit' : '0',
    padding: show ? 'inherit' : '0',
    transition: 'all 0.3s ease-in-out'
  };

  return (
    <div 
      ref={resultsRef} 
      className={`scroll-mt-20 ${animationClasses}`}
      style={containerStyles}
    >
      {children}
    </div>
  );
};

// Global CSS animation styles
const globalAnimationCSS = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounceUp {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bounceDown {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

.animate-slide-right {
  animation: slideRight 0.5s ease-out forwards;
}

.animate-bounce-up {
  animation: bounceUp 1s ease-out forwards;
}

.animate-bounce-down {
  animation: bounceDown 1s ease-out forwards;
}

/* Apply different animation delays to children */
.staggered-animation > *:nth-child(1) { animation-delay: 0.1s; }
.staggered-animation > *:nth-child(2) { animation-delay: 0.2s; }
.staggered-animation > *:nth-child(3) { animation-delay: 0.3s; }
.staggered-animation > *:nth-child(4) { animation-delay: 0.4s; }
.staggered-animation > *:nth-child(5) { animation-delay: 0.5s; }
`;

// Add the styles to the document head when in browser environment
if (typeof document !== 'undefined') {
  const styleId = 'animated-results-styles';
  
  // Only add the styles once
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = globalAnimationCSS;
    document.head.appendChild(style);
  }
}

export default AnimatedResults; 