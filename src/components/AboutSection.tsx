import { ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function AboutSection() {
  const ethosList = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Quality First",
      desc: "We curate only top-grain natural materials, organic cottons, and precise stitching patterns.",
    },
    {
      icon: <Truck className="w-6 h-6 text-white" />,
      title: "Worldwide Courier",
      desc: "Expedited, eco-neutral global logistics to deliver your custom wardrobe additions swiftly.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: "Minimalist Design",
      desc: "Structured architectural silhouettes crafted for durability, statement aesthetics, and flow.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-black border-t border-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
              // Our Philosophy
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
              About <br />StyleVibe Atelier
            </h2>
            <div className="w-12 h-[2px] bg-white" />
            <p className="font-sans text-sm md:text-base text-zinc-400 font-light leading-relaxed">
              At StyleVibe, we strip away the excess to focus purely on shape, quality, and material state.
              We believe style is an organic expression of modern architecture—structural, quiet, yet deeply impactful.
            </p>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {ethosList.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-950 border border-zinc-900 hover:border-zinc-750 p-8 flex flex-col items-start gap-4 transition-all duration-300 shadow-2xl"
              >
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-display text-sm font-semibold tracking-wide uppercase text-white mt-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-zinc-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
