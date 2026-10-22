export type GalleryCategory =
  | 'All'
  | 'Venues & Architecture'
  | 'Candid Photography'
  | 'Floral & Mandap Decor'
  | 'Bridal & Mehendi'
  | 'Culinary & Banquets';

export interface GalleryItem {
  id: string;
  title: string;
  coupleOrVenue: string;
  category: Exclude<GalleryCategory, 'All'>;
  location: string;
  date: string;
  imageUrl: string;
  originalWedRaagaUrl: string;
  aspect: 'tall' | 'wide' | 'square';
  description: string;
  photographerOrVendor: string;
  guestCapacity?: string;
}

export interface CuratedVenue {
  id: string;
  name: string;
  area: string;
  city: string;
  capacityMin: number;
  capacityMax: number;
  basePackageInr: number;
  perPlateInr: number;
  spaces: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  originalWedRaagaUrl: string;
  highlights: string[];
  description: string;
}

export type WeddingEventName =
  | 'Haldi & Mehendi'
  | 'Sangeet Soirée'
  | 'Muhurtham Ceremony'
  | 'Grand Reception';

export type RsvpStatus = 'attending' | 'pending' | 'declined';

export type DietaryPreference =
  | 'Pure Vegetarian'
  | 'Jain Vegetarian'
  | 'South Indian Traditional'
  | 'Continental & Fusion';

export interface GuestRsvpRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  side: 'Bride Family' | 'Groom Family' | 'Mutual Friends';
  status: RsvpStatus;
  partySize: number;
  events: WeddingEventName[];
  dietary: DietaryPreference;
  tableNumber: string;
  songRequest?: string;
  notes?: string;
  updatedAt: string;
}

export interface PlanningTask {
  id: string;
  phase: '12–9 Months Out' | '8–4 Months Out' | '3–1 Months Out' | 'Wedding Week';
  title: string;
  category: 'Venue & Catering' | 'Photography & Decor' | 'Attire & Beauty' | 'Guest & Rituals';
  completed: boolean;
  dueLabel: string;
  estimatedBudgetInr: number;
}

export const WEDRAAGA_VENUES: CuratedVenue[] = [
  {
    id: 'naren-gardens',
    name: 'Naren Gardens Convention',
    area: 'Miyapur · Bachupally Road',
    city: 'Hyderabad',
    capacityMin: 400,
    capacityMax: 2200,
    basePackageInr: 480000,
    perPlateInr: 950,
    spaces: 'Grand Pillarless Hall · Royal Lawn · Bridal Suite',
    rating: 4.9,
    reviewsCount: 66,
    imageUrl: '/images/wedraaga/venue-naren.png',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2025/07/N1-1024x682.png',
    highlights: ['Pillarless Main Mandap', 'Valet Parking for 450 Cars', 'In-House Acoustic Stage'],
    description:
      'Signature convention space curated by WedRaaga with high-ceiling chandeliers, expansive manicured outdoor lawns, and dedicated ceremonial dining halls.',
  },
  {
    id: 'swetha-garden',
    name: 'Swetha Garden & Conventions',
    area: 'Kompally · North Enclave',
    city: 'Hyderabad',
    capacityMin: 350,
    capacityMax: 1800,
    basePackageInr: 390000,
    perPlateInr: 850,
    spaces: 'Open-Air Starlight Lawn · AC Banquet Hall',
    rating: 4.8,
    reviewsCount: 80,
    imageUrl: '/images/wedraaga/venue-swetha.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2025/07/swetha5.jpg',
    highlights: ['Lush Botanical Courtyard', 'Custom Floral Mandap Rigging', 'Separate VIP Dining'],
    description:
      'Serene open-air garden venue designed for twilight Sangeet celebrations and traditional South Indian morning Muhurthams.',
  },
  {
    id: 'sri-convention',
    name: 'Sri Convention Hall',
    area: 'Kukatpally · NH-65 Corridor',
    city: 'Hyderabad',
    capacityMin: 500,
    capacityMax: 2500,
    basePackageInr: 550000,
    perPlateInr: 1100,
    spaces: 'Imperial Ballroom · Mezzanine Lounge · Courtyard',
    rating: 4.9,
    reviewsCount: 91,
    imageUrl: '/images/wedraaga/venue-sri.png',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2025/07/SR1.png',
    highlights: ['32-Foot Ceiling Clearance', 'Dedicated Pandit & Ritual Room', '6 Guest Hospitality Suites'],
    description:
      'Architectural grandeur meets seamless guest flow, accommodating multi-day Telugu and pan-Indian wedding celebrations with effortless poise.',
  },
  {
    id: 'rajendra-conventions',
    name: 'Rajendra Conventions & Lawns',
    area: 'Gachibowli · Financial District',
    city: 'Hyderabad',
    capacityMin: 300,
    capacityMax: 1500,
    basePackageInr: 520000,
    perPlateInr: 1200,
    spaces: 'Heritage Pavilion · Reflection Pool Deck',
    rating: 4.8,
    reviewsCount: 54,
    imageUrl: '/images/wedraaga/venue-rajendra.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/07/foreign-wedding-planners-pic4.jpg',
    highlights: ['Designer Floral Canopy', 'Bespoke Lighting Grid', 'Private Couple Entryway'],
    description:
      'Refined contemporary venue tailored for luxury minimalist receptions, candlelit Sangeet evenings, and editorial wedding photography.',
  },
];

