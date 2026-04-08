import type { Metadata } from "next";
import { NavbarLayout } from "@/src/modules/landing/ui/NavbarLayout";
import { FooterLayout } from "@/src/modules/landing/ui/FooterLayout";
import { WhatsAppButton } from "@/src/modules/landing/ui/WhatsAppButton";
import { LanguageProvider } from "@/src/modules/landing/context/LanguageContext";

export const metadata: Metadata = {
  title: "Inducom Selección | Atracción de Talento Estelar",
  description: "Cazatalentos de Ecuador, expertos en selección de personal, headhunting para conectar oportunidades excepcionales con los mejores profesionales.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col font-sans bg-white antialiased">
        <NavbarLayout />
        <main className="flex-1">
          {children}
        </main>
        <FooterLayout />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}
