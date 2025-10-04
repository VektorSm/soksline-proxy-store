'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import { useI18n } from '@/lib/i18n';

interface NavLinkProps
  extends Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'> {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  style?: CSSProperties;
  activeStyle?: CSSProperties;
  inactiveStyle?: CSSProperties;
}

export default function NavLink({
  href,
  children,
  className,
  activeClassName,
  inactiveClassName,
  style,
  activeStyle,
  inactiveStyle,
  ...rest
}: NavLinkProps) {
  const pathname = usePathname();
  const { locale } = useI18n();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
  const classNames = clsx(className, isActive ? activeClassName : inactiveClassName);
  const stateStyle = (isActive ? activeStyle : inactiveStyle) ?? undefined;
  const mergedStyle: CSSProperties | undefined =
    style || stateStyle ? { ...(style ?? {}), ...(stateStyle ?? {}) } : undefined;

  let finalHref = href;
  if (href.startsWith('/')) {
    const [path, queryString] = href.split('?');
    const params = new URLSearchParams(queryString ?? '');
    if (locale && locale !== 'en') {
      params.set('lang', locale);
    } else {
      params.delete('lang');
    }
    const query = params.toString();
    finalHref = query ? `${path}?${query}` : path;
  }

  return (
    <Link
      href={finalHref}
      aria-current={isActive ? 'page' : undefined}
      className={classNames}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Link>
  );
}
