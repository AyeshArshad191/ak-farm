import { Product, SiteSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'mango-murabba',
    name: 'Mango Murabba',
    subtitle: 'Made with Love, Just Like Home! ❤️',
    category: 'murabba',
    categoryLabel: 'Murabba',
    badge: 'BEST SELLER',
    price: 590,
    weight: '500 Gram',
    sizes: [
      { name: '500 Grams', price: 590 },
      { name: '1 KG', price: 1100 },
      { name: '1.5 KG', price: 1600 },
    ],
    images: [
      '/assets/images/mango_murabba_1786299305761.jpg',
      '/assets/images/ak_farm_hero_1786299288820.jpg',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Deliciously sweet, made with love from farm-fresh mangoes. Our traditional recipe ensures a rich taste that brings back memories of home. Carefully prepared to be pure and hygienic.',
    ingredients: ['Farm-Fresh Sindhri/Chaunsa Mangoes', 'Pure Sugar Syrup', 'Organic Cardamom', 'Saffron'],
    stock: 45,
    rating: 5.0,
    reviewsCount: 18,
    highlights: [
      'No Preservatives',
      'Pure & Hygienic',
      'Rich in Taste',
      'Traditional Recipe'
    ]
  },
  {
    id: 'pure-desi-ghee',
    name: 'Pure Desi Ghee',
    subtitle: '100% Authentic Vedic Bilona Method',
    category: 'ghee',
    categoryLabel: 'Desi Ghee',
    badge: 'NEW ARRIVAL',
    price: 3000,
    weight: '1KG • Bilona Method',
    sizes: [
      { name: '500 Grams', price: 1600 },
      { name: '1 KG', price: 3000 },
      { name: '2 KG', price: 5800 }
    ],
    images: [
      '/assets/images/desi_ghee_1786299321528.jpg',
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Extracted using the traditional A2 Cow Bilona churned curd method. Rich aromatic granular texture, packed with essential vitamins and natural fatty acids.',
    ingredients: ['100% Pure A2 Cow Milk Fat'],
    stock: 25,
    rating: 4.9,
    reviewsCount: 24,
    highlights: [
      'Traditional Bilona Churned',
      'No Chemicals or Additives',
      'Granular Texture & Rich Aroma',
      'Boosts Immunity & Digestion'
    ]
  },
  {
    id: 'sarso-ka-tail',
    name: 'Sarso Ka Tail',
    subtitle: 'Cold Pressed 100% Pure Kachi Ghani',
    category: 'oil',
    categoryLabel: 'Oils',
    price: 630,
    weight: '100ml',
    sizes: [
      { name: '100ml', price: 630 },
      { name: '500ml', price: 1450 },
      { name: '1 Litre', price: 2700 }
    ],
    images: [
      '/assets/images/almond_oil_1786300753837.jpg',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'
    ],
    description: '100% pure cold-pressed mustard oil extracted from hand-selected mustard seeds. Unrefined, retains natural sharp pungency, essential fatty acids, and vibrant golden tone.',
    ingredients: ['100% Cold-Pressed Organic Mustard Seeds'],
    stock: 60,
    rating: 4.8,
    reviewsCount: 12,
    highlights: [
      'Kachi Ghani Cold-Pressed',
      'Natural Pungent Aroma',
      'Unrefined & Unfiltered',
      'Great for Cooking & Hair Care'
    ]
  },
  {
    id: 'desi-brown-sugar',
    name: 'Desi Brown Sugar',
    subtitle: 'Unrefined Organic Shakkar / Jaggery Powder',
    category: 'sugar',
    categoryLabel: 'Desi Sugar',
    price: 270,
    weight: '1KG',
    sizes: [
      { name: '500 Grams', price: 150 },
      { name: '1 KG', price: 270 },
      { name: '5 KG', price: 1250 }
    ],
    images: [
      '/assets/images/desi_gur_1786300309180.jpg'
    ],
    description: 'Made from fresh sugarcane juice boiled slowly without sulfur or chemical bleaching agents. Rich in natural minerals like iron, magnesium, and potassium.',
    ingredients: ['100% Pure Sugarcane Juice Extract'],
    stock: 80,
    rating: 4.9,
    reviewsCount: 15,
    highlights: [
      'Chemical-Free Processing',
      'Rich Mineral Content',
      'Perfect Healthy Sugar Substitute',
      'Authentic Molasses Flavor'
    ]
  },
  {
    id: 'pure-organic-honey',
    name: 'Honey',
    subtitle: '100% Unprocessed Wildflower Honey',
    category: 'honey',
    categoryLabel: 'Pure Honey',
    badge: '100% NATURAL',
    price: 3000,
    weight: '500 Gram',
    sizes: [
      { name: '250 Grams', price: 1600 },
      { name: '500 Grams', price: 3000 },
      { name: '1 KG', price: 5800 }
    ],
    images: [
      '/assets/images/pure_honey_1786299335264.jpg',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Raw, unheated, and micro-filtered organic wildflower honey harvested directly from local farm hives. Packed with natural pollen, enzymes, and antioxidants.',
    ingredients: ['100% Raw Wildflower Honey'],
    stock: 30,
    rating: 5.0,
    reviewsCount: 32,
    highlights: [
      'Raw & Unheated',
      'Contains Natural Pollen',
      'Zero Sugar Syrup Addition',
      'Lab Tested for Purity'
    ]
  },
  {
    id: 'spicy-mango-achar',
    name: 'Spicy Mango Achar',
    subtitle: 'Traditional Homemade Recipe in Mustard Oil',
    category: 'achar',
    categoryLabel: 'Pickles',
    price: 450,
    weight: '500 Gram',
    sizes: [
      { name: '500 Grams', price: 450 },
      { name: '1 KG', price: 850 },
      { name: '2 KG', price: 1600 }
    ],
    images: [
      '/assets/images/mango_achar_1786299351993.jpg',
      'https://images.unsplash.com/photo-1596797882870-8c33deeac224?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Tangy, mouthwatering homemade raw mango pickle marinated in pure cold-pressed mustard oil with red chili flakes, fennel, fenugreek, and nigella seeds.',
    ingredients: ['Raw Raw Mangoes', 'Pure Mustard Oil', 'Red Chili', 'Fennel Seeds', 'Fenugreek', 'Nigella', 'Salt'],
    stock: 50,
    rating: 4.8,
    reviewsCount: 21,
    highlights: [
      'Sun-Matured Tradition',
      'No Artificial Color',
      'Preserved in Pure Sarso Oil',
      'Tangy & Spicy Flavor Burst'
    ]
  },
  {
    id: 'apple-murabba',
    name: 'Saeb Ka Murabba (Apple Murabba)',
    subtitle: 'Healthy Heart & Vitality Tonic ❤️',
    category: 'murabba',
    categoryLabel: 'Murabba',
    badge: 'FRESH HARVEST',
    price: 680,
    weight: '500 Gram',
    sizes: [
      { name: '500 Grams', price: 680 },
      { name: '1 KG', price: 1280 },
      { name: '1.5 KG', price: 1850 }
    ],
    images: [
      '/assets/images/apple_murabba_1786300254954.jpg',
      '/assets/images/mango_murabba_1786299305761.jpg'
    ],
    description: 'Traditional home-simmered organic apple murabba steeped in natural saffron cardamom sugar syrup. Excellent for heart health, boosting energy, and relieving mental tiredness.',
    ingredients: ['Farm Apples', 'Pure Sugar Syrup', 'Green Cardamom', 'Saffron'],
    stock: 35,
    rating: 4.9,
    reviewsCount: 16,
    highlights: [
      'Boosts Cardiac Health',
      'Rich in Saffron Aroma',
      'Soft Melt-in-Mouth Texture',
      'Zero Artificial Preservatives'
    ]
  },
  {
    id: 'amla-murabba',
    name: 'Organic Amla Murabba',
    subtitle: 'Vitamin C Immunity Booster 🌿',
    category: 'murabba',
    categoryLabel: 'Murabba',
    badge: 'HEALTH CHOICE',
    price: 620,
    weight: '500 Gram',
    sizes: [
      { name: '500 Grams', price: 620 },
      { name: '1 KG', price: 1150 },
      { name: '2 KG', price: 2200 }
    ],
    images: [
      '/assets/images/amla_murabba_1786300276072.jpg',
      '/assets/images/pure_honey_1786299335264.jpg'
    ],
    description: 'Handpicked fresh organic gooseberries (amla) slow-cooked in honey and cardamom syrup. High in Vitamin C, promotes hair growth, improves eyesight, and enhances immunity.',
    ingredients: ['Fresh Organic Amla', 'Pure Honey Syrup', 'Green Cardamom'],
    stock: 40,
    rating: 5.0,
    reviewsCount: 29,
    highlights: [
      'High Vitamin C Powerhouse',
      'Promotes Hair & Eye Health',
      'Natural Honey Infused',
      'Traditional Ayurvedic Recipe'
    ]
  },
  {
    id: 'mix-pickle-achar',
    name: 'Special Mix Vegetable Achar',
    subtitle: 'Chilli, Lemon, Carrot & Turnip in Sarso Oil',
    category: 'achar',
    categoryLabel: 'Pickles',
    price: 490,
    weight: '500 Gram',
    sizes: [
      { name: '500 Grams', price: 490 },
      { name: '1 KG', price: 920 },
      { name: '2 KG', price: 1750 }
    ],
    images: [
      '/assets/images/mix_pickle_1786300292925.jpg',
      '/assets/images/mango_achar_1786299351993.jpg'
    ],
    description: 'Crisp hand-cut farm vegetables—green chilies, lemons, carrots, and turnips—sun-matured in pure mustard oil with aromatic spices.',
    ingredients: ['Green Chilies', 'Fresh Lemons', 'Carrots', 'Turnip', 'Cold-Pressed Mustard Oil', 'Whole Spices'],
    stock: 55,
    rating: 4.8,
    reviewsCount: 19,
    highlights: [
      '100% Sun Matured',
      'No Vinegar or Acids',
      'Traditional Recipe',
      'Irresistible Zesty Punch'
    ]
  },
  {
    id: 'desi-gur-blocks',
    name: 'Organic Desi Gur (Jaggery Blocks)',
    subtitle: 'Pure Sugarcane Gur with Almonds & Fennel',
    category: 'sugar',
    categoryLabel: 'Desi Sugar',
    badge: 'ORGANIC',
    price: 320,
    weight: '1KG',
    sizes: [
      { name: '1 KG', price: 320 },
      { name: '2.5 KG', price: 750 },
      { name: '5 KG', price: 1400 }
    ],
    images: [
      '/assets/images/desi_gur_1786300309180.jpg',
      'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Freshly boiled sugarcane juice crushed into golden jaggery blocks enriched with roasted almonds, fennel seeds, and cardamoms. Great digestif after meals.',
    ingredients: ['100% Organic Sugarcane Juice', 'Almonds', 'Fennel Seeds', 'Cardamom'],
    stock: 65,
    rating: 4.9,
    reviewsCount: 22,
    highlights: [
      'Chemical & Lime-Free',
      'Natural Post-Meal Digestif',
      'Rich in Iron & Potassium',
      'Enriched with Nuts & Saunf'
    ]
  },
  {
    id: 'sweet-almond-oil',
    name: 'Meetha Badam Ka Tail (Almond Oil)',
    subtitle: '100% Pure Cold-Pressed Sweet Almond Oil',
    category: 'oil',
    categoryLabel: 'Pure Oils',
    badge: '100% NATURAL',
    price: 980,
    weight: '100ml',
    sizes: [
      { name: '100ml Glass Bottle', price: 980 },
      { name: '250ml Glass Bottle', price: 2200 }
    ],
    images: [
      '/assets/images/almond_oil_1786300753837.jpg',
      '/assets/images/almond_oil_1786300753837.jpg'
    ],
    description: 'Virgin cold-pressed sweet almond oil extracted using traditional wood-press (Kachi Ghani). Nourishes hair, glowing skin, memory boosting, and infant massage.',
    ingredients: ['100% Organic Sweet Almonds'],
    stock: 25,
    rating: 5.0,
    reviewsCount: 31,
    highlights: [
      '100% Pure Kachi Ghani Pressed',
      'Rich in Vitamin E & Omega-6',
      'Edible & Skin Care Grade',
      'Zero Mineral Oils or Additives'
    ]
  },
  {
    id: 'sidr-berry-honey',
    name: 'Wild Sidr Berry Honey (Choti Makkhi)',
    subtitle: 'Karak Sidr Wildflower Organic Honey',
    category: 'honey',
    categoryLabel: 'Wild Honey',
    badge: 'BEST SELLER',
    price: 3450,
    weight: '500 Gram',
    sizes: [
      { name: '500 Grams', price: 3450 },
      { name: '1 KG', price: 6500 }
    ],
    images: [
      '/assets/images/sidr_honey_1786300776153.jpg',
      '/assets/images/pure_honey_1786299335264.jpg'
    ],
    description: 'Rare wild raw Sidr honey harvested from ancient berry forests of Karak. Unprocessed, unheated, unfiltered with thick amber consistency and medicinal properties.',
    ingredients: ['100% Wild Sidr Nectar'],
    stock: 20,
    rating: 5.0,
    reviewsCount: 42,
    highlights: [
      'Authentic Karak Forest Harvest',
      'Medicinal Grade Antibacterial',
      'Unheated & Unfiltered',
      'Thick Caramel Texture'
    ]
  },
  {
    id: 'lemon-chili-pickle',
    name: 'Khatta Meetha Nimbu Mirch Achar',
    subtitle: 'Zesty Tangy Lemon & Green Chili Achar',
    category: 'achar',
    categoryLabel: 'Pickles',
    badge: 'NEW ARRIVAL',
    price: 460,
    weight: '500 Gram',
    sizes: [
      { name: '500 Grams', price: 460 },
      { name: '1 KG', price: 880 }
    ],
    images: [
      '/assets/images/lemon_pickle_1786300792989.jpg',
      '/assets/images/mix_pickle_1786300292925.jpg'
    ],
    description: 'Juicy Kagzi lemons and spicy farm green chilies steeped in cold-pressed mustard oil with kalonji, saunf, and fenugreek seeds.',
    ingredients: ['Fresh Lemons', 'Green Chilies', 'Mustard Oil', 'Kalonji', 'Saunf', 'Spices'],
    stock: 50,
    rating: 4.9,
    reviewsCount: 18,
    highlights: [
      'Juicy & Tangy Burst',
      'Digestive Kalonji & Saunf Spices',
      'No Added Preservatives',
      'Perfect Companion for Parathas'
    ]
  },
  {
    id: 'organic-haldi-turmeric',
    name: 'Hand-Pounded Organic Haldi',
    subtitle: 'High Curcumin Pure Farm Turmeric Powder',
    category: 'spices',
    categoryLabel: 'Pure Spices',
    badge: '100% NATURAL',
    price: 380,
    weight: '250 Gram',
    sizes: [
      { name: '250 Grams', price: 380 },
      { name: '500 Grams', price: 720 },
      { name: '1 KG', price: 1350 }
    ],
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Fresh farm harvested turmeric roots naturally sun-dried and traditionally hand-pounded. Retains high curcumin content, vibrant natural golden color, and antibacterial warmth.',
    ingredients: ['100% Organic Turmeric Rhizomes'],
    stock: 45,
    rating: 4.9,
    reviewsCount: 16,
    highlights: [
      'High Curcumin Active Compound',
      'No Added Colors or Lead',
      'Hand-Pounded Cold Ground',
      'Natural Immunity Booster'
    ]
  },
  {
    id: 'pure-ispaghol-husk',
    name: 'Pure Ispaghol Husk (Psyllium)',
    subtitle: '100% Natural Unbleached Digestive Fiber',
    category: 'others',
    categoryLabel: 'Superfoods',
    badge: 'HEALTH CHOICE',
    price: 850,
    weight: '200 Gram',
    sizes: [
      { name: '200 Grams', price: 850 },
      { name: '500 Grams', price: 1950 }
    ],
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      '/assets/images/desi_gur_1786300309180.jpg'
    ],
    description: 'Premium quality white psyllium husk gently separated from organic plantago ovata seeds. Unbleached, rich in soluble natural dietary fiber, supports digestion and cholesterol balance.',
    ingredients: ['100% Organic Psyllium Husk'],
    stock: 35,
    rating: 5.0,
    reviewsCount: 27,
    highlights: [
      '100% Natural & Unbleached',
      'Rich Soluble Dietary Fiber',
      'Relieves Acidity & Indigestion',
      'Zero Chemicals or Additives'
    ]
  },
  {
    id: 'dry-fruits-gift-box',
    name: 'AK Farm Royal Dry Fruit Box',
    subtitle: 'Premium Almonds, Walnuts, Pistachios & Figs',
    category: 'dryfruits',
    categoryLabel: 'Dry Fruits',
    badge: 'BEST SELLER',
    price: 2800,
    weight: '500 Gram Box',
    sizes: [
      { name: '500 Gram Box', price: 2800 },
      { name: '1 KG Luxury Box', price: 5400 }
    ],
    images: [
      'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A hand-selected luxury collection of top-grade Kagzi Almonds, Northern Walnut kernels, Salted Pistachios, Cashews, and Dried Figs. Packed air-tight for maximum crunch and natural sweetness.',
    ingredients: ['Almonds', 'Walnut Kernels', 'Pistachios', 'Cashews', 'Dried Figs'],
    stock: 25,
    rating: 4.9,
    reviewsCount: 38,
    highlights: [
      '100% Fresh & Crunchy Harvest',
      'No Preservatives or Oils',
      'Rich in Brain Healthy Fats',
      'Elegant Gift Packaging'
    ]
  },
  {
    id: 'organic-roasted-makhana',
    name: 'Organic Phool Makhana (Fox Nuts)',
    subtitle: 'Crunchy Calcium-Rich Superfood Snack',
    category: 'others',
    categoryLabel: 'Superfoods',
    badge: 'FRESH HARVEST',
    price: 750,
    weight: '250 Gram',
    sizes: [
      { name: '250 Grams', price: 750 },
      { name: '500 Grams', price: 1400 }
    ],
    images: [
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Handpicked large puffed lotus seeds (fox nuts). Low calorie, rich in calcium, protein, and magnesium. Perfect healthy tea-time snack for adults and kids.',
    ingredients: ['100% Organic Puffed Lotus Seeds'],
    stock: 40,
    rating: 4.8,
    reviewsCount: 14,
    highlights: [
      'Low Calorie & High Protein',
      'Rich Source of Calcium',
      'Gluten-Free & Organic',
      'Light & Super Crunchy'
    ]
  },
  {
    id: 'pure-white-desi-butter',
    name: 'Fresh Desi Makhan (White Butter)',
    subtitle: 'Unsalted Fresh Churned Organic Butter',
    category: 'ghee',
    categoryLabel: 'Desi Ghee & Butter',
    badge: 'FRESH HARVEST',
    price: 1450,
    weight: '500 Gram',
    sizes: [
      { name: '500 Grams', price: 1450 },
      { name: '1 KG', price: 2800 }
    ],
    images: [
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800',
      '/assets/images/desi_ghee_1786299321528.jpg'
    ],
    description: 'Freshly churned white butter made daily from cultured organic cow & buffalo cream. Smooth, silky, unsalted, and delicious on hot parathas and makai ki roti.',
    ingredients: ['100% Pure Cultured Cream'],
    stock: 20,
    rating: 5.0,
    reviewsCount: 22,
    highlights: [
      'Daily Fresh Churned',
      '100% Unsalted & Pure',
      'Zero Chemicals or Coloring',
      'Authentic Village Taste'
    ]
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  storeName: 'AK FARM',
  tagline: 'PURE BY NATURE',
  phone: '0303 7567324',
  whatsapp: '923037567324',
  email: 'info@akfarm.com',
  address: 'AK Farm Estate, Multan Road, Punjab, Pakistan',
  announcementText: '🎉 Free Home Delivery on Orders Above Rs. 3,000 Across Pakistan!',
  heroHeading: 'Pure, Natural &\nTrusted Goodness',
  heroSubheading: 'Experience the authentic taste of nature. 100% pure, high quality & traditionally made for your family.'
};

export const INITIAL_ORDERS: any[] = [
  {
    id: 'AKF-1001',
    createdAt: new Date().toISOString(),
    customer: {
      fullName: 'Muhammad Ali',
      phone: '0300 1234567',
      email: 'm.ali@gmail.com',
      address: 'House 42, Block C, Gulberg III',
      city: 'Lahore',
      notes: 'Please deliver after 2 PM'
    },
    items: [
      {
        productId: 'pure-desi-ghee',
        productName: 'Pure Desi Ghee',
        sizeName: '1 KG',
        price: 3000,
        quantity: 1,
        image: '/assets/images/desi_ghee_1786299321528.jpg'
      },
      {
        productId: 'mango-murabba',
        productName: 'Homemade Mango Murabba',
        sizeName: '1.5 KG',
        price: 1330,
        quantity: 1,
        image: '/assets/images/mango_murabba_1786299305761.jpg'
      }
    ],
    totalAmount: 4330,
    deliveryFee: 0,
    paymentMethod: 'cod',
    status: 'Processing'
  },
  {
    id: 'AKF-1002',
    createdAt: new Date().toISOString(),
    customer: {
      fullName: 'Fatima Zahra',
      phone: '0321 9876543',
      email: 'fatima.z@yahoo.com',
      address: 'Street 14, Sector F-8/2',
      city: 'Islamabad',
      notes: 'Ring bell on arrival'
    },
    items: [
      {
        productId: 'pure-desi-ghee',
        productName: 'Pure Desi Ghee',
        sizeName: '1 KG',
        price: 3000,
        quantity: 1,
        image: '/assets/images/desi_ghee_1786299321528.jpg'
      }
    ],
    totalAmount: 3000,
    deliveryFee: 0,
    paymentMethod: 'bank',
    status: 'Processing'
  }
];
