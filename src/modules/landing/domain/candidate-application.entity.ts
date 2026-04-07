export type ApplicationArea = "Tech" | "Ops" | "RRHH" | "Admin";

export interface CandidateApplication {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  area: ApplicationArea;
  cvFile: File;
}
