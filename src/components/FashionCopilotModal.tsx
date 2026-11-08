import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Sparkles, Send, ArrowRight, MessageSquare, ShieldCheck, Check } from 'lucide-react';

interface CopilotMessage {
  id: string;
  sender: 'copilot' | 'user';
  text: string;
  suggestedProductIds?: string[];
  options?: string[];
}

export const FashionCopilotModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { navigateTo, addToCart, formatPKR } = useShop();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-1',
      sender: 'copilot',
      text: 'Salam and welcome to VEYORA Fashion Copilot. I am your personal Pakistani luxury styling concierge. How may I assist your wardrobe curation today?',
      options: [
        'Curate a wedding look for winter dawats',
        'Show raw silk vs velvet comparison',
        'Recommend matching accessories for Zehra kurta',
        'Explain Cash on Delivery & stitching terms'
      ]
    }
  ]);

  if (!isOpen) return null;

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: CopilotMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Intelligent domain-specific response generation
    setTimeout(() => {
      const lower = promptText.toLowerCase();
      let botResponse: CopilotMessage;

      if (lower.includes('wedding') || lower.includes('dawat') || lower.includes('winter') || lower.includes('festive')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'copilot',
          text: 'For celebratory winter occasions across Pakistan, our master recommendation is the Noor-e-Jehan Burgundy Velvet Formal Gharara Set paired with Shehnai 22K Gold Polki Choker and handcrafted velvet block heels.',
          suggestedProductIds: ['veyora-cl-02', 'veyora-jw-01', 'veyora-ft-02'],
          options: ['See daytime lawn alternatives', 'Inquire about bespoke stitching']
        };
      } else if (lower.includes('zehra') || lower.includes('raw silk') || lower.includes('matching')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'copilot',
          text: 'The Zehra Embroidered Raw Silk ensemble features antique gold zardozi. It pairs harmoniously with our Zarrin Champagne Gold Khussa and The Haven Structured Leather & Evening Minaudière.',
          suggestedProductIds: ['veyora-cl-01', 'veyora-ft-01', 'veyora-bg-01'],
          options: ['Add full look to bag', 'Size guidance for Zehra']
        };
      } else if (lower.includes('cod') || lower.includes('delivery') || lower.includes('stitching') || lower.includes('terms')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'copilot',
          text: 'We dispatch nationwide across Pakistan via TCS and Leopard Couriers with Cash on Delivery (COD) as standard. Delivery takes 24–48 hours in Karachi and 2–4 days across Lahore, Islamabad, and other cities. Complimentary delivery applies to orders above PKR 5,000. Bespoke stitching takes an additional 4–6 days.',
          options: ['Track existing order', 'Browse New Arrivals']
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'copilot',
          text: `Here are our finest Pakistani luxury pieces crafted for celebratory elegance. Would you like to explore our latest arrivals or examine fabric details?`,
          suggestedProductIds: ['veyora-cl-01', 'veyora-cl-03', 'veyora-jw-01'],
          options: ['Browse all collections', 'Connect with stylist on WhatsApp']
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171513]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Copilot Dialog */}
      <div className="relative bg-[#171513] text-[#F6F2EC] border border-[#B69A70]/40 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden rounded-none animate-fadeIn">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#B69A70]/20 flex items-center justify-between bg-gradient-to-r from-[#171513] via-[#241F1C] to-[#171513]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#B69A70]/20 border border-[#B69A70] flex items-center justify-center text-[#B69A70]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-medium text-white">VEYORA Fashion Copilot</h3>
                <span className="text-[9px] uppercase tracking-widest text-[#B69A70] font-semibold px-1.5 py-0.5 bg-[#B69A70]/10 border border-[#B69A70]/30">
                  Concierge
                </span>
              </div>
              <p className="text-[11px] text-[#EEE5DF]/70">
                Karachi Atelier AI Stylist · Real Pakistani Couture Guidance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#EEE5DF]/60 hover:text-white transition-colors"
            aria-label="Close copilot"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs font-light">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#641D32] text-white rounded-none border border-[#641D32]'
                    : 'bg-[#241F1C] text-[#EEE5DF] border border-[#B69A70]/20 shadow-md'
                }`}
              >
                <p className="whitespace-pre-line text-xs sm:text-sm font-sans">{m.text}</p>

                {/* Suggested Products Card Row */}
                {m.suggestedProductIds && m.suggestedProductIds.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#B69A70] font-semibold block">
                      Recommended Ensemble Pieces:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {m.suggestedProductIds.map((pId) => {
                        const product = PRODUCTS.find((p) => p.id === pId);
                        if (!product) return null;
                        return (
                          <div
                            key={product.id}
                            className="bg-[#171513] border border-[#B69A70]/30 p-2 flex flex-col justify-between"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-24 object-cover object-center mb-1.5"
                            />
                            <h5 className="font-serif text-xs text-white line-clamp-1 font-medium">
                              {product.title}
                            </h5>
                            <span className="text-[11px] font-mono text-[#B69A70] block mb-2">
                              {formatPKR(product.price)}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  onClose();
                                  navigateTo('product', { productId: product.id });
                                }}
                                className="flex-1 py-1 text-[10px] uppercase font-semibold tracking-wider bg-white/10 hover:bg-white text-white hover:text-[#171513] transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  addToCart({
                                    productId: product.id,
                                    title: product.title,
                                    price: product.price,
                                    image: product.images[0],
                                    size: product.sizes[0] || 'Standard',
                                    color: product.colors[0]?.name || 'Original',
                                    quantity: 1
                                  });
                                }}
                                className="px-2 py-1 text-[10px] uppercase font-semibold bg-[#641D32] hover:bg-[#7D2640] text-white transition-colors"
                                title="Add to Bag"
                              >
                                + Bag
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Action Suggestion Chips */}
              {m.options && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {m.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendPrompt(opt)}
                      className="px-2.5 py-1 text-[11px] bg-white/5 hover:bg-[#B69A70]/20 border border-[#B69A70]/30 text-[#EEE5DF] hover:text-white transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[#B69A70]/20 bg-[#171513]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fabrics, styling for weddings, size fits, or COD..."
              className="flex-1 bg-[#241F1C] border border-[#B69A70]/30 px-3.5 py-2.5 text-xs text-white placeholder-[#EEE5DF]/40 focus:outline-none focus:border-[#B69A70]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 bg-[#B69A70] hover:bg-[#A3855B] text-[#171513] text-xs font-semibold uppercase tracking-wider disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[10px] text-[#EEE5DF]/50">
            <span>Official WhatsApp Hotline: 03494968548</span>
            <span>Karachi, Pakistan</span>
          </div>
        </div>

      </div>
    </div>
  );
};
