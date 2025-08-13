import { useState, useEffect } from 'react';
import { analyticsService, SupplierMetrics, KPIMetrics, FilterOptions } from '@/services/analyticsService';
import { 
  forecastingService, 
  ForecastData, 
  SupplierForecast, 
  ForecastInsight, 
  BenchmarkData 
} from '@/services/forecastingService';

export const useSupplyChainData = (filters: FilterOptions = {}) => {
  const [supplierMetrics, setSupplierMetrics] = useState<SupplierMetrics[]>([]);
  const [kpis, setKpis] = useState<KPIMetrics | null>(null);
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [onTimeForecasts, setOnTimeForecasts] = useState<ForecastData[]>([]);
  const [inventoryForecasts, setInventoryForecasts] = useState<ForecastData[]>([]);
  const [supplierForecasts, setSupplierForecasts] = useState<SupplierForecast[]>([]);
  const [forecastInsights, setForecastInsights] = useState<ForecastInsight[]>([]);
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch basic analytics data
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
        setLoading(false);

        // Fetch forecasting data with longer delay to simulate ML processing
        setForecastLoading(true);
        const [onTimeData, inventoryTurnoverData, supplierForecastData, benchmarks] = await Promise.all([
          forecastingService.simulateApiCall(forecastingService.generateOnTimeDeliveryForecast(supplierData), 800),
          forecastingService.simulateApiCall(forecastingService.generateInventoryTurnoverForecast(), 900),
          forecastingService.simulateApiCall(forecastingService.generateSupplierForecasts(supplierData), 1000),
          forecastingService.simulateApiCall(forecastingService.generateBenchmarkData(supplierData), 700)
        ]);

        setOnTimeForecasts(onTimeData);
        setInventoryForecasts(inventoryTurnoverData);
        setSupplierForecasts(supplierForecastData);
        setBenchmarkData(benchmarks);

        // Generate forecast insights based on all data
        const predictiveInsights = await forecastingService.simulateApiCall(
          forecastingService.generateForecastInsights(supplierData, supplierForecastData), 
          600
        );
        setForecastInsights(predictiveInsights);
        
        setForecastLoading(false);
      } catch (err) {
        setError('Failed to fetch supply chain data');
        console.error('Data fetch error:', err);
        setLoading(false);
        setForecastLoading(false);
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

  const exportForecastReport = () => {
    const reportContent = forecastingService.generateForecastReport(
      onTimeForecasts,
      inventoryForecasts,
      supplierForecasts,
      forecastInsights
    );
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supply-chain-forecast-report.txt';
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
  };
};