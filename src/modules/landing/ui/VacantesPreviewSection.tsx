"use client"

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign } from "lucide-react";

export function VacantesPreviewSection() {
  const vacantes = [
    {
      id: 1,
      title: "Gerente Comercial B2B",
      company: "Sector Industrial",
      location: "Guayaquil",
      type: "Presencial",
      salary: "Confidencial",
      tags: ["Ventas", "Liderazgo", "Ingeniería"]
    },
    {
      id: 2,
      title: "Desarrollador Full Stack Senior",
      company: "Empresa Tecnológica",
      location: "Quito / Remoto",
      type: "Híbrido",
      salary: "$2.000 - $3.000",
      tags: ["React", "Node.js", "AWS"]
    },
    {
      id: 3,
      title: "Jefe de Recursos Humanos",
      company: "Sector Retail",
      location: "Cuenca",
      type: "Presencial",
      salary: "Confidencial",
      tags: ["Desarrollo Organizacional", "Nómina"]
    }
  ];

  return (
    <section id="vacantes" className="py-24 bg-white border-t border-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-black text-inducom-dark mb-4">Vacantes Destacadas</h2>
            <p className="text-xl text-gray-500 font-light">
              Conecta tu talento con las empresas más importantes de Ecuador.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" size="lg" className="border-inducom-blue text-inducom-blue hover:bg-inducom-blue hover:text-white rounded-xl">
              Ver todas las vacantes
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vacantes.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border border-gray-100 hover:border-inducom-blue/30 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-[2rem] flex flex-col group bg-white">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-inducom-blue/10 text-inducom-blue hover:bg-inducom-blue/20 font-semibold px-3 py-1">
                      {job.type}
                    </Badge>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">Hace 2 días</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-inducom-blue transition-colors">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="text-inducom-orange font-semibold mt-2">
                    {job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center text-sm text-gray-600 gap-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-3">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-50">
                    {job.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs font-medium text-gray-500 border-gray-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full bg-inducom-dark hover:bg-inducom-blue text-white rounded-xl shadow-lg hover:shadow-xl transition-all h-12">
                    Aplicar ahora
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
