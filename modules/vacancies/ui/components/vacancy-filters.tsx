import { Input } from "@/components/ui/input";

export function VacancyFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Input placeholder="Buscar por cargo o área..." className="rounded-xl" />
      <Input placeholder="Ubicación..." className="rounded-xl md:max-w-xs" />
    </div>
  );
}