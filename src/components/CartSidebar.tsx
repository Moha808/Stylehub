import { X, Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSidebarProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Mask overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto"
          />

          {/* Sizable Sidebar Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-black border-l border-zinc-900 z-50 flex flex-col pointer-events-auto"
          >
            {/* Header section with line details */}
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  Shopping Bag
                </h2>
                <p className="font-mono text-[9px] text-zinc-500 uppercase mt-1">
                  // {cartItems.length} curated item{cartItems.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all focus:outline-none"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Contents Scroll area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-[11px] text-zinc-600 uppercase mb-4 tracking-widest">
                    // Your bag is vacant.
                  </span>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
                  >
                    Return to shop
                  </button>
                </div>
              ) : (
                <div className="space-y-6 divide-y divide-zinc-950">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-6 first:pt-0 flex gap-4 group">
                      {/* Product Thumbnail Pic */}
                      <div className="w-20 h-24 bg-zinc-900 overflow-hidden shrink-0 border border-zinc-950">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Detail info */}
                      <div className="flex-grow flex flex-col">
                        <div className="flex justify-between gap-2">
                          <h4 className="font-display text-sm font-medium text-white tracking-tight line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="font-mono text-xs font-medium text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Extra configurations selected by user if any */}
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {item.selectedSize && (
                            <span className="font-mono text-[9px] bg-zinc-950 text-zinc-400 border border-zinc-900 px-2 py-0.5 uppercase tracking-wider">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="font-mono text-[9px] bg-zinc-950 text-zinc-400 border border-zinc-900 px-2 py-0.5 flex items-center gap-1 uppercase tracking-wider">
                              Color:{" "}
                              <span
                                className="w-2 h-2 rounded-full border border-zinc-800"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </span>
                          )}
                        </div>

                        {/* Quantity Modifier Selector */}
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center border border-zinc-900 bg-zinc-950">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 px-2.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-zinc-400"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-[11px] px-3 font-medium text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2.5 text-zinc-400 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 text-zinc-650 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total price + Checkout Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-zinc-950 border-t border-zinc-900 space-y-4">
                <div className="flex items-center justify-between text-white font-display">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                    Subtotal Amount
                  </span>
                  <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <p className="font-mono text-[9px] text-zinc-500 uppercase">
                  * Shipping, customs duties & taxes calculated at checkout.
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-white text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-zinc-200 outline-none hover:shadow-[0_4px_25px_rgba(255,255,255,0.15)] block"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
