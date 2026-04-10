import { createClient } from '@/src/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Fetching from 'perfiles' in the 'rrhh' schema (defaulted in client)
  const { data: perfiles, error } = await supabase.from('perfiles').select()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error fetching perfiles: {error.message}</p>
          <p className="text-sm mt-1">Note: This is expected if the 'perfiles' table doesn't exist yet or if the 'rrhh' schema is not exposed.</p>
        </div>
      )}
      <ul className="list-disc ml-6">
        {perfiles?.length === 0 && <li>No profiles found.</li>}
        {perfiles?.map((perfil: any) => (
          <li key={perfil.id}>{perfil.nombre_completo || perfil.correo}</li>
        ))}
      </ul>
      <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
        <p className="text-sm text-blue-800">
          Supabase is correctly configured! You can now use the client helpers in <code>src/utils/supabase/</code>.
        </p>
      </div>
    </div>
  )
}
