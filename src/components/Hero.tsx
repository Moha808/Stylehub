import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background with Dark High-Contrast Gradient Mask */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-45 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      
      {/* High-Contrast Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70" />

      {/* Hero Central Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-zinc-400 text-xs tracking-[0.25em] uppercase mb-4"
        >
          Curated Atelier Series // 2026
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl md:text-8xl font-bold tracking-tight text-white uppercase leading-none mb-6"
        >
          Elevate Your <br />
          <span className="font-thin text-zinc-300">Aesthetic</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-sm md:text-base text-zinc-400 font-light max-w-md mx-auto leading-relaxed mb-10"
        >
          Discover structural lines, meticulous tailoring, and a purist palette. Designed for the contemporary silhouette.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex justify-center gap-4"
        >
          <a
            href="#shop"
            className="inline-block px-8 py-3.5 bg-white text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-zinc-200 outline-none hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)] active:translate-y-[0px] rounded-none"
          >
            Shop Collection
          </a>
          <a
            href="#about"
            className="inline-block px-8 py-3.5 bg-transparent text-white border border-zinc-800 font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:border-white hover:bg-white/5 hover:translate-y-[-2px] active:translate-y-[0px] rounded-none"
          >
            The Atelier
          </a>
        </motion.div>
      </div>

      {/* Decorative Monochromatic Lines */}
      <div className="absolute bottom-10 left-10 hidden xl:flex items-center gap-3">
        <span className="w-8 h-[1px] bg-zinc-800" />
        <span className="font-mono text-[10px] text-zinc-600 tracking-wider">EST. STYLEVIBE 2026</span>
      </div>
      <div className="absolute bottom-10 right-10 hidden xl:flex items-center gap-3">
        <span className="font-mono text-[10px] text-zinc-600 tracking-wider">LATITUDE N°51 // W°0.12</span>
        <span className="w-8 h-[1px] bg-zinc-800" />
      </div>
    </section>
  );
}
