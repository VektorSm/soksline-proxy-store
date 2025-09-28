export type PricingTier = {
  id: string;
  name: string;
  headline?: string;
  price: string;
  period: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref: string;
  ribbon?: string;
};

export type PricingCategory = {
  id: string;
  label: string;
  tiers: PricingTier[];
};

export type PricingPageData = {
  slug: string;
  title: string;
  subtitle: string;
  highlight: string;
  categories: PricingCategory[];
  paymentNote: string;
  paymentMethods: string[];
};

const ORDER_LINK = "https://soksline.com/order";

export const STATIC_RESIDENTIAL_PRICING: PricingPageData = {
  slug: "static-residential",
  title: "Static Residential Proxy Plans – Speeds Up To 1Gbps",
  subtitle:
    "Static residential proxies to guarantee consistent access for as long as you need.",
  highlight: "Reliable residential IPs • High-performance routing • Sticky sessions",
  paymentNote: "SSL Secure Payment. Your information is protected by 256-bit SSL.",
  paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
  categories: [
    {
      id: "basic",
      label: "Basic",
      tiers: [
        {
          id: "trial",
          name: "7 Day Trial",
          price: "$1.99",
          period: "per proxy",
          features: [
            "Unlimited Bandwidth",
            "Unlimited Threads",
            "Sticky Sessions",
            "SOCKS5 and HTTP/S",
            "Country & ISP-level targeting"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "month",
          name: "1 Month",
          headline: "Most Popular",
          price: "$1.49",
          period: "per proxy",
          ribbon: "BEST FORMULA",
          features: [
            "Unlimited Bandwidth",
            "Unlimited Threads",
            "Sticky Sessions",
            "SOCKS5 and HTTP/S",
            "Country & ISP-level targeting"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "year",
          name: "12 Months",
          headline: "Save 15%",
          price: "$1.27",
          period: "per proxy",
          features: [
            "Unlimited Bandwidth",
            "Unlimited Threads",
            "Sticky Sessions",
            "SOCKS5 and HTTP/S",
            "Country & ISP-level targeting"
          ],
          ctaHref: ORDER_LINK
        }
      ]
    },
    {
      id: "premium",
      label: "Premium",
      tiers: [
        {
          id: "premium-25",
          name: "25 Proxies",
          price: "$2.39",
          period: "per proxy / month",
          features: [
            "Unlimited Bandwidth",
            "Dedicated Subnets",
            "Sticky Sessions",
            "Dual Authentication",
            "Priority Support"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "premium-100",
          name: "100 Proxies",
          ribbon: "SAVE 10%",
          price: "$2.19",
          period: "per proxy / month",
          features: [
            "Unlimited Bandwidth",
            "Dedicated Subnets",
            "Sticky Sessions",
            "Dual Authentication",
            "Priority Support"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "premium-250",
          name: "250 Proxies",
          price: "$1.99",
          period: "per proxy / month",
          features: [
            "Unlimited Bandwidth",
            "Dedicated Subnets",
            "Sticky Sessions",
            "Dual Authentication",
            "Priority Support"
          ],
          ctaHref: ORDER_LINK
        }
      ]
    }
  ]
};

export const STATIC_IPV6_PRICING: PricingPageData = {
  slug: "static-residential-ipv6",
  title: "Affordable IPv6 Static Residential Proxy Pricing & Plans",
  subtitle:
    "Access the web safely and without any restrictions with Static Residential Proxies IPv6 for all your needs.",
  highlight: "Flexible pricing • SOCKS5 and HTTP support • Rotating subnets",
  paymentNote: "SSL Secure Payment. Your information is protected by 256-bit SSL.",
  paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
  categories: [
    {
      id: "monthly",
      label: "Monthly",
      tiers: [
        {
          id: "ipv6-10",
          name: "10 Proxies",
          price: "$0.63",
          period: "per proxy per month",
          features: [
            "Unlimited Bandwidth",
            "100 Threads",
            "Sticky Sessions",
            "SOCKS5 & HTTP/S",
            "Geo Targeting"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "ipv6-100",
          name: "100 Proxies",
          ribbon: "SAVE 5%",
          price: "$0.59",
          period: "per proxy per month",
          features: [
            "Unlimited Bandwidth",
            "100 Threads",
            "Sticky Sessions",
            "SOCKS5 & HTTP/S",
            "Geo Targeting"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "ipv6-500",
          name: "500 Proxies",
          price: "$0.57",
          period: "per proxy per month",
          features: [
            "Unlimited Bandwidth",
            "100 Threads",
            "Sticky Sessions",
            "SOCKS5 & HTTP/S",
            "Geo Targeting"
          ],
          ctaHref: ORDER_LINK
        }
      ]
    },
    {
      id: "yearly",
      label: "Yearly",
      tiers: [
        {
          id: "ipv6-year-10",
          name: "10 Proxies",
          price: "$0.52",
          period: "per proxy per month",
          features: [
            "Unlimited Bandwidth",
            "100 Threads",
            "Sticky Sessions",
            "SOCKS5 & HTTP/S",
            "Geo Targeting"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "ipv6-year-100",
          name: "100 Proxies",
          ribbon: "SAVE 10%",
          price: "$0.49",
          period: "per proxy per month",
          features: [
            "Unlimited Bandwidth",
            "100 Threads",
            "Sticky Sessions",
            "SOCKS5 & HTTP/S",
            "Geo Targeting"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "ipv6-year-500",
          name: "500 Proxies",
          price: "$0.45",
          period: "per proxy per month",
          features: [
            "Unlimited Bandwidth",
            "100 Threads",
            "Sticky Sessions",
            "SOCKS5 & HTTP/S",
            "Geo Targeting"
          ],
          ctaHref: ORDER_LINK
        }
      ]
    }
  ]
};

export const ROTATING_RESIDENTIAL_PRICING: PricingPageData = {
  slug: "rotating-residential",
  title: "Rotating Residential Proxy Plans – Access 6M+ Global IPs",
  subtitle:
    "Get Residential Proxies with 6 million+ residential IP addresses. Access to 100+ countries.",
  highlight: "Affordable pricing • Unlimited threads • Sticky/rotating sessions",
  paymentNote: "SSL Secure Payment. Your information is protected by 256-bit SSL.",
  paymentMethods: ["Visa", "Mastercard", "AMEX", "PayPal", "BTC", "USDT"],
  categories: [
    {
      id: "payg",
      label: "Pay-as-you-go",
      tiers: [
        {
          id: "payg-1",
          name: "1 GB",
          price: "$4.99",
          period: "per GB",
          features: [
            "User/Password",
            "Unlimited Threads",
            "Sticky/Rotating Sessions",
            "SOCKS5 and HTTP/S",
            "< 100 Mbps"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "payg-50",
          name: "50 GB",
          price: "$4.99",
          period: "per GB",
          features: [
            "User/Password",
            "Unlimited Threads",
            "Sticky/Rotating Sessions",
            "SOCKS5 and HTTP/S",
            "< 100 Mbps"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "payg-100",
          name: "100 GB",
          price: "$4.99",
          period: "per GB",
          features: [
            "User/Password",
            "Unlimited Threads",
            "Sticky/Rotating Sessions",
            "SOCKS5 and HTTP/S",
            "< 100 Mbps"
          ],
          ctaHref: ORDER_LINK
        }
      ]
    },
    {
      id: "large",
      label: "Large Package",
      tiers: [
        {
          id: "large-100",
          name: "100 GB",
          price: "$4.49",
          period: "per GB",
          ribbon: "SAVE 5%",
          features: [
            "User/Password",
            "Unlimited Threads",
            "Sticky/Rotating Sessions",
            "SOCKS5 and HTTP/S",
            "< 100 Mbps"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "large-250",
          name: "250 GB",
          price: "$4.29",
          period: "per GB",
          features: [
            "User/Password",
            "Unlimited Threads",
            "Sticky/Rotating Sessions",
            "SOCKS5 and HTTP/S",
            "< 100 Mbps"
          ],
          ctaHref: ORDER_LINK
        },
        {
          id: "large-500",
          name: "500 GB",
          price: "$3.99",
          period: "per GB",
          features: [
            "User/Password",
            "Unlimited Threads",
            "Sticky/Rotating Sessions",
            "SOCKS5 and HTTP/S",
            "< 100 Mbps"
          ],
          ctaHref: ORDER_LINK
        }
      ]
    }
  ]
};
