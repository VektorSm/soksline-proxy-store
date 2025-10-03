export type PricingMode = "perGb" | "perPackage";

export type RotatingTier = {
  id: string;
  gb: number;
  pricePerGbUsd?: number;
  totalUsd?: number;
  badge?: string;
};

export type RotatingPricing = {
  mode: PricingMode;
  tiers: RotatingTier[];
};

export const rotatingPricing: RotatingPricing = {
  mode: "perGb",
  tiers: [
    {
      id: "rotating-3",
      gb: 3,
      totalUsd: 14.99,
    },
    {
      id: "rotating-10",
      gb: 10,
      totalUsd: 49.99,
    },
    {
      id: "rotating-50",
      gb: 50,
      totalUsd: 199.99,
    },
  ],
};
