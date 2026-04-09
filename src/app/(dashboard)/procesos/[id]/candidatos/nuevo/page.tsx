import { ProcessCandidateCreateView } from "@/src/modules/candidates/ui/process-candidate-create";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CreateCandidateByProcessPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <ProcessCandidateCreateView initialProcesoId={id} />;
}