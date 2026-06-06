import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import ParticleShapes from "@/components/ParticleShapes";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="fixed inset-0 z-0 noise-bg pointer-events-none" />
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Skills />
        <ParticleShapes />
        <Projects />
        <Process />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
