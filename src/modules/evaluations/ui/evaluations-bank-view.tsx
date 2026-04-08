"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  CircleMinus,
  Copy,
  Eye,
  Pencil,
  Plus,
  Search,
} from "lucide-react";

type EvaluationType =
  | "psicometrica"
  | "tecnica"
  | "idioma"
  | "cultura"
  | "personalizada";

type EvaluationRow = {
  id: string;
  titulo: string;
  tipo: EvaluationType;
  categoria: string;
  duracionMinutos: number;
  puntajeMaximo: number;
  activa: boolean;
  actualizadoEn: string;
  scorePromedio?: number | null;
};

const EVALUATIONS: EvaluationRow[] = [
  {
    id: "eval-001",
    titulo: "Prueba de React Senior",
    tipo: "tecnica",
    categoria: "Tecnología",
    duracionMinutos: 60,
    puntajeMaximo: 100,
    activa: true,
    actualizadoEn: "15 nov 2023",
    scorePromedio: 85,
  },
  {
    id: "eval-002",
    titulo: "Evaluación Psicométrica",
    tipo: "psicometrica",
    categoria: "Tecnología",
    duracionMinutos: 30,
    puntajeMaximo: 100,
    activa: true,
    actualizadoEn: "10 nov 2023",
    scorePromedio: 72,
  },
  {
    id: "eval-003",
    titulo: "Prueba de SQL",
    tipo: "tecnica",
    categoria: "Tecnología",
    duracionMinutos: 45,
    puntajeMaximo: 100,
    activa: false,
    actualizadoEn: "05 nov 2023",
    scorePromedio: 68,
  },
  {
    id: "eval-004",
    titulo: "Test de Habilidades Interpersonales",
    tipo: "psicometrica",
    categoria: "Recursos Humanos",
    duracionMinutos: 20,
    puntajeMaximo: 100,
    activa: true,
    actualizadoEn: "01 nov 2023",
    scorePromedio: null,
  },
  {
    id: "eval-005",
    titulo: "Prueba de Node.js",
    tipo: "tecnica",
    categoria: "Tecnología",
    duracionMinutos: 50,
    puntajeMaximo: 100,
    activa: true,
    actualizadoEn: "28 oct 2023",
    scorePromedio: 88,
  },
];

function evaluationTypeLabel(type: EvaluationType) {
  const map: Record<EvaluationType, string> = {
    psicometrica: "Psicométrica",
    tecnica: "Técnica",
    idioma: "Idioma",
    cultura: "Cultura",
    personalizada: "Personalizada",
  };

  return map[type];
}

function typeBadgeClasses(type: EvaluationType) {
  if (type === "tecnica") return "bg-[#0B8A8C] text-white";
  if (type === "psicometrica") return "bg-[#0B8A8C] text-white";
  if (type === "idioma") return "bg-[#1B77C9] text-white";
  if (type === "cultura") return "bg-[#7C3AED] text-white";
  return "bg-slate-200 text-slate-700";
}

function statusBadgeClasses(active: boolean) {
  return active
    ? "bg-[#0B8A8C] text-white"
    : "bg-[#F2BD42] text-[#5A3B00]";
}

function scoreBadgeClasses(score?: number | null) {
  if (score === null || score === undefined) {
    return "bg-[#E5E7EB] text-slate-700";
  }

  if (score >= 70) {
    return "bg-[#16A34A] text-white";
  }

  return "bg-[#F59E0B] text-white";
}

