export type Verdict = "real" | "inflated" | "fake";

export type Offer = {
  platform: "Amazon" | "Flipkart" | "Myntra" | "Croma" | "Reliance";
  price: number;
  originalPrice: number;
  delivery: string;
  warranty: string;
  cashback: number;
  sellerScore: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  currentPrice: number;
  listedOriginal: number;
  historicalLow: number;
  verdict: Verdict;
  aiConfidence: number;
  offers: Offer[];
  priceHistory: { date: string; price: number; event?: string }[];
  prediction: { wait: boolean; days: number; expected: number };
};

const today = new Date();
const d = (offset: number) => {
  const x = new Date(today);
  x.setDate(x.getDate() - offset);
  return x.toISOString().slice(5, 10);
};

export const products: Product[] = [
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    category: "Audio",
    image: "🎧",
    rating: 4.7,
    reviews: 28412,
    currentPrice: 24990,
    listedOriginal: 34990,
    historicalLow: 22499,
    verdict: "inflated",
    aiConfidence: 92,
    offers: [
      { platform: "Amazon", price: 24990, originalPrice: 34990, delivery: "Tomorrow", warranty: "1 yr", cashback: 750, sellerScore: 94 },
      { platform: "Flipkart", price: 25499, originalPrice: 29990, delivery: "2 days", warranty: "1 yr", cashback: 500, sellerScore: 88 },
      { platform: "Croma", price: 26490, originalPrice: 29990, delivery: "3 days", warranty: "2 yr", cashback: 0, sellerScore: 96 },
      { platform: "Reliance", price: 27990, originalPrice: 34990, delivery: "4 days", warranty: "1 yr", cashback: 1000, sellerScore: 82 },
    ],
    priceHistory: [
      { date: d(180), price: 23990 },
      { date: d(150), price: 22999 },
      { date: d(120), price: 22499, event: "All-time low" },
      { date: d(90), price: 23990 },
      { date: d(60), price: 24990 },
      { date: d(30), price: 29990, event: "Price raised" },
      { date: d(14), price: 34990, event: "Inflated for sale" },
      { date: d(0), price: 24990, event: "Sale price" },
    ],
    prediction: { wait: true, days: 11, expected: 22999 },
  },
  {
    id: "iphone-15-pro",
    name: "Apple iPhone 15 Pro 256GB Titanium",
    brand: "Apple",
    category: "Phones",
    image: "📱",
    rating: 4.8,
    reviews: 14203,
    currentPrice: 124900,
    listedOriginal: 134900,
    historicalLow: 119900,
    verdict: "real",
    aiConfidence: 88,
    offers: [
      { platform: "Amazon", price: 124900, originalPrice: 134900, delivery: "Tomorrow", warranty: "1 yr", cashback: 5000, sellerScore: 97 },
      { platform: "Flipkart", price: 125499, originalPrice: 134900, delivery: "2 days", warranty: "1 yr", cashback: 4000, sellerScore: 93 },
      { platform: "Croma", price: 129900, originalPrice: 134900, delivery: "Today", warranty: "1 yr", cashback: 2500, sellerScore: 95 },
    ],
    priceHistory: [
      { date: d(180), price: 134900 },
      { date: d(120), price: 131900 },
      { date: d(90), price: 129900 },
      { date: d(60), price: 127900 },
      { date: d(30), price: 126900 },
      { date: d(14), price: 125900 },
      { date: d(0), price: 124900, event: "Lowest in 90 days" },
    ],
    prediction: { wait: false, days: 0, expected: 124900 },
  },
  {
    id: "ng-blender",
    name: "Nutri Pro Blender 1200W",
    brand: "NutriCo",
    category: "Kitchen",
    image: "🥤",
    rating: 4.1,
    reviews: 1842,
    currentPrice: 3499,
    listedOriginal: 8999,
    historicalLow: 3299,
    verdict: "fake",
    aiConfidence: 97,
    offers: [
      { platform: "Amazon", price: 3499, originalPrice: 8999, delivery: "3 days", warranty: "6 mo", cashback: 0, sellerScore: 41 },
      { platform: "Flipkart", price: 3399, originalPrice: 4999, delivery: "2 days", warranty: "6 mo", cashback: 0, sellerScore: 68 },
    ],
    priceHistory: [
      { date: d(180), price: 3299 },
      { date: d(120), price: 3499 },
      { date: d(60), price: 3599 },
      { date: d(30), price: 5999, event: "Inflated" },
      { date: d(14), price: 8999, event: "Inflated x2" },
      { date: d(0), price: 3499, event: "Fake 60% off" },
    ],
    prediction: { wait: false, days: 0, expected: 3399 },
  },
  {
    id: "dyson-v15",
    name: "Dyson V15 Detect Cordless Vacuum",
    brand: "Dyson",
    category: "Home",
    image: "🧹",
    rating: 4.6,
    reviews: 6712,
    currentPrice: 58900,
    listedOriginal: 71900,
    historicalLow: 56990,
    verdict: "real",
    aiConfidence: 81,
    offers: [
      { platform: "Amazon", price: 58900, originalPrice: 71900, delivery: "2 days", warranty: "2 yr", cashback: 2000, sellerScore: 92 },
      { platform: "Reliance", price: 59990, originalPrice: 71900, delivery: "3 days", warranty: "2 yr", cashback: 1500, sellerScore: 89 },
    ],
    priceHistory: [
      { date: d(180), price: 65900 },
      { date: d(120), price: 62900 },
      { date: d(60), price: 60900 },
      { date: d(30), price: 59900 },
      { date: d(0), price: 58900 },
    ],
    prediction: { wait: true, days: 18, expected: 56990 },
  },
];

