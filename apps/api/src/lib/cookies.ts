export function parseCookieHeader(header?: string): Record<string, string> {
  if (!header) {
    return {};
  }
  return header.split(";").reduce<Record<string, string>>((acc, part) => {
    const [rawKey, ...rest] = part.split("=");
    const key = rawKey?.trim();
    if (!key) {
      return acc;
    }
    acc[key] = decodeURIComponent(rest.join("=").trim());
    return acc;
  }, {});
}
