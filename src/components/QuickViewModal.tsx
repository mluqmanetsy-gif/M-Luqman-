import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    navigateTo,
    formatPKR,
    toggleWishlist,
    isWishlisted
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isStitched, setIsStitched] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  React.useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || 'Standard');
      setSelectedColor(quickViewProduct.colors[0]?.name || 'Original');
      setIsStitched(false);
      setActiveImageIndex(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0] || 'Standard';
  const currentColor = selectedColor || product.colors[0]?.name || 'Original';
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[activeImageIndex] || product.images[0],
      size: currentSize,
      color: currentColor,
      isStitched: isStitched && product.stitchingAvailable,
      stitchingPrice: product.stitchingPrice,
      quantity: 1
    });
    closeQuickView();
  };

  const handleGoToFullDetails = () => {
    closeQuickView();
    navigateTo('product', { productId: product.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171513]/70 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      <div className="relative bg-[#F6F2EC] w-full max-w-3xl overflow-hidden shadow-2xl border border-[#B69A70]/30 z-10 my-8">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#171513] transition-colors rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Side */}
          <div className="p-6 bg-white flex flex-col justify-between">
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#EEE5DF]/40">
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
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 border-2 overflow-hidden shrink-0 ${
                      activeImageIndex === idx ? 'border-[#641D32]' : 'border-transparent'
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
          </div>

          {/* Product Purchasing Info */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-[#171513]/60 uppercase tracking-widest">
                <span>{product.category}</span>
                <span className="text-[#641D32] font-semibold">Cash on Delivery</span>
              </div>

              <h2 className="font-serif text-2xl font-semibold text-[#171513] mt-1">
                {product.title}
              </h2>

              <div className="flex items-baseline gap-3 mt-2 font-mono">
                <span className="text-xl font-bold text-[#171513]">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#171513]/40 line-through">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#171513]/70 mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs text-[#171513] font-medium block mb-1.5">
                    Color: <strong className="font-semibold">{currentColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                          currentColor === c.name ? 'border-[#641D32] scale-110' : 'border-black/20'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {currentColor === c.name && (
                          <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#171513] font-medium">
                      Select Size:
                    </span>
                    <button
                      onClick={handleGoToFullDetails}
                      className="text-[11px] text-[#B69A70] hover:text-[#641D32] underline"
                    >
                      View Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
                          currentSize === s
                            ? 'bg-[#171513] text-white border-[#171513]'
                            : 'bg-white text-[#171513] border-[#171513]/20 hover:border-[#171513]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stitching Option if applicable */}
              {product.stitchingAvailable && (
                <div className="mt-4 p-3 bg-white border border-[#B69A70]/40">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isStitched}
                      onChange={(e) => setIsStitched(e.target.checked)}
                      className="mt-0.5 accent-[#641D32]"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-[#171513] block">
                        Add Atelier Custom Tailoring (+{formatPKR(product.stitchingPrice || 4500)})
                      </span>
                      <span className="text-[#171513]/60">
                        Hand-finished with piping, tassels and breathable silk lining.
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#171513]/10 space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
                >
                  Add to Shopping Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 bg-white border border-[#171513]/20 hover:text-[#641D32] transition-colors"
                  title="Save to Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlisted ? 'fill-[#641D32] text-[#641D32]' : 'text-[#171513]'
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={handleGoToFullDetails}
                className="w-full text-center py-2 text-xs text-[#171513] hover:text-[#641D32] font-medium flex items-center justify-center gap-1"
              >
                <span>View Full Product Specifications & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#171513]/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>Complimentary Delivery above PKR 5,000 · 7-Day Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
