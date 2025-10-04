import Link from 'next/link';

export default function ExternalLink({
  href,
  children,
  className = '',
  ariaLabel,
  role,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  role?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      role={role}
      className={`inline-flex items-center gap-1 ${className}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
