import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageSquare, X, Send, Sparkles, PhoneCall, CheckCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  time: string;
}

export const SupportChatWidget: React.FC = () => {
  const { isSupportChatOpen, setIsSupportChatOpen, orders } = useShop();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'concierge',
      text: 'Salam! Welcome to VEYORA. I am Rabia from the Karachi Concierge. How may I assist your style, size, or delivery inquiries today?',
      time: 'Just now'
    }
  ]);

  const quickReplies = [
    'How does Cash on Delivery work?',
    'What is the delivery time to Karachi/Islamabad?',
    'Can I get custom stitching for unstitched formals?',
    'What is your 7-day exchange policy?'
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Generate smart concierge response
    setTimeout(() => {
      let reply = 'Thank you for reaching out. A senior stylist at our Lahore atelier will assist you shortly.';
      const lower = userText.toLowerCase();

      if (lower.includes('cash on delivery') || lower.includes('cod')) {
        reply = 'We offer Cash on Delivery (COD) across 250+ cities in Pakistan with zero advance deposit required! You simply inspect the package and pay the courier rider upon delivery.';
      } else if (lower.includes('delivery time') || lower.includes('karachi') || lower.includes('lahore') || lower.includes('islamabad')) {
        reply = 'Standard dispatch via TCS Express takes 24 to 48 hours for Lahore, Islamabad, and Karachi, and 3 to 4 business days for other cities in Punjab, Sindh, KPK, and Balochistan.';
      } else if (lower.includes('stitch') || lower.includes('tailor') || lower.includes('size')) {
        reply = 'Our master karigars provide bespoke atelier stitching (+PKR 4,500 to 6,000) finished with pure silk lining, delicate piping, and custom necklines tailored to your measurements in 4 to 6 days.';
      } else if (lower.includes('exchange') || lower.includes('return')) {
        reply = 'We provide a 7-Day Hassle-Free Exchange. If a size does not fit or you wish to swap shades, we arrange a doorstep pickup from your address with no additional fee.';
      } else if (lower.includes('track') || lower.includes('order')) {
        const latest = orders[0];
        reply = latest
          ? `Your latest order ${latest.id} is currently ${latest.status} via ${latest.courier} (Tracking: ${latest.trackingNumber}). Estimated delivery: ${latest.estimatedDelivery}.`
          : 'Please provide your 6-digit Order ID (e.g. VY-9241) and our automated system will pull up your TCS tracking number immediately!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'concierge',
          text: reply,
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isSupportChatOpen && (
        <button
          onClick={() => setIsSupportChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#171513] hover:bg-[#641D32] text-white p-3.5 shadow-2xl flex items-center gap-2.5 transition-all duration-300 border border-[#B69A70]/40 group"
          aria-label="Open luxury concierge chat"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#B69A70]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#1E3A2F]" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold pr-1 hidden sm:inline">
            VIP Concierge
          </span>
        </button>
      )}

      {/* Chat Drawer Window */}
      {isSupportChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[520px] bg-[#F6F2EC] shadow-2xl border border-[#B69A70]/40 flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#171513] text-[#F6F2EC] flex items-center justify-between border-b border-[#B69A70]/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#641D32] flex items-center justify-center font-serif text-sm font-bold text-white border border-[#B69A70]/40">
                V
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-sm font-semibold tracking-wide">
                    Rabia · VEYORA Concierge
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] text-[#EEE5DF]/70 block">
                  Karachi, Pakistan · Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsSupportChatOpen(false)}
              className="p-1.5 text-[#EEE5DF] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#171513] text-white'
                      : 'bg-white text-[#171513] border border-[#171513]/10 shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-[#171513]/50">
                  <span>{m.time}</span>
                  {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-[#1E3A2F]" />}
                </div>
              </div>
            ))}

            {/* Quick Prompt Chips */}
            <div className="pt-2">
              <span className="text-[10px] text-[#171513]/60 uppercase tracking-widest block mb-1.5">
                Quick Assistance:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => handleSend(qr)}
                    className="text-left p-2 bg-white/80 hover:bg-white text-[11px] text-[#171513] border border-[#171513]/10 hover:border-[#641D32] transition-colors"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-[#171513]/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about fabrics, sizes, or COD..."
                className="flex-1 text-xs border border-[#171513]/20 px-3 py-2.5 focus:outline-none focus:border-[#641D32]"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#171513] hover:bg-[#641D32] text-white transition-colors"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#171513]/5 text-[10px] text-[#171513]/60">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#B69A70]" />
                Concierge response in ~1 min
              </span>
              <a
                href="https://wa.me/923494968548"
                target="_blank"
                rel="noreferrer"
                className="text-[#641D32] font-semibold flex items-center gap-1 hover:underline"
              >
                <PhoneCall className="w-3 h-3" />
                WhatsApp: 03494968548
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
