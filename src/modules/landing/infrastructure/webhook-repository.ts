import { CandidateApplication } from "../domain/candidate-application.entity";

export class WebhookRepository {
  async send(application: CandidateApplication): Promise<void> {
    // Simulando el envío a un Webhook / n8n
    console.log("Mock WebhookRepository: Enviando aplicación", {
      fullName: application.fullName,
      email: application.email,
      phone: application.phone,
      linkedin: application.linkedin,
      area: application.area,
      cvFileName: application.cvFile.name,
      cvFileSize: application.cvFile.size,
      cvFileType: application.cvFile.type,
    });

    // Simulando retraso de red
    return new Promise((resolve) => setTimeout(resolve, 1500));
  }
}
