"use client"

import { motion } from "framer-motion";

export function ClientsLogosSection() {
  // Array de placeholders simulando logos de marcas top
  const logos = [
    { name: "Corporación", text: "CORP." },
    { name: "Industrias", text: "INDUSTRIES" },
    { name: "Logística", text: "LOGISTICS" },
    { name: "Tecnología", text: "TECH START" },
    { name: "Banca", text: "BANK+" },
    { name: "Retail", text: "RETAIL PRO" },
  ];

  return (
    <section className="py-12 border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
          Confían en nosotros las mejores empresas de Ecuador
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
            >
              <div className="h-12 px-6 flex items-center justify-center font-black text-xl text-gray-300 hover:text-inducom-blue tracking-tighter">
                {logo.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
