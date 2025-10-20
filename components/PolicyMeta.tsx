import React from "react";

export default function PolicyMeta({
  iso,
  children,
  className = "",
}: {
  iso: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`mt-2 text-sm text-gray-600 leading-6 ${className}`}>
      <span className="font-semibold text-gray-800">Last updated:</span>{" "}
      <time dateTime={iso} className="font-medium text-gray-700">
        {children}
      </time>
    </p>
  );
}
