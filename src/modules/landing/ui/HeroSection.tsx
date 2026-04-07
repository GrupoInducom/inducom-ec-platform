"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToVacantes = () => {
    const element = document.getElementById('vacantes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-white overflow-hidden py-24 lg:py-32 xl:py-40 border-b border-gray-100">
      {/* Decorative background grid/elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-inducom-blue/10 blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default"
          >
            <span className="flex h-2 w-2 rounded-full bg-inducom-orange mr-2 animate-pulse"></span>
            <span className="text-gray-700">Conecta con el #TalentoEstelar</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]"
          >
            Te ayudamos a contratar los{" "}
            <span className="bg-gradient-to-r from-teal-500 to-inducom-blue bg-clip-text text-transparent drop-shadow-sm">
              "A-Players"
            </span>{" "}
            que tu empresa necesita.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Dominamos Ecuador con procesos ágiles y precisos. Conectamos talento estelar con oportunidades excepcionales usando tecnología avanzada.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <Button 
              size="lg" 
              className="bg-inducom-dark hover:bg-inducom-blue text-white font-semibold px-10 h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              onClick={scrollToVacantes}
            >
              Mirar Vacantes
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-10 h-14 text-lg rounded-xl transition-all hover:border-gray-400"
              onClick={() => {
                const element = document.getElementById('servicios');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Nuestros Servicios
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
