export type ProductMetric = {
  label: string;
  value: string;
};

export type ProductPlan = {
  id: string;
  name: string;
  price: string;
  period?: string;
  summary?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type ProductPageData = {
  hero: {
    eyebrow?: string;
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
    metrics: ProductMetric[];
  };
  offers: {
    title: string;
    description?: string;
    plans: ProductPlan[];
    note?: string;
  };
};

export const ISP_PRODUCT_PAGE: ProductPageData = {
  hero: {
    eyebrow: "Static ISP Proxies",
    title: "Buy Genuine Static Residential Proxies",
    description:
      "Experience high success rates, stability, security and speed with static residential proxies. Set up your access within minutes and manage sessions with ready-made dashboards.",
    cta: {
      label: "Buy Now",
      href: "https://soksline.com/buy/static-isp"
    },
    metrics: [
      { label: "Speed", value: "Up to 1 Gbps" },
      { label: "Supported ISPs", value: "37+" },
      { label: "Protocols", value: "HTTP/SOCKS5" },
      { label: "Bandwidth", value: "Unlimited" },
      { label: "Dedicated IPs", value: "Available" }
    ]
  },
  offers: {
    title: "Static ISP",
    description: "Pick a tier that matches your concurrency and geo requirements. Every plan comes with automation-ready APIs and instant delivery.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: "$5.90",
        period: "/month",
        summary: "Shared ISP pool with quick replacements for lightweight projects.",
        features: ["Shared subnets", "Sticky up to 24h", "Pay per IP"],
        ctaLabel: "Continue",
        ctaHref: "https://soksline.com/checkout/static-isp/basic"
      },
      {
        id: "dedicated",
        name: "Dedicated",
        price: "$18.90",
        period: "/month",
        summary: "Dedicated IPv4 access with configurable ASN and geo targeting.",
        features: ["Individual IPs", "City level targeting", "Unlimited bandwidth"],
        ctaLabel: "Continue",
        ctaHref: "https://soksline.com/checkout/static-isp/dedicated"
      },
      {
        id: "premium",
        name: "Premium",
        price: "$42.90",
        period: "/month",
        summary: "Enterprise grade pools with custom rotation windows and SLA.",
        features: ["Premium ASN", "99.99% uptime SLA", "Personal manager"],
        ctaLabel: "Continue",
        ctaHref: "https://soksline.com/checkout/static-isp/premium"
      }
    ],
    note: "Need custom volumes? Contact sales for bespoke ISP proxy pools."
  }
};

export const STATIC_RESIDENTIAL_PAGE: ProductPageData = {
  hero: {
    eyebrow: "Static Residential IPv6",
    title: "Buy Static Residential IPv6 Proxies",
    description:
      "Access the web safely and without restrictions with Static Residential IPv6. Combine fast response times with diverse geo coverage and manage sessions via dashboard or API.",
    cta: {
      label: "Buy Now",
      href: "https://soksline.com/buy/static-ipv6"
    },
    metrics: [
      { label: "Unique IP Addresses", value: "5B+" },
      { label: "Dedicated Nodes", value: "United States" },
      { label: "Protocols", value: "HTTP/SOCKS5" },
      { label: "Traffic up to 1 Gbps", value: "Unlimited" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  offers: {
    title: "Static ISP",
    description: "Simple plans with predictable pricing. IPv6 proxies deliver scale for large automation tasks.",
    plans: [
      {
        id: "dedicated-ipv6",
        name: "Dedicated IPv6",
        price: "$29.67",
        period: "/month",
        summary: "Dedicated IPv6 lines with instant provisioning and dashboard management.",
        features: ["Unlimited traffic", "Custom rotation", "API & dashboard"],
        ctaLabel: "Continue",
        ctaHref: "https://soksline.com/checkout/static-ipv6/dedicated"
      }
    ],
    note: "IPv6 works best with services that support the new protocol stack."
  }
};

export const ROTATING_RESIDENTIAL_PAGE: ProductPageData = {
  hero: {
    eyebrow: "Rotating Residential",
    title: "Buy Cheap Rotating Residential Proxies",
    description:
      "When you value anonymity, a high level of online security, and increased success in scraping activities — rotating residential proxies deliver. Rotate on schedule or via API triggers.",
    cta: {
      label: "Buy Now",
      href: "https://soksline.com/buy/rotating"
    },
    metrics: [
      { label: "IP Addresses", value: "85M+" },
      { label: "Available Countries", value: "180+" },
      { label: "Protocols", value: "HTTP/SOCKS5" },
      { label: "Targeting", value: "Country / City" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  offers: {
    title: "Rotating Residential",
    description: "Choose the traffic type that fits your workload. Transparent pricing with predictable billing.",
    plans: [
      {
        id: "bandwidth",
        name: "Bandwidth Pool",
        price: "$24.95",
        period: "/GB",
        summary: "Pay per traffic with granular limits and country selection.",
        features: ["API rotation", "Sticky up to 30 min", "Unlimited concurrency"],
        ctaLabel: "Continue",
        ctaHref: "https://soksline.com/checkout/rotating/bandwidth"
      }
    ],
    note: "Custom compliance or KYC requirements available upon request."
  }
};
