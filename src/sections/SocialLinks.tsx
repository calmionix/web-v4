import { useEffect, useRef, useState } from 'react';
import { 
  MessageCircle, 
  Youtube, 
  Gamepad2, 
  Phone,
  ExternalLink,
  Share2,
  ArrowUpRight
} from 'lucide-react';

interface SocialLinksProps {
  onSocialClick: (link: string, title: string) => void;
}

const socialLinks = [
  {
    name: 'TikTok',
    handle: '@calmionix.id',
    url: 'https://tiktok.com/@calmionix.id',
    icon: <MessageCircle size={24} />,
    color: '#2EDF2E',
    bgColor: '#2EDF2E',
    description: 'Follow for daily Minecraft content',
    followers: '2K+',
  },
  {
    name: 'YouTube',
    handle: '@calmionix',
    url: 'https://youtube.com/@calmionix',
    icon: <Youtube size={24} />,
    color: '#FF0000',
    bgColor: '#FF0000',
    description: 'Watch full videos and tutorials',
    followers: '200+',
  },
  {
    name: 'Discord',
    handle: 'Join Server',
    url: 'https://discord.gg/qfdBAW29sT',
    icon: <Gamepad2 size={24} />,
    color: '#5865F2',
    bgColor: '#5865F2',
    description: 'Connect with the community',
    followers: '500+',
  },
  {
    name: 'WhatsApp Channel',
    handle: 'Subscribe',
    url: 'https://whatsapp.com/channel/0029VbBX3oH4SpkL6bGQa404',
    icon: <MessageCircle size={24} />,
    color: '#25D366',
    bgColor: '#25D366',
    description: 'Get updates directly',
    followers: '1K+',
  },
  {
    name: 'WhatsApp',
    handle: '082130570915',
    url: 'https://wa.me/6282130570915',
    icon: <Phone size={24} />,
    color: '#25D366',
    bgColor: '#25D366',
    description: 'Direct message for business',
    followers: 'Fast Response',
  },
];

export function SocialLinks({ onSocialClick }: SocialLinksProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x: y * -0.1, y: x * 0.1 });
    setHoveredIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141B24]/50 to-transparent" />
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2EDF2E]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2EDF2E]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 mb-4"
            style={{ transitionDelay: '100ms' }}
          >
            <span className="tag inline-flex items-center gap-2">
              <Share2 size={14} className="animate-pulse" />
              Connect
            </span>
          </div>
          <h2
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-heading font-bold text-white mb-4"
            style={{ transitionDelay: '200ms' }}
          >
            Follow Calmionix<span className="text-[#2EDF2E] animate-pulse">.</span>
          </h2>
          <p
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-[#A7B1C6] max-w-xl mx-auto"
            style={{ transitionDelay: '300ms' }}
          >
            Connect dengan saya di berbagai platform sosial media untuk mendapatkan 
            update terbaru tentang konten Minecraft.
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {socialLinks.map((social, index) => (
            <button
              key={social.name}
              onClick={() => onSocialClick(social.url, social.name)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 relative group"
              style={{ 
                transitionDelay: `${400 + index * 100}ms`,
                transform: hoveredIndex === index 
                  ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) translateZ(20px)`
                  : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div 
                className="glass-card p-5 text-left w-full h-full overflow-hidden"
                style={{
                  borderColor: hoveredIndex === index ? `${social.color}50` : 'rgba(244,247,255,0.08)',
                  boxShadow: hoveredIndex === index ? `0 0 40px ${social.color}30` : 'none',
                  transition: 'all 0.4s ease'
                }}
              >
                {/* Background Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${social.color}15, transparent 70%)`
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        background: hoveredIndex === index ? social.bgColor : `${social.color}20`,
                        color: hoveredIndex === index ? '#fff' : social.color,
                        boxShadow: hoveredIndex === index ? `0 0 30px ${social.color}50` : 'none'
                      }}
                    >
                      {social.icon}
                    </div>
                    <div 
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-all duration-300"
                      style={{
                        background: `${social.color}15`,
                        color: social.color
                      }}
                    >
                      <span>{social.followers}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div 
                      className="font-bold text-white text-lg mb-1 group-hover:text-[#2EDF2E] transition-colors duration-300 flex items-center gap-2"
                    >
                      {social.name}
                      <ArrowUpRight 
                        size={16} 
                        className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </div>
                    <div className="text-sm text-[#A7B1C6] group-hover:text-white transition-colors">{social.handle}</div>
                  </div>

                  <p className="text-xs text-[#6B7280] group-hover:text-[#A7B1C6] transition-colors">
                    {social.description}
                  </p>
                </div>

                {/* Hover Corner Accent */}
                <div 
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${social.color}20 50%)`
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-center mt-12"
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 group hover:bg-[#2EDF2E]/10 transition-colors cursor-pointer">
            <ExternalLink size={18} className="text-[#2EDF2E] group-hover:rotate-45 transition-transform" />
            <span className="text-[#A7B1C6] group-hover:text-white transition-colors">
              Klik salah satu platform untuk terhubung
            </span>
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
