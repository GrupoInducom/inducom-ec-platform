"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Laptop, Users, Briefcase, Award } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Selección de Ejecutivos",
      description: "Identificamos y reclutamos líderes talentosos y calificados para puestos ejecutivos clave.",
      icon: <Briefcase className="w-10 h-10 text-inducom-orange" />,
      className: "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-inducom-dark to-inducom-blue text-white",
      titleClass: "text-white",
      descClass: "text-gray-200"
    },
    {
      title: "Selección de Profesionales",
      description: "Aseguramos el talento estelar “A Players” que impulsará el éxito.",
      icon: <UserCheck className="w-10 h-10 text-inducom-blue" />,
      className: "bg-white",
      titleClass: "text-inducom-dark",
      descClass: "text-gray-600"
    },
    {
      title: "Selección IT & Digital",
      description: "Profesionales para desarrollo, infraestructura, data y marketing.",
      icon: <Laptop className="w-10 h-10 text-teal-500" />,
      className: "bg-white",
      titleClass: "text-inducom-dark",
      descClass: "text-gray-600"
    },
    {
      title: "Jóvenes Profesionales",
      description: "Jóvenes con alto potencial y mentalidad de aprendizaje para futuros líderes.",
      icon: <Users className="w-10 h-10 text-inducom-orange" />,
      className: "md:col-span-2 lg:col-span-1 bg-gray-50 border-none",
      titleClass: "text-inducom-dark",
      descClass: "text-gray-600"
    },
    {
      title: "Evaluación de Candidatos",
      description: "Pruebas psicotécnicas, entrevistas estructuradas y evaluación de competencias a profundidad.",
      icon: <Award className="w-10 h-10 text-inducom-blue" />,
      className: "lg:col-span-2 bg-white",
      titleClass: "text-inducom-dark",
      descClass: "text-gray-600"
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-inducom-dark mb-6">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 font-light">
            Soluciones de talento adaptadas a cada necesidad. Un diseño robusto para asegurar el éxito en cada contratación.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group ${service.className}`}
            >
              <Card className={`h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden ${service.className}`}>
                <CardHeader className="pt-8">
                  <div className={`mb-4 p-4 rounded-2xl inline-flex group-hover:scale-110 transition-transform duration-300 ${service.className.includes('from-inducom-dark') ? 'bg-white/10' : 'bg-gray-50'}`}>
                    {service.icon}
                  </div>
                  <CardTitle className={`text-2xl font-bold ${service.titleClass}`}>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <CardDescription className={`text-lg leading-relaxed ${service.descClass}`}>
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
