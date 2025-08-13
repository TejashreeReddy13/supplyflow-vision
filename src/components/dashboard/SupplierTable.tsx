import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Supplier {
  id: string;
  name: string;
  onTimeDelivery: number;
  defectRate: number;
  totalOrders: number;
  status: 'excellent' | 'good' | 'poor';
  region: string;
}

const suppliers: Supplier[] = [
  { id: "SUP001", name: "Global Electronics Corp", onTimeDelivery: 94.2, defectRate: 0.8, totalOrders: 1250, status: 'excellent', region: 'Asia' },
  { id: "SUP002", name: "TechParts Inc", onTimeDelivery: 87.5, defectRate: 2.1, totalOrders: 890, status: 'good', region: 'North America' },
  { id: "SUP003", name: "Premium Components Ltd", onTimeDelivery: 72.1, defectRate: 4.5, totalOrders: 567, status: 'poor', region: 'Europe' },
  { id: "SUP004", name: "Reliable Parts Co", onTimeDelivery: 91.8, defectRate: 1.2, totalOrders: 1100, status: 'excellent', region: 'Asia' },
  { id: "SUP005", name: "Quality Manufacturing", onTimeDelivery: 85.3, defectRate: 2.8, totalOrders: 780, status: 'good', region: 'North America' },
];

const statusStyles = {
  excellent: 'bg-success text-success-foreground',
  good: 'bg-warning text-warning-foreground',
  poor: 'bg-destructive text-destructive-foreground',
};

export const SupplierTable = () => {
  return (
    <Card className="animate-fade-in shadow-card">
      <CardHeader>
        <CardTitle>Supplier Performance Rankings</CardTitle>
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
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold">{supplier.name}</div>
                    <div className="text-sm text-muted-foreground">{supplier.id}</div>
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
                <TableCell>
                  <Badge className={statusStyles[supplier.status]} variant="secondary">
                    {supplier.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};