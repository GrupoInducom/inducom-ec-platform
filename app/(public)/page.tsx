import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainShell } from "@/components/layout/main-shell";

export default function HomePage() {
  return (
    <MainShell>
      <section className="grid gap-6 lg:grid-cols-2 items-center">
        <div className="space-y-5">
          <span className="inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Next.js + shadcn/ui + Hexagonal liviana
          </span>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Portal de RRHH moderno, modular y escalable
          </h1>

          <p className="text-muted-foreground max-w-xl leading-7">
            Base funcional con App Router, diseño limpio tipo V0 y una separación clara
            entre dominio, aplicación e infraestructura.
          </p>

          <div className="flex gap-3">
            <Button asChild className="rounded-xl">
              <Link href="/vacancies">Ver vacantes</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/vacancies/vac-001">Ver ejemplo detalle</Link>
            </Button>
          </div>
        </div>

        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Qué ya resuelve esta base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Estructura modular por contexto de negocio</p>
            <p>• Casos de uso desacoplados</p>
            <p>• Repositorios intercambiables</p>
            <p>• UI reusable con shadcn</p>
            <p>• Lista y detalle listos para crecer a Supabase o API real</p>
          </CardContent>
        </Card>
      </section>
    </MainShell>
  );
}