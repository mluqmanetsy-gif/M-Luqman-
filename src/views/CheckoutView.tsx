import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    checkoutWithShopify,
    navigateTo,
    formatPKR,
    userProfile,
    showToast
  } = useShop();

  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#171513]">Your shopping bag is empty</h2>
        <p className="text-xs text-[#171513]/60">
          Please add items to your shopping bag before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('collection')}
          className="px-6 py-2.5 bg-[#171513] text-white text-xs uppercase tracking-wider font-semibold"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !email.trim()) {
      showToast('Please complete all mandatory delivery fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    await checkoutWithShopify({ email, phone });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Checkout Title */}
      <div className="mb-8 pb-4 border-b border-[#171513]/10 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block">
            Express Checkout
          </span>
          <h1 className="font-serif text-3xl font-semibold text-[#171513]">
            Secure Shopify Checkout
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#1E3A2F] font-semibold">
          <Lock className="w-4 h-4" />
          <span>256-Bit Encrypted Pakistan Checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Pakistan Shipping & Customer Information (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Customer Details */}
          <div className="bg-white p-6 border border-[#171513]/10 space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[#171513] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#171513] text-white text-xs flex items-center justify-center font-sans font-bold">
                1
              </span>
              <span>Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#171513] font-medium block mb-1">
                  WhatsApp / Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full text-xs border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
                />
                <span className="text-[10px] text-[#171513]/50 block mt-0.5">
                  Used by TCS courier for delivery confirmation
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#171513] font-medium block mb-1">
                Email Address for Invoice & Tracking
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@example.com"
                className="w-full text-xs border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
              />
            </div>
          </div>

          <div className="bg-[#F6F2EC] p-5 border border-[#171513]/10 space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#171513]">Delivery & Payment</h2>
            <p className="text-xs text-[#171513]/70 leading-relaxed">Your delivery address, available shipping rates and payment methods (including Cash on Delivery, if enabled) will be collected securely on Shopify checkout.</p>
          </div>
        </div>

        {/* Right: Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#171513]/10 space-y-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-semibold text-[#171513] pb-3 border-b border-[#171513]/10">
            Order Review ({cart.length} items)
          </h2>

          {/* Mini item list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 divide-y divide-[#171513]/5">
            {cart.map((item) => (
              <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                <img
                  src={item.image}
                  alt=""
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/src/assets/images/')) {
                      target.src = target.src.replace('/src/assets/images/', '/images/');
                    }
                  }}
                  className="w-12 h-14 object-cover object-top bg-[#EEE5DF] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-serif font-semibold text-[#171513] truncate block">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#171513]/60">
                    Qty: {item.quantity} · Size: {item.size}
                    {item.isStitched && ' (Stitched)'}
                  </span>
                </div>
                <span className="font-mono font-semibold text-[#171513]">
                  {formatPKR((item.price + (item.isStitched ? item.stitchingPrice || 0 : 0)) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-[#171513]/10 space-y-2 text-xs text-[#171513]/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono">{formatPKR(cartSubtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping & taxes</span>
              <span className="font-mono font-semibold">Calculated at Shopify checkout</span>
            </div>

            <div className="pt-3 border-t border-[#171513]/10 flex justify-between items-baseline text-base font-bold text-[#171513]">
              <span className="font-serif text-lg">Total Due</span>
              <span className="font-mono text-2xl text-[#641D32]">
                {formatPKR(cartSubtotal)}
              </span>
            </div>
            <span className="text-[10px] text-[#171513]/60 block text-right">
              Payment options shown securely by Shopify
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#171513] hover:bg-[#641D32] disabled:bg-[#171513]/40 text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
          >
            {isSubmitting ? (
              <span>Confirming Order...</span>
            ) : (
              <>
                <span>Continue to Shopify Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#B69A70]" />
              </>
            )}
          </button>

          <div className="pt-2 text-[11px] text-[#171513]/60 space-y-2 text-center">
            <p>
              By confirming, you agree to inspect and pay upon delivery. Our Lahore operations team will send immediate WhatsApp dispatch updates.
            </p>
            <div className="flex items-center justify-center gap-4 text-[#171513]/80 font-medium">
              <span>✓ 7-Day Exchange</span>
              <span>✓ Verified Courier</span>
              <span>✓ 100% Authentic</span>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
};
