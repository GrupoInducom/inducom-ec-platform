"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { type DateRange } from "react-day-picker";
import {
  ChevronDown,
  Eye,
  FileText,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  UserCircle2,
} from "lucide-react";

import { DatePickerWithRange } from "@/components/ui/date-picker-range";

type EstadoProceso =
  | "borrador"
  | "publicado"
  | "pausado"
  | "cerrado"
  | "cancelado";

type SelectionProcess = {
  id: string;
  tituloVacante: string;
  estado: EstadoProceso;
  responsableSeleccionNombre: string;
  totalCandidatos: number;
  etapaResumen: string;
  fechaInicio: string;
};

const PROCESSES: SelectionProcess[] = [
  {
    id: "proc-001",
    tituloVacante: "Desarrollador Full Stack Senior",
    estado: "publicado",
    responsableSeleccionNombre: "Ana García",
    totalCandidatos: 23,
    etapaResumen: "Evaluación Técnica",
    fechaInicio: "2026-04-01",
  },
  {
    id: "proc-002",
    tituloVacante: "Diseñador UI/UX",
    estado: "publicado",
    responsableSeleccionNombre: "Ana García",
    totalCandidatos: 9,
    etapaResumen: "Entrevista",
    fechaInicio: "2026-04-02",
  },
  {
    id: "proc-003",
    tituloVacante: "Analista de Datos",
    estado: "pausado",
    responsableSeleccionNombre: "Ana García",
    totalCandidatos: 16,
    etapaResumen: "Nuevos",
    fechaInicio: "2026-04-04",
  },
  {
    id: "proc-004",
    tituloVacante: "Asistente de RRHH",
    estado: "cerrado",
    responsableSeleccionNombre: "Ana García",
    totalCandidatos: 5,
    etapaResumen: "Ganadores",
    fechaInicio: "2026-03-15",
  },
];

const STATUS_TABS = [
  { label: "Todos", value: "todos" },
  { label: "Publicados", value: "publicado" },
  { label: "Pausados", value: "pausado" },
  { label: "Cerrados", value: "cerrado" },
] as const;

type StatusTabValue = (typeof STATUS_TABS)[number]["value"];

function getEstadoLabel(estado: EstadoProceso) {
  switch (estado) {
    case "borrador":
      return "Borrador";
    case "publicado":
      return "Publicado";
    case "pausado":
      return "Pausado";
    case "cerrado":
      return "Cerrado";
    case "cancelado":
      return "Cancelado";
  }
}

function getStatusClasses(estado: EstadoProceso) {
  if (estado === "publicado") {
    return "bg-[#0891A8] text-white";
  }

  if (estado === "pausado") {
    return "bg-[#F2BD42] text-[#5A3B00]";
  }

  if (estado === "cerrado") {
    return "bg-[#1FA84F] text-white";
  }

  if (estado === "borrador") {
    return "bg-slate-200 text-slate-700";
  }

  return "bg-[#F3E5E5] text-[#A44949]";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function SelectionProcessListView() {
  const [activeTab, setActiveTab] = useState<StatusTabValue>("todos");
  const [search, setSearch] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("");
  const [recruiterFilter, setRecruiterFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [openRowMenu, setOpenRowMenu] = useState<string | null>(null);
  const rowMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!rowMenuRef.current || !target) return;
      if (!rowMenuRef.current.contains(target)) {
        setOpenRowMenu(null);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filteredProcesses = useMemo(() => {
    return PROCESSES.filter((process) => {
      const matchesTab =
        activeTab === "todos" ? true : process.estado === activeTab;

      const matchesSearch =
        search.trim() === ""
          ? true
          : process.tituloVacante.toLowerCase().includes(search.toLowerCase()) ||
            process.id.toLowerCase().includes(search.toLowerCase());

      const matchesVacancy =
        vacancyFilter === "" ? true : process.tituloVacante === vacancyFilter;

      const matchesRecruiter =
        recruiterFilter === ""
          ? true
          : process.responsableSeleccionNombre === recruiterFilter;

      const matchesDate = !dateRange ? true : true;

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
            <Link href="/home" className="hover:underline">
              Dashboard
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span>Proceso de Selección</span>
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
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Título Vacante</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Responsable</th>
                  <th className="px-4 py-4">Candidatos</th>
                  <th className="px-4 py-4">Etapa Actual</th>
                  <th className="px-4 py-4">Fecha Inicio</th>
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
                      {process.tituloVacante}
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1 text-sm font-semibold ${getStatusClasses(
                          process.estado,
                        )}`}
                      >
                        {getEstadoLabel(process.estado)}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8D7D7] text-[#904E4E]">
                          <UserCircle2 className="h-7 w-7" />
                        </div>
                        <span>{process.responsableSeleccionNombre}</span>
                      </div>
                    </td>

                    <td className="px-4 py-5 align-middle">{process.totalCandidatos}</td>

                    <td className="px-4 py-5 align-middle leading-tight">
                      {process.etapaResumen}
                    </td>

                    <td className="px-4 py-5 align-middle">
                      {formatDate(process.fechaInicio)}
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
                          href={`/procesos/${process.id}/editar`}
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
                          <div
                            ref={rowMenuRef}
                            className="absolute right-0 top-12 z-20 w-[190px] rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_14px_40px_rgba(15,23,42,0.16)]"
                          >
                            <Link
                              href={`/procesos/${process.id}/candidatos`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Ver candidatos
                            </Link>

                            <Link
                              href={`/procesos/${process.id}/candidatos/nuevo`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Añadir candidato
                            </Link>

                            <Link
                              href={`/procesos/${process.id}`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Ver reporte
                            </Link>

                            <button
                              type="button"
                              className="block w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-slate-50"
                            >
                              {process.estado === "publicado"
                                ? "Pausar proceso"
                                : "Cerrar proceso"}
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
                      colSpan={8}
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
                  {Array.from(new Set(PROCESSES.map((item) => item.tituloVacante))).map(
                    (vacancy) => (
                      <option key={vacancy} value={vacancy}>
                        {vacancy}
                      </option>
                    ),
                  )}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </FilterBlock>

            <div className="border-t border-slate-200" />

            <FilterBlock title="Filtrar por Responsable">
              <div className="relative">
                <select
                  value={recruiterFilter}
                  onChange={(e) => setRecruiterFilter(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
                >
                  <option value="">Todos</option>
                  {Array.from(
                    new Set(PROCESSES.map((item) => item.responsableSeleccionNombre)),
                  ).map((responsable) => (
                    <option key={responsable} value={responsable}>
                      {responsable}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </FilterBlock>

            <div className="border-t border-slate-200" />

            <FilterBlock title="Filtrar por Rango de Fechas">
              <DatePickerWithRange
                value={dateRange}
                onChange={setDateRange}
                placeholder="Selecciona un rango"
                className="h-12"
                fieldClassName="w-full"
              />
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