export const WEDRAAGA_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Golden Hour Pelli Mandapam Portrait',
    coupleOrVenue: 'Ananya & Siddharth',
    category: 'Candid Photography',
    location: 'Gachibowli, Hyderabad',
    date: 'November 2025',
    imageUrl: '/images/wedraaga/hero-wedding-1.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/11/ESP06002.jpg',
    aspect: 'wide',
    description:
      'Intimate post-Muhurtham portrait captured in warm natural window light with heirloom Kanjeevaram silk and temple gold.',
    photographerOrVendor: 'WedRaaga Exclusive Photography',
  },
  {
    id: 'gal-2',
    title: 'Sacred Jeelakarra Bellam Ritual',
    coupleOrVenue: 'Rhea & Vikramaditya',
    category: 'Candid Photography',
    location: 'Jubilee Hills, Hyderabad',
    date: 'December 2025',
    imageUrl: '/images/wedraaga/hero-wedding-3.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/11/DSC00908.jpg',
    aspect: 'tall',
    description:
      'Emotional candid moment during the auspicious Muhurtham ceremony surrounded by fresh jasmine garlands and Vedic chants.',
    photographerOrVendor: 'WedRaaga Documentary Studio',
  },
  {
    id: 'gal-3',
    title: 'Naren Gardens Grand Mandap Architecture',
    coupleOrVenue: 'Naren Gardens Convention',
    category: 'Venues & Architecture',
    location: 'Miyapur, Hyderabad',
    date: 'January 2026',
    imageUrl: '/images/wedraaga/venue-naren.png',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2025/07/N1-1024x682.png',
    aspect: 'wide',
    description:
      'Expansive pillarless convention hall dressed in ivory drapes, warm amber uplighting, and symmetrical floral aisles.',
    photographerOrVendor: 'WedRaaga Venue Collection',
    guestCapacity: 'Up to 2,200 Guests',
  },
  {
    id: 'gal-4',
    title: 'Royal Floral & Chandelier Stage Design',
    coupleOrVenue: 'Kavya & Rohith',
    category: 'Floral & Mandap Decor',
    location: 'Banjara Hills, Hyderabad',
    date: 'February 2026',
    imageUrl: '/images/wedraaga/cat-decoration.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/07/DECORATION-960-X-638.jpg',
    aspect: 'square',
    description:
      'Custom cascading white roses, tuberose garlands, and warm crystal chandeliers crafted by WedRaaga floral architects.',
    photographerOrVendor: 'WedRaaga World Class Decor',
  },
  {
    id: 'gal-5',
    title: 'Heirloom Temple Bridal Jewellery',
    coupleOrVenue: 'Meera & Devansh',
    category: 'Bridal & Mehendi',
    location: 'Kokapet, Hyderabad',
    date: 'January 2026',
    imageUrl: '/images/wedraaga/cat-jewellery.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/07/Jewellery.jpg',
    aspect: 'tall',
    description:
      'Intricate Nakshi and uncut Polki diamond bridal ornaments paired with traditional silk saree styling.',
    photographerOrVendor: 'WedRaaga Bridal Curation',
  },
  {
    id: 'gal-6',
    title: 'Twilight Courtyard Reception Pavilion',
    coupleOrVenue: 'Rajendra Conventions',
    category: 'Venues & Architecture',
    location: 'Financial District, Hyderabad',
    date: 'December 2025',
    imageUrl: '/images/wedraaga/venue-rajendra.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/07/foreign-wedding-planners-pic4.jpg',
    aspect: 'wide',
    description:
      'Architectural outdoor reception lounge featuring warm fairy-lit pergolas and curated lounge seating for 800 guests.',
    photographerOrVendor: 'WedRaaga Exclusive Venues',
    guestCapacity: 'Up to 1,500 Guests',
  },
  {
    id: 'gal-7',
    title: 'Vedic Agni Pradakshina Vows',
    coupleOrVenue: 'divya & Pranav',
    category: 'Candid Photography',
    location: 'Madhapur, Hyderabad',
    date: 'November 2025',
    imageUrl: '/images/wedraaga/gallery-1.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/11/069A6592.jpg',
    aspect: 'square',
    description:
      'Documentary frame capturing the seven sacred steps around the ceremonial fire with petals raining down.',
    photographerOrVendor: 'WedRaaga Fine Art Photo',
  },
  {
    id: 'gal-8',
    title: 'Bridal couture & Kanjeevaram Draping',
    coupleOrVenue: 'Sneha & Karthik',
    category: 'Bridal & Mehendi',
    location: 'Gachibowli, Hyderabad',
    date: 'October 2025',
    imageUrl: '/images/wedraaga/cat-makeup.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/07/makeup.jpg',
    aspect: 'tall',
    description:
      'Luminous glass-skin bridal makeup and jasmine veni hair styling by Akriti Makeup Artists for WedRaaga.',
    photographerOrVendor: 'Akriti Makeup Artists',
  },
  {
    id: 'gal-9',
    title: 'Swetha Garden Starlight Lawn',
    coupleOrVenue: 'Swetha Garden',
    category: 'Venues & Architecture',
    location: 'Kompally, Hyderabad',
    date: 'January 2026',
    imageUrl: '/images/wedraaga/venue-swetha.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2025/07/swetha5.jpg',
    aspect: 'wide',
    description:
      'Manicured open-air lawn venue set for a breezy evening Sangeet and live Carnatic-fusion ensemble.',
    photographerOrVendor: 'WedRaaga Venue Collection',
    guestCapacity: 'Up to 1,800 Guests',
  },
  {
    id: 'gal-10',
    title: 'Royal Dawat & Leaf Banquet Experience',
    coupleOrVenue: 'Aarav & Nithya',
    category: 'Culinary & Banquets',
    location: 'Mehdipatnam, Hyderabad',
    date: 'December 2025',
    imageUrl: '/images/wedraaga/cat-catering.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/07/caterers.jpg',
    aspect: 'square',
    description:
      'Bespoke multi-course South Indian and Nizami wedding gastronomy served with brassware and artisanal hospitality.',
    photographerOrVendor: 'WedRaaga Culinary Partners',
  },
  {
    id: 'gal-11',
    title: 'Sangeet Promenade & Family Blessing',
    coupleOrVenue: 'Shruti & Harsh',
    category: 'Candid Photography',
    location: 'Jubilee Hills, Hyderabad',
    date: 'November 2025',
    imageUrl: '/images/wedraaga/gallery-2.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/11/IMG_2203.jpg',
    aspect: 'tall',
    description:
      'Joyful bridal entrance under a phoolon ki chadar held by brothers and closest childhood friends.',
    photographerOrVendor: 'WedRaaga Documentary Studio',
  },
  {
    id: 'gal-12',
    title: 'Intricate Bridal Mehendi Storytelling',
    coupleOrVenue: 'Pooja & Nikhil',
    category: 'Bridal & Mehendi',
    location: 'Banjara Hills, Hyderabad',
    date: 'February 2026',
    imageUrl: '/images/wedraaga/cat-mehendi.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/07/Mehndi-Copy.jpg',
    aspect: 'square',
    description:
      'Organic Sojat henna motifs illustrating the couple’s first meeting and traditional lotus mandalas.',
    photographerOrVendor: 'Sneha Mehendi Artists',
  },
  {
    id: 'gal-13',
    title: 'Sri Convention Imperial Hall',
    coupleOrVenue: 'Sri Convention',
    category: 'Venues & Architecture',
    location: 'Kukatpally, Hyderabad',
    date: 'January 2026',
    imageUrl: '/images/wedraaga/venue-sri.png',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2025/07/SR1.png',
    aspect: 'wide',
    description:
      'Grand acoustic ballroom with 32-foot ceilings, elevated stage sightlines, and seamless dining transition.',
    photographerOrVendor: 'WedRaaga Venue Collection',
    guestCapacity: 'Up to 2,500 Guests',
  },
  {
    id: 'gal-14',
    title: 'Lotus & Brass Urli Mandap Sanctuary',
    coupleOrVenue: 'Tara & Aditya',
    category: 'Floral & Mandap Decor',
    location: 'Kokapet, Hyderabad',
    date: 'December 2025',
    imageUrl: '/images/wedraaga/gallery-3.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/11/4EP05235.jpg',
    aspect: 'wide',
    description:
      'Minimalist temple-inspired mandap framed by handwoven banana fiber tapestries, brass lamps, and pink lotus blooms.',
    photographerOrVendor: 'WedRaaga Decor Studio',
  },
  {
    id: 'gal-15',
    title: 'Talambralu Pearl Shower Celebration',
    coupleOrVenue: 'Vani & Shashank',
    category: 'Candid Photography',
    location: 'Gachibowli, Hyderabad',
    date: 'January 2026',
    imageUrl: '/images/wedraaga/hero-wedding-2.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/11/2.jpg',
    aspect: 'square',
    description:
      'Laughter and spontaneity as the bride and groom shower sacred turmeric rice and pearls over one another.',
    photographerOrVendor: 'WedRaaga Exclusive Photography',
  },
  {
    id: 'gal-16',
    title: 'Artisanal Tiered Reception Patisserie',
    coupleOrVenue: 'Ira & Kabir',
    category: 'Culinary & Banquets',
    location: 'Jubilee Hills, Hyderabad',
    date: 'February 2026',
    imageUrl: '/images/wedraaga/gallery-11.jpg',
    originalWedRaagaUrl: 'https://wedraaga.com/wp-content/uploads/2024/11/6.jpg',
    aspect: 'square',
    description:
      'Hand-crafted floral sugar work, pistachio-rose sponge tiers, and curated wedding favor boxes for guests.',
    photographerOrVendor: 'Just Bake & Radha Gifts',
  },
];

