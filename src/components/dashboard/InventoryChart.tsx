import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const inventoryData = [
  { month: 'Jan', turnover: 4.2, demand: 850, stockLevel: 1200 },
  { month: 'Feb', turnover: 3.8, demand: 920, stockLevel: 1150 },
  { month: 'Mar', turnover: 5.1, demand: 1200, stockLevel: 980 },
  { month: 'Apr', turnover: 4.9, demand: 1150, stockLevel: 1050 },
  { month: 'May', turnover: 3.2, demand: 780, stockLevel: 1300 },
  { month: 'Jun', turnover: 6.2, demand: 1450, stockLevel: 850 },
  { month: 'Jul', turnover: 5.8, demand: 1380, stockLevel: 920 },
  { month: 'Aug', turnover: 4.5, demand: 1100, stockLevel: 1100 },
  { month: 'Sep', turnover: 4.8, demand: 1220, stockLevel: 1000 },
  { month: 'Oct', turnover: 5.5, demand: 1350, stockLevel: 890 },
  { month: 'Nov', turnover: 6.8, demand: 1580, stockLevel: 750 },
  { month: 'Dec', turnover: 7.2, demand: 1650, stockLevel: 680 },
];

export const InventoryChart = () => {
  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader>
        <CardTitle>Inventory Turnover & Seasonal Demand</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={inventoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
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
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Key Insight:</strong> Peak demand periods (June-December) correlate with lower inventory turnover, 
            indicating potential optimization opportunities to reduce carrying costs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};