import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/common/ToastContainer';
import { HeaderBanner } from './components/common/HeaderBanner';
import { CustomerNavbar } from './components/customer/CustomerNavbar';
import { CustomerFooter } from './components/common/CustomerFooter';
import { LandingPages } from './components/customer/LandingPages';
import { AuthPages } from './components/customer/AuthPages';
import { ProductCatalog } from './components/customer/ProductCatalog';
import { ProductDetailsPage } from './components/customer/ProductDetailsPage';
import { CartAndCheckout } from './components/customer/CartAndCheckout';
import { CustomerOrdersAndTracking } from './components/customer/CustomerOrdersAndTracking';
import { CustomerAccountPages } from './components/customer/CustomerAccountPages';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { portalMode, customerPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Global Toast Notification System */}
      <ToastContainer />

      {/* Global Portal Switcher Banner */}
      <HeaderBanner />

      {/* RENDER VIEW ACCORDING TO ACTIVE PORTAL */}
      {portalMode === 'admin' || portalMode === 'delivery' || portalMode === 'architecture' ? (
        <AdminDashboard />
      ) : (
        /* CUSTOMER STOREFRONT & PORTAL */
        <div className="flex-1 flex flex-col">
          <CustomerNavbar />

          <main className="flex-1">
            {/* 1. Landing Pages */}
            {customerPage.startsWith('landing-') && (
              <LandingPages activeLandingPage={customerPage} />
            )}

            {/* 2. Authentication Pages */}
            {customerPage.startsWith('auth-') && (
              <AuthPages activeAuthPage={customerPage} />
            )}

            {/* 3. Product Catalog Storefront */}
            {(customerPage === 'cust-home' ||
              customerPage === 'cust-products' ||
              customerPage === 'cust-categories') && (
              <ProductCatalog />
            )}

            {/* 4. Product Details */}
            {customerPage === 'cust-product-details' && <ProductDetailsPage />}

            {/* 5. Cart and Checkout */}
            {customerPage === 'cust-cart' && <CartAndCheckout isCheckoutMode={false} />}
            {customerPage === 'cust-checkout' && <CartAndCheckout isCheckoutMode={true} />}

            {/* 6. Orders and Delivery Status */}
            {(customerPage === 'cust-orders' || customerPage === 'cust-live-tracking') && (
              <CustomerOrdersAndTracking isLiveTrackingMode={false} />
            )}

            {/* 7. Account Management & Subpages */}
            {(customerPage === 'cust-wishlist' ||
              customerPage === 'cust-compare' ||
              customerPage === 'cust-profile' ||
              customerPage === 'cust-wallet' ||
              customerPage === 'cust-addresses' ||
              customerPage === 'cust-notifications' ||
              customerPage === 'cust-referrals' ||
              customerPage === 'cust-coupons' ||
              customerPage === 'cust-saved-cards' ||
              customerPage === 'cust-invoices' ||
              customerPage === 'cust-settings' ||
              customerPage === 'cust-support') && (
              <CustomerAccountPages activeAccountPage={customerPage} />
            )}
          </main>

          <CustomerFooter />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
