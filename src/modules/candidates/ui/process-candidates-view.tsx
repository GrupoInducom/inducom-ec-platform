"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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

type EtapaFlujo =
  | "nuevos"
  | "entrevista"
  | "evaluacion_tecnica"
  | "oferta"
  | "ganadores";

type EstadoPostulacion =
  | "registrada"
  | "en_revision"
  | "en_evaluacion"
  | "en_entrevista"
  | "en_revisoria"
  | "en_oferta"
  | "ganadora"
  | "rechazada"
  | "retirada";

type EstadoAsignacionEvaluacion =
  | "asignada"
  | "en_curso"
  | "completada"
  | "vencida"
  | "cancelada";

type ProcesoOption = {
  id: string;
  tituloVacante: string;
};

type CandidateRow = {
  postulacionId: string;
  candidatoId: string;
  procesoId: string;
  tituloVacante: string;
  nombreCompleto: string;
  correo: string;
  telefono: string | null;
  cargoActual: string | null;
  etapaFlujoActual: EtapaFlujo;
  estadoPostulacion: EstadoPostulacion;
  tituloEvaluacionAsignada: string | null;
  estadoEvaluacion: EstadoAsignacionEvaluacion | null;
  puntajeFinal: number | null;
  fechaPostulacion: string;
};

type ProcessCandidatesViewProps = {
  initialProcesoId?: string;
};

const PROCESOS_OPTIONS: ProcesoOption[] = [
  { id: "proc-001", tituloVacante: "Desarrollador Full Stack Senior" },
  { id: "proc-002", tituloVacante: "Diseñador UI/UX" },
  { id: "proc-003", tituloVacante: "Analista de Datos" },
];

const CANDIDATE_ROWS: CandidateRow[] = [
  {
    postulacionId: "post-001",
    candidatoId: "cand-001",
    procesoId: "proc-001",
    tituloVacante: "Desarrollador Full Stack Senior",
    nombreCompleto: "Ana García",
    correo: "ana.garcia@mail.com",
    telefono: "+593999111111",
    cargoActual: "Frontend Developer",
    etapaFlujoActual: "entrevista",
    estadoPostulacion: "en_entrevista",
    tituloEvaluacionAsignada: "Prueba React Senior",
    estadoEvaluacion: "completada",
    puntajeFinal: 85,
    fechaPostulacion: "2026-04-01T10:30:00.000Z",
  },
  {
    postulacionId: "post-002",
    candidatoId: "cand-002",
    procesoId: "proc-001",
    tituloVacante: "Desarrollador Full Stack Senior",
    nombreCompleto: "Carlos Ruiz",
    correo: "carlos.ruiz@mail.com",
    telefono: "+593999222222",
    cargoActual: "Full Stack Developer",
    etapaFlujoActual: "evaluacion_tecnica",
    estadoPostulacion: "en_evaluacion",
    tituloEvaluacionAsignada: "Prueba Node.js",
    estadoEvaluacion: "en_curso",
    puntajeFinal: 72,
    fechaPostulacion: "2026-04-02T14:00:00.000Z",
  },
  {
    postulacionId: "post-003",
    candidatoId: "cand-003",
    procesoId: "proc-002",
    tituloVacante: "Diseñador UI/UX",
    nombreCompleto: "María Vargas",
    correo: "maria.vargas@mail.com",
    telefono: "+593999333333",
    cargoActual: "Product Designer",
    etapaFlujoActual: "nuevos",
    estadoPostulacion: "en_revision",
    tituloEvaluacionAsignada: null,
    estadoEvaluacion: null,
    puntajeFinal: null,
    fechaPostulacion: "2026-04-03T09:15:00.000Z",
  },
  {
    postulacionId: "post-004",
    candidatoId: "cand-004",
    procesoId: "proc-003",
    tituloVacante: "Analista de Datos",
    nombreCompleto: "Luis Mendoza",
    correo: "luis.mendoza@mail.com",
    telefono: "+593999444444",
    cargoActual: "BI Analyst",
    etapaFlujoActual: "oferta",
    estadoPostulacion: "en_oferta",
    tituloEvaluacionAsignada: "Caso Técnico SQL",
    estadoEvaluacion: "completada",
    puntajeFinal: 68,
    fechaPostulacion: "2026-04-04T11:45:00.000Z",
  },
  {
    postulacionId: "post-005",
    candidatoId: "cand-005",
    procesoId: "proc-003",
    tituloVacante: "Analista de Datos",
    nombreCompleto: "Diego Cruz",
    correo: "diego.cruz@mail.com",
    telefono: "+593999555555",
    cargoActual: "Data Analyst",
    etapaFlujoActual: "ganadores",
    estadoPostulacion: "ganadora",
    tituloEvaluacionAsignada: "Caso Técnico SQL",
    estadoEvaluacion: "completada",
    puntajeFinal: 91,
    fechaPostulacion: "2026-04-05T16:20:00.000Z",
  },
];

