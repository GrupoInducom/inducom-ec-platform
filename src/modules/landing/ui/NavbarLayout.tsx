"use client";

import Link from "next/link";
import { LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NavbarLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Mock Logo taking Inducom colors */}
          <div className="w-8 h-8 rounded bg-inducom-blue flex items-center justify-center text-white font-bold text-xl">
            I
          </div>
          <span className="font-bold text-xl text-inducom-dark">Inducom</span>
          <span className="font-medium text-inducom-orange">Selección</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button 
            onClick={() => scrollToSection('nosotros')} 
            className="text-gray-600 hover:text-inducom-blue transition-colors"
          >
            Nosotros
          </button>
          <button 
            onClick={() => scrollToSection('servicios')} 
            className="text-gray-600 hover:text-inducom-blue transition-colors"
          >
            Servicios
          </button>
          <button 
            onClick={() => scrollToSection('vacantes')} 
            className="text-gray-600 hover:text-inducom-blue transition-colors"
          >
            Empleos
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="outline" 
            className="border-inducom-blue text-inducom-blue hover:bg-inducom-blue hover:text-white"
            onClick={() => scrollToSection('vacantes')}
          >
            Trabaja con nosotros
          </Button>
          <Link href="/login">
            <Button className="bg-inducom-orange hover:bg-inducom-orange/90 text-white gap-2">
              <LogIn className="w-4 h-4" />
              Acceso Staff
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white absolute top-16 left-0 w-full shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            <button 
              onClick={() => scrollToSection('nosotros')} 
              className="text-left font-medium text-gray-600 p-2 hover:bg-gray-50 rounded"
            >
              Nosotros
            </button>
            <button 
              onClick={() => scrollToSection('servicios')} 
              className="text-left font-medium text-gray-600 p-2 hover:bg-gray-50 rounded"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('vacantes')} 
              className="text-left font-medium text-gray-600 p-2 hover:bg-gray-50 rounded"
            >
              Empleos
            </button>
            
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full border-inducom-blue text-inducom-blue justify-center"
                onClick={() => scrollToSection('vacantes')}
              >
                Trabaja con nosotros
              </Button>
              <Link href="/login" className="w-full">
                <Button className="w-full bg-inducom-orange hover:bg-inducom-orange/90 text-white justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Acceso Staff
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
