"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUseCase } from "@/src/modules/auth/application/logout.use-case";
import { TopNavbar } from "@/src/components/layout/top-navbar";
import { ThemeToggle } from "@/src/components/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await logoutUseCase();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <header className="sticky top-0 z-40 border-b border-border bg-[#0A5F6B] dark:bg-[#074650] text-white shadow-sm transition-colors">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-bold">
              <div className="h-8 w-8 rounded-full bg-white/20" />
              <span>Inducom</span>
            </div>

            <TopNavbar />
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <button className="rounded-full p-2 hover:bg-white/10 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            <button className="rounded-full p-2 hover:bg-white/10 transition-colors">
              <Bell className="h-5 w-5" />
            </button>

            <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 md:flex">
              <div className="h-8 w-8 rounded-full bg-white/30" />
              <span className="text-sm font-medium">Ana García</span>
            </div>
            

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-6">{children}</main>
    </div>
  );
}