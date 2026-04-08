"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  FileText,
  MapPin,
  MessageSquareText,
  Pencil,
  UserCircle2,
  Users,
} from "lucide-react";

type DetailTab =
  | "general"
  | "requisitos"
  | "responsables"
  | "pipeline"
  | "actividad";

const processDetail = {
  id: "DFS-001",
  title: "Desarrollador Full Stack Senior",
  area: "Tecnología",
  processType: "Abierto",
  location: "Remoto",
  salaryText: "ej. Confidencial",
  salaryRange: "$X - $Y",
  description:
    "Buscamos un Desarrollador Full Stack Senior con experiencia, buscamos un perfil con capacidad técnica, criterio y autonomía para trabajar en productos internos de alto impacto.",
  recruiter: {
    name: "Carlos Ruiz",
    role: "HR/Selección",
  },
  reviewers: ["Tech Lead", "HR Manager"],
  requirements: ["+3 años Exp.", "React", "Node.js", "SQL"],
  timeline: [
    { title: "Publicación Vacante", date: "15 oct 2023" },
    { title: "HR Preselección", date: "22 oct 2023" },
    { title: "Entrevistas HR", date: "29 oct 2023" },
    { title: "Evaluaciones Técnicas", date: "5 nov 2023" },
    { title: "Video Entrevistas", date: "12 nov 2023" },
    { title: "Revisión Final", date: "19 nov 2023" },
    { title: "Selección Final", date: "25 nov 2023" },
  ],
  pipelineSummary: [
    { label: "Nuevos", value: 12, variant: "teal" },
    { label: "Preselección", value: 6, variant: "blue" },
    { label: "Tech Test", value: 4, variant: "gray" },
    { label: "Finalists", value: 2, variant: "gray" },
    { label: "Winner", value: 1, variant: "gray" },
  ],
  recentActivity: [
    "Preselección completada",
    "Evaluador Tech Lead asignado",
    "4 candidatos con prueba completada",
    "1 candidato enviado a revisoria",
  ],
  highlightedCandidate: {
    name: "Ana García",
    score: 85,
    status: "Finalista Approved",
  },
};

function pipelineBadgeClasses(variant: string) {
  if (variant === "teal") return "bg-[#0B9AA5] text-white";
  if (variant === "blue") return "bg-[#DDF1F7] text-[#2A6D90]";
  return "bg-[#ECEFF2] text-slate-700";
}

