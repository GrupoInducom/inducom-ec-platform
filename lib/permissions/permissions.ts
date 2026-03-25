import type { UserRole } from "./roles";

export const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    "usuarios.ver",
    "usuarios.crear",
    "usuarios.editar",
    "usuarios.eliminar",
    "vacantes.ver",
    "vacantes.crear",
    "vacantes.editar",
    "pruebas.ver",
    "pruebas.crear",
    "resultados.ver",
    "configuracion.ver",
  ],
  rrhh: [
    "vacantes.ver",
    "vacantes.crear",
    "vacantes.editar",
    "candidatos.ver",
    "candidatos.crear",
    "asignaciones.crear",
    "pruebas.ver",
    "resultados.ver",
    "comentarios.crear",
  ],
  candidato: [
    "mi_proceso.ver",
    "pruebas_asignadas.ver",
    "pruebas.responder",
    "documentos.subir",
    "video.grabar",
  ],
  revisoria: [
    "resultados.ver",
    "finalistas.aprobar",
    "comentarios.crear",
  ],
};

export function hasPermission(role: UserRole, permission: string) {
  return rolePermissions[role]?.includes(permission) ?? false;
}