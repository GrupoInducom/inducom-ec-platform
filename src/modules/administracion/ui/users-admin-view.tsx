"use client";

import * as React from "react";
import {
  Edit,
  KeyRound,
  MoreHorizontal,
  Search,
  UserCheck,
  UserX,
} from "lucide-react";

import type { AdminUser, UserRole, UserStatus } from "../domain/user";
import { usersMock } from "@/src/modules/administracion/infrastructure/user.mock";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const roleOptions: Array<{ label: string; value: UserRole | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Administrador", value: "administrador" },
  { label: "Selección", value: "seleccion" },
  { label: "Revisoría", value: "revisoria" },
  { label: "Candidato", value: "candidato" },
];

const statusOptions: Array<{ label: string; value: UserStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Activo", value: "activo" },
  { label: "Inactivo", value: "inactivo" },
  { label: "Bloqueado", value: "bloqueado" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-EC", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

function getRoleLabel(role: UserRole) {
  switch (role) {
    case "administrador":
      return "Administrador";
    case "seleccion":
      return "Selección";
    case "revisoria":
      return "Revisoría";
    case "candidato":
      return "Candidato";
    default:
      return role;
  }
}

function getStatusBadgeVariant(status: UserStatus) {
  switch (status) {
    case "activo":
      return "default";
    case "inactivo":
      return "secondary";
    case "bloqueado":
      return "destructive";
    default:
      return "secondary";
  }
}

type UserRowActionsProps = {
  user: AdminUser;
};

function UserRowActions({ user }: UserRowActionsProps) {
  const isActive = user.estado === "activo";

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" title="Editar usuario">
        <Edit className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        title={isActive ? "Desactivar usuario" : "Activar usuario"}
      >
        {isActive ? (
          <UserX className="h-4 w-4" />
        ) : (
          <UserCheck className="h-4 w-4" />
        )}
      </Button>

      <Button variant="ghost" size="icon" title="Resetear acceso">
        <KeyRound className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon" title="Más acciones">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function UsersAdminView() {
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = React.useState<UserStatus | "all">("all");

  const filteredUsers = React.useMemo(() => {
    return usersMock.filter((user) => {
      const matchesSearch =
        user.nombre_completo.toLowerCase().includes(search.toLowerCase()) ||
        user.correo.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" ? true : user.rol === roleFilter;
      const matchesStatus =
        statusFilter === "all" ? true : user.estado === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">
          Administración / Usuarios / Gestión
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Gestión de Usuarios
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Administra accesos internos del portal según los registros de{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">rrhh.perfiles</code>.
        </p>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o correo..."
                className="pl-9"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none ring-0"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Filtrar por rol: {option.label}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as UserStatus | "all")
              }
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none ring-0"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Filtrar por estado: {option.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">
            Usuarios registrados ({filteredUsers.length})
          </CardTitle>
          <span className="text-sm text-slate-500">
            Fuente: rrhh.perfiles
          </span>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de creación</TableHead>
                  <TableHead>Último acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-sm text-slate-500"
                    >
                      No hay usuarios que coincidan con los filtros.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-slate-900">
                        {user.nombre_completo}
                      </TableCell>
                      <TableCell>{user.correo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getRoleLabel(user.rol)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.estado)}>
                          {user.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.creado_en)}</TableCell>
                      <TableCell>
                        {user.ultimo_acceso_en
                          ? formatDate(user.ultimo_acceso_en)
                          : "Sin acceso"}
                      </TableCell>
                      <TableCell className="text-right">
                        <UserRowActions user={user} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}