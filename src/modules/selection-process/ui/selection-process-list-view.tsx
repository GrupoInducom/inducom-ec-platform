"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Eye,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  UserCircle2,
  FileText,
} from "lucide-react";

type ProcessStatus = "Activo" | "Pausado" | "Cerrado";

type SelectionProcess = {
  id: number;
  title: string;
  status: ProcessStatus;
  recruiter: string;
  candidates: number;
  currentStage: string;
};

const PROCESSES: SelectionProcess[] = [
  {
    id: 101,
    title: "Desarrollador Full Stack",
    status: "Activo",
    recruiter: "Ana García",
    candidates: 23,
    currentStage: "Pruebas Técnicas",
  },
  {
    id: 102,
    title: "Gerente de Ventas",
    status: "Activo",
    recruiter: "Ana García",
    candidates: 9,
    currentStage: "Pruebas Psicométricas",
  },
  {
    id: 103,
    title: "Desarrollador Full Stack",
    status: "Pausado",
    recruiter: "Ana García",
    candidates: 16,
    currentStage: "Candidatos Detallar",
  },
  {
    id: 104,
    title: "Gerente de Ventas",
    status: "Pausado",
    recruiter: "Ana García",
    candidates: 5,
    currentStage: "Pruebas Psicométricas",
  },
  {
    id: 105,
    title: "Gerente de Ventas",
    status: "Cerrado",
    recruiter: "Ana García",
    candidates: 2,
    currentStage: "Pruebas Psicométricas",
  },
];

const STATUS_TABS = [
  { label: "Todos", value: "Todos" },
  { label: "Activos", value: "Activo" },
  { label: "Pausados", value: "Pausado" },
  { label: "Completados", value: "Cerrado" },
] as const;

function getStatusClasses(status: ProcessStatus) {
  if (status === "Activo") {
    return "bg-[#0891A8] text-white";
  }

  if (status === "Pausado") {
    return "bg-[#F2BD42] text-[#5A3B00]";
  }

  return "bg-[#1FA84F] text-white";
}

