import type { VacancyRepository } from "../../domain/repositories/vacancy-repository";
import type { VacancyListItemDto } from "../dto/vacancy-list-item.dto";

export class GetVacancies {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(): Promise<VacancyListItemDto[]> {
    const vacancies = await this.vacancyRepository.findAll();

    return vacancies.map((vacancy) => ({
      id: vacancy.id,
      title: vacancy.title,
      department: vacancy.department,
      location: vacancy.location,
      modality: vacancy.modality,
      salaryRange: `$${vacancy.salaryMin.toLocaleString()} - $${vacancy.salaryMax.toLocaleString()}`,
      status: vacancy.status,
      publishedAt: new Date(vacancy.publishedAt).toLocaleDateString("es-EC"),
    }));
  }
}