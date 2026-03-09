import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CreditCard, Calendar, MessageSquare, CheckCircle, Shield, Clock } from 'lucide-react';

const terms = [
  {
    icon: <CreditCard size={24} />,
    title: 'Pembayaran',
    description: 'Pembayaran dilakukan di awal sebelum proses pengerjaan konten dimulai.',
    color: '#2EDF2E',
  },
  {
    icon: <Calendar size={24} />,
    title: 'Jadwal',
    description: 'Setelah pembayaran dilakukan, jadwal upload dan record akan diberitahukan.',
    color: '#3B82F6',
  },
  {
    icon: <MessageSquare size={24} />,
    title: 'Fast Response',
    description: 'Owner server diwajibkan untuk fast respon karena slow respon akan menghambat proses pembuatan konten.',
    color: '#F59E0B',
  },
  {
    icon: <CheckCircle size={24} />,
    title: 'Revisi',
    description: 'Jumlah revisi sesuai dengan paket yang dipilih. Revisi besar mungkin dikenakan biaya tambahan.',
    color: '#8B5CF6',
  },
];

export function Terms() {
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B0E13]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2EDF2E]/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 223, 46, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 223, 46, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '70px 70px',
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
              <Shield size={14} className="animate-pulse" />
              Terms
            </span>
          </div>
          <h2
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-heading font-bold text-white mb-4"
            style={{ transitionDelay: '200ms' }}
          >
            Ketentuan Endorse<span className="text-[#2EDF2E] animate-pulse">.</span>
          </h2>
          <p
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-[#A7B1C6] max-w-xl mx-auto"
            style={{ transitionDelay: '300ms' }}
          >
            Mohon dibaca dengan seksama sebelum melakukan pemesanan endorse.
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {terms.map((term, index) => (
            <div
              key={term.title}
              className="reveal opacity-0 translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="glass-card p-6 h-full group relative overflow-hidden"
                style={{
                  transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  borderColor: hoveredIndex === index ? `${term.color}50` : undefined,
                }}
              >
                {/* Background Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${term.color}10, transparent 70%)`
                  }}
                />

                <div className="relative z-10">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: hoveredIndex === index ? term.color : `${term.color}20`,
                      color: hoveredIndex === index ? '#fff' : term.color,
                      boxShadow: hoveredIndex === index ? `0 0 30px ${term.color}50` : 'none'
                    }}
                  >
                    {term.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#2EDF2E] transition-colors">
                    {term.title}
                  </h3>
                  <p className="text-sm text-[#A7B1C6] leading-relaxed group-hover:text-white transition-colors">
                    {term.description}
                  </p>
                </div>

                {/* Number Badge */}
                <div 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: hoveredIndex === index ? term.color : 'transparent',
                    color: hoveredIndex === index ? '#fff' : `${term.color}50`,
                    border: `1px solid ${hoveredIndex === index ? term.color : `${term.color}30`}`
                  }}
                >
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Note */}
        <div
          className="reveal opacity-0 translate-y-8 transition-all duration-1000 mt-12"
          style={{ transitionDelay: '900ms' }}
        >
          <div className="glass-card p-6 flex items-start gap-4 group hover:bg-amber-500/5 transition-colors duration-500">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-[#0B0E13] group-hover:rotate-12 transition-all duration-500">
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">Catatan Penting</h4>
              <p className="text-sm text-[#A7B1C6] leading-relaxed group-hover:text-white transition-colors">
                Dengan melakukan pemesanan, Anda menyetujui semua ketentuan di atas. 
                Untuk pertanyaan lebih lanjut, silakan hubungi saya melalui WhatsApp 
                atau Discord yang tertera di bagian Contact.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className="reveal opacity-0 translate-y-8 transition-all duration-1000 mt-12"
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 glass-card px-4 py-2 hover:bg-[#2EDF2E]/10 transition-colors cursor-default">
              <Clock size={16} className="text-[#2EDF2E]" />
              <span className="text-sm text-[#A7B1C6]">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 hover:bg-[#2EDF2E]/10 transition-colors cursor-default">
              <Shield size={16} className="text-[#2EDF2E]" />
              <span className="text-sm text-[#A7B1C6]">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 hover:bg-[#2EDF2E]/10 transition-colors cursor-default">
              <CheckCircle size={16} className="text-[#2EDF2E]" />
              <span className="text-sm text-[#A7B1C6]">Quality Guaranteed</span>
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
