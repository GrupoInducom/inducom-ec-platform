import { MainShell } from "@/components/layout/main-shell";
import { GetVacancies } from "@/modules/vacancies/application/use-cases/get-vacancies";
import { VacancyRepositoryMock } from "@/modules/vacancies/infrastructure/repositories/vacancy-repository.mock";
import { VacanciesListView } from "@/modules/vacancies/ui/views/vacancies-list-view";

export default async function VacanciesPage() {
  const repository = new VacancyRepositoryMock();
  const getVacancies = new GetVacancies(repository);
  const vacancies = await getVacancies.execute();

  return (
    <MainShell>
      <VacanciesListView vacancies={vacancies} />
    </MainShell>
  );
}