"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, FileText, Save, Upload, UserCircle2 } from "lucide-react";
    
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

type CandidateEditViewProps = {
  processId: string;
  postulacionId: string;
};

type CandidateEditRecord = {
  postulacionId: string;
  procesoId: string;
  tituloVacante: string;
  candidatoId: string;
  nombreCompleto: string;
  correo: string;
  telefono: string;
  identificacion: string;
  cargoActual: string;
  empresaActual: string;
  aniosExperiencia: string;
  resumenProfesional: string;
  rutaHojaVidaActual: string;
  etapaFlujoActual: EtapaFlujo;
  estadoPostulacion: EstadoPostulacion;
  puntajeFinal: number | null;
  fechaPostulacion: string;
  notaSeleccion: string;
  notaRevisoria: string;
  motivoDescarte: string;
  motivoRetiro: string;
};

const CANDIDATE_EDIT_MOCK: CandidateEditRecord[] = [
  {
    postulacionId: "post-001",
    procesoId: "proc-001",
    tituloVacante: "Desarrollador Full Stack Senior",
    candidatoId: "cand-001",
    nombreCompleto: "Ana García",
    correo: "ana.garcia@mail.com",
    telefono: "+593999111111",
    identificacion: "0912345678",
    cargoActual: "Frontend Developer",
    empresaActual: "Tech Solutions",
    aniosExperiencia: "4",
    resumenProfesional:
      "Desarrolladora frontend con experiencia en React, TypeScript y trabajo colaborativo con equipos de producto.",
    rutaHojaVidaActual: "storage/cv/ana-garcia.pdf",
    etapaFlujoActual: "entrevista",
    estadoPostulacion: "en_entrevista",
    puntajeFinal: 85,
    fechaPostulacion: "2026-04-01T10:30:00.000Z",
    notaSeleccion: "Buen manejo técnico y comunicación clara.",
    notaRevisoria: "",
    motivoDescarte: "",
    motivoRetiro: "",
  },
  {
    postulacionId: "post-002",
    procesoId: "proc-001",
    tituloVacante: "Desarrollador Full Stack Senior",
    candidatoId: "cand-002",
    nombreCompleto: "Carlos Ruiz",
    correo: "carlos.ruiz@mail.com",
    telefono: "+593999222222",
    identificacion: "0923456789",
    cargoActual: "Full Stack Developer",
    empresaActual: "Digital Labs",
    aniosExperiencia: "5",
    resumenProfesional:
      "Perfil full stack con experiencia en Node.js, PostgreSQL y despliegues productivos.",
    rutaHojaVidaActual: "storage/cv/carlos-ruiz.pdf",
    etapaFlujoActual: "evaluacion_tecnica",
    estadoPostulacion: "en_evaluacion",
    puntajeFinal: 72,
    fechaPostulacion: "2026-04-02T14:00:00.000Z",
    notaSeleccion: "Avanza bien, pendiente revisión final de prueba.",
    notaRevisoria: "",
    motivoDescarte: "",
    motivoRetiro: "",
  },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getEstadoLabel(value: EstadoPostulacion) {
  const labels: Record<EstadoPostulacion, string> = {
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

  return labels[value];
}

function getEtapaLabel(value: EtapaFlujo) {
  const labels: Record<EtapaFlujo, string> = {
    nuevos: "Nuevos",
    entrevista: "Entrevista",
    evaluacion_tecnica: "Evaluación Técnica",
    oferta: "Oferta",
    ganadores: "Ganadores",
  };

  return labels[value];
}

export function CandidateEditView({
  processId,
  postulacionId,
}: CandidateEditViewProps) {
  const record = useMemo(() => {
    return (
      CANDIDATE_EDIT_MOCK.find(
        (item) =>
          item.procesoId === processId && item.postulacionId === postulacionId,
      ) ?? CANDIDATE_EDIT_MOCK[0]
    );
  }, [processId, postulacionId]);

  const [nombreCompleto, setNombreCompleto] = useState(record.nombreCompleto);
  const [correo, setCorreo] = useState(record.correo);
  const [telefono, setTelefono] = useState(record.telefono);
  const [identificacion, setIdentificacion] = useState(record.identificacion);
  const [cargoActual, setCargoActual] = useState(record.cargoActual);
  const [empresaActual, setEmpresaActual] = useState(record.empresaActual);
  const [aniosExperiencia, setAniosExperiencia] = useState(record.aniosExperiencia);
  const [resumenProfesional, setResumenProfesional] = useState(
    record.resumenProfesional,
  );
  const [rutaHojaVidaActual, setRutaHojaVidaActual] = useState(
    record.rutaHojaVidaActual,
  );
  const [etapaFlujoActual, setEtapaFlujoActual] = useState<EtapaFlujo>(
    record.etapaFlujoActual,
  );
  const [estadoPostulacion, setEstadoPostulacion] = useState<EstadoPostulacion>(
    record.estadoPostulacion,
  );
  const [notaSeleccion, setNotaSeleccion] = useState(record.notaSeleccion);
  const [notaRevisoria, setNotaRevisoria] = useState(record.notaRevisoria);
  const [motivoDescarte, setMotivoDescarte] = useState(record.motivoDescarte);
  const [motivoRetiro, setMotivoRetiro] = useState(record.motivoRetiro);

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
            <Link href={`/procesos/${processId}/candidatos`} className="hover:underline">
              Candidatos
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span>Editar Candidato</span>
          </nav>

          <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
            Editar Candidato
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Edición de perfil candidato + datos del candidato + postulación.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/procesos/${processId}/candidatos`}
            className="inline-flex h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Volver
          </Link>

          <button
            type="button"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
          >
            <Save className="h-4 w-4" />
            Guardar Cambios
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8D7D7] text-[#904E4E]">
                <UserCircle2 className="h-10 w-10" />
              </div>

              <div>
                <h2 className="text-[1.35rem] font-bold text-slate-950">
                  Información del Perfil
                </h2>
                <p className="text-sm text-slate-500">
                  ID candidato: {record.candidatoId}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldInput
                label="Nombre completo"
                value={nombreCompleto}
                onChange={setNombreCompleto}
              />
              <FieldInput label="Correo" value={correo} onChange={setCorreo} type="email" />
              <FieldInput label="Teléfono" value={telefono} onChange={setTelefono} />
              <FieldInput
                label="Identificación"
                value={identificacion}
                onChange={setIdentificacion}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-[1.35rem] font-bold text-slate-950">
              Información Profesional
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldInput label="Cargo actual" value={cargoActual} onChange={setCargoActual} />
              <FieldInput
                label="Empresa actual"
                value={empresaActual}
                onChange={setEmpresaActual}
              />
              <FieldInput
                label="Años de experiencia"
                value={aniosExperiencia}
                onChange={setAniosExperiencia}
                type="number"
              />
              <FieldInput
                label="Ruta hoja de vida actual"
                value={rutaHojaVidaActual}
                onChange={setRutaHojaVidaActual}
              />
            </div>

            <div className="mt-5">
              <FieldTextarea
                label="Resumen profesional"
                value={resumenProfesional}
                onChange={setResumenProfesional}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-[1.35rem] font-bold text-slate-950">
              Información de la Postulación
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldText label="Proceso" value={record.tituloVacante} readOnly />
              <FieldText label="Fecha de postulación" value={formatDate(record.fechaPostulacion)} readOnly />

              <FieldSelect
                label="Etapa flujo actual"
                value={etapaFlujoActual}
                onChange={(value) => setEtapaFlujoActual(value as EtapaFlujo)}
                options={[
                  { value: "nuevos", label: "Nuevos" },
                  { value: "entrevista", label: "Entrevista" },
                  { value: "evaluacion_tecnica", label: "Evaluación Técnica" },
                  { value: "oferta", label: "Oferta" },
                  { value: "ganadores", label: "Ganadores" },
                ]}
              />

              <FieldSelect
                label="Estado postulación"
                value={estadoPostulacion}
                onChange={(value) => setEstadoPostulacion(value as EstadoPostulacion)}
                options={[
                  { value: "registrada", label: "Registrada" },
                  { value: "en_revision", label: "En revisión" },
                  { value: "en_evaluacion", label: "En evaluación" },
                  { value: "en_entrevista", label: "En entrevista" },
                  { value: "en_revisoria", label: "En revisoría" },
                  { value: "en_oferta", label: "En oferta" },
                  { value: "ganadora", label: "Ganadora" },
                  { value: "rechazada", label: "Rechazada" },
                  { value: "retirada", label: "Retirada" },
                ]}
              />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5">
              <FieldTextarea
                label="Nota selección"
                value={notaSeleccion}
                onChange={setNotaSeleccion}
              />
              <FieldTextarea
                label="Nota revisoría"
                value={notaRevisoria}
                onChange={setNotaRevisoria}
              />
              <FieldTextarea
                label="Motivo descarte"
                value={motivoDescarte}
                onChange={setMotivoDescarte}
              />
              <FieldTextarea
                label="Motivo retiro"
                value={motivoRetiro}
                onChange={setMotivoRetiro}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h3 className="text-[1.15rem] font-bold text-slate-950">Resumen</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div>
                <span className="font-semibold text-slate-900">Vacante:</span>{" "}
                {record.tituloVacante}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Etapa:</span>{" "}
                {getEtapaLabel(etapaFlujoActual)}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Estado:</span>{" "}
                {getEstadoLabel(estadoPostulacion)}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Score:</span>{" "}
                {record.puntajeFinal ?? "-"}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h3 className="text-[1.15rem] font-bold text-slate-950">
              Evidencias
            </h3>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#0C7C88] bg-[#F4FCFD] px-4 text-sm font-semibold text-[#0C7C88] transition hover:bg-[#eaf9fb]"
              >
                <Upload className="h-4 w-4" />
                Reemplazar hoja de vida
              </button>

              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <FileText className="h-4 w-4" />
                Ver evidencia actual
              </button>
            </div>
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
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-800 outline-none focus:border-[#17A9BB]"
        >
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