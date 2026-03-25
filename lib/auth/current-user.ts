// import { createServerSupabaseClient } from "@/lib/supabase/server";
// import type { UserRole } from "@/lib/permissions/roles";

// export type CurrentUser = {
//   id: string;
//   email: string;
//   role: UserRole;
// };

// export async function getCurrentUser(): Promise<CurrentUser | null> {
//   const supabase = await createServerSupabaseClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) return null;

//   const { data: profile, error } = await supabase
//     .from("profiles")
//     .select("role")
//     .eq("id", user.id)
//     .single();

//   if (error || !profile?.role) return null;

//   return {
//     id: user.id,
//     email: user.email ?? "",
//     role: profile.role as UserRole,
//   };
// }