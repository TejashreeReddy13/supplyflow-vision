import { useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SupplierTable } from "@/components/dashboard/SupplierTable";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { BenchmarkPanel } from "@/components/dashboard/BenchmarkPanel";
import { EnhancedInsightsPanel } from "@/components/dashboard/EnhancedInsightsPanel";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GuidedTour } from "@/components/GuidedTour";
import { useDemoMode } from "@/services/demoService";
import { useSupplyChainData } from "@/hooks/useSupplyChainData";
import { FilterOptions } from "@/services/analyticsService";
import { 
  TruckIcon, 
  PackageIcon, 
  AlertTriangleIcon, 
  DollarSignIcon,
  BarChart3Icon,
  TrendingUpIcon,
  Download,
  Play,
  Square,
  HelpCircle,
  Share2,
  RotateCcw,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    region: 'all-regions',
    supplier: 'all-suppliers',
    productCategory: 'all-products',
    timePeriod: 'last-12-months'
  });

  const [showTour, setShowTour] = useState(false);
  const { 
    isActive: isDemoActive, 
    lastUpdate, 
    notifications, 
    startDemo, 
    stopDemo, 
    clearNotifications 
  } = useDemoMode();

  const { 
    supplierMetrics, 
    kpis, 
    inventoryData, 
    insights,
    onTimeForecasts,
    inventoryForecasts,
    supplierForecasts,
    forecastInsights,
    benchmarkData,
    loading,
    forecastLoading,
    error,
    exportSupplierData,
    exportInventoryData,
    exportForecastReport
  } = useSupplyChainData(filters);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    setFilters({ ...filters });
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated with latest information."
    });
  };

  const resetToDefault = () => {
    setFilters({
      region: 'all-regions',
      supplier: 'all-suppliers',
      productCategory: 'all-products',
      timePeriod: 'last-12-months'
    });
    toast({
      title: "View Reset",
      description: "Dashboard has been reset to default view."
    });
  };

  const handleDemoToggle = () => {
    if (isDemoActive) {
      stopDemo();
      toast({
        title: "Demo Mode Disabled",
        description: "Real-time simulation has been stopped."
      });
    } else {
      startDemo();
      toast({
        title: "Demo Mode Activated",
        description: "Real-time simulation started - watch for live updates!"
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Supply Chain Analytics Dashboard',
        text: 'Check out this comprehensive supply chain optimization dashboard',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Dashboard link has been copied to clipboard."
      });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Dashboard</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <GuidedTour isOpen={showTour} onClose={() => setShowTour(false)} />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card shadow-sm dashboard-header">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">Supply Chain Analytics Dashboard</h1>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-muted-foreground">Real-time visibility and optimization insights</p>
                  {isDemoActive && (
                    <Badge variant="secondary" className="animate-pulse">
                      🔴 Live Demo Mode
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3Icon className="h-8 w-8 text-primary" />
                <div className="text-right">
                  <span className="text-sm text-muted-foreground block">Last updated: 5 minutes ago</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Button variant="outline" size="sm" onClick={() => setShowTour(true)}>
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Tour
                    </Button>
                    <Button 
                      variant={isDemoActive ? "destructive" : "secondary"} 
                      size="sm" 
                      onClick={handleDemoToggle}
                    >
                      {isDemoActive ? <Square className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                      {isDemoActive ? "Stop Demo" : "Demo Mode"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/case-study" target="_blank">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Case Study
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-6 space-y-6">
          {/* Demo notifications */}
          {notifications.length > 0 && (
            <div className="space-y-2">
              {notifications.slice(0, 2).map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg border animate-fade-in ${
                    notification.type === 'success' ? 'bg-success/10 border-success/20 text-success' :
                    notification.type === 'warning' ? 'bg-warning/10 border-warning/20 text-warning' :
                    'bg-primary/10 border-primary/20 text-primary'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs opacity-90">{notification.message}</p>
                    </div>
                    <span className="text-xs opacity-70">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Filters */}
          <div className="filters-section">
            <ErrorBoundary>
              <DashboardFilters 
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onRefresh={handleRefresh}
              />
            </ErrorBoundary>
            
            {/* Reset View Button */}
            <div className="flex justify-end mt-2">
              <Button variant="ghost" size="sm" onClick={resetToDefault}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset View
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 kpi-metrics">
          <MetricCard
            title="Average On-Time Delivery"
            value={kpis ? `${kpis.averageOnTimeDelivery}%` : "--"}
            change={{ value: 3.2, label: "vs last month" }}
            icon={TruckIcon}
            variant="success"
          />
          <MetricCard
            title="Inventory Turnover"
            value={kpis ? `${kpis.inventoryTurnover}x` : "--"}
            change={{ value: -0.8, label: "vs last quarter" }}
            icon={PackageIcon}
            variant="warning"
          />
          <MetricCard
            title="Underperforming Suppliers"
            value={kpis ? kpis.underperformingSuppliers.toString() : "--"}
            change={{ value: -2, label: "this month" }}
            icon={AlertTriangleIcon}
            variant="destructive"
          />
          <MetricCard
            title="Cost Savings Identified"
            value={kpis ? `$${Math.round(kpis.totalCostSavings / 1000)}K` : "--"}
            change={{ value: 15.3, label: "potential annual" }}
            icon={DollarSignIcon}
            variant="success"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary>
            <InventoryChart 
              data={inventoryData}
              loading={loading}
              onExport={exportInventoryData}
            />
          </ErrorBoundary>
          <div className="space-y-6">
            <MetricCard
              title="Supply Chain Health Score"
              value={kpis ? `${kpis.healthScore}/10` : "--"}
              change={{ value: 1.2, label: "improvement this quarter" }}
              icon={TrendingUpIcon}
              variant="success"
              className="h-fit"
            />
            <div className="p-6 bg-gradient-primary rounded-lg text-primary-foreground">
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <div className="space-y-2 text-sm">
                <div>• Review underperforming supplier contracts</div>
                <div>• Optimize Q4 inventory planning</div>
                <div>• Evaluate new supplier opportunities</div>
                <div>• Implement demand forecasting model</div>
              </div>
            </div>
          </div>
        </div>

          {/* Forecasting Section */}
          <div className="space-y-6 forecasting-section">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-card-foreground">Predictive Analytics & Forecasting</h2>
              <Button variant="outline" onClick={exportForecastReport} disabled={forecastLoading}>
                <Download className="h-4 w-4 mr-2" />
                Export Forecast Report
              </Button>
            </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ErrorBoundary>
              <ForecastChart
                title="On-Time Delivery Forecast"
                data={onTimeForecasts}
                loading={forecastLoading}
                unit="%"
                color="hsl(var(--primary))"
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <ForecastChart
                title="Inventory Turnover Forecast"
                data={inventoryForecasts}
                loading={forecastLoading}
                unit="x"
                color="hsl(var(--success))"
              />
            </ErrorBoundary>
          </div>
        </div>

          {/* Benchmarking Section */}
          <div className="benchmarking-section">
            <ErrorBoundary>
              <BenchmarkPanel
                benchmarks={benchmarkData}
                loading={forecastLoading}
              />
            </ErrorBoundary>
          </div>

        {/* Supplier Performance Table */}
        <ErrorBoundary>
          <SupplierTable 
            suppliers={supplierMetrics}
            loading={loading}
            onExport={exportSupplierData}
          />
        </ErrorBoundary>

          {/* AI Insights Panel */}
          <div className="insights-section">
            <ErrorBoundary>
              <EnhancedInsightsPanel 
                insights={forecastInsights}
                loading={forecastLoading}
                onExportReport={exportForecastReport}
              />
            </ErrorBoundary>
          </div>

          {/* Legacy Insights Panel (for comparison) */}
          <ErrorBoundary>
          <InsightsPanel 
            insights={insights}
            loading={loading}
            totalSavings={kpis?.totalCostSavings || 210000}
          />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Index;
