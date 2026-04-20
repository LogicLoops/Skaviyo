// Single source of truth for all Skaviyo products
// Used by ProductDetailPage, TrendingProducts, FeaturedProducts, VintageCollection, CartPage

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
  fabricCare: string;
  shipping: string;
  returns: string;
  features: string[];
  relatedProducts: Product[];
  badge?: 'bestseller' | 'limited' | 'new' | 'featured';
  category?: string;
}

// ─── Base product definitions (relatedProducts added below) ───────────────────

const classicWhite: Product = {
  id: 'classic-white',
  name: 'The Signature White',
  price: 4500,
  rating: 4.8,
  reviews: 156,
  description:
    'The perfect classic white tee. Premium cotton blend for ultimate comfort. This timeless piece is a wardrobe staple that works with everything — from joggers to formal trousers.',
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
  ],
  colors: ['white', 'black', 'navy'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Tumble dry low | Do not bleach',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: [
    'Premium pre-shrunk cotton',
    'Skaviyo signature collar stitching',
    'Anti-fade colour technology',
  ],
  relatedProducts: [],
  badge: 'bestseller',
  category: 'men',
};

const emeraldTee: Product = {
  id: 'emerald-tee',
  name: 'Royal Emerald Tee',
  price: 3999,
  rating: 4.7,
  reviews: 142,
  description:
    'Deep, rich emerald green that complements every skin tone. Made from our premium sustainable cotton blend for all-day comfort with a sophisticated edge.',
  images: [
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
  ],
  colors: ['emerald', 'teal'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Sustainable Cotton | Machine wash cold | Tumble dry low | Do not bleach',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: [
    'Eco-certified sustainable fabric',
    'Colour-fastness tested for 50+ washes',
    'Relaxed fit for all-day wear',
  ],
  relatedProducts: [],
  badge: 'featured',
  category: 'men',
};

const bluePrint: Product = {
  id: 'blue-print',
  name: 'Royal Blue Print',
  price: 4299,
  rating: 4.6,
  reviews: 128,
  description:
    'Stunning royal blue with subtle print detailing. A versatile piece that transitions seamlessly from casual daywear to semi-formal occasions.',
  images: [
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
  ],
  colors: ['blue', 'navy', 'white'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Tumble dry low | Do not bleach',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: [
    'Limited print run — exclusive design',
    'Double-needle hem for durability',
    'Preshrunk to maintain size after wash',
  ],
  relatedProducts: [],
  badge: 'limited',
  category: 'men',
};

