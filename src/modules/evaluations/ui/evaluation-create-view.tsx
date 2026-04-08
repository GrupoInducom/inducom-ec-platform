"use client";

import { useState } from "react";
import {
  ChevronDown,
  Eye,
  GripVertical,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

type EvaluationType =
  | "psicometrica"
  | "tecnica"
  | "idioma"
  | "cultura"
  | "personalizada";

type QuestionType =
  | "seleccion_unica"
  | "seleccion_multiple"
  | "abierta"
  | "verdadero_falso";

type EvaluationSection = {
  id: number;
  title: string;
};

type EvaluationQuestion = {
  id: number;
  questionType: QuestionType;
  prompt: string;
  score: number;
};

const INITIAL_SECTIONS: EvaluationSection[] = [
  { id: 1, title: "SECCIÓN 1: React Fundamentals" },
  { id: 2, title: "SECCIÓN 2: Node.js Integration" },
  { id: 3, title: "SECCIÓN 3: Problem Solving" },
];

const INITIAL_QUESTIONS: EvaluationQuestion[] = [
  {
    id: 1,
    questionType: "seleccion_unica",
    prompt: "",
    score: 10,
  },
];

function questionTypeLabel(type: QuestionType) {
  const map: Record<QuestionType, string> = {
    seleccion_unica: "Opción Múltiple",
    seleccion_multiple: "Selección Múltiple",
    abierta: "Respuesta Abierta",
    verdadero_falso: "Verdadero / Falso",
  };

  return map[type];
}

export function EvaluationCreateView() {
  const [title, setTitle] = useState("");
  const [evaluationType, setEvaluationType] =
    useState<EvaluationType>("tecnica");
  const [duration, setDuration] = useState("");
  const [maxScore, setMaxScore] = useState("100");
  const [approvalScore, setApprovalScore] = useState("70");
  const [instructions, setInstructions] = useState("");
  const [sections, setSections] =
    useState<EvaluationSection[]>(INITIAL_SECTIONS);
  const [questions, setQuestions] =
    useState<EvaluationQuestion[]>(INITIAL_QUESTIONS);

  function addSection() {
    const nextNumber = sections.length + 1;

    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `SECCIÓN ${nextNumber}: Nueva Sección`,
      },
    ]);
  }

  function removeSection(sectionId: number) {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  }

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        questionType: "seleccion_unica",
        prompt: "",
        score: 10,
      },
    ]);
  }

  function updateQuestion(
    questionId: number,
    field: keyof EvaluationQuestion,
    value: string | number,
  ) {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? { ...question, [field]: value }
          : question,
      ),
    );
  }

  function duplicateQuestion(questionId: number) {
    const target = questions.find((question) => question.id === questionId);
    if (!target) return;

    setQuestions((prev) => [
      ...prev,
      {
        ...target,
        id: Date.now(),
      },
    ]);
  }

  function removeQuestion(questionId: number) {
    setQuestions((prev) => prev.filter((question) => question.id !== questionId));
  }

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
            <span className="text-slate-400">&gt;</span>
            <span>Nueva Evaluación</span>
          </nav>

          <h1 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-slate-950">
            Crear Nueva Evaluación
          </h1>
        </div>

        <button
          type="button"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0B7F8A] px-5 text-sm font-semibold text-white transition hover:bg-[#086d76]"
        >
          <Eye className="h-4 w-4" />
          Previsualizar Evaluación
        </button>
      </div>

      <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
        <div className="space-y-8">
          {/* Bloque 1 */}
          <div>
            <h2 className="mb-5 text-[2rem] font-bold tracking-[-0.03em] text-slate-950">
              1. Información General
            </h2>

            <div className="grid grid-cols-1 gap-x-10 gap-y-4 xl:grid-cols-2">
              <div className="space-y-4">
                <FormRow label="Nombre de la Evaluación">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ej. Prueba de React Senior"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                  />
                </FormRow>

                <FormRow label="Tipo de Evaluación">
                  <SelectBox
                    value={evaluationType}
                    onChange={(value) => setEvaluationType(value as EvaluationType)}
                    options={[
                      { value: "tecnica", label: "Técnica" },
                      { value: "psicometrica", label: "Psicométrica" },
                      { value: "idioma", label: "Idioma" },
                      { value: "cultura", label: "Cultura" },
                      { value: "personalizada", label: "Personalizada" },
                    ]}
                  />
                </FormRow>

                <FormRow label="Criterio de Aprobación">
                  <input
                    value={approvalScore}
                    onChange={(e) => setApprovalScore(e.target.value)}
                    placeholder="ej. 70"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                  />
                </FormRow>
              </div>

              <div className="space-y-4">
                <FormRow label="Duración (min)">
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="ej. 60"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                  />
                </FormRow>

                <FormRow label="Puntaje Total">
                  <input
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    placeholder="ej. 100"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                  />
                </FormRow>

                <FormRow label="Instrucciones Generales" alignStart>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                  />
                </FormRow>
              </div>
            </div>
          </div>

          {/* Bloque 2 */}
          <div className="border-t border-slate-200 pt-6">
            <h2 className="mb-5 text-[2rem] font-bold tracking-[-0.03em] text-slate-950">
              2. Configuración de Preguntas y Secciones
            </h2>

            <div className="mb-5 flex flex-wrap items-center gap-2">
              {sections.map((section, index) => (
                <div key={section.id} className="flex items-center">
                  <div className="relative flex h-12 items-center gap-2 rounded-l-xl rounded-r-md bg-[#0A8C95] px-4 text-white shadow-sm">
                    <GripVertical className="h-4 w-4 text-white/80" />
                    <span className="whitespace-nowrap text-sm font-semibold">
                      {section.title}
                    </span>

                    <button
                      type="button"
                      className="rounded-md bg-white/15 p-1 transition hover:bg-white/20"
                      title="Agregar subbloque"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>

                    {sections.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="rounded-md bg-white/15 p-1 transition hover:bg-white/20"
                        title="Eliminar sección"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </div>

                  {index < sections.length - 1 ? (
                    <div className="h-0 w-0 border-b-[24px] border-l-[18px] border-t-[24px] border-b-transparent border-l-[#0A8C95] border-t-transparent" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-300 bg-[#F3FBFC] p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-[1.5rem] font-bold tracking-[-0.03em] text-slate-950">
                  Preguntas ({questions.length})
                </h3>

                <button
                  type="button"
                  onClick={addQuestion}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#0B7F8A] px-4 text-sm font-semibold text-white transition hover:bg-[#086d76]"
                >
                  <Plus className="h-4 w-4" />
                  Añadir Pregunta
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="grid grid-cols-1 gap-4 rounded-xl border border-slate-300 bg-white p-4 xl:grid-cols-[220px_minmax(0,1fr)_100px_180px]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Tipo de Pregunta
                      </label>
                      <SelectBox
                        value={question.questionType}
                        onChange={(value) =>
                          updateQuestion(
                            question.id,
                            "questionType",
                            value as QuestionType,
                          )
                        }
                        options={[
                          {
                            value: "seleccion_unica",
                            label: questionTypeLabel("seleccion_unica"),
                          },
                          {
                            value: "seleccion_multiple",
                            label: questionTypeLabel("seleccion_multiple"),
                          },
                          { value: "abierta", label: questionTypeLabel("abierta") },
                          {
                            value: "verdadero_falso",
                            label: questionTypeLabel("verdadero_falso"),
                          },
                        ]}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Pregunta
                      </label>
                      <input
                        value={question.prompt}
                        onChange={(e) =>
                          updateQuestion(question.id, "prompt", e.target.value)
                        }
                        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#17A9BB]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Puntaje
                      </label>
                      <input
                        value={question.score}
                        onChange={(e) =>
                          updateQuestion(
                            question.id,
                            "score",
                            Number(e.target.value || 0),
                          )
                        }
                        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-[#17A9BB]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Acciones
                      </label>
                      <div className="flex h-12 items-center gap-4 text-sm">
                        <button
                          type="button"
                          className="font-medium text-[#0B7F8A] hover:underline"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateQuestion(question.id)}
                          className="font-medium text-[#0B7F8A] hover:underline"
                        >
                          Duplicar
                        </button>
                        <button
                          type="button"
                          onClick={() => removeQuestion(question.id)}
                          className="font-medium text-[#B54747] hover:underline"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addSection}
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl border border-[#0A8C95] bg-white px-4 text-sm font-semibold text-[#0A8C95] transition hover:bg-[#f2fbfc]"
              >
                <Plus className="h-4 w-4" />
                Añadir Sección
              </button>
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
              Publicar / Activar Evaluación
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
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-[210px_minmax(0,1fr)] xl:items-center">
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