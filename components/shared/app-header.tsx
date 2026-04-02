import { Bell, User } from "lucide-react";
import { Button } from "../ui/button";

export function AppHeader() {
  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-3 flex justify-between items-center">
      <div className="text-[#0F172A] font-semibold">Bienvenido, Usuario</div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <Bell size={18} />
        </Button>
        <Button variant="ghost" size="sm">
          <User size={18} />
        </Button>
      </div>
    </header>
  );
} 