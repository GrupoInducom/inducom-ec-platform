"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Save, Upload } from "lucide-react";

type ProcesoOption = {
  id: string;
  tituloVacante: string;
};

type ProcessCandidateCreateViewProps = {
  initialProcesoId?: string;
};

const PROCESOS_OPTIONS: ProcesoOption[] = [
  { id: "proc-001", tituloVacante: "Desarrollador Full Stack Senior" },
  { id: "proc-002", tituloVacante: "Diseñador UI/UX" },
  { id: "proc-003", tituloVacante: "Analista de Datos" },
];

export function ProcessCandidateCreateView({
  initialProcesoId = "",
}: ProcessCandidateCreateViewProps) {
  const [procesoId, setProcesoId] = useState(initialProcesoId);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [cargoActual, setCargoActual] = useState("");
  const [empresaActual, setEmpresaActual] = useState("");
  const [aniosExperiencia, setAniosExperiencia] = useState("");
  const [resumenProfesional, setResumenProfesional] = useState("");
  const [rutaHojaVidaActual, setRutaHojaVidaActual] = useState("");

  const procesoSeleccionado = useMemo(
    () => PROCESOS_OPTIONS.find((item) => item.id === procesoId),
    [procesoId],
  );

  const backHref = procesoId
    ? `/procesos/${procesoId}/candidatos`
    : "/procesos/candidatos";

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
            <Link href={backHref} className="hover:underline">
              Candidatos
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span>Agregar Candidato</span>
          </nav>

          <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
            Agregar Candidato
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Registro alineado a perfiles, candidatos y postulaciones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="inline-flex h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </Link>

          <button
            type="button"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
          >
            <Save className="h-4 w-4" />
            Guardar Candidato
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-[1.35rem] font-bold text-slate-950">
              Información de la Postulación
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldSelect
                label="Proceso / Vacante"
                value={procesoId}
                onChange={setProcesoId}
                disabled={Boolean(initialProcesoId)}
                options={PROCESOS_OPTIONS}
                placeholder="Selecciona una vacante"
              />

              <FieldText label="Estado inicial" value="registrada" readOnly />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-[1.35rem] font-bold text-slate-950">
              Datos del Perfil
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldInput
                label="Nombre completo"
                value={nombreCompleto}
                onChange={setNombreCompleto}
                placeholder="Ej. Ana García"
              />

              <FieldInput
                label="Correo"
                value={correo}
                onChange={setCorreo}
                placeholder="correo@dominio.com"
                type="email"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-[1.35rem] font-bold text-slate-950">
              Datos del Candidato
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldInput
                label="Teléfono"
                value={telefono}
                onChange={setTelefono}
                placeholder="+593..."
              />

              <FieldInput
                label="Identificación"
                value={identificacion}
                onChange={setIdentificacion}
                placeholder="Cédula o identificación"
              />

              <FieldInput
                label="Cargo actual"
                value={cargoActual}
                onChange={setCargoActual}
                placeholder="Ej. Frontend Developer"
              />

              <FieldInput
                label="Empresa actual"
                value={empresaActual}
                onChange={setEmpresaActual}
                placeholder="Ej. Empresa XYZ"
              />

              <FieldInput
                label="Años de experiencia"
                value={aniosExperiencia}
                onChange={setAniosExperiencia}
                placeholder="Ej. 4"
                type="number"
              />

              <FieldText label="Tipo historial" value="1" readOnly />
            </div>

            <div className="mt-5">
              <FieldTextarea
                label="Resumen profesional"
                value={resumenProfesional}
                onChange={setResumenProfesional}
                placeholder="Breve resumen del perfil profesional del candidato."
              />
            </div>

            <div className="mt-5">
              <FieldInput
                label="Ruta hoja de vida actual"
                value={rutaHojaVidaActual}
                onChange={setRutaHojaVidaActual}
                placeholder="Ej. storage/cv/ana-garcia.pdf"
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h3 className="text-[1.15rem] font-bold text-slate-950">
              Resumen
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div>
                <span className="font-semibold text-slate-900">Proceso:</span>{" "}
                {procesoSeleccionado?.tituloVacante ?? "No seleccionado"}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Etapa inicial:</span>{" "}
                nuevos
              </div>
              <div>
                <span className="font-semibold text-slate-900">Estado:</span>{" "}
                registrada
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h3 className="text-[1.15rem] font-bold text-slate-950">
              CV / Documento
            </h3>

            <button
              type="button"
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#0C7C88] bg-[#F4FCFD] px-4 text-sm font-semibold text-[#0C7C88] transition hover:bg-[#eaf9fb]"
            >
              <Upload className="h-4 w-4" />
              Subir hoja de vida
            </button>

            <p className="mt-3 text-xs text-slate-500">
              Luego esto se conecta con documentos del candidato y storage privado.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
      />
    </div>
  );
}

function FieldText({
  label,
  value,
  readOnly = false,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <input
        value={value}
        readOnly={readOnly}
        className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none"
      />
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
      />
    </div>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; tituloVacante: string }>;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB] disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.tituloVacante}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
}