export const trendingDeals = products.slice(0, 4);

export const categories = [
  { name: "Phones", icon: "📱", count: 1240 },
  { name: "Audio", icon: "🎧", count: 892 },
  { name: "Laptops", icon: "💻", count: 678 },
  { name: "Fashion", icon: "👟", count: 4210 },
  { name: "Kitchen", icon: "🥤", count: 1503 },
  { name: "Home", icon: "🛋️", count: 2180 },
  { name: "Beauty", icon: "💄", count: 990 },
  { name: "Gaming", icon: "🎮", count: 562 },
];

export const sellers = [
  {
    id: "appario",
    name: "Appario Retail",
    score: 96,
    badge: "Verified Seller",
    trustedBy: "120k+ users",
    metrics: {
      returnReliability: 98,
      deliveryConsistency: 97,
      fakeComplaints: 2,
      support: 94,
      refundSpeed: 95,
    },
    sentiment: { positive: 82, neutral: 13, negative: 5 },
  },
  {
    id: "cloudtail",
    name: "Cloudtail India",
    score: 88,
    badge: "Trusted",
    trustedBy: "60k+ users",
    metrics: {
      returnReliability: 90,
      deliveryConsistency: 92,
      fakeComplaints: 6,
      support: 85,
      refundSpeed: 84,
    },
    sentiment: { positive: 71, neutral: 19, negative: 10 },
  },
  {
    id: "nutricoofficial",
    name: "NutriCo Official",
    score: 41,
    badge: "High Return Risk",
    trustedBy: "Reported by 312",
    metrics: {
      returnReliability: 32,
      deliveryConsistency: 51,
      fakeComplaints: 47,
      support: 38,
      refundSpeed: 29,
    },
    sentiment: { positive: 28, neutral: 22, negative: 50 },
  },
];

export const alerts = [
  { id: 1, type: "fake", title: "Fake 60% Off detected", body: "Nutri Pro Blender price was inflated 2 weeks before the sale.", time: "2m" },
  { id: 2, type: "drop", title: "Price drop on your wishlist", body: "Sony WH-1000XM5 dropped ₹1,499 on Amazon.", time: "1h" },
  { id: 3, type: "seller", title: "Seller risk increased", body: "BargainHub now flagged as High Return Risk (41/100).", time: "4h" },
  { id: 4, type: "drop", title: "Predicted low approaching", body: "iPhone 15 Pro likely to hit ₹119,900 in 11 days.", time: "1d" },
];

export const spendingByMonth = [
  { m: "Jul", spent: 12400, saved: 3200 },
  { m: "Aug", spent: 8900, saved: 1800 },
  { m: "Sep", spent: 15600, saved: 4900 },
  { m: "Oct", spent: 7200, saved: 2400 },
  { m: "Nov", spent: 22100, saved: 8700 },
  { m: "Dec", spent: 18400, saved: 6100 },
];

export const bestDaysToBuy = [
  { day: "Mon", score: 42 },
  { day: "Tue", score: 71 },
  { day: "Wed", score: 88 },
  { day: "Thu", score: 65 },
  { day: "Fri", score: 54 },
  { day: "Sat", score: 31 },
  { day: "Sun", score: 28 },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id) ?? products[0];
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
