import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "blue" | "orange";
}

export function StatCard({ title, value, icon: Icon, color = "blue" }: StatCardProps) {
  const colorClasses = {
    blue: "text-[#0B1F5F]",
    orange: "text-[#F97316]",
  };

  return (
    <Card className="bg-white border-[#E2E8F0]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#475569]">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colorClasses[color]}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
      </CardContent>
    </Card>
  );
}