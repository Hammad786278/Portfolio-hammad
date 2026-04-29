import { Terminal, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-background pt-20 pb-10 border-t border-border/20 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center">
        
        <div className="w-full mb-20">
          <h1 className="text-[clamp(4rem,15vw,20rem)] font-serif leading-none text-center text-foreground uppercase tracking-tighter mix-blend-difference">
            HAMMAD
          </h1>
          <h1 className="text-[clamp(4rem,15vw,20rem)] font-serif leading-none text-center text-muted-foreground italic uppercase tracking-tighter">
            HUSSIAN
          </h1>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-border/40 pt-10 gap-6 font-mono text-xs text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span>&copy; {new Date().getFullYear()} // ALL RIGHTS RESERVED</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">GITHUB</a>
            <a href="#" className="hover:text-primary transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-primary transition-colors">TWITTER</a>
          </div>

          <div>
            LOC: EARTH // SYS_ONLINE
          </div>
        </div>
      </div>
    </footer>
  );
}
