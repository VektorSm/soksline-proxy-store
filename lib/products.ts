export type Product = {
  name: string;
  price?: string;         // строкой, чтобы легко писать "from $X"
  features?: string[];
};

export type Category = {
  id: "isp" | "ipv6" | "rotating";
  title: string;
  items: Product[];
  note?: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "isp",
    title: "Static Residential (ISP)",
    items: [
      { name: "US / EU (shared pool)", price: "from $2.50/IP", features: ["Sticky", "HTTP/SOCKS", "KYC free"] },
      { name: "Dedicated country",      price: "from $3.50/IP", features: ["Geo-targeting", "Replace 1x/mo"] }
    ],
    note: "Оптимально для стабильных задач: антидетект, кабинеты, маркетплейсы."
  },
  {
    id: "ipv6",
    title: "Static Residential (ISP) IPv6",
    items: [
      { name: "Global IPv6 pool", price: "from $1.20/IP", features: ["IPv6 only", "High throughput"] },
      { name: "Country IPv6",     price: "from $1.60/IP", features: ["Geo-targeting", "Low price per IP"] }
    ],
    note: "IPv6 — дешево и быстро; убедись, что целевые сайты поддерживают IPv6."
  },
  {
    id: "rotating",
    title: "Rotating Residential",
    items: [
      { name: "Standard rotation", price: "from $10/GB", features: ["Residential pool", "Sticky up to 30 min"] },
      { name: "Premium rotation",  price: "from $15/GB", features: ["Low spam", "Top ISPs"] }
    ],
    note: "Ротация для парсинга/скрейпа и высоких объёмов."
  }
];
