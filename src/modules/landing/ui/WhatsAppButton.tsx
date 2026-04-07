"use client"

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/593999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 10 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Pulse effect */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-30 animate-ping" />
      <MessageCircle className="w-8 h-8 relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
        ¡Hablemos por Whatsapp!
      </span>
    </motion.a>
  );
}
