import type { Vacancy } from "../entities/vacancy";

export interface VacancyRepository {
  findAll(): Promise<Vacancy[]>;
  findById(id: string): Promise<Vacancy | null>;
}