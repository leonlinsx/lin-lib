export function buildPaginationHref(page: number, activeCategory?: string) {
  const normalizedPage = Math.max(1, Math.trunc(page));
  const pageSuffix = normalizedPage === 1 ? '' : `/${normalizedPage}`;

  if (activeCategory) {
    return `/writing/category/${encodeURIComponent(activeCategory)}${pageSuffix}`;
  }

  return `/writing${pageSuffix}`;
}
