import Link from "next/link";
import {
  BriefcaseBusiness,
  ChartColumnBig,
  ClipboardList,
  LifeBuoy,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const quickAccess = [
  {
    title: "VACANTES",
    description: "Explorar posiciones abiertas",
    href: "/vacancies",
    icon: BriefcaseBusiness,
  },
  {
    title: "CANDIDATOS\nNUEVOS",
    description: "Ver perfiles recién registrados",
    href: "/candidates",
    icon: Users,
  },
  {
    title: "EVALUACIONES\nPENDIENTES",
    description: "Revisar pendientes de calificación",
    href: "/test",
    icon: ClipboardList,
  },
  {
    title: "REPORTES",
    description: "Generar y visualizar informes analíticos",
    href: "/reports",
    icon: ChartColumnBig,
  },
  {
    title: "CONFIGURACIÓN",
    description: "Ajustes del portal y permisos",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "SOPORTE",
    description: "Ayuda técnica y recursos",
    href: "/support",
    icon: LifeBuoy,
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fc] text-slate-900">
      <Decorations />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-10">
        <header className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5b84c4]/15 text-[#4f78b8] shadow-sm">
              <span className="text-xl font-bold">S</span>
            </div>

            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Soluciones de
              </p>
              <h1 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                Recursos Humanos
              </h1>
            </div>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-12 lg:py-16">
          <div className="w-full text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-[#14213d] md:text-5xl">
              Búsqueda unificada
            </h2>

            <div className="mx-auto mt-8 max-w-3xl">
              <div className="group flex h-16 items-center rounded-full border-2 border-[#5f89c7] bg-white px-5 shadow-[0_10px_30px_rgba(91,132,196,0.20)] transition focus-within:shadow-[0_12px_36px_rgba(91,132,196,0.26)]">
                <Search className="mr-3 h-6 w-6 text-slate-400" />
                <Input
                  placeholder="Buscar candidatos, vacantes, reportes..."
                  className="h-full border-0 bg-transparent px-0 text-lg text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">
            {quickAccess.map((item) => (
              <QuickAccessCard key={item.title} {...item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

type QuickAccessCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

function QuickAccessCard({ title, description, href, icon: Icon }: QuickAccessCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full rounded-[20px] border border-slate-200 bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(79,120,184,0.16)]">
        <CardContent className="flex min-h-[132px] items-center gap-5 p-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e9f0fb] text-[#4f78b8] transition group-hover:scale-105 group-hover:bg-[#dce8fa]">
            <Icon className="h-9 w-9" />
          </div>

          <div className="min-w-0">
            <h3 className="whitespace-pre-line text-[1.08rem] font-extrabold leading-5 tracking-tight text-slate-900">
              {title}
            </h3>
            <p className="mt-2 max-w-[18rem] text-[0.98rem] leading-5 text-slate-600">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function Decorations() {
  return (
    <>
      <div className="absolute left-0 top-[60%] h-72 w-72 -translate-x-1/2 rounded-full bg-[#7ba3e0]/35 blur-[2px]" />
      <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/4 rounded-full bg-[#7ba3e0]/35" />

      <div className="absolute left-[-40px] top-[56%] h-52 w-52 rounded-full border border-[#7ba3e0]/45" />
      <div className="absolute bottom-12 left-14 h-3 w-3 rounded-full bg-[#7ba3e0]/70" />
      <div className="absolute bottom-20 left-24 h-32 w-32 rounded-full border border-[#7ba3e0]/35" />

      <div className="absolute right-[9%] top-[13%] hidden lg:block">
        <div className="relative h-36 w-56">
          <div className="absolute right-0 top-1 h-1 w-10 rounded-full bg-[#7ba3e0]" />
          <div className="absolute right-0 top-7 h-1 w-16 rounded-full bg-[#bfd2ef]" />
          <div className="absolute left-8 top-12 h-10 w-[1px] rotate-45 bg-[#c7d7ef]" />
          <div className="absolute left-20 top-14 h-2.5 w-2.5 rounded-full bg-[#7ba3e0]" />
          <div className="absolute left-28 top-8 h-[1px] w-16 bg-[#c7d7ef]" />
          <div className="absolute left-28 top-8 h-16 w-[1px] bg-[#c7d7ef]" />
          <div className="absolute left-[5.8rem] top-[4.3rem] h-[1px] w-14 bg-[#7ba3e0]" />
          <div className="absolute left-[9.15rem] top-[4.25rem] h-2.5 w-2.5 rounded-full bg-[#4f78b8]" />
          <div className="absolute left-[11.2rem] top-[3rem] h-[1px] w-12 bg-[#7ba3e0]" />
          <div className="absolute left-[14rem] top-[2.35rem] flex h-11 items-end gap-1">
            <span className="block h-3 w-2 rounded-sm bg-[#8fb1e3]" />
            <span className="block h-6 w-2 rounded-sm bg-[#5f89c7]" />
            <span className="block h-9 w-2 rounded-sm bg-[#4f78b8]" />
          </div>
          <div className="absolute left-[12rem] top-[5.5rem] h-3 w-3 rounded-full bg-[#bfd2ef]" />
          <div className="absolute left-[14rem] top-[5.45rem] h-1 w-8 rounded-full bg-[#c7d7ef]" />
        </div>
      </div>

      <div className="absolute right-0 top-12 hidden h-52 w-52 rounded-bl-[120px] border border-[#7ba3e0]/30 lg:block" />
    </>
  );
}