import { useEffect, useRef, useState } from 'react';
import { Check, Zap, Star, Crown, Sparkles, ArrowRight } from 'lucide-react';

interface PriceListProps {
  onOrderClick: (platform: string, packages: { name: string; price: string }[]) => void;
}

const packages = [
  {
    name: 'VIDEO ONLY',
    icon: <Zap size={24} />,
    price: 'Rp40.000',
    description: '1x revisi',
    features: ['1 video konten', '1x revisi', 'Durasi 5-10 menit', 'Upload ke platform pilihan'],
    featured: false,
    color: '#2EDF2E',
  },
  {
    name: 'YOUTUBE SHORT',
    icon: <Star size={24} />,
    price: 'Rp30.000',
    description: 'Vertical format',
    features: ['Format vertikal', 'Durasi 30-60 detik', 'Fast turnaround', 'Optimasi untuk Shorts'],
    featured: false,
    color: '#FF0000',
  },
  {
    name: 'TIKTOK',
    icon: <Crown size={24} />,
    price: 'Rp50.000 - Rp70.000',
    description: 'Pilih paket revisi',
    features: [
      'Tanpa revisi: Rp50.000',
      '1x revisi: Rp60.000',
      '2x revisi: Rp70.000',
      'Format vertikal optimasi'
    ],
    featured: true,
    color: '#2EDF2E',
    subPackages: [
      { name: 'Tanpa Revisi', price: 'Rp50.000' },
      { name: '1x Revisi', price: 'Rp60.000' },
      { name: '2x Revisi', price: 'Rp70.000' },
    ],
  },
  {
    name: 'SALURAN WHATSAPP',
    icon: <Check size={24} />,
    price: 'Rp25.000',
    description: '2x upload',
    features: ['2x upload ke saluran', 'Format optimasi WA', 'Jangkauan langsung', 'Update real-time'],
    featured: false,
    color: '#25D366',
  },
];

export function PriceList({ onOrderClick }: PriceListProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const handleOrder = (pkg: typeof packages[0]) => {
    if (pkg.subPackages) {
      onOrderClick(pkg.name, pkg.subPackages);
    } else {
      const message = `Halo Calmionix, saya ingin memesan endorse ${pkg.name} dengan harga ${pkg.price}.`;
      window.open(`https://wa.me/6282130570915?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <section
      id="pricelist"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#141B24]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#2EDF2E]/5 rounded-full blur-3xl" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 223, 46, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 223, 46, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 mb-4"
            style={{ transitionDelay: '100ms' }}
          >
            <span className="tag inline-flex items-center gap-2">
              <Sparkles size={14} className="animate-pulse" />
              Pricing
            </span>
          </div>
          <h2
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-heading font-bold text-white mb-4"
            style={{ transitionDelay: '200ms' }}
          >
            Price List Endorse Calmionix<span className="text-[#2EDF2E] animate-pulse">.</span>
          </h2>
          <p
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-[#A7B1C6] max-w-xl mx-auto"
            style={{ transitionDelay: '300ms' }}
          >
            Pilih paket yang sesuai dengan kebutuhan promosi server atau add-on Minecraft Anda.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`reveal opacity-0 translate-y-8 transition-all duration-1000 ${
                pkg.featured ? 'lg:-mt-6 lg:mb-6' : ''
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`price-card h-full relative overflow-hidden group ${pkg.featured ? 'featured' : ''}`}
                style={{
                  transform: hoveredIndex === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  borderColor: hoveredIndex === index ? pkg.color : undefined,
                  boxShadow: hoveredIndex === index ? `0 30px 60px rgba(0,0,0,0.4), 0 0 40px ${pkg.color}30` : undefined
                }}
              >
                {/* Featured Badge */}
                {pkg.featured && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#2EDF2E] to-[#4ff44f] text-[#0B0E13] text-xs font-bold py-2 text-center uppercase tracking-wider">
                    <Sparkles size={12} className="inline mr-1" />
                    Most Popular
                  </div>
                )}

                {/* Background Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${pkg.color}15, transparent 70%)`
                  }}
                />

                <div className="relative z-10 pt-6">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: hoveredIndex === index ? pkg.color : `${pkg.color}20`,
                      color: hoveredIndex === index ? '#fff' : pkg.color,
                      boxShadow: hoveredIndex === index ? `0 0 30px ${pkg.color}50` : 'none'
                    }}
                  >
                    {pkg.icon}
                  </div>

                  {/* Package Name */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#2EDF2E] transition-colors">{pkg.name}</h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span 
                      className="text-2xl lg:text-3xl font-bold transition-all duration-300"
                      style={{
                        color: hoveredIndex === index ? pkg.color : '#2EDF2E',
                        textShadow: hoveredIndex === index ? `0 0 20px ${pkg.color}50` : 'none'
                      }}
                    >
                      {pkg.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#A7B1C6] mb-6">{pkg.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#A7B1C6] group-hover:text-white transition-colors">
                        <Check size={16} className="text-[#2EDF2E] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleOrder(pkg)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-500 flex items-center justify-center gap-2 group/btn ${
                      pkg.featured
                        ? 'bg-[#2EDF2E] text-[#0B0E13] hover:bg-[#4ff44f] hover:shadow-lg hover:shadow-[#2EDF2E]/40'
                        : 'bg-[#141B24] text-white border border-[rgba(244,247,255,0.08)] hover:border-[#2EDF2E] hover:text-[#2EDF2E] hover:bg-[#2EDF2E]/10'
                    }`}
                  >
                    <span>Pesan Sekarang</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Corner Decoration */}
                <div 
                  className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(315deg, transparent 50%, ${pkg.color}10 50%)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-center mt-12"
          style={{ transitionDelay: '900ms' }}
        >
          <div className="inline-flex items-center gap-3 glass-card px-6 py-4">
            <Sparkles size={18} className="text-[#2EDF2E] animate-pulse" />
            <p className="text-sm text-[#A7B1C6]">
              Semua harga dalam Rupiah (IDR). Pembayaran di awal sebelum pengerjaan.
            </p>
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
