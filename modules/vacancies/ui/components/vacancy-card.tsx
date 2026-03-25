import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { VacancyListItemDto } from "../../application/dto/vacancy-list-item.dto";

interface Props {
  vacancy: VacancyListItemDto;
}

export function VacancyCard({ vacancy }: Props) {
  return (
    <Card className="rounded-2xl shadow-sm border-border/60">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">{vacancy.title}</CardTitle>
          <Badge variant={vacancy.status === "open" ? "default" : "secondary"}>
            {vacancy.status}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span>{vacancy.department}</span>
          <span>•</span>
          <span>{vacancy.location}</span>
          <span>•</span>
          <span>{vacancy.modality}</span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm font-medium">{vacancy.salaryRange}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Publicada: {vacancy.publishedAt}
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild className="rounded-xl">
          <Link href={`/vacancies/${vacancy.id}`}>Ver detalle</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}