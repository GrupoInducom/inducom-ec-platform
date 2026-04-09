import { ProcessEditView } from "@/src/modules/selection-process/ui/selection-process-edit";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProcessPage({ params }: PageProps) {
  const { id } = await params;

  return <ProcessEditView processId={id} />;
}