export const INITIAL_GUEST_RSVPS: GuestRsvpRecord[] = [
  {
    id: 'g-101',
    fullName: 'Dr. Rameshwar & Sunitha Rao',
    email: 'rameshwar.rao@example.com',
    phone: '+91 98480 23104',
    side: 'Bride Family',
    status: 'attending',
    partySize: 4,
    events: ['Haldi & Mehendi', 'Sangeet Soirée', 'Muhurtham Ceremony', 'Grand Reception'],
    dietary: 'South Indian Traditional',
    tableNumber: 'Table 01 · Family VIP',
    songRequest: 'Raaga Kalyani Classical Instrumental',
    notes: 'Arriving from Vijayawada on Friday morning; suite reserved at venue.',
    updatedAt: '2 hours ago',
  },
  {
    id: 'g-102',
    fullName: 'Vikram & Anjali Deshmukh',
    email: 'anjali.deshmukh@example.com',
    phone: '+91 98491 55210',
    side: 'Groom Family',
    status: 'attending',
    partySize: 3,
    events: ['Sangeet Soirée', 'Muhurtham Ceremony', 'Grand Reception'],
    dietary: 'Pure Vegetarian',
    tableNumber: 'Table 02 · Groom Family',
    songRequest: 'Kesariya (Acoustic Unplugged)',
    notes: 'Requires valet pass for 1 SUV.',
    updatedAt: '5 hours ago',
  },
  {
    id: 'g-103',
    fullName: 'Meenakshi & Arvind Reddy',
    email: 'meenakshi.reddy@example.com',
    phone: '+91 90001 88421',
    side: 'Mutual Friends',
    status: 'attending',
    partySize: 2,
    events: ['Sangeet Soirée', 'Grand Reception'],
    dietary: 'Continental & Fusion',
    tableNumber: 'Table 05 · Courtyard',
    songRequest: 'Chaudhary — Coke Studio',
    updatedAt: 'Yesterday',
  },
  {
    id: 'g-104',
    fullName: 'Prakash & Kavitha Jain',
    email: 'prakash.jain@example.com',
    phone: '+91 98662 41098',
    side: 'Groom Family',
    status: 'attending',
    partySize: 4,
    events: ['Muhurtham Ceremony', 'Grand Reception'],
    dietary: 'Jain Vegetarian',
    tableNumber: 'Table 03 · Mandap East',
    notes: 'Strictly Jain vegetarian meal arrangement confirmed with head chef.',
    updatedAt: 'Yesterday',
  },
  {
    id: 'g-105',
    fullName: 'Siddharth Verma',
    email: 'siddharth.verma@example.com',
    phone: '+91 97015 33902',
    side: 'Mutual Friends',
    status: 'pending',
    partySize: 2,
    events: ['Sangeet Soirée', 'Grand Reception'],
    dietary: 'Pure Vegetarian',
    tableNumber: 'Unassigned',
    notes: 'Awaiting flight confirmation from Bengaluru.',
    updatedAt: '2 days ago',
  },
  {
    id: 'g-106',
    fullName: 'Lakshmi Narayana & Family',
    email: 'lakshmi.narayana@example.com',
    phone: '+91 94401 77219',
    side: 'Bride Family',
    status: 'attending',
    partySize: 5,
    events: ['Haldi & Mehendi', 'Muhurtham Ceremony', 'Grand Reception'],
    dietary: 'South Indian Traditional',
    tableNumber: 'Table 01 · Family VIP',
    updatedAt: '3 days ago',
  },
  {
    id: 'g-107',
    fullName: 'Niharika & Rohan Kulkarni',
    email: 'niharika.k@example.com',
    phone: '+91 99890 12044',
    side: 'Mutual Friends',
    status: 'pending',
    partySize: 2,
    events: ['Grand Reception'],
    dietary: 'Continental & Fusion',
    tableNumber: 'Unassigned',
    updatedAt: '3 days ago',
  },
  {
    id: 'g-108',
    fullName: 'Justice K. Subba Rao',
    email: 'subbarao.chambers@example.com',
    phone: '+91 98481 00932',
    side: 'Bride Family',
    status: 'attending',
    partySize: 2,
    events: ['Muhurtham Ceremony'],
    dietary: 'South Indian Traditional',
    tableNumber: 'Table 02 · Groom Family',
    notes: 'Protocol escort at Naren Gardens North Gate at 9:15 AM.',
    updatedAt: '4 days ago',
  },
  {
    id: 'g-109',
    fullName: 'Nikhil & Tanya Malhotra',
    email: 'nikhil.malhotra@example.com',
    phone: '+91 98112 64509',
    side: 'Groom Family',
    status: 'declined',
    partySize: 2,
    events: [],
    dietary: 'Pure Vegetarian',
    tableNumber: 'Unassigned',
    notes: 'Sent wedding gift hamper via Radha Gifts; travelling overseas.',
    updatedAt: '5 days ago',
  },
];

