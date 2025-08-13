import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Download, Package } from "lucide-react";

interface InventoryChartProps {
  data?: any[];
  loading?: boolean;
  onExport: () => void;
}

export const InventoryChart = ({ data = [], loading, onExport }: InventoryChartProps) => {
  if (loading) {
    return (
      <Card className="animate-fade-in shadow-card">
        <CardHeader>
          <CardTitle>Inventory Turnover & Seasonal Demand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-card-foreground">{`Month: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
          <p className="text-xs text-muted-foreground mt-1">
            Trend: {payload[0]?.value > payload[1]?.value ? "High demand period" : "Optimization opportunity"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Inventory Turnover & Seasonal Demand</CardTitle>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </CardHeader>
      <CardContent>
        {(!data || data.length === 0) && !loading ? (
          <div className="flex items-center justify-center h-80 text-muted-foreground">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No inventory data available</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="demand"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#demandGradient)"
              name="Demand (units)"
            />
            <Area
              type="monotone"
              dataKey="stockLevel"
              stroke="hsl(var(--accent))"
              fillOpacity={1}
              fill="url(#stockGradient)"
              name="Stock Level (units)"
            />
          </AreaChart>
        </ResponsiveContainer>
        )}
        {data && data.length > 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Key Insight:</strong> Peak demand periods (June-December) correlate with higher inventory turnover, 
            indicating effective inventory management during seasonal fluctuations.
          </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};