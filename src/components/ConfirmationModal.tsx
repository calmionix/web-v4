import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, title }: ConfirmationModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 modal-overlay transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative glass-card w-full max-w-md p-6 transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#141B24] flex items-center justify-center text-[#A7B1C6] hover:text-white hover:bg-[#2EDF2E]/20 transition-all duration-300"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#2EDF2E]/10 flex items-center justify-center text-[#2EDF2E] mx-auto mb-6">
          <ExternalLink size={28} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white text-center mb-3">
          Yakin mau pindah ke {title}?
        </h3>

        {/* Description */}
        <p className="text-[#A7B1C6] text-center mb-8">
          Anda akan meninggalkan website ini dan membuka {title} di tab baru.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-[#141B24] border border-[rgba(244,247,255,0.08)] hover:border-[#2EDF2E]/50 transition-all duration-300"
          >
            Tidak
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-[#0B0E13] bg-[#2EDF2E] hover:bg-[#25b525] hover:shadow-lg hover:shadow-[#2EDF2E]/30 transition-all duration-300"
          >
            Iya
          </button>
        </div>
      </div>
    </div>
  );
}
