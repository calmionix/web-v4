import { useState } from 'react';
import { Heart, ArrowUp, MessageCircle, Youtube, Gamepad2, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onSocialClick: (link: string, title: string) => void;
}

const footerLinks = {
  navigation: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Videos', href: '#videos' },
    { name: 'Price List', href: '#pricelist' },
    { name: 'Contact', href: '#contact' },
  ],
  social: [
    { name: 'TikTok', icon: <MessageCircle size={18} />, url: 'https://tiktok.com/@calmionix.id', color: '#2EDF2E' },
    { name: 'YouTube', icon: <Youtube size={18} />, url: 'https://youtube.com/@calmionix', color: '#FF0000' },
    { name: 'Discord', icon: <Gamepad2 size={18} />, url: 'https://discord.gg/qfdBAW29sT', color: '#5865F2' },
  ],
};

export function Footer({ onSocialClick }: FooterProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0B0E13] border-t border-[rgba(244,247,255,0.08)] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2EDF2E]/5 rounded-full blur-3xl" />

      {/* Main Footer */}
      <div className="section-container py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2EDF2E] to-[#25b525] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#2EDF2E]/40 group-hover:scale-110 transition-all duration-500">
                <span className="text-[#0B0E13] font-bold text-2xl">C</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white group-hover:text-[#2EDF2E] transition-colors">Calmionix</span>
                <p className="text-xs text-[#6B7280]">Minecraft Content Creator</p>
              </div>
            </div>
            <p className="text-[#A7B1C6] text-sm leading-relaxed max-w-sm mb-6 hover:text-white transition-colors">
              Content creator fokus pada review add-on, gameplay, dan promosi 
              server Minecraft. Membantu server berkembang dengan konten berkualitas.
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((social) => (
                <button
                  key={social.name}
                  onClick={() => onSocialClick(social.url, social.name)}
                  className="w-11 h-11 rounded-xl bg-[#141B24] border border-[rgba(244,247,255,0.08)] flex items-center justify-center transition-all duration-500 hover:scale-110"
                  style={{
                    color: social.color,
                    borderColor: 'rgba(244,247,255,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.color;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.boxShadow = `0 0 20px ${social.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#141B24';
                    e.currentTarget.style.color = social.color;
                    e.currentTarget.style.borderColor = 'rgba(244,247,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  title={social.name}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-[#2EDF2E]" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-[#A7B1C6] hover:text-[#2EDF2E] transition-all duration-300 flex items-center gap-2 group"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span 
                      className="w-0 h-0.5 bg-[#2EDF2E] group-hover:w-3 transition-all duration-300"
                      style={{ width: hoveredLink === link.name ? '12px' : '0' }}
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle size={14} className="text-[#2EDF2E]" />
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/6282130570915"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#A7B1C6] hover:text-[#25D366] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366] group-hover:animate-pulse" />
                  WhatsApp: 082130570915
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@calmionix.id"
                  className="text-sm text-[#A7B1C6] hover:text-[#EA4335] transition-colors flex items-center gap-2 group"
                >
                  <Mail size={14} className="text-[#EA4335]" />
                  hello@calmionix.id
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/qfdBAW29sT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#A7B1C6] hover:text-[#5865F2] transition-colors flex items-center gap-2 group"
                >
                  <Gamepad2 size={14} className="text-[#5865F2]" />
                  Discord Server
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(244,247,255,0.08)] relative z-10">
        <div className="section-container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#6B7280] flex items-center gap-1 group cursor-default">
              Made with 
              <Heart size={14} className="text-red-500 group-hover:scale-125 transition-transform animate-pulse" fill="#EF4444" /> 
              by Calmionix
            </p>
            <p className="text-sm text-[#6B7280]">
              © {new Date().getFullYear()} Calmionix. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#2EDF2E] text-[#0B0E13] flex items-center justify-center shadow-lg shadow-[#2EDF2E]/40 hover:bg-[#4ff44f] hover:scale-110 hover:shadow-xl hover:shadow-[#2EDF2E]/50 transition-all duration-500 z-40 group"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
}
