import type { ReactNode } from "react";
import { AppHeader } from "../shared/app-header";
import { Sidebar } from "./sidebar";

interface Props {
  children: ReactNode;
  role?: "admin" | "rrhh" | "revisoria" | "candidato";
}

export function MainShell({ children, role }: Props) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}