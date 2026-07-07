import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSectionIndex = 0;
      sections.forEach((section, index) => {
        if (section && section instanceof HTMLElement) {
          if (scrollPosition >= section.offsetTop) {
            currentSectionIndex = index + 1; // +1 because hero is 0
          }
        }
      });
      setActiveSection(currentSectionIndex);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/30 py-4 shadow-sm" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => scrollToSection(e, "#hero")}
          className="group flex items-center gap-3 font-mono text-xl font-bold tracking-tighter"
        >
          <Terminal className="w-5 h-5 text-primary group-hover:text-secondary transition-colors duration-500" />
          <span className="text-foreground font-serif text-2xl group-hover:text-primary transition-colors duration-500">Hammad Hussain.</span>
          <span className="text-primary animate-pulse -ml-2">_</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <div className="font-mono text-xs text-muted-foreground mr-4">
            {String(activeSection).padStart(2, '0')} / {String(navLinks.length).padStart(2, '0')}
          </div>
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-xs uppercase tracking-widest font-medium transition-colors font-mono relative group ${activeSection === i + 1 ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              <span className="text-primary/40 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">~/</span>
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-px bg-primary transition-all duration-300 ${activeSection === i + 1 ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/30 py-6 px-6 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono py-2"
              >
                <span className="text-primary/50 mr-3">~/</span>
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
