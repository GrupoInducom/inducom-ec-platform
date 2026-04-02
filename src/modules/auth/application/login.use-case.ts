import type { AuthSession } from "../domain/session";
import { authRepository } from "../infrastructure/auth.repository";

export interface LoginInput {
  usernameOrEmail: string;
  password: string;
  remember: boolean;
}

export async function loginUseCase(input: LoginInput): Promise<AuthSession> {
  return authRepository.login(input);
}