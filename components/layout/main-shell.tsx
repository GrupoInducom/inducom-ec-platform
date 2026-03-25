import type { ReactNode } from "react";
import { AppHeader } from "../shared/app-header";

interface Props {
  children: ReactNode;
}

export function MainShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );

  //OSEA esto va a ir reutilizado en todas las páginas, 
  //y lo que hace es envolver el contenido específico 
  //de cada página con un header común y un estilo de fondo.
  //Es una forma de mantener una apariencia consistente en toda 
  //la aplicación sin tener que repetir el mismo código en cada página.
}