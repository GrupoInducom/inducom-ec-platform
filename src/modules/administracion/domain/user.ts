export type UserRole = "administrador" | "seleccion" | "revisoria" | "candidato";
export type UserStatus = "activo" | "inactivo" | "bloqueado";

export interface AdminUser {
  id: string;
  correo: string;
  nombre_completo: string;
  rol: UserRole;
  estado: UserStatus;
  url_foto_perfil: string | null;
  ultimo_acceso_en: string | null;
  creado_en: string;
  actualizado_en: string;
}