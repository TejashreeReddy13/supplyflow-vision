import supplyChainData from '@/data/supplyChainData.json';

export interface Shipment {
  shipment_id: string;
  supplier_id: string;
  supplier_name: string;
  region: string;
  product_category: string;
  product_name: string;
  order_date: string;
  scheduled_delivery: string;
  actual_delivery: string;
  quantity_ordered: number;
  quantity_delivered: number;
  defect_count: number;
  cost: number;
  shipping_cost: number;
}

export interface SupplierMetrics {
  supplier_id: string;
  name: string;
  region: string;
  onTimeDelivery: number;
  defectRate: number;
  totalOrders: number;
  totalValue: number;
  status: 'excellent' | 'good' | 'poor';
  rating: number;
}

export interface KPIMetrics {
  averageOnTimeDelivery: number;
  inventoryTurnover: number;
  underperformingSuppliers: number;
  totalCostSavings: number;
  healthScore: number;
}

export interface FilterOptions {
  region?: string;
  supplier?: string;
  productCategory?: string;
  timePeriod?: string;
}

class AnalyticsService {
  private shipments: Shipment[] = supplyChainData.shipments;
  private suppliers = supplyChainData.suppliers;
  private inventory = supplyChainData.inventory;

  // Calculate days difference between two dates
  private daysDifference(date1: string, date2: string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Filter shipments based on criteria
  private filterShipments(filters: FilterOptions): Shipment[] {
    return this.shipments.filter(shipment => {
      if (filters.region && filters.region !== 'all-regions' && shipment.region !== filters.region) return false;
      if (filters.productCategory && filters.productCategory !== 'all-products' && shipment.product_category !== filters.productCategory) return false;
      // Add more filter logic as needed
      return true;
    });
  }

  // Calculate supplier performance metrics
  calculateSupplierMetrics(filters: FilterOptions = {}): SupplierMetrics[] {
    const filteredShipments = this.filterShipments(filters);
    
    const supplierMap = new Map<string, {
      onTimeCount: number;
      totalOrders: number;
      totalDefects: number;
      totalQuantity: number;
      totalValue: number;
    }>();

    // Initialize supplier data
    this.suppliers.forEach(supplier => {
      supplierMap.set(supplier.supplier_id, {
        onTimeCount: 0,
        totalOrders: 0,
        totalDefects: 0,
        totalQuantity: 0,
        totalValue: 0
      });
    });

    // Process shipments
    filteredShipments.forEach(shipment => {
      const supplierData = supplierMap.get(shipment.supplier_id);
      if (!supplierData) return;

      const isOnTime = new Date(shipment.actual_delivery) <= new Date(shipment.scheduled_delivery);
      
      supplierData.totalOrders++;
      supplierData.totalDefects += shipment.defect_count;
      supplierData.totalQuantity += shipment.quantity_delivered;
      supplierData.totalValue += shipment.cost;
      
      if (isOnTime) {
        supplierData.onTimeCount++;
      }
    });

    // Calculate metrics and return results
    return this.suppliers.map(supplier => {
      const data = supplierMap.get(supplier.supplier_id)!;
      const onTimeDelivery = data.totalOrders > 0 ? (data.onTimeCount / data.totalOrders) * 100 : 0;
      const defectRate = data.totalQuantity > 0 ? (data.totalDefects / data.totalQuantity) * 100 : 0;
      
      let status: 'excellent' | 'good' | 'poor' = 'poor';
      if (onTimeDelivery >= 90 && defectRate <= 1.5) status = 'excellent';
      else if (onTimeDelivery >= 80 && defectRate <= 3) status = 'good';

      return {
        supplier_id: supplier.supplier_id,
        name: supplier.name,
        region: supplier.region,
        onTimeDelivery,
        defectRate,
        totalOrders: data.totalOrders,
        totalValue: data.totalValue,
        status,
        rating: supplier.rating
      };
    }).sort((a, b) => b.onTimeDelivery - a.onTimeDelivery);
  }

  // Calculate overall KPIs
  calculateKPIs(filters: FilterOptions = {}): KPIMetrics {
    const supplierMetrics = this.calculateSupplierMetrics(filters);
    const filteredShipments = this.filterShipments(filters);
    
    const averageOnTimeDelivery = supplierMetrics.length > 0 
      ? supplierMetrics.reduce((sum, s) => sum + s.onTimeDelivery, 0) / supplierMetrics.length 
      : 0;

    const underperformingSuppliers = supplierMetrics.filter(s => s.status === 'poor').length;
    
    // Calculate inventory turnover (average across products)
    const inventoryTurnover = this.inventory.reduce((sum, item) => {
      const avgTurnover = item.turnover_rate.reduce((a, b) => a + b, 0) / item.turnover_rate.length;
      return sum + avgTurnover;
    }, 0) / this.inventory.length;

    // Calculate potential cost savings based on performance improvements
    const totalCostSavings = supplierMetrics
      .filter(s => s.status === 'poor')
      .reduce((sum, s) => sum + (s.totalValue * 0.15), 0); // 15% savings potential

    // Health score based on multiple factors
    const healthScore = Math.min(10, (averageOnTimeDelivery / 10) + (10 - underperformingSuppliers * 0.5));

    return {
      averageOnTimeDelivery: Math.round(averageOnTimeDelivery * 10) / 10,
      inventoryTurnover: Math.round(inventoryTurnover * 10) / 10,
      underperformingSuppliers,
      totalCostSavings: Math.round(totalCostSavings),
      healthScore: Math.round(healthScore * 10) / 10
    };
  }

  // Get inventory trend data
  getInventoryTrendData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map((month, index) => {
      const totalDemand = this.inventory.reduce((sum, item) => sum + item.monthly_demand[index], 0);
      const avgTurnover = this.inventory.reduce((sum, item) => sum + item.turnover_rate[index], 0) / this.inventory.length;
      const totalStock = this.inventory.reduce((sum, item) => sum + item.current_stock, 0);
      
      return {
        month,
        turnover: Math.round(avgTurnover * 10) / 10,
        demand: totalDemand,
        stockLevel: Math.round(totalStock * (1 + (Math.random() * 0.4 - 0.2))) // Add some variation
      };
    });
  }

