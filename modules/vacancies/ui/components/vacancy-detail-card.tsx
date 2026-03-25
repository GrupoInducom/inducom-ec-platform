import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Vacancy } from "../../domain/entities/vacancy";
import { VACANCY_STATUS } from "../../domain/value-objects/vacancy-status";

interface Props {
  vacancy: Vacancy;
}

export function VacancyDetailCard({ vacancy }: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-2xl">{vacancy.title}</CardTitle>
          <Badge variant={vacancy.status === VACANCY_STATUS.OPEN ? "default" : "secondary"}>
            {vacancy.status}
          </Badge>
        </div>

        <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
          <span>{vacancy.department}</span>
          <span>•</span>
          <span>{vacancy.location}</span>
          <span>•</span>
          <span>{vacancy.modality}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Rango salarial</h3>
          <p>
            ${vacancy.salaryMin.toLocaleString()} - ${vacancy.salaryMax.toLocaleString()}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Descripción</h3>
          <p className="text-muted-foreground leading-7">{vacancy.description}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Requisitos</h3>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {vacancy.requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}