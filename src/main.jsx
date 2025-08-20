import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Top10 from "./pages/Top10.jsx";
import CoinDetail from "./pages/CoinDetail.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Top10 />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
