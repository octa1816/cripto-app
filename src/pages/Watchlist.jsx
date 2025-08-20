import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getCoinsByIds } from "../lib/api";

export default function Watchlist() {
  const { currency } = useOutletContext();
  const [ids] = useLocalStorage("watchlist", []);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      if (!ids.length) {
        setCoins([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getCoinsByIds(ids, currency);
        if (!ignore) setCoins(data);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [ids, currency]);

  if (!ids.length) {
    return (
      <p>
        No tenés favoritos aún. Volvé al <Link to="/">Top 10</Link> y tocá la ★.
      </p>
    );
  }

  if (loading) return <p>Cargando favoritos…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h1>Tu Watchlist</h1>
      <div className="table">
        <div className="thead">
          <span>#</span>
          <span>Nombre</span>
          <span>Precio</span>
          <span>% 24h</span>
        </div>

        {coins.map((c, i) => (
          <Link key={c.id} to={`/coin/${c.id}`}>
            <div className="row">
              <span>{i + 1}</span>
              <span className="name">
                <img src={c.image} alt="" />
                {c.name} <small>({c.symbol.toUpperCase()})</small>
              </span>
              <span>{c.current_price?.toLocaleString()}</span>
              <span
                className={
                  (c.price_change_percentage_24h ?? 0) >= 0 ? "pos" : "neg"
                }
              >
                {(c.price_change_percentage_24h ?? 0).toFixed(2)}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
