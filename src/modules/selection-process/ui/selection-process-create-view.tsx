"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  GripVertical,
  Plus,
  Save,
  Trash2,
  Upload,
  UserCircle2,
  X,
} from "lucide-react";

type ProcessStatus = "Borrador" | "Activo" | "Pausado" | "Cerrado";
type ProcessType = "Abierto" | "Cerrado";

type PipelineStage = {
  id: number;
  name: string;
};

const INITIAL_STAGES: PipelineStage[] = [
  { id: 1, name: "Nuevos" },
  { id: 2, name: "Entrevista" },
  { id: 3, name: "Eval. Técnica" },
  { id: 4, name: "Oferta" },
  { id: 5, name: "Ganadores" },
];

export function SelectionProcessCreateView() {
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [recruiter, setRecruiter] = useState("Ana García");
  const [processType, setProcessType] = useState<ProcessType>("Abierto");
  const [status, setStatus] = useState<ProcessStatus>("Borrador");
  const [startDate, setStartDate] = useState("");
  const [estimatedCloseDate, setEstimatedCloseDate] = useState("");
  const [description, setDescription] = useState("");
  const [requirementsInput, setRequirementsInput] = useState("");
  const [requirements, setRequirements] = useState<string[]>([
    "React",
    "Node.js",
    "TypeScript",
    "Docker",
  ]);
  const [pipelineStages, setPipelineStages] =
    useState<PipelineStage[]>(INITIAL_STAGES);

  function addRequirement() {
    const cleaned = requirementsInput.trim();
    if (!cleaned) return;
    if (requirements.includes(cleaned)) {
      setRequirementsInput("");
      return;
    }

    setRequirements((prev) => [...prev, cleaned]);
    setRequirementsInput("");
  }

  function removeRequirement(requirement: string) {
    setRequirements((prev) => prev.filter((item) => item !== requirement));
  }

  function addStage() {
    const nextNumber = pipelineStages.length + 1;

    setPipelineStages((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `Nueva Etapa ${nextNumber}`,
      },
    ]);
  }

  function removeStage(stageId: number) {
    setPipelineStages((prev) => prev.filter((stage) => stage.id !== stageId));
  }

  return (
    <div className="space-y-6">
      <div>
        <nav className="mb-2 flex items-center gap-2 text-sm text-[#2E6E77]">
          <Link 
          href="/home" className="hover:underline">
            Dashboard
          </Link>
          <span className="text-slate-400">&gt;</span>

          <Link href="/procesos" className="hover:underline">
            Proceso de Selección
          </Link>
          <span className="text-slate-400">&gt;</span>

          <span>Nuevo Proceso</span>
        </nav>

        <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
          Crear Nuevo Proceso de Selección
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
          <span>ID</span>
          <span className="rounded-md border border-slate-300 bg-white px-2 py-0.5 font-medium text-slate-900">
            NUEVO
          </span>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 xl:grid-cols-2">
          {/* Columna izquierda */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-5 text-[2rem] font-bold tracking-[-0.03em] text-slate-950">
                1. Informática General
              </h2>

              <div className="space-y-4">
                <FormRow label="Título del Cargo/Vacante">
                  <input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="ej. Desarrollador Full Stack Senior"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                  />
                </FormRow>

                <FormRow label="Área o Departamento">
                  <SelectBox
                    value={department}
                    onChange={setDepartment}
                    placeholder="ej. Tecnología / Ingeniería"
                    options={[
                      "Tecnología / Ingeniería",
                      "Ventas",
                      "Marketing",
                      "Recursos Humanos",
                      "Finanzas",
                    ]}
                  />
                </FormRow>

                <FormRow label="Reclutador Responsable">
                  <div className="relative">
                    <select
                      value={recruiter}
                      onChange={(e) => setRecruiter(e.target.value)}
                      className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-12 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
                    >
                      <option value="Ana García">Ana García</option>
                      <option value="Carlos Ruiz">Carlos Ruiz</option>
                      <option value="María Torres">María Torres</option>
                    </select>

                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[#F8D7D7] p-1 text-[#904E4E]">
                      <UserCircle2 className="h-6 w-6" />
                    </div>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                </FormRow>

                <FormRow label="Tipo de Proceso">
                  <SelectBox
                    value={processType}
                    onChange={(value) => setProcessType(value as ProcessType)}
                    placeholder='ej. Abierto" / Cerrado'
                    options={["Abierto", "Cerrado"]}
                  />
                </FormRow>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="mb-5 text-[2rem] font-bold tracking-[-0.03em] text-slate-950">
                Descripción y Requisitos
              </h2>

              <div className="space-y-4">
                <FormRow label="Descripción Breve" alignStart>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ej. Desarrollar nuevas funcionalidades..."
                    rows={3}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                  />
                </FormRow>

                <FormRow label="Requisitos Clave" alignStart>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
                      {requirements.map((requirement) => (
                        <span
                          key={requirement}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#E9F0EE] px-3 py-1.5 text-sm text-slate-700"
                        >
                          {requirement}
                          <button
                            type="button"
                            onClick={() => removeRequirement(requirement)}
                            className="text-slate-500 hover:text-slate-800"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      ))}

                      <input
                        value={requirementsInput}
                        onChange={(e) => setRequirementsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addRequirement();
                          }
                        }}
                        placeholder="ej. React, Node.js, TypeScript, Docker..."
                        className="min-w-[220px] flex-1 border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
                      />

                      <button
                        type="button"
                        onClick={addRequirement}
                        className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </FormRow>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-5 text-[2rem] font-bold tracking-[-0.03em] text-slate-950">
                2. Detalles Temporales
              </h2>

              <div className="space-y-4">
                <FormRow label="Estado Inicial">
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as ProcessStatus)}
                      className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
                    >
                      <option value="Borrador">Borrador</option>
                      <option value="Activo">Activo</option>
                      <option value="Pausado">Pausado</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 rounded-md bg-[#F0C556] px-2 py-1 text-xs font-semibold text-[#5A3B00]">
                      {status}
                    </span>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                </FormRow>

                <FormRow label="Fecha de Inicio">
                  <DateField
                    value={startDate}
                    onChange={setStartDate}
                    placeholder="ej. Select Date..."
                  />
                </FormRow>

                <FormRow label="Fecha Cierre Estimada">
                  <DateField
                    value={estimatedCloseDate}
                    onChange={setEstimatedCloseDate}
                    placeholder="ej. Select Date..."
                  />
                </FormRow>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6">
          <h2 className="mb-5 text-[2rem] font-bold tracking-[-0.03em] text-slate-950">
            3. Configuración del Pipeline
          </h2>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[180px_minmax(0,1fr)]">
            <div className="pt-3 text-[1.05rem] font-medium text-slate-800">
              Etapas Activas
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {pipelineStages.map((stage, index) => (
                <div key={stage.id} className="flex items-center">
                  <div className="relative flex h-12 items-center gap-2 rounded-l-xl rounded-r-md bg-[#0A8C95] px-4 text-white shadow-sm">
                    <GripVertical className="h-4 w-4 text-white/80" />
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {index + 1}. {stage.name}
                    </span>

                    <button
                      type="button"
                      className="rounded-md bg-white/15 p-1 transition hover:bg-white/20"
                      title="Agregar etapa relacionada"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>

                    {pipelineStages.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeStage(stage.id)}
                        className="rounded-md bg-white/15 p-1 transition hover:bg-white/20"
                        title="Eliminar etapa"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </div>

                  {index < pipelineStages.length - 1 ? (
                    <div className="h-0 w-0 border-b-[24px] border-l-[18px] border-t-[24px] border-b-transparent border-l-[#0A8C95] border-t-transparent" />
                  ) : null}
                </div>
              ))}

              <button
                type="button"
                onClick={addStage}
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-dashed border-[#0A8C95] bg-white px-4 text-sm font-semibold text-[#0A8C95] transition hover:bg-[#f2fbfc]"
              >
                <Plus className="h-4 w-4" />
                Añadir Etapa
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
          <button
            type="button"
            className="inline-flex h-12 items-center rounded-xl border border-slate-300 bg-slate-100 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancelar
          </button>

          <button
            type="button"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#0A8C95] bg-white px-5 text-sm font-semibold text-[#0A8C95] transition hover:bg-[#f2fbfc]"
          >
            <Save className="h-4 w-4" />
            Guardar Borrador
          </button>

          <button
            type="button"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
          >
            <Upload className="h-4 w-4" />
            Publicar / Activar Proceso
          </button>
        </div>
      </section>
    </div>
  );
}

function FormRow({
  label,
  children,
  alignStart = false,
}: {
  label: string;
  children: React.ReactNode;
  alignStart?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-[190px_minmax(0,1fr)] xl:items-center">
      <label
        className={`text-[1.05rem] font-medium text-slate-900 ${
          alignStart ? "xl:self-start xl:pt-3" : ""
        }`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectBox({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm outline-none focus:border-[#17A9BB] ${
          value ? "text-slate-800" : "text-slate-400"
        }`}
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
  );
}

function DateField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
      />
    </div>
  );
}