
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12 mb-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in">
            Body Index Insights Hub
          </h1>
          <p className="text-lg text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Your comprehensive toolkit for health tracking, personalized insights, and wellness management.
          </p>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-primary/10 mb-6">
            <h2 className="text-xl font-semibold text-primary mb-3">Take Control of Your Health Journey</h2>
            <p className="text-muted-foreground mb-4">
              Our suite of health calculators helps you track, analyze, and understand your body metrics. Make informed decisions with personalized insights tailored to your unique profile.
            </p>
            <Link 
              to="/bmi-calculator"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-md btn-hover-effect"
            >
              Try BMI Calculator
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-md animate-float">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              alt="Person using health tracking application" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
          <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
