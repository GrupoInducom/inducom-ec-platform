import { StatCard } from "../shared/stat-card";
import { Briefcase, Users, FileText, TrendingUp } from "lucide-react";

interface DashboardViewProps {
  role: "admin" | "rrhh" | "revisoria" | "candidato";
}

export function DashboardView({ role }: DashboardViewProps) {
  const stats = {
    candidato: [
      { title: "Vacantes Activas", value: 5, icon: Briefcase, color: "blue" as const },
      { title: "Postulaciones Pendientes", value: 2, icon: FileText, color: "orange" as const },
      { title: "Pruebas Completadas", value: 1, icon: TrendingUp, color: "blue" as const },
    ],
    rrhh: [
      { title: "Vacantes Publicadas", value: 12, icon: Briefcase, color: "blue" as const },
      { title: "Candidatos Totales", value: 45, icon: Users, color: "orange" as const },
      { title: "Postulaciones Hoy", value: 8, icon: FileText, color: "blue" as const },
    ],
    revisoria: [
      { title: "En Revisión", value: 15, icon: FileText, color: "orange" as const },
      { title: "Aprobados Esta Semana", value: 7, icon: TrendingUp, color: "blue" as const },
      { title: "Rechazados", value: 3, icon: Users, color: "blue" as const },
    ],
    admin: [
      { title: "Usuarios Activos", value: 120, icon: Users, color: "blue" as const },
      { title: "Vacantes Totales", value: 25, icon: Briefcase, color: "orange" as const },
      { title: "Reportes Generados", value: 10, icon: FileText, color: "blue" as const },
    ],
  };

  const currentStats = stats[role];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Dashboard</h1>
        <p className="text-[#475569]">Bienvenido a tu panel de control</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Aquí se pueden agregar secciones adicionales como listas recientes, gráficos, etc. */}
    </div>
  );
}