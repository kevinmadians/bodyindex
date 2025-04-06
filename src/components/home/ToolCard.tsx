
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: React.ReactNode;
  link: string;
  available: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  id, 
  title, 
  description, 
  detailedDescription, 
  icon, 
  link, 
  available 
}) => {
  return (
    <HoverCard key={id} openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Card 
          className={`hover-card transition-all duration-300 h-full ${
            available ? 'border-primary/20 hover:border-primary' : 'border-muted hover:border-muted-foreground/50'
          }`}
        >
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-start gap-4 mb-auto">
              <div className={`p-3 rounded-lg ${available ? 'bg-primary/10' : 'bg-muted'}`}>
                {icon}
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold mb-2 ${!available && 'text-muted-foreground'}`}>
                  {title}
                </h3>
                <p className={`mb-4 text-sm ${!available && 'text-muted-foreground/80'}`}>
                  {description}
                </p>
              </div>
            </div>
            <div className="mt-4">
              {available ? (
                <Link 
                  to={link} 
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
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{detailedDescription}</p>
          {available ? (
            <Link 
              to={link} 
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
  );
};

export default ToolCard;
