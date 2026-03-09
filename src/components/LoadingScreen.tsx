import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  // Animate dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 6) return '';
        return prev + '.';
      });
    }, 300);

    return () => clearInterval(dotsInterval);
  }, []);

  // Animate progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/loading-bg.png"
          alt="Loading Background"
          className="w-full h-full object-cover scale-110 animate-pulse"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E13]/70 via-[#0B0E13]/50 to-[#0B0E13]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#2EDF2E] rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-8 animate-bounce">
          <div className="absolute inset-0 bg-[#2EDF2E]/30 rounded-full blur-2xl scale-150 animate-pulse" />
          <img
            src="/images/logo.jpeg"
            alt="Calmionix Logo"
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-2xl shadow-[#2EDF2E]/30 border-2 border-[#2EDF2E]/50 object-cover"
          />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wider">
            <span className="inline-block animate-pulse">C</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>a</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>l</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.3s' }}>m</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>i</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>o</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>n</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.7s' }}>i</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.8s' }}>x</span>
            <span className="text-[#2EDF2E] animate-pulse">{dots}</span>
          </h1>
          <p className="text-[#A7B1C6] text-sm md:text-base animate-pulse">
            Loading experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 md:w-80">
          <div className="h-1 bg-[#141B24] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2EDF2E] to-[#4ff44f] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-2 text-center text-[#2EDF2E] text-sm font-mono">
            {Math.min(Math.round(progress), 100)}%
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#2EDF2E]/30 rounded-tl-3xl animate-pulse" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#2EDF2E]/30 rounded-tr-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#2EDF2E]/30 rounded-bl-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#2EDF2E]/30 rounded-br-3xl animate-pulse" />
    </div>
  );
}
