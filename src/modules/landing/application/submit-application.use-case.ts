import { CandidateApplication } from "../domain/candidate-application.entity";
import { WebhookRepository } from "../infrastructure/webhook-repository";

export class SubmitApplicationUseCase {
  private repository: WebhookRepository;

  constructor(repository: WebhookRepository = new WebhookRepository()) {
    this.repository = repository;
  }

  async execute(application: CandidateApplication): Promise<void> {
    // Validaciones de negocio simples
    if (!application.fullName || !application.email || !application.phone || !application.area || !application.cvFile) {
      throw new Error("Faltan campos obligatorios");
    }
    
    // Correo válido?
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(application.email)) {
      throw new Error("Formato de email inválido");
    }

    // Se delega al repositorio de infraestructura
    await this.repository.send(application);
  }
}
