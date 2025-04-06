
import React from 'react';
import { CheckCircle, Users, Sparkles } from 'lucide-react';

const BenefitsSection = () => {
  // Key benefits of using our tools
  const benefits = [
    {
      title: "Accurate & Reliable",
      description: "All our calculators use scientifically validated formulas to provide the most accurate results possible.",
      icon: <CheckCircle className="h-12 w-12 text-primary" />
    },
    {
      title: "Personalized Insights",
      description: "Get detailed insights and recommendations tailored to your unique body measurements and goals.",
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      title: "Easy to Use",
      description: "Simple, intuitive interfaces that make health tracking accessible to everyone, regardless of technical expertise.",
      icon: <Sparkles className="h-12 w-12 text-primary" />
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Why Choose Our Tools?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our health calculators are designed with you in mind, offering multiple benefits:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={benefit.title} 
            className="bg-white p-6 rounded-lg shadow-sm border border-primary/10 text-center hover-card"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                {benefit.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
