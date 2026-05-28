import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceDot,
} from "recharts";
import { formatINR } from "@/lib/mock";

type Point = { date: string; price: number; event?: string };

export function PriceChart({ data, height = 220 }: { data: Point[]; height?: number }) {
  const min = Math.min(...data.map((d) => d.price));
  const lowPoint = data.find((d) => d.price === min);
  const spike = data.find((d) => d.event?.toLowerCase().includes("inflat"));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="pricefill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="var(--color-muted-foreground)"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--color-muted-foreground)"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => "₹" + (v / 1000).toFixed(0) + "k"}
          />
          <Tooltip
            contentStyle={{
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--color-muted-foreground)" }}
            formatter={(v: number) => [formatINR(v), "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            fill="url(#pricefill)"
          />
          {lowPoint && (
            <ReferenceDot
              x={lowPoint.date}
              y={lowPoint.price}
              r={5}
              fill="var(--color-trust)"
              stroke="var(--color-background)"
              strokeWidth={2}
            />
          )}
          {spike && (
            <ReferenceDot
              x={spike.date}
              y={spike.price}
              r={5}
              fill="var(--color-scam)"
              stroke="var(--color-background)"
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
