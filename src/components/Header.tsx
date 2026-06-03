import { useState } from "react";
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#shop" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-black/90 backdrop-blur-md border-b border-zinc-900 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Brand Logo & Monogram Badge */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center font-display font-bold text-sm tracking-tighter text-white border border-red-600 shadow-[0_0_15px_rgba(185,28,28,0.3)] group-hover:bg-red-600 transition-colors">
            SV
          </div>
          <span className="font-display text-xl font-bold tracking-widest text-white uppercase group-hover:text-zinc-300 transition-colors">
            StyleVibe
          </span>
        </a>

        {/* Desktop Web Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-zinc-400 hover:text-white tracking-wider uppercase transition-colors relative after:absolute after:bottom--2 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Global Action Icons */}
        <div className="flex items-center gap-4">
          {/* Dynamic Search Box */}
          <div className="relative flex items-center">
            {isSearchVisible && (
              <input
                type="text"
                placeholder="Search series..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-40 md:w-56 bg-zinc-950 border border-zinc-800 text-xs px-3 py-1.5 focus:outline-none focus:border-white text-white rounded-none font-mono placeholder:text-zinc-600 animate-fade-in"
              />
            )}
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Button (Heart) */}
          <button
            onClick={onWishlistClick}
            className="p-2 text-zinc-400 hover:text-white transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onCartClick}
            className="p-2 text-zinc-400 hover:text-white transition-colors relative group"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburg Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-zinc-950 border-b border-zinc-900 shadow-2xl z-40 transition-all duration-300 md:hidden">
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium tracking-widest text-zinc-300 hover:text-white uppercase py-2 border-b border-zinc-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
