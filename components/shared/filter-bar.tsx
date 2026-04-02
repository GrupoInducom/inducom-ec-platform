import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Filter } from "lucide-react";

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
  filters?: { key: string; label: string; options: { value: string; label: string }[] }[];
}

export function FilterBar({ onSearch, onFilter, filters = [] }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white p-4 rounded-lg border border-[#E2E8F0]">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#475569] h-4 w-4" />
        <Input
          placeholder="Buscar..."
          className="pl-10"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {filters.map((filter) => (
        <div key={filter.key} className="w-full sm:w-48">
          <label htmlFor={filter.key} className="sr-only">
            {filter.label}
          </label>
          <select
            id={filter.key}
            onChange={(event) => onFilter?.({ [filter.key]: event.target.value })}
            className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A]"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Más Filtros
      </Button>
    </div>
  );
}