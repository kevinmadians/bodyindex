
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CallToActionSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Ready to Start Your Journey?</h2>
      <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
        Begin with our BMI calculator and discover more tools as we continue to expand our offerings. 
        Stay tuned for new features and health tools coming soon!
      </p>
      <Button 
        asChild
        className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-md btn-hover-effect"
      >
        <Link to="/bmi-calculator">
          Get Started Now
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default CallToActionSection;
