import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { LinkedinIcon } from "@/src/components/icons/lucide-linkedin";
import { FacebookIcon } from "@/src/components/icons/lucide-facebook";
import { InstagramIcon } from "@/src/components/icons/lucide-instagram";

export function FooterLayout() {
  return (
    <footer className="bg-inducom-dark text-gray-300 pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 inline-block">
              <div className="w-8 h-8 rounded bg-inducom-orange flex items-center justify-center text-white font-bold text-xl">
                I
              </div>
              <span className="font-bold text-xl text-white">Inducom</span>
              <span className="font-medium text-inducom-orange">Selección</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Cazatalentos #1 de Ecuador. Nos especializamos en selección de personal y headhunting con alcance nacional e internacional para conectar talento estelar con grandes empresas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-inducom-orange hover:text-white transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-inducom-orange hover:text-white transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-inducom-orange hover:text-white transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-inducom-orange transition-colors">Inicio</Link></li>
              <li><Link href="#nosotros" className="hover:text-inducom-orange transition-colors">Nuestra Empresa</Link></li>
              <li><Link href="#servicios" className="hover:text-inducom-orange transition-colors">Servicios</Link></li>
              <li><Link href="#vacantes" className="hover:text-inducom-orange transition-colors">Empleos</Link></li>
              <li><Link href="/login" className="hover:text-inducom-orange transition-colors">Acceso Consultores</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Servicios</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-inducom-orange transition-colors">Selección de Ejecutivos</Link></li>
              <li><Link href="#" className="hover:text-inducom-orange transition-colors">Selección de Profesionales</Link></li>
              <li><Link href="#" className="hover:text-inducom-orange transition-colors">Selección IT & Digital</Link></li>
              <li><Link href="#" className="hover:text-inducom-orange transition-colors">RPO Outsourcing</Link></li>
              <li><Link href="#" className="hover:text-inducom-orange transition-colors">Evaluación de Candidatos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contáctanos</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-inducom-orange shrink-0" />
                <span>Formatura Empresarial Piso 10, Guayaquil, Ecuador</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-inducom-orange shrink-0" />
                <span>+593 99 999 9999</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-inducom-orange shrink-0" />
                <span>talento@inducom.ec</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Inducom Selección. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Políticas de Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
