import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  className?: string;
}

const variantStyles = {
  default: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
};

const changeStyles = {
  positive: 'text-success bg-success/10',
  negative: 'text-destructive bg-destructive/10',
  neutral: 'text-muted-foreground bg-muted',
};

export const MetricCard = ({ title, value, change, icon: Icon, variant = 'default', className }: MetricCardProps) => {
  const changeType = change 
    ? change.value > 0 
      ? 'positive' 
      : change.value < 0 
        ? 'negative' 
        : 'neutral'
    : 'neutral';

  return (
    <Card className={cn("animate-fade-in shadow-card hover:shadow-elevated transition-all duration-200", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", variantStyles[variant])} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">{value}</div>
        {change && (
          <div className="flex items-center gap-1 mt-1">
            <span className={cn("text-xs px-2 py-1 rounded-full font-medium", changeStyles[changeType])}>
              {change.value > 0 ? '+' : ''}{change.value}%
            </span>
            <span className="text-xs text-muted-foreground">{change.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};