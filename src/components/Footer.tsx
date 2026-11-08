import React from 'react';
import { useShop } from '../context/ShopContext';
import { DEPARTMENTS } from '../data/departments';
import { BUSINESS_INFO } from '../data/products';
import { Truck, ShieldCheck, RefreshCw, MessageSquare, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-[#171513] text-[#F6F2EC] border-t border-[#B69A70]/20">
      {/* Trust Badges Strip */}
      <div className="border-b border-[#F6F2EC]/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#641D32]/20 border border-[#641D32]/40 rounded-none shrink-0">
              <Truck className="w-6 h-6 text-[#B69A70]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium">Payment Options</h4>
              <p className="text-xs text-[#EEE5DF]/70 mt-1">
                Available payment methods are displayed during checkout.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#641D32]/20 border border-[#641D32]/40 rounded-none shrink-0">
              <RefreshCw className="w-6 h-6 text-[#B69A70]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium">Customer Care</h4>
              <p className="text-xs text-[#EEE5DF]/70 mt-1">
                Visit our policy pages for current order, return and exchange information.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#641D32]/20 border border-[#641D32]/40 rounded-none shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#B69A70]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium">Explore the Collection</h4>
              <p className="text-xs text-[#EEE5DF]/70 mt-1">
                Browse product pages for item-specific descriptions and details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#641D32]/20 border border-[#641D32]/40 rounded-none shrink-0">
              <MessageSquare className="w-6 h-6 text-[#B69A70]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium">Need Assistance?</h4>
              <p className="text-xs text-[#EEE5DF]/70 mt-1">
                Contact VEYORA through the details listed below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif text-3xl tracking-[0.2em] font-medium text-white">
                {BUSINESS_INFO.brand}
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-[#B69A70] font-sans font-semibold mt-1">
                {BUSINESS_INFO.tagline}
              </span>
            </div>
            <p className="text-sm text-[#EEE5DF]/75 leading-relaxed pr-6">
              A considered edit of women’s fashion, designed to celebrate personal style and modern Pakistani elegance.
            </p>

            {/* Official Social Media Links */}
            <div className="pt-1">
              <span className="text-xs uppercase tracking-wider text-[#B69A70] font-semibold block mb-3">
                Follow Official VEYORA
              </span>
              <div className="flex items-center gap-3">
                {/* TikTok */}
                <a
                  href={BUSINESS_INFO.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#24211E] hover:bg-[#641D32] border border-[#F6F2EC]/20 hover:border-[#B69A70] text-white transition-all group"
                  aria-label="Official TikTok"
                  title="Follow VEYORA on TikTok"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 1 0 6.34 6.34V8.41a8.28 8.28 0 0 0 4.77 1.73V6.69h-1z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#24211E] hover:bg-[#641D32] border border-[#F6F2EC]/20 hover:border-[#B69A70] text-white transition-all group"
                  aria-label="Official Instagram"
                  title="Follow VEYORA on Instagram"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>

                {/* Facebook */}
                <a
                  href={BUSINESS_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#24211E] hover:bg-[#641D32] border border-[#F6F2EC]/20 hover:border-[#B69A70] text-white transition-all group"
                  aria-label="Official Facebook"
                  title="Follow VEYORA on Facebook"
                >
                  <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

          </div>

          {/* Departments Column */}
          <div>
            <h5 className="font-serif text-base text-[#B69A70] uppercase tracking-wider font-semibold mb-4">
              Women's Departments
            </h5>
            <ul className="space-y-2.5 text-xs text-[#EEE5DF]/80">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <button
                    onClick={() => navigateTo('collection', { department: dept.id })}
                    className="hover:text-white hover:translate-x-1 transition-all"
                  >
                    {dept.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Experience */}
          <div>
            <h5 className="font-serif text-base text-[#B69A70] uppercase tracking-wider font-semibold mb-4">
              Client Experience
            </h5>
            <ul className="space-y-2.5 text-xs text-[#EEE5DF]/80">
              <li>
                <button
                  onClick={() => navigateTo('tracking')}
                  className="hover:text-white hover:translate-x-1 transition-all"
                >
                  Track Nationwide Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="hover:text-white hover:translate-x-1 transition-all"
                >
                  Pakistani Pret Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shipping-policy')}
                  className="hover:text-white hover:translate-x-1 transition-all"
                >
                  Shipping & Delivery Timelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('return-policy')}
                  className="hover:text-white hover:translate-x-1 transition-all"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faqs')}
                  className="hover:text-white hover:translate-x-1 transition-all"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('journal')}
                  className="hover:text-white hover:translate-x-1 transition-all"
                >
                  VEYORA Style Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('rewards')}
                  className="hover:text-white hover:translate-x-1 transition-all"
                >
                  Rewards Club & VIP Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white hover:translate-x-1 transition-all"
                >
                  Customer Account & Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Official Business Information */}
          <div>
            <h5 className="font-serif text-base text-[#B69A70] uppercase tracking-wider font-semibold mb-4">
              Business Information
            </h5>
            <div className="space-y-4 text-xs text-[#EEE5DF]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B69A70] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Business Location</strong>
                  <span>{BUSINESS_INFO.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#B69A70] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Phone / WhatsApp</strong>
                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EEE5DF] hover:text-[#B69A70] font-mono transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#B69A70] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Official Email</strong>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-[#EEE5DF] hover:text-[#B69A70] transition-colors break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F6F2EC]/10">
                <span className="block text-[11px] text-[#B69A70] font-semibold uppercase tracking-wider">
                  Cash on Delivery
                </span>
                <span className="text-[11px] text-[#EEE5DF]/70">
                  Available nationwide across Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-16 pt-8 border-t border-[#F6F2EC]/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#EEE5DF]/50 gap-4">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.brand} Pakistan. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => navigateTo('privacy-policy')}
              className="hover:text-[#B69A70] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('terms-conditions')}
              className="hover:text-[#B69A70] transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="hover:text-[#B69A70] transition-colors"
            >
              Contact Us
            </button>
            <span>Prices in PKR (Pakistani Rupee)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
