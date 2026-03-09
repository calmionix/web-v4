import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, Send, ArrowRight, Sparkles, Zap, Heart } from 'lucide-react';

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openWhatsApp = () => {
    const message = 'Halo Calmionix, saya ingin bertanya tentang endorse.';
    window.open(`https://wa.me/6282130570915?text=${encodeURIComponent(message)}`, '_blank');
  };

  const contactCards = [
    {
      icon: <MessageCircle size={24} />,
      title: 'WhatsApp',
      value: '082130570915',
      url: 'https://wa.me/6282130570915',
      color: '#25D366',
      description: 'Fast Response'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'hello@calmionix.id',
      url: 'mailto:hello@calmionix.id',
      color: '#EA4335',
      description: 'Business Inquiry'
    },
    {
      icon: <Send size={24} />,
      title: 'Discord',
      value: 'Join Server',
      url: 'https://discord.gg/qfdBAW29sT',
      color: '#5865F2',
      description: 'Community'
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E13] via-[#141B24] to-[#0B0E13]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2EDF2E]/10 rounded-full blur-3xl" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#2EDF2E] rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag */}
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 mb-6"
            style={{ transitionDelay: '100ms' }}
          >
            <span className="tag inline-flex items-center gap-2">
              <Sparkles size={14} className="animate-pulse" />
              Contact
            </span>
          </div>

          {/* Heading */}
          <h2
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-heading font-bold text-white mb-6"
            style={{ transitionDelay: '200ms' }}
          >
            Ready to Promote Your Server?
            <span className="text-[#2EDF2E] animate-pulse">.</span>
          </h2>

          {/* Description */}
          <p
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-[#A7B1C6] mb-10"
            style={{ transitionDelay: '300ms' }}
          >
            Kirim brief singkat tentang server atau add-on yang ingin dipromosikan. 
            Saya akan membalas secepatnya dengan ketersediaan dan langkah selanjutnya.
          </p>

          {/* CTA Buttons */}
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 flex flex-col sm:flex-row gap-4 justify-center mb-12"
            style={{ transitionDelay: '400ms' }}
          >
            <button
              onClick={openWhatsApp}
              className="btn-primary flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#4ff44f] to-[#2EDF2E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <MessageCircle size={20} className="relative z-10" />
              <span className="relative z-10">Chat WhatsApp</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <a
              href="mailto:hello@calmionix.id"
              className="btn-secondary flex items-center justify-center gap-2 group"
            >
              <Mail size={20} />
              Send Email
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>

          {/* Contact Cards */}
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 grid sm:grid-cols-3 gap-4"
            style={{ transitionDelay: '500ms' }}
          >
            {contactCards.map((card, index) => (
              <a
                key={card.title}
                href={card.url}
                target={card.url.startsWith('http') ? '_blank' : undefined}
                rel={card.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-card p-5 text-center group relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === index ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  borderColor: hoveredCard === index ? `${card.color}50` : undefined,
                }}
              >
                {/* Background Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${card.color}15, transparent 70%)`
                  }}
                />

                <div className="relative z-10">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: hoveredCard === index ? card.color : `${card.color}20`,
                      color: hoveredCard === index ? '#fff' : card.color,
                      boxShadow: hoveredCard === index ? `0 0 30px ${card.color}50` : 'none'
                    }}
                  >
                    {card.icon}
                  </div>
                  <div className="text-sm text-[#A7B1C6] mb-1">{card.title}</div>
                  <div className="font-bold text-white text-lg mb-2 group-hover:text-[#2EDF2E] transition-colors">{card.value}</div>
                  <div 
                    className="text-xs px-2 py-1 rounded-full inline-block"
                    style={{
                      background: `${card.color}20`,
                      color: card.color
                    }}
                  >
                    {card.description}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Trust Message */}
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 mt-12"
            style={{ transitionDelay: '700ms' }}
          >
            <div className="inline-flex items-center gap-2 glass-card px-6 py-3">
              <Zap size={16} className="text-[#2EDF2E] animate-pulse" />
              <span className="text-sm text-[#A7B1C6]">Fast Response</span>
              <span className="text-[#6B7280]">•</span>
              <Heart size={16} className="text-red-500" />
              <span className="text-sm text-[#A7B1C6]">Friendly Service</span>
              <span className="text-[#6B7280]">•</span>
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-sm text-[#A7B1C6]">Quality Content</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for reveal animation */}
      <style>{`
        .reveal.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
