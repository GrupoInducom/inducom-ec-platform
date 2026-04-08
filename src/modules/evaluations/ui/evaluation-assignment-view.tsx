"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Link2, Upload } from "lucide-react";

type AssignmentStatus =
  | "asignada"
  | "en_curso"
  | "completada"
  | "vencida"
  | "cancelada";

const evaluations = [
  { id: "eval-001", title: "Prueba de React Senior" },
  { id: "eval-002", title: "Evaluación Psicométrica" },
  { id: "eval-003", title: "Prueba de SQL" },
];

const processTargets = [
  {
    id: "post-group-001",
    label: "Desarrollador Full Stack Senior [DFS-001]",
  },
  {
    id: "post-group-002",
    label: "Gerente de Ventas [GVT-001]",
  },
];

const deliveryOptions = [
  "Correo Electrónico (link)",
  "Notificación interna",
  "Acceso directo en portal",
];

export function EvaluationAssignmentView() {
  const [evaluationId, setEvaluationId] = useState("eval-001");
  const [targetId, setTargetId] = useState("post-group-001");
  const [dueDate, setDueDate] = useState("");
  const [initialStatus, setInitialStatus] =
    useState<AssignmentStatus>("asignada");
  const [deliveryType, setDeliveryType] = useState("Correo Electrónico (link)");
  const [accessLink, setAccessLink] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <nav className="mb-2 flex items-center gap-2 text-sm text-[#2E6E77]">
          <span>Dashboard</span>
          <span className="text-slate-400">&gt;</span>
          <span>Evaluaciones</span>
          <span className="text-slate-400">&gt;</span>
          <span>Banco</span>
          <span className="text-slate-400">&gt;</span>
          <span>Asignación</span>
        </nav>

        <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
          Asignación de Evaluaciones
        </h1>
      </div>

      <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
        <div className="space-y-8">
          <div>
            <h2 className="mb-5 text-[2rem] font-bold tracking-[-0.03em] text-slate-950">
              1. Configuración General
            </h2>

            <div className="space-y-4">
              <FormRow label="Seleccionar Evaluación">
                <SelectBox
                  value={evaluationId}
                  onChange={setEvaluationId}
                  options={evaluations.map((evaluation) => ({
                    value: evaluation.id,
                    label: evaluation.title,
                  }))}
                />
              </FormRow>

              <FormRow label="Seleccionar Vacante / Candidatos">
                <SelectBox
                  value={targetId}
                  onChange={setTargetId}
                  options={processTargets.map((target) => ({
                    value: target.id,
                    label: target.label,
                  }))}
                />
              </FormRow>

              <FormRow label="Fecha Límite de Envío">
                <DateField
                  value={dueDate}
                  onChange={setDueDate}
                  placeholder="ej. Select Date..."
                />
              </FormRow>

              <FormRow label="Estado de Envío Inicial">
                <SelectBox
                  value={initialStatus}
                  onChange={(value) => setInitialStatus(value as AssignmentStatus)}
                  options={[
                    { value: "asignada", label: "Asignada" },
                    { value: "en_curso", label: "En curso" },
                    { value: "completada", label: "Completada" },
                    { value: "vencida", label: "Vencida" },
                    { value: "cancelada", label: "Cancelada" },
                  ]}
                />
              </FormRow>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h2 className="mb-5 text-[2rem] font-bold tracking-[-0.03em] text-slate-950">
              2. Detalles de Envío y Observaciones
            </h2>

            <div className="space-y-4">
              <FormRow label="Tipo de Envío">
                <div className="rounded-xl border border-slate-300 bg-white px-3 py-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-[#E9F0EE] px-3 py-1.5 text-sm text-slate-700">
                      {deliveryType}
                      <button
                        type="button"
                        className="text-slate-500 hover:text-slate-800"
                      >
                        ×
                      </button>
                    </span>

                    <select
                      value={deliveryType}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      className="min-w-[220px] flex-1 appearance-none border-none bg-transparent text-sm text-slate-800 outline-none"
                    >
                      {deliveryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </FormRow>

              <FormRow label="Generar Link de Acceso">
                <div className="relative">
                  <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    value={accessLink}
                    onChange={(e) => setAccessLink(e.target.value)}
                    placeholder="ej. Generar Link..."
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                  />
                </div>
              </FormRow>

              <FormRow label="Observaciones Adicionales" alignStart>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                />
              </FormRow>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              className="inline-flex h-12 items-center rounded-xl border border-slate-300 bg-slate-100 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancelar
            </button>

            <button
              type="button"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
            >
              <Upload className="h-4 w-4" />
              Asignar Evaluación
            </button>
          </div>
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
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-[220px_minmax(0,1fr)] xl:items-center">
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
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
      >
        {options.map((option) => (
          <option key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
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