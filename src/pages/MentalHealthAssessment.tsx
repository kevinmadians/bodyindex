import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import usePageTitle from '@/hooks/usePageTitle';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Heart, Shield, Sparkles, Activity, Info, AlertTriangle, Lightbulb, Clock, Share2, Download, Mail, Twitter } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolHeroSection from '@/components/common/ToolHeroSection';
import SEO from '@/components/SEO';
import seoData from '@/data/seoData';

interface Question {
  id: number;
  text: string;
  category: string;
  options: {
    text: string;
    score: number;
  }[];
}

interface Result {
  category: string;
  score: number;
  maxScore: number;
  interpretation: string;
  recommendations: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    category: "Depression",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 2,
    text: "How often do you feel nervous, anxious, or on edge?",
    category: "Anxiety",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 3,
    text: "How often do you have trouble falling or staying asleep?",
    category: "Sleep",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 4,
    text: "How often do you feel tired or have little energy?",
    category: "Energy",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 5,
    text: "How often do you have trouble concentrating on things?",
    category: "Concentration",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 6,
    text: "How often do you feel overwhelmed by your responsibilities?",
    category: "Stress",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 7,
    text: "How often do you have difficulty relaxing?",
    category: "Stress",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 8,
    text: "How often do you feel lonely or isolated?",
    category: "Social",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 9,
    text: "How often do you feel satisfied with your social relationships?",
    category: "Social",
    options: [
      { text: "Nearly every day", score: 0 },
      { text: "More than half the days", score: 1 },
      { text: "Several days", score: 2 },
      { text: "Not at all", score: 3 }
    ]
  },
  {
    id: 10,
    text: "How often do you engage in activities you enjoy?",
    category: "Well-being",
    options: [
      { text: "Nearly every day", score: 0 },
      { text: "More than half the days", score: 1 },
      { text: "Several days", score: 2 },
      { text: "Not at all", score: 3 }
    ]
  }
];

