import { Product, Review } from '../types';

export const BUSINESS_INFO = {
  brand: 'VEYORA',
  tagline: 'Fashion • Style • You',
  location: 'Karachi, Pakistan',
  phone: '03494968548',
  phoneFormatted: '+92 349 4968548',
  whatsappUrl: 'https://wa.me/923494968548',
  email: 'mluqmanetsy@gmail.com',
  social: {
    tiktok: 'https://www.tiktok.com/@veyoraofficiall?_r=1&_t=ZS-9BECnwk2wt8',
    instagram: 'https://www.instagram.com/veyoraofficiall?exln=MWRmMjZiazlyZGQ1aQ==',
    facebook: 'https://www.facebook.com/share/1BDBozakNL/'
  }
};

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Zainab Bilgrami',
    city: 'Karachi (Clifton)',
    rating: 5,
    date: '3 days ago',
    verified: true,
    fitFeedback: 'True to size — pristine cut',
    comment: 'The zardozi hand embroidery and pure raw silk finish are completely unmatched. Delivered within 24 hours to Clifton, Karachi via Cash on Delivery. VEYORA has set a high standard for Pakistani luxury.'
  },
  {
    id: 'rev-2',
    author: 'Aiman Jahangir',
    city: 'Lahore (Gulberg)',
    rating: 5,
    date: '1 week ago',
    verified: true,
    fitFeedback: 'True to size',
    comment: 'The raw silk has a deep, heavy luster and the champagne gold detailing is subtle and royal. The packaging was immaculate with cedarwood scenting.'
  },
  {
    id: 'rev-3',
    author: 'Dr. Mahnoor Tariq',
    city: 'Islamabad (F-8)',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    fitFeedback: 'True to size',
    comment: 'The cushioned sole on the khussas is a lifesaver for weddings, zero heel bite! Extremely responsive WhatsApp team on 03494968548.'
  },
  {
    id: 'rev-4',
    author: 'Hira Shah',
    city: 'Karachi (DHA Phase 6)',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    fitFeedback: 'True to size',
    comment: 'Authentic pure micro-velvet, not polyester. The inner silk lining ensures complete comfort through long celebration evenings.'
  }
];

export const PRODUCTS: Product[] = [
  // 1. WOMEN'S CLOTHING
  {
    id: 'veyora-cl-01',
    title: 'Zehra — Embroidered Raw Silk Festive Kurta Set',
    department: 'clothing',
    category: 'Luxury Pret',
    price: 28500,
    originalPrice: 34000,
    rating: 4.9,
    reviewCount: 38,
    images: [
      '/src/assets/images/hero_luxury_couture_1794123004357.jpg',
      '/src/assets/images/cotton_pret_editorial_1794123005836.jpg'
    ],
    colors: [
      { name: 'Ivory Gold', hex: '#F6F2EC' },
      { name: 'Champagne Beige', hex: '#B69A70' },
      { name: 'Onyx Black', hex: '#171513' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: '100% Pure 80g Rawsilk with Pure Silk Organza Dupatta',
    description: 'A masterpiece of classic South Asian couture. Crafted from hand-spun pure raw silk in an architectural ivory tone, adorned with hand-laid tilla, marori, zardozi and delicate antique gold gota work along the neckline, sleeves and hemline. Paired with tailored cigarette trousers and an ethereal organza dupatta scalloped with kiran borders.',
    features: [
      'Pure 80g Mulberry Raw Silk Shirt',
      'Intricate antique gold hand zardozi & gota embellishments',
      'Finished with hand-rolled silk organza dupatta with kiran trim',
      'Pure silk cigarette trousers with embroidered slits',
      'Full inner lining in breathable pure lawn silk'
    ],
    careInstructions: [
      'Strictly Dry Clean Only',
      'Store in provided breathable muslin garment bag',
      'Do not bleach or tumble dry',
      'Iron on reverse with low steam'
    ],
    inStock: true,
    stockCount: 4,
    isNewArrival: true,
    isBestseller: true,
    isFestive: true,
    isTrending: true,
    matchingProductIds: ['veyora-ft-01', 'veyora-bg-01', 'veyora-jw-01'],
    stitchingAvailable: true,
    stitchingPrice: 4500
  },
  {
    id: 'veyora-cl-02',
    title: 'Noor-e-Jehan — Burgundy Velvet Formal Gharara Set',
    department: 'clothing',
    category: 'Eastern Wear',
    price: 42500,
    originalPrice: 48000,
    rating: 5.0,
    reviewCount: 42,
    images: [
      '/src/assets/images/festive_velvet_collection_1794123003980.jpg',
      '/src/assets/images/hero_luxury_couture_1794123004357.jpg'
    ],
    colors: [
      { name: 'Deep Burgundy & Gold', hex: '#641D32' },
      { name: 'Midnight Emerald', hex: '#1E3A2F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Micro 9000 Silk Velvet with Heavy Antique Dabka & Zardozi Handwork',
    description: 'An opulent modest festive formal ensemble in royal burgundy velvet. Featuring full modest sleeves with dense floral embroidery, flared gharara trousers, and a generous 2.75m pure crinkle chiffon dupatta with heavy zardozi border.',
    features: [
      'Heavy Italian micro-9000 velvet suited for winter weddings',
      'Generational zardozi and antique gold tilla needlework',
      'Flared formal gharara with embroidered hemline',
      '2.75m pure crinkle chiffon dupatta with kiran finish'
    ],
    careInstructions: ['Specialist Couture Dry Clean Only', 'Steam from reverse only'],
    inStock: true,
    stockCount: 5,
    isNewArrival: true,
    isBestseller: true,
    isFestive: true,
    isTrending: true,
    matchingProductIds: ['veyora-ft-02', 'veyora-bg-02', 'veyora-jw-02'],
    stitchingAvailable: true,
    stitchingPrice: 5000
  },
  {
    id: 'veyora-cl-03',
    title: 'Subah — Blush Pink Pure Cotton Lawn Pret',
    department: 'clothing',
    category: 'Kurtas',
    price: 16500,
    originalPrice: 19500,
    rating: 4.8,
    reviewCount: 52,
    images: [
      '/src/assets/images/cotton_pret_editorial_1794123005836.jpg',
      '/src/assets/images/hero_luxury_couture_1794123004357.jpg'
    ],
    colors: [
      { name: 'Soft Blush', hex: '#EEE5DF' },
      { name: 'Ivory Cream', hex: '#F6F2EC' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: '100% Pima Cotton Lawn with Monofilament Cotton Resham',
    description: 'Effortless summer daytime opulence. Tailored in high-thread-count Egyptian pima lawn, featuring delicate tone-on-tone ivory chikankari and floral resham jaal with laser-cut lace inserts. Accompanied by relaxed palazzo trousers and a lightweight pure silk dupatta.',
    features: [
      'High-twist breathable 120s Egyptian cotton lawn',
      'All-over ivory shadow embroidery and laser schiffli lace',
      'Pure silk printed digital floral dupatta',
      'Cropped wide-leg trousers with embroidered hems',
      'Mother of pearl buttons on placket'
    ],
    careInstructions: [
      'Hand Wash in Cold Water with Mild Detergent or Gentle Machine Cycle',
      'Do not soak in direct sunlight',
      'Warm iron'
    ],
    inStock: true,
    stockCount: 12,
    isNewArrival: true,
    isBestseller: true,
    isFestive: false,
    isTrending: false,
    matchingProductIds: ['veyora-ft-01', 'veyora-bg-01', 'veyora-jw-02'],
    stitchingAvailable: false
  },
  {
    id: 'veyora-cl-04',
    title: 'Anam — Draped Pleated Chiffon & Silk Maxi Dress',
    department: 'clothing',
    category: 'Dresses',
    price: 21500,
    originalPrice: 25000,
    rating: 4.9,
    reviewCount: 31,
    images: [
      '/src/assets/images/maternity_clothing_dress_1794124336619.jpg',
      '/src/assets/images/cotton_pret_editorial_1794123005836.jpg'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#F6F2EC' },
      { name: 'Champagne Beige', hex: '#B69A70' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Fine Accordion Pleated Georgette Silk with Pure Crepe Slip',
    description: 'An architectural Western luxury silhouette tailored for high-profile gallery openings and contemporary dawats. Features an expanding accordion-pleated bodice, fluid asymmetrical hemline, and delicate buttoned cuffs.',
    features: [
      'Precision heat-set micro accordion pleats',
      'Full breathable pure crepe lining',
      'Concealed invisible zip closure',
      'Fluid movement tailored for evening wear'
    ],
    careInstructions: ['Specialist dry clean only', 'Do not iron pleats directly'],
    inStock: true,
    stockCount: 7,
    isNewArrival: true,
    isBestseller: false,
    isFestive: false,
    isTrending: true,
    matchingProductIds: ['veyora-ft-02', 'veyora-bg-02', 'veyora-ac-01']
  },
  {
    id: 'veyora-cl-05',
    title: 'Kohsar — 3-Piece Unstitched Embroidered Raw Silk Heirloom',
    department: 'clothing',
    category: 'Unstitched',
    price: 26000,
    originalPrice: 31000,
    rating: 4.9,
    reviewCount: 29,
    images: [
      '/src/assets/images/hero_luxury_couture_1794123004357.jpg',
      '/src/assets/images/cotton_pret_editorial_1794123005836.jpg'
    ],
    colors: [
      { name: 'Onyx Black & Gold', hex: '#171513' },
      { name: 'Ivory Gold', hex: '#F6F2EC' }
    ],
    sizes: ['Unstitched (3-Piece Complete Fabric)'],
    fabric: '100% Pure 80g Raw Silk Shirt (3.25m), Raw Silk Trousers (2.5m), Organza Jacquard Dupatta (2.75m)',
    description: 'Pure heirloom luxury for women who prefer bespoke tailor-fit perfection. Includes generous yardage of embroidered raw silk front, back, sleeves, embroidered organza hem borders, and a magnificent organza jacquard dupatta.',
    features: [
      'Embroidered Raw Silk Front with Marori & Zardozi Neckline (1.25m)',
      'Plain Raw Silk Back and Sleeves with Embroidered Organza Cuffs (2.0m)',
      'Pure Silk Organza Jacquard Dupatta with 4-side Kiran Edging (2.75m)',
      'Pure Raw Silk Trousers with Embroidered Organza Borders (2.5m)'
    ],
    careInstructions: ['Dry Clean Only', 'Store in breathable garment bag'],
    inStock: true,
    stockCount: 10,
    isNewArrival: true,
    isBestseller: true,
    isFestive: true,
    isTrending: true,
    matchingProductIds: ['veyora-ft-01', 'veyora-jw-01', 'veyora-bg-01'],
    stitchingAvailable: true,
    stitchingPrice: 4500
  },
  {
    id: 'veyora-cl-06',
    title: 'Elysian — Tailored Pure Silk Button-Down Shirt & Fluid Top',
    department: 'clothing',
    category: 'Shirts',
    price: 13500,
    rating: 4.8,
    reviewCount: 19,
    images: [
      '/src/assets/images/cotton_pret_editorial_1794123005836.jpg'
    ],
    colors: [
      { name: 'Ivory Pearl', hex: '#F6F2EC' },
      { name: 'Midnight Onyx', hex: '#171513' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: '100% Pure Habotai Silk with Mother of Pearl Hardware',
    description: 'A contemporary luxury staple. Tailored from lustrous lightweight Habotai silk, featuring a relaxed French cuff, concealed placket, and hand-carved natural mother-of-pearl buttons. Effortlessly pairs with tailored trousers or ethnic palazzos.',
    features: [
      'Pure 16mm Habotai silk with luminous matte sheen',
      'Tailored collar with subtle topstitch detailing',
      'Genuine Australian mother-of-pearl buttons'
    ],
    careInstructions: ['Dry clean or gentle silk hand wash in cold water', 'Steam on low setting'],
    inStock: true,
    stockCount: 14,
    isNewArrival: false,
    isBestseller: true,
    isFestive: false,
    isTrending: false,
    matchingProductIds: ['veyora-ac-01', 'veyora-bg-01']
  },
  {
    id: 'veyora-cl-07',
    title: 'Riva — High-Waisted Silk Crepe Cigarette Trousers',
    department: 'clothing',
    category: 'Trousers',
    price: 8500,
    rating: 4.9,
    reviewCount: 37,
    images: [
      '/src/assets/images/accessories_scarf_belt_1794124334662.jpg'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#171513' },
      { name: 'Soft Ivory', hex: '#F6F2EC' },
      { name: 'Champagne Beige', hex: '#B69A70' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Heavy Silk Crepe with Two-Way Stretch Spandex',
    description: 'Precision-tailored high-waisted cigarette pants engineered to provide an elongating silhouette beneath long kurtas, tunics, or contemporary western silk shirts. Designed with clean side zip and ankle split hems.',
    features: [
      'High-waisted contour waistband that holds shape all day',
      'Discreet side zip with hook-and-eye closure',
      'Side ankle slits with reinforced bar tacking'
    ],
    careInstructions: ['Dry clean recommended or gentle cold wash', 'Medium iron on reverse'],
    inStock: true,
    stockCount: 20,
    isNewArrival: false,
    isBestseller: true,
    isFestive: false,
    isTrending: false,
    matchingProductIds: ['veyora-ft-01', 'veyora-bg-01']
  },

  // 2. FOOTWEAR (Shoe product photography)
  {
    id: 'veyora-ft-01',
    title: 'Zarrin — Champagne Gold Embellished Khussa & Velvet Block Heel',
    department: 'footwear',
    category: 'Zardozi Khussas',
    price: 8500,
    originalPrice: 10500,
    rating: 4.9,
    reviewCount: 44,
    images: [
      '/src/assets/images/footwear_luxury_shoes_1794124332098.jpg'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#B69A70' },
      { name: 'Burgundy Velvet', hex: '#641D32' }
    ],
    sizes: ['36 (PK 6)', '37 (PK 7)', '38 (PK 8)', '39 (PK 9)', '40 (PK 10)', '41 (PK 11)'],
    fabric: 'Hand-dyed Pure Silk with Genuine Vegetable-Tanned Cow Leather Sole',
    description: 'Handcrafted luxury women footwear pairing authentic zardozi hand-embroidered leather khussa with a velvet block-heel ankle strap sandal. Built with double-cushioned memory foam insoles for pain-free wear through long festive evenings.',
    features: [
      '100% Genuine soft leather sole & lining',
      'Double memory-foam anti-bite cushioning',
      'Authentic zardozi and cutdana hand-embellishment',
      'Snug fit that gently moulds to the foot contour within hours'
    ],
    careInstructions: ['Wipe clean with a dry soft cloth', 'Store in dry place away from moisture'],
    inStock: true,
    stockCount: 9,
    isNewArrival: true,
    isBestseller: true,
    isFestive: true
  },
  {
    id: 'veyora-ft-02',
    title: 'Shahzadi — Handcrafted Formal Velvet Ankle-Strap Block Heels',
    department: 'footwear',
    category: 'Formal Block Heels',
    price: 11500,
    rating: 4.8,
    reviewCount: 22,
    images: [
      '/src/assets/images/footwear_luxury_shoes_1794124332098.jpg'
    ],
    colors: [
      { name: 'Deep Burgundy', hex: '#641D32' },
      { name: 'Champagne Gold', hex: '#B69A70' }
    ],
    sizes: ['36 (PK 6)', '37 (PK 7)', '38 (PK 8)', '39 (PK 9)', '40 (PK 10)'],
    fabric: 'Plush Silk Velvet & Leather Sole',
    description: 'A refined silhouette designed for weddings and black-tie dawats. Features rich burgundy Italian velvet, a sturdy 5cm architectural block heel, padded arch support, and gold buckle hardware.',
    features: [
      '5cm architectural block heel for effortless balance',
      'Padded arch support with leather lining',
      'Hand-worked gold bullion embroidery'
    ],
    careInstructions: ['Brush gently with soft bristle brush', 'Keep away from water'],
    inStock: true,
    stockCount: 5,
    isNewArrival: false,
    isBestseller: true,
    isFestive: true
  },

  // 3. BAGS (Handbag & Clutch product photography)
  {
    id: 'veyora-bg-01',
    title: 'The Haven — Structured Calfskin Tote & Gold Evening Clutch Set',
    department: 'bags',
    category: 'Structured Leather Totes',
    price: 24500,
    originalPrice: 28000,
    rating: 4.9,
    reviewCount: 31,
    images: [
      '/src/assets/images/bags_luxury_handbag_1794124332642.jpg'
    ],
    colors: [
      { name: 'Warm Camel & Gold', hex: '#B69A70' },
      { name: 'Rich Black', hex: '#171513' }
    ],
    sizes: ['Standard Large (14" x 11" x 5")'],
    fabric: 'Full Grain Italian Calf Leather with Suede Lining & Metallic Evening Minaudière',
    description: 'Product photography of our signature structured top-handle leather tote accompanied by a lustrous gold metallic evening clutch with pearl clasp closure. Crafted for both boardroom elegance and evening festive events.',
    features: [
      'Full grain textured calf leather resistant to scratches',
      'Padded compartment accommodating 13"-14" laptops and diaries',
      'Detachable adjustable shoulder strap with gold hardware',
      'Includes metallic gold evening minaudière clutch with pearl clasp'
    ],
    careInstructions: ['Condition with specialized leather balm annually', 'Store in cotton dust bag'],
    inStock: true,
    stockCount: 8,
    isNewArrival: true,
    isBestseller: true,
    isFestive: false
  },
  {
    id: 'veyora-bg-02',
    title: 'Gulrukh — Champagne Gold Minaudière Evening Clutch',
    department: 'bags',
    category: 'Gold Clutches & Minaudières',
    price: 12500,
    rating: 4.8,
    reviewCount: 26,
    images: [
      '/src/assets/images/bags_luxury_handbag_1794124332642.jpg'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#B69A70' }
    ],
    sizes: ['Compact Evening (7.5" x 4.5" x 2")'],
    fabric: 'Textured Metallic Brass Alloy with Satin Lining and Pearl Top Clasp',
    description: 'An architectural evening minaudière clutch in a champagne shimmer finish with an ornate freshwater pearl and crystal clasp. Designed to hold smartphones, cards, and festive touch-up essentials.',
    features: [
      'Fits standard smartphones with ease',
      'Concealed fold-away gold chain shoulder strap',
      'Lustrous champagne metallic texture with pearl lock'
    ],
    careInstructions: ['Wipe with dry microfiber cloth', 'Keep away from alcohol sprays'],
    inStock: true,
    stockCount: 6,
    isNewArrival: false,
    isBestseller: true,
    isFestive: true
  },

  // 4. JEWELLERY (Jewellery product photography)
  {
    id: 'veyora-jw-01',
    title: 'Shehnai — 22K Gold Dipped Polki & Emerald Choker with Jhumkas',
    department: 'jewellery',
    category: 'Polki Chokers',
    price: 36500,
    originalPrice: 42000,
    rating: 5.0,
    reviewCount: 27,
    images: [
      '/src/assets/images/luxury_jewellery_accessories_1794123005854.jpg'
    ],
    colors: [
      { name: 'Emerald & Gold', hex: '#1E3A2F' },
      { name: 'Ruby & Gold', hex: '#641D32' }
    ],
    sizes: ['Adjustable Dori (Fits all neck sizes)'],
    fabric: '22K Gold Plated Brass, Uncut Polki Crystals, Colombian Emerald simulants, Freshwater Seed Pearls',
    description: 'A crown jewel for festive and wedding seasons. Crafted by generational karigars. Features handset uncut polki stones framed by emerald cabochons and cascades of micro-pearl jhumkian along the lower rim. Accompanied by matching heavy statement earrings.',
    features: [
      'Includes matching statement jhumkas and adjustable choker necklace',
      'Triple-layer 22K gold micro-micron plating for lasting heirloom brilliance',
      'Hand-woven gold zari dori with bead adjuster',
      'Hypoallergenic lead and nickel-free alloy'
    ],
    careInstructions: [
      'Store in provided velvet air-tight jewellery chest',
      'Always wear after spraying perfume and hair mist',
      'Wipe with clean dry cotton cloth after wearing'
    ],
    inStock: true,
    stockCount: 3,
    isNewArrival: true,
    isBestseller: true,
    isFestive: true
  },
  {
    id: 'veyora-jw-02',
    title: 'Sitara — Handcrafted Kundan & Pearl Jhumka Earrings',
    department: 'jewellery',
    category: 'Kundan Jhumkas & Chandbalis',
    price: 14500,
    rating: 4.9,
    reviewCount: 39,
    images: [
      '/src/assets/images/luxury_jewellery_accessories_1794123005854.jpg'
    ],
    colors: [
      { name: 'Antique Gold & Pearl', hex: '#B69A70' }
    ],
    sizes: ['Standard (7.5cm drop)'],
    fabric: '22K Gold Dipped Silver Alloy with Hydro Polki & Natural Pearls',
    description: 'Timeless heirloom jhumkas adorned with intricate kundan setting, emerald highlights, and cascading champagne seed pearls. Weight-balanced to ensure full festive wearability without dragging.',
    features: [
      'Weight-balanced hollow back setting to prevent earlobe drag',
      'Intricate meenakari enamel artwork on reverse',
      'Secure push-back closure with silicone support disc'
    ],
    careInstructions: ['Avoid moisture and direct chemicals', 'Store flat in dry box'],
    inStock: true,
    stockCount: 7,
    isNewArrival: false,
    isBestseller: true,
    isFestive: true
  },

  // 5. ACCESSORIES (Scarves, belts, sunglasses, watches flat lay)
  {
    id: 'veyora-ac-01',
    title: 'L’Essence — Silk Scarf, Italian Leather Belt & Gold Timepiece Set',
    department: 'accessories',
    category: 'Pure Silk Scarves',
    price: 18500,
    originalPrice: 21000,
    rating: 4.9,
    reviewCount: 20,
    images: [
      '/src/assets/images/accessories_scarf_belt_1794124334662.jpg'
    ],
    colors: [
      { name: 'Cognac Leather & Navy Silk', hex: '#B69A70' },
      { name: 'Onyx Leather & Gold', hex: '#171513' }
    ],
    sizes: ['One Size (Belt 30"-38" Adjustable)'],
    fabric: '100% Mulberry Silk, Italian Full-Grain Vachetta Leather, Japanese Quartz Movement',
    description: 'An executive suite of luxury everyday accents. Features a hand-rolled printed pure silk twill scarf in heritage paisley motifs, a slender Italian leather belt with a solid brass horseshoe buckle, tortoiseshell UV-400 sunglasses, and an ultra-thin champagne gold mesh watch.',
    features: [
      'Pure mulberry silk scarf with hand-rolled borders (90cm x 90cm)',
      'Italian vegetable-tanned leather belt with gold brass buckle',
      'Designer tortoiseshell sunglasses with polarized UV-400 lenses',
      'Minimalist mesh gold watch with scratch-resistant sapphire crystal'
    ],
    careInstructions: ['Dry clean silk scarf', 'Clean leather with soft cloth'],
    inStock: true,
    stockCount: 6,
    isNewArrival: true,
    isBestseller: false,
    isFestive: false
  },

  // 6. INNERWEAR (Tasteful flat lay product photography)
  {
    id: 'veyora-in-01',
    title: 'Silk Touch — Seamless Microfiber Wireless Bra & Brief Set',
    department: 'innerwear',
    category: 'Seamless Microfiber Bras',
    price: 5500,
    rating: 4.8,
    reviewCount: 65,
    images: [
      '/src/assets/images/innerwear_flatlay_lingerie_1794124333700.jpg'
    ],
    colors: [
      { name: 'Natural Nude', hex: '#EEE5DF' },
      { name: 'Rich Black', hex: '#171513' },
      { name: 'Warm Ivory', hex: '#F6F2EC' }
    ],
    sizes: ['32B', '34B', '34C', '36B', '36C', '38C', '38D'],
    fabric: 'Ultra-Fine Seamless Bonded Microfiber with Breathable Bamboo Cotton Gusset',
    description: 'Tasteful product flat lay of our invisible wireless contour bra and bonded low-rise briefs. Specially engineered to remain completely invisible under translucent fine Pakistani lawn, chikan kurtas, and pure silks.',
    features: [
      'Wireless ergonomic lift with zero pressure points or side bulge',
      'No-show laser bonded edges invisible under sheer kurtas and festive formals',
      'Four-way stretch moisture-wicking weave suited for Pakistani climate'
    ],
    careInstructions: ['Gentle hand wash in cold water', 'Air dry in shade'],
    inStock: true,
    stockCount: 18,
    isNewArrival: false,
    isBestseller: true,
    isFestive: false
  },

  // 7. NIGHTWEAR & LOUNGEWEAR (Pajama set on bed product photography)
  {
    id: 'veyora-nw-01',
    title: 'Palais — Pure Mulberry Silk Pajama & Robe Lounge Set',
    department: 'nightwear-loungewear',
    category: 'Silk Pajama Sets',
    price: 18500,
    originalPrice: 22000,
    rating: 4.9,
    reviewCount: 34,
    images: [
      '/src/assets/images/nightwear_silk_pajamas_1794124335323.jpg'
    ],
    colors: [
      { name: 'Champagne Silk', hex: '#EEE5DF' },
      { name: 'Midnight Onyx', hex: '#171513' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: '100% 22-Momme Grade-6A Pure Mulberry Silk',
    description: 'Folded product photography of our pure mulberry silk pajama set and matching belted lounge robe. Features mother-of-pearl buttons, piped notched lapels, and an elasticated drawstring waistband.',
    features: [
      '22-Momme high-density pure silk promoting hair & skin hydration',
      'French seam finishing with contrast piped trims',
      'Relaxed tailored fit with deep side pockets'
    ],
    careInstructions: ['Dry clean or delicate cold hand wash with silk wash', 'Steam gently on reverse'],
    inStock: true,
    stockCount: 8,
    isNewArrival: true,
    isBestseller: true,
    isFestive: false
  },

  // 8. MODEST FASHION (Abayas & Modest Formals)
  {
    id: 'veyora-md-01',
    title: 'Noor-e-Jehan — Burgundy Velvet Modest Formal & Abaya Set',
    department: 'modest-fashion',
    category: 'Embroidered Abayas',
    price: 42500,
    originalPrice: 48000,
    rating: 5.0,
    reviewCount: 42,
    images: [
      '/src/assets/images/festive_velvet_collection_1794123003980.jpg'
    ],
    colors: [
      { name: 'Deep Burgundy & Gold', hex: '#641D32' },
      { name: 'Midnight Emerald', hex: '#1E3A2F' }
    ],
    sizes: ['52 (Petite)', '54 (Regular)', '56 (Medium Tall)', '58 (Tall)'],
    fabric: 'Micro 9000 Silk Velvet with Heavy Antique Dabka & Zardozi Handwork',
    description: 'An opulent modest formal ensemble in royal burgundy velvet. Featuring full modest sleeves with dense floral embroidery, a flowing modesty silhouette, matching flared gharara trousers, and a generous 2.75m pure chiffon dupatta.',
    features: [
      'Opaque heavy Italian micro-velvet suited for winter festive dawats',
      'Generous length ensuring full modest coverage',
      'Generational zardozi hand embroidery along neck and borders'
    ],
    careInstructions: ['Specialist Couture Dry Clean Only', 'Steam from inside only'],
    inStock: true,
    stockCount: 5,
    isNewArrival: true,
    isBestseller: true,
    isFestive: true
  },

  // 9. SPORTSWEAR (Activewear product flat lay)
  {
    id: 'veyora-sp-01',
    title: 'AeroGrace — Burgundy Athletic Activewear Tights, Bra & Jacket Set',
    department: 'sportswear',
    category: 'Active Modest Tunics',
    price: 9500,
    rating: 4.7,
    reviewCount: 28,
    images: [
      '/src/assets/images/sportswear_activewear_1794124334938.jpg'
    ],
    colors: [
      { name: 'Burgundy & Charcoal', hex: '#641D32' },
      { name: 'Slate Onyx', hex: '#171513' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Four-Way Stretch Quick-Dry Micro-Knit with UPF 50+ Protection',
    description: 'Product flat lay of our 3-piece performance sportswear set: high-waisted squat-proof compression tights with wide waistband, medium-to-high support racerback sports bra, and an athletic thumbhole zip track jacket.',
    features: [
      'Four-way stretch sweat-wicking knit with antimicrobial treatment',
      'High-waisted compression tights with secure phone pocket',
      'Contoured thumbhole athletic jacket with chin guard'
    ],
    careInstructions: ['Machine wash cold inside out', 'Do not use fabric softener'],
    inStock: true,
    stockCount: 15,
    isNewArrival: true,
    isBestseller: false,
    isFestive: false
  },

  // 10. MATERNITY (Maternity dress mannequin product photography)
  {
    id: 'veyora-mt-01',
    title: 'Mariam — Pleated Silk & Chiffon Two-Tone Maternity Formal Dress',
    department: 'maternity',
    category: 'Maternity Dresses & Tunics',
    price: 15500,
    rating: 4.9,
    reviewCount: 23,
    images: [
      '/src/assets/images/maternity_clothing_dress_1794124336619.jpg'
    ],
    colors: [
      { name: 'Ivory & Royal Midnight', hex: '#F6F2EC' },
      { name: 'Soft Blush & Gold', hex: '#EEE5DF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pleated Accordion Georgette Silk with Stretch Bamboo Lining',
    description: 'Product photography on dressmaker form showing our pleated empire-waist maternity dress. Crafted with an expanding accordion pleated bodice that gracefully accommodates all trimesters, concealed invisible nursing zippers, and an asymmetrical flowing tiered skirt.',
    features: [
      'Expanding accordion pleats offering gentle room through all 9 months',
      'Concealed invisible vertical nursing zippers for postpartum ease',
      'Breathable natural bamboo lining preventing overheating'
    ],
    careInstructions: ['Dry Clean or Gentle Cold Hand Wash', 'Drip dry in shade'],
    inStock: true,
    stockCount: 7,
    isNewArrival: true,
    isBestseller: true,
    isFestive: false
  },

  // 11. SOCKS & HOSIERY (Hosiery product photography)
  {
    id: 'veyora-sk-01',
    title: 'Seta — 15 Denier Italian Sheer Tights & Mercerized Cotton Socks Pack',
    department: 'socks-hosiery',
    category: 'Luxury Sheer Tights',
    price: 3200,
    rating: 4.8,
    reviewCount: 57,
    images: [
      '/src/assets/images/socks_hosiery_tights_1794124336651.jpg'
    ],
    colors: [
      { name: 'Natural Nude & White', hex: '#EEE5DF' },
      { name: 'Smoky Black', hex: '#171513' }
    ],
    sizes: ['S/M', 'L/XL'],
    fabric: '15-Denier Lycra 3D with Italian Polyamide & 100% Egyptian Mercerized Cotton',
    description: 'Commercial product photography of our luxury sheer 15-denier Italian tights presented in luxury bespoke packaging, paired with three pairs of folded mercerized cotton ribbed ankle socks.',
    features: [
      'Ladder-resistant 3D double covered yarn with reinforced invisible toe',
      'Comfort waistband that will not roll, pinch, or mark under festive silks',
      'Mercerized Egyptian cotton ankle socks with hand-linked seamless toes'
    ],
    careInstructions: ['Hand wash in lukewarm water', 'Drip dry in shade'],
    inStock: true,
    stockCount: 25,
    isNewArrival: false,
    isBestseller: false,
    isFestive: false
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'VY-9241',
    date: '2026-11-04',
    customerName: 'Ayesha Khan',
    phone: '03494968548',
    city: 'Karachi',
    address: 'Clifton, Karachi, Pakistan',
    items: [
      {
        id: 'veyora-cl-01-M-Ivory Gold-stitched',
        productId: 'veyora-cl-01',
        title: 'Zehra — Embroidered Raw Silk Festive Kurta Set',
        price: 28500,
        image: '/src/assets/images/hero_luxury_couture_1794123004357.jpg',
        size: 'M',
        color: 'Ivory Gold',
        isStitched: true,
        stitchingPrice: 4500,
        quantity: 1
      }
    ],
    subtotal: 33000,
    shipping: 0,
    total: 33000,
    paymentMethod: 'Cash on Delivery (COD)' as const,
    status: 'Out for Delivery' as const,
    courier: 'TCS Express Pakistan',
    trackingNumber: 'TCS-88392104PK',
    estimatedDelivery: 'Arriving Today by 5:00 PM'
  },
  {
    id: 'VY-8109',
    date: '2026-10-22',
    customerName: 'Ayesha Khan',
    phone: '03494968548',
    city: 'Karachi',
    address: 'Clifton, Karachi, Pakistan',
    items: [
      {
        id: 'veyora-ft-01-38-Champagne Gold',
        productId: 'veyora-ft-01',
        title: 'Zarrin — Champagne Gold Embellished Khussa & Velvet Block Heel',
        price: 8500,
        image: '/src/assets/images/footwear_luxury_shoes_1794124332098.jpg',
        size: '38 (PK 8)',
        color: 'Champagne Gold',
        quantity: 1
      }
    ],
    subtotal: 8500,
    shipping: 0,
    total: 8500,
    paymentMethod: 'Cash on Delivery (COD)' as const,
    status: 'Delivered' as const,
    courier: 'Leopard Courier Express',
    trackingNumber: 'LEO-4491023',
    estimatedDelivery: 'Delivered on Oct 25, 2026'
  }
];

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Sukkur',
  'Mardan',
  'Gujrat',
  'Wah Cantt',
  'Mirpur (AJK)',
  'Muzaffarabad (AJK)',
  'Gilgit'
];

export const PAKISTAN_PROVINCES = [
  'Sindh',
  'Punjab',
  'Islamabad Capital Territory',
  'Khyber Pakhtunkhwa (KPK)',
  'Balochistan',
  'Azad Jammu & Kashmir (AJK)',
  'Gilgit-Baltistan'
];
