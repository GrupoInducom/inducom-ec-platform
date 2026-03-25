import type { Vacancy } from "../../domain/entities/vacancy";
import { VACANCY_STATUS } from "../../domain/value-objects/vacancy-status";

export const vacanciesMock: Vacancy[] = [
  {
    id: "vac-001",
    title: "Analista de Reclutamiento",
    department: "Talento Humano",
    location: "Guayaquil",
    modality: "Hybrid",
    salaryMin: 900,
    salaryMax: 1300,
    description:
      "Buscamos un perfil con experiencia en reclutamiento, entrevistas estructuradas y gestión de vacantes.",
    requirements: [
      "2 años de experiencia en reclutamiento",
      "Manejo de ATS o CRM",
      "Excel intermedio",
      "Comunicación efectiva",
    ],
    status: VACANCY_STATUS.OPEN,
    publishedAt: "2026-03-20",
  },
  {
    id: "vac-002",
    title: "Desarrollador Full Stack",
    department: "Sistemas",
    location: "Quito",
    modality: "Remote",
    salaryMin: 1800,
    salaryMax: 2600,
    description:
      "Participará en el desarrollo de portales internos y automatizaciones integradas con Odoo, HubSpot y Supabase.",
    requirements: [
      "Experiencia con Next.js",
      "TypeScript",
      "Node.js",
      "Bases de datos SQL",
    ],
    status: VACANCY_STATUS.OPEN,
    publishedAt: "2026-03-18",
  },
  {
    id: "vac-003",
    title: "Asistente de Compras",
    department: "Administración",
    location: "Cuenca",
    modality: "Onsite",
    salaryMin: 700,
    salaryMax: 950,
    description:
      "Apoyará la gestión de requisiciones, seguimiento a órdenes y documentación administrativa del área.",
    requirements: [
      "Experiencia administrativa",
      "Orden documental",
      "Excel básico-intermedio",
    ],
    status: VACANCY_STATUS.DRAFT,
    publishedAt: "2026-03-15",
  },
];