const MentalHealthAssessment = () => {
  usePageTitle('Mental Health Assessment - Body Index');
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [showEmergencyInfo, setShowEmergencyInfo] = useState(false);
  const [selectedTab, setSelectedTab] = useState('assessment');

  // Emergency resources
  const emergencyResources = [
    {
      country: "United States",
      hotline: "988 Suicide & Crisis Lifeline",
      number: "988",
      available: "24/7"
    },
    {
      country: "United Kingdom",
      hotline: "Samaritans",
      number: "116 123",
      available: "24/7"
    },
    {
      country: "Canada",
      hotline: "Talk Suicide Canada",
      number: "1-833-456-4566",
      available: "24/7"
    }
  ];

  // Mental health tips
  const mentalHealthTips = [
    {
      category: "Daily Practices",
      tips: [
        "Practice mindfulness meditation for 10 minutes daily",
        "Maintain a consistent sleep schedule",
        "Exercise regularly - even a short walk helps",
        "Keep a gratitude journal"
      ]
    },
    {
      category: "Stress Management",
      tips: [
        "Use deep breathing exercises",
        "Take regular breaks during work",
        "Practice progressive muscle relaxation",
        "Set boundaries with work and personal time"
      ]
    },
    {
      category: "Social Connection",
      tips: [
        "Reach out to friends or family regularly",
        "Join community groups or clubs",
        "Volunteer for causes you care about",
        "Schedule regular social activities"
      ]
    }
  ];

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [currentQuestion]: score });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const categoryScores: { [key: string]: number[] } = {};
    
    questions.forEach((question, index) => {
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = [];
      }
      categoryScores[question.category].push(answers[index] || 0);
    });

    const calculatedResults: Result[] = Object.entries(categoryScores).map(([category, scores]) => {
      const totalScore = scores.reduce((a, b) => a + b, 0);
      const maxScore = scores.length * 3;
      const percentage = (totalScore / maxScore) * 100;

      return {
        category,
        score: totalScore,
        maxScore,
        interpretation: getInterpretation(percentage),
        recommendations: getRecommendations(category, percentage)
      };
    });

    setResults(calculatedResults);
    setShowResults(true);
  };

  const getInterpretation = (percentage: number): string => {
    if (percentage <= 25) return "Minimal concern";
    if (percentage <= 50) return "Mild concern";
    if (percentage <= 75) return "Moderate concern";
    return "Significant concern";
  };

  const getRecommendations = (category: string, percentage: number): string[] => {
    const recommendations: { [key: string]: string[] } = {
      Depression: [
        "Practice daily gratitude journaling",
        "Engage in regular physical exercise",
        "Maintain social connections",
        "Consider speaking with a mental health professional"
      ],
      Anxiety: [
        "Try deep breathing exercises",
        "Practice mindfulness meditation",
        "Establish a regular sleep schedule",
        "Consider cognitive behavioral therapy"
      ],
      Sleep: [
        "Create a consistent bedtime routine",
        "Limit screen time before bed",
        "Create a comfortable sleep environment",
        "Avoid caffeine in the evening"
      ],
      Energy: [
        "Maintain a regular exercise routine",
        "Eat a balanced diet",
        "Stay hydrated throughout the day",
        "Take short breaks during the day"
      ],
      Concentration: [
        "Break tasks into smaller chunks",
        "Practice mindfulness exercises",
        "Minimize distractions",
        "Take regular breaks"
      ]
    };

    return recommendations[category] || [];
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults([]);
  };

  const handleShareResults = async (platform: 'email' | 'twitter') => {
    const summary = results.map(result => 
      `${result.category}: ${result.interpretation}`
    ).join('\n');

    if (platform === 'email') {
      const subject = 'My Mental Health Assessment Results';
      const body = `Here are my mental health assessment results:\n\n${summary}\n\nTake your own assessment at: [Your Website URL]`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else if (platform === 'twitter') {
      const text = `I just completed my mental health assessment! Check out this helpful tool: [Your Website URL]`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleDownloadResults = () => {
    const resultsText = results.map(result => {
      return `
${result.category}
Level: ${result.interpretation}
Score: ${result.score}/${result.maxScore}

Recommendations:
${result.recommendations.map(rec => `- ${rec}`).join('\n')}
      `;
    }).join('\n-------------------\n');

    const fullText = `Mental Health Assessment Results
Date: ${new Date().toLocaleDateString()}

${resultsText}

Note: This assessment is for informational purposes only and should not be considered as a substitute for professional medical advice.`;

    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mental-health-assessment-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <SEO 
        title={seoData.mentalHealthAssessment.title}
        description={seoData.mentalHealthAssessment.description}
        keywords={seoData.mentalHealthAssessment.keywords}
        structuredData={seoData.mentalHealthAssessment.structuredData}
        canonical="https://bodyindex.net/mental-health-assessment"
      />
      <div className="max-w-5xl mx-auto">
        <ToolHeroSection 
          title="Mental Health Assessment"
          description="A comprehensive self-assessment tool to evaluate different aspects of your mental wellbeing. Get personalized insights and resources."
        />
        
        <div className="max-w-5xl mx-auto px-4">
          {showEmergencyInfo && (
            <Alert className="mb-8 bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-800">
                If you're experiencing thoughts of self-harm or need immediate help, please contact emergency services or a mental health crisis hotline:
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyResources.map((resource) => (
                    <div key={resource.country} className="p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-semibold">{resource.country}</h4>
                      <p className="text-sm">{resource.hotline}</p>
                      <p className="text-sm font-bold">{resource.number}</p>
                      <p className="text-xs text-muted-foreground">{resource.available}</p>
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Assessment Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Take the Assessment</h2>
            <Card className="mb-8">
              <CardContent className="p-8">
                {!showResults ? (
                  <>
                    <div className="mb-6">
                      <Progress value={(currentQuestion / questions.length) * 100} />
                      <p className="text-sm text-muted-foreground mt-2">
                        Question {currentQuestion + 1} of {questions.length}
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-xl font-semibold mb-4">
                          {questions[currentQuestion].text}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {questions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="p-6 h-auto text-left flex items-center justify-between hover:bg-primary/5"
                              onClick={() => handleAnswer(option.score)}
                            >
                              <span>{option.text}</span>
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4">Your Assessment Results</h2>
                      <p className="text-muted-foreground mb-6">Here's a detailed analysis of your mental well-being across different categories</p>
                      
                      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8 w-full">
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 w-full sm:w-auto justify-center"
                          onClick={() => handleShareResults('email')}
                        >
                          <Mail className="h-4 w-4" />
                          Share via Email
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 w-full sm:w-auto justify-center"
                          onClick={() => handleShareResults('twitter')}
                        >
                          <Twitter className="h-4 w-4" />
                          Share on Twitter
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 w-full sm:w-auto justify-center"
                          onClick={handleDownloadResults}
                        >
                          <Download className="h-4 w-4" />
                          Download Results
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              {result.category === "Depression" && <Brain className="h-5 w-5 text-primary" />}
                              {result.category === "Anxiety" && <Activity className="h-5 w-5 text-primary" />}
                              {result.category === "Sleep" && <Clock className="h-5 w-5 text-primary" />}
                              {result.category === "Energy" && <Sparkles className="h-5 w-5 text-primary" />}
                              {result.category === "Social" && <Heart className="h-5 w-5 text-primary" />}
                              {result.category}
                            </h3>
                            
                            <div className="relative mb-6">
                              <Progress 
                                value={(result.score / result.maxScore) * 100} 
                                className="h-3"
                              />
                              <p className="absolute right-0 top-4 text-sm font-medium">
                                {Math.round((result.score / result.maxScore) * 100)}%
                              </p>
                            </div>

                            <div className="bg-primary/5 p-3 rounded-lg mb-4">
                              <p className="font-medium text-primary">
                                Level: {result.interpretation}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-primary" />
                                Recommendations:
                              </h4>
                              <ul className="list-disc pl-5 space-y-2">
                                {result.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center mt-12">
                      <Button onClick={resetAssessment} className="bg-primary">
                        Take Assessment Again
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Resources & Tips Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Resources & Tips</h2>
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="grid gap-6">
                  {mentalHealthTips.map((section) => (
                    <div key={section.category} className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        {section.category}
                      </h3>
                      <ul className="grid gap-3">
                        {section.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 bg-primary/5 p-3 rounded-lg">
                            <span className="text-primary">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Learn More Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>Learn More</h2>
            <Card className="mb-8">
              <CardContent className="p-8">
                <Accordion type="single" collapsible>
                  <AccordionItem value="what-is-mental-health">
                    <AccordionTrigger>What is Mental Health?</AccordionTrigger>
                    <AccordionContent>
                      Mental health includes emotional, psychological, and social well-being. It affects how we think, feel, act, handle stress, relate to others, and make choices.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="common-conditions">
                    <AccordionTrigger>Common Mental Health Conditions</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li>• Depression - Persistent feelings of sadness and loss of interest</li>
                        <li>• Anxiety - Excessive worry and fear about everyday situations</li>
                        <li>• Stress - Physical and emotional tension in response to challenges</li>
                        <li>• Social Isolation - Lack of social connections and support</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="seeking-help">
                    <AccordionTrigger>When to Seek Professional Help</AccordionTrigger>
                    <AccordionContent>
                      Consider seeking professional help if you experience:
                      <ul className="space-y-2 mt-2">
                        <li>• Persistent feelings of sadness or anxiety</li>
                        <li>• Significant changes in sleep or eating patterns</li>
                        <li>• Difficulty performing daily tasks</li>
                        <li>• Thoughts of self-harm</li>
                        <li>• Social withdrawal</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="self-care">
                    <AccordionTrigger>Self-Care Strategies</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4">
                        <div>
                          <h4 className="font-semibold">Physical Self-Care</h4>
                          <p>Regular exercise, healthy eating, adequate sleep</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Emotional Self-Care</h4>
                          <p>Journaling, meditation, creative activities</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Social Self-Care</h4>
                          <p>Maintaining relationships, setting boundaries, asking for help</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>

          <div className="flex justify-center mb-8">
            <Button 
              variant="outline"
              onClick={() => setShowEmergencyInfo(!showEmergencyInfo)}
              className="flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              {showEmergencyInfo ? 'Hide' : 'Show'} Emergency Resources
            </Button>
          </div>

          {/* Educational Section */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0FA8BD' }}>
                Understanding Mental Health
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Brain className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Mental Wellness</h3>
                      <p className="text-sm text-muted-foreground">
                        Mental health is an essential component of overall well-being, affecting how we think, feel, and act in daily life.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Emotional Balance</h3>
                      <p className="text-sm text-muted-foreground">
                        Managing emotions effectively is key to maintaining good mental health and building resilience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Self-Care</h3>
                      <p className="text-sm text-muted-foreground">
                        Regular self-care practices help maintain mental well-being and prevent emotional exhaustion.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Growth Mindset</h3>
                      <p className="text-sm text-muted-foreground">
                        Developing a growth mindset helps build resilience and adapt to life's challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium mb-2">
                  <strong>Important Note:</strong>
                </p>
                <p>
                  This assessment is for informational purposes only and should not be considered as a substitute for professional medical advice.
                  If you're experiencing severe symptoms or having thoughts of self-harm, please seek immediate professional help or contact emergency services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MentalHealthAssessment; 