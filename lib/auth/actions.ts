// "use server";

// import { redirect } from "next/navigation";
// import { createServerSupabaseClient } from "@/lib/supabase/server";
// import { roleHome } from "@/lib/permissions/routes";
// import type { UserRole } from "@/lib/permissions/roles";

// export async function login(formData: FormData) {
//   const email = String(formData.get("email") ?? "");
//   const password = String(formData.get("password") ?? "");

//   const supabase = await createServerSupabaseClient();

//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return { error: "Credenciales inválidas" };
//   }

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("role")
//     .eq("id", user?.id)
//     .single();

//   const role = profile?.role as UserRole | undefined;

//   redirect(role ? roleHome[role] : "/login");
// }

// export async function logout() {
//   const supabase = await createServerSupabaseClient();
//   await supabase.auth.signOut();
//   redirect("/login");
// }