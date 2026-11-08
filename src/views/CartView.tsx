import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    clearCart,
    checkoutWithShopify,
    navigateTo,
    formatPKR
  } = useShop();

  const [orderNotes, setOrderNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const discount = 0;
  const shippingCharge = 0;
  const grandTotal = cartSubtotal;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VEYORA10') {
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-white border border-[#171513]/10 flex items-center justify-center text-[#B69A70]">
          <Truck className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-semibold text-[#171513]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#171513]/70 max-w-md mx-auto leading-relaxed">
          Explore our signature raw silk festive kurtas, opulent velvet ghararas, handcrafted khussas and 22K dipped heirloom polki jewellery.
        </p>
        <button
          onClick={() => navigateTo('collection')}
          className="px-8 py-3.5 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-md"
        >
          Explore All Heirlooms
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#171513]/10">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block">
            Review Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
            Shopping Bag ({cart.length} {cart.length === 1 ? 'Design' : 'Designs'})
          </h1>
        </div>

        <button
          onClick={() => navigateTo('collection')}
          className="text-xs uppercase tracking-wider text-[#641D32] hover:text-[#171513] font-semibold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-[#171513]/10 divide-y divide-[#171513]/10">
            {cart.map((item) => {
              const itemTotalPrice =
                (item.price + (item.isStitched && item.stitchingPrice ? item.stitchingPrice : 0)) *
                item.quantity;

              return (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('/src/assets/images/')) {
                        target.src = target.src.replace('/src/assets/images/', '/images/');
                      }
                    }}
                    className="w-24 sm:w-28 aspect-[3/4] object-cover object-top bg-[#EEE5DF] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between w-full h-full min-h-[110px]">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif text-lg font-semibold text-[#171513]">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#171513]/40 hover:text-[#641D32] transition-colors p-1"
                          title="Remove piece"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-[#171513]/70 space-y-1 mt-1.5">
                        <p>
                          Size: <strong className="text-[#171513]">{item.size}</strong> · Color:{' '}
                          <strong className="text-[#171513]">{item.color}</strong>
                        </p>
                        {item.isStitched && (
                          <p className="text-[#641D32] font-semibold text-[11px]">
                            + Atelier Custom Tailoring ({formatPKR(item.stitchingPrice || 4500)})
                          </p>
                        )}
                        <p className="text-[11px] text-[#1E3A2F]">
                          Eligible for Nationwide Cash on Delivery
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#171513]/5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#171513]/20 bg-[#F6F2EC]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm font-semibold hover:text-[#641D32]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm font-semibold hover:text-[#641D32]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-base sm:text-lg font-bold text-[#171513]">
                          {formatPKR(itemTotalPrice)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-[#171513]/50">
                            {formatPKR(item.price + (item.isStitched ? item.stitchingPrice || 0 : 0))} each
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Note & Clear Button */}
          <div className="bg-white p-5 border border-[#171513]/10 space-y-3">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#171513] block">
              Bespoke Fitting Instructions / Landmark Delivery Notes
            </label>
            <textarea
              rows={2}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Please call before delivery; specific sleeve length adjustment if chosen stitching..."
              className="w-full text-xs border border-[#171513]/20 p-3 focus:outline-none focus:border-[#641D32]"
            />
            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-[#171513]/60">
                Packaging: Signature VEYORA textured ivory gift box with satin ribbon
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-[#641D32] hover:underline"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>
        </div>

        {/* Right: Order Summary & Checkout CTA (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 border border-[#171513]/10 space-y-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-[#171513] pb-3 border-b border-[#171513]/10">
            Order Summary
          </h2>

          {/* Coupon */}
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Voucher code (VEYORA10)"
              className="flex-1 text-xs border border-[#171513]/20 px-3 py-2 uppercase placeholder:normal-case focus:outline-none focus:border-[#641D32]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#171513] text-white hover:bg-[#641D32] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Apply
            </button>
          </form>
          {promoApplied && (
            <p className="text-xs text-[#1E3A2F] font-semibold">
              ✓ Privilege voucher applied (10% VIP Discount)
            </p>
          )}

          {/* Financial Breakdown */}
          <div className="space-y-2.5 text-xs text-[#171513]/80 pt-2 border-t border-[#171513]/5">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="font-mono font-medium">{formatPKR(cartSubtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-[#641D32]">
                <span>VIP 10% Discount</span>
                <span className="font-mono font-medium">-{formatPKR(discount)}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div>
                <span>Nationwide Express Delivery</span>
                <span className="text-[10px] text-[#171513]/50 block">Final rate calculated by Shopify at checkout</span>
              </div>
              <span className="font-mono font-semibold">
<span className="text-[#641D32]">At checkout</span>
              </span>
            </div>

            <div className="pt-3 border-t border-[#171513]/10 flex justify-between items-baseline text-base font-bold text-[#171513]">
              <span className="font-serif text-lg">Subtotal (PKR)</span>
              <span className="font-mono text-xl text-[#641D32]">
                {formatPKR(grandTotal)}
              </span>
            </div>
            <span className="text-[10px] text-[#171513]/60 block text-right">
              Shipping, taxes and final total are confirmed securely by Shopify at checkout.
            </span>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => void checkoutWithShopify()}
            className="w-full py-4 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Continue to Secure Shopify Checkout</span>
            <ArrowRight className="w-4 h-4 text-[#B69A70]" />
          </button>

          <div className="p-3 bg-[#F6F2EC] text-[11px] text-[#171513]/70 space-y-1.5 border border-[#171513]/5">
            <div className="flex items-center gap-1.5 text-[#171513] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#641D32]" />
              <span>Shopify Secure Checkout</span>
            </div>
            <p>
Available payment methods, including Cash on Delivery if enabled in your Shopify settings, will appear at checkout.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
