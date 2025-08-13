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

export const DashboardFilters = () => {
  return (
    <Card className="shadow-card">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select defaultValue="all-regions">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-regions">All Regions</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="south-america">South America</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-suppliers">
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

          <Select defaultValue="all-products">
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Product Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-products">All Products</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="consumer">Consumer Goods</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="last-12-months">
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
            <Button variant="outline" size="sm">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};