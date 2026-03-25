import { ROLES, type UserRole } from "./roles";

export const roleHome: Record<UserRole, string> = {
  admin: "/admin",
  rrhh: "/rrhh",
  candidato: "/candidato",
  revisoria: "/revisoria",
};

export const protectedPrefixes = ["/admin", "/rrhh", "/candidato", "/revisoria"];

export const roleRouteAccess: Record<UserRole, string[]> = {
  [ROLES.ADMIN]: ["/admin"],
  [ROLES.RRHH]: ["/rrhh"],
  [ROLES.CANDIDATO]: ["/candidato"],
  [ROLES.REVISORIA]: ["/revisoria"],
};

export function canAccessPath(role: UserRole, pathname: string) {
  const allowedPrefixes = roleRouteAccess[role] ?? [];
  return allowedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}