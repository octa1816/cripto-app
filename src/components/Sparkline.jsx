// components/Sparkline.jsx (Recharts)
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Sparkline({ data }) {
  const series = data.map((y, i) => ({ i, y }));
  return (
    <div style={{ width: 120, height: 40 }}>
      <ResponsiveContainer>
        <LineChart
          data={series}
          margin={{ left: 0, right: 0, top: 5, bottom: 0 }}
        >
          <Line type="monotone" dataKey="y" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