export const INITIAL_PLANNING_TASKS: PlanningTask[] = [
  {
    id: 't-1',
    phase: '12–9 Months Out',
    title: 'Lock auspicious Muhurtham date & book Naren Gardens Convention',
    category: 'Venue & Catering',
    completed: true,
    dueLabel: 'Completed · Oct 12',
    estimatedBudgetInr: 480000,
  },
  {
    id: 't-2',
    phase: '12–9 Months Out',
    title: 'Commission WedRaaga Documentary & Candid Photography team',
    category: 'Photography & Decor',
    completed: true,
    dueLabel: 'Completed · Nov 04',
    estimatedBudgetInr: 220000,
  },
  {
    id: 't-3',
    phase: '8–4 Months Out',
    title: 'Finalize floral mandap architecture & Sangeet stage lighting design',
    category: 'Photography & Decor',
    completed: true,
    dueLabel: 'Completed · Dec 18',
    estimatedBudgetInr: 340000,
  },
  {
    id: 't-4',
    phase: '8–4 Months Out',
    title: 'Curate bridal Kanjeevaram silk trousseau & Akriti bridal makeup trial',
    category: 'Attire & Beauty',
    completed: true,
    dueLabel: 'Completed · Jan 09',
    estimatedBudgetInr: 185000,
  },
  {
    id: 't-5',
    phase: '3–1 Months Out',
    title: 'Tasting session for traditional leaf banquet & Jain vegetarian counters',
    category: 'Venue & Catering',
    completed: false,
    dueLabel: 'Due in 14 days',
    estimatedBudgetInr: 620000,
  },
  {
    id: 't-6',
    phase: '3–1 Months Out',
    title: 'Confirm Sneha Mehendi Artists & Sangeet choreography schedule',
    category: 'Attire & Beauty',
    completed: false,
    dueLabel: 'Due in 21 days',
    estimatedBudgetInr: 95000,
  },
  {
    id: 't-7',
    phase: 'Wedding Week',
    title: 'Lock final guest RSVP headcount & VIP table seating chart',
    category: 'Guest & Rituals',
    completed: false,
    dueLabel: 'Due 7 days prior',
    estimatedBudgetInr: 45000,
  },
  {
    id: 't-8',
    phase: 'Wedding Week',
    title: 'Coordinate Pandit ritual samagri & Radha Gifts return hampers',
    category: 'Guest & Rituals',
    completed: false,
    dueLabel: 'Due 3 days prior',
    estimatedBudgetInr: 120000,
  },
];
