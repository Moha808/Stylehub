import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const contacts = [
    {
      icon: <Mail className="w-5 h-5 text-white" />,
      label: "Email Us",
      value: "igalmoha0@gmail.com",
      link: "mailto:igalmoha0@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-white" />,
      label: "Support Line",
      value: "+234 915 615 1191",
      link: "tel:+2349156151191",
    },
    {
      icon: <MapPin className="w-5 h-5 text-white" />,
      label: "Atelier Showroom",
      value: "123 Fashion Ave, Style City, NY",
      link: "#",
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-black border-t border-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
            // Connected Collective
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
            Get In Touch
          </h2>
          <div className="w-8 h-[2px] bg-white mx-auto" />
          <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
            Reach out for custom size advice, bespoke fittings, stockist reviews, or general support inquiry.
          </p>
        </div>

        {/* Contact Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {contacts.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="bg-zinc-950 border border-zinc-900 hover:border-white p-8 md:p-10 flex flex-col items-center text-center gap-4 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300 rounded-none text-white">
                {item.icon}
              </div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-2">
                {item.label}
              </span>
              <span className="font-sans text-sm font-semibold text-white group-hover:text-zinc-300 transition-colors">
                {item.value}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
