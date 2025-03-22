export function domainAttacher(domain: string, url: string) {
  return !domain
    ? url
    : url
      ? url.startsWith('http')
        ? url
        : `${domain.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
      : '';
}
