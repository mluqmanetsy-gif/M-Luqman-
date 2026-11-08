import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RefreshCw,
  ShieldCheck,
  Check,
  ZoomIn,
  X,
  Share2,
  Sparkles,
  Scissors
} from 'lucide-react';

export const ProductView: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsSizeAssistantOpen,
    setIsStylistOpen,
    formatPKR,
    showToast,
    products
  } = useShop();

  const product = selectedProduct;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Original');
  const [isStitched, setIsStitched] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);


  // Complete the Look ensemble resolution
  const matchedLookProducts = (product.matchingProductIds && product.matchingProductIds.length > 0)
    ? products.filter((p) => product.matchingProductIds?.includes(p.id) && p.isShopifyProduct)
    : [
        products.find((p) => p.department === 'footwear' && p.id !== product.id && p.isShopifyProduct),
        products.find((p) => p.department === 'bags' && p.id !== product.id && p.isShopifyProduct),
        products.find((p) => p.department === 'jewellery' && p.id !== product.id && p.isShopifyProduct)
      ].filter(Boolean) as typeof products;

  const fullLookEnsemble = [product, ...matchedLookProducts];
  const [selectedEnsembleIds, setSelectedEnsembleIds] = useState<string[]>([
    product.id,
    ...matchedLookProducts.map((p) => p.id)
  ]);

  // Reset product state whenever selected product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[0] || 'Standard');
    setSelectedColor(product.colors[0]?.name || 'Original');
    setIsStitched(false);
    setQuantity(1);
    setSelectedEnsembleIds([product.id, ...matchedLookProducts.map((p) => p.id)]);
  }, [product.id]);

  // Synchronize size if chosen from Smart Size Assistant
  useEffect(() => {
    const handleApplySizeEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && product.sizes.includes(customEvent.detail)) {
        setSelectedSize(customEvent.detail);
      }
    };
    window.addEventListener('veyora:apply-size', handleApplySizeEvent);
    return () => window.removeEventListener('veyora:apply-size', handleApplySizeEvent);
  }, [product.sizes]);

  const toggleEnsembleItem = (id: string) => {
    setSelectedEnsembleIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const ensembleSubtotal = fullLookEnsemble
    .filter((item) => selectedEnsembleIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const ensembleDiscount = 0;
  const ensembleFinalTotal = ensembleSubtotal - ensembleDiscount;

  const handleAddEnsembleToBag = () => {
    const itemsToAdd = fullLookEnsemble.filter((item) => selectedEnsembleIds.includes(item.id));
    if (itemsToAdd.length === 0) {
      showToast('Please select at least one piece from the look.', 'info');
      return;
    }

    itemsToAdd.forEach((item) => {
      addToCart({
        productId: item.id,
        title: item.title,
        price: item.shopifyVariants?.find((variant) => variant.availableForSale)?.price ?? item.price,
        shopifyVariantId: item.shopifyVariants?.find((variant) => variant.availableForSale)?.id ?? item.shopifyVariantId,
        image: item.images[0],
        size: item.id === product.id ? selectedSize : item.sizes[0] || 'Standard',
        color: item.id === product.id ? selectedColor : item.colors[0]?.name || 'Original',
        isStitched: item.id === product.id ? isStitched && product.stitchingAvailable : false,
        stitchingPrice: item.id === product.id ? product.stitchingPrice : undefined,
        quantity: 1
      });
    });

    showToast(`Added ${itemsToAdd.length} coordinating pieces to your shopping bag to your shopping bag!`);
  };

  const wishlisted = isWishlisted(product.id);

  const selectedShopifyVariant = product.shopifyVariants?.find((variant) =>
    variant.availableForSale &&
    variant.selectedOptions.every((option) =>
      /size/i.test(option.name) ? option.value === selectedSize :
      /color|colour/i.test(option.name) ? option.value === selectedColor : true
    )
  ) || product.shopifyVariants?.find((variant) => variant.availableForSale) || product.shopifyVariants?.[0];
  const baseProductPrice = selectedShopifyVariant?.price ?? product.price;
  const unitStitchingCost = isStitched && product.stitchingAvailable ? product.stitchingPrice || 4500 : 0;
  const unitPrice = baseProductPrice + unitStitchingCost;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (product.isShopifyProduct && (!selectedShopifyVariant || !selectedShopifyVariant.availableForSale)) {
      showToast('This variant is currently unavailable. Please choose another option.', 'error');
      return;
    }
    addToCart({
      productId: product.id,
      shopifyVariantId: selectedShopifyVariant?.id,
      title: product.title,
      price: baseProductPrice,
      image: product.images[activeImageIndex] || product.images[0],
      size: selectedSize,
      color: selectedColor,
      isStitched: isStitched && product.stitchingAvailable,
      stitchingPrice: product.stitchingPrice,
      quantity
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Look at this Pakistani luxury formal from VEYORA: ${product.title}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const relatedProducts = products.filter((p) => p.isShopifyProduct && p.id !== product.id && p.department === product.department).slice(0, 4);

  if (!selectedProduct) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-serif text-2xl text-[#171513]">Product unavailable</h2>
        <p className="mt-2 text-sm text-[#171513]/60">Please choose an available product from the collection.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumb Path */}
      <div className="flex items-center gap-2 text-xs text-[#171513]/60">
        <span>Home</span>
        <span>/</span>
        <span className="capitalize">{product.department}</span>
        <span>/</span>
        <span className="text-[#171513] font-medium truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main PDP Grid: Gallery Left, Sticky Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Gallery Image */}
          <div className="relative aspect-[3/4] bg-white border border-[#171513]/10 overflow-hidden group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('/src/assets/images/')) {
                  target.src = target.src.replace('/src/assets/images/', '/images/');
                }
              }}
              className="w-full h-full object-cover object-center cursor-zoom-in"
              onClick={() => setIsZoomModalOpen(true)}
            />

            {/* Zoom Action Button */}
            <button
              onClick={() => setIsZoomModalOpen(true)}
              className="absolute bottom-4 right-4 p-2.5 bg-white/90 hover:bg-white text-[#171513] shadow-md transition-colors"
              title="Click to Zoom Gallery"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Festive Tag */}
            {product.isFestive && (
              <div className="absolute top-4 left-4 bg-[#641D32] text-white text-xs uppercase tracking-widest font-semibold px-3 py-1">
                Festive '26 Heirlooms
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 sm:w-24 aspect-[3/4] border-2 overflow-hidden shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-[#641D32]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('/src/assets/images/')) {
                        target.src = target.src.replace('/src/assets/images/', '/images/');
                      }
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Fabric & Detail Showcase Tabs */}
          <div className="pt-8 border-t border-[#171513]/10 space-y-6">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#171513] mb-3">
                Fabric & Embellishment Specifications
              </h3>
              <p className="text-xs sm:text-sm text-[#171513]/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features Bullet List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block">
                  Artisanal Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-[#171513]/80">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#641D32] font-bold">·</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Care Guide */}
            {product.careInstructions && product.careInstructions.length > 0 && (
              <div className="p-4 bg-white border border-[#171513]/10">
                <span className="text-xs uppercase tracking-widest text-[#171513] font-semibold block mb-2">
                  Care & Preservation Guide
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#171513]/70">
                  {product.careInstructions.map((ci, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1E3A2F]" />
                      <span>{ci}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Contiguous Purchase Module (5 Cols, Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 bg-white p-6 sm:p-8 border border-[#171513]/10 shadow-sm">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#171513]/60 uppercase tracking-widest mb-1.5">
              <span>{product.category}</span>
              <button
                onClick={handleShare}
                className="hover:text-[#641D32] transition-colors flex items-center gap-1"
                title="Share piece"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Share</span>
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#171513] leading-tight">
              {product.title}
            </h1>

            {/* Live Judge.me rating badge will be mounted here after store connection. */}

            {/* Price Box */}
            <div className="mt-4 pt-4 border-t border-[#171513]/10 flex items-baseline gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#171513]">
                {formatPKR(unitPrice)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-sm text-[#171513]/40 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
              {isStitched && (
                <span className="text-xs text-[#641D32] font-semibold">
                  (Includes Bespoke Stitching)
                </span>
              )}
            </div>

            <p className="text-xs text-[#1E3A2F] font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cash on Delivery Available Nationwide Across Pakistan
            </p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-[#171513] uppercase tracking-wider">
                  Color Shade:
                </span>
                <span className="text-[#641D32] font-medium">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor === c.name ? 'border-[#641D32] scale-110' : 'border-black/20'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector & Fit Tools */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-[#171513] uppercase tracking-wider">
                  Select Size:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsSizeAssistantOpen(true)}
                    className="flex items-center gap-1 text-[#641D32] font-semibold hover:underline"
                  >
                    <Sparkles className="w-3 h-3 text-[#B69A70]" />
                    <span>Smart Size Finder</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[#B69A70] hover:text-[#641D32] underline"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Chart</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-semibold uppercase tracking-wider border transition-all text-center ${
                      selectedSize === s
                        ? 'bg-[#171513] text-white border-[#171513]'
                        : 'bg-white text-[#171513] border-[#171513]/20 hover:border-[#171513]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {product.stockCount && product.stockCount <= 5 && (
                <span className="text-[11px] text-[#641D32] font-semibold block mt-1.5">
                  • Only {product.stockCount} pieces remaining in atelier inventory
                </span>
              )}
            </div>
          )}

          {/* Stitched vs Unstitched Tailoring Add-on */}
          {product.stitchingAvailable && (
            <div className="p-4 bg-[#F6F2EC] border border-[#B69A70]/40 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStitched}
                  onChange={(e) => setIsStitched(e.target.checked)}
                  className="mt-1 accent-[#641D32] w-4 h-4"
                />
                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#171513] flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#641D32]" />
                      Bespoke Master Tailoring (+{formatPKR(product.stitchingPrice || 4500)})
                    </span>
                  </div>
                  <p className="text-[#171513]/70 mt-0.5">
                    Professionally stitched by master karigars with finished organza borders, pure silk lining, and customized neckline. (Adds 4-6 business days).
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Quantity Stepper & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#171513]/20 bg-[#F6F2EC] h-12 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-sm font-semibold hover:text-[#641D32]"
                >
                  -
                </button>
                <span className="px-3 font-mono font-bold text-sm text-[#171513]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-sm font-semibold hover:text-[#641D32]"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#B69A70]" />
                <span>Add to Shopping Bag ({formatPKR(totalPrice)})</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="h-12 w-12 border border-[#171513]/20 flex items-center justify-center hover:border-[#641D32] transition-colors bg-white"
                title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? 'fill-[#641D32] text-[#641D32]' : 'text-[#171513]'
                  }`}
                />
              </button>
            </div>

            {/* Stylist Booking Button */}
            <button
              onClick={() => setIsStylistOpen(true)}
              className="w-full py-2.5 bg-white border border-[#641D32] text-[#641D32] hover:bg-[#641D32] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>Consult Atelier Stylist for Pairing Advice</span>
            </button>
          </div>

          {/* Delivery & Assurance Details */}
          <div className="pt-4 border-t border-[#171513]/10 space-y-3 text-xs text-[#171513]/80">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-[#B69A70] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#171513] block">Nationwide Express Delivery</strong>
                <span>Lahore, Karachi & Islamabad: 24-48 Hours · Other Cities: 3-4 Days via TCS Courier.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RefreshCw className="w-4 h-4 text-[#B69A70] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#171513] block">7-Day Hassle-Free Exchange</strong>
                <span>Complimentary doorstep exchange service if the size or cut requires adjustment.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#B69A70] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#171513] block">100% Authentic Handcrafted Fabric</strong>
                <span>Pure certified fibers spun and dyed by master Pakistani artisans.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* REVIEWS — awaiting a connected review provider */}
      <section className="bg-white p-6 sm:p-10 border border-[#171513]/10">
        <h3 className="font-serif text-2xl font-semibold text-[#171513]">Customer Reviews</h3>
        <p className="text-xs text-[#171513]/60 mt-2">
Reviews will appear here when genuine customer feedback is collected through Judge.me. No sample or unverified reviews are displayed.
        </p>
      </section>

      {/* COMPLETE THE LOOK ENSEMBLE BUILDER */}
      {matchedLookProducts.length > 0 && (
        <section className="bg-[#171513] text-[#F6F2EC] border border-[#B69A70]/30 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Coordination</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Complete the Look — Curated Ensemble
              </h3>
              <p className="text-xs sm:text-sm text-[#EEE5DF]/70 font-light mt-1">
                Our stylists have curated matching footwear, handbag, and jewellery for {product.title}. Select coordinating pieces to build your look.
              </p>
            </div>

            <span className="text-xs text-[#B69A70] bg-[#B69A70]/10 border border-[#B69A70]/30 px-3 py-1 font-semibold self-start sm:self-auto">
              Coordinating Pieces
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {fullLookEnsemble.map((item) => {
              const isSelected = selectedEnsembleIds.includes(item.id);
              const isCurrentProduct = item.id === product.id;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleEnsembleItem(item.id)}
                  className={`cursor-pointer p-3 border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/10 border-[#B69A70] ring-1 ring-[#B69A70]'
                      : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100'
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
                      {isCurrentProduct && (
                        <div className="absolute bottom-2 left-2 bg-[#641D32] text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5">
                          Viewing Piece
                        </div>
                      )}
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
                      {isSelected ? 'Selected' : '+ Tap to Add'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bundle Action Strip */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-xs text-[#EEE5DF]/60 block">
                Total for {selectedEnsembleIds.length} Selected Ensemble Pieces:
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-white font-mono">
                  {formatPKR(ensembleFinalTotal)}
                </span>
                {ensembleDiscount > 0 && (
                  <span className="text-xs text-[#B69A70] font-mono">
                    (No bundle discount applied)
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAddEnsembleToBag}
              disabled={selectedEnsembleIds.length === 0}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#B69A70] hover:bg-[#A3855B] text-[#171513] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Selected Look to Bag</span>
            </button>
          </div>
        </section>
      )}

      {/* RELATED HEIRLOOMS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between pb-4 border-b border-[#171513]/10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
                From the Same Collection
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#171513]">
                Related Heirlooms
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ZOOM MODAL */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-3 text-white hover:text-[#B69A70] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-[90vh] overflow-hidden">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('/src/assets/images/')) {
                  target.src = target.src.replace('/src/assets/images/', '/images/');
                }
              }}
              className="max-h-[85vh] w-auto mx-auto object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-[#F6F2EC] w-full max-w-2xl p-6 sm:p-8 shadow-2xl border border-[#B69A70]/40 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#171513] hover:text-[#641D32]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block">
                Standard Pakistani Pret Specifications
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#171513]">
                Garment Measurement Chart (Inches)
              </h3>
              <p className="text-xs text-[#171513]/60 mt-1">
                Measurements refer to finished garment dimensions. Standard ease of 2" included.
              </p>
            </div>

            <table className="w-full text-xs text-left border-collapse bg-white border border-[#171513]/10 font-mono">
              <thead>
                <tr className="bg-[#171513] text-[#F6F2EC]">
                  <th className="p-3">Size</th>
                  <th className="p-3">Chest</th>
                  <th className="p-3">Shoulder</th>
                  <th className="p-3">Waist</th>
                  <th className="p-3">Hip</th>
                  <th className="p-3">Length</th>
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
                </tr>
                <tr className="bg-[#F6F2EC]/40">
                  <td className="p-3 font-bold font-sans">S</td>
                  <td className="p-3">38"</td>
                  <td className="p-3">14.5"</td>
                  <td className="p-3">35"</td>
                  <td className="p-3">40"</td>
                  <td className="p-3">43"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">M</td>
                  <td className="p-3">41"</td>
                  <td className="p-3">15.0"</td>
                  <td className="p-3">38"</td>
                  <td className="p-3">44"</td>
                  <td className="p-3">44"</td>
                </tr>
                <tr className="bg-[#F6F2EC]/40">
                  <td className="p-3 font-bold font-sans">L</td>
                  <td className="p-3">44"</td>
                  <td className="p-3">15.5"</td>
                  <td className="p-3">41"</td>
                  <td className="p-3">47"</td>
                  <td className="p-3">45"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">XL</td>
                  <td className="p-3">48"</td>
                  <td className="p-3">16.5"</td>
                  <td className="p-3">45"</td>
                  <td className="p-3">51"</td>
                  <td className="p-3">45"</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsSizeGuideOpen(false);
                  setIsSizeAssistantOpen(true);
                }}
                className="px-4 py-2 bg-[#641D32] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Launch Smart Size Finder
              </button>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="px-4 py-2 bg-white border border-[#171513]/20 text-xs font-semibold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE STICKY BUY BAR */}
      <div className="lg:hidden fixed bottom-16 md:bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#171513]/10 p-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="font-mono text-xs font-bold text-[#171513] block">
            {formatPKR(totalPrice)}
          </span>
          <span className="text-[10px] text-[#171513]/60 truncate block max-w-[140px]">
            Size: {selectedSize} · {selectedColor}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-6 py-2.5 bg-[#171513] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#641D32] transition-colors flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#B69A70]" />
          <span>Add to Bag</span>
        </button>
      </div>

    </div>
  );
};
