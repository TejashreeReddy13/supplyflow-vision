import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  ComposedChart,
  Legend
} from "recharts";
import { Download, TrendingUp, AlertTriangle } from "lucide-react";
import { ForecastData } from "@/services/forecastingService";

interface ForecastChartProps {
  title: string;
  data: ForecastData[];
  loading?: boolean;
  unit?: string;
  color?: string;
  onExport?: () => void;
}

export const ForecastChart = ({ 
  title, 
  data = [], 
  loading, 
  unit = "%", 
  color = "hsl(var(--primary))",
  onExport 
}: ForecastChartProps) => {
  if (loading) {
    return (
      <Card className="animate-fade-in shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {title}
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

  const avgConfidence = data.length > 0 
    ? Math.round(data.reduce((sum, d) => sum + d.confidence, 0) / data.length)
    : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-card-foreground">{label}</p>
          <p className="text-primary">
            Predicted: {data.predicted}{unit}
          </p>
          <p className="text-muted-foreground text-sm">
            Range: {data.lowerBound}{unit} - {data.upperBound}{unit}
          </p>
          <p className="text-sm">
            Confidence: {Math.round(data.confidence)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>{title}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                3-Month Forecast
              </Badge>
              <Badge 
                variant={avgConfidence > 80 ? "default" : "outline"} 
                className="text-xs"
              >
                {avgConfidence}% Confidence
              </Badge>
            </div>
          </div>
        </div>
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {(!data || data.length === 0) ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No forecast data available</p>
            </div>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value}${unit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {/* Confidence interval area */}
                <Area
                  type="monotone"
                  dataKey="upperBound"
                  stackId="confidence"
                  stroke="transparent"
                  fill="url(#confidenceGradient)"
                  name="Confidence Interval"
                />
                <Area
                  type="monotone"
                  dataKey="lowerBound"
                  stackId="confidence"
                  stroke="transparent"
                  fill="transparent"
                />
                
                {/* Prediction line */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke={color}
                  strokeWidth={3}
                  dot={{ fill: color, strokeWidth: 2, r: 6 }}
                  name={`Predicted ${title}`}
                />
                
                {/* Confidence bounds */}
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  stroke={color}
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Upper Bound"
                />
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  stroke={color}
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Lower Bound"
                />
              </ComposedChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Forecast Summary:</strong> Predictions show{' '}
                {data[data.length - 1]?.predicted > data[0]?.predicted ? 
                  'an improving trend' : 'a declining trend'} over the next 3 months.
                Average confidence level: {avgConfidence}%.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};