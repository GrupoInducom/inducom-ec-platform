import type { VacancyRepository } from "../../domain/repositories/vacancy-repository";
import type { Vacancy } from "../../domain/entities/vacancy";

export class GetVacancyById {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(id: string): Promise<Vacancy | null> {
    if (!id) return null;
    return this.vacancyRepository.findById(id);
  }
}