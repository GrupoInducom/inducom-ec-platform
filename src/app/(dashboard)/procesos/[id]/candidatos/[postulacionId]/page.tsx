import { CandidateEditView } from "@/src/modules/candidates/ui/process-candidate-edit";

type PageProps = {
  params: Promise<{
    id: string;
    postulacionId: string;
  }>;
};

export default async function CandidateDetailPage({ params }: PageProps) {
  const { id, postulacionId } = await params;

  return <CandidateEditView processId={id} postulacionId={postulacionId} />;
}