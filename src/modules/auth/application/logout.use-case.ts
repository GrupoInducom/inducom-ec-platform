import { authRepository } from "../infrastructure/auth.repository";

export async function logoutUseCase(): Promise<void> {
  await authRepository.logout();
}