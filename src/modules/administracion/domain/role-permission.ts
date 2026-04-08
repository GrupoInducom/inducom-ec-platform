export type UserRole = "administrador" | "seleccion" | "revisoria" | "candidato";

export type ModuleKey =
  | "dashboard"
  | "procesos"
  | "evaluaciones"
  | "administracion";

export type PermissionAction =
  | "ver"
  | "crear"
  | "editar"
  | "eliminar"
  | "asignar";

export type PermissionMatrix = Record<
  ModuleKey,
  Record<PermissionAction, boolean>
>;

export interface RolePermission {
  rol: UserRole;
  permisos: PermissionMatrix;
}