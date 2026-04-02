"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginUseCase } from "../../application/login.use-case";

export function LoginView() {
  const router = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!usernameOrEmail.trim() || !password.trim()) {
      setError("Debes completar usuario y contraseña.");
      return;
    }

    try {
      setIsSubmitting(true);

      await loginUseCase({
        usernameOrEmail,
        password,
        remember,
      });

      router.push("/home");
      router.refresh();
    } catch {
      setError("El usuario o la contraseña son incorrectos.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#83AEE4_0%,#A9C8EE_45%,#C6DBF5_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[18%] h-[2px] w-[55%] rotate-[-10deg] bg-white/35 blur-[1px]" />
        <div className="absolute left-[-8%] top-[34%] h-[2px] w-[62%] rotate-[8deg] bg-white/40 blur-[1px]" />
        <div className="absolute left-[48%] top-[22%] h-[2px] w-[40%] rotate-[-20deg] bg-white/35 blur-[1px]" />
        <div className="absolute left-[55%] top-[32%] h-[2px] w-[45%] rotate-[-8deg] bg-white/40 blur-[1px]" />
        <div className="absolute left-[62%] top-[44%] h-[2px] w-[35%] rotate-[6deg] bg-white/35 blur-[1px]" />

        <div className="absolute left-[13%] top-[47%] h-2 w-2 rounded-full bg-white/80 shadow-[0_0_20px_8px_rgba(255,255,255,0.45)]" />
        <div className="absolute left-[72%] top-[30%] h-2 w-2 rounded-full bg-white/80 shadow-[0_0_20px_8px_rgba(255,255,255,0.45)]" />
        <div className="absolute right-[8%] top-[83%] text-white/60">
          <div className="relative h-10 w-10 rotate-45 rounded-sm border border-white/30">
            <div className="absolute inset-2 rounded-sm border border-white/20" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <Card className="w-full max-w-[460px] rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-sm">
          <CardContent className="px-8 py-7">
            <div className="mb-7 flex flex-col items-center text-center">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl">
                  <div className="relative h-12 w-12">
                    <div className="absolute left-0 top-0 h-7 w-7 rounded-tl-[18px] rounded-br-[18px] bg-[#0B2A78]" />
                    <div className="absolute bottom-0 right-0 h-7 w-7 rounded-tl-[18px] rounded-br-[18px] bg-[#0B2A78]" />
                    <div className="absolute left-[10px] top-[10px] h-7 w-7 rounded-full border-[7px] border-white" />
                  </div>
                </div>

                <div className="text-left leading-tight">
                  <p className="text-[13px] font-medium uppercase tracking-[0.02em] text-slate-800">
                    Soluciones de
                  </p>
                  <p className="text-[13px] font-medium uppercase tracking-[0.02em] text-slate-800">
                    Recursos Humanos
                  </p>
                  <p className="mt-1 text-[16px] font-bold text-slate-950">
                    Inducom Selección
                  </p>
                </div>
              </div>

              <h1 className="text-[22px] font-extrabold tracking-[-0.02em] text-slate-950">
                Acceso Seguro a Inducom Selección
              </h1>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-[15px] font-medium text-slate-900"
                >
                  Usuario o Correo Electrónico
                </label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
                  <Input
                    id="username"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="Nombre de Usuario o Correo"
                    className="h-12 rounded-xl border-slate-300 bg-[#FAFAFA] pl-12 text-[15px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#0B2A78]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-[15px] font-medium text-slate-900"
                >
                  Contraseña
                </label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="h-12 rounded-xl border-slate-300 bg-[#FAFAFA] pl-12 text-[15px] placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#0B2A78]"
                  />
                </div>
              </div>

              {error ? (
                <div className="ml-auto w-full max-w-[290px] rounded-md border border-[#F3B3B3] bg-[#FDEBEC] px-3 py-2 text-[#B54747]">
                  <div className="flex items-center gap-2 text-[14px]">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="flex items-center gap-2 text-[15px] text-slate-800">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#0B2A78] focus:ring-[#0B2A78]"
                  />
                  <span>Recordarme</span>
                </label>

                <button
                  type="button"
                  className="text-[15px] font-medium text-slate-700 transition hover:text-[#0B2A78]"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 w-full rounded-full bg-[#0B2A78] text-[16px] font-bold text-white shadow-[0_8px_18px_rgba(11,42,120,0.28)] transition hover:bg-[#09225F] disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ingresando...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-700">Credenciales mock</p>
              <p>Recruiter: agarcia / 123456</p>
              <p>Reviewer: cruiz / 123456</p>
              <p>Admin: admin / admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}