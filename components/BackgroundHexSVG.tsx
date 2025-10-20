"use client";

import { useMemo, type JSX } from "react";

type Props = {
  /** "hero" — ярче; "section" — тише */
  variant?: "hero" | "section";
  /** радиус гекса (расстояние от центра до вершины), px в системе viewBox */
  hexR?: number;
  className?: string;
  /** высота виртуального полотна (viewBox). Ширина фиксирована 1920, чтобы было cover-скалирование */
  vbHeight?: number;
};

export default function BackgroundHexSVG({
  variant = "hero",
  hexR = variant === "hero" ? 22 : 18,
  vbHeight = variant === "hero" ? 600 : 520,
  className = "",
}: Props) {
  // Цвет/прозрачность линии и маска в зависимости от варианта
  const stroke = variant === "hero" ? "rgba(28,144,255,0.12)" : "rgba(28,144,255,0.06)";
  const maskTopStop = variant === "hero" ? "70%" : "80%";

  // геометрия гекса (pointy-top)
  const W = 1920;
  const H = vbHeight;
  const r = hexR;                      // радиус
  const h = Math.sqrt(3) * r;          // высота гекса
  const colStep = 1.5 * r;             // шаг по X между центрами
  const rowsPerCol = Math.ceil(H / h) + 2;
  const cols = Math.ceil(W / colStep) + 2;

  const polys = useMemo(() => {
    const pts = (cx: number, cy: number) => {
      const a = (Math.sqrt(3) / 2) * r; // горизонтальный сдвиг к вершинам
      // 6 вершин по часовой стрелке (pointy-top)
      return [
        [cx, cy - r],
        [cx + a, cy - r / 2],
        [cx + a, cy + r / 2],
        [cx, cy + r],
        [cx - a, cy + r / 2],
        [cx - a, cy - r / 2],
      ]
        .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
        .join(" ");
    };

    const items: JSX.Element[] = [];
    for (let c = -1; c < cols; c++) {
      const x = r + c * colStep;
      const yOffset = (c % 2 === 0 ? h / 2 : 0);
      for (let rIdx = -1; rIdx < rowsPerCol; rIdx++) {
        const y = yOffset + rIdx * h;
        items.push(
          <polygon
            key={`${c}-${rIdx}`}
            points={pts(x, y)}
            fill="none"
            stroke={stroke}
            strokeWidth={1}
          />
        );
      }
    }
    return items;
  }, [cols, rowsPerCol, r, h, stroke, colStep]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        // мягко растворяем к краям/к верху, чтобы не спорило с навбаром
        maskImage: `radial-gradient(120% 80% at 50% 8%, black 0%, transparent ${maskTopStop})`,
        WebkitMaskImage: `radial-gradient(120% 80% at 50% 8%, black 0%, transparent ${maskTopStop})`,
      }}
    >
      {/* лёгкий фон-градиент под сеткой, чтобы убрать любые «белые прослойки» */}
      {variant === "hero" && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(243,250,255,1) 0%, rgba(34,211,238,0.10) 14%, rgba(59,130,246,0.08) 26%, rgba(255,255,255,0) 62%)",
          }}
        />
      )}

      {/* сама сетка */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <g>{polys}</g>
      </svg>
    </div>
  );
}