export function EvaluationsBankView() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<EvaluationType | "">("tecnica");
  const [statusFilter, setStatusFilter] = useState<"activa" | "desactivada" | "">("activa");
  const [categoryFilter, setCategoryFilter] = useState("Tecnología");

  const rows = useMemo(() => {
    return EVALUATIONS.filter((row) => {
      const matchesSearch =
        search.trim() === ""
          ? true
          : row.titulo.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "" ? true : row.tipo === typeFilter;

      const matchesStatus =
        statusFilter === ""
          ? true
          : statusFilter === "activa"
          ? row.activa
          : !row.activa;

      const matchesCategory =
        categoryFilter === "" ? true : row.categoria === categoryFilter;

      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });
  }, [search, typeFilter, statusFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <nav className="mb-2 flex items-center gap-2 text-sm text-[#2E6E77]">
            <span>Dashboard</span>
            <span className="text-slate-400">&gt;</span>
            <span>Evaluaciones</span>
            <span className="text-slate-400">&gt;</span>
            <span>Banco</span>
          </nav>

          <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
            Banco de Evaluaciones
          </h1>
        </div>

        <Link
          href="/evaluaciones/nueva"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
        >
          <Plus className="h-4 w-4" />
          Crear Evaluación
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-sm font-semibold text-slate-800">
                  <th className="px-4 py-4">Nombre Evaluation ↕</th>
                  <th className="px-4 py-4">Tipo</th>
                  <th className="px-4 py-4">Duración (min)</th>
                  <th className="px-4 py-4">Puntaje</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Última Actualización</th>
                  <th className="px-4 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-slate-200 text-sm text-slate-900"
                  >
                    <td className="px-4 py-5 align-top">
                      <div className="max-w-[180px] leading-tight">{row.titulo}</div>
                    </td>

                    <td className="px-4 py-5 align-top">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${typeBadgeClasses(
                          row.tipo,
                        )}`}
                      >
                        {evaluationTypeLabel(row.tipo)}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-top">{row.duracionMinutos}</td>

                    <td className="px-4 py-5 align-top">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${scoreBadgeClasses(
                          row.scorePromedio,
                        )}`}
                      >
                        {row.scorePromedio !== null && row.scorePromedio !== undefined
                          ? `Score Promedio: ${row.scorePromedio}`
                          : "Score Promedio:"}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-top">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${statusBadgeClasses(
                          row.activa,
                        )}`}
                      >
                        {row.activa ? "Activa" : "Desactivada"}
                      </span>
                    </td>

                    <td className="px-4 py-5 align-top">{row.actualizadoEn}</td>

                    <td className="px-4 py-5 align-top">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/evaluaciones/${row.id}`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Previsualizar"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>

                        <Link
                          href={`/evaluaciones/${row.id}/editar`}
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Editar"
                        >
                          <Pencil className="h-5 w-5" />
                        </Link>

                        <button
                          type="button"
                          className="text-slate-700 transition hover:text-[#0697A7]"
                          title="Duplicar"
                        >
                          <Copy className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          className="text-slate-700 transition hover:text-[#D97706]"
                          title="Desactivar"
                        >
                          <CircleMinus className="h-5 w-5" />
                        </button>
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
                      No se encontraron evaluaciones con los filtros aplicados.
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
              placeholder="Buscar evaluación..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#17A9BB]"
            />
          </div>

          <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <h3 className="text-[1.8rem] font-bold tracking-[-0.03em] text-slate-950">
              Filtrar por
            </h3>

            <div className="mt-5 space-y-5">
              <FilterSelect
                label="Tipo"
                value={typeFilter}
                onChange={(value) => setTypeFilter(value as EvaluationType | "")}
                options={[
                  { value: "", label: "Todos" },
                  { value: "tecnica", label: "Técnica" },
                  { value: "psicometrica", label: "Psicométrica" },
                  { value: "idioma", label: "Idioma" },
                  { value: "cultura", label: "Cultura" },
                  { value: "personalizada", label: "Personalizada" },
                ]}
              />

              <div className="border-t border-slate-200" />

              <FilterSelect
                label="Estado"
                value={statusFilter}
                onChange={(value) =>
                  setStatusFilter(value as "activa" | "desactivada" | "")
                }
                options={[
                  { value: "", label: "Todos" },
                  { value: "activa", label: "Activa" },
                  { value: "desactivada", label: "Desactivada" },
                ]}
              />

              <div className="border-t border-slate-200" />

              <FilterSelect
                label="Área"
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={[
                  { value: "", label: "Todas" },
                  { value: "Tecnología", label: "Tecnología" },
                  { value: "Recursos Humanos", label: "Recursos Humanos" },
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