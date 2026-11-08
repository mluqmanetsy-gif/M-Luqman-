import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    formatPKR,
    toggleWishlist,
    isWishlisted,
    openQuickView,
    addToCart
  } = useShop();

  const handleCardClick = () => {
    navigateTo('product', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      shopifyVariantId: product.shopifyVariants?.find((variant) => variant.availableForSale)?.id || product.shopifyVariantId,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0] || 'Standard',
      color: product.colors[0]?.name || 'Original',
      isStitched: false,
      stitchingPrice: product.stitchingPrice,
      quantity: 1
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-white border border-[#171513]/10 hover:border-[#B69A70]/60 transition-all duration-300 hover:shadow-lg relative"
    >
      {/* Image Container with 4:5 / 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EEE5DF]/30">
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('/src/assets/images/')) {
              target.src = target.src.replace('/src/assets/images/', '/images/');
            }
          }}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Secondary Image on Hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('/src/assets/images/')) {
                target.src = target.src.replace('/src/assets/images/', '/images/');
              }
            }}
            className="w-full h-full object-cover object-top absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Subtle Tag (Top Left - No Pill Spam) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="bg-[#641D32] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 shadow-sm">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          {product.isFestive && (
            <div className="bg-[#B69A70] text-[#171513] text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 shadow-sm">
              Festive '26
            </div>
          )}
          {!product.isFestive && product.isNewArrival && (
            <div className="bg-[#171513] text-[#F6F2EC] text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 shadow-sm">
              New Arrival
            </div>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#171513] transition-colors rounded-full shadow-sm hover:text-[#641D32]"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-[#641D32] text-[#641D32]' : 'text-[#171513]'
            }`}
          />
        </button>

        {/* Available Sizes Strip on Hover */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-12 px-3 py-1.5 bg-[#171513]/85 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-[#B69A70] font-medium">Sizes:</span>
            <span>{product.sizes.slice(0, 5).join(' · ')}</span>
          </div>
        )}

        {/* Quick View & Quick Add Action Bar (Bottom of image on hover) */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-[#171513] text-xs font-medium uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="px-3 py-2 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-medium uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#171513]/60 uppercase tracking-widest mb-1.5">
            <span>{product.category}</span>
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-[#B69A70] font-medium">
                <span>★</span>
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-[#171513]/40">({product.reviewCount})</span>
              </div>
            )}
          </div>

          <h3 className="font-serif text-base font-semibold text-[#171513] line-clamp-1 group-hover:text-[#641D32] transition-colors">
            {product.title}
          </h3>

          {/* Stock Status indicator */}
          <div className="mt-1 flex items-center gap-2 text-[10px]">
            {product.isShopifyProduct ? (
              <span className={product.inStock ? 'text-[#1E3A2F]' : 'text-[#641D32]'}>
                {product.inStock ? 'Available to order' : 'Currently unavailable'}
              </span>
            ) : product.stockCount && product.stockCount < 8 ? (
              <span className="text-[#641D32] font-medium">Limited availability</span>
            ) : (
              <span className="text-[#171513]/60">Available</span>
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[#171513]/5 flex items-center justify-between">
          <div className="flex items-baseline gap-2 font-mono tabular-nums">
            <span className="text-sm font-semibold text-[#171513]">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#171513]/40 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  title={col.name}
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: col.hex }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-[#171513]/60 font-mono">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
