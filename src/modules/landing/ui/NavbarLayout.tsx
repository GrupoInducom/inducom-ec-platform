"use client";

import Link from "next/link";
import { LogIn, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/src/components/theme-toggle";
import { useLanguage, Language } from "@/src/modules/landing/context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NavbarLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md shadow-sm transition-colors">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Mock Logo taking Inducom colors */}
          <div className="w-8 h-8 rounded bg-inducom-blue flex items-center justify-center text-white font-bold text-xl">
            I
          </div>
          <span className="font-bold text-xl text-inducom-dark dark:text-gray-100 transition-colors">Inducom</span>
          <span className="font-medium text-inducom-orange">Selección</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button 
            onClick={() => scrollToSection('nosotros')} 
            className="text-foreground/80 hover:text-inducom-blue dark:hover:text-inducom-orange transition-colors"
          >
            {t('navNosotros')}
          </button>
          <button 
            onClick={() => scrollToSection('servicios')} 
            className="text-foreground/80 hover:text-inducom-blue dark:hover:text-inducom-orange transition-colors"
          >
            {t('navServicios')}
          </button>
          <button 
            onClick={() => scrollToSection('vacantes')} 
            className="text-foreground/80 hover:text-inducom-blue dark:hover:text-inducom-orange transition-colors"
          >
            {t('navEmpleos')}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Select value={language} onValueChange={(val: Language) => setLanguage(val)}>
            <SelectTrigger className="w-[110px] h-9 border-none bg-transparent shadow-none hover:bg-muted focus:ring-0">
              <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
            </SelectContent>
          </Select>

          <ThemeToggle />
          <Button 
            variant="outline" 
            className="border-inducom-blue text-inducom-blue hover:bg-inducom-blue hover:text-white dark:border-inducom-orange dark:text-inducom-orange dark:hover:bg-inducom-orange dark:hover:text-white transition-colors"
            onClick={() => scrollToSection('vacantes')}
          >
            {t('navTrabaja')}
          </Button>
          <Link href="/login">
            <Button className="bg-inducom-orange hover:bg-inducom-orange/90 text-white gap-2">
              <LogIn className="w-4 h-4" />
              {t('navAcceso')}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
            className="p-2 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background absolute top-16 left-0 w-full shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground/80">Idioma</span>
              <Select value={language} onValueChange={(val: Language) => setLanguage(val)}>
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <button 
              onClick={() => scrollToSection('nosotros')} 
              className="text-left font-medium text-foreground/80 p-2 hover:bg-muted rounded transition-colors"
            >
              {t('navNosotros')}
            </button>
            <button 
              onClick={() => scrollToSection('servicios')} 
              className="text-left font-medium text-foreground/80 p-2 hover:bg-muted rounded transition-colors"
            >
              {t('navServicios')}
            </button>
            <button 
              onClick={() => scrollToSection('vacantes')} 
              className="text-left font-medium text-foreground/80 p-2 hover:bg-muted rounded transition-colors"
            >
              {t('navEmpleos')}
            </button>
            
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full border-inducom-blue text-inducom-blue justify-center"
                onClick={() => scrollToSection('vacantes')}
              >
                {t('navTrabaja')}
              </Button>
              <Link href="/login" className="w-full">
                <Button className="w-full bg-inducom-orange hover:bg-inducom-orange/90 text-white justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  {t('navAcceso')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
