import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Award, TrendingDown, TrendingUp, Minus, Download } from "lucide-react";
import { BenchmarkData } from "@/services/forecastingService";

interface BenchmarkPanelProps {
  benchmarks: BenchmarkData[];
  loading?: boolean;
  onExport?: () => void;
}

const statusStyles = {
  above_average: { color: 'hsl(var(--success))', label: 'Above Average', icon: TrendingUp },
  average: { color: 'hsl(var(--warning))', label: 'Average', icon: Minus },
  below_average: { color: 'hsl(var(--destructive))', label: 'Below Average', icon: TrendingDown },
  critical: { color: 'hsl(var(--destructive))', label: 'Critical', icon: TrendingDown }
};

const statusVariants = {
  above_average: 'default',
  average: 'secondary',
  below_average: 'destructive',
  critical: 'destructive'
} as const;

export const BenchmarkPanel = ({ benchmarks = [], loading, onExport }: BenchmarkPanelProps) => {
  if (loading) {
    return (
      <Card className="animate-fade-in shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Performance Benchmarks
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

  // Group benchmarks by supplier for chart
  const supplierData = benchmarks.reduce((acc, benchmark) => {
    const existing = acc.find(item => item.supplierId === benchmark.supplierId);
    if (existing) {
      if (benchmark.metric === 'On-Time Delivery') {
        existing.onTimeDelivery = benchmark.currentValue;
        existing.onTimeAverage = benchmark.industryAverage;
      } else if (benchmark.metric === 'Defect Rate') {
        existing.defectRate = benchmark.currentValue;
        existing.defectAverage = benchmark.industryAverage;
      }
    } else {
      acc.push({
        supplierId: benchmark.supplierId,
        supplierName: benchmark.supplierName.substring(0, 12) + (benchmark.supplierName.length > 12 ? '...' : ''),
        onTimeDelivery: benchmark.metric === 'On-Time Delivery' ? benchmark.currentValue : 0,
        onTimeAverage: benchmark.metric === 'On-Time Delivery' ? benchmark.industryAverage : 0,
        defectRate: benchmark.metric === 'Defect Rate' ? benchmark.currentValue : 0,
        defectAverage: benchmark.metric === 'Defect Rate' ? benchmark.industryAverage : 0
      });
    }
    return acc;
  }, [] as any[]);

  // Critical performers
  const criticalPerformers = benchmarks.filter(b => b.status === 'critical' || b.status === 'below_average');
  const topPerformers = benchmarks.filter(b => b.status === 'above_average');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-card-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toFixed(1)}{entry.name.includes('Delivery') ? '%' : '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <CardTitle>Performance Benchmarks</CardTitle>
        </div>
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Overview Chart */}
        <div>
          <h4 className="font-semibold mb-3">Supplier vs Industry Average</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={supplierData.slice(0, 6)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="supplierName" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="onTimeDelivery" fill="hsl(var(--primary))" name="On-Time Delivery" />
              <Bar dataKey="onTimeAverage" fill="hsl(var(--muted))" name="Industry Average" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg">
            <h4 className="font-semibold text-success mb-2">Top Performers</h4>
            <p className="text-2xl font-bold text-success">{topPerformers.length}</p>
            <p className="text-sm text-muted-foreground">Suppliers above average</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 rounded-lg">
            <h4 className="font-semibold text-destructive mb-2">Need Attention</h4>
            <p className="text-2xl font-bold text-destructive">{criticalPerformers.length}</p>
            <p className="text-sm text-muted-foreground">Suppliers below average</p>
          </div>
        </div>

        {/* Detailed Benchmark List */}
        <div>
          <h4 className="font-semibold mb-3">Detailed Performance Analysis</h4>
          <div className="space-y-3">
            {benchmarks.slice(0, 8).map((benchmark) => {
              const status = statusStyles[benchmark.status];
              const StatusIcon = status.icon;
              
              return (
                <div key={`${benchmark.supplierId}-${benchmark.metric}`} 
                     className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{benchmark.supplierName}</span>
                      <span className="text-sm text-muted-foreground">• {benchmark.metric}</span>
                    </div>
                    <Badge 
                      variant={statusVariants[benchmark.status]}
                      className="flex items-center gap-1"
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current</p>
                      <p className="font-medium">{benchmark.currentValue.toFixed(1)}{benchmark.metric.includes('Delivery') ? '%' : '%'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Industry Avg</p>
                      <p className="font-medium">{benchmark.industryAverage.toFixed(1)}{benchmark.metric.includes('Delivery') ? '%' : '%'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Percentile</p>
                      <p className="font-medium">{benchmark.percentileRank}th</p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Performance vs Industry</span>
                      <span>{benchmark.deviation > 0 ? '+' : ''}{benchmark.deviation.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={Math.max(0, Math.min(100, 50 + benchmark.deviation))} 
                      className="h-2"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Best Practices */}
        <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
          <h4 className="font-semibold mb-2">Benchmark Insights</h4>
          <div className="text-sm space-y-1">
            <p>• Focus improvement efforts on suppliers in the bottom 25th percentile</p>
            <p>• Share best practices from top performers across the supply base</p>
            <p>• Consider performance-based contracts for consistent underperformers</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};