import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { SocialLinks } from './sections/SocialLinks';
import { Videos } from './sections/Videos';
import { PriceList } from './sections/PriceList';
import { Terms } from './sections/Terms';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { ConfirmationModal } from './components/ConfirmationModal';
import { OrderModal } from './components/OrderModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; link: string; title: string }>({
    isOpen: false,
    link: '',
    title: ''
  });
  
  const [orderModal, setOrderModal] = useState<{ isOpen: boolean; platform: string; packages: { name: string; price: string }[] }>({
    isOpen: false,
    platform: '',
    packages: []
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleSocialClick = (link: string, title: string) => {
    setConfirmModal({ isOpen: true, link, title });
  };

  const handleOrderClick = (platform: string, packages: { name: string; price: string }[]) => {
    setOrderModal({ isOpen: true, platform, packages });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, link: '', title: '' });
  };

  const closeOrderModal = () => {
    setOrderModal({ isOpen: false, platform: '', packages: [] });
  };

  const confirmNavigation = () => {
    window.open(confirmModal.link, '_blank');
    closeConfirmModal();
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <div className={`min-h-screen bg-[#0B0E13] transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        
        <Navigation />
        
        <main>
          <Hero />
          <About />
          <SocialLinks onSocialClick={handleSocialClick} />
          <Videos />
          <PriceList onOrderClick={handleOrderClick} />
          <Terms />
          <Contact />
        </main>
        
        <Footer onSocialClick={handleSocialClick} />

        {/* Modals */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={closeConfirmModal}
          onConfirm={confirmNavigation}
          title={confirmModal.title}
        />
        
        <OrderModal
          isOpen={orderModal.isOpen}
          onClose={closeOrderModal}
          platform={orderModal.platform}
          packages={orderModal.packages}
        />
      </div>
    </>
  );
}

export default App;
