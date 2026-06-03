import { useState, useEffect } from "react";
import { X, ShoppingBag, Check } from "lucide-react";
import { Product } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCartWithDetails: (productId: number, size?: string, color?: string) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCartWithDetails,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Auto-select first options on load
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize("");
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor("");
      }
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop Mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 pointer-events-auto"
          />

          {/* Central Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-black border border-zinc-900 shadow-2xl p-6 md:p-12 z-50 pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Interactive Media Gallery */}
                <div className="relative aspect-[3/4] bg-zinc-900 border border-zinc-950 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white text-black text-[9px] font-mono tracking-widest uppercase px-3 py-1 font-bold">
                    {product.category}
                  </div>
                </div>

                {/* Right: Fine-tuned Specifications */}
                <div className="flex flex-col justify-center">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-2 block">
                    Product Reference #{1000 + product.id}
                  </span>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white uppercase mb-3">
                    {product.name}
                  </h2>

                  <div className="font-mono text-lg font-bold text-white mb-6">
                    ${product.price.toFixed(2)}
                  </div>

                  <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed mb-8">
                    {product.description}
                  </p>

                  <div className="space-y-6 mb-8">
                    {/* Size Selector */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                            Choose Size
                          </label>
                          <span className="font-mono text-[9px] text-zinc-500">
                            Current: {selectedSize}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`w-10 h-10 text-xs font-mono tracking-wider transition-all border ${
                                selectedSize === size
                                  ? "bg-white text-black border-white font-bold"
                                  : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-white hover:border-zinc-700"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color Selector */}
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                            Choose Color Theme
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                selectedColor === color
                                  ? "border-white ring-2 ring-zinc-800"
                                  : "border-zinc-800 hover:border-zinc-500"
                              }`}
                              style={{ backgroundColor: color }}
                              title={color}
                            >
                              {selectedColor === color && (
                                <Check className={`w-3.5 h-3.5 ${color === '#ffffff' ? 'text-black' : 'text-white'}`} />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => onAddToCartWithDetails(product.id, selectedSize, selectedColor)}
                      className="w-full py-4 bg-white text-black font-bold text-xs tracking-widest uppercase transition-all hover:bg-zinc-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Shopping Bag
                    </button>
                    
                    <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-zinc-950">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                          In Atelier Stock
                        </span>
                      </div>
                      <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                        Free Worldwide Courier
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
