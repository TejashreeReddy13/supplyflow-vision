import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Download,
  FileText,
  Brain,
  Clock,
  Target
} from "lucide-react";
import { ForecastInsight } from "@/services/forecastingService";

interface EnhancedInsightsPanelProps {
  insights: ForecastInsight[];
  loading?: boolean;
  onExportReport?: () => void;
}

const typeStyles = {
  'trend': { color: 'hsl(var(--primary))', bg: 'bg-primary/10', icon: TrendingUp },
  'risk': { color: 'hsl(var(--destructive))', bg: 'bg-destructive/10', icon: AlertTriangle },
  'opportunity': { color: 'hsl(var(--success))', bg: 'bg-success/10', icon: DollarSign },
  'benchmark': { color: 'hsl(var(--warning))', bg: 'bg-warning/10', icon: Target },
};

const impactStyles = {
  high: { variant: 'destructive' as const, color: 'text-destructive' },
  medium: { variant: 'secondary' as const, color: 'text-warning' },
  low: { variant: 'outline' as const, color: 'text-muted-foreground' }
};

export const EnhancedInsightsPanel = ({ insights = [], loading, onExportReport }: EnhancedInsightsPanelProps) => {
  if (loading) {
    return (
      <Card className="animate-fade-in shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const highImpactInsights = insights.filter(i => i.impact === 'high');
  const avgConfidence = insights.length > 0 
    ? Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)
    : 0;

  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>AI-Powered Predictive Insights</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {insights.length} Insights Generated
              </Badge>
              <Badge 
                variant={avgConfidence > 80 ? "default" : "outline"} 
                className="text-xs"
              >
                {avgConfidence}% Avg Confidence
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View Details
          </Button>
          {onExportReport && (
            <Button variant="outline" size="sm" onClick={onExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-destructive">{highImpactInsights.length}</p>
            <p className="text-xs text-muted-foreground">High Impact</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-primary">{insights.filter(i => i.type === 'trend').length}</p>
            <p className="text-xs text-muted-foreground">Trends</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-warning">{insights.filter(i => i.type === 'risk').length}</p>
            <p className="text-xs text-muted-foreground">Risks</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-success">{insights.filter(i => i.type === 'opportunity').length}</p>
            <p className="text-xs text-muted-foreground">Opportunities</p>
          </div>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          {insights.length > 0 ? insights.map((insight) => {
            const typeStyle = typeStyles[insight.type];
            const impactStyle = impactStyles[insight.impact];
            const Icon = typeStyle.icon;
            
            return (
              <div 
                key={insight.id} 
                className={`p-4 border border-border rounded-lg hover:bg-muted/30 transition-all duration-200 ${typeStyle.bg}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg`} style={{ backgroundColor: typeStyle.color + '20' }}>
                      <Icon className="h-4 w-4" style={{ color: typeStyle.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant={impactStyle.variant}
                      className="text-xs"
                    >
                      {insight.impact.toUpperCase()} IMPACT
                    </Badge>
                    <div className="text-xs text-muted-foreground text-right">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {insight.timeframe}
                    </div>
                  </div>
                </div>
                
                {/* Confidence Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Confidence Level</span>
                    <span>{insight.confidence}%</span>
                  </div>
                  <Progress 
                    value={insight.confidence} 
                    className="h-2"
                  />
                </div>

                {/* Recommendation */}
                <div className="p-3 bg-background border border-border rounded-lg">
                  <p className="text-sm font-medium text-card-foreground mb-1">Recommended Action:</p>
                  <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No predictive insights available at this time.</p>
              <p className="text-sm">Check back after data processing completes.</p>
            </div>
          )}
        </div>

        {/* Action Summary */}
        {insights.length > 0 && (
          <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Priority Actions Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Immediate (0-30 days):</p>
                <ul className="space-y-1 text-xs opacity-90">
                  {insights.filter(i => i.timeframe.includes('30') || i.timeframe.includes('Immediate')).map(i => (
                    <li key={i.id}>• {i.title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Medium-term (30-90 days):</p>
                <ul className="space-y-1 text-xs opacity-90">
                  {insights.filter(i => i.timeframe.includes('60') || i.timeframe.includes('90')).map(i => (
                    <li key={i.id}>• {i.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};