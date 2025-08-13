import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Download,
  ExternalLink 
} from "lucide-react";

interface Insight {
  id: string;
  type: 'cost-saving' | 'efficiency' | 'risk' | 'opportunity';
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
}

const insights: Insight[] = [
  {
    id: 'INS001',
    type: 'cost-saving',
    title: 'Optimize Q4 Inventory Levels',
    description: 'Reduce inventory by 15% during Q4 peak season to save on carrying costs while maintaining service levels.',
    impact: '$125K annual savings',
    priority: 'high'
  },
  {
    id: 'INS002',
    type: 'risk',
    title: 'Premium Components Ltd Performance Risk',
    description: 'Supplier showing declining performance with 72% on-time delivery. Consider alternative suppliers.',
    impact: 'Service disruption risk',
    priority: 'high'
  },
  {
    id: 'INS003',
    type: 'efficiency',
    title: 'Consolidate Asian Suppliers',
    description: 'Reduce supplier base in Asia from 15 to 8 suppliers to improve management efficiency.',
    impact: '20% procurement efficiency gain',
    priority: 'medium'
  },
  {
    id: 'INS004',
    type: 'opportunity',
    title: 'Seasonal Demand Forecasting',
    description: 'Implement advanced forecasting for 40% improvement in demand prediction accuracy.',
    impact: '$85K inventory optimization',
    priority: 'medium'
  }
];

const typeStyles = {
  'cost-saving': 'bg-success text-success-foreground',
  'efficiency': 'bg-primary text-primary-foreground',
  'risk': 'bg-destructive text-destructive-foreground',
  'opportunity': 'bg-warning text-warning-foreground',
};

const priorityStyles = {
  high: 'bg-destructive text-destructive-foreground',
  medium: 'bg-warning text-warning-foreground',
  low: 'bg-muted text-muted-foreground',
};

const typeIcons = {
  'cost-saving': DollarSign,
  'efficiency': TrendingUp,
  'risk': AlertTriangle,
  'opportunity': Package,
};

export const InsightsPanel = () => {
  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI-Powered Insights & Recommendations</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <ExternalLink className="h-4 w-4 mr-2" />
            View in BI Tool
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const Icon = typeIcons[insight.type];
          return (
            <div 
              key={insight.id} 
              className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-semibold text-card-foreground">{insight.title}</h4>
                </div>
                <div className="flex gap-2">
                  <Badge className={typeStyles[insight.type]} variant="secondary">
                    {insight.type.replace('-', ' ')}
                  </Badge>
                  <Badge className={priorityStyles[insight.priority]} variant="secondary">
                    {insight.priority}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{insight.impact}</span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
        
        <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-primary-foreground">
          <h4 className="font-semibold mb-2">Total Potential Savings</h4>
          <div className="text-2xl font-bold">$210K+ Annual</div>
          <p className="text-sm opacity-90">Based on current recommendations implementation</p>
        </div>
      </CardContent>
    </Card>
  );
};