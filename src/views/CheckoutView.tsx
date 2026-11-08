import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PAKISTAN_CITIES, PAKISTAN_PROVINCES } from '../data/products';
import { ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    placeOrder,
    navigateTo,
    formatPKR,
    userProfile,
    showToast
  } = useShop();

  const [fullName, setFullName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [province, setProvince] = useState(userProfile.province || 'Sindh');
  const [city, setCity] = useState(userProfile.city || 'Karachi');
  const [address, setAddress] = useState(userProfile.address);
  const [landmark, setLandmark] = useState('Near Ocean Mall, Clifton');
  const [postalCode, setPostalCode] = useState('75600');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'urgent'>('standard');
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

  const FREE_SHIPPING_LIMIT = 5000;
  const standardShippingCost = cartSubtotal >= FREE_SHIPPING_LIMIT ? 0 : 250;
  const urgentShippingCost = 450;
  const shippingTotal = deliverySpeed === 'standard' ? standardShippingCost : urgentShippingCost;
  const grandTotal = cartSubtotal + shippingTotal;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      showToast('Please complete all mandatory delivery fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const createdOrder = placeOrder({
        customerName: fullName,
        phone,
        city,
        address: `${address}${landmark ? ` (Landmark: ${landmark})` : ''}${postalCode ? `, Postal Code: ${postalCode}` : ''}`,
        items: cart,
        subtotal: cartSubtotal,
        shipping: shippingTotal,
        total: grandTotal,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Transfer / Card'
      });

      setIsSubmitting(false);
      showToast(`Order ${createdOrder.id} confirmed! Thank you.`);
      navigateTo('order-success');
    }, 800);
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
            Cash on Delivery & Secure Checkout
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
                  Full Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Syeda Fatima Zahra"
                  className="w-full text-xs border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
                />
              </div>

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

          {/* Pakistan Address Details */}
          <div className="bg-white p-6 border border-[#171513]/10 space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[#171513] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#171513] text-white text-xs flex items-center justify-center font-sans font-bold">
                2
              </span>
              <span>Delivery Address in Pakistan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#171513] font-medium block mb-1">
                  Province / Region *
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full text-xs border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32] bg-white"
                >
                  {PAKISTAN_PROVINCES.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#171513] font-medium block mb-1">
                  Destination City *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32] bg-white font-medium"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#171513] font-medium block mb-1">
                Complete Street Address (House #, Street, Phase/Sector) *
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Apartment 402, Block 4, Clifton, Karachi"
                className="w-full text-xs border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#171513] font-medium block mb-1">
                  Nearest Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Ocean Mall or Bilawal House"
                  className="w-full text-xs border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
                />
              </div>

              <div>
                <label className="text-xs text-[#171513] font-medium block mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="75600"
                  className="w-full text-xs border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
                />
              </div>
            </div>
          </div>

          {/* Shipping Speed Option */}
          <div className="bg-white p-6 border border-[#171513]/10 space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#171513] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#171513] text-white text-xs flex items-center justify-center font-sans font-bold">
                3
              </span>
              <span>Delivery Method & Courier Charges</span>
            </h2>

            <div className="space-y-2.5">
              <label
                onClick={() => setDeliverySpeed('standard')}
                className={`p-3.5 border flex items-center justify-between cursor-pointer transition-all ${
                  deliverySpeed === 'standard'
                    ? 'border-[#641D32] bg-[#F6F2EC]'
                    : 'border-[#171513]/10 hover:border-[#171513]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="deliverySpeed"
                    checked={deliverySpeed === 'standard'}
                    onChange={() => setDeliverySpeed('standard')}
                    className="accent-[#641D32]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#171513] block">
                      Standard Nationwide Courier (TCS / Leopard)
                    </span>
                    <span className="text-[11px] text-[#171513]/60">
                      2 to 4 business days across Pakistan
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#171513]">
                  {standardShippingCost === 0 ? 'FREE' : formatPKR(standardShippingCost)}
                </span>
              </label>

              <label
                onClick={() => setDeliverySpeed('urgent')}
                className={`p-3.5 border flex items-center justify-between cursor-pointer transition-all ${
                  deliverySpeed === 'urgent'
                    ? 'border-[#641D32] bg-[#F6F2EC]'
                    : 'border-[#171513]/10 hover:border-[#171513]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="deliverySpeed"
                    checked={deliverySpeed === 'urgent'}
                    onChange={() => setDeliverySpeed('urgent')}
                    className="accent-[#641D32]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#171513] block">
                      Urgent Priority Dispatch (Same / Next Day)
                    </span>
                    <span className="text-[11px] text-[#171513]/60">
                      Fast-tracked handling for Lahore, Karachi & Islamabad
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#641D32]">
                  {formatPKR(urgentShippingCost)}
                </span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 border border-[#171513]/10 space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#171513] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#171513] text-white text-xs flex items-center justify-center font-sans font-bold">
                4
              </span>
              <span>Payment Options</span>
            </h2>

            <div className="space-y-3">
              {/* COD Option */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 border flex items-start justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#641D32] bg-[#F6F2EC]'
                    : 'border-[#171513]/10 hover:border-[#171513]/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 accent-[#641D32]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#171513] flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-[#641D32]" />
                      Cash on Delivery (COD) — Primary Method
                    </span>
                    <p className="text-[11px] text-[#171513]/70 mt-1 leading-relaxed">
                      Pay with cash when your parcel is delivered to your doorstep. Zero advance deposit required.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#1E3A2F] bg-white px-2 py-0.5 border border-[#1E3A2F]/30">
                  Recommended
                </span>
              </label>

              {/* Online Banking */}
              <label
                onClick={() => setPaymentMethod('bank')}
                className={`p-4 border flex items-start justify-between cursor-pointer transition-all ${
                  paymentMethod === 'bank'
                    ? 'border-[#641D32] bg-[#F6F2EC]'
                    : 'border-[#171513]/10 hover:border-[#171513]/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="mt-0.5 accent-[#641D32]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#171513] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#B69A70]" />
                      Direct Bank Transfer / Debit Card (Meezan / HBL / Visa)
                    </span>
                    <p className="text-[11px] text-[#171513]/70 mt-1">
                      Account title: VEYORA Luxury Ltd. Account details provided on next step.
                    </p>
                  </div>
                </div>
              </label>
            </div>
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
              <span>Delivery Charges to {city}</span>
              <span className="font-mono font-semibold">
                {shippingTotal === 0 ? (
                  <span className="text-[#1E3A2F]">FREE</span>
                ) : (
                  formatPKR(shippingTotal)
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-[#171513]/10 flex justify-between items-baseline text-base font-bold text-[#171513]">
              <span className="font-serif text-lg">Total Due</span>
              <span className="font-mono text-2xl text-[#641D32]">
                {formatPKR(grandTotal)}
              </span>
            </div>
            <span className="text-[10px] text-[#171513]/60 block text-right">
              Payment via: {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
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
                <span>Confirm Cash on Delivery Order</span>
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
