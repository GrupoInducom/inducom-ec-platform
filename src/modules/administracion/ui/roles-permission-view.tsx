"use client";

import * as React from "react";

import type {
  RolePermission,
  ModuleKey,
  PermissionAction,
} from "../domain/role-permission";

import { rolesPermissionsMock } from "../infrastructure/roles-permissions.mock";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const modules: ModuleKey[] = [
  "dashboard",
  "procesos",
  "evaluaciones",
  "administracion",
];

const actions: PermissionAction[] = [
  "ver",
  "crear",
  "editar",
  "eliminar",
  "asignar",
];

function getModuleLabel(module: ModuleKey) {
  switch (module) {
    case "dashboard":
      return "Dashboard";
    case "procesos":
      return "Procesos";
    case "evaluaciones":
      return "Evaluaciones";
    case "administracion":
      return "Administración";
  }
}

function getRoleLabel(role: string) {
  switch (role) {
    case "administrador":
      return "Admin";
    case "seleccion":
      return "HR";
    case "revisoria":
      return "Revisor";
    case "candidato":
      return "Candidato";
    default:
      return role;
  }
}

export function RolesPermissionsView() {
  const [selectedRole, setSelectedRole] =
    React.useState<RolePermission>(rolesPermissionsMock[0]);

  const togglePermission = (
    module: ModuleKey,
    action: PermissionAction
  ) => {
    setSelectedRole((prev) => ({
      ...prev,
      permisos: {
        ...prev.permisos,
        [module]: {
          ...prev.permisos[module],
          [action]: !prev.permisos[module][action],
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">
          Administración / Permisos / Gestión
        </p>
        <h1 className="text-3xl font-bold">
          Gestión de Roles y Permisos
        </h1>
      </div>

      {/* ROLES */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Roles</CardTitle>
          <Button>+ Crear nuevo rol</Button>
        </CardHeader>

        <CardContent className="flex gap-2 flex-wrap">
          {rolesPermissionsMock.map((role) => (
            <button
              key={role.rol}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-md text-foreground border dark:border-border dark:text-muted-foreground ${
                selectedRole.rol === role.rol
                  ? "bg-teal-600 text-foreground"
                  : "bg-white"  
              }`}
            >
              {getRoleLabel(role.rol)}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* MATRIZ */}
      <Card>
        <CardHeader>
          <CardTitle>Permisos por módulo</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border bg-card">
              <thead>
                <tr className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-muted-foreground">
                  <th className="text-left p-3">Módulo</th>
                  {actions.map((action) => (
                    <th key={action} className="p-3 capitalize">
                      {action}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {modules.map((module) => (
                  <tr key={module} className="border-border ">
                    <td className="p-3 font-medium dark:text-muted-foreground">
                      {getModuleLabel(module)}
                    </td>

                    {actions.map((action) => (
                      <td key={action} className="text-center">
                        <input
                          type="checkbox"
                          checked={
                            selectedRole.permisos[module][action]
                          }
                          onChange={() =>
                            togglePermission(module, action)
                          }
                          className="h-4 w-4"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}