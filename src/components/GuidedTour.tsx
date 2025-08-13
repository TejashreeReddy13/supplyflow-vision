import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  BarChart3, 
  Filter, 
  TrendingUp, 
  Target,
  Brain,
  Award
} from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: any;
}

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Supply Chain Analytics',
    description: 'This dashboard provides real-time insights into supplier performance, inventory optimization, and predictive analytics to help you make data-driven decisions.',
    target: '.dashboard-header',
    position: 'bottom',
    icon: BarChart3
  },
  {
    id: 'filters',
    title: 'Dynamic Filtering System',
    description: 'Filter data by region, supplier type, product category, and time period. All metrics and charts update automatically based on your selections.',
    target: '.filters-section',
    position: 'bottom',
    icon: Filter
  },
  {
    id: 'kpis',
    title: 'Key Performance Indicators',
    description: 'Monitor critical metrics like on-time delivery rates, inventory turnover, underperforming suppliers, and potential cost savings in real-time.',
    target: '.kpi-metrics',
    position: 'bottom',
    icon: Target
  },
  {
    id: 'forecasting',
    title: 'Predictive Analytics',
    description: 'View 3-month forecasts for delivery performance and inventory turnover with confidence intervals. Identify trends before they impact operations.',
    target: '.forecasting-section',
    position: 'top',
    icon: TrendingUp
  },
  {
    id: 'benchmarking',
    title: 'Performance Benchmarking',
    description: 'Compare each supplier against industry averages and best-in-class performers. Identify underperformers and optimization opportunities.',
    target: '.benchmarking-section', 
    position: 'top',
    icon: Award
  },
  {
    id: 'insights',
    title: 'AI-Powered Insights',
    description: 'Get automated recommendations with confidence scores, risk assessments, and actionable next steps prioritized by business impact.',
    target: '.insights-section',
    position: 'top',
    icon: Brain
  }
];

export const GuidedTour = ({ isOpen, onClose }: GuidedTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setCurrentStep(0);
      // Add CSS classes to highlight elements
      document.body.classList.add('tour-active');
    } else {
      setIsVisible(false);
      document.body.classList.remove('tour-active');
      // Remove any existing highlights
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible) return;

    // Remove previous highlights
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });

    // Highlight current step target
    const currentStepData = tourSteps[currentStep];
    if (currentStepData?.target) {
      const targetElement = document.querySelector(currentStepData.target);
      if (targetElement) {
        targetElement.classList.add('tour-highlight');
        // Scroll into view
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }, [currentStep, isVisible]);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  const currentStepData = tourSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-40 animate-fade-in" />
      
      {/* Tour Card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
        <Card className="shadow-2xl border-2 border-primary/20 animate-scale-in">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{currentStepData.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    Step {currentStep + 1} of {tourSteps.length}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(((currentStep + 1) / tourSteps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleClose}>
                  Skip Tour
                </Button>
                <Button 
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < tourSteps.length - 1 && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CSS for highlighting */}
      <style>{`
        .tour-highlight {
          position: relative !important;
          z-index: 45 !important;
          border: 2px solid hsl(var(--primary)) !important;
          border-radius: 8px !important;
          box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2) !important;
          animation: tour-pulse 2s infinite !important;
        }
        
        @keyframes tour-pulse {
          0%, 100% { box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2); }
          50% { box-shadow: 0 0 0 8px hsl(var(--primary) / 0.1); }
        }
        
        .tour-active * {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
};