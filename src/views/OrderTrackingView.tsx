import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, PhoneCall, ShieldCheck } from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { lookupOrder, formatPKR, orders } = useShop();

  const [orderInput, setOrderInput] = useState('VY-9241');
  const [phoneInput, setPhoneInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput.trim()) return;

    const found = lookupOrder(orderInput, phoneInput);
    setTrackedOrder(found);
    setHasSearched(true);
  };

  const statusSteps = [
    { key: 'Confirmed', label: 'Order Confirmed', desc: 'Atelier received & verified' },
    { key: 'Processing', label: 'Artisanal Preparation', desc: 'Inspection & heirloom packaging' },
    { key: 'Dispatched', label: 'Dispatched via TCS', desc: 'In transit between hubs' },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Rider reaching your address' },
    { key: 'Delivered', label: 'Delivered (COD Paid)', desc: 'Parcel handed over' }
  ];

  const getStepIndex = (status: string) => {
    if (status === 'Confirmed') return 0;
    if (status === 'Processing') return 1;
    if (status === 'Dispatched') return 2;
    if (status === 'Out for Delivery') return 3;
    if (status === 'Delivered') return 4;
    return 0;
  };

  const currentStep = trackedOrder ? getStepIndex(trackedOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B69A70] font-semibold block">
          Nationwide Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
          Track Your Pakistani Order
        </h1>
        <p className="text-xs sm:text-sm text-[#171513]/70 font-light leading-relaxed">
          Enter your VEYORA Order ID (e.g. VY-9241) and WhatsApp number to see real-time courier updates.
        </p>
      </div>

      {/* Tracking Input Form */}
      <div className="bg-white p-6 sm:p-8 border border-[#171513]/10 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-[#171513] block mb-1">
                VEYORA Order ID *
              </label>
              <input
                type="text"
                required
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                placeholder="e.g. VY-9241"
                className="w-full text-xs border border-[#171513]/20 p-3 uppercase focus:outline-none focus:border-[#641D32] font-mono font-semibold"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-[#171513] block mb-1">
                WhatsApp / Phone (Optional)
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+92 300 8472911"
                className="w-full text-xs border border-[#171513]/20 p-3 focus:outline-none focus:border-[#641D32]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Quick Demo Order Chips */}
            <div className="flex items-center gap-2 text-xs text-[#171513]/60">
              <span>Quick Demo:</span>
              <button
                type="button"
                onClick={() => {
                  setOrderInput('VY-9241');
                  setTrackedOrder(orders.find((o) => o.id === 'VY-9241') || null);
                  setHasSearched(true);
                }}
                className="px-2 py-0.5 bg-[#F6F2EC] hover:bg-[#EEE5DF] text-[#641D32] font-mono font-semibold"
              >
                VY-9241 (Out for Delivery)
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderInput('VY-8109');
                  setTrackedOrder(orders.find((o) => o.id === 'VY-8109') || null);
                  setHasSearched(true);
                }}
                className="px-2 py-0.5 bg-[#F6F2EC] hover:bg-[#EEE5DF] text-[#1E3A2F] font-mono font-semibold"
              >
                VY-8109 (Delivered)
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#B69A70]" />
              <span>Track Parcel</span>
            </button>
          </div>
        </form>
      </div>

      {/* Tracking Result View */}
      {hasSearched && (
        <>
          {trackedOrder ? (
            <div className="bg-white border border-[#B69A70]/30 shadow-lg p-6 sm:p-10 space-y-8 animate-fadeIn">
              
              {/* Order Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#171513]/10 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-[#641D32]">
                      Order #{trackedOrder.id}
                    </span>
                    <span className="text-xs bg-[#641D32]/10 text-[#641D32] font-bold px-2.5 py-0.5 uppercase tracking-wider">
                      {trackedOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#171513]/60 mt-1">
                    Ordered on {trackedOrder.date} · Destination: {trackedOrder.city}, Pakistan
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono text-xs">
                  <span className="text-[#171513]/60 block uppercase text-[10px]">Courier Tracking</span>
                  <span className="font-bold text-sm text-[#171513]">
                    {trackedOrder.courier}: {trackedOrder.trackingNumber}
                  </span>
                </div>
              </div>

              {/* Visual Horizontal Timeline */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block mb-4">
                  Live Dispatch Journey
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                  {statusSteps.map((step, idx) => {
                    const isDone = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div
                        key={step.key}
                        className={`p-3 border transition-all flex flex-col justify-between ${
                          isCurrent
                            ? 'bg-[#F6F2EC] border-[#641D32] shadow-sm'
                            : isDone
                            ? 'bg-white border-[#1E3A2F]/40'
                            : 'bg-white/50 border-[#171513]/10 opacity-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-[#171513]/60">
                            0{idx + 1}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#1E3A2F]" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-300" />
                          )}
                        </div>

                        <div>
                          <strong className="font-serif text-xs font-semibold text-[#171513] block">
                            {step.label}
                          </strong>
                          <span className="text-[10px] text-[#171513]/60 block mt-0.5">
                            {step.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#171513]/10 text-xs text-[#171513]">
                <div className="p-4 bg-[#F6F2EC]">
                  <span className="text-[10px] uppercase text-[#171513]/60 font-semibold block">
                    Recipient Address
                  </span>
                  <strong className="block mt-1 font-serif text-sm">{trackedOrder.customerName}</strong>
                  <span className="text-[#171513]/70 block mt-0.5 leading-relaxed">
                    {trackedOrder.address}
                  </span>
                  <span className="text-[11px] text-[#641D32] font-mono block mt-1">
                    {trackedOrder.phone}
                  </span>
                </div>

                <div className="p-4 bg-[#F6F2EC]">
                  <span className="text-[10px] uppercase text-[#171513]/60 font-semibold block">
                    Payment Method
                  </span>
                  <strong className="block mt-1 text-sm font-semibold">{trackedOrder.paymentMethod}</strong>
                  <span className="text-[11px] text-[#1E3A2F] font-medium block mt-0.5">
                    Pay upon delivery to courier rider
                  </span>
                  <span className="font-mono text-sm font-bold text-[#641D32] block mt-1">
                    Total: {formatPKR(trackedOrder.total)}
                  </span>
                </div>

                <div className="p-4 bg-[#F6F2EC]">
                  <span className="text-[10px] uppercase text-[#171513]/60 font-semibold block">
                    Estimated Doorstep Arrival
                  </span>
                  <strong className="block mt-1 text-sm text-[#171513]">
                    {trackedOrder.estimatedDelivery}
                  </strong>
                  <span className="text-[11px] text-[#171513]/60 block mt-0.5">
                    Rider will send an SMS alert prior to arrival
                  </span>
                </div>
              </div>

              {/* Order Items List */}
              <div className="pt-4 border-t border-[#171513]/10 space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block">
                  Items in this Package
                </span>
                <div className="space-y-2">
                  {trackedOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white border border-[#171513]/10 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={it.image}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-10 h-12 object-cover object-top bg-[#EEE5DF]"
                        />
                        <div>
                          <h4 className="font-serif font-semibold text-[#171513]">
                            {it.title}
                          </h4>
                          <span className="text-[11px] text-[#171513]/60">
                            Size: {it.size} · Color: {it.color} · Qty: {it.quantity}
                            {it.isStitched && ' (Custom Stitched)'}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#171513]">
                        {formatPKR(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#171513]/10 flex items-center justify-between text-xs text-[#171513]/60">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B69A70]" />
                  <span>Inspected & Sealed with VEYORA Security Hologram Tape</span>
                </span>
                <a
                  href="https://wa.me/923494968548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#641D32] font-semibold hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Delivery Helpline: 03494968548</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-white border border-[#171513]/10 space-y-3 max-w-2xl mx-auto">
              <p className="font-serif text-xl text-[#171513]">
                Order #{orderInput} not found
              </p>
              <p className="text-xs text-[#171513]/60">
                Please double check your Order ID from your confirmation SMS or click one of the quick demo buttons above.
              </p>
            </div>
          )}
        </>
      )}

    </div>
  );
};
