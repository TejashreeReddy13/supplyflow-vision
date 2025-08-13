import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Zap,
  Award,
  Brain,
  ArrowRight,
  ExternalLink,
  Download,
  Github,
  Linkedin,
  Share2,
  CheckCircle,
  TruckIcon,
  PackageIcon,
  AlertTriangleIcon
} from "lucide-react";

const CaseStudy = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Supply Chain Analytics Dashboard - Case Study',
        text: 'Comprehensive supply chain optimization dashboard with predictive analytics',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Portfolio Case Study
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Supply Chain Analytics Dashboard
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A comprehensive supply chain optimization platform featuring predictive analytics, 
              performance benchmarking, and AI-powered insights that helped identify <strong>$210K+ 
              in annual cost savings</strong> and improve delivery performance by <strong>20%</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Live Dashboard
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Case Study
              </Button>
              <Button variant="outline" size="lg">
                <Github className="h-4 w-4 mr-2" />
                View Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Problem Statement */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Business Challenge</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Supply chain teams struggle with fragmented data, reactive decision-making, 
                and lack of predictive insights. This leads to delivery delays, excess inventory, 
                and missed optimization opportunities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <TruckIcon className="h-5 w-5 text-destructive" />
                  </div>
                  <span><strong>86% of companies</strong> experience supply chain disruptions annually</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <PackageIcon className="h-5 w-5 text-warning" />
                  </div>
                  <span><strong>$1.1 trillion</strong> tied up in excess inventory globally</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertTriangleIcon className="h-5 w-5 text-destructive" />
                  </div>
                  <span><strong>60% of organizations</strong> lack supply chain visibility</span>
                </div>
              </div>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Impact Before Solution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On-time Delivery</span>
                    <span className="font-medium text-destructive">74%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Excess Inventory Cost</span>
                    <span className="font-medium text-destructive">$320K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manual Reporting Time</span>
                    <span className="font-medium text-destructive">40 hrs/week</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Forecast Accuracy</span>
                    <span className="font-medium text-destructive">65%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Solution Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">The Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Live dashboard with dynamic KPIs, interactive filtering, and automated data refresh
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Predictive Forecasting</h3>
                <p className="text-sm text-muted-foreground">
                  3-month forecasts with confidence intervals for proactive decision making
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <div className="p-3 bg-warning/10 rounded-full w-fit mx-auto mb-4">
                  <Brain className="h-8 w-8 text-warning" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Automated recommendations with confidence scores and prioritized actions
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Key Features & Capabilities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-2 bg-primary/10 rounded-lg h-fit">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Performance Benchmarking</h3>
                  <p className="text-muted-foreground text-sm">
                    Compare suppliers against industry averages and identify underperformers 
                    with percentile rankings and deviation analysis.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-2 bg-success/10 rounded-lg h-fit">
                  <Zap className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-muted-foreground text-sm">
                    Live data feeds with demo mode simulation showing 10-second updates 
                    and real-time notifications for critical events.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-2 bg-warning/10 rounded-lg h-fit">
                  <Award className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Interactive Visualizations</h3>
                  <p className="text-muted-foreground text-sm">
                    Dynamic charts with confidence intervals, hover tooltips, and 
                    export capabilities for comprehensive data analysis.
                  </p>
                </div>
              </div>
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Technical Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frontend</span>
                    <span className="font-medium">React 18 + TypeScript</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Styling</span>
                    <span className="font-medium">Tailwind CSS + Shadcn/ui</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Charts</span>
                    <span className="font-medium">Recharts + D3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">State Management</span>
                    <span className="font-medium">React Hooks + Context</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Processing</span>
                    <span className="font-medium">Custom Analytics Engine</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ML/Forecasting</span>
                    <span className="font-medium">Linear Regression + Seasonal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Quantified Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-3xl font-bold text-success mb-1">$210K+</div>
                <p className="text-sm text-muted-foreground">Annual cost savings identified</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary mb-1">20%</div>
                <p className="text-sm text-muted-foreground">Improvement in on-time delivery</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
              <CardContent className="p-6">
                <Zap className="h-8 w-8 text-warning mx-auto mb-2" />
                <div className="text-3xl font-bold text-warning mb-1">90%</div>
                <p className="text-sm text-muted-foreground">Reduction in manual reporting</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-3xl font-bold text-success mb-1">85%</div>
                <p className="text-sm text-muted-foreground">Forecast accuracy improvement</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Demonstrated */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Skills & Technologies Demonstrated</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      React & TypeScript
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Data Visualization
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Responsive Design
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      State Management
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      API Integration
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Performance Optimization
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Error Handling
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Testing & QA
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Business Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Supply Chain Analytics & KPI Design
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Predictive Modeling & Forecasting
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Business Intelligence & Reporting
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Data-Driven Decision Making
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Process Optimization & ROI Analysis
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-primary rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary-foreground mb-4">
            Ready to discuss how I can help your team?
          </h2>
          <p className="text-primary-foreground/90 mb-6">
            This case study demonstrates my ability to build comprehensive analytics solutions 
            that drive real business value. Let's connect!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">
              <Linkedin className="h-4 w-4 mr-2" />
              Connect on LinkedIn
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudy;