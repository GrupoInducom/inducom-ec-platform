"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  Eye,
  FileText,
  Search,
  UserCircle2,
} from "lucide-react";

type AssignmentStatus =
  | "asignada"
  | "en_curso"
  | "completada"
  | "vencida"
  | "cancelada";

type EvaluationResultRow = {
  postulacionEvaluacionId: string;
  postulacionId: string;
  candidatoId: string;
  candidatoNombre: string;
  evaluacionTitulo: string;
  procesoTitulo: string;
  puntajeObtenido: number | null;
  puntajeMaximo: number;
  puntajeMinimoAprobacion: number;
  tiempoUsadoSegundos: number | null;
  estado: AssignmentStatus;
  aprobada: boolean | null;
  fechaFinalizacion: string | null;
};

const RESULTS: EvaluationResultRow[] = [
  {
    postulacionEvaluacionId: "pe-001",
    postulacionId: "post-001",
    candidatoId: "cand-001",
    candidatoNombre: "Ana García",
    evaluacionTitulo: "Prueba de React Senior",
    procesoTitulo: "Desarrollador Full Stack Senior",
    puntajeObtenido: 85,
    puntajeMaximo: 100,
    puntajeMinimoAprobacion: 70,
    tiempoUsadoSegundos: 2450,
    estado: "completada",
    aprobada: true,
    fechaFinalizacion: "15 nov 2023",
  },
  {
    postulacionEvaluacionId: "pe-002",
    postulacionId: "post-002",
    candidatoId: "cand-002",
    candidatoNombre: "Carlos Ruiz",
    evaluacionTitulo: "Evaluación Psicométrica",
    procesoTitulo: "Desarrollador Full Stack Senior",
    puntajeObtenido: 72,
    puntajeMaximo: 100,
    puntajeMinimoAprobacion: 70,
    tiempoUsadoSegundos: 1800,
    estado: "completada",
    aprobada: true,
    fechaFinalizacion: "14 nov 2023",
  },
  {
    postulacionEvaluacionId: "pe-003",
    postulacionId: "post-003",
    candidatoId: "cand-003",
    candidatoNombre: "Luis Mendoza",
    evaluacionTitulo: "Prueba de SQL",
    procesoTitulo: "Desarrollador Full Stack Senior",
    puntajeObtenido: 68,
    puntajeMaximo: 100,
    puntajeMinimoAprobacion: 70,
    tiempoUsadoSegundos: 2100,
    estado: "completada",
    aprobada: false,
    fechaFinalizacion: "13 nov 2023",
  },
  {
    postulacionEvaluacionId: "pe-004",
    postulacionId: "post-004",
    candidatoId: "cand-004",
    candidatoNombre: "María Vargas",
    evaluacionTitulo: "Prueba de Node.js",
    procesoTitulo: "Gerente de Ventas",
    puntajeObtenido: null,
    puntajeMaximo: 100,
    puntajeMinimoAprobacion: 70,
    tiempoUsadoSegundos: null,
    estado: "en_curso",
    aprobada: null,
    fechaFinalizacion: null,
  },
  {
    postulacionEvaluacionId: "pe-005",
    postulacionId: "post-005",
    candidatoId: "cand-005",
    candidatoNombre: "Diego Cruz",
    evaluacionTitulo: "Test de Habilidades Interpersonales",
    procesoTitulo: "Gerente de Ventas",
    puntajeObtenido: null,
    puntajeMaximo: 100,
    puntajeMinimoAprobacion: 70,
    tiempoUsadoSegundos: null,
    estado: "asignada",
    aprobada: null,
    fechaFinalizacion: null,
  },
];

function statusLabel(status: AssignmentStatus) {
  const map: Record<AssignmentStatus, string> = {
    asignada: "Asignada",
    en_curso: "En curso",
    completada: "Completada",
    vencida: "Vencida",
    cancelada: "Cancelada",
  };

  return map[status];
}

function statusBadgeClasses(status: AssignmentStatus) {
  if (status === "completada") return "bg-[#0B8A8C] text-white";
  if (status === "en_curso") return "bg-[#F2BD42] text-[#5A3B00]";
  if (status === "asignada") return "bg-[#DDF1F7] text-[#2A6D90]";
  if (status === "vencida") return "bg-[#FDEBEC] text-[#B54747]";
  return "bg-slate-200 text-slate-700";
}

function approvalBadgeClasses(approved: boolean | null) {
  if (approved === true) return "bg-[#16A34A] text-white";
  if (approved === false) return "bg-[#B54747] text-white";
  return "bg-slate-200 text-slate-700";
}

function approvalLabel(approved: boolean | null) {
  if (approved === true) return "Aprobado";
  if (approved === false) return "Reprobado";
  return "Pendiente";
}

