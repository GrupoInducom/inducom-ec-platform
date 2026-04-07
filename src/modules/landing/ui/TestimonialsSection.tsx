"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      text: "Me gustó que son una empresa muy digital y tienen buenas herramientas para seleccionar.",
      role: "Gerente de RRHH",
      company: "Retail Ecuador"
    },
    {
      text: "Me gustó el acompañamiento en cada etapa del hunting y el feedback del reclutamiento para ver con otra visibilidad a los candidatos.",
      role: "Director General",
      company: "Sector Banca"
    },
    {
      text: "Me gustó la metodología que utilizan y los recursos modernos, además el carisma de los asesores que estuvieron a cargo.",
      role: "Líder de TI",
      company: "Tech Start"
    },
    {
      text: "Me gustó el equipo, las herramientas que utilizan, el seguimiento y el servicio en general. Son excelentes.",
      role: "VP de Operaciones",
      company: "Industrias Corp"
    }
  ];

  return (
    <section className="py-24 bg-inducom-dark text-white overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-inducom-blue/10 blur-3xl rounded-full translate-x-1/3" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex justify-center items-center gap-2 text-inducom-orange mb-4">
            <Star className="fill-current w-5 h-5" />
            <Star className="fill-current w-5 h-5" />
            <Star className="fill-current w-5 h-5" />
            <Star className="fill-current w-5 h-5" />
            <Star className="fill-current w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">NPS 2024: 91/100</h2>
          <p className="text-xl text-gray-300 font-light">
            Lo que dicen líderes y empresas al trabajar con nosotros.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, idx) => (
                <CarouselItem key={idx} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <div className="p-1 h-full">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full rounded-3xl hover:bg-white/10 transition-colors duration-300">
                      <CardContent className="flex flex-col h-full p-8 relative">
                        <Quote className="w-12 h-12 text-inducom-orange/20 absolute top-6 right-6" />
                        <p className="text-lg md:text-xl font-medium leading-relaxed flex-grow text-gray-100 mb-8 relative z-10">
                          "{testimonial.text}"
                        </p>
                        <div>
                          <p className="font-bold text-white">{testimonial.role}</p>
                          <p className="text-sm text-inducom-orange">{testimonial.company}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white/10 border-white/20 hover:bg-inducom-orange text-white hover:text-white" />
              <CarouselNext className="static translate-y-0 bg-white/10 border-white/20 hover:bg-inducom-orange text-white hover:text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