const weekenderPack: Product = {
  id: 'the-weekender-pack',
  name: 'The Weekender Pack',
  price: 12000,
  originalPrice: 15000,
  rating: 4.5,
  reviews: 128,
  description:
    'Experience an elevated wardrobe for any getaway. Includes the Signature White, Royal Emerald Tee, and the Limited Royal Blue Print. Perfect for weekend trips, vacations, or everyday essentials.',
  images: [
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
  ],
  colors: ['white', 'emerald', 'blue'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton Blend | Machine wash cold | Tumble dry low | Do not bleach',
  shipping: '5–7 business days | Free shipping on this bundle | Priority dispatch',
  returns: '7-day easy returns | Full bundle or individual pieces | Free returns',
  features: [
    'Save ₹3,000 vs buying individually',
    'Premium gift box packaging included',
    'Matching travel pouch included',
  ],
  relatedProducts: [],
  badge: 'featured',
  category: 'men',
};

const signaturePremium: Product = {
  id: 'signature-premium',
  name: 'Signature Premium White',
  price: 5499,
  originalPrice: 6999,
  rating: 4.9,
  reviews: 203,
  description:
    'Our most premium offering. Crafted from the finest Egyptian cotton with meticulous attention to detail. This is the ultimate luxury tee — unmatched softness, superior drape, exceptional finish.',
  images: [
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
  ],
  colors: ['white', 'black'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Egyptian Cotton | Hand wash recommended | Air dry only | Iron on low',
  shipping: '5–7 business days | Free insured shipping | Priority dispatch',
  returns: '7-day easy returns | Premium packaging return | Full refund guaranteed',
  features: [
    '200 GSM Egyptian pima cotton',
    'Hand-finished collar and hem',
    'Certified by GOTS organic standard',
  ],
  relatedProducts: [],
  badge: 'bestseller',
  category: 'men',
};

const vintageClassic: Product = {
  id: 'vintage-classic',
  name: 'Vintage Classic',
  price: 3299,
  rating: 4.4,
  reviews: 89,
  description:
    'Inspired by vintage aesthetics with modern comfort. A unique piece with warm cream and earth tones that adds character and nostalgia to any outfit.',
  images: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
  ],
  colors: ['cream', 'brown'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Tumble dry low | Do not iron on print',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: [
    'Heritage washed for authentic vintage feel',
    'Archive-inspired graphic print',
    'Relaxed oversized cut',
  ],
  relatedProducts: [],
  badge: 'new',
  category: 'men',
};

const vintageHeritage: Product = {
  id: 'vintage-heritage',
  name: 'Vintage Heritage',
  price: 3599,
  rating: 4.5,
  reviews: 112,
  description:
    'Heritage-inspired piece with timeless grey and navy tones. Perfect for those who appreciate the elegance of classic fashion reimagined for the modern wardrobe.',
  images: [
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
  ],
  colors: ['grey', 'navy'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Tumble dry low | Do not iron on print',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: [
    'Enzyme-washed for premium softness',
    'Heritage pattern embroidery on chest',
    'Classic regular fit',
  ],
  relatedProducts: [],
  badge: 'new',
  category: 'men',
};

const vintageBlack: Product = {
  id: 'vintage-black',
  name: 'Vintage Black Print',
  price: 4800,
  rating: 4.8,
  reviews: 127,
  description:
    'Bold vintage print on deep black fabric. A statement piece with archive-inspired artwork that tells a story. For those who dress with intention.',
  images: [
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
  ],
  colors: ['black', 'navy'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Wash inside out to preserve print | Do not bleach',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: [
    'Screen-printed archive artwork',
    'Preshrunk 190 GSM fabric',
    'Vintage garment wash finish',
  ],
  relatedProducts: [],
  badge: 'limited',
  category: 'men',
};

const vintageTones: Product = {
  id: 'vintage-tones',
  name: 'The Vintage Tones',
  price: 5299,
  rating: 4.8,
  reviews: 127,
  description:
    'Handpicked warm earth tones inspired by heritage archives. Tan, brown, and cream tones crafted for those who appreciate timeless, understated style.',
  images: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
  ],
  colors: ['brown', 'tan', 'cream'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Tumble dry low | Wash inside out',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: [
    'Herb-dyed natural colour palette',
    'Heritage loomed cotton weave',
    'Relaxed, slightly oversized silhouette',
  ],
  relatedProducts: [],
  badge: 'featured',
  category: 'men',
};

// ─── Women's Collection ───────────────────────────────────────────────────────

const womenBlossom: Product = {
  id: 'women-blossom',
  name: 'Blossom Tee',
  price: 2999,
  rating: 4.7,
  reviews: 98,
  description: 'Soft rose-toned tee crafted for effortless elegance. Lightweight, breathable, and cut to flatter every silhouette — dress it up or keep it casual.',
  images: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
  ],
  colors: ['rose', 'blush', 'white'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  inStock: true,
  fabricCare: '100% Organic Cotton | Machine wash cold | Tumble dry low | Do not bleach',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['Relaxed fit with feminine silhouette', 'GOTS certified organic cotton', 'Soft-touch enzyme wash'],
  relatedProducts: [],
  badge: 'new',
  category: 'women',
};

