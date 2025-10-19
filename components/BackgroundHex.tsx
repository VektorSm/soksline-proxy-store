// components/BackgroundHex.tsx
// Лёгкий фон: глоу + псевдо hex-grid линиями (через CSS), без затемнения базы
// По умолчанию для светлой темы — полупрозрачный и ненавязчивый.

"use client";

import React from "react";

type Props = {
  className?: string;
};

export default function BackgroundHex({ className = "" }: Props) {
  // Фича-флаг: можно отключить фоновый слой через переменную окружения.
  if (process.env.NEXT_PUBLIC_ENABLE_HEX_BG === "false") return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
    >
      {/* Мягкие цветовые пятна (очень слабые) */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(34,211,238,0.10)_0%,rgba(34,211,238,0)_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_85%_25%,rgba(59,130,246,0.10)_0%,rgba(59,130,246,0)_60%)]" />

      {/* Псевдо Hex Grid из трёх повторяющихся линий (0°, 60°, 120°) */}
      <div
        className={`
          absolute inset-0 opacity-10
          [background-image:
            repeating-linear-gradient(0deg,rgba(154,208,255,0.75)_0,rgba(154,208,255,0.75)_1px,transparent_1px,transparent_24px),
            repeating-linear-gradient(60deg,rgba(154,208,255,0.75)_0,rgba(154,208,255,0.75)_1px,transparent_1px,transparent_24px),
            repeating-linear-gradient(120deg,rgba(154,208,255,0.75)_0,rgba(154,208,255,0.75)_1px,transparent_1px,transparent_24px)
          ]
        `}
      />

      {/* Адаптация под мобильные: чуть реже сетка, чтобы не «шумела» */}
      <div
        className={`
          absolute inset-0 opacity-10 md:hidden
          [background-image:
            repeating-linear-gradient(0deg,rgba(154,208,255,0.6)_0,rgba(154,208,255,0.6)_1px,transparent_1px,transparent_28px),
            repeating-linear-gradient(60deg,rgba(154,208,255,0.6)_0,rgba(154,208,255,0.6)_1px,transparent_1px,transparent_28px),
            repeating-linear-gradient(120deg,rgba(154,208,255,0.6)_0,rgba(154,208,255,0.6)_1px,transparent_1px,transparent_28px)
          ]
          mix-blend-normal
        `}
      />
    </div>
  );
}
