import React from "react";
import clsx from "clsx";

/**
 * Разделение крупных блоков — только фоном (bg-white/bg-gray-50) и вертикальными отступами (py-*).
 * Не использовать бордеры/<hr> для секций.
 */
type Props = React.HTMLAttributes<HTMLElement> & {
  bg?: "white" | "muted";
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export default function Section({
  bg = "white",
  id,
  className = "",
  containerClassName = "",
  children,
  ...rest
}: Props) {
  const variant = bg === "muted" ? "muted" : "white";

  return (
    <section
      id={id}
      data-variant={variant}
      className={clsx(
        variant === "muted" ? "bg-gray-50" : "bg-white",
        "py-12 sm:py-16",
        className
      )}
      {...rest}
    >
      <div className={clsx("mx-auto max-w-6xl px-4", containerClassName)}>{children}</div>
    </section>
  );
}
