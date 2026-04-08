"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";

type QuestionType =
  | "seleccion_unica"
  | "seleccion_multiple"
  | "abierta"
  | "verdadero_falso";

type EvaluationQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: Array<{
    id: string;
    label: string;
  }>;
};

const evaluationData = {
  title: "Prueba de React Senior",
  instructions:
    "Lee cuidadosamente cada pregunta antes de responder. La prueba debe completarse dentro del tiempo disponible. Una vez enviada, no podrás modificar tus respuestas.",
  durationLabel: "45:00 min restantes",
  questions: [
    {
      id: "q1",
      type: "seleccion_unica" as const,
      prompt: "¿Cuál hook se usa para manejar estado local en React?",
      options: [
        { id: "q1o1", label: "useFetch" },
        { id: "q1o2", label: "useState" },
        { id: "q1o3", label: "useMemo" },
        { id: "q1o4", label: "useServer" },
      ],
    },
    {
      id: "q2",
      type: "verdadero_falso" as const,
      prompt: "React permite renderizar componentes condicionalmente.",
      options: [
        { id: "q2o1", label: "Verdadero" },
        { id: "q2o2", label: "Falso" },
      ],
    },
    {
      id: "q3",
      type: "abierta" as const,
      prompt:
        "Explica brevemente una diferencia práctica entre useMemo y useCallback.",
    },
    {
      id: "q4",
      type: "seleccion_multiple" as const,
      prompt: "Selecciona ventajas comunes de TypeScript en frontend.",
      options: [
        { id: "q4o1", label: "Tipado estático" },
        { id: "q4o2", label: "Mayor claridad en contratos" },
        { id: "q4o3", label: "Reemplaza HTML" },
        { id: "q4o4", label: "Mejor autocompletado" },
      ],
    },
  ] satisfies EvaluationQuestion[],
};

type AnswersState = Record<string, string | string[]>;

export function CandidateEvaluationSolveView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = evaluationData.questions[currentIndex];
  const totalQuestions = evaluationData.questions.length;

  const progress = useMemo(() => {
    return Math.round(((currentIndex + 1) / totalQuestions) * 100);
  }, [currentIndex, totalQuestions]);

  function setSingleAnswer(questionId: string, optionId: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  }

  function setMultipleAnswer(questionId: string, optionId: string) {
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      const exists = current.includes(optionId);

      return {
        ...prev,
        [questionId]: exists
          ? current.filter((item) => item !== optionId)
          : [...current, optionId],
      };
    });
  }

  function setOpenAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function goPrevious() {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  }

  function goNext() {
    if (currentIndex >= totalQuestions - 1) return;
    setCurrentIndex((prev) => prev + 1);
  }

  function handleSubmit() {
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <section className="rounded-3xl border border-slate-200 bg-white px-8 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF8EC] text-[#16A34A]">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-slate-950">
              Evaluación enviada correctamente
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Hemos recibido tus respuestas. Tu evaluación quedó registrada
              correctamente y será revisada por el equipo responsable del proceso.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
              Gracias por completar la prueba. Ya puedes cerrar esta ventana.
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#0B7F8A]">Evaluación asignada</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-slate-950">
                {evaluationData.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {evaluationData.instructions}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#EAF2FB] px-4 py-3 text-sm font-semibold text-[#163E73]">
              <Clock3 className="h-4 w-4" />
              {evaluationData.durationLabel}
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Pregunta {currentIndex + 1} de {totalQuestions}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Progreso general de la evaluación
              </p>
            </div>

            <div className="min-w-[220px]">
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#0B8A8C] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-right text-sm font-semibold text-slate-700">
                {progress}%
              </p>
            </div>
          </div>
        </section>

        {/* Question */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-950">
              {currentQuestion.prompt}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.type === "seleccion_unica" &&
              currentQuestion.options?.map((option) => {
                const selected = answers[currentQuestion.id] === option.id;

                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition ${
                      selected
                        ? "border-[#0B8A8C] bg-[#F0FBFB]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      checked={selected}
                      onChange={() =>
                        setSingleAnswer(currentQuestion.id, option.id)
                      }
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-slate-800">{option.label}</span>
                  </label>
                );
              })}

            {currentQuestion.type === "verdadero_falso" &&
              currentQuestion.options?.map((option) => {
                const selected = answers[currentQuestion.id] === option.id;

                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition ${
                      selected
                        ? "border-[#0B8A8C] bg-[#F0FBFB]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      checked={selected}
                      onChange={() =>
                        setSingleAnswer(currentQuestion.id, option.id)
                      }
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-slate-800">{option.label}</span>
                  </label>
                );
              })}

            {currentQuestion.type === "seleccion_multiple" &&
              currentQuestion.options?.map((option) => {
                const current = Array.isArray(answers[currentQuestion.id])
                  ? answers[currentQuestion.id]
                  : [];
                const selected = current.includes(option.id);

                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition ${
                      selected
                        ? "border-[#0B8A8C] bg-[#F0FBFB]"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        setMultipleAnswer(currentQuestion.id, option.id)
                      }
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-slate-800">{option.label}</span>
                  </label>
                );
              })}

            {currentQuestion.type === "abierta" && (
              <textarea
                value={
                  typeof answers[currentQuestion.id] === "string"
                    ? (answers[currentQuestion.id] as string)
                    : ""
                }
                onChange={(e) =>
                  setOpenAnswer(currentQuestion.id, e.target.value)
                }
                rows={7}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0B8A8C]"
              />
            )}
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={goPrevious}
            disabled={currentIndex === 0}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </button>

          <div className="flex flex-col gap-3 md:flex-row">
            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#0B8A8C] px-6 text-sm font-semibold text-white transition hover:bg-[#086d6e]"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#16A34A] px-6 text-sm font-semibold text-white transition hover:bg-[#13823b]"
              >
                Enviar evaluación
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}