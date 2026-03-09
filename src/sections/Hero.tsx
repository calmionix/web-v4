import { useEffect, useRef, useState } from 'react';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

    const elements = contentRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#0B0E13] via-[#141B24] to-[#0B0E13]"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(46, 223, 46, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(46, 223, 46, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2EDF2E]/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
            transition: 'transform 0.5s ease-out',
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2EDF2E]/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.6}px)`,
            transition: 'transform 0.5s ease-out',
            animationDuration: '6s',
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#2EDF2E] rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 section-container pt-24 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Tag */}
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 mb-6"
              style={{ transitionDelay: '200ms' }}
            >
              <span className="tag inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2EDF2E]/10 border border-[#2EDF2E]/30 hover:border-[#2EDF2E] hover:bg-[#2EDF2E]/20 transition-all duration-500 cursor-default group">
                <Sparkles size={14} className="text-[#2EDF2E] group-hover:rotate-12 transition-transform" />
                <span className="group-hover:tracking-wider transition-all duration-500">Minecraft Content Creator</span>
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-display font-bold text-white mb-6"
              style={{ transitionDelay: '400ms' }}
            >
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">H</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">i</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default"> </span>
              <span className="inline-block animate-bounce">👋</span>
              <br />
              <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">I'</span>
              <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">m</span>
              <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default"> </span>
              <span className="text-gradient hover:scale-105 transition-transform duration-300 cursor-default inline-block">Calmionix</span>
            </h1>

            {/* Subtitle */}
            <p
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-lg md:text-xl text-[#A7B1C6] mb-8 max-w-xl mx-auto lg:mx-0 hover:text-white transition-colors duration-500"
              style={{ transitionDelay: '600ms' }}
            >
              Minecraft Add-on Reviewer & Server Promoter. 
              Membuat konten berkualitas untuk membantu server Minecraft berkembang.
            </p>

            {/* CTA Buttons */}
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ transitionDelay: '800ms' }}
            >
              <button
                onClick={() => scrollToSection('#videos')}
                className="btn-primary flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#4ff44f] to-[#2EDF2E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Play size={18} className="relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Lihat Konten</span>
              </button>
              <button
                onClick={() => scrollToSection('#pricelist')}
                className="btn-secondary flex items-center justify-center gap-2 group"
              >
                Endorse Sekarang
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Content - Profile Card */}
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 flex justify-center lg:justify-end"
            style={{ transitionDelay: '600ms' }}
          >
            <div 
              className="relative group"
              style={{
                transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              {/* Glow Effect Behind */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2EDF2E]/40 to-[#4ff44f]/20 rounded-[2rem] blur-3xl scale-110 animate-pulse group-hover:scale-125 transition-transform duration-700" />
              
              {/* Decorative Rings */}
              <div className="absolute -inset-4 border-2 border-[#2EDF2E]/20 rounded-[2.5rem] animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute -inset-8 border border-[#2EDF2E]/10 rounded-[3rem] animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
              
              {/* Profile Card */}
              <div className="relative glass-card p-3 animate-float overflow-hidden group-hover:shadow-[0_0_80px_rgba(46,223,46,0.4)] transition-shadow duration-700">
                {/* Card Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2EDF2E]/10 via-transparent to-[#2EDF2E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative overflow-hidden rounded-[1.5rem] aspect-[3/4] w-[280px] md:w-[320px]">
                  <img
                    src="/images/hero-card.png"
                    alt="Calmionix Profile"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E13] via-transparent to-transparent opacity-80" />
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 border-2 border-[#2EDF2E]/0 group-hover:border-[#2EDF2E]/50 rounded-[1.5rem] transition-all duration-500" />
                  
                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-[#2EDF2E] rounded-full animate-pulse shadow-lg shadow-[#2EDF2E]/50" />
                      <span className="text-sm font-medium text-white">Available for Endorse</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="glass-card px-3 py-1.5 flex items-center gap-2 hover:bg-[#2EDF2E]/20 transition-colors cursor-pointer">
                        <span className="text-lg font-bold text-[#2EDF2E]">2K+</span>
                        <span className="text-xs text-[#A7B1C6]">Followers</span>
                      </div>
                      <div className="glass-card px-3 py-1.5 flex items-center gap-2 hover:bg-[#2EDF2E]/20 transition-colors cursor-pointer">
                        <span className="text-lg font-bold text-[#2EDF2E]">200+</span>
                        <span className="text-xs text-[#A7B1C6]">Videos</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#2EDF2E]/50 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#2EDF2E]/50 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#2EDF2E]/50 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#2EDF2E]/50 rounded-br-lg" />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 glass-card px-4 py-2 flex items-center gap-2 animate-bounce hover:scale-110 transition-transform cursor-pointer">
                <span className="text-2xl">🎮</span>
                <span className="text-xs text-[#A7B1C6]">Minecraft</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2 flex items-center gap-2 animate-pulse hover:scale-110 transition-transform cursor-pointer">
                <span className="text-2xl">⭐</span>
                <span className="text-xs text-[#A7B1C6]">Top Creator</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0E13] to-transparent" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-[#A7B1C6]">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-[#2EDF2E]/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#2EDF2E] rounded-full animate-pulse" />
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
