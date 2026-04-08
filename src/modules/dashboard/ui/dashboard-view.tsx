import {
  BarChart3,
  BriefcaseBusiness,
  CircleUserRound,
  ClipboardClock,
  MapPin,
} from "lucide-react";

const stats = [
  {
    title: "Vacantes Activas",
    value: 18,
    subtitle: "Entrevistas: 24   Ofertas: 8",
    action: "Ver Todas",
    icon: BriefcaseBusiness,
    iconBg: "bg-[#1E5AA8]",
  },
  {
    title: "Candidatos Nuevos",
    value: 152,
    subtitle: "Total Candidatos",
    action: "Ver Detalles",
    icon: CircleUserRound,
    iconBg: "bg-[#E58A2E]",
  },
  {
    title: "Pendientes de Acción",
    value: 35,
    subtitle: "Evaluación Pendientes",
    action: "Mis Tareas",
    icon: ClipboardClock,
    iconBg: "bg-[#22A6A7]",
  },
  {
    title: "Reportes y Métricas",
    value: 5,
    subtitle: "Contratados este mes",
    action: "Abrir Reportes",
    icon: BarChart3,
    iconBg: "bg-[#2E7BC9]",
  },
];

const pipelineSummary = [
  { label: "Total Candidatos", value: 152, color: "bg-[#163E73]" },
  { label: "Entrevistas", value: 24, color: "bg-[#1E5AA8]" },
  { label: "Ofertas", value: 8, color: "bg-[#E7A43B]" },
  { label: "Contratados", value: 5, color: "bg-[#2F9E44]" },
];

const pipelineColumns = [
  {
    title: "Nuevos",
    items: [
      {
        role: "Analista de Marketing",
        tag: "Nuevo",
        location: "Ciudad de México",
        detail: "12 Postulaciones",
      },
      {
        role: "Desarrollador Backend",
        tag: "Nuevo",
        location: "Guadalajara",
        detail: "8 Postulaciones",
      },
      {
        role: "Ejecutivo de Ventas",
        tag: "Nuevo",
        location: "Monterrey",
        detail: "5 Postulaciones",
      },
    ],
  },
  {
    title: "Entrevista",
    items: [
      {
        role: "Ingeniero de Soporte",
        tag: "Entrevista",
        location: "Querétaro",
        detail: "3 en Entrevista",
      },
      {
        role: "Coordinador de RRHH",
        tag: "Entrevista",
        location: "CDMX",
        detail: "2 en Entrevista",
      },
    ],
  },
  {
    title: "Evaluación Técnica",
    items: [
      {
        role: "Full Stack Developer",
        tag: "En Proceso",
        location: "Puebla",
        detail: "4 en Prueba Técnica",
      },
      {
        role: "Diseñador UX/UI",
        tag: "En Evaluación",
        location: "León",
        detail: "3 en Prueba Técnica",
      },
    ],
  },
  {
    title: "Oferta",
    items: [
      {
        role: "Gerente de Proyecto",
        tag: "Oferta",
        location: "Tijuana",
        detail: "Oferta Enviada",
      },
      {
        role: "Contador Senior",
        tag: "Oferta Aceptada",
        location: "CDMX",
        detail: "Oferta Aceptada",
      },
    ],
  },
  {
    title: "Ganadores",
    items: [
      {
        role: "Analista Financiero",
        tag: "Ganador",
        location: "Contratado",
        detail: "",
      },
      {
        role: "Técnico en Mantenimiento",
        tag: "Ganador",
        location: "Contratado",
        detail: "",
      },
    ],
  },
];

function tagClasses(tag: string) {
  if (tag === "Nuevo") return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  if (tag === "Entrevista") return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
  if (tag === "En Proceso") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  if (tag === "En Evaluación") return "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300";
  if (tag === "Oferta") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
  if (tag === "Oferta Aceptada") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  if (tag === "Ganador") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  return "bg-muted text-muted-foreground";
}

export function DashboardView() {
  return (
    <div className="space-y-8">
      {/* KPIs */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-4 md:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-[0_6px_20px_rgba(15,23,42,0.08)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm ${stat.iconBg}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <div className="text-right">
                  <p className="text-5xl font-extrabold leading-none text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-[2rem] font-extrabold tracking-[-0.03em] text-foreground md:text-[1.9rem]">
                  {stat.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{stat.subtitle}</p>
              </div>

              <button className="mt-5 h-11 w-full rounded-xl border border-primary/20 bg-primary/10 text-sm font-semibold text-primary transition hover:bg-primary/20 dark:border-primary/30 dark:hover:bg-primary/30">
                {stat.action}
              </button>
            </article>
          );
        })}
      </section>

      {/* Pipeline */}
      <section className="space-y-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-foreground">
            Flujo Detallado de Vacantes
          </h2>
        </div>

        <div className="rounded-xl border border-border bg-card px-5 py-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {pipelineSummary.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${item.color}`} />
                <span className="font-medium text-foreground">{item.label}:</span>
                <span className="font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4 shadow-sm dark:border-border dark:bg-card">
          <div className="grid min-w-[1180px] grid-cols-5 gap-3">
            {pipelineColumns.map((column, columnIndex) => (
              <div key={column.title} className="rounded-xl bg-slate-50 dark:bg-muted/50">
                <div className="relative rounded-t-xl bg-[#144A8B] px-4 py-3 text-sm font-bold text-white">
                  {column.title}
                  {columnIndex < pipelineColumns.length - 1 ? (
                    <div className="absolute -right-[18px] top-0 h-full w-0 border-b-[24px] border-l-[18px] border-t-[24px] border-b-transparent border-l-[#144A8B] border-t-transparent" />
                  ) : null}
                </div>

                <div className="space-y-3 p-3">
                  {column.items.map((item) => (
                    <div
                      key={`${column.title}-${item.role}`}
                      className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.04)] dark:border-border dark:bg-card dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-[15px] font-bold leading-snug text-slate-900 dark:text-foreground">
                          {item.role}
                        </h4>
                        <span
                          className={`whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold ${tagClasses(
                            item.tag,
                          )}`}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.location}</span>
                      </div>

                      {item.detail ? (
                        <p className="mt-3 text-sm font-medium text-slate-700 dark:text-foreground/80">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}