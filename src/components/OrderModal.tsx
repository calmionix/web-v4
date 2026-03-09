import { useEffect, useState } from 'react';
import { X, Check, ShoppingCart } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
  packages: { name: string; price: string }[];
}

export function OrderModal({ isOpen, onClose, platform, packages }: OrderModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

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
      setSelectedPackage(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOrder = () => {
    if (!selectedPackage) return;
    
    const pkg = packages.find(p => p.name === selectedPackage);
    if (!pkg) return;

    const message = `Halo Calmionix, saya ingin memesan endorse ${platform} paket ${pkg.price} (${pkg.name}).`;
    window.open(`https://wa.me/6282130570915?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

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
          <ShoppingCart size={28} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white text-center mb-2">
          Pilih Paket {platform}
        </h3>
        <p className="text-[#A7B1C6] text-center text-sm mb-6">
          Silakan pilih paket yang sesuai dengan kebutuhan Anda.
        </p>

        {/* Package Options */}
        <div className="space-y-3 mb-6">
          {packages.map((pkg) => (
            <button
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg.name)}
              className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                selectedPackage === pkg.name
                  ? 'border-[#2EDF2E] bg-[#2EDF2E]/10'
                  : 'border-[rgba(244,247,255,0.08)] bg-[#141B24] hover:border-[#2EDF2E]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    selectedPackage === pkg.name
                      ? 'border-[#2EDF2E] bg-[#2EDF2E]'
                      : 'border-[#6B7280]'
                  }`}
                >
                  {selectedPackage === pkg.name && (
                    <Check size={12} className="text-[#0B0E13]" />
                  )}
                </div>
                <span className="text-white font-medium">{pkg.name}</span>
              </div>
              <span className="text-[#2EDF2E] font-bold">{pkg.price}</span>
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-[#141B24] border border-[rgba(244,247,255,0.08)] hover:border-[#2EDF2E]/50 transition-all duration-300"
          >
            Batal
          </button>
          <button
            onClick={handleOrder}
            disabled={!selectedPackage}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              selectedPackage
                ? 'text-[#0B0E13] bg-[#2EDF2E] hover:bg-[#25b525] hover:shadow-lg hover:shadow-[#2EDF2E]/30'
                : 'text-[#6B7280] bg-[#141B24] cursor-not-allowed'
            }`}
          >
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
