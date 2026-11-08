import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Sparkles, Check, ArrowRight, ShoppingBag } from 'lucide-react';

export const FashionStylistModal: React.FC = () => {
  const { isStylistOpen, setIsStylistOpen, navigateTo, addToCart, formatPKR, showToast } = useShop();

  const [occasion, setOccasion] = useState<string>('Wedding Guest');
  const [silhouette, setSilhouette] = useState<string>('Straight Kurta & Cigarette Pants');
  const [colorPalette, setColorPalette] = useState<string>('Ivory & Gold Heirlooms');
  const [stylingGenerated, setStylingGenerated] = useState<boolean>(true);

  if (!isStylistOpen) return null;

  const occasions = [
    { id: 'Wedding Guest', label: 'Wedding / Barat / Valima', desc: 'Opulent zardozi & heavy formals' },
    { id: 'Nikkah / Engagement', label: 'Nikkah & Intimate Festive', desc: 'Subtle pastels, ivory & pearls' },
    { id: 'Formal Dinner', label: 'Formal Soirée / Dawat', desc: 'Silk velvet & rich jewel tones' },
    { id: 'Eid / Festive', label: 'Eid & Family Celebrations', desc: 'Refined pret & organza dupattas' },
    { id: 'Corporate Chic', label: 'Executive Power & Office', desc: 'Structured silk co-ords & totes' }
  ];

  const silhouettes = [
    'Straight Kurta & Cigarette Pants',
    'Two-Tier Flared Gharara',
    'Contemporary Silk Co-ord Set',
    'Open Kimono Modest Silhouette'
  ];

  const colorPalettes = [
    { name: 'Ivory & Gold Heirlooms', hex: '#B69A70', bg: '#F6F2EC' },
    { name: 'Royal Burgundy Velvet', hex: '#641D32', bg: '#EEE5DF' },
    { name: 'Deep Emerald & Malachite', hex: '#1E3A2F', bg: '#F6F2EC' },
    { name: 'Soft Blush & Monofilament', hex: '#D4A396', bg: '#EEE5DF' }
  ];

  // Curate recommended look based on selections
  const mainOutfit = (occasion === 'Formal Dinner' || occasion === 'Wedding Guest')
    ? (PRODUCTS.find((p) => p.id === 'veyora-md-01') || PRODUCTS[0])
    : (PRODUCTS.find((p) => p.id === 'veyora-cl-01') || PRODUCTS[0]);

  const footwear = PRODUCTS.find((p) => p.id === 'veyora-ft-01') || PRODUCTS[2];
  const jewellery = PRODUCTS.find((p) => p.id === 'veyora-jw-01') || PRODUCTS[6];
  const bag = PRODUCTS.find((p) => p.id === 'veyora-bg-01') || PRODUCTS[4];

  const curatedEnsemble = {
    mainOutfit,
    footwear,
    jewellery,
    bag,
    stylistNote:
      occasion === 'Wedding Guest'
        ? 'Pair this architectural antique zardozi formal with high-neck hair updos to spotlight the hand-strung polki choker. The cushioned leather khussas ensure effortless elegance across 6 hours of celebration.'
        : occasion === 'Nikkah / Engagement'
        ? 'A pristine harmony of champagne raw silk and freshwater pearls. Keep makeup luminous and dewy to honor the soft ivory fabric.'
        : 'Deep micro-velvet evokes timeless Old Lahore grandeur. Accentuate with antique gold heels and minimalist gold drop earrings.'
  };

  const ensembleTotalPrice =
    curatedEnsemble.mainOutfit.price +
    curatedEnsemble.footwear.price +
    curatedEnsemble.jewellery.price +
    curatedEnsemble.bag.price;

  const handleAddEnsembleToBag = () => {
    // Add main outfit
    addToCart({
      productId: curatedEnsemble.mainOutfit.id,
      title: curatedEnsemble.mainOutfit.title,
      price: curatedEnsemble.mainOutfit.price,
      image: curatedEnsemble.mainOutfit.images[0],
      size: curatedEnsemble.mainOutfit.sizes[0] || 'Standard',
      color: curatedEnsemble.mainOutfit.colors[0]?.name || 'Original',
      isStitched: true,
      stitchingPrice: curatedEnsemble.mainOutfit.stitchingPrice,
      quantity: 1
    });

    // Add footwear
    addToCart({
      productId: curatedEnsemble.footwear.id,
      title: curatedEnsemble.footwear.title,
      price: curatedEnsemble.footwear.price,
      image: curatedEnsemble.footwear.images[0],
      size: '38 (PK 8)',
      color: curatedEnsemble.footwear.colors[0]?.name || 'Original',
      quantity: 1
    });

    // Add jewellery
    addToCart({
      productId: curatedEnsemble.jewellery.id,
      title: curatedEnsemble.jewellery.title,
      price: curatedEnsemble.jewellery.price,
      image: curatedEnsemble.jewellery.images[0],
      size: 'Standard',
      color: curatedEnsemble.jewellery.colors[0]?.name || 'Original',
      quantity: 1
    });

    // Add bag
    addToCart({
      productId: curatedEnsemble.bag.id,
      title: curatedEnsemble.bag.title,
      price: curatedEnsemble.bag.price,
      image: curatedEnsemble.bag.images[0],
      size: 'Standard',
      color: curatedEnsemble.bag.colors[0]?.name || 'Original',
      quantity: 1
    });

    showToast('Complete 4-piece curated ensemble added to your bag!');
    setIsStylistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171513]/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsStylistOpen(false)}
      />

      <div className="relative bg-[#F6F2EC] w-full max-w-4xl shadow-2xl border border-[#B69A70]/30 z-10 my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#171513] text-[#F6F2EC] flex items-center justify-between border-b border-[#B69A70]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#641D32] rounded-none">
              <Sparkles className="w-5 h-5 text-[#B69A70]" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium tracking-wide">
                VEYORA Atelier Fashion Stylist
              </h2>
              <p className="text-xs text-[#EEE5DF]/70">
                Personalized Pakistani couture ensemble curation & pairing consultation
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsStylistOpen(false)}
            className="p-2 text-[#EEE5DF] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-8">
          
          {/* Step 1: Occasion */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold">
                Step 1: Select Your Occasion
              </span>
              <span className="text-xs text-[#171513]/60">Pakistan Festive Calendar</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setOccasion(occ.id)}
                  className={`p-3.5 text-left border transition-all ${
                    occasion === occ.id
                      ? 'bg-white border-[#641D32] shadow-sm'
                      : 'bg-[#EEE5DF]/50 border-transparent hover:border-[#171513]/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-[#171513]">
                      {occ.label}
                    </span>
                    {occasion === occ.id && (
                      <Check className="w-4 h-4 text-[#641D32]" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#171513]/60 block mt-1">
                    {occ.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Silhouette & Color Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block mb-3">
                Step 2: Desired Silhouette
              </span>
              <div className="space-y-2">
                {silhouettes.map((sil) => (
                  <button
                    key={sil}
                    onClick={() => setSilhouette(sil)}
                    className={`w-full p-3 text-left border text-xs font-medium transition-all flex items-center justify-between ${
                      silhouette === sil
                        ? 'bg-white border-[#641D32] text-[#171513]'
                        : 'bg-[#EEE5DF]/40 border-transparent text-[#171513]/80 hover:bg-white'
                    }`}
                  >
                    <span>{sil}</span>
                    {silhouette === sil && <Check className="w-3.5 h-3.5 text-[#641D32]" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block mb-3">
                Step 3: Royal Color Palette
              </span>
              <div className="space-y-2">
                {colorPalettes.map((cp) => (
                  <button
                    key={cp.name}
                    onClick={() => setColorPalette(cp.name)}
                    className={`w-full p-3 text-left border text-xs font-medium transition-all flex items-center justify-between ${
                      colorPalette === cp.name
                        ? 'bg-white border-[#641D32] text-[#171513]'
                        : 'bg-[#EEE5DF]/40 border-transparent text-[#171513]/80 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: cp.hex }}
                      />
                      <span>{cp.name}</span>
                    </div>
                    {colorPalette === cp.name && <Check className="w-3.5 h-3.5 text-[#641D32]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Curated Ensemble Result */}
          {stylingGenerated && (
            <div className="pt-6 border-t border-[#171513]/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#641D32] font-semibold">
                    Curated Signature Look
                  </span>
                  <h3 className="font-serif text-xl text-[#171513] font-semibold">
                    The {occasion} Edit in {colorPalette.split(' ')[0]}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#171513]/60 block">Complete Ensemble (4 Pieces)</span>
                  <span className="font-mono text-base font-bold text-[#641D32]">
                    {formatPKR(ensembleTotalPrice)}
                  </span>
                </div>
              </div>

              {/* Stylist Notes Box */}
              <div className="p-4 bg-white border-l-2 border-[#641D32] mb-6">
                <span className="text-xs uppercase tracking-wider text-[#B69A70] font-semibold block mb-1">
                  Atelier Stylist's Dressing Note
                </span>
                <p className="text-xs text-[#171513]/80 leading-relaxed italic">
                  "{curatedEnsemble.stylistNote}"
                </p>
              </div>

              {/* 4-Piece Product Showcase Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* 1. Main Outfit */}
                <div
                  onClick={() => {
                    setIsStylistOpen(false);
                    navigateTo('product', { productId: curatedEnsemble.mainOutfit.id });
                  }}
                  className="bg-white p-3 border border-[#171513]/10 hover:border-[#641D32] cursor-pointer group transition-all"
                >
                  <div className="aspect-[3/4] bg-[#EEE5DF] overflow-hidden mb-2">
                    <img
                      src={curatedEnsemble.mainOutfit.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('/src/assets/images/')) {
                          target.src = target.src.replace('/src/assets/images/', '/images/');
                        }
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] text-[#B69A70] font-semibold uppercase block">
                    Couture Outfit
                  </span>
                  <h4 className="font-serif text-xs font-semibold text-[#171513] line-clamp-1">
                    {curatedEnsemble.mainOutfit.title}
                  </h4>
                  <span className="font-mono text-xs font-bold text-[#171513] mt-1 block">
                    {formatPKR(curatedEnsemble.mainOutfit.price)}
                  </span>
                </div>

                {/* 2. Footwear */}
                <div
                  onClick={() => {
                    setIsStylistOpen(false);
                    navigateTo('product', { productId: curatedEnsemble.footwear.id });
                  }}
                  className="bg-white p-3 border border-[#171513]/10 hover:border-[#641D32] cursor-pointer group transition-all"
                >
                  <div className="aspect-[3/4] bg-[#EEE5DF] overflow-hidden mb-2">
                    <img
                      src={curatedEnsemble.footwear.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('/src/assets/images/')) {
                          target.src = target.src.replace('/src/assets/images/', '/images/');
                        }
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] text-[#B69A70] font-semibold uppercase block">
                    Matching Footwear
                  </span>
                  <h4 className="font-serif text-xs font-semibold text-[#171513] line-clamp-1">
                    {curatedEnsemble.footwear.title}
                  </h4>
                  <span className="font-mono text-xs font-bold text-[#171513] mt-1 block">
                    {formatPKR(curatedEnsemble.footwear.price)}
                  </span>
                </div>

                {/* 3. Jewellery */}
                <div
                  onClick={() => {
                    setIsStylistOpen(false);
                    navigateTo('product', { productId: curatedEnsemble.jewellery.id });
                  }}
                  className="bg-white p-3 border border-[#171513]/10 hover:border-[#641D32] cursor-pointer group transition-all"
                >
                  <div className="aspect-[3/4] bg-[#EEE5DF] overflow-hidden mb-2">
                    <img
                      src={curatedEnsemble.jewellery.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('/src/assets/images/')) {
                          target.src = target.src.replace('/src/assets/images/', '/images/');
                        }
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] text-[#B69A70] font-semibold uppercase block">
                    Heirloom Jewellery
                  </span>
                  <h4 className="font-serif text-xs font-semibold text-[#171513] line-clamp-1">
                    {curatedEnsemble.jewellery.title}
                  </h4>
                  <span className="font-mono text-xs font-bold text-[#171513] mt-1 block">
                    {formatPKR(curatedEnsemble.jewellery.price)}
                  </span>
                </div>

                {/* 4. Bag */}
                <div
                  onClick={() => {
                    setIsStylistOpen(false);
                    navigateTo('product', { productId: curatedEnsemble.bag.id });
                  }}
                  className="bg-white p-3 border border-[#171513]/10 hover:border-[#641D32] cursor-pointer group transition-all"
                >
                  <div className="aspect-[3/4] bg-[#EEE5DF] overflow-hidden mb-2">
                    <img
                      src={curatedEnsemble.bag.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('/src/assets/images/')) {
                          target.src = target.src.replace('/src/assets/images/', '/images/');
                        }
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] text-[#B69A70] font-semibold uppercase block">
                    Artisanal Bag
                  </span>
                  <h4 className="font-serif text-xs font-semibold text-[#171513] line-clamp-1">
                    {curatedEnsemble.bag.title}
                  </h4>
                  <span className="font-mono text-xs font-bold text-[#171513] mt-1 block">
                    {formatPKR(curatedEnsemble.bag.price)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleAddEnsembleToBag}
                  className="w-full sm:flex-1 py-3.5 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B69A70]" />
                  <span>Add Entire 4-Piece Look to Bag ({formatPKR(ensembleTotalPrice)})</span>
                </button>

                <button
                  onClick={() => {
                    setIsStylistOpen(false);
                    navigateTo('collection', { department: 'all' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#171513]/20 hover:border-[#171513] text-[#171513] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Explore More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
