import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoin, getCoinMarketChart } from "../lib/api.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function CoinDetail() {
  const { id } = useParams();
  const { currency } = useOutletContext();
  const [coin, setCoin] = useState(null);
  const [chart, setChart] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const [c, m] = await Promise.all([
        getCoin(id),
        getCoinMarketChart(id, currency, days),
      ]);
      if (ignore) return;
      setCoin(c);
      setChart(m.prices.map(([t, p]) => ({ t, p })));
      setLoading(false);
    }
    load().catch(() => setLoading(false));
    return () => {
      ignore = true;
    };
  }, [id, currency, days]);

  if (loading || !coin) return <p>Cargando...</p>;

  return (
    <section>
      <h1>
        <img src={coin.image.small} /> {coin.name}
      </h1>
      <div>
        <button onClick={() => setDays(1)}>24h</button>
        <button onClick={() => setDays(7)}>7d</button>
        <button onClick={() => setDays(30)}>30d</button>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chart}>
            <XAxis dataKey="t" tick={false} />
            <YAxis tickFormatter={(v) => v.toLocaleString()} width={80} />
            <Tooltip formatter={(v) => v.toLocaleString()} />
            <Line type="monotone" dataKey="p" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p>
        Precio actual:{" "}
        {coin.market_data.current_price[currency]?.toLocaleString()}
      </p>
      <p>
        Market cap: {coin.market_data.market_cap[currency]?.toLocaleString()}
      </p>
    </section>
  );
}
