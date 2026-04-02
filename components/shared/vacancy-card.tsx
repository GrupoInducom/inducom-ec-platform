import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapPin, Clock, DollarSign } from "lucide-react";

interface VacancyCardProps {
  vacancy: {
    id: string;
    title: string;
    department: string;
    location: string;
    modality: string;
    salaryMin: number;
    salaryMax: number;
    status: string;
    publishedAt: string;
  };
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const statusColor = {
    Active: "bg-green-100 text-green-800",
    Closed: "bg-red-100 text-red-800",
    Draft: "bg-yellow-100 text-yellow-800",
  }[vacancy.status] || "bg-gray-100 text-gray-800";

  return (
    <Card className="bg-white border-[#E2E8F0] hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-[#0F172A]">{vacancy.title}</CardTitle>
          <Badge className={statusColor}>{vacancy.status}</Badge>
        </div>
        <p className="text-sm text-[#475569]">{vacancy.department}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-[#475569]">
          <MapPin size={16} />
          {vacancy.location} • {vacancy.modality}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#475569]">
          <DollarSign size={16} />
          ${vacancy.salaryMin.toLocaleString()} - ${vacancy.salaryMax.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#475569]">
          <Clock size={16} />
          Publicado: {new Date(vacancy.publishedAt).toLocaleDateString()}
        </div>
        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/vacancies/${vacancy.id}`}>Ver Detalle</Link>
          </Button>
          <Button asChild size="sm" className="bg-[#0B1F5F] hover:bg-[#08143D] text-white">
            <Link href={`/vacancies/${vacancy.id}/apply`}>Postularme</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}