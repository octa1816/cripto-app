# Cripto App — Top 10 Cryptos

SPA en React (Vite) que muestra el **Top 10** de criptomonedas por market cap, con **búsqueda, orden**, **sparkline 7d**, **detalle con gráfico**, **selector de moneda (USD/EUR/ARS)**, **watchlist (★)** y **modo oscuro**. Usa la **API pública de CoinGecko**.

## 🚀 Demo
- (Opcional) Deploy en Vercel/Netlify: importá el repo y usá `npm run build` con directorio de salida `dist`.

## 🧰 Stack
- **React + Vite**
- **React Router**
- **Recharts** (gráficos)
- **CoinGecko API** (sin key)
- CSS plano (dark mode con class `dark`)
- `localStorage` para favoritos

## ✨ Funcionalidades
- **Top 10** por capitalización con: precio, % 24h y sparkline 7d.
- **Búsqueda** por nombre/símbolo y **orden** (market cap, precio, %24h).
- **Detalle** de cada moneda con histórico 24h/7d/30d (línea).
- **Watchlist (★)**: agrega/quita favoritos y se guarda en `localStorage`.
- **Selector de moneda**: USD, EUR, **ARS**.
- **Dark mode** persistente.

## 📦 Estructura
src/
App.jsx
main.jsx
styles.css
lib/
api.js
hooks/
useDebounce.js
useLocalStorage.js
components/
CoinRow.jsx
CurrencySelector.jsx
FavButton.jsx
Sparkline.jsx
ToggleTheme.jsx
pages/
Top10.jsx
CoinDetail.jsx
Watchlist.jsx

markdown

## 🔗 Endpoints usados (CoinGecko)
- Top 10:
GET /api/v3/coins/markets
?vs_currency=usd
&order=market_cap_desc
&per_page=10&page=1
&sparkline=true
&price_change_percentage=24h

diff

- Detalle:
GET /api/v3/coins/{id}

diff

- Histórico:
GET /api/v3/coins/{id}/market_chart?vs_currency=usd&days=7|30|1

diff

- Por IDs (watchlist):
GET /api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,...

bash


> Cambiá `vs_currency` por `usd|eur|ars`. La API pública tiene **límites de rate**; evitá hacer fetch en exceso (usa polling moderado y `useEffect` con dependencias).

## 🛠️ Instalación
```bash
# Clonar
git clone https://github.com/octa1816/cripto-app.git
cd cripto-app

# Instalar deps
npm install
npm i react-router-dom recharts

# Levantar en dev
npm run dev

# Build de producción
npm run build
⚙️ Configuración
Moneda por defecto: en App.jsx → const [currency, setCurrency] = useState('usd')

Dark mode: ToggleTheme.jsx usa localStorage('theme') y prefers-color-scheme.

🧩 Notas técnicas
Watchlist: guarda un array de IDs en localStorage('watchlist').

Sparkline: Sparkline.jsx renderiza línea compacta con Recharts.

Accesibilidad: imágenes con alt={coin.name} y colores contrastados.

🚢 Deploy rápido
Vercel: “New Project” → Importar repo → Framework: Vite → Build: npm run build → Output: dist.

Netlify: “New site from Git” → Build: npm run build → Publish dir: dist.

🧭 Roadmap (mejoras futuras)
Paginación (Top 50/100) y filtros avanzados.

Alertas de precio (notificación visual al tocar un umbral).

Gráfico de velas en detalle.

i18n (ES/EN) y PWA (offline + installable).

📄 Licencia
MIT © 2025 — Hecho por octa1816








Preguntar a ChatGPT
