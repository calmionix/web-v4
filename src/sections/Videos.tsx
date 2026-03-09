import { useEffect, useRef, useState } from 'react';
import { Play, Youtube, ExternalLink, Eye, Clock, TrendingUp } from 'lucide-react';

const videos = [
  {
    id: 'IphMg209DCE',
    title: 'Villager vs Pillager War',
    duration: '8:24',
    views: '1.2K',
  },
  {
    id: 'XqcqkOP6jXI',
    title: 'Nether Boss Fight',
    duration: '12:15',
    views: '2.5K',
  },
  {
    id: 'UI2Ahpt_wzw',
    title: 'Server Spawn Tour',
    duration: '5:30',
    views: '890',
  },
];

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export function Videos() {
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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
    setHoveredIndex(index);
  };

  const openVideo = (videoId: string) => {
    window.open(`https://youtu.be/${videoId}`, '_blank');
  };

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2EDF2E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EDF2E]/5 rounded-full blur-3xl" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 223, 46, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 223, 46, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 mb-4"
              style={{ transitionDelay: '100ms' }}
            >
              <span className="tag flex items-center gap-2">
                <TrendingUp size={14} className="animate-pulse" />
                Content
              </span>
            </div>
            <h2
              className="reveal opacity-0 translate-y-8 transition-all duration-1000 text-heading font-bold text-white"
              style={{ transitionDelay: '200ms' }}
            >
              Latest YouTube Videos
              <span className="text-[#2EDF2E] animate-pulse">.</span>
            </h2>
          </div>
          <a
            href="https://youtube.com/@calmionix"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal opacity-0 translate-y-8 transition-all duration-1000 btn-outline flex items-center gap-2 group w-fit hover:scale-105"
            style={{ transitionDelay: '300ms' }}
          >
            <Youtube size={18} className="group-hover:scale-110 transition-transform" />
            View All Videos
            <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="reveal opacity-0 translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <div
                className="video-card glass-card group cursor-pointer overflow-hidden"
                onClick={() => openVideo(video.id)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transform: hoveredIndex === index 
                    ? `perspective(1000px) rotateX(${-mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) scale(1.02)`
                    : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img
                    src={getYouTubeThumbnail(video.id)}
                    alt={video.title}
                    className="video-thumbnail w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E13] via-[#0B0E13]/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[#2EDF2E]/0 group-hover:bg-[#2EDF2E]/10 transition-colors duration-500" />
                  
                  {/* Play Button */}
                  <div className="play-icon absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#2EDF2E] rounded-full blur-xl opacity-50 animate-pulse scale-150" />
                      <div className="relative w-16 h-16 rounded-full bg-[#2EDF2E] flex items-center justify-center shadow-lg shadow-[#2EDF2E]/50 group-hover:scale-110 transition-transform duration-300">
                        <Play size={28} className="text-[#0B0E13] ml-1" fill="#0B0E13" />
                      </div>
                    </div>
                  </div>

                  {/* YouTube Icon */}
                  <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shadow-lg">
                      <Youtube size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 glass-card px-2 py-1 flex items-center gap-1 text-xs">
                    <Clock size={12} className="text-[#2EDF2E]" />
                    <span className="text-white">{video.duration}</span>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-[#2EDF2E]/0 group-hover:border-[#2EDF2E]/50 rounded-xl transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-3 group-hover:text-[#2EDF2E] transition-colors line-clamp-2 text-lg">
                    {video.title}
                  </h3>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-[#A7B1C6]">
                      <Eye size={14} className="text-[#2EDF2E]" />
                      <span>{video.views} views</span>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 text-sm text-[#A7B1C6] group-hover:text-[#2EDF2E] transition-colors w-full justify-center py-2 rounded-lg bg-[#141B24] group-hover:bg-[#2EDF2E]/10">
                    Watch Video
                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          className="reveal opacity-0 translate-y-8 transition-all duration-1000 mt-12"
          style={{ transitionDelay: '900ms' }}
        >
          <div className="glass-card p-6 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                <Youtube size={24} className="text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-sm text-[#A7B1C6]">Videos</div>
              </div>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#2EDF2E]/20 flex items-center justify-center group-hover:bg-[#2EDF2E]/30 transition-colors">
                <Eye size={24} className="text-[#2EDF2E]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">25K+</div>
                <div className="text-sm text-[#A7B1C6]">Total Views</div>
              </div>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <TrendingUp size={24} className="text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Growing</div>
                <div className="text-sm text-[#A7B1C6]">Community</div>
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
