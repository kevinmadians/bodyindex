
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calculator, Scale, Activity, Heart } from 'lucide-react';

const HomePage = () => {
  // Available tools
  const tools = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and understand what it means for your health.',
      icon: <Calculator className="h-10 w-10 text-primary" />,
      link: '/bmi-calculator',
      available: true,
    },
    {
      id: 'body-fat',
      title: 'Body Fat Percentage',
      description: 'Estimate your body fat percentage and learn how it impacts your overall health.',
      icon: <Scale className="h-10 w-10 text-primary" />,
      link: '/body-fat-calculator',
      available: false,
    },
    {
      id: 'bmr',
      title: 'BMR Calculator',
      description: 'Calculate your Basal Metabolic Rate to understand your daily calorie needs.',
      icon: <Activity className="h-10 w-10 text-primary" />,
      link: '/bmr-calculator',
      available: false,
    },
    {
      id: 'ideal-weight',
      title: 'Ideal Weight Calculator',
      description: 'Find your ideal weight range based on height, age, and body frame.',
      icon: <Heart className="h-10 w-10 text-primary" />,
      link: '/ideal-weight-calculator',
      available: false,
    },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 animate-fade-in">
            Welcome to Body Index
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Your comprehensive suite of body measurement calculators to help you track and improve your health metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tools.map((tool) => (
            <Card 
              key={tool.id} 
              className={`transition-all duration-300 hover:shadow-lg ${
                tool.available ? 'border-primary/20 hover:border-primary' : 'border-muted'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${tool.available ? 'bg-primary/10' : 'bg-muted'}`}>
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className={`text-xl font-semibold mb-2 ${!tool.available && 'text-muted-foreground'}`}>
                      {tool.title}
                    </h2>
                    <p className={`mb-4 ${!tool.available && 'text-muted-foreground/80'}`}>
                      {tool.description}
                    </p>
                    {tool.available ? (
                      <Link 
                        to={tool.link} 
                        className="inline-flex items-center text-primary hover:text-primary/80 gap-1 font-medium group"
                      >
                        Use Calculator
                        <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <span className="text-sm text-muted-foreground bg-muted py-1 px-2 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Section */}
        <Card className="mb-10 shadow-md">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Why Use Body Index?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Accuracy</h3>
                <p className="text-muted-foreground">
                  Our calculators use scientifically-validated formulas to provide accurate results for your health metrics.
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Convenience</h3>
                <p className="text-muted-foreground">
                  Easy-to-use calculators that give you instant results, saving you time and effort in tracking your health.
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4a.905.905 0 0 1 0 1.81.905.905 0 0 1 0-1.81zM7 6.5C7 6.22 7.22 6 7.5 6h1c.28 0 .5.22.5.5v4c0 .28-.22.5-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Insightful</h3>
                <p className="text-muted-foreground">
                  Get personalized insights and recommendations based on your results to help improve your health journey.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12 mb-8 p-8 bg-primary/5 rounded-lg border border-primary/10">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Tracking Your Health?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Begin with our most popular tool, the BMI Calculator, to get insights about your body mass index and what it means for your health.
          </p>
          <Link 
            to="/bmi-calculator"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Try the BMI Calculator
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
