import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    navigateTo,
    formatPKR
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartDrawerOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const discountAmount = appliedPromo === 'VEYORA10' ? Math.round(cartSubtotal * 0.1) : 0;
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 250;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VEYORA10') {
      setAppliedPromo('VEYORA10');
      setPromoError(null);
    } else {
      setPromoError('Invalid coupon. Try "VEYORA10" for 10% off.');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewFullCart = () => {
    setIsCartDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171513]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F6F2EC] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#171513]/10 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-medium text-[#171513]">
                Your Shopping Bag ({cartCount})
              </h2>
              <span className="text-xs text-[#171513]/60">Cash on Delivery Available</span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-[#171513] hover:text-[#641D32] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#EEE5DF] px-6 py-3 border-b border-[#171513]/10">
            <div className="flex items-center justify-between text-xs text-[#171513] mb-1.5">
              <span className="font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#641D32]" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#641D32] font-semibold">
                    You've unlocked Free Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="font-mono">{formatPKR(remainingForFreeShipping)}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-[#171513]/60">
                {Math.round(progressToFreeShipping)}%
              </span>
            </div>
            <div className="w-full bg-white h-1.5 overflow-hidden">
              <div
                className="bg-[#641D32] h-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EEE5DF] flex items-center justify-center text-[#B69A70]">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#171513]">Your bag is currently empty</h3>
                <p className="text-xs text-[#171513]/60 max-w-xs mx-auto">
                  Explore our luxury pret, festive formals and heirloom accessories crafted with passion.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('collection');
                  }}
                  className="px-6 py-2.5 bg-[#171513] text-[#F6F2EC] text-xs font-semibold uppercase tracking-wider hover:bg-[#641D32] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotalPrice =
                  (item.price + (item.isStitched && item.stitchingPrice ? item.stitchingPrice : 0)) *
                  item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white border border-[#171513]/10"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-24 object-cover object-top shrink-0 bg-[#EEE5DF]"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-semibold text-[#171513] line-clamp-1">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#171513]/40 hover:text-[#641D32] transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs text-[#171513]/70 space-y-0.5 mt-1">
                          <p>
                            Size: <span className="font-medium text-[#171513]">{item.size}</span>
                            {item.color && (
                              <span> · Color: <strong className="font-normal text-[#171513]">{item.color}</strong></span>
                            )}
                          </p>
                          {item.isStitched && (
                            <p className="text-[11px] text-[#641D32] font-medium">
                              + Custom Atelier Stitching ({formatPKR(item.stitchingPrice || 0)})
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#171513]/5">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#171513]/20 bg-[#F6F2EC]">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-[#641D32] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-[#641D32] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-mono text-sm font-semibold text-[#171513]">
                          {formatPKR(itemTotalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#171513]/10 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon: VEYORA10"
                  className="flex-1 text-xs border border-[#171513]/20 px-3 py-2 uppercase placeholder:normal-case focus:outline-none focus:border-[#641D32]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#EEE5DF] text-[#171513] hover:bg-[#B69A70] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
                >
                  Apply
                </button>
              </form>
              {appliedPromo && (
                <p className="text-xs text-[#1E3A2F] font-medium">
                  ✓ Voucher "VEYORA10" applied (10% off order)
                </p>
              )}
              {promoError && <p className="text-xs text-red-600">{promoError}</p>}

              {/* Pricing Breakdown */}
              <div className="space-y-1.5 text-xs text-[#171513]/80 border-t border-[#171513]/10 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPKR(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#641D32]">
                    <span>VIP Privilege (10%)</span>
                    <span className="font-mono tabular-nums">-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Courier Delivery</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#171513] border-t border-[#171513]/10 pt-2">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-mono tabular-nums text-[#641D32]">
                    {formatPKR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Proceed to Cash on Delivery Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleViewFullCart}
                className="w-full text-center text-xs text-[#171513]/70 hover:text-[#641D32] underline underline-offset-4"
              >
                View Cart Details & Special Order Notes
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#171513]/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>Pay upon delivery at your doorstep anywhere in Pakistan</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
