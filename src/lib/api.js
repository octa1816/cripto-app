const BASE = "https://api.coingecko.com/api/v3";

export async function getTop10(vs = "usd") {
  const url = `${BASE}/coins/markets?vs_currency=${vs}&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error cargando Top 10");
  return res.json();
}

export async function getCoin(id) {
  const res = await fetch(`${BASE}/coins/${id}`);
  if (!res.ok) throw new Error("No se pudo cargar la moneda");
  return res.json();
}

export async function getCoinsByIds(ids = [], vs = "usd") {
  if (!ids.length) return [];
  const url = `${BASE}/coins/markets?vs_currency=${vs}&ids=${ids.join(
    ","
  )}&order=market_cap_desc&per_page=${
    ids.length
  }&page=1&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(encodeURI(url));
  if (!res.ok) throw new Error("No se pudo cargar la watchlist");
  return res.json();
}

export async function getCoinMarketChart(id, vs = "usd", days = 7) {
  const res = await fetch(
    `${BASE}/coins/${id}/market_chart?vs_currency=${vs}&days=${days}`
  );
  if (!res.ok) throw new Error("No se pudo cargar el histórico");
  return res.json();
}
