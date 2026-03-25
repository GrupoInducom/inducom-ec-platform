import type { VacancyStatus } from "../../domain/value-objects/vacancy-status"

export interface CreateVacancyDto {
  title: string
  department: string
  location: string
  description: string
  status?: VacancyStatus
  modality: string
  salaryRange: string
}