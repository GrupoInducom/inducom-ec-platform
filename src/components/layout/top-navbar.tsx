"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ClipboardList,
  FileText,
  LayoutGrid,
  Settings,
  Users,
  BriefcaseBusiness,
  HandCoins,
  MessagesSquare,
  History,
  ClipboardCheck,
  Brain,
  BarChart3,
  ShieldCheck,
  FileStack,
  SlidersHorizontal,
} from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type MegaMenuSection = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  megaMenu?: MegaMenuSection[];
};

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/home",
    icon: LayoutGrid,
  },
  {
    label: "Proceso de Selección",
    href: "/procesos",
    icon: ClipboardList,
    megaMenu: [
      {
        title: "PROCESO DE SELECCIÓN",
        icon: ClipboardList,
        items: [
          { label: "Vacantes", href: "/procesos", icon: BriefcaseBusiness },
          { label: "Candidatos", href: "/procesos/candidatos", icon: Users },
          { label: "Ofertas", href: "/procesos/ofertas", icon: HandCoins },
          { label: "Entrevistas", href: "/procesos/entrevistas", icon: MessagesSquare },
          { label: "Historial de Procesos", href: "/procesos/historial", icon: History },
        ],
      },
    ],
  },
  {
    label: "Evaluaciones",
    href: "/evaluaciones",
    icon: FileText,
    megaMenu: [
      {
        title: "EVALUACIONES",
        icon: ClipboardCheck,
        items: [
          { label: "Pruebas Técnicas", href: "/evaluaciones", icon: ClipboardCheck },
          { label: "Pruebas Psicométricas", href: "/evaluaciones/psicometricas", icon: Brain },
          { label: "Asignación", href: "/evaluaciones/asignacion", icon: LayoutGrid },
          { label: "Resultados", href: "/evaluaciones/resultados", icon: BarChart3 },
        ],
      },
    ],
  },
  {
    label: "Administración",
    href: "/administracion",
    icon: Settings,
    megaMenu: [
      {
        title: "ADMINISTRACIÓN",
        icon: ShieldCheck,
        items: [
          { label: "Usuarios", href: "/administracion/usuarios", icon: Users },
          { label: "Roles y Permisos", href: "/administracion/roles", icon: ShieldCheck },
          { label: "Plantillas", href: "/administracion/plantillas", icon: FileStack },
          { label: "Reportes", href: "/administracion/reportes", icon: BarChart3 },
          { label: "Configuración", href: "/administracion/configuracion", icon: SlidersHorizontal },
        ],
      },
    ],
  },
];

export function TopNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function handleMainClick(href: string) {
    setOpenMenu(null);
    router.push(href);
  }

  return (
    <div
      ref={navRef}
      className="relative hidden items-center gap-2 lg:flex"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        const hasMegaMenu = Boolean(item.megaMenu);

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasMegaMenu && setOpenMenu(item.label)}
            onMouseLeave={() => hasMegaMenu && setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => handleMainClick(item.href)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[#17A9BB] text-white shadow-sm"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              {hasMegaMenu ? <ChevronDown className="h-4 w-4" /> : null}
            </button>

            {hasMegaMenu && openMenu === item.label ? (
              <div className="absolute left-0 top-full z-50 min-w-[420px] pt-3">
                <MegaMenu sections={item.megaMenu!} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function MegaMenu({ sections }: { sections: MegaMenuSection[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
      <div className="grid gap-4">
        {sections.map((section) => {
          const SectionIcon = section.icon;

          return (
            <div key={section.title} className="min-w-[380px]">
              <div className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0A5F6B] shadow-sm">
                  <SectionIcon className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold tracking-wide text-slate-900">
                  {section.title}
                </span>
              </div>

              <div className="grid gap-1">
                {section.items.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <div className="flex items-center gap-3">
                        {ItemIcon ? <ItemIcon className="h-4 w-4 text-slate-500" /> : null}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown className="-rotate-90 h-4 w-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}