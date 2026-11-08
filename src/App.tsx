import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { FashionStylistModal } from './components/FashionStylistModal';
import { SmartSizeAssistantModal } from './components/SmartSizeAssistantModal';
import { FashionCopilotModal } from './components/FashionCopilotModal';
import { SupportChatWidget } from './components/SupportChatWidget';
import { MobileBottomNav } from './components/MobileBottomNav';

// Views
import { HomeView } from './views/HomeView';
import { CollectionView } from './views/CollectionView';
import { ProductView } from './views/ProductView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { AccountView } from './views/AccountView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { JournalView } from './views/JournalView';
import { RewardsClubView } from './views/RewardsClubView';
import {
  AboutUsView,
  ContactView,
  FAQsView,
  ShippingPolicyView,
  ReturnPolicyView,
  PrivacyPolicyView,
  TermsConditionsView,
  SizeGuideView
} from './views/PolicyViews';

const MainContent: React.FC = () => {
  const { currentView, toast, isCopilotOpen, setIsCopilotOpen } = useShop();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'collection':
        return <CollectionView />;
      case 'product':
        return <ProductView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'account':
        return <AccountView />;
      case 'tracking':
        return <OrderTrackingView />;
      case 'journal':
        return <JournalView />;
      case 'rewards':
        return <RewardsClubView />;
      case 'about':
        return <AboutUsView />;
      case 'contact':
        return <ContactView />;
      case 'faqs':
        return <FAQsView />;
      case 'shipping-policy':
        return <ShippingPolicyView />;
      case 'return-policy':
        return <ReturnPolicyView />;
      case 'privacy-policy':
        return <PrivacyPolicyView />;
      case 'terms-conditions':
        return <TermsConditionsView />;
      case 'size-guide':
        return <SizeGuideView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F2EC] text-[#171513]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 max-w-sm bg-[#171513] text-white px-4 py-3 border border-[#B69A70] shadow-2xl flex items-center gap-3 text-xs animate-slideDown">
          <span className="w-2 h-2 rounded-full bg-[#B69A70]" />
          <p className="flex-1 font-medium">{toast.message}</p>
        </div>
      )}

      {/* Primary Storefront Header */}
      <Header />

      {/* Main View Container (pb-16 on mobile prevents bottom nav overlap) */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderView()}
      </main>

      {/* Primary Storefront Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />

      {/* Modals & Slide-overs */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <FashionStylistModal />
      <SmartSizeAssistantModal />
      <FashionCopilotModal isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
      <SupportChatWidget />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
