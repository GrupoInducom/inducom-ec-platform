import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Briefcase, Users, FileText, Video, Settings } from "lucide-react";

interface SidebarProps {
  role?: "admin" | "rrhh" | "revisoria" | "candidato";
}

const menuItems = {
  candidato: [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/vacancies", label: "Vacantes", icon: Briefcase },
    { href: "/applications", label: "Mis Postulaciones", icon: FileText },
    { href: "/tests", label: "Pruebas", icon: Video },
  ],
  rrhh: [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/vacancies", label: "Vacantes", icon: Briefcase },
    { href: "/candidates", label: "Candidatos", icon: Users },
    { href: "/tests", label: "Pruebas", icon: Video },
  ],
  revisoria: [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/candidates", label: "Candidatos en Revisión", icon: Users },
    { href: "/traceability", label: "Trazabilidad", icon: FileText },
  ],
  admin: [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/users", label: "Usuarios", icon: Users },
    { href: "/settings", label: "Configuraciones", icon: Settings },
  ],
};

export function Sidebar({ role = "candidato" }: SidebarProps) {
  const items = menuItems[role];

  return (
    <aside className="w-64 bg-[#08143D] text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#F97316]">RRHH Portal</h2>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#0B1F5F] transition-colors",
              "text-sm"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}