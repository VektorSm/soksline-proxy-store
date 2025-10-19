"use client";
import React from "react";

type Props = { className?: string };

export default function BackgroundHex({ className = "" }: Props) {
  if (process.env.NEXT_PUBLIC_ENABLE_HEX_BG === "false") return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
    >
      {/* Базовый мягкий вертикальный градиент, чтобы не было «белой прослойки» */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.06),rgba(59,130,246,0.04)_22%,transparent_55%)]" />

      {/* Hex grid: без общей opacity, прозрачность задаём в цвете линий */}
      <div
        className={`
          absolute inset-0 select-none
          [background-image:
            repeating-linear-gradient(0deg,rgba(28,144,255,0.10)_0,rgba(28,144,255,0.10)_1px,transparent_1px,transparent_24px),
            repeating-linear-gradient(60deg,rgba(28,144,255,0.10)_0,rgba(28,144,255,0.10)_1px,transparent_1px,transparent_24px),
            repeating-linear-gradient(120deg,rgba(28,144,255,0.10)_0,rgba(28,144,255,0.10)_1px,transparent_1px,transparent_24px)
          ]
          [mask-image:radial-gradient(120%_70%_at_50%_8%,#000_0%,transparent_70%)]
        `}
      />

      {/* Чуть более редкая сетка для мобильных, чтобы не «шумела» */}
      <div
        className={`
          absolute inset-0 select-none md:hidden
          [background-image:
            repeating-linear-gradient(0deg,rgba(28,144,255,0.09)_0,rgba(28,144,255,0.09)_1px,transparent_1px,transparent_28px),
            repeating-linear-gradient(60deg,rgba(28,144,255,0.09)_0,rgba(28,144,255,0.09)_1px,transparent_1px,transparent_28px),
            repeating-linear-gradient(120deg,rgba(28,144,255,0.09)_0,rgba(28,144,255,0.09)_1px,transparent_1px,transparent_28px)
          ]
          [mask-image:radial-gradient(120%_80%_at_50%_10%,#000_0%,transparent_75%)]
        `}
      />
    </div>
  );
}