  // Generate insights based on data analysis
  generateInsights(filters: FilterOptions = {}) {
    const kpis = this.calculateKPIs(filters);
    const supplierMetrics = this.calculateSupplierMetrics(filters);
    const poorPerformers = supplierMetrics.filter(s => s.status === 'poor');
    
    const insights = [
      {
        id: 'INS001',
        type: 'cost-saving' as const,
        title: 'Optimize Q4 Inventory Levels',
        description: 'Reduce inventory by 15% during Q4 peak season to save on carrying costs while maintaining service levels.',
        impact: `$${Math.round(kpis.totalCostSavings * 0.6 / 1000)}K annual savings`,
        priority: 'high' as const
      },
      {
        id: 'INS002',
        type: 'risk' as const,
        title: `${poorPerformers[0]?.name || 'Supplier'} Performance Risk`,
        description: `Supplier showing declining performance with ${poorPerformers[0]?.onTimeDelivery.toFixed(1) || '72'}% on-time delivery. Consider alternative suppliers.`,
        impact: 'Service disruption risk',
        priority: 'high' as const
      },
      {
        id: 'INS003',
        type: 'efficiency' as const,
        title: 'Consolidate Regional Suppliers',
        description: 'Reduce supplier base to improve management efficiency and leverage volume discounts.',
        impact: '20% procurement efficiency gain',
        priority: 'medium' as const
      },
      {
        id: 'INS004',
        type: 'opportunity' as const,
        title: 'Seasonal Demand Forecasting',
        description: 'Implement advanced forecasting for 40% improvement in demand prediction accuracy.',
        impact: `$${Math.round(kpis.totalCostSavings * 0.4 / 1000)}K inventory optimization`,
        priority: 'medium' as const
      }
    ];

    return insights;
  }

  // Export data as CSV
  exportToCsv(data: any[], filename: string): string {
    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(','))
    ].join('\n');
    
    return csvContent;
  }

  // Simulate API delay
  async simulateApiCall<T>(data: T, delay: number = 500): Promise<T> {
    return new Promise(resolve => {
      setTimeout(() => resolve(data), delay);
    });
  }
}

export const analyticsService = new AnalyticsService();