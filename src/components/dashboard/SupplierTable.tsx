import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SupplierMetrics } from "@/services/analyticsService";
import { Download } from "lucide-react";

interface SupplierTableProps {
  suppliers: SupplierMetrics[];
  loading?: boolean;
  onExport: () => void;
}

const statusStyles = {
  excellent: 'bg-success text-success-foreground',
  good: 'bg-warning text-warning-foreground',
  poor: 'bg-destructive text-destructive-foreground',
};

export const SupplierTable = ({ suppliers = [], loading, onExport }: SupplierTableProps) => {
  if (loading) {
    return (
      <Card className="animate-fade-in shadow-card">
        <CardHeader>
          <CardTitle>Supplier Performance Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Supplier Performance Rankings</CardTitle>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">On-Time Delivery</TableHead>
              <TableHead className="text-right">Defect Rate</TableHead>
              <TableHead className="text-right">Total Orders</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers && suppliers.length > 0 ? suppliers.map((supplier) => (
              <TableRow key={supplier.supplier_id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold">{supplier.name}</div>
                    <div className="text-sm text-muted-foreground">{supplier.supplier_id}</div>
                  </div>
                </TableCell>
                <TableCell>{supplier.region}</TableCell>
                <TableCell className="text-right font-medium">
                  {supplier.onTimeDelivery.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right font-medium">
                  {supplier.defectRate.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right">{supplier.totalOrders.toLocaleString()}</TableCell>
                <TableCell className="text-right">${supplier.totalValue.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={statusStyles[supplier.status]} variant="secondary">
                    {supplier.status}
                  </Badge>
                </TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
        {(!suppliers || suppliers.length === 0) && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            No suppliers found matching the current filters.
          </div>
        )}
      </CardContent>
    </Card>
  );
};