function etapaLabel(etapa: EtapaFlujo) {
  if (etapa === "nuevos") return "Nuevos";
  if (etapa === "entrevista") return "Entrevista";
  if (etapa === "evaluacion_tecnica") return "Evaluación Técnica";
  if (etapa === "oferta") return "Oferta";
  return "Ganadores";
}

function estadoLabel(estado: EstadoPostulacion) {
  const map: Record<EstadoPostulacion, string> = {
    registrada: "Registrada",
    en_revision: "En revisión",
    en_evaluacion: "En evaluación",
    en_entrevista: "En entrevista",
    en_revisoria: "En revisoría",
    en_oferta: "En oferta",
    ganadora: "Ganadora",
    rechazada: "Rechazada",
    retirada: "Retirada",
  };

  return map[estado];
}

function estadoBadgeClasses(estado: EstadoPostulacion) {
  if (estado === "registrada" || estado === "en_revision") {
    return "bg-[#F2BD42] text-[#5A3B00]";
  }

  if (
    estado === "en_evaluacion" ||
    estado === "en_entrevista" ||
    estado === "en_revisoria" ||
    estado === "en_oferta"
  ) {
    return "bg-[#0891A8] text-white";
  }

  if (estado === "ganadora") {
    return "bg-[#16A34A] text-white";
  }

  return "bg-[#F3E5E5] text-[#A44949]";
}

function evaluationBadgeClasses(title: string | null) {
  if (!title) return "bg-slate-200 text-slate-600";
  return "bg-[#0A8C95] text-white";
}

