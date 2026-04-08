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
  | "descartada_inicial"
  | "video_pendiente"
  | "video_cargado"
  | "oferta_rechazada"
  | "en_revision_inicial"
  | "aceptada_inicial"
  | "evaluacion_pendiente"
  | "evaluacion_en_curso"
  | "evaluacion_completada"
  | "entrevista_pendiente"
  | "entrevista_realizada"
  | "finalista"
  | "en_revisoria"
  | "aprobada_revisoria"
  | "rechazada"
  | "oferta_emitida"
  | "oferta_aceptada"
  | "ganadora"
  
  | "retirada";

type EstadoAsignacionEvaluacion =
  | "asignada"
  | "en_curso"
  | "completada"
  | "vencida"
  | "cancelada";

type ProcessCandidateRow = {
  postulacionId: string;
  candidatoId: string;
  nombreCompleto: string;
  cargoPostulado: string;
  etapaFlujoActual: EtapaFlujo;
  estadoPostulacion: EstadoPostulacion;
  tituloEvaluacionAsignada: string | null;
  estadoEvaluacion: EstadoAsignacionEvaluacion | null;
  puntajeFinal: number | null;
};

const PROCESS_INFO = {
  id: "DFS-001",
  title: "Desarrollador Full Stack Senior",
};

const CANDIDATE_ROWS: ProcessCandidateRow[] = [
  {
    postulacionId: "post-001",
    candidatoId: "cand-001",
    nombreCompleto: "Ana García",
    cargoPostulado: "Desarrollador Full Stack",
    etapaFlujoActual: "entrevista",
    estadoPostulacion: "entrevista_pendiente",
    tituloEvaluacionAsignada: "Video Entrevista",
    estadoEvaluacion: "asignada",
    puntajeFinal: 85,
  },
  {
    postulacionId: "post-002",
    candidatoId: "cand-002",
    nombreCompleto: "Carlos Ruiz",
    cargoPostulado: "Desarrollador Full Stack",
    etapaFlujoActual: "nuevos",
    estadoPostulacion: "aceptada_inicial",
    tituloEvaluacionAsignada: "Pruebas Técnicas",
    estadoEvaluacion: "completada",
    puntajeFinal: 72,
  },
  {
    postulacionId: "post-003",
    candidatoId: "cand-003",
    nombreCompleto: "Luis Mendoza",
    cargoPostulado: "Desarrollador Full Stack",
    etapaFlujoActual: "evaluacion_tecnica",
    estadoPostulacion: "evaluacion_en_curso",
    tituloEvaluacionAsignada: "Prueba React",
    estadoEvaluacion: "en_curso",
    puntajeFinal: 68,
  },
  {
    postulacionId: "post-004",
    candidatoId: "cand-004",
    nombreCompleto: "María Vargas",
    cargoPostulado: "Desarrollador Full Stack",
    etapaFlujoActual: "oferta",
    estadoPostulacion: "oferta_emitida",
    tituloEvaluacionAsignada: "Oferta Enviada",
    estadoEvaluacion: null,
    puntajeFinal: null,
  },
  {
    postulacionId: "post-005",
    candidatoId: "cand-005",
    nombreCompleto: "Diego Cruz",
    cargoPostulado: "Desarrollador Full Stack",
    etapaFlujoActual: "ganadores",
    estadoPostulacion: "ganadora",
    tituloEvaluacionAsignada: "Contratado",
    estadoEvaluacion: null,
    puntajeFinal: 88,
  },
];

function etapaLabel(etapa: EtapaFlujo) {
  if (etapa === "nuevos") return "Preselección";
  if (etapa === "entrevista") return "Entrevista HR";
  if (etapa === "evaluacion_tecnica") return "Evaluación Técnica";
  if (etapa === "oferta") return "Oferta";
  return "Ganadores";
}

function etapaSelectLabel(etapa: string) {
  if (etapa === "") return "ej. Preselección";
  return etapa;
}

