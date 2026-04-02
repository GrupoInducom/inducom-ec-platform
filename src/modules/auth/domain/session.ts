export type UserRole = "admin" | "recruiter" | "reviewer" | "candidate";

export interface AuthSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}