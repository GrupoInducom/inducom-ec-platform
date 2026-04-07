"use client";

import { useState } from "react";
import { SubmitApplicationUseCase } from "@/src/modules/landing/application/submit-application.use-case";
import { ApplicationArea, CandidateApplication } from "@/src/modules/landing/domain/candidate-application.entity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, UploadCloud } from "lucide-react";

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
  });
  const [area, setArea] = useState<ApplicationArea | "">("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      if (!area || !cvFile) {
        throw new Error("Por favor completa el área de interés y adjunta tu CV.");
      }

      const application: CandidateApplication = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        area: area as ApplicationArea,
        cvFile: cvFile,
      };

      const useCase = new SubmitApplicationUseCase();
      await useCase.execute(application);

      setIsSuccess(true);
    } catch (error: any) {
      setErrorMsg(error.message || "Ocurrió un error al enviar tu postulación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-teal-50/50 rounded-2xl border border-teal-100">
        <CheckCircle2 className="w-16 h-16 text-[#008080] mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Gracias por postular!</h3>
        <p className="text-gray-600 max-w-md">
          Tu perfil entrará en revisión por nuestro equipo de RRHH. Te notificaremos por correo si tu cuenta es activada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
      
      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-700 font-medium">Nombre Completo <span className="text-red-500">*</span></Label>
          <Input 
            required 
            id="fullName" 
            name="fullName" 
            placeholder="Ej. Juan Pérez" 
            value={formData.fullName} 
            onChange={handleInputChange}
            className="focus-visible:ring-[#008080] focus-visible:border-[#008080] rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">Correo Electrónico <span className="text-red-500">*</span></Label>
            <Input 
              required 
              type="email" 
              id="email" 
              name="email" 
              placeholder="tu@email.com" 
              value={formData.email} 
              onChange={handleInputChange}
              className="focus-visible:ring-[#008080] focus-visible:border-[#008080] rounded-xl"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 font-medium">Teléfono <span className="text-red-500">*</span></Label>
            <Input 
              required 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="+593 999 999 999" 
              value={formData.phone} 
              onChange={handleInputChange}
              className="focus-visible:ring-[#008080] focus-visible:border-[#008080] rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LinkedIn (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-gray-700 font-medium">Perfil de LinkedIn <span className="text-gray-400 font-normal text-xs">(Opcional)</span></Label>
            <Input 
              type="url" 
              id="linkedin" 
              name="linkedin" 
              placeholder="https://linkedin.com/in/tu-perfil" 
              value={formData.linkedin} 
              onChange={handleInputChange}
              className="focus-visible:ring-[#008080] focus-visible:border-[#008080] rounded-xl"
            />
          </div>

          {/* Area de Interés */}
          <div className="space-y-2">
            <Label htmlFor="area" className="text-gray-700 font-medium">Área de interés <span className="text-red-500">*</span></Label>
            <Select required value={area} onValueChange={(value: string) => setArea(value as ApplicationArea)}>
              <SelectTrigger className="focus:ring-[#008080] focus-visible:ring-[#008080] rounded-xl bg-white">
                <SelectValue placeholder="Selecciona un área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tech">Tecnología (Tech)</SelectItem>
                <SelectItem value="Ops">Operaciones (Ops)</SelectItem>
                <SelectItem value="RRHH">Recursos Humanos (RRHH)</SelectItem>
                <SelectItem value="Admin">Administrativo (Admin)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* CV Upload */}
        <div className="space-y-2 pt-2">
          <Label htmlFor="cvFile" className="text-gray-700 font-medium">Adjuntar CV (PDF) <span className="text-red-500">*</span></Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#008080] transition-colors relative group bg-gray-50">
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400 group-hover:text-[#008080] transition-colors" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="cvFile"
                  className="relative cursor-pointer rounded-md font-medium text-[#008080] hover:text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#008080]"
                >
                  <span>Sube un archivo</span>
                  <input id="cvFile" name="cvFile" type="file" accept=".pdf" className="sr-only" required onChange={handleFileChange} />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-500">PDF hasta 5MB</p>
            </div>
          </div>
          {cvFile && (
            <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Archivo adjuntado: <strong>{cvFile.name}</strong>
            </div>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {errorMsg}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full h-12 text-base font-bold bg-inducom-orange hover:bg-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          "Postular Ahora"
        )}
      </Button>
    </form>
  );
}
