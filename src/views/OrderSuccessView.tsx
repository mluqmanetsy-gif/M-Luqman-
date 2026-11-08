import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Truck, ArrowRight, PhoneCall, Copy, Download } from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { lastPlacedOrder, navigateTo, formatPKR, showToast } = useShop();

  const order = lastPlacedOrder || {
    id: 'VY-9241',
    date: new Date().toISOString().split('T')[0],
    customerName: 'Syeda Fatima',
    phone: '+92 300 8472911',
    city: 'Lahore',
    address: 'House 42-B, Street 7, Phase 5 DHA, Lahore',
    items: [],
    subtotal: 28500,
    shipping: 0,
    total: 28500,
    paymentMethod: 'Cash on Delivery (COD)' as const,
    status: 'Confirmed' as const,
    courier: 'TCS Express Pakistan',
    trackingNumber: 'TCS-88392104PK',
    estimatedDelivery: '2 to 3 Business Days'
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    showToast(`Order ID ${order.id} copied to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8">
      
      {/* Success Banner Card */}
      <div className="bg-white p-8 sm:p-12 border border-[#B69A70]/40 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#641D32]/10 border border-[#641D32]/30 flex items-center justify-center text-[#641D32]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
            Order Confirmed · Cash on Delivery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
            Shukriya, {order.customerName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-[#171513]/70 max-w-lg mx-auto mt-2 leading-relaxed">
            Your luxury order has been received at our Karachi Atelier. Our team is hand-inspecting and packaging your creations into our signature keepsake box.
          </p>
        </div>

        {/* Order ID Badge Box */}
        <div className="p-4 bg-[#F6F2EC] border border-[#171513]/10 max-w-md mx-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] uppercase text-[#171513]/60 tracking-wider block">
              VEYORA Order Reference
            </span>
            <span className="font-mono text-xl font-bold text-[#641D32]">
              {order.id}
            </span>
          </div>

          <button
            onClick={handleCopyOrderId}
            className="p-2 text-[#171513] hover:text-[#641D32] transition-colors flex items-center gap-1 text-xs"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy</span>
          </button>
        </div>

        {/* Delivery Details Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#171513]/10 text-left text-xs">
          <div className="p-3 bg-[#F6F2EC]">
            <span className="text-[#171513]/60 block uppercase text-[10px]">Payment Method</span>
            <strong className="text-[#171513] block mt-0.5">{order.paymentMethod}</strong>
            <span className="text-[11px] text-[#1E3A2F]">Pay at doorstep to TCS</span>
          </div>

          <div className="p-3 bg-[#F6F2EC]">
            <span className="text-[#171513]/60 block uppercase text-[10px]">Estimated Delivery</span>
            <strong className="text-[#171513] block mt-0.5">{order.estimatedDelivery}</strong>
            <span className="text-[11px] text-[#171513]/60">Destination: {order.city}</span>
          </div>

          <div className="p-3 bg-[#F6F2EC]">
            <span className="text-[#171513]/60 block uppercase text-[10px]">Courier Service</span>
            <strong className="text-[#171513] block mt-0.5">{order.courier}</strong>
            <span className="text-[11px] font-mono text-[#641D32] truncate block">
              {order.trackingNumber}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[#171513]/10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('tracking')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <Truck className="w-4 h-4 text-[#B69A70]" />
            <span>Track Order Status</span>
          </button>

          <button
            onClick={() => navigateTo('collection')}
            className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#171513]/20 hover:border-[#171513] text-[#171513] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Continue Browsing
          </button>
        </div>

        <div className="pt-2 text-xs text-[#171513]/60 flex items-center justify-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-[#B69A70]" />
          <span>Questions? WhatsApp Support: 03494968548</span>
        </div>

      </div>

    </div>
  );
};
