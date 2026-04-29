import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import NotFound from "@/pages/not-found";
import Portfolio from "@/pages/portfolio";

const queryClient = new QueryClient();

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

  return (
    <>
      <div 
        id="custom-cursor-glow" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }} 
      />
      <div 
        id="custom-cursor" 
        className={isHovering ? "hovering-interactive" : ""}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }} 
      />
    </>
  );
}

function StatusHUD() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none hidden md:flex flex-col items-end gap-1 font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase mix-blend-difference">
      <div>LOC: Earth</div>
      <div>SYS_TIME: {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}</div>
      <div className="text-primary/80 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" />
        STATUS: SHIPPING
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <CustomCursor />
          <div className="noise-bg min-h-screen">
            <Router />
          </div>
          <StatusHUD />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
