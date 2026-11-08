import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Truck, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B69A70] font-semibold block">
          The Atelier Narrative
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#171513]">
          About VEYORA
        </h1>
        <p className="text-xs sm:text-sm text-[#171513]/70 font-light max-w-xl mx-auto leading-relaxed">
          Fashion • Style • You — Redefining South Asian slow luxury through generational Pakistani craftsmanship.
        </p>
      </div>

      <div className="aspect-[16/9] bg-[#EEE5DF] overflow-hidden border border-[#171513]/10">
        <img
          src="/src/assets/images/hero_luxury_couture_1794123004357.jpg"
          alt="VEYORA Atelier Lahore"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-8 text-sm text-[#171513]/80 leading-relaxed font-light">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#171513] mb-3">
            The Soul of Slow Couture
          </h2>
          <p>
            Founded with an unwavering commitment to authentic craftsmanship, VEYORA is an ode to the regal textile heritage of Pakistan. While fast-fashion churns out synthetic disposable garments, our ateliers in Lahore and Karachi uphold the patient, sacred art of hand-embroidery, pure silk weaving, and architectural tailoring.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#171513] mb-3">
            Honoring Master Karigars
          </h2>
          <p>
            Behind every gold zardozi motif, every delicate cutdana stitch, and every hand-pleated gharara is the mastery of our generational karigars. Many of our master craftsmen descend from royal artisan families who have practiced needlecraft in the Walled City of Lahore for decades. We ensure ethical wages, safe atelier conditions, and continuous empowerment for our artisan communities.
          </p>
        </div>

        <div className="p-8 bg-[#F6F2EC] border-l-2 border-[#641D32] space-y-2">
          <span className="font-serif text-lg font-semibold text-[#171513] block">
            Our Quality Manifesto
          </span>
          <p className="text-xs leading-relaxed text-[#171513]/75 italic">
            "We never compromise on fiber purity. If we state raw silk, it is 100% natural mulberry silk. If we offer velvet, it is plush Italian micro-velvet. Every single piece is designed to be cherished as a modern heirloom."
          </p>
        </div>

        <div className="pt-6 flex justify-center">
          <button
            onClick={() => navigateTo('collection')}
            className="px-8 py-3.5 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-md"
          >
            Explore Our Creations
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { showToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to the VEYORA Concierge.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B69A70] font-semibold block">
          Client Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#171513]">
          Contact VEYORA
        </h1>
        <p className="text-xs sm:text-sm text-[#171513]/70 font-light leading-relaxed">
          Our VIP styling and order support team is available 7 days a week via WhatsApp and email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white p-6 sm:p-10 border border-[#171513]/10 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-[#171513]">
            Send an Inquiry
          </h2>

          {submitted ? (
            <div className="p-8 bg-[#F6F2EC] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 mx-auto text-[#1E3A2F]" />
              <h3 className="font-serif text-xl text-[#171513]">Message Received</h3>
              <p className="text-xs text-[#171513]/70">
                A member of our Karachi Concierge team will contact you within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[#171513] font-medium block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aimen Khan"
                  className="w-full border border-[#171513]/20 p-3 focus:outline-none focus:border-[#641D32]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#171513] font-medium block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mluqmanetsy@gmail.com"
                    className="w-full border border-[#171513]/20 p-3 focus:outline-none focus:border-[#641D32]"
                  />
                </div>
                <div>
                  <label className="text-[#171513] font-medium block mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03494968548"
                    className="w-full border border-[#171513]/20 p-3 focus:outline-none focus:border-[#641D32]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#171513] font-medium block mb-1">Your Inquiry / Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help with sizing, product details, or Cash on Delivery orders..."
                  className="w-full border border-[#171513]/20 p-3 focus:outline-none focus:border-[#641D32]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Business Information Card */}
        <div className="space-y-6">
          <div className="bg-[#171513] text-[#F6F2EC] p-6 sm:p-8 border border-[#B69A70]/30 shadow-xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block">
              Immediate Assistance
            </span>
            <h3 className="font-serif text-2xl font-medium">
              Phone / WhatsApp
            </h3>
            <p className="text-xs text-[#EEE5DF]/75 leading-relaxed">
              Connect directly with our support consultants for live product assistance, size advice, and Cash on Delivery order verification.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/923494968548"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B69A70] hover:bg-[#A3855B] text-[#171513] font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: 03494968548</span>
              </a>
            </div>
          </div>

          {/* Official Business Details */}
          <div className="bg-white p-6 sm:p-8 border border-[#171513]/10 space-y-5">
            <h3 className="font-serif text-xl font-semibold text-[#171513]">
              Official Business Details
            </h3>

            <div className="space-y-4 text-xs text-[#171513]/80">
              <div className="p-4 bg-[#F6F2EC] flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#641D32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-serif font-semibold text-[#171513] block">
                    Business Location
                  </strong>
                  <p className="text-sm text-[#171513] mt-0.5">Karachi, Pakistan</p>
                </div>
              </div>

              <div className="p-4 bg-[#F6F2EC] flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#641D32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-serif font-semibold text-[#171513] block">
                    Phone / WhatsApp
                  </strong>
                  <a
                    href="https://wa.me/923494968548"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-[#641D32] font-semibold hover:underline block mt-0.5"
                  >
                    03494968548
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#F6F2EC] flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#641D32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-serif font-semibold text-[#171513] block">
                    Official Email
                  </strong>
                  <a
                    href="mailto:mluqmanetsy@gmail.com"
                    className="text-sm text-[#171513] hover:text-[#641D32] font-mono hover:underline block mt-0.5"
                  >
                    mluqmanetsy@gmail.com
                  </a>
                </div>
              </div>

              {/* Official Social Media */}
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-[#B69A70] font-semibold block mb-3">
                  Official Social Media
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.tiktok.com/@veyoraofficiall?_r=1&_t=ZS-9BECnwk2wt8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#F6F2EC] hover:bg-[#EEE5DF] text-xs font-semibold text-[#171513] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 1 0 6.34 6.34V8.41a8.28 8.28 0 0 0 4.77 1.73V6.69h-1z"/>
                      </svg>
                      TikTok: @veyoraofficiall
                    </span>
                    <span className="text-[#641D32]">Visit →</span>
                  </a>

                  <a
                    href="https://www.instagram.com/veyoraofficiall?exln=MWRmMjZiazlyZGQ1aQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#F6F2EC] hover:bg-[#EEE5DF] text-xs font-semibold text-[#171513] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-bold">IG</span>
                      Instagram: @veyoraofficiall
                    </span>
                    <span className="text-[#641D32]">Visit →</span>
                  </a>

                  <a
                    href="https://www.facebook.com/share/1BDBozakNL/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#F6F2EC] hover:bg-[#EEE5DF] text-xs font-semibold text-[#171513] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-bold">FB</span>
                      Facebook: VEYORA Official
                    </span>
                    <span className="text-[#641D32]">Visit →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQsView: React.FC = () => {
  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work across Pakistan?',
      a: 'We offer Cash on Delivery nationwide for all cities, towns, and regions in Pakistan. When your parcel arrives via TCS or Leopard Courier, you hand over the exact cash amount to the delivery rider upon receiving your package. No advance deposit or credit card is required.'
    },
    {
      q: 'What are the delivery charges and delivery times?',
      a: 'All orders above PKR 5,000 enjoy complimentary express courier delivery! For orders below PKR 5,000, a flat delivery fee of PKR 250 applies. Delivery takes 24 to 48 hours for Lahore, Karachi, and Islamabad/Rawalpindi, and 3 to 4 business days for other Pakistani cities.'
    },
    {
      q: 'Can I request bespoke stitching for unstitched formals?',
      a: 'Yes! VEYORA offers atelier custom stitching on our luxury pret and festive suits. Our master karigars tailor each garment to standard sizes (XS to XL) or custom measurements with pure silk lining, finished hem borders, and piping. Stitching adds 4 to 6 business days.'
    },
    {
      q: 'What is your 7-Day Exchange Policy?',
      a: 'If you wish to exchange a size or choose another color, you can request an exchange within 7 calendar days of receiving your order. We arrange a doorstep pickup from your address anywhere in Pakistan.'
    },
    {
      q: 'Are the fabrics and embellishments 100% authentic?',
      a: 'Yes, absolutely. We use 100% pure raw silks, micro-velvet, pure chiffon, and premium Egyptian cotton lawn. Our embroidery uses genuine tilla, sitara, and hand zardozi worked by experienced master karigars.'
    },
    {
      q: 'Do you deliver internationally to the UK, USA, Canada, or UAE?',
      a: 'Yes! For international orders outside Pakistan, please contact our VIP WhatsApp Concierge (03494968548) to place orders via DHL Express with direct payment.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B69A70] font-semibold block">
          Client Care
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#171513]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#171513]/70 font-light max-w-xl mx-auto leading-relaxed">
          Everything you need to know about shopping, sizing, Cash on Delivery, and bespoke tailoring.
        </p>
      </div>

      <div className="bg-white border border-[#171513]/10 divide-y divide-[#171513]/10 shadow-sm">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-6">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-semibold text-[#171513] hover:text-[#641D32] transition-colors"
            >
              <span>{faq.q}</span>
              <span className="font-mono text-sm text-[#B69A70]">
                {openIndex === idx ? '−' : '+'}
              </span>
            </button>
            {openIndex === idx && (
              <p className="mt-3 text-xs sm:text-sm text-[#171513]/75 leading-relaxed font-light">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ShippingPolicyView: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8 text-xs sm:text-sm text-[#171513]/80 leading-relaxed font-light">
    <div>
      <span className="text-xs uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-2">
        Logistics Guidelines
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
        Shipping & Delivery Policy
      </h1>
    </div>

    <div className="space-y-4 bg-white p-6 sm:p-8 border border-[#171513]/10 shadow-sm">
      <h2 className="font-serif text-xl font-semibold text-[#171513]">
        Nationwide Delivery Network
      </h2>
      <p>
        VEYORA partners with Pakistan's premier courier networks—TCS Express and Leopard Courier—to provide fast, insured, and tracked delivery to over 250 cities and rural destinations across all provinces: Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad Capital Territory, Azad Jammu & Kashmir, and Gilgit-Baltistan.
      </p>

      <h3 className="font-serif text-lg font-semibold text-[#171513] pt-4">
        Shipping Fees
      </h3>
      <ul className="space-y-2 list-disc list-inside">
        <li><strong>Orders above PKR 5,000:</strong> COMPLIMENTARY Nationwide Express Shipping.</li>
        <li><strong>Orders below PKR 5,000:</strong> Standard flat rate of PKR 250 across all Pakistani cities.</li>
        <li><strong>Urgent Priority Dispatch (Optional):</strong> PKR 450 for expedited same-day or next-day delivery.</li>
      </ul>

      <h3 className="font-serif text-lg font-semibold text-[#171513] pt-4">
        Delivery Timelines
      </h3>
      <ul className="space-y-2 list-disc list-inside">
        <li><strong>Major Metros (Lahore, Karachi, Islamabad, Rawalpindi):</strong> 24 to 48 business hours.</li>
        <li><strong>Other Cities (Faisalabad, Multan, Peshawar, Sialkot, Quetta):</strong> 2 to 4 business days.</li>
        <li><strong>Bespoke Stitched Orders:</strong> 4 to 6 business days for atelier tailoring prior to dispatch.</li>
      </ul>
    </div>
  </div>
);

export const ReturnPolicyView: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8 text-xs sm:text-sm text-[#171513]/80 leading-relaxed font-light">
    <div>
      <span className="text-xs uppercase tracking-[0.3em] text-[#B69A70] font-semibold block mb-2">
        Hassle-Free Care
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
        7-Day Exchange & Return Policy
      </h1>
    </div>

    <div className="space-y-4 bg-white p-6 sm:p-8 border border-[#171513]/10 shadow-sm">
      <h2 className="font-serif text-xl font-semibold text-[#171513]">
        Effortless Doorstep Exchanges
      </h2>
      <p>
        We take immense pride in our craftsmanship and desire complete delight with every order. If your garment does not fit as expected or you wish to exchange it for another design or shade, you may initiate an exchange within 7 calendar days of receipt.
      </p>

      <h3 className="font-serif text-lg font-semibold text-[#171513] pt-4">
        Exchange Criteria
      </h3>
      <ul className="space-y-2 list-disc list-inside">
        <li>The garment must be unworn, unwashed, and undamaged with all original VEYORA tags attached.</li>
        <li>Must be returned in the original keepsake ivory box.</li>
        <li>Footwear must be tried indoors on carpeted surfaces with zero sole scuffs.</li>
        <li>Due to hygiene reasons, innerwear items cannot be exchanged unless received damaged.</li>
      </ul>

      <h3 className="font-serif text-lg font-semibold text-[#171513] pt-4">
        Doorstep Reverse Courier Pickup
      </h3>
      <p>
        Simply message our WhatsApp Concierge at <strong>03494968548</strong> with your Order ID and preferred size. We will dispatch the replacement piece and have the courier rider collect the original item directly from your doorstep.
      </p>
    </div>
  </div>
);

export const PrivacyPolicyView: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8 text-xs sm:text-sm text-[#171513]/80 leading-relaxed font-light">
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
        Privacy Policy
      </h1>
      <p className="text-xs text-[#171513]/60 mt-1">Last Updated: November 2026</p>
    </div>

    <div className="space-y-4 bg-white p-6 sm:p-8 border border-[#171513]/10 shadow-sm">
      <p>
        VEYORA ("we", "our", or "the Atelier") is committed to protecting the personal privacy and data of our patrons across Pakistan. This policy describes how your information is handled when shopping on veyora.pk.
      </p>
      <h3 className="font-serif text-lg font-semibold text-[#171513] pt-2">
        Information We Collect
      </h3>
      <p>
        We collect personal details necessary to fulfill and verify your deliveries: recipient name, delivery street address, phone number (used for TCS/Leopard delivery dispatch notifications), and email address. We do not sell or rent patron data to third-party advertisers.
      </p>
    </div>
  </div>
);

export const TermsConditionsView: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8 text-xs sm:text-sm text-[#171513]/80 leading-relaxed font-light">
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
        Terms & Conditions
      </h1>
      <p className="text-xs text-[#171513]/60 mt-1">Effective: November 2026</p>
    </div>

    <div className="space-y-4 bg-white p-6 sm:p-8 border border-[#171513]/10 shadow-sm">
      <p>
        Welcome to VEYORA. By browsing or purchasing from our platform, you agree to our standard terms of sale. All prices are displayed in Pakistani Rupee (PKR).
      </p>
      <h3 className="font-serif text-lg font-semibold text-[#171513] pt-2">
        Cash on Delivery Agreement
      </h3>
      <p>
        When selecting Cash on Delivery (COD), the purchaser enters a bona fide agreement to receive the parcel at the designated address and tender the exact amount due to the courier representative.
      </p>
    </div>
  </div>
);

export const SizeGuideView: React.FC = () => {
  const { setIsSizeAssistantOpen } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B69A70] font-semibold block">
          Tailoring Precision
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#171513]">
          Pakistani Pret Size Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#171513]/70 font-light max-w-xl mx-auto leading-relaxed">
          Standard garment dimensions for all VEYORA kurtas, festive suits, and trousers.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 border border-[#171513]/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#171513]/10">
          <h2 className="font-serif text-xl font-semibold text-[#171513]">
            Finished Garment Measurements (Inches)
          </h2>
          <button
            onClick={() => setIsSizeAssistantOpen(true)}
            className="px-4 py-2 bg-[#641D32] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Launch Smart Size Assistant
          </button>
        </div>

        <table className="w-full text-xs text-left border-collapse font-mono">
          <thead>
            <tr className="bg-[#171513] text-[#F6F2EC]">
              <th className="p-3">Size Tag</th>
              <th className="p-3">Shirt Chest</th>
              <th className="p-3">Shoulder</th>
              <th className="p-3">Waist</th>
              <th className="p-3">Hip Flare</th>
              <th className="p-3">Kurta Length</th>
              <th className="p-3">Trouser Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#171513]/10">
            <tr>
              <td className="p-3 font-bold font-sans">XS</td>
              <td className="p-3">36"</td>
              <td className="p-3">13.5"</td>
              <td className="p-3">33"</td>
              <td className="p-3">38"</td>
              <td className="p-3">42"</td>
              <td className="p-3">37"</td>
            </tr>
            <tr className="bg-[#F6F2EC]/40">
              <td className="p-3 font-bold font-sans">S</td>
              <td className="p-3">38"</td>
              <td className="p-3">14.5"</td>
              <td className="p-3">35"</td>
              <td className="p-3">40"</td>
              <td className="p-3">43"</td>
              <td className="p-3">38"</td>
            </tr>
            <tr>
              <td className="p-3 font-bold font-sans">M</td>
              <td className="p-3">41"</td>
              <td className="p-3">15.0"</td>
              <td className="p-3">38"</td>
              <td className="p-3">44"</td>
              <td className="p-3">44"</td>
              <td className="p-3">38.5"</td>
            </tr>
            <tr className="bg-[#F6F2EC]/40">
              <td className="p-3 font-bold font-sans">L</td>
              <td className="p-3">44"</td>
              <td className="p-3">15.5"</td>
              <td className="p-3">41"</td>
              <td className="p-3">47"</td>
              <td className="p-3">45"</td>
              <td className="p-3">39"</td>
            </tr>
            <tr>
              <td className="p-3 font-bold font-sans">XL</td>
              <td className="p-3">48"</td>
              <td className="p-3">16.5"</td>
              <td className="p-3">45"</td>
              <td className="p-3">51"</td>
              <td className="p-3">45"</td>
              <td className="p-3">39.5"</td>
            </tr>
          </tbody>
        </table>

        <div className="p-4 bg-[#F6F2EC] text-xs text-[#171513]/75 space-y-1">
          <strong className="text-[#171513] block">Measuring Tip:</strong>
          <p>
            Measure across the fullest part of your bust and add 2 to 3 inches for the ideal Pakistani pret drape. For fitted silhouettes, choose standard size; for relaxed modest flow, choose one size up.
          </p>
        </div>
      </div>
    </div>
  );
};