export function SelectionProcessDetailView() {
  const [activeTab, setActiveTab] = useState<DetailTab>("general");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <nav className="mb-2 flex items-center gap-2 text-sm text-[#2E6E77]">
            <span>Dashboard</span>
            <span className="text-slate-400">&gt;</span>
            <span>Proceso de Selección</span>
            <span className="text-slate-400">&gt;</span>
            <span>Gestión</span>
            <span className="text-slate-400">&gt;</span>
            <span>Detalle Vacante</span>
          </nav>

          <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
            {processDetail.title}
          </h1>
        </div>

        <Link
          href="/procesos/101/editar"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0697A7] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047f8d]"
        >
          <Pencil className="h-4 w-4" />
          Editar Vacante
        </Link>
      </div>

      {/* Banner */}
      <section className="rounded-2xl border border-slate-300 bg-white px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">Título de la Vacante:</p>
            <div className="mt-1 flex items-center gap-3">
              <h2 className="text-[2rem] font-extrabold tracking-[-0.03em] text-slate-950">
                {processDetail.title}
              </h2>
              <span className="rounded-lg bg-[#E6F1F3] px-3 py-1 text-sm font-medium text-[#2E6E77]">
                ID: {processDetail.id}
              </span>
            </div>
          </div>

          <Link
            href="/procesos/101/editar"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#0B7F8A] px-5 text-sm font-semibold text-white transition hover:bg-[#086d76]"
          >
            <Pencil className="h-4 w-4" />
            Editar Vacante
          </Link>
        </div>
      </section>

      {/* Main grid */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[250px_minmax(0,1fr)_260px]">
        {/* Timeline */}
        <aside className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
          <h3 className="text-[1.75rem] font-bold tracking-[-0.03em] text-slate-950">
            Timeline
          </h3>
          <p className="mb-5 text-[1.05rem] text-slate-700">
            Línea de Tiempo del Proceso
          </p>

          <div className="space-y-5">
            {processDetail.timeline.map((item, index) => (
              <div key={item.title} className="relative flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B7F8A] text-white shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  {index < processDetail.timeline.length - 1 ? (
                    <div className="absolute top-8 h-[54px] w-[2px] bg-[#0B7F8A]" />
                  ) : null}
                </div>

                <div>
                  <p className="text-[1.1rem] font-medium leading-tight text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center content */}
        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-300 bg-white shadow-sm">
            <div className="flex flex-wrap items-center gap-8 border-b border-slate-200 px-5 pt-4">
              <TabButton
                label="General"
                isActive={activeTab === "general"}
                onClick={() => setActiveTab("general")}
              />
              <TabButton
                label="Requisitos"
                isActive={activeTab === "requisitos"}
                onClick={() => setActiveTab("requisitos")}
              />
              <TabButton
                label="Responsables"
                isActive={activeTab === "responsables"}
                onClick={() => setActiveTab("responsables")}
              />
              <TabButton
                label="Pipeline"
                isActive={activeTab === "pipeline"}
                onClick={() => setActiveTab("pipeline")}
              />
              <TabButton
                label="Actividad Reciente"
                isActive={activeTab === "actividad"}
                onClick={() => setActiveTab("actividad")}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 xl:grid-cols-2">
              <div>
                {activeTab === "general" && (
                  <>
                    <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                      Información General
                    </h4>
                    <div className="space-y-1 text-[1.05rem] text-slate-800">
                      <p>
                        <span className="font-medium">Área:</span> {processDetail.area}
                      </p>
                      <p>
                        <span className="font-medium">Tipo:</span>{" "}
                        {processDetail.processType}
                      </p>
                      <p>
                        <span className="font-medium">Ubicación:</span>{" "}
                        {processDetail.location}
                      </p>
                      <p>
                        <span className="font-medium">Salario:</span>{" "}
                        {processDetail.salaryText}
                      </p>
                      <p>
                        <span className="font-medium">Rango:</span>{" "}
                        {processDetail.salaryRange}
                      </p>
                    </div>

                    <p className="mt-5 text-[1.05rem] leading-relaxed text-slate-800">
                      {processDetail.description}
                    </p>
                  </>
                )}

                {activeTab === "requisitos" && (
                  <>
                    <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                      Requisitos
                    </h4>
                    <ul className="list-disc space-y-2 pl-6 text-[1.05rem] text-slate-800">
                      {processDetail.requirements.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activeTab === "responsables" && (
                  <>
                    <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                      Responsables del Proceso
                    </h4>
                    <div className="space-y-4 text-[1.05rem] text-slate-800">
                      <p>
                        <span className="font-medium">Selección:</span>{" "}
                        {processDetail.recruiter.name}
                      </p>
                      <div>
                        <p className="font-medium">Revisoría asignada:</p>
                        <ul className="mt-2 list-disc space-y-1 pl-6">
                          {processDetail.reviewers.map((reviewer) => (
                            <li key={reviewer}>{reviewer}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "pipeline" && (
                  <>
                    <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                      Resumen del Pipeline
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {processDetail.pipelineSummary.map((item) => (
                        <span
                          key={item.label}
                          className={`rounded-md px-3 py-1 text-sm font-medium ${pipelineBadgeClasses(
                            item.variant,
                          )}`}
                        >
                          {item.label}: {item.value}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === "actividad" && (
                  <>
                    <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                      Actividad Reciente
                    </h4>
                    <ul className="space-y-3 text-[1.05rem] text-slate-800">
                      {processDetail.recentActivity.map((activity) => (
                        <li
                          key={activity}
                          className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                        >
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div>
                <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                  Responsable del Proceso
                </h4>

                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8D7D7] text-[#904E4E]">
                    <UserCircle2 className="h-9 w-9" />
                  </div>

                  <div className="text-[1.05rem] text-slate-800">
                    <p>
                      <span className="font-medium">HR/Selección:</span>
                    </p>
                    <p className="font-semibold text-slate-950">
                      {processDetail.recruiter.name}
                    </p>

                    <div className="mt-4">
                      <p className="font-medium">Revisores Asignados</p>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        {processDetail.reviewers.map((reviewer) => (
                          <li key={reviewer}>{reviewer}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
              <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                Requisitos
              </h4>
              <ul className="list-disc space-y-2 pl-6 text-[1.05rem] text-slate-800">
                {processDetail.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
                <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                  Resumen del Pipeline
                </h4>

                <div className="flex flex-wrap gap-2">
                  {processDetail.pipelineSummary.map((item) => (
                    <span
                      key={item.label}
                      className={`rounded-md px-3 py-1 text-sm font-medium ${pipelineBadgeClasses(
                        item.variant,
                      )}`}
                    >
                      {item.label}: {item.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
                <h4 className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                  Actividad Reciente
                </h4>

                <div className="space-y-2 text-[1.05rem] text-slate-800">
                  {processDetail.recentActivity.map((activity) => (
                    <p key={activity}>{activity}</p>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right panel */}
        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <h3 className="text-[1.75rem] font-bold tracking-[-0.03em] text-slate-950">
              Acciones y Resumen
            </h3>

            <div className="mt-5">
              <p className="mb-3 text-[1.1rem] font-medium text-slate-900">
                Accesos Rápidos
              </p>

              <div className="space-y-3">
                <QuickLink
                  href="/procesos/101/candidatos"
                  icon={<Users className="h-4 w-4" />}
                  label="Ver Candidatos (15)"
                />
                <QuickLink
                  href="/procesos/entrevistas"
                  icon={<MessageSquareText className="h-4 w-4" />}
                  label="Ver Entrevistas (8)"
                />
                <QuickLink
                  href="/evaluaciones"
                  icon={<ClipboardList className="h-4 w-4" />}
                  label="Ver Evaluaciones (4)"
                />
                <QuickLink
                  href="/procesos/101/comentarios"
                  icon={<MessageSquareText className="h-4 w-4" />}
                  label="Ver Comentarios (10)"
                />
                <QuickLink
                  href="/procesos/historial"
                  icon={<FileText className="h-4 w-4" />}
                  label="Ver Historial (3)"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <h3 className="text-[1.55rem] font-bold tracking-[-0.03em] text-slate-950">
              Resumen Actividad / Candidato Destacado
            </h3>

            <div className="mt-5">
              <p className="text-[1.05rem] font-medium text-slate-900">
                Candidato Finalista Destacado
              </p>

              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8D7D7] text-[#904E4E]">
                  <UserCircle2 className="h-9 w-9" />
                </div>

                <div className="text-[1.05rem] text-slate-800">
                  <p className="font-semibold text-slate-950">
                    {processDetail.highlightedCandidate.name}
                  </p>
                  <p className="mt-2">
                    Score Promedio:{" "}
                    <span className="font-semibold text-[#A44949]">
                      {processDetail.highlightedCandidate.score}
                    </span>
                  </p>
                  <p>
                    Estado:{" "}
                    <span className="font-medium text-[#2F9E44]">
                      {processDetail.highlightedCandidate.status}
                    </span>
                  </p>
                </div>
              </div>

              <Link
                href="/procesos/101/candidatos"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#0B7F8A] bg-white px-4 text-sm font-semibold text-[#0B7F8A] transition hover:bg-[#f2fbfc]"
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Ver Perfil Candidato
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-4 text-[1.05rem] font-medium transition ${
        isActive ? "text-slate-950" : "text-slate-700 hover:text-slate-950"
      }`}
    >
      {label}
      {isActive ? (
        <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#17A9BB]" />
      ) : null}
    </button>
  );
}

function QuickLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#0B7F8A] bg-white px-4 text-sm font-semibold text-[#0B7F8A] transition hover:bg-[#f2fbfc]"
    >
      {icon}
      {label}
    </Link>
  );
}