function estadoLabel(estado: EstadoPostulacion) {
  const map: Record<EstadoPostulacion, string> = {
    registrada: "Registrada",
    en_revision_inicial: "En revisión",
    aceptada_inicial: "Activo",
    evaluacion_pendiente: "Pendiente",
    evaluacion_en_curso: "Activo",
    evaluacion_completada: "Evaluado",
    entrevista_pendiente: "Activo",
    entrevista_realizada: "Evaluado",
    finalista: "Finalista",
    en_revisoria: "En revisoria",
    aprobada_revisoria: "Aprobado",
    rechazada: "Rechazado",
    oferta_emitida: "Activo",
    oferta_aceptada: "Cerrado",
    ganadora: "Cerrado",
    retirada: "Retirado",
    descartada_inicial: "Descartado",
    video_pendiente: "Pendiente",
    video_cargado: "Activo",
    oferta_rechazada: "Rechazado",
  };
  return map[estado] ?? estado;
}

function estadoBadgeClasses(estado: EstadoPostulacion) {
  if (
    estado === "aceptada_inicial" ||
    estado === "evaluacion_en_curso" ||
    estado === "entrevista_pendiente" ||
    estado === "oferta_emitida" ||
    estado === "video_cargado"
  ) {
    return "bg-[#0891A8] text-white";
  }

  if (
    estado === "evaluacion_pendiente" ||
    estado === "video_pendiente" ||
    estado === "en_revision_inicial"
  ) {
    return "bg-[#F2BD42] text-[#5A3B00]";
  }

  if (
    estado === "ganadora" ||
    estado === "oferta_aceptada" ||
    estado === "aprobada_revisoria"
  ) {
    return "bg-[#1FA84F] text-white";
  }

  if (
    estado === "rechazada" ||
    estado === "retirada" ||
    estado === "descartada_inicial" ||
    estado === "oferta_rechazada"
  ) {
    return "bg-[#F3E5E5] text-[#A44949]";
  }

  return "bg-slate-200 text-slate-700";
}

function evaluationBadgeClasses(title: string | null) {
  if (!title) return "bg-slate-200 text-slate-600";
  if (title.toLowerCase().includes("video")) return "bg-[#0B8A8C] text-white";
  if (title.toLowerCase().includes("técnicas")) return "bg-[#0A8C95] text-white";
  if (title.toLowerCase().includes("react")) return "bg-[#0A8C95] text-white";
  if (title.toLowerCase().includes("contratado")) return "bg-[#16A34A] text-white";
  if (title.toLowerCase().includes("oferta")) return "bg-[#1B9C9F] text-white";
  return "bg-slate-200 text-slate-700";
}

