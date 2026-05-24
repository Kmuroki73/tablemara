import React, { useState, useCallback } from 'react';
import { Router, useRouter } from './router';
import { I18nProvider } from './i18n';
import type { CartItem, Currency } from './types';
import { products } from './data/products';

// Corporate Site
import CorporateNav from './components/shared/CorporateNav';
import CorporateFooter from './components/shared/CorporateFooter';
import HomePage from './pages/corporate/HomePage';
import ResearchPage from './pages/corporate/ResearchPage';
import BlogPage from './pages/corporate/BlogPage';
import NewsPage from './pages/corporate/NewsPage';
import FundersPage from './pages/corporate/FundersPage';
import ResponsibilityPage from './pages/corporate/ResponsibilityPage';
import AboutPage from './pages/corporate/AboutPage';
import ContactPage from './pages/corporate/ContactPage';
import ExportPage from './pages/corporate/ExportPage';

// Shop Site
import ShopNav from './components/shared/ShopNav';
import ShopFooter from './components/shared/ShopFooter';
import ShopHomePage from './pages/shop/ShopHomePage';
import ProductDetailPage from './pages/shop/ProductDetailPage';
import CartPage from './pages/shop/CartPage';
import WishlistPage from './pages/shop/WishlistPage';
import OrdersPage from './pages/shop/OrdersPage';
import ShippingPage from './pages/shop/ShippingPage';
import ReturnsPage from './pages/shop/ReturnsPage';
import FAQPage from './pages/shop/FAQPage';

function AppContent() {
  const { path } = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>('KES');

  const handleAddToCart = useCallback((productId: string, qty = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === productId);
      if (existing) {
        return prev.map((i) =>
          i.product.id === productId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const handleUpdateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
      );
    }
  }, []);

  const handleRemove = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const handleToggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  // Strip query string for route matching
  const pathname = path.split('?')[0];
  const isShopRoute = pathname.startsWith('/shop');

  if (isShopRoute) {
    // ── SHOP SITE ──────────────────────────────────────────
    const shopProps = {
      cart,
      onAddToCart: handleAddToCart,
      wishlist,
      onToggleWishlist: handleToggleWishlist,
      currency,
    };

    let shopContent: React.ReactNode;

    if (pathname.startsWith('/shop/product/')) {
      const slug = pathname.replace('/shop/product/', '');
      shopContent = (
        <ProductDetailPage
          slug={slug}
          cart={cart}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          currency={currency}
        />
      );
    } else if (pathname === '/shop/cart') {
      shopContent = (
        <CartPage
          cart={cart}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
          currency={currency}
        />
      );
    } else if (pathname === '/shop/wishlist') {
      shopContent = (
        <WishlistPage
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          cart={cart}
          onAddToCart={handleAddToCart}
          currency={currency}
        />
      );
    } else if (pathname === '/shop/orders') {
      shopContent = <OrdersPage />;
    } else if (pathname === '/shop/shipping') {
      shopContent = <ShippingPage />;
    } else if (pathname === '/shop/returns') {
      shopContent = <ReturnsPage />;
    } else if (pathname === '/shop/faq') {
      shopContent = <FAQPage />;
    } else {
      // /shop or /shop?category=xxx
      shopContent = <ShopHomePage {...shopProps} />;
    }

    return (
      <div className="flex flex-col min-h-screen">
        <ShopNav
          cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          wishlistCount={wishlist.length}
          currency={currency}
          onCurrencyChange={setCurrency}
        />
        <main className="flex-1">{shopContent}</main>
        <ShopFooter />
      </div>
    );
  }

  // ── CORPORATE SITE ─────────────────────────────────────
  let corporateContent: React.ReactNode;

  if (pathname === '/' || pathname === '') {
    corporateContent = <HomePage />;
  } else if (pathname === '/research' || pathname.startsWith('/research/')) {
    corporateContent = <ResearchPage />;
  } else if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    corporateContent = <BlogPage />;
  } else if (pathname === '/news' || pathname.startsWith('/news/')) {
    corporateContent = <NewsPage />;
  } else if (pathname === '/export' || pathname.startsWith('/export/')) {
    corporateContent = <ExportPage />;
  } else if (pathname === '/funders') {
    corporateContent = <FundersPage />;
  } else if (pathname === '/responsibility') {
    corporateContent = <ResponsibilityPage />;
  } else if (pathname === '/about' || pathname.startsWith('/about/')) {
    corporateContent = <AboutPage />;
  } else if (pathname === '/contact') {
    corporateContent = <ContactPage />;
  } else {
    corporateContent = (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-cream px-6">
        <div className="text-center">
          <p className="text-8xl font-serif font-bold text-forest-200 mb-4">404</p>
          <h1 className="font-serif text-3xl text-forest-900 mb-3">Page Not Found</h1>
          <p className="text-earth-500 mb-8">The page you're looking for doesn't exist.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => window.history.back()} className="btn-secondary">Go Back</button>
          <a href="/" className="btn-primary">Go Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CorporateNav />
      <main className="flex-1">{corporateContent}</main>
      <CorporateFooter />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </Router>
  );
}
