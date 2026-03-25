import { notFound } from "next/navigation";
import { MainShell } from "@/components/layout/main-shell";
import { GetVacancyById } from "@/modules/vacancies/application/use-cases/get-vacancy-by-id";
import { VacancyRepositoryMock } from "@/modules/vacancies/infrastructure/repositories/vacancy-repository.mock";
import { VacancyDetailView } from "@/modules/vacancies/ui/views/vacancy-detail-view";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VacancyDetailPage({ params }: Props) {
  const { id } = await params;

  const repository = new VacancyRepositoryMock();
  const getVacancyById = new GetVacancyById(repository);
  const vacancy = await getVacancyById.execute(id);

  if (!vacancy) notFound();

  return (
    <MainShell>
      <VacancyDetailView vacancy={vacancy} />
    </MainShell>
  );
}