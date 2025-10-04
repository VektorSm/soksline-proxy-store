export function isExternal(href: string) {
  try {
    const u = new URL(href, 'http://local');
    return !!u.host && /^(https?:)?\/\//.test(href) && !/^\/(?!\/)/.test(href);
  } catch {
    return false;
  }
}
