export default function CurrencySelector({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="ars">ARS</option>
    </select>
  );
}
