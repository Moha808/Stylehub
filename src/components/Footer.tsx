export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-zinc-500 border-t border-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Upper Segment Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Monogram & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center font-display font-medium text-xs tracking-tighter text-white border border-red-600 shadow-[0_0_15px_rgba(185,28,28,0.3)]">
                SV
              </div>
              <span className="font-display text-lg font-bold tracking-widest text-white uppercase">
                StyleVibe
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
              Purveyors of minimalist modern tailoring. Architecturally structured wardrobe essentials.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#home" className="text-xs hover:text-white transition-colors duration-200">
                Home // Welcome
              </a>
              <a href="#shop" className="text-xs hover:text-white transition-colors duration-200">
                Shop Collection
              </a>
              <a href="#about" className="text-xs hover:text-white transition-colors duration-200">
                The Atelier
              </a>
              <a href="#contact" className="text-xs hover:text-white transition-colors duration-200">
                Contact Desk
              </a>
            </div>
          </div>

          {/* Column 3: Legal Policy */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-white uppercase tracking-widest">
              Policies
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-xs hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-xs hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-xs hover:text-white transition-colors duration-200">
                Return & Exchange
              </a>
              <a href="#" className="text-xs hover:text-white transition-colors duration-200">
                Custom Fitting FAQ
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter or Socials */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-white uppercase tracking-widest">
              Collective Feed
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-xs hover:text-white transition-colors duration-200 uppercase">
                Instagram
              </a>
              <a href="#" className="text-xs hover:text-white transition-colors duration-200 uppercase">
                Pinterest
              </a>
              <a href="#" className="text-xs hover:text-white transition-colors duration-200 uppercase">
                Twitter
              </a>
            </div>
            <p className="font-mono text-[9px] text-zinc-650 uppercase">
              // Custom updates via social releases
            </p>
          </div>
        </div>

        {/* Lower segment copyright */}
        <div className="border-t border-zinc-950 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-zinc-650 uppercase">
            © {currentYear} StyleVibe Atelier. All structural rights reserved.
          </p>
          <p className="font-mono text-[10px] text-zinc-650 uppercase">
            Designed for refined high-contrast precision.
          </p>
        </div>

      </div>
    </footer>
  );
}
