"use client";

import { motion } from "framer-motion";
import { ApplicationForm } from "@/src/components/shared/application-form";

export function ApplicationSection() {
  return (
    <section id="unete" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-inducom-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#008080]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl font-black text-inducom-dark mb-6">
              Trabaja con <span className="text-[#008080]">nosotros</span>
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-8">
              ¿No encuentras una vacante que se ajuste a tu perfil? ¡No hay problema! 
              Déjanos tus datos y nos pondremos en contacto contigo cuando tengamos una oportunidad ideal para ti.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-[#008080] font-bold text-xl">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Completa tu perfil</h4>
                  <p className="text-gray-500">Ingresa tus datos principales, experiencia y área de interés.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-[#008080] font-bold text-xl">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Revisión de RRHH</h4>
                  <p className="text-gray-500">Nuestro equipo analiza cada perfil que recibimos meticulosamente.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-[#008080] font-bold text-xl">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Conecta e Inicia</h4>
                  <p className="text-gray-500">Te contactaremos para iniciar el proceso de selección de la vacante ideal.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <ApplicationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
