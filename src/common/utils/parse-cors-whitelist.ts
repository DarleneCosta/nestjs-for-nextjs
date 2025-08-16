export function parseCorsWhitelist(corsWhitelist: string) {
  return corsWhitelist
    .split(/\s+/g)
    .map(url => url.replace(/\/+$/, ''))
    .filter(Boolean); //remove urls vazias
}
