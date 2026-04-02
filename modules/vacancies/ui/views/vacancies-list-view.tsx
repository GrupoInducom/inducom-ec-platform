import type { VacancyListItemDto } from "../../application/dto/vacancy-list-item.dto";
import { VacancyCard } from "../../../../components/shared/vacancy-card";
import { VacancyFilters } from "../components/vacancy-filters";
import { EmptyState } from "../../../../components/shared/empty-state";
import { Briefcase } from "lucide-react";

interface Props {
  vacancies: VacancyListItemDto[];
}

export function VacanciesListView({ vacancies }: Props) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Vacantes disponibles</h1>
        <p className="text-[#475569]">
          Explora oportunidades activas dentro de la organización.
        </p>
      </div>

      <VacancyFilters />

      {vacancies.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No hay vacantes disponibles"
          description="Actualmente no hay vacantes abiertas. Revisa más tarde o contacta al equipo de RRHH."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {vacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={{
                ...vacancy,
                salaryMin: 0,
                salaryMax: 0,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}