import { useState, useEffect } from 'react';
import { analyticsService, SupplierMetrics, KPIMetrics, FilterOptions } from '@/services/analyticsService';

export const useSupplyChainData = (filters: FilterOptions = {}) => {
  const [supplierMetrics, setSupplierMetrics] = useState<SupplierMetrics[]>([]);
  const [kpis, setKpis] = useState<KPIMetrics | null>(null);
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API calls with realistic delays
        const [supplierData, kpiData, inventoryTrendData, insightData] = await Promise.all([
          analyticsService.simulateApiCall(analyticsService.calculateSupplierMetrics(filters), 300),
          analyticsService.simulateApiCall(analyticsService.calculateKPIs(filters), 200),
          analyticsService.simulateApiCall(analyticsService.getInventoryTrendData(), 250),
          analyticsService.simulateApiCall(analyticsService.generateInsights(filters), 400)
        ]);

        setSupplierMetrics(supplierData);
        setKpis(kpiData);
        setInventoryData(inventoryTrendData);
        setInsights(insightData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch supply chain data');
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  const exportSupplierData = () => {
    const csvData = analyticsService.exportToCsv(supplierMetrics, 'supplier-performance');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supplier-performance.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportInventoryData = () => {
    const csvData = analyticsService.exportToCsv(inventoryData, 'inventory-trends');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory-trends.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return {
    supplierMetrics,
    kpis,
    inventoryData,
    insights,
    loading,
    error,
    exportSupplierData,
    exportInventoryData
  };
};