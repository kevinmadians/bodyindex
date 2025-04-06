
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ArrowRight, Calculator, Scale, Activity, Heart, HeartPulse, Droplet, Brain, Activity as ActivityIcon, Moon, CheckCircle, Users, Sparkles } from 'lucide-react';

const HomePage = () => {
  // Available tools
  const tools = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and understand what it means for your health.',
      detailedDescription: 'Understand your Body Mass Index and get health insights based on your results.',
      icon: <Calculator className="h-10 w-10 text-primary" />,
      link: '/bmi-calculator',
      available: true,
    },
    {
      id: 'body-fat',
      title: 'Body Fat Percentage',
      description: 'Estimate your body fat percentage and learn how it impacts your overall health.',
      detailedDescription: 'Estimate your body fat percentage using various recognized methods.',
      icon: <Scale className="h-10 w-10 text-primary" />,
      link: '/body-fat-calculator',
      available: false,
    },
    {
      id: 'bmr',
      title: 'BMR Calculator',
      description: 'Calculate your Basal Metabolic Rate to understand your daily calorie needs.',
      detailedDescription: 'Calculate your Basal Metabolic Rate to understand your daily calorie needs.',
      icon: <Activity className="h-10 w-10 text-primary" />,
      link: '/bmr-calculator',
      available: false,
    },
    {
      id: 'ideal-weight',
      title: 'Ideal Weight Calculator',
      description: 'Find your ideal weight range based on height, age, and body frame.',
      detailedDescription: 'Find your ideal weight range based on height, age, and body frame.',
      icon: <Heart className="h-10 w-10 text-primary" />,
      link: '/ideal-weight-calculator',
      available: false,
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate Zone Calculator',
      description: 'Calculate your target heart rate zones for optimal exercise effectiveness.',
      detailedDescription: 'Calculate your target heart rate zones for optimal exercise effectiveness.',
      icon: <HeartPulse className="h-10 w-10 text-primary" />,
      link: '/heart-rate-calculator',
      available: false,
    },
    {
      id: 'water-intake',
      title: 'Water Intake Calculator',
      description: 'Determine how much water you should drink daily based on your weight and activity level.',
      detailedDescription: 'Determine how much water you should drink daily based on your weight and activity level.',
      icon: <Droplet className="h-10 w-10 text-primary" />,
      link: '/water-intake-calculator',
      available: false,
    },
    {
      id: 'mental-health',
      title: 'Mental Health Assessment',
      description: 'Simple self-assessment tools to check your mental wellbeing and stress levels.',
      detailedDescription: 'Simple self-assessment tools to check your mental wellbeing and stress levels.',
      icon: <Brain className="h-10 w-10 text-primary" />,
      link: '/mental-health-assessment',
      available: false,
    },
    {
      id: 'macro',
      title: 'Macro Calculator',
      description: 'Calculate your optimal macronutrient intake for weight management and fitness goals.',
      detailedDescription: 'Get personalized macronutrient recommendations based on your fitness goals.',
      icon: <Calculator className="h-10 w-10 text-primary" />,
      link: '/macro-calculator',
      available: false,
    },
    {
      id: 'blood-pressure',
      title: 'Blood Pressure Checker',
      description: 'Understand your blood pressure readings and what they mean for your health.',
      detailedDescription: 'Understand your blood pressure readings and what they mean for your health.',
      icon: <ActivityIcon className="h-10 w-10 text-primary" />,
      link: '/blood-pressure-checker',
      available: false,
    },
    {
      id: 'sleep',
      title: 'Sleep Calculator',
      description: 'Find the ideal bedtime and wake-up time based on sleep cycles for optimal rest.',
      detailedDescription: 'Find the ideal bedtime and wake-up time based on sleep cycles for optimal rest.',
      icon: <Moon className="h-10 w-10 text-primary" />,
      link: '/sleep-calculator',
      available: false,
    },
  ];

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
    <Layout>
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto mb-16">
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
                  src="/lovable-uploads/a5833b2f-e37d-4c87-a050-2c8db2fa4762.png" 
                  alt="Health tracking illustration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </div>

        {/* Health Tools Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Health Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of calculators and tools designed to help you understand and improve your health metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tools.slice(0, 6).map((tool) => (
              <HoverCard key={tool.id} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Card 
                    className={`hover-card transition-all duration-300 h-full ${
                      tool.available ? 'border-primary/20 hover:border-primary' : 'border-muted hover:border-muted-foreground/50'
                    }`}
                  >
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-auto">
                        <div className={`p-3 rounded-lg ${tool.available ? 'bg-primary/10' : 'bg-muted'}`}>
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold mb-2 ${!tool.available && 'text-muted-foreground'}`}>
                            {tool.title}
                          </h3>
                          <p className={`mb-4 text-sm ${!tool.available && 'text-muted-foreground/80'}`}>
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
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
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{tool.title}</h4>
                    <p className="text-sm text-muted-foreground">{tool.detailedDescription}</p>
                    {tool.available ? (
                      <Link 
                        to={tool.link} 
                        className="inline-flex items-center text-xs text-primary hover:text-primary/80 gap-1 group"
                      >
                        Try it now
                        <ArrowRight className="h-3 w-3 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <p className="text-xs text-muted-foreground">We're working on this tool and it will be available soon!</p>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(6).map((tool) => (
              <HoverCard key={tool.id} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Card 
                    className={`hover-card transition-all duration-300 h-full ${
                      tool.available ? 'border-primary/20 hover:border-primary' : 'border-muted hover:border-muted-foreground/50'
                    }`}
                  >
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-auto">
                        <div className={`p-3 rounded-lg ${tool.available ? 'bg-primary/10' : 'bg-muted'}`}>
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold mb-2 ${!tool.available && 'text-muted-foreground'}`}>
                            {tool.title}
                          </h3>
                          <p className={`mb-4 text-sm ${!tool.available && 'text-muted-foreground/80'}`}>
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
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
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{tool.title}</h4>
                    <p className="text-sm text-muted-foreground">{tool.detailedDescription}</p>
                    {tool.available ? (
                      <Link 
                        to={tool.link} 
                        className="inline-flex items-center text-xs text-primary hover:text-primary/80 gap-1 group"
                      >
                        Try it now
                        <ArrowRight className="h-3 w-3 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <p className="text-xs text-muted-foreground">We're working on this tool and it will be available soon!</p>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
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

        {/* Call to Action */}
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
      </div>
    </Layout>
  );
};

export default HomePage;
