'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded bg-gray-900 px-3 py-2 text-white"
    >
      Skip to content
    </a>
  );
}
