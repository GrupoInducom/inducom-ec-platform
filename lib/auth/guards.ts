// import { redirect } from "next/navigation";
// import { getCurrentUser } from "./current-user";
// import { hasPermission } from "@/lib/permissions/permissions";
// import type { UserRole } from "@/lib/permissions/roles";

// export async function requireAuth() {
//   const user = await getCurrentUser();
//   if (!user) redirect("/login");
//   return user;
// }

// export async function requireRole(allowedRoles: UserRole[]) {
//   const user = await requireAuth();
//   if (!allowedRoles.includes(user.role)) redirect("/403");
//   return user;
// }

// export async function requirePermission(permission: string) {
//   const user = await requireAuth();
//   if (!hasPermission(user.role, permission)) redirect("/403");
//   return user;
// }