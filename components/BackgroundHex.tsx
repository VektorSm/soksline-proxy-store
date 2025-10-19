// components/BackgroundHex.tsx
"use client";
import React from "react";

type Props = { className?: string };

export default function BackgroundHex({ className = "" }: Props) {
  if (process.env.NEXT_PUBLIC_ENABLE_HEX_BG === "false") return null;

  // Параметры сетки
  const line = "rgba(28,144,255,0.12)"; // можно усилить до 0.14 при желании
  const step = 24; // уменьшить до 20, чтобы сделать сетку гуще

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    >
      {/* 1) Базовый мягкий градиент сверху — убирает белую полосу */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(243,250,255,1) 0%, rgba(34,211,238,0.10) 14%, rgba(59,130,246,0.08) 26%, rgba(255,255,255,0) 62%)",
        }}
      />

      {/* 2) Сама hex-сетка: три повторяющихся линейных градиента */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, ${line} 0, ${line} 1px, transparent 1px, transparent ${step}px),
            repeating-linear-gradient(60deg, ${line} 0, ${line} 1px, transparent 1px, transparent ${step}px),
            repeating-linear-gradient(120deg, ${line} 0, ${line} 1px, transparent 1px, transparent ${step}px)
          `,
          backgroundRepeat: "repeat",
          // мягко растворяем к краям/к верху, чтобы не спорило с шапкой
          maskImage:
            "radial-gradient(120% 80% at 50% 8%, black 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 8%, black 0%, transparent 78%)",
        }}
      />

      {/* 3) Мобильная корректировка (реже сетка) */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(28,144,255,0.10) 0, rgba(28,144,255,0.10) 1px, transparent 1px, transparent 28px),
            repeating-linear-gradient(60deg, rgba(28,144,255,0.10) 0, rgba(28,144,255,0.10) 1px, transparent 1px, transparent 28px),
            repeating-linear-gradient(120deg, rgba(28,144,255,0.10) 0, rgba(28,144,255,0.10) 1px, transparent 1px, transparent 28px)
          `,
          backgroundRepeat: "repeat",
          maskImage:
            "radial-gradient(130% 90% at 50% 10%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(130% 90% at 50% 10%, black 0%, transparent 80%)",
        }}
      />
    </div>
  );
}
