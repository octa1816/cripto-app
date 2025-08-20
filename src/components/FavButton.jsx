import { useLocalStorage } from "../hooks/useLocalStorage";

export default function FavButton({ coinId }) {
  const [ids, setIds] = useLocalStorage("watchlist", []);

  const on = ids.includes(coinId);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIds(on ? ids.filter((x) => x !== coinId) : [...ids, coinId]);
  };

  return (
    <button
      className={`star ${on ? "on" : ""}`}
      onClick={toggle}
      title={on ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {on ? "★" : "☆"}
    </button>
  );
}
