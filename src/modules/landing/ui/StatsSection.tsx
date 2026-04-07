"use client"

import { motion } from "framer-motion";

export function StatsSection() {
  const stats = [
    { value: "15+", label: "Años de Experiencia" },
    { value: "5000+", label: "Búsquedas Exitosas" },
    { value: "2X", label: "Más Rápido" },
    { value: "91/100", label: "NPS Satisfacción" }
  ];

  return (
    <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-inducom-dark mb-8 leading-tight">
              Dominamos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-inducom-blue to-teal-500">
                Ecuador 🇪🇨
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
              Con más de 15 años de experiencia y miles de búsquedas exitosas, somos expertos en encontrar los "líderes", "segundo a bordo" y "altos potenciales" que transforman las empresas en Ecuador.
            </p>
            <div className="space-y-6">
              {[
                { title: "Método Digital", desc: "Exclusivo, logra mejores candidatos en menor tiempo." },
                { title: "Recruiters Expertos", desc: "Certificados con KPIs claros orientados a resultados." },
                { title: "Buscamos más allá", desc: "Donde otros no buscan. Ese es nuestro gran secreto." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-teal-500/10 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-[2rem] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-5xl font-black bg-gradient-to-br from-inducom-dark to-inducom-blue bg-clip-text text-transparent mb-2">
                  {stat.value}
                </h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
