import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { StatusBadge } from "./status-badge";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (item: T) => React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
}: DataTableProps<T>) {
  return (
    <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F8FAFC]">
            {columns.map((col) => (
              <TableHead key={col.key as string} className="text-[#0F172A] font-semibold">
                {col.label}
              </TableHead>
            ))}
            {actions && <TableHead className="text-[#0F172A] font-semibold">Acciones</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="hover:bg-[#F8FAFC]/50">
              {columns.map((col) => (
                <TableCell key={col.key as string} className="text-[#475569]">
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </TableCell>
              ))}
              {actions && <TableCell>{actions(item)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}