function scoreBadgeClasses(score: number | null) {
  if (score === null) return "bg-slate-200 text-slate-600";
  if (score >= 70) return "bg-[#16A34A] text-white";
  return "bg-[#F2BD42] text-[#5A3B00]";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function ProcessCandidatesView({
  initialProcesoId = "",
}: ProcessCandidatesViewProps) {
  const [search, setSearch] = useState("");
  const [procesoFilter, setProcesoFilter] = useState(initialProcesoId);
  const [stageFilter, setStageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [openRowMenu, setOpenRowMenu] = useState<string | null>(null);

  const rows = useMemo(() => {
    return CANDIDATE_ROWS.filter((row) => {
      const matchesSearch =
        search.trim() === ""
          ? true
          : row.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
            row.tituloVacante.toLowerCase().includes(search.toLowerCase()) ||
            row.correo.toLowerCase().includes(search.toLowerCase());

      const matchesProceso =
        procesoFilter === "" ? true : row.procesoId === procesoFilter;

      const matchesStage =
        stageFilter === "" ? true : etapaLabel(row.etapaFlujoActual) === stageFilter;

      const matchesStatus =
        statusFilter === "" ? true : estadoLabel(row.estadoPostulacion) === statusFilter;

      const matchesResult =
        resultFilter === ""
          ? true
          : resultFilter === ">= 70"
            ? (row.puntajeFinal ?? -1) >= 70
            : resultFilter === "< 70"
              ? row.puntajeFinal !== null && row.puntajeFinal < 70
              : resultFilter === "Sin score"
                ? row.puntajeFinal === null
                : true;

      return (
        matchesSearch &&
        matchesProceso &&
        matchesStage &&
        matchesStatus &&
        matchesResult
      );
    });
  }, [search, procesoFilter, stageFilter, statusFilter, resultFilter]);

  const procesoSeleccionado = PROCESOS_OPTIONS.find(
    (proceso) => proceso.id === procesoFilter,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <nav className="mb-2 flex items-center gap-2 text-sm text-[#2E6E77]">
            <Link href="/home" className="hover:underline">
              Dashboard
            </Link>
            <span className="text-slate-400">&gt;</span>
            <Link href="/procesos" className="hover:underline">
              Proceso de Selección
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span>Candidatos</span>
          </nav>

          <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
            {procesoSeleccionado
              ? `Candidatos — ${procesoSeleccionado.tituloVacante}`
              : "Gestión Global de Candidatos"}
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            {procesoSeleccionado
              ? "Vista filtrada por el proceso seleccionado."
              : "Vista general de candidatos con filtro por vacante."}
          </p>
        </div>

        <Link
          href={
            procesoFilter
              ? `/procesos/${procesoFilter}/candidatos/nuevo`
              : "/procesos/candidatos/nuevo"
          }
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
        >
          <Plus className="h-4 w-4" />
          Agregar Candidato
        </Link>
      </div>

      <section className="space-y-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(260px,1.2fr)_minmax(240px,1fr)_220px_220px_220px]">
          <div>
            <p className="text-[1.45rem] font-bold tracking-[-0.03em] text-slate-950">
              Candidatos ({rows.length})
            </p>

            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar candidato, correo o vacante..."
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#17A9BB]"
              />
            </div>
          </div>

          <FilterSelect
            label="Filtrar por Vacante"
            value={procesoFilter}
            onChange={setProcesoFilter}
            placeholder="Todas las vacantes"
            options={PROCESOS_OPTIONS.map((proceso) => ({
              value: proceso.id,
              label: proceso.tituloVacante,
            }))}
            disabled={Boolean(initialProcesoId)}
          />

          <FilterSelect
            label="Filtrar por Etapa"
            value={stageFilter}
            onChange={setStageFilter}
            placeholder="Todas"
            options={[
              { value: "Nuevos", label: "Nuevos" },
              { value: "Entrevista", label: "Entrevista" },
              { value: "Evaluación Técnica", label: "Evaluación Técnica" },
              { value: "Oferta", label: "Oferta" },
              { value: "Ganadores", label: "Ganadores" },
            ]}
          />

          <FilterSelect
            label="Filtrar por Estado"
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Todos"
            options={[
              { value: "Registrada", label: "Registrada" },
              { value: "En revisión", label: "En revisión" },
              { value: "En evaluación", label: "En evaluación" },
              { value: "En entrevista", label: "En entrevista" },
              { value: "En revisoría", label: "En revisoría" },
              { value: "En oferta", label: "En oferta" },
              { value: "Ganadora", label: "Ganadora" },
              { value: "Rechazada", label: "Rechazada" },
              { value: "Retirada", label: "Retirada" },
            ]}
          />

          <FilterSelect
            label="Filtrar por Resultado"
            value={resultFilter}
            onChange={setResultFilter}
            placeholder="Todos"
            options={[
              { value: ">= 70", label: ">= 70" },
              { value: "< 70", label: "< 70" },
              { value: "Sin score", label: "Sin score" },
            ]}
          />
        </div>

        <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-sm font-semibold text-slate-800">
                  <th className="px-4 py-4">Candidato</th>
                  <th className="px-4 py-4">Vacante</th>
                  <th className="px-4 py-4">Etapa Actual</th>
                  <th className="px-4 py-4">Evaluación Asignada</th>
                  <th className="px-4 py-4">Score</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Fecha Postulación</th>
                  <th className="px-4 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.postulacionId}
                    className="border-t border-slate-200 text-sm text-slate-900"
                  >
                    <td className="px-4 py-5 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8D7D7] text-[#904E4E]">
                          <UserCircle2 className="h-8 w-8" />
                        </div>

                        <div>
                          <p className="font-medium">{row.nombreCompleto}</p>
                          <p className="text-xs text-slate-500">{row.correo}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-5 align-middle">{row.tituloVacante}</td>

                    <td className="px-4 py-5 align-middle">
                      {etapaLabel(row.etapaFlujoActual)}
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${evaluationBadgeClasses(
                          row.tituloEvaluacionAsignada,
                        )}`}
                      >
                        {row.tituloEvaluacionAsignada ?? "Sin asignación"}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <span
                        className={`inline-flex min-w-[52px] justify-center rounded-lg px-3 py-1.5 text-sm font-bold ${scoreBadgeClasses(
                          row.puntajeFinal,
                        )}`}
                      >
                        {row.puntajeFinal ?? "-"}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${estadoBadgeClasses(
                          row.estadoPostulacion,
                        )}`}
                      >
                        {estadoLabel(row.estadoPostulacion)}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-middle">
                      {formatDate(row.fechaPostulacion)}
                    </td>

                    <td className="px-4 py-5 align-middle">
                      <div className="relative flex items-center gap-3">
                        <Link
                          href={`/procesos/${row.procesoId}/candidatos/${row.postulacionId}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Ver detalle"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>

                        <Link
                          href={`/procesos/${row.procesoId}/candidatos/${row.postulacionId}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Editar / revisar"
                        >
                          <Pencil className="h-5 w-5" />
                        </Link>

                        <Link
                          href={`/procesos/${row.procesoId}/candidatos/${row.postulacionId}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Ver evidencia"
                        >
                          <FileText className="h-5 w-5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenRowMenu((prev) =>
                              prev === row.postulacionId ? null : row.postulacionId,
                            )
                          }
                          className="rounded-lg bg-[#E6F1F3] p-2 text-slate-700 transition hover:bg-[#d7eaed]"
                          title="Más acciones"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {openRowMenu === row.postulacionId ? (
                          <div className="absolute right-0 top-12 z-20 w-[200px] rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_14px_40px_rgba(15,23,42,0.16)]">
                            <Link
                              href={`/procesos/${row.procesoId}/candidatos/${row.postulacionId}`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Ver detalle
                            </Link>

                            <Link
                              href={`/procesos/${row.procesoId}`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Ver proceso
                            </Link>

                            <button
                              type="button"
                              className="block w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Mover de etapa
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}

                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-12 text-center text-sm text-slate-500"
                    >
                      No se encontraron candidatos con los filtros aplicados.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
}) {
  return (
    <div>
      <p className="mb-3 text-[1.05rem] font-bold tracking-[-0.03em] text-slate-950">
        {label}
      </p>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB] disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
}