import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-[#475569] mb-4" />
      <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{title}</h3>
      <p className="text-sm text-[#475569] mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-[#0B1F5F] hover:bg-[#08143D]">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
