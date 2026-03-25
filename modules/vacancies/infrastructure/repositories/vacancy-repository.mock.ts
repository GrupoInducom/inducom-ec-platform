import type { Vacancy } from "../../domain/entities/vacancy";
import type { VacancyRepository } from "../../domain/repositories/vacancy-repository";
import { vacanciesMock } from "../data/vacancies.mock";

export class VacancyRepositoryMock implements VacancyRepository {
  async findAll(): Promise<Vacancy[]> {
    return vacanciesMock;
  }

  async findById(id: string): Promise<Vacancy | null> {
    const vacancy = vacanciesMock.find((item) => item.id === id);
    return vacancy ?? null;
  }
}