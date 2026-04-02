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
  if (tag === "Nuevo") return "bg-[#EAF2FF] text-[#2457A6]";
  if (tag === "Entrevista") return "bg-[#FFF3E6] text-[#C46A00]";
  if (tag === "En Proceso") return "bg-[#E8F8EF] text-[#1F8F57]";
  if (tag === "En Evaluación") return "bg-[#E7F7F7] text-[#1D8D8D]";
  if (tag === "Oferta") return "bg-[#FFF4D8] text-[#B7791F]";
  if (tag === "Oferta Aceptada") return "bg-[#E7F8EA] text-[#2F9E44]";
  if (tag === "Ganador") return "bg-[#EAF8EC] text-[#2F9E44]";
  return "bg-slate-100 text-slate-700";
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
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm ${stat.iconBg}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <div className="text-right">
                  <p className="text-5xl font-extrabold leading-none text-slate-900">
                    {stat.value}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-[2rem] font-extrabold tracking-[-0.03em] text-slate-900 md:text-[1.9rem]">
                  {stat.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{stat.subtitle}</p>
              </div>

              <button className="mt-5 h-11 w-full rounded-xl border border-[#AFC5DF] bg-[#EAF2FB] text-sm font-semibold text-[#163E73] transition hover:bg-[#dfeaf7]">
                {stat.action}
              </button>
            </article>
          );
        })}
      </section>

      {/* Pipeline */}
      <section className="space-y-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-slate-950">
            Flujo Detallado de Vacantes
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-700">
            {pipelineSummary.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${item.color}`} />
                <span className="font-medium">{item.label}:</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid min-w-[1180px] grid-cols-5 gap-3">
            {pipelineColumns.map((column, columnIndex) => (
              <div key={column.title} className="rounded-xl bg-slate-50">
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
                      className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-[15px] font-bold leading-snug text-slate-900">
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

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.location}</span>
                      </div>

                      {item.detail ? (
                        <p className="mt-3 text-sm font-medium text-slate-700">
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