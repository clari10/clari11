import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, ThemeSettings } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  theme: ThemeSettings;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  theme,
  onCheckout,
}: CartDrawerProps) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity * (item.weightOption === '1kg' ? 3.5 : 1),
    0
  );

  const shippingThreshold = 65;
  const progressToFreeShipping = Math.min((totalPrice / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = shippingThreshold - totalPrice;

  const getRadiusClass = () => {
    switch (theme.buttonBorderRadius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'full': return 'rounded-full';
      default: return 'rounded-none';
    }
  };

  const getFontFamilyClass = () => {
    switch (theme.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'sans': return 'font-sans';
      default: return 'font-sans';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            id="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Body */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
            className={`fixed right-0 top-0 bottom-0 z-50 flex h-full w-full max-w-md flex-col border-l border-neutral-200/50 shadow-2xl ${getFontFamilyClass()}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200/50 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-medium tracking-tight">Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
              </div>
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="rounded-full p-1 transition-colors hover:bg-neutral-200/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-neutral-100/50 border-b border-neutral-200/40 px-6 py-4 text-xs">
              {remainingForFreeShipping > 0 ? (
                <p className="mb-2">
                  You are <span className="font-semibold">${remainingForFreeShipping.toFixed(2)}</span> away from <strong>FREE SHIPPING</strong>.
                </p>
              ) : (
                <p className="mb-2 font-medium text-emerald-700 flex items-center gap-1">
                  🎉 Congratulations! Your order qualifies for <strong>FREE EXPRESS SHIPPING</strong>!
                </p>
              )}
              <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-700 transition-all duration-500 ease-out"
                  style={{
                    width: `${progressToFreeShipping}%`,
                    backgroundColor: theme.accentColor,
                  }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-neutral-300 stroke-1 mb-4" />
                  <p className="text-sm font-medium opacity-80">Your cart is currently empty</p>
                  <button
                    id="cart-continue-shopping"
                    onClick={onClose}
                    className="mt-4 text-xs underline font-medium hover:opacity-70 transition-opacity"
                    style={{ color: theme.accentColor }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const singlePrice = item.product.price * (item.weightOption === '1kg' ? 3.5 : 1);
                  const itemTotal = singlePrice * item.quantity;

                  return (
                    <motion.div
                      id={`cart-item-${idx}`}
                      key={`${item.product.id}-${item.grindOption}-${item.weightOption}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 border-b border-neutral-200/30 pb-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="h-20 w-20 bg-neutral-100 object-cover border border-neutral-200/40"
                        style={{ borderRadius: theme.buttonBorderRadius === 'full' ? '8px' : '0px' }}
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-sm">
                            <h3 className="font-medium pr-2 leading-tight">{item.product.name}</h3>
                            <span className="font-semibold">${itemTotal.toFixed(2)}</span>
                          </div>
                          <p className="text-[11px] opacity-70 leading-normal mt-0.5">{item.product.subtitle}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="inline-block bg-neutral-200/40 text-[10px] px-1.5 py-0.5 rounded-sm">
                              Size: {item.weightOption}
                            </span>
                            <span className="inline-block bg-neutral-200/40 text-[10px] px-1.5 py-0.5 rounded-sm">
                              Grind: {item.grindOption}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-neutral-300 rounded-sm overflow-hidden text-xs">
                            <button
                              id={`cart-item-minus-${idx}`}
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-neutral-200/30 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 font-mono">{item.quantity}</span>
                            <button
                              id={`cart-item-plus-${idx}`}
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-neutral-200/30 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Delete Button */}
                          <button
                            id={`cart-item-delete-${idx}`}
                            onClick={() => onRemoveItem(idx)}
                            className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer summary */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-200/50 bg-neutral-50/50 px-6 py-6 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="opacity-70">Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Shipping</span>
                    <span>{remainingForFreeShipping <= 0 ? 'FREE EXPRESS' : 'Calculated at next step'}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200/40 pt-2 text-sm font-medium">
                    <span>Total Est.</span>
                    <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="cart-checkout-btn"
                  onClick={onCheckout}
                  style={{
                    backgroundColor: theme.primaryColor,
                    borderColor: theme.primaryColor,
                    color: theme.backgroundColor,
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all duration-200 text-sm border hover:opacity-95 shadow-xs ${getRadiusClass()}`}
                >
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-[10px] text-center opacity-60 leading-normal">
                  Standard VAT & import fees calculated during delivery. Secure checkout powered by Shopify Dawn Engine.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
