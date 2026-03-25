import type { VacancyListItemDto } from "../../application/dto/vacancy-list-item.dto";
import { VacancyCard } from "../components/vacancy-card";
import { VacancyFilters } from "../components/vacancy-filters";

interface Props {
  vacancies: VacancyListItemDto[];
}

export function VacanciesListView({ vacancies }: Props) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Vacantes disponibles</h1>
        <p className="text-muted-foreground">
          Explora oportunidades activas dentro de la organización.
        </p>
      </div>

      <VacancyFilters />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    </section>
  );
}