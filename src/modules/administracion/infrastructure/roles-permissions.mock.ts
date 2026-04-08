import type { RolePermission } from "../domain/role-permission";

export const rolesPermissionsMock: RolePermission[] = [
  {
    rol: "administrador",
    permisos: {
      dashboard: {
        ver: true,
        crear: true,
        editar: true,
        eliminar: true,
        asignar: true,
      },
      procesos: {
        ver: true,
        crear: true,
        editar: true,
        eliminar: true,
        asignar: true,
      },
      evaluaciones: {
        ver: true,
        crear: true,
        editar: true,
        eliminar: true,
        asignar: true,
      },
      administracion: {
        ver: true,
        crear: true,
        editar: true,
        eliminar: true,
        asignar: true,
      },
    },
  },
  {
    rol: "seleccion",
    permisos: {
      dashboard: {
        ver: true,
        crear: false,
        editar: false,
        eliminar: false,
        asignar: false,
      },
      procesos: {
        ver: true,
        crear: true,
        editar: true,
        eliminar: false,
        asignar: true,
      },
      evaluaciones: {
        ver: true,
        crear: true,
        editar: true,
        eliminar: false,
        asignar: true,
      },
      administracion: {
        ver: false,
        crear: false,
        editar: false,
        eliminar: false,
        asignar: false,
      },
    },
  },
  {
    rol: "revisoria",
    permisos: {
      dashboard: { ver: true, crear: false, editar: false, eliminar: false, asignar: false },
      procesos: { ver: true, crear: false, editar: false, eliminar: false, asignar: false },
      evaluaciones: { ver: true, crear: false, editar: false, eliminar: false, asignar: false },
      administracion: { ver: false, crear: false, editar: false, eliminar: false, asignar: false },
    },
  },
  {
    rol: "candidato",
    permisos: {
      dashboard: { ver: false, crear: false, editar: false, eliminar: false, asignar: false },
      procesos: { ver: false, crear: false, editar: false, eliminar: false, asignar: false },
      evaluaciones: { ver: true, crear: false, editar: false, eliminar: false, asignar: false },
      administracion: { ver: false, crear: false, editar: false, eliminar: false, asignar: false },
    },
  },
];