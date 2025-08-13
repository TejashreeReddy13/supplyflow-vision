import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Download,
  ExternalLink,
  FileText
} from "lucide-react";

interface Insight {
  id: string;
  type: 'cost-saving' | 'efficiency' | 'risk' | 'opportunity';
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
}

interface InsightsPanelProps {
  insights: Insight[];
  loading?: boolean;
  totalSavings?: number;
}

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

export const InsightsPanel = ({ insights, loading, totalSavings = 210000 }: InsightsPanelProps) => {
  const downloadInsightsReport = () => {
    const reportContent = `
Supply Chain Analytics - Insights Report
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
Total Potential Savings: $${totalSavings.toLocaleString()}
Number of Insights: ${insights.length}
High Priority Items: ${insights.filter(i => i.priority === 'high').length}

DETAILED INSIGHTS
${insights.map((insight, index) => `
${index + 1}. ${insight.title} (${insight.priority.toUpperCase()} PRIORITY)
Type: ${insight.type.replace('-', ' ').toUpperCase()}
Impact: ${insight.impact}
Description: ${insight.description}
`).join('\n')}

RECOMMENDATIONS
- Prioritize high-priority items for immediate action
- Implement cost-saving measures to achieve identified savings
- Monitor KPIs regularly to track improvement
- Review supplier relationships quarterly
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supply-chain-insights-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Card className="animate-fade-in shadow-card">
        <CardHeader>
          <CardTitle>AI-Powered Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI-Powered Insights & Recommendations</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={downloadInsightsReport}>
            <FileText className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
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
          <div className="text-2xl font-bold">${totalSavings.toLocaleString()}+ Annual</div>
          <p className="text-sm opacity-90">Based on current recommendations implementation</p>
        </div>
      </CardContent>
    </Card>
  );
};