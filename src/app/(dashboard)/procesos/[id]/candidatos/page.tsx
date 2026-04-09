import { ProcessCandidatesView } from "@/src/modules/candidates/ui/process-candidates-view";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProcessCandidatesByProcessPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <ProcessCandidatesView initialProcesoId={id} />;
}