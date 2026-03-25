export const VACANCY_STATUS = {
  DRAFT: "BORRADOR",
  OPEN: "ABIERTA",
  CLOSED: "CERRADA",
} as const

export type VacancyStatus = (typeof VACANCY_STATUS)[keyof typeof VACANCY_STATUS]