function formatTime(seconds: number | null) {
  if (seconds === null) return "-";
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining}s`;
}

export function EvaluationResultsView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus | "">("");
  const [approvalFilter, setApprovalFilter] = useState<
    "aprobado" | "reprobado" | "pendiente" | ""
  >("");
  const [processFilter, setProcessFilter] = useState("");

  const rows = useMemo(() => {
    return RESULTS.filter((row) => {
      const matchesSearch =
        search.trim() === ""
          ? true
          : row.candidatoNombre.toLowerCase().includes(search.toLowerCase()) ||
            row.evaluacionTitulo.toLowerCase().includes(search.toLowerCase()) ||
            row.procesoTitulo.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "" ? true : row.estado === statusFilter;

      const matchesApproval =
        approvalFilter === ""
          ? true
          : approvalFilter === "aprobado"
          ? row.aprobada === true
          : approvalFilter === "reprobado"
          ? row.aprobada === false
          : row.aprobada === null;

      const matchesProcess =
        processFilter === "" ? true : row.procesoTitulo === processFilter;

      return matchesSearch && matchesStatus && matchesApproval && matchesProcess;
    });
  }, [search, statusFilter, approvalFilter, processFilter]);

  return (
    <div className="space-y-6">
      <div>
        <nav className="mb-2 flex items-center gap-2 text-sm text-[#2E6E77]">
          <span>Dashboard</span>
          <span className="text-slate-400">&gt;</span>
          <span>Evaluaciones</span>
          <span className="text-slate-400">&gt;</span>
          <span>Resultados</span>
        </nav>

        <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
          Resultados de Evaluaciones
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-sm font-semibold text-slate-800">
                  <th className="px-4 py-4">Candidato ↕</th>
                  <th className="px-4 py-4">Evaluación</th>
                  <th className="px-4 py-4">Vacante / Proceso</th>
                  <th className="px-4 py-4">Score</th>
                  <th className="px-4 py-4">Tiempo Usado</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Resultado</th>
                  <th className="px-4 py-4">Finalización</th>
                  <th className="px-4 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.postulacionEvaluacionId}
                    className="border-t border-slate-200 text-sm text-slate-900"
                  >
                    <td className="px-4 py-5 align-top">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8D7D7] text-[#904E4E]">
                          <UserCircle2 className="h-8 w-8" />
                        </div>
                        <span className="font-medium">{row.candidatoNombre}</span>
                      </div>
                    </td>

                    <td className="px-4 py-5 align-top">
                      <div className="max-w-[180px] leading-tight">
                        {row.evaluacionTitulo}
                      </div>
                    </td>

                    <td className="px-4 py-5 align-top">
                      <div className="max-w-[220px] leading-tight">
                        {row.procesoTitulo}
                      </div>
                    </td>

                    <td className="px-4 py-5 align-top">
                      {row.puntajeObtenido !== null ? (
                        <span
                          className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${
                            row.puntajeObtenido >= row.puntajeMinimoAprobacion
                              ? "bg-[#16A34A] text-white"
                              : "bg-[#F59E0B] text-white"
                          }`}
                        >
                          {row.puntajeObtenido}/{row.puntajeMaximo}
                        </span>
                      ) : (
                        <span className="inline-flex rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700">
                          -
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-5 align-top">{formatTime(row.tiempoUsadoSegundos)}</td>

                    <td className="px-4 py-5 align-top">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${statusBadgeClasses(
                          row.estado,
                        )}`}
                      >
                        {statusLabel(row.estado)}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-top">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${approvalBadgeClasses(
                          row.aprobada,
                        )}`}
                      >
                        {approvalLabel(row.aprobada)}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-top">
                      {row.fechaFinalizacion ?? "-"}
                    </td>

                    <td className="px-4 py-5 align-top">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/evaluaciones/resultados/${row.postulacionEvaluacionId}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Ver detalle"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>

                        <Link
                          href={`/procesos/101/candidatos/${row.postulacionId}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Ver postulación"
                        >
                          <FileText className="h-5 w-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-12 text-center text-sm text-slate-500"
                    >
                      No se encontraron resultados con los filtros aplicados.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar resultado..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#17A9BB]"
            />
          </div>

          <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <h3 className="text-[1.8rem] font-bold tracking-[-0.03em] text-slate-950">
              Filtrar por
            </h3>

            <div className="mt-5 space-y-5">
              <FilterSelect
                label="Estado"
                value={statusFilter}
                onChange={(value) => setStatusFilter(value as AssignmentStatus | "")}
                options={[
                  { value: "", label: "Todos" },
                  { value: "asignada", label: "Asignada" },
                  { value: "en_curso", label: "En curso" },
                  { value: "completada", label: "Completada" },
                  { value: "vencida", label: "Vencida" },
                  { value: "cancelada", label: "Cancelada" },
                ]}
              />

              <div className="border-t border-slate-200" />

              <FilterSelect
                label="Resultado"
                value={approvalFilter}
                onChange={(value) =>
                  setApprovalFilter(value as "aprobado" | "reprobado" | "pendiente" | "")
                }
                options={[
                  { value: "", label: "Todos" },
                  { value: "aprobado", label: "Aprobado" },
                  { value: "reprobado", label: "Reprobado" },
                  { value: "pendiente", label: "Pendiente" },
                ]}
              />

              <div className="border-t border-slate-200" />

              <FilterSelect
                label="Vacante"
                value={processFilter}
                onChange={setProcessFilter}
                options={[
                  { value: "", label: "Todas" },
                  {
                    value: "Desarrollador Full Stack Senior",
                    label: "Desarrollador Full Stack Senior",
                  },
                  { value: "Gerente de Ventas", label: "Gerente de Ventas" },
                ]}
              />

              <button
                type="button"
                className="mt-2 h-12 w-full rounded-xl border border-[#0C7C88] bg-white text-sm font-semibold text-[#0C7C88] transition hover:bg-[#f3fbfc]"
              >
                Aplicar Filtros
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-[1.05rem] font-semibold text-slate-800"
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
        >
          {options.map((option) => (
            <option key={`${label}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
}