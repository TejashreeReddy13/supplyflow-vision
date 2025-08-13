import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FilterIcon, RefreshCwIcon } from "lucide-react";
import { FilterOptions } from "@/services/analyticsService";

interface DashboardFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onRefresh: () => void;
}

export const DashboardFilters = ({ filters = {}, onFiltersChange, onRefresh }: DashboardFiltersProps) => {
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card className="shadow-card">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select 
            value={filters.region || 'all-regions'} 
            onValueChange={(value) => handleFilterChange('region', value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-regions">All Regions</SelectItem>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="North America">North America</SelectItem>
              <SelectItem value="Europe">Europe</SelectItem>
              <SelectItem value="South America">South America</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.supplier || 'all-suppliers'} 
            onValueChange={(value) => handleFilterChange('supplier', value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-suppliers">All Suppliers</SelectItem>
              <SelectItem value="excellent">Excellent Performers</SelectItem>
              <SelectItem value="good">Good Performers</SelectItem>
              <SelectItem value="poor">Underperformers</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.productCategory || 'all-products'} 
            onValueChange={(value) => handleFilterChange('productCategory', value)}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Product Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-products">All Products</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Automotive">Automotive</SelectItem>
              <SelectItem value="Industrial">Industrial</SelectItem>
              <SelectItem value="Consumer">Consumer Goods</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.timePeriod || 'last-12-months'} 
            onValueChange={(value) => handleFilterChange('timePeriod', value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-12-months">Last 12 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="current-year">Current Year</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Custom Date Range
            </Button>
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};