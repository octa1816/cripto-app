import Sparkline from "./Sparkline.jsx";
import FavButton from "./FavButton.jsx";

const symbols = { usd: "$", eur: "€", ars: "$" };

export default function CoinRow({ index, coin, currency }) {
  const price = coin.current_price?.toLocaleString();
  const change = coin.price_change_percentage_24h?.toFixed(2);

  return (
    <div className="row">
      <span>{index}</span>

      <span className="name">
        <img src={coin.image} alt={coin.name} />
        {coin.name} <small>({coin.symbol.toUpperCase()})</small>
      </span>

      <span>
        {symbols[currency]} {price}
      </span>

      <span className={change >= 0 ? "pos" : "neg"}>{change}%</span>

      <Sparkline data={coin.sparkline_in_7d?.price || []} />

      <FavButton coinId={coin.id} />
    </div>
  );
}