export function ProcessCandidatesView() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [openRowMenu, setOpenRowMenu] = useState<string | null>("post-001");

  const rows = useMemo(() => {
    return CANDIDATE_ROWS.filter((row) => {
      const matchesSearch =
        search.trim() === ""
          ? true
          : row.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
            row.cargoPostulado.toLowerCase().includes(search.toLowerCase());

      const matchesStage =
        stageFilter === "" ? true : etapaLabel(row.etapaFlujoActual) === stageFilter;

      const matchesStatus =
        statusFilter === "" ? true : estadoLabel(row.estadoPostulacion) === statusFilter;

      const matchesResult =
        resultFilter === ""
          ? true
          : resultFilter === "> 70 Score"
          ? (row.puntajeFinal ?? -1) > 70
          : resultFilter === "<= 70 Score"
          ? (row.puntajeFinal ?? -1) <= 70
          : resultFilter === "Sin Score"
          ? row.puntajeFinal === null
          : true;

      return matchesSearch && matchesStage && matchesStatus && matchesResult;
    });
  }, [search, stageFilter, statusFilter, resultFilter]);

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
            <span className="text-slate-400">&gt;</span>
            <span>Pantalla de Candidatos por Proceso</span>
          </nav>

          <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
            {PROCESS_INFO.title} [{PROCESS_INFO.id}]
          </h1>
        </div>

        <Link
          href="/procesos/101/candidatos/nuevo"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
        >
          <Plus className="h-4 w-4" />
          Agregar Candidato
        </Link>
      </div>

      <section className="space-y-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(240px,1fr)_240px_220px_220px_220px]">
          <div>
            <p className="text-[1.45rem] font-bold tracking-[-0.03em] text-slate-950">
              Candidatos Asociados ({rows.length})
            </p>

            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar candidato..."
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#17A9BB]"
              />
            </div>
          </div>

          <div>
            <p className="text-[1.45rem] font-bold tracking-[-0.03em] text-slate-950">
              Etapa Actual: Entrevista HR
            </p>
            <p className="mt-4 text-sm text-slate-600">Actividad time at 1:03 PM</p>
          </div>

          <FilterSelect
            label="Filtrar por Etapa"
            value={stageFilter}
            onChange={setStageFilter}
            placeholder={etapaSelectLabel(stageFilter)}
            options={[
              "Preselección",
              "Entrevista HR",
              "Evaluación Técnica",
              "Oferta",
              "Ganadores",
            ]}
          />

          <FilterSelect
            label="Filtrar por Estado"
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder={statusFilter || "ej. Activo"}
            options={[
              "Activo",
              "Pendiente",
              "Evaluado",
              "Finalista",
              "Aprobado",
              "Cerrado",
              "Rechazado",
            ]}
          />

          <FilterSelect
            label="Filtrar por Resultado"
            value={resultFilter}
            onChange={setResultFilter}
            placeholder={resultFilter || "ej. > 70 Score"}
            options={["> 70 Score", "<= 70 Score", "Sin Score"]}
          />
        </div>

        <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-sm font-semibold text-slate-800">
                  <th className="px-4 py-4">Nombre del Candidato ↕</th>
                  <th className="px-4 py-4">Cargo Postulado</th>
                  <th className="px-4 py-4">Etapa Actual</th>
                  <th className="px-4 py-4">Evaluación Asignada</th>
                  <th className="px-4 py-4">Score</th>
                  <th className="px-4 py-4">Estado</th>
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
                        <span className="font-medium">{row.nombreCompleto}</span>
                      </div>
                    </td>

                    <td className="px-4 py-5 align-middle leading-tight">
                      {row.cargoPostulado}
                    </td>

                    <td className="px-4 py-5 align-middle leading-tight">
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
                      {row.puntajeFinal !== null ? (
                        <span
                          className={`inline-flex min-w-[42px] justify-center rounded-lg px-3 py-1.5 text-sm font-bold ${
                            row.puntajeFinal > 70
                              ? "bg-[#16A34A] text-white"
                              : "bg-[#F2BD42] text-[#5A3B00]"
                          }`}
                        >
                          {row.puntajeFinal}
                        </span>
                      ) : (
                        <span className="inline-flex min-w-[42px] justify-center rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-bold text-slate-600">
                          -
                        </span>
                      )}
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
                      <div className="relative flex items-center gap-3">
                        <Link
                          href={`/procesos/101/candidatos/${row.postulacionId}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Ver detalle"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>

                        <Link
                          href={`/procesos/101/candidatos/${row.postulacionId}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Editar / revisar"
                        >
                          <Pencil className="h-5 w-5" />
                        </Link>

                        <Link
                          href={`/procesos/101/candidatos/${row.postulacionId}`}
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
                          <div className="absolute right-0 top-12 z-20 w-[180px] rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_14px_40px_rgba(15,23,42,0.16)]">
                            <Link
                              href={`/procesos/101/candidatos/${row.postulacionId}`}
                              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Ver Detalles
                            </Link>

                            <button
                              type="button"
                              className="block w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Mover de Etapa
                            </button>

                            <button
                              type="button"
                              className="block w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-slate-50"
                            >
                              Enviar a Revisoría
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
                      colSpan={7}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div>
      <p className="mb-3 text-[1.2rem] font-bold tracking-[-0.03em] text-slate-950">
        {label}
      </p>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
}