import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Vacancy } from "../../domain/entities/vacancy";
import { VacancyDetailCard } from "../components/vacancy-detail-card";

interface Props {
  vacancy: Vacancy;
}

export function VacancyDetailView({ vacancy }: Props) {
  return (
    <section className="space-y-6">
      <Button asChild variant="outline" className="rounded-xl">
        <Link href="/vacancies">← Volver a vacantes</Link>
      </Button>

      <VacancyDetailCard vacancy={vacancy} />
    </section>
  );
}