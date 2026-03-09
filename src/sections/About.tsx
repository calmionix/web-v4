import { useEffect, useRef, useState } from 'react';
import { Users, Video, Server, TrendingUp, Zap, Target, Award } from 'lucide-react';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

function AnimatedStat({ value, suffix, label, icon }: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const steps = 80;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentValue = Math.min(value, Math.floor((step / steps) * value));
      setCount(currentValue);
      
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={statRef}
      className="stat-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <div 
          className="w-14 h-14 rounded-2xl bg-[#2EDF2E]/10 flex items-center justify-center text-[#2EDF2E] transition-all duration-500"
          style={{
            background: isHovered ? '#2EDF2E' : 'rgba(46, 223, 46, 0.1)',
            color: isHovered ? '#0B0E13' : '#2EDF2E',
            transform: isHovered ? 'rotate(12deg) scale(1.1)' : 'rotate(0) scale(1)'
          }}
        >
          {icon}
        </div>
        <div 
          className="text-4xl lg:text-5xl font-bold transition-all duration-500"
          style={{
            color: isHovered ? '#2EDF2E' : '#ffffff',
            textShadow: isHovered ? '0 0 30px rgba(46, 223, 46, 0.5)' : 'none'
          }}
        >
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-[#A7B1C6] group-hover:text-white transition-colors">{label}</div>
      </div>
      
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: '0 0 60px rgba(46, 223, 46, 0.3)',
        }}
      />
    </div>
  );
}

const stats = [
  { value: 2000, suffix: '+', label: 'Followers TikTok', icon: <Users size={26} /> },
  { value: 200, suffix: '+', label: 'Video', icon: <Video size={26} /> },
  { value: 50, suffix: '+', label: 'Server Promoted', icon: <Server size={26} /> },
  { value: 25, suffix: 'K+', label: 'Views', icon: <TrendingUp size={26} /> },
];

const features = [
  {
    icon: <Zap size={20} />,
    title: 'Fast Delivery',
    description: 'Pengerjaan cepat dan tepat waktu'
  },
  {
    icon: <Target size={20} />,
    title: 'Targeted Content',
    description: 'Konten yang sesuai target audience'
  },
  {
    icon: <Award size={20} />,
    title: 'High Quality',
    description: 'Kualitas video terbaik'
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div 
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#2EDF2E]/5 rounded-full blur-3xl -translate-y-1/2"
        style={{
          transform: `translate(${mousePosition.x * 50}px, ${-50 + mousePosition.y * 50}%)`,
          transition: 'transform 0.5s ease-out'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#2EDF2E]/5 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            {/* Tag */}
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 mb-6"
              style={{ transitionDelay: '100ms' }}
            >
              <span className="tag inline-flex items-center gap-2 hover:tracking-widest transition-all duration-500 cursor-default">
                <span className="w-2 h-2 bg-[#2EDF2E] rounded-full animate-pulse" />
                About Calmionix
              </span>
            </div>

            {/* Heading */}
            <h2
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-heading font-bold text-white mb-6"
              style={{ transitionDelay: '200ms' }}
            >
              Minecraft Content Creator
              <span className="text-[#2EDF2E] animate-pulse">.</span>
            </h2>

            {/* Description */}
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 space-y-4 mb-8"
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-[#A7B1C6] leading-relaxed hover:text-white transition-colors duration-300">
                Calmionix adalah content creator yang fokus membuat konten Minecraft 
                seperti review add-on, gameplay, dan promosi server Minecraft.
              </p>
              <p className="text-[#A7B1C6] leading-relaxed hover:text-white transition-colors duration-300">
                Konten dibuat untuk membantu server berkembang serta memberikan 
                hiburan kepada komunitas Minecraft. Setiap video dirancang dengan 
                kualitas terbaik untuk memberikan pengalaman menonton yang menyenangkan.
              </p>
            </div>

            {/* Features */}
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 grid grid-cols-3 gap-4 mb-8"
              style={{ transitionDelay: '400ms' }}
            >
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="glass-card p-4 text-center group hover:bg-[#2EDF2E]/10 transition-all duration-500 cursor-pointer"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    transform: 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2EDF2E]/10 flex items-center justify-center text-[#2EDF2E] mx-auto mb-2 group-hover:bg-[#2EDF2E] group-hover:text-[#0B0E13] group-hover:rotate-12 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="text-xs font-semibold text-white mb-1">{feature.title}</div>
                  <div className="text-[10px] text-[#A7B1C6]">{feature.description}</div>
                </div>
              ))}
            </div>

            {/* Signature */}
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: '500ms' }}
            >
              <p className="text-white font-medium italic text-lg hover:text-[#2EDF2E] transition-colors duration-300 cursor-default">
                "Let's build something amazing together."
              </p>
            </div>
          </div>

          {/* Right Content - Stats Grid */}
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-1000"
            style={{ transitionDelay: '600ms' }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AnimatedStat {...stat} />
                </div>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="mt-8 glass-card p-6 relative overflow-hidden group cursor-pointer hover:bg-[#2EDF2E]/5 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2EDF2E]/10 rounded-full blur-2xl group-hover:bg-[#2EDF2E]/20 transition-colors duration-500" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2EDF2E] to-[#25b525] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Award size={32} className="text-[#0B0E13]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white group-hover:text-[#2EDF2E] transition-colors">Trusted</div>
                  <div className="text-sm text-[#A7B1C6]">by 50+ Minecraft Servers</div>
                </div>
              </div>
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
