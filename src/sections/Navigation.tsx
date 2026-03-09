import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Videos', href: '#videos' },
  { name: 'Price List', href: '#pricelist' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing navigation after loading screen
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href);
      for (const section of sections.reverse()) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    setActiveLink(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'nav-glass py-3 translate-y-0' 
            : 'bg-transparent py-5 translate-y-0'
        }`}
        style={{
          animation: isVisible ? 'slideDown 0.5s ease-out' : 'none'
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2EDF2E] to-[#25b525] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#2EDF2E]/40 group-hover:scale-110 transition-all duration-500">
                <span className="text-[#0B0E13] font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block group-hover:text-[#2EDF2E] transition-colors">
                Calmionix
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    activeLink === link.href
                      ? 'text-[#2EDF2E]'
                      : 'text-[#A7B1C6] hover:text-white'
                  }`}
                >
                  {activeLink === link.href && (
                    <span className="absolute inset-0 bg-[#2EDF2E]/10 rounded-lg animate-pulse" />
                  )}
                  <span className="relative z-10">{link.name}</span>
                  <span 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#2EDF2E] transition-all duration-300 ${
                      activeLink === link.href ? 'w-4' : 'w-0 group-hover:w-4'
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2 group"
              >
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                Endorse Sekarang
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-[#141B24] border border-[rgba(244,247,255,0.08)] text-white hover:border-[#2EDF2E] hover:text-[#2EDF2E] transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0B0E13]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-[#141B24] rounded-2xl border border-[rgba(244,247,255,0.08)] p-6 transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                  activeLink === link.href
                    ? 'text-[#2EDF2E] bg-[#2EDF2E]/10'
                    : 'text-[#A7B1C6] hover:text-white hover:bg-[#2EDF2E]/5'
                }`}
                style={{ 
                  animation: isMobileMenuOpen ? `slideInRight 0.3s ease-out ${index * 0.05}s forwards` : 'none',
                  opacity: 0
                }}
              >
                <span>{link.name}</span>
                {activeLink === link.href && (
                  <span className="w-2 h-2 bg-[#2EDF2E] rounded-full animate-pulse" />
                )}
              </a>
            ))}
            <div className="pt-4 border-t border-[rgba(244,247,255,0.08)] mt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="btn-primary w-full text-center flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                Endorse Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
