import { useState, useEffect } from "react";
import { SAMPLE_PRODUCTS } from "./products";
import { CartItem, Product } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShoppingBag, Heart, ArrowRight, Check } from "lucide-react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import ProductModal from "./components/ProductModal";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  // Global States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activePriceRange, setActivePriceRange] = useState("ALL");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Toast System States
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Order Success Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Hydrate states from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("styleVibeCart");
    const savedWishlist = localStorage.getItem("styleVibeWishlist");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync to LocalStorage on change
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("styleVibeCart", JSON.stringify(newCart));
  };

  const saveWishlistToStorage = (newWishlist: number[]) => {
    setWishlist(newWishlist);
    localStorage.setItem("styleVibeWishlist", JSON.stringify(newWishlist));
  };

  // Trigger Toast Notification Helper
  const triggerToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    // auto-dismiss
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // State Updates Cart Actions
  const handleAddToCart = (productId: number) => {
    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    // Check if item already exists
    const existingIndex = cart.findIndex((item) => item.id === productId);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
          selectedSize: product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined,
          selectedColor: product.colors && product.colors.length > 0 ? product.colors[0] : undefined,
        },
      ];
    }
    saveCartToStorage(updatedCart);
    triggerToast(`Added ${product.name} to your shopping bag.`);
  };

  const handleAddToCartWithDetails = (productId: number, size?: string, color?: string) => {
    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    // We identify unique items by ID + size + color to avoid collision in e-commerce
    const existingIndex = cart.findIndex(
      (item) =>
        item.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
    );
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    }
    saveCartToStorage(updatedCart);
    setSelectedProduct(null); // Close quick view
    triggerToast(`Added ${product.name} with customized options.`);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    saveCartToStorage(updatedCart);
  };

  const handleRemoveItem = (productId: number) => {
    const item = cart.find((i) => i.id === productId);
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCartToStorage(updatedCart);
    if (item) {
      triggerToast(`Removed ${item.name} from your bag.`, "info");
    }
  };

  // Wishlist actions
  const handleToggleWishlist = (productId: number) => {
    const isPresent = wishlist.includes(productId);
    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    let updatedWishlist: number[] = [];

    if (isPresent) {
      updatedWishlist = wishlist.filter((id) => id !== productId);
      triggerToast(`Removed ${product?.name || "Item"} from wishlist.`, "info");
    } else {
      updatedWishlist = [...wishlist, productId];
      triggerToast(`Added ${product?.name || "Item"} to your wishlist!`);
    }
    saveWishlistToStorage(updatedWishlist);
  };

  // Proceed to checkout order processing
  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowSuccessModal(true);
    // Clear cart both in React state and in local storage
    saveCartToStorage([]);
  };

  // Get categories lists dynamically
  const categories = ["ALL", ...Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.category.toUpperCase())))];

  // Price ranges setup
  const priceRanges = [
    { label: "All Pricing", value: "ALL" },
    { label: "Under $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "Over $100", value: "100-9999" },
  ];

  // Global Filter Application
  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    // 1. Search Query Match
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category Match
    const matchesCategory =
      activeCategory === "ALL" ||
      product.category.toUpperCase() === activeCategory;

    // 3. Price Range Match
    let matchesPrice = true;
    if (activePriceRange !== "ALL") {
      const [minPrice, maxPrice] = activePriceRange.split("-").map(Number);
      matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    }

    // 4. Wishlist Match filter if active
    const matchesWishlistOnly = !showWishlistOnly || wishlist.includes(product.id);

    return matchesSearch && matchesCategory && matchesPrice && matchesWishlistOnly;
  });

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col selection:bg-white selection:text-black">
      
      {/* 1. Sticky Nav Header */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => {
          setShowWishlistOnly((prev) => !prev);
          triggerToast(
            showWishlistOnly ? "Showing all products." : "Filtering by your favorited items.",
            "info"
          );
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Hero Board Section */}
      <Hero />

      {/* 3. Main Shopping Area */}
      <main id="shop" className="max-w-7xl mx-auto px-6 py-20 w-full flex-grow">
        
        {/* Collection Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-zinc-500" />
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.25em]">
                // High-End Tailoring Showcase
              </span>
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white uppercase flex items-center gap-3">
              {showWishlistOnly ? "My Wishlist" : "The Collection"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {showWishlistOnly && (
              <button
                onClick={() => setShowWishlistOnly(false)}
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors uppercase border-b border-zinc-700 hover:border-white py-1"
              >
                ← View All Products
              </button>
            )}
            
            <p className="font-mono text-xs text-zinc-500">
              Showing {filteredProducts.length} of {SAMPLE_PRODUCTS.length} curated pieces
            </p>
          </div>
        </div>

        {/* Categories Tab and Prices Side Filters */}
        <Filters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activePriceRange={activePriceRange}
          onPriceRangeChange={setActivePriceRange}
          categories={categories}
          priceRanges={priceRanges}
        />

        {/* Dynamic Products Grid with Animations */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-zinc-900 bg-zinc-950 flex flex-col items-center justify-center">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
              // Zero matches resolved on active query.
            </span>
            <button
              onClick={() => {
                setActiveCategory("ALL");
                setActivePriceRange("ALL");
                setSearchQuery("");
                setShowWishlistOnly(false);
              }}
              className="px-6 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(id) => {
                  const prod = SAMPLE_PRODUCTS.find((p) => p.id === id);
                  if (prod) setSelectedProduct(prod);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* 4. Brand Story / Ethos Section */}
      <AboutSection />

      {/* 5. Contact Registry Section */}
      <ContactSection />

      {/* 6. Clean Minimalist footer */}
      <Footer />

      {/* 7. Cart Sliding Drawer Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* 8. Detailed Quick View Modal Overlay */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCartWithDetails={handleAddToCartWithDetails}
      />

      {/* 9. Success Modal Feedback for Clean Checkout */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="bg-zinc-950 border border-zinc-800 p-8 md:p-12 text-center max-w-lg w-full relative space-y-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Check badge */}
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <Check className="w-8 h-8" />
                </div>
                
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                  ORDER COMPLETED SUCCESSFULLY
                </span>
                
                <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-white uppercase">
                  Reserved At The Atelier
                </h3>
                
                <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                  Your curated selection has been logged under virtual reservation. An envoy notification with tracking and customs summary has been dispatched directly to your courier list coordinates.
                </p>

                <div className="border-t border-zinc-900 pt-6 mt-6 space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-500">Reservation Ticket:</span>
                    <span className="text-white">#SV-RESERVE-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-500">Dispatch Estimate:</span>
                    <span className="text-white">Within 48 Standard Hours</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full mt-8 py-3.5 bg-white text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-zinc-200 outline-none"
                >
                  Continue Browsing
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 10. Global Toast Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 60, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 40, x: "-50%" }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 border text-xs font-mono tracking-wider uppercase flex items-center gap-3 shadow-[0_10px_35px_rgba(0,0,0,0.8)] ${
              toast.type === "error"
                ? "bg-red-950 border-red-800 text-red-200"
                : toast.type === "info"
                ? "bg-zinc-950 border-zinc-800 text-zinc-400"
                : "bg-white border-white text-black font-bold"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${toast.type === 'error' ? 'bg-red-400' : toast.type === 'info' ? 'bg-zinc-500' : 'bg-black'}`} />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
