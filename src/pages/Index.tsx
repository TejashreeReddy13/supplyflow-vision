import { useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SupplierTable } from "@/components/dashboard/SupplierTable";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { useSupplyChainData } from "@/hooks/useSupplyChainData";
import { FilterOptions } from "@/services/analyticsService";
import { 
  TruckIcon, 
  PackageIcon, 
  AlertTriangleIcon, 
  DollarSignIcon,
  BarChart3Icon,
  TrendingUpIcon
} from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    region: 'all-regions',
    supplier: 'all-suppliers',
    productCategory: 'all-products',
    timePeriod: 'last-12-months'
  });

  const { 
    supplierMetrics, 
    kpis, 
    inventoryData, 
    insights, 
    loading, 
    error,
    exportSupplierData,
    exportInventoryData 
  } = useSupplyChainData(filters);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    // Force a refresh by updating filters
    setFilters({ ...filters });
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">Supply Chain Analytics Dashboard</h1>
              <p className="text-muted-foreground">Real-time visibility and optimization insights</p>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3Icon className="h-8 w-8 text-primary" />
              <span className="text-sm text-muted-foreground">Last updated: 5 minutes ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Filters */}
        <DashboardFilters 
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onRefresh={handleRefresh}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <InventoryChart 
            data={inventoryData}
            loading={loading}
            onExport={exportInventoryData}
          />
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

        {/* Supplier Performance Table */}
        <SupplierTable 
          suppliers={supplierMetrics}
          loading={loading}
          onExport={exportSupplierData}
        />

        {/* AI Insights Panel */}
        <InsightsPanel 
          insights={insights}
          loading={loading}
          totalSavings={kpis?.totalCostSavings || 210000}
        />
      </div>
    </div>
  );
};

export default Index;
