export const ROLES = {
  ADMIN: "admin",
  RRHH: "rrhh",
  CANDIDATO: "candidato",
  REVISORIA: "revisoria",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];