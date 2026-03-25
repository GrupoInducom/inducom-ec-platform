import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-semibold text-lg">
          Inducom RRHH
        </Link>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/">Inicio</Link>
          <Link href="/vacancies">Vacantes</Link>
        </nav>
      </div>
    </header>
  );
} 