export function SelectionProcessListView() {
  const [activeTab, setActiveTab] =
    useState<(typeof STATUS_TABS)[number]["value"]>("Todos");
  const [search, setSearch] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("Desarrollador Full Stack");
  const [recruiterFilter, setRecruiterFilter] = useState("Ana García");
  const [dateRange, setDateRange] = useState("");
  const [openRowMenu, setOpenRowMenu] = useState<number | null>(103);

  const filteredProcesses = useMemo(() => {
    return PROCESSES.filter((process) => {
      const matchesTab =
        activeTab === "Todos" ? true : process.status === activeTab;

      const matchesSearch =
        search.trim() === ""
          ? true
          : process.title.toLowerCase().includes(search.toLowerCase()) ||
            String(process.id).includes(search);

      const matchesVacancy =
        vacancyFilter === "" ? true : process.title === vacancyFilter;

      const matchesRecruiter =
        recruiterFilter === "" ? true : process.recruiter === recruiterFilter;

      const matchesDate = dateRange === "" ? true : true;

      return (
        matchesTab &&
        matchesSearch &&
        matchesVacancy &&
        matchesRecruiter &&
        matchesDate
      );
    });
  }, [activeTab, dateRange, recruiterFilter, search, vacancyFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <nav className="mb-2 flex items-center gap-2 text-sm text-[#2E6E77]">
            <span>Dashboard</span>
            <span className="text-slate-400">&gt;</span>
            <span>Proceso de Selección</span>
            <span className="text-slate-400">&gt;</span>
            <span>Gestión</span>
          </nav>

          <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
            Gestión de Procesos de Selección
          </h1>
        </div>

        <Link
          href="/procesos/nuevo"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
        >
          <Plus className="h-4 w-4" />
          Crear Nuevo Proceso
        </Link>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-8 border-b border-slate-300">
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`relative pb-4 text-[1.1rem] font-medium transition ${
                  isActive ? "text-slate-950" : "text-slate-700 hover:text-slate-950"
                }`}
              >
                {tab.label}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#17A9BB]" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-[300px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar proceso..."
            className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#17A9BB]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm font-semibold text-slate-800">
                  <th className="px-4 py-4">ID ↕</th>
                  <th className="px-4 py-4">Título Vacante</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Responsable</th>
                  <th className="px-4 py-4">Candidatos</th>
                  <th className="px-4 py-4">Etapa Actual</th>
                  <th className="px-4 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredProcesses.map((process) => (
                  <tr
                    key={process.id}
                    className="border-t border-slate-200 text-sm text-slate-900"
                  >
                    <td className="px-4 py-5 align-middle">{process.id}</td>

                    <td className="px-4 py-5 align-middle font-medium">
                      {process.title}
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1 text-sm font-semibold ${getStatusClasses(
                          process.status,
                        )}`}
                      >
                        {process.status}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8D7D7] text-[#904E4E]">
                          <UserCircle2 className="h-7 w-7" />
                        </div>
                        <span>{process.recruiter}</span>
                      </div>
                    </td>

                    <td className="px-4 py-5 align-middle">{process.candidates}</td>

                    <td className="px-4 py-5 align-middle leading-tight">
                      {process.currentStage}
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <div className="relative flex items-center gap-3">
                        <Link
                          href={`/procesos/${process.id}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Ver proceso"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>

                        <Link
                          href={`/procesos/${process.id}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Editar proceso"
                        >
                          <Pencil className="h-5 w-5" />
                        </Link>

                        <Link
                          href={`/procesos/${process.id}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Ver reporte"
                        >
                          <FileText className="h-5 w-5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenRowMenu((prev) =>
                              prev === process.id ? null : process.id,
                            )
                          }
                          className="rounded-lg bg-[#E6F1F3] p-2 text-slate-700 transition hover:bg-[#d7eaed]"
                          title="Más acciones"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {openRowMenu === process.id ? (
                          <div className="absolute right-0 top-12 z-20 w-[170px] rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_14px_40px_rgba(15,23,42,0.16)]">
                            <Link
                              href={`/procesos/${process.id}/candidatos`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Ver Candidatos
                            </Link>

                            <Link
                              href={`/procesos/${process.id}/candidatos`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Añadir Candidato
                            </Link>

                            <Link
                              href={`/procesos/${process.id}`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Ver Reporte
                            </Link>

                            <button
                              type="button"
                              className="block w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-slate-50"
                            >
                              {process.status === "Activo"
                                ? "Pausar Proceso"
                                : "Cerrar Proceso"}
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProcesses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-slate-500"
                    >
                      No se encontraron procesos con los filtros aplicados.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="space-y-5">
            <FilterBlock title="Filtrar por Vacante">
              <div className="relative">
                <select
                  value={vacancyFilter}
                  onChange={(e) => setVacancyFilter(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
                >
                  <option value="">Todas</option>
                  <option value="Desarrollador Full Stack">
                    Desarrollador Full Stack
                  </option>
                  <option value="Gerente de Ventas">Gerente de Ventas</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </FilterBlock>

            <div className="border-t border-slate-200" />

            <FilterBlock title="Filtrar por Reclutador">
              <div className="relative">
                <select
                  value={recruiterFilter}
                  onChange={(e) => setRecruiterFilter(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
                >
                  <option value="">Todos</option>
                  <option value="Ana García">Ana García</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </FilterBlock>

            <div className="border-t border-slate-200" />

            <FilterBlock title="Filtrar por Rango de Fechas">
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="Date picker ..."
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-10 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                />
                <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </FilterBlock>

            <button
              type="button"
              className="mt-2 h-12 w-full rounded-xl border border-[#0C7C88] bg-white text-sm font-semibold text-[#0C7C88] transition hover:bg-[#f3fbfc]"
            >
              Aplicar Filtros
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-[1.05rem] font-semibold text-slate-800"
      >
        <span>{title}</span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>
      {children}
    </div>
  );
}