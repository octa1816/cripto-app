import { Outlet, Link } from "react-router-dom";
import CurrencySelector from "./components/CurrencySelector.jsx";
import ToggleTheme from "./components/ToggleTheme.jsx";
import { useState } from "react";

export default function App() {
  const [currency, setCurrency] = useState("usd"); // 'usd' | 'eur' | 'ars'
  return (
    <div className="app">
      <header className="nav">
        <nav>
          <Link to="/">Top 10</Link>
          <Link to="/watchlist">Watchlist</Link>
        </nav>
        <div className="controls">
          <CurrencySelector value={currency} onChange={setCurrency} />
          <ToggleTheme />
        </div>
      </header>
      <main>
        <Outlet context={{ currency }} />
      </main>
    </div>
  );
}
