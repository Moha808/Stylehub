import { Heart, Plus, Eye } from "lucide-react";
import { Product } from "../types";
import { motion } from "motion/react";

interface ProductCardProps {
  key?: any;
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onQuickView: (productId: number) => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-zinc-950 border border-zinc-900 overflow-hidden hover:border-zinc-800 transition-colors duration-300"
    >
      {/* Zoomable Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => onQuickView(product.id)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Contrast Overlay Accent */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />

        {/* Favorite/Wishlist Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/80 hover:bg-white text-zinc-400 hover:text-black flex items-center justify-center transition-all border border-zinc-900 hover:border-white focus:outline-none"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Quick View Overlap Trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product.id);
            }}
            className="px-5 py-3 bg-black text-white hover:bg-white hover:text-black border border-zinc-800 text-xs font-semibold tracking-widest uppercase transition-all flex items-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Info Content Panel */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            {product.category}
          </span>
          <span className="font-mono text-xs font-semibold text-white">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <h3 
          onClick={() => onQuickView(product.id)}
          className="font-display text-sm font-medium text-white hover:text-zinc-300 transition-colors tracking-tight line-clamp-1 mb-4 cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Tactile High-Contrast Add to Cart Trigger */}
        <button
          onClick={() => onAddToCart(product.id)}
          className="mt-auto w-full py-2.5 bg-zinc-900 hover:bg-white text-white hover:text-black border border-zinc-800 hover:border-white text-xs font-medium tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
}
