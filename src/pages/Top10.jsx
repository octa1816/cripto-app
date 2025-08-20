import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { getTop10 } from "../lib/api.js";
import CoinRow from "../components/CoinRow.jsx";

export default function Top10() {
  const { currency } = useOutletContext();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("market_cap"); // 'price' | 'change' etc.

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTop10(currency)
      .then((data) => setCoins(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [currency]);

  const filtered = coins
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.symbol.toLowerCase().includes(q.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "price") return b.current_price - a.current_price;
      if (sort === "change")
        return (
          (b.price_change_percentage_24h ?? 0) -
          (a.price_change_percentage_24h ?? 0)
        );
      return b.market_cap - a.market_cap;
    });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h1>Top 10 Cryptos</h1>
      <div className="toolbar">
        <input
          placeholder="Buscar (btc, eth…)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="market_cap">Market Cap</option>
          <option value="price">Precio</option>
          <option value="change">% 24h</option>
        </select>
      </div>

      <div className="table">
        <div className="thead">
          <span>#</span>
          <span>Nombre</span>
          <span>Precio</span>
          <span>% 24h</span>
          <span>Gráfico 7d</span>
        </div>
        {filtered.map((c, i) => (
          <Link key={c.id} to={`/coin/${c.id}`}>
            <CoinRow index={i + 1} coin={c} currency={currency} />
          </Link>
        ))}
      </div>
    </section>
  );
}
