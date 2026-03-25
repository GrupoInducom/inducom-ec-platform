import type { VacancyStatus } from "../value-objects/vacancy-status";

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  modality: "Onsite" | "Hybrid" | "Remote";
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  status: VacancyStatus;
  publishedAt: string;
}