const womenSummerBreeze: Product = {
  id: 'women-summer-breeze',
  name: 'Summer Breeze Tee',
  price: 3499,
  rating: 4.6,
  reviews: 74,
  description: 'Fresh, airy, and made for sunny days. The Summer Breeze Tee comes in soft sky and mint tones with a relaxed crop fit that keeps you cool and stylish.',
  images: [
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
  ],
  colors: ['sky', 'mint', 'white'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  inStock: true,
  fabricCare: '100% Soft Cotton | Machine wash cold | Air dry recommended',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['Relaxed crop silhouette', 'Pastel colour collection', 'Pre-washed for extra softness'],
  relatedProducts: [],
  badge: 'new',
  category: 'women',
};

const womenPowerClassic: Product = {
  id: 'women-power-classic',
  name: 'Power Classic Tee',
  price: 3799,
  rating: 4.8,
  reviews: 112,
  description: 'Bold, confident, timeless. The Power Classic is for women who own every room they walk into. Available in statement black, crisp white, and rich lavender.',
  images: [
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
  ],
  colors: ['black', 'white', 'lavender'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Tumble dry low',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['Structured semi-fitted cut', 'Reinforced shoulder seams', 'Double-needle hem'],
  relatedProducts: [],
  badge: 'bestseller',
  category: 'women',
};

// ─── Couples Collection ───────────────────────────────────────────────────────

const couplesPerfectMatch: Product = {
  id: 'couples-perfect-match',
  name: 'The Perfect Match Set',
  price: 7999,
  rating: 4.9,
  reviews: 186,
  description: 'Two matching tees, one perfect moment. The Perfect Match Set is designed for couples who want to coordinate without being identical — complementary tones, shared style.',
  images: [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
  ],
  colors: ['white+black', 'navy+white', 'teal+cream'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Tumble dry low',
  shipping: '5–7 business days | Free shipping on this set | Priority dispatch',
  returns: '7-day easy returns | Full set or individual returns accepted',
  features: ['His & Hers sizing in one order', 'Premium gift box included', 'Custom name/date printing available'],
  relatedProducts: [],
  badge: 'bestseller',
  category: 'couples',
};

const couplesLoveTones: Product = {
  id: 'couples-love-tones',
  name: 'Love Tones Duo',
  price: 6499,
  rating: 4.7,
  reviews: 134,
  description: 'Warm, romantic tones for the couple that complements each other. Rose and dusty blue in premium cotton — effortlessly coordinated for every occasion.',
  images: [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
  ],
  colors: ['rose+blue', 'cream+navy', 'blush+grey'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Organic Cotton | Machine wash cold | Air dry recommended',
  shipping: '5–7 business days | Free shipping on this set | Standard delivery',
  returns: '7-day easy returns | Full set or individual returns accepted',
  features: ['Complementary colour pairing', 'Organic certified fabric', 'Subtle embroidered heart detail'],
  relatedProducts: [],
  badge: 'featured',
  category: 'couples',
};

// ─── Group / Team Collection ──────────────────────────────────────────────────

const teamSpiritPack: Product = {
  id: 'team-spirit-pack',
  name: 'Team Spirit 5-Pack',
  price: 17999,
  originalPrice: 22499,
  rating: 4.8,
  reviews: 67,
  description: '5 premium tees, one team identity. Perfect for sports teams, corporate events, bachelor/bachelorette groups, and college squads. Fully customisable with your name or logo.',
  images: [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
  ],
  colors: ['any colour'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Tumble dry low',
  shipping: '7–10 business days for custom orders | Free shipping | Bulk dispatch',
  returns: '7-day easy returns on non-customised orders | Customised orders non-returnable',
  features: ['Save ₹4,500 vs individual pricing', 'Free logo/name printing on each tee', 'Mixed sizes in one order'],
  relatedProducts: [],
  badge: 'featured',
  category: 'group-team',
};

const teamEventSet: Product = {
  id: 'team-event-set',
  name: 'Event Ready Set',
  price: 14999,
  originalPrice: 18999,
  rating: 4.6,
  reviews: 43,
  description: 'Make your event unforgettable. The Event Ready Set includes 4 matching premium tees in your chosen colour, pre-printed with your event theme, name, or slogan.',
  images: [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
  ],
  colors: ['white', 'black', 'navy'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Cotton | Machine wash cold | Tumble dry low',
  shipping: '7–10 business days for custom orders | Free shipping on bulk orders',
  returns: '7-day returns on standard items | Custom-printed items non-returnable',
  features: ['Custom event printing included', 'Premium gift packaging', '4 tees with mixed sizing'],
  relatedProducts: [],
  badge: 'new',
  category: 'group-team',
};

// ─── Sports Collection ────────────────────────────────────────────────────────

const sportPerformance: Product = {
  id: 'sport-performance',
  name: 'Performance Pro Tee',
  price: 3299,
  rating: 4.7,
  reviews: 88,
  description: 'Built for movement, designed for style. The Performance Pro Tee uses moisture-wicking fabric and a four-way stretch to keep you at your best — in the gym, on the field, or on the run.',
  images: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
  ],
  colors: ['black', 'grey', 'navy'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '92% Polyester, 8% Spandex | Machine wash cold | Do not tumble dry | Do not iron',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['4-way stretch fabric', 'Moisture-wicking technology', 'Flatlock seams prevent chafing'],
  relatedProducts: [],
  badge: 'new',
  category: 'sports',
};

const sportDryFit: Product = {
  id: 'sport-dry-fit',
  name: 'Dry-Fit Mesh Tee',
  price: 3799,
  rating: 4.8,
  reviews: 102,
  description: 'Ultra-light mesh construction for maximum breathability. The Dry-Fit Mesh Tee is engineered for high-intensity training while maintaining a clean, athletic silhouette.',
  images: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
  ],
  colors: ['navy', 'black', 'white'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Recycled Polyester | Machine wash cold | Air dry | Do not iron',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['Recycled performance fabric', 'UPF 30+ sun protection', 'Mesh ventilation panels'],
  relatedProducts: [],
  badge: 'bestseller',
  category: 'sports',
};

const sportActiveLife: Product = {
  id: 'sport-active-life',
  name: 'Active Life Tee',
  price: 2999,
  rating: 4.5,
  reviews: 56,
  description: 'Versatile enough for the gym and stylish enough for the street. The Active Life Tee bridges the gap between performance and everyday wear with a modern athletic cut.',
  images: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
  ],
  colors: ['grey', 'white', 'black'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '60% Cotton, 40% Polyester | Machine wash cold | Tumble dry low',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['Cotton-poly performance blend', 'Raglan sleeve for range of motion', 'Reflective logo print'],
  relatedProducts: [],
  badge: 'new',
  category: 'sports',
};

// ─── Animated Collection ──────────────────────────────────────────────────────

const animeCosmic: Product = {
  id: 'anime-cosmic',
  name: 'Cosmic Comics Tee',
  price: 3499,
  rating: 4.8,
  reviews: 145,
  description: 'A galaxy of imagination on premium cotton. The Cosmic Comics Tee features hand-drawn original artwork in a bold, large-format print. A wearable work of art.',
  images: [
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
  ],
  colors: ['black', 'white'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Wash inside out | Do not bleach',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['Original commissioned artwork', 'Water-based eco-friendly ink', 'Print lasts 100+ washes'],
  relatedProducts: [],
  badge: 'limited',
  category: 'animated',
};

const animeMangaArt: Product = {
  id: 'anime-manga-art',
  name: 'Manga Art Series',
  price: 3299,
  rating: 4.7,
  reviews: 119,
  description: 'Inspired by classic manga aesthetics — high contrast ink, bold linework, and expressive characters. Limited print run of each design in the series.',
  images: [
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
  ],
  colors: ['white', 'black'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Wash inside out | Air dry recommended',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['Series-numbered limited edition', 'Manga-style full-back print option', 'Collector\'s tag included'],
  relatedProducts: [],
  badge: 'limited',
  category: 'animated',
};

const animePixelPop: Product = {
  id: 'anime-pixel-pop',
  name: 'Pixel Pop Art Tee',
  price: 2999,
  rating: 4.6,
  reviews: 87,
  description: 'Retro pixel art meets premium streetwear. The Pixel Pop Art Tee celebrates 8-bit nostalgia with a modern minimalist twist — for the gamer, the creative, the collector.',
  images: [
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=800&h=900&fit=crop',
  ],
  colors: ['white', 'navy', 'black'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Premium Cotton | Machine wash cold | Wash inside out to preserve print',
  shipping: '5–7 business days | Free shipping on orders above ₹999 | Standard delivery',
  returns: '7-day easy returns | No questions asked | Free returns on defective items',
  features: ['8-bit retro art print', 'Exclusive design drops every season', 'Unisex relaxed fit'],
  relatedProducts: [],
  badge: 'new',
  category: 'animated',
};

// ─── Limited Edition Collection ───────────────────────────────────────────────

const limitedArtisan01: Product = {
  id: 'limited-artisan-01',
  name: 'Artisan Reserve No.01',
  price: 8999,
  rating: 4.9,
  reviews: 52,
  description: 'The first in our Artisan Reserve series. Hand-finished details, micro-batch production of 200 units only. Each tee comes with a certificate of authenticity and a serialised tag.',
  images: [
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
  ],
  colors: ['midnight', 'slate'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Egyptian Cotton | Hand wash only | Air dry flat | Handle with care',
  shipping: '5–7 business days | Free insured express shipping | Luxury packaging',
  returns: '7-day easy returns | Full refund if not as described',
  features: ['Only 200 units produced worldwide', 'Serialised certificate of authenticity', 'Premium rigid gift box'],
  relatedProducts: [],
  badge: 'limited',
  category: 'limited-edition',
};

const limitedMidnight: Product = {
  id: 'limited-midnight',
  name: "Midnight Collector's Tee",
  price: 9999,
  rating: 4.9,
  reviews: 38,
  description: "Deep midnight black with hand-embroidered gold thread detailing. A collector's piece for those who understand that true luxury is rare. Just 150 units available.",
  images: [
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=800&h=900&fit=crop',
  ],
  colors: ['midnight black'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Supima Cotton | Hand wash cold | Air dry only | Store flat',
  shipping: '5–7 business days | Free insured express shipping | Collector\'s packaging',
  returns: '7-day easy returns | Full refund if not as described',
  features: ['Hand-embroidered gold thread', 'Only 150 units produced', 'Wax-sealed authentication card'],
  relatedProducts: [],
  badge: 'limited',
  category: 'limited-edition',
};

const limitedHeritageGold: Product = {
  id: 'limited-heritage-gold',
  name: 'Heritage Gold Edition',
  price: 11999,
  rating: 5.0,
  reviews: 24,
  description: 'The pinnacle of the Skaviyo Limited Edition series. Heritage Gold combines our finest Egyptian cotton with 22k gold-leaf print in a masterpiece of wearable art. Only 100 pieces exist.',
  images: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=800&h=900&fit=crop',
    'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=900&fit=crop',
  ],
  colors: ['black/gold'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  fabricCare: '100% Egyptian Cotton | Dry clean recommended | Store in provided dust bag',
  shipping: '5–7 business days | Insured white-glove delivery | Heritage box packaging',
  returns: '7-day easy returns | Full refund guaranteed',
  features: ['22k gold-leaf print application', 'Only 100 units worldwide', 'Comes with dust bag, box & authentication'],
  relatedProducts: [],
  badge: 'limited',
  category: 'limited-edition',
};

// ─── Wire up related products ─────────────────────────────────────────────────

classicWhite.relatedProducts = [emeraldTee, bluePrint, signaturePremium];
emeraldTee.relatedProducts = [classicWhite, bluePrint, vintageClassic];
bluePrint.relatedProducts = [classicWhite, emeraldTee, weekenderPack];
weekenderPack.relatedProducts = [classicWhite, emeraldTee, bluePrint];
signaturePremium.relatedProducts = [classicWhite, weekenderPack, bluePrint];
vintageClassic.relatedProducts = [vintageHeritage, vintageBlack, vintageTones];
vintageHeritage.relatedProducts = [vintageClassic, vintageBlack, vintageTones];
vintageBlack.relatedProducts = [vintageHeritage, vintageTones, vintageClassic];
vintageTones.relatedProducts = [vintageBlack, vintageClassic, vintageHeritage];

womenBlossom.relatedProducts = [womenSummerBreeze, womenPowerClassic];
womenSummerBreeze.relatedProducts = [womenBlossom, womenPowerClassic];
womenPowerClassic.relatedProducts = [womenBlossom, womenSummerBreeze];

couplesPerfectMatch.relatedProducts = [couplesLoveTones];
couplesLoveTones.relatedProducts = [couplesPerfectMatch];

teamSpiritPack.relatedProducts = [teamEventSet];
teamEventSet.relatedProducts = [teamSpiritPack];

sportPerformance.relatedProducts = [sportDryFit, sportActiveLife];
sportDryFit.relatedProducts = [sportPerformance, sportActiveLife];
sportActiveLife.relatedProducts = [sportPerformance, sportDryFit];

animeCosmic.relatedProducts = [animeMangaArt, animePixelPop];
animeMangaArt.relatedProducts = [animeCosmic, animePixelPop];
animePixelPop.relatedProducts = [animeCosmic, animeMangaArt];

limitedArtisan01.relatedProducts = [limitedMidnight, limitedHeritageGold];
limitedMidnight.relatedProducts = [limitedArtisan01, limitedHeritageGold];
limitedHeritageGold.relatedProducts = [limitedArtisan01, limitedMidnight];

// ─── Exports ──────────────────────────────────────────────────────────────────

export const PRODUCTS_ARRAY: Product[] = [
  classicWhite, emeraldTee, bluePrint, weekenderPack, signaturePremium,
  vintageClassic, vintageHeritage, vintageBlack, vintageTones,
  womenBlossom, womenSummerBreeze, womenPowerClassic,
  couplesPerfectMatch, couplesLoveTones,
  teamSpiritPack, teamEventSet,
  sportPerformance, sportDryFit, sportActiveLife,
  animeCosmic, animeMangaArt, animePixelPop,
  limitedArtisan01, limitedMidnight, limitedHeritageGold,
];

export const PRODUCTS: { [key: string]: Product } = {};
PRODUCTS_ARRAY.forEach((p) => { PRODUCTS[p.id] = p; });

// By category
export const PRODUCTS_BY_CATEGORY: { [cat: string]: Product[] } = {};
PRODUCTS_ARRAY.forEach((p) => {
  const cat = p.category || 'men';
  if (!PRODUCTS_BY_CATEGORY[cat]) PRODUCTS_BY_CATEGORY[cat] = [];
  PRODUCTS_BY_CATEGORY[cat].push(p);
});

// Trending (homepage)
export const TRENDING_PRODUCTS = [
  classicWhite, emeraldTee, bluePrint, vintageBlack, signaturePremium, vintageClassic,
];

// Cart suggestions
export const CART_SUGGESTIONS = [
  { id: classicWhite.id, name: classicWhite.name, price: classicWhite.price, badge: 'Bestseller', image: classicWhite.images[0] },
  { id: emeraldTee.id, name: emeraldTee.name, price: emeraldTee.price, badge: 'Featured', image: emeraldTee.images[0] },
  { id: bluePrint.id, name: bluePrint.name, price: bluePrint.price, badge: 'Limited', image: bluePrint.images[0] },
  { id: vintageBlack.id, name: vintageBlack.name, price: vintageBlack.price, badge: 'Limited', image: vintageBlack.images[0] },
  { id: signaturePremium.id, name: signaturePremium.name, price: signaturePremium.price, badge: 'Bestseller', image: signaturePremium.images[0] },
];
