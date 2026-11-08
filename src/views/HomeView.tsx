import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { DEPARTMENTS } from '../data/departments';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Scissors,
  ChevronLeft,
  ChevronRight,
  Check,
  ShoppingBag,
  Send,
} from 'lucide-react';

interface CampaignSlide {
  id: string;
  tagline: string;
  headline: string;
  description: string;
  image: string;
  primaryCtaText: string;
  primaryAction: () => void;
  secondaryCtaText: string;
  secondaryAction: () => void;
}

export const HomeView: React.FC = () => {
  const { navigateTo, setIsStylistOpen, setIsSizeAssistantOpen, addToCart, formatPKR, showToast, products, productsLoading, productsError } = useShop();
  
  // Hero Carousel State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Tabbed Grid State
  const [activeTab, setActiveTab] = useState<'all' | 'clothing' | 'footwear' | 'bags' | 'jewellery'>('all');

  // Complete the Look uses only products loaded from the live Shopify catalog.
  const lookItems: Product[] = [
    products.find((p) => p.department === 'clothing'),
    products.find((p) => p.department === 'footwear'),
    products.find((p) => p.department === 'bags'),
    products.find((p) => p.department === 'jewellery')
  ].filter((item): item is Product => Boolean(item));
  const [selectedBundleItems, setSelectedBundleItems] = useState<string[]>([]);

  useEffect(() => {
    setSelectedBundleItems(lookItems.map((item) => item.id));
  }, [products]);


  const campaignSlides: CampaignSlide[] = [
    {
      id: 'slide-1',
      tagline: "Festive & Bridal Heirlooms '26",
      headline: 'The Sovereign Grace of Pakistani Couture',
      description:
        'Discover an expressive edit of occasionwear and contemporary pieces for memorable moments.',
      image: '/src/assets/images/hero_luxury_couture_1794123004357.jpg',
      primaryCtaText: 'Shop New Arrivals',
      primaryAction: () => navigateTo('collection', { department: 'clothing', category: 'All' }),
      secondaryCtaText: 'Shop Collections',
      secondaryAction: () => navigateTo('collection', { department: 'all' })
    },
    {
      id: 'slide-2',
      tagline: 'Daytime Soirée & Pure Lawn Pret',
      headline: 'Effortless Summer Opulence & Chikan Jaal',
      description:
        'Explore graceful everyday looks and refined details for effortless day-to-evening style.',
      image: '/src/assets/images/cotton_pret_editorial_1794123005836.jpg',
      primaryCtaText: 'Discover Luxury Pret',
      primaryAction: () => navigateTo('collection', { department: 'clothing', category: 'Kurtas' }),
      secondaryCtaText: 'Shop New Arrivals',
      secondaryAction: () => navigateTo('collection', { department: 'clothing' })
    },
    {
      id: 'slide-3',
      tagline: 'Royal Courtly Heirlooms',
      headline: 'Mughal Burgundy Velvet & Dabka Ghararas',
      description:
        'Discover rich tones and statement styles for your next special occasion.',
      image: '/src/assets/images/festive_velvet_collection_1794123003980.jpg',
      primaryCtaText: 'Shop Festive Formals',
      primaryAction: () => navigateTo('product', { productId: 'veyora-cl-02' }),
      secondaryCtaText: 'Explore Lookbook',
      secondaryAction: () => navigateTo('journal')
    }
  ];

  // Auto-advance Carousel
  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % campaignSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isCarouselPaused, campaignSlides.length]);

  const currentSlide = campaignSlides[currentSlideIndex];

  // Filtered Products for Tabbed Grid
  const filteredProducts = products.filter((product) => {
    if (activeTab === 'all') return true;
    return product.department === activeTab;
  });

  // Bundle Calculations
  const bundleSubtotal = lookItems
    .filter((item) => selectedBundleItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const bundleDiscount = 0;
  const bundleFinalTotal = bundleSubtotal - bundleDiscount;

  const toggleBundleItem = (productId: string) => {
    setSelectedBundleItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddBundleToBag = () => {
    const itemsToAdd = lookItems.filter((item) => selectedBundleItems.includes(item.id));
    if (itemsToAdd.length === 0) {
      showToast('Please select at least one item from the curated look.', 'info');
      return;
    }

    itemsToAdd.forEach((item) => {
      addToCart({
        productId: item.id,
        shopifyVariantId: item.shopifyVariantId,
        title: item.title,
        price: item.price,
        image: item.images[0],
        size: item.sizes[0] || 'Standard',
        color: item.colors[0]?.name || 'Original',
        quantity: 1
      });
    });

    showToast(`Added ${itemsToAdd.length} curated pieces from "Complete the Look" to your bag!`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. EDITORIAL MULTI-SLIDE CAMPAIGN HERO */}
      <section
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-[#171513] text-[#F6F2EC] overflow-hidden"
      >
        {/* Background Editorial Images with Fade Transitions */}
        {campaignSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('/src/assets/images/')) {
                  target.src = target.src.replace('/src/assets/images/', '/images/');
                }
              }}
              className="w-full h-full object-cover object-top opacity-65 scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
            />
            {/* Measured Scrim for WCAG AA Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#171513]/95 via-[#171513]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-transparent to-black/30" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B69A70]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentSlide.tagline}</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.1] tracking-tight text-balance">
              {currentSlide.headline}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#EEE5DF]/85 font-light leading-relaxed max-w-xl">
              {currentSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={currentSlide.primaryAction}
                className="px-8 py-4 bg-[#641D32] hover:bg-[#7D2640] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>{currentSlide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-[#B69A70] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={currentSlide.secondaryAction}
                className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-[#171513] backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center"
              >
                {currentSlide.secondaryCtaText}
              </button>
            </div>

            {/* Trust Assurance Strip */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#EEE5DF]/70">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B69A70]" />
                <span>Nationwide Cash on Delivery (COD)</span>
              </div>
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#B69A70]" />
                <span>Curated Women’s Fashion</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B69A70]" />
                <span>Discover Your Signature Style</span>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows & Slide Dots */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-4">
            {campaignSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 transition-all duration-300 ${
                  i === currentSlideIndex ? 'w-8 bg-[#B69A70]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentSlideIndex((prev) => (prev === 0 ? campaignSlides.length - 1 : prev - 1))
            }
            aria-label="Previous campaign slide"
            className="p-2.5 bg-black/40 hover:bg-[#B69A70] text-white hover:text-[#171513] backdrop-blur-md border border-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % campaignSlides.length)}
            aria-label="Next campaign slide"
            className="p-2.5 bg-black/40 hover:bg-[#B69A70] text-white hover:text-[#171513] backdrop-blur-md border border-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#171513]/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
              Curated Universes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => navigateTo('collection', { department: 'all' })}
            className="text-xs uppercase tracking-widest text-[#641D32] hover:text-[#171513] font-semibold flex items-center gap-1 group"
          >
            <span>Explore All 11 Departments</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B69A70] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Grid: All 11 departments with their distinct product photography */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => navigateTo('collection', { department: dept.id })}
              className="group text-left bg-white border border-[#171513]/10 p-3 hover:border-[#641D32] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#EEE5DF] mb-3">
                <img
                  src={dept.featuredImage}
                  alt={dept.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/src/assets/images/')) {
                      target.src = target.src.replace('/src/assets/images/', '/images/');
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-[#171513] group-hover:text-[#641D32] transition-colors line-clamp-1">
                  {dept.name}
                </h3>
                <span className="text-[10px] text-[#171513]/60 truncate block mt-0.5">
                  {dept.tagline.split(',')[0]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS, BESTSELLERS & TRENDING (Interactive Tabbed Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#171513]/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
              Curated Heirlooms
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513]">
              New Arrivals & Bestsellers
            </h2>
          </div>

          {/* Live Shopify collection filters */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[#171513]/10">
            {([
              ['all', 'All Pieces'],
              ['clothing', 'Clothing'],
              ['footwear', 'Footwear'],
              ['bags', 'Bags'],
              ['jewellery', 'Jewellery']
            ] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  activeTab === value
                    ? 'bg-[#171513] text-white shadow-xs'
                    : 'text-[#171513]/70 hover:text-[#171513]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {productsLoading ? (
          <div className="py-16 text-center text-sm text-[#171513]/60">Loading live VEYORA products…</div>
        ) : productsError ? (
          <div className="py-12 px-5 text-center border border-[#641D32]/20 bg-white">
            <p className="text-sm text-[#641D32]">Live products could not be loaded.</p>
            <p className="text-xs text-[#171513]/60 mt-2">Please refresh in a moment or browse the collections.</p>
          </div>
        ) : filteredProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-[#171513]/10 bg-white">
            <p className="font-serif text-xl text-[#171513]">More pieces are arriving soon.</p>
            <p className="text-xs text-[#171513]/60 mt-2">Explore another department to discover available designs.</p>
          </div>
        )}
      </section>

      {/* 4. COMPLETE THE LOOK (INTELLIGENT OUTFIT RECOMMENDATION SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171513] text-[#F6F2EC] border border-[#B69A70]/30 shadow-2xl p-6 sm:p-10 lg:p-12">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Styling Coordination</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                Complete the Look — Festive Heirloom Edit
              </h2>
              <p className="text-xs sm:text-sm text-[#EEE5DF]/70 font-light mt-1">
                A unified Pakistani celebration ensemble: raw silk kurta, matching hand-embroidered khussa, evening clutch, and 22K gold-plated polki choker.
              </p>
            </div>

            <span className="text-xs text-[#B69A70] bg-[#B69A70]/10 border border-[#B69A70]/30 px-3 py-1 font-semibold">
              Curated Pieces from Our Live Collection
            </span>
          </div>

          {/* Grid of the 4 matched pieces */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {lookItems.map((item) => {
              const isSelected = selectedBundleItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleBundleItem(item.id)}
                  className={`cursor-pointer p-3 border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/10 border-[#B69A70] ring-1 ring-[#B69A70]'
                      : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="aspect-[3/4] overflow-hidden bg-[#241F1C] mb-3 relative">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes('/src/assets/images/')) {
                            target.src = target.src.replace('/src/assets/images/', '/images/');
                          }
                        }}
                        className="w-full h-full object-cover object-center"
                      />
                      <div
                        className={`absolute top-2 right-2 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#B69A70] border-[#B69A70] text-[#171513]'
                            : 'bg-black/50 border-white/50 text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-[#B69A70] font-semibold block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-white line-clamp-1 mt-0.5">
                      {item.title}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#EEE5DF]">{formatPKR(item.price)}</span>
                    <span className="text-[10px] text-[#B69A70]">
                      {isSelected ? 'Included' : '+ Tap to Add'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bundle Summary Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-baseline gap-4 text-center sm:text-left">
              <div>
                <span className="text-xs text-[#EEE5DF]/60 block">
                  Curated Ensemble ({selectedBundleItems.length} items selected):
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-medium text-white font-mono">
                  {formatPKR(bundleFinalTotal)}
                </span>
                {bundleDiscount > 0 && (
                  <span className="text-xs text-[#B69A70] ml-2 font-mono">
                    (Saved {formatPKR(bundleDiscount)})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleAddBundleToBag}
                disabled={selectedBundleItems.length === 0}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#B69A70] hover:bg-[#A3855B] text-[#171513] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Selected Look to Bag</span>
              </button>

              <button
                onClick={() => setIsStylistOpen(true)}
                className="px-6 py-3.5 border border-white/30 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors hidden md:block"
              >
                Consult Stylist
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CRAFTSMANSHIP & ATELIER HERITAGE (BRAND STORY) */}
      <section className="bg-white border-y border-[#171513]/10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-[#EEE5DF] overflow-hidden">
                <img
                  src="/src/assets/images/cotton_pret_editorial_1794123005836.jpg"
                  alt="Fine Resham Embroidery Atelier"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/src/assets/images/')) {
                      target.src = target.src.replace('/src/assets/images/', '/images/');
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] bg-[#EEE5DF] overflow-hidden mt-8">
                <img
                  src="/src/assets/images/luxury_jewellery_accessories_1794123005854.jpg"
                  alt="Heirloom Polki and Kundan Crafts"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/src/assets/images/')) {
                      target.src = target.src.replace('/src/assets/images/', '/images/');
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Story & Standards */}
            <div className="space-y-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold">
                Slow Luxury & Karachi Heritage
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171513] leading-tight">
                Honoring 400 Years of South Asian Textile Mastery
              </h2>

              <p className="text-sm text-[#171513]/80 leading-relaxed font-light">
                Rooted in Karachi, Pakistan, VEYORA represents an uncompromising dedication to courtly craftsmanship. Every garment passes through the focused hands of generational master karigars in the historic artisan quarters of Lahore and Karachi. From hand-twisting antique copper tilla to setting uncut polki stones into 22K gold dip, we preserve heirloom traditions for the contemporary woman.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#171513]/10">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#641D32]">140+</span>
                  <p className="text-xs text-[#171513]/70 mt-1">
                    Hours of hand embroidery invested per festive piece
                  </p>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#641D32]">100%</span>
                  <p className="text-xs text-[#171513]/70 mt-1">
                    Pure mulberry silk, pima lawn and certified alloys
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsSizeAssistantOpen(true)}
                  className="px-6 py-3 bg-[#171513] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#641D32] transition-colors"
                >
                  Try Smart Size Assistant
                </button>
                <button
                  onClick={() => navigateTo('journal')}
                  className="text-xs uppercase tracking-wider text-[#641D32] hover:text-[#171513] font-semibold underline underline-offset-4"
                >
                  Read VEYORA Style Journal
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. EDITORIAL DISCOVERY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171513] text-[#F6F2EC] p-8 sm:p-12 lg:p-16 border border-[#B69A70]/30 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold">The VEYORA Edit</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-3">Discover a style that feels like you.</h2>
          <p className="text-sm text-[#EEE5DF]/75 mt-3 max-w-xl mx-auto">Explore the latest pieces and build a look that reflects your own expression.</p>
          <button onClick={() => navigateTo('collection', { department: 'all' })} className="mt-7 px-8 py-3 bg-[#641D32] hover:bg-[#7D2640] text-white text-xs font-semibold uppercase tracking-widest">Explore the Collection</button>
        </div>
      </section>

      {/* 8. NATIONWIDE COD ASSURANCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-[#EEE5DF] border border-[#B69A70]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white border border-[#171513]/10 shrink-0">
              <Truck className="w-8 h-8 text-[#641D32]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#171513]">
                Nationwide Cash on Delivery Across Pakistan
              </h3>
              <p className="text-xs text-[#171513]/75 mt-1 max-w-xl font-light">
                Explore VEYORA online and review the available payment and delivery details at checkout.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => navigateTo('tracking')}
              className="px-6 py-3 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              Track Existing Order →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
