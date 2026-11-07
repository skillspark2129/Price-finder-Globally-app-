import { useTheme } from '@/context/ThemeContext';
import { formatPrice } from '@/lib/format';
import type { PricePoint } from '@/lib/types';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface PriceHistoryChartProps {
  history: PricePoint[];
}

function formatMonth(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

export default function PriceHistoryChart({ history }: PriceHistoryChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const data = history.map((point) => ({ month: formatMonth(point.recorded_on), price: point.price }));

  if (data.length < 2) {
    return (
      <p className="rounded-2xl border border-dashed border-ink-300 px-6 py-10 text-center text-sm text-ink-500 dark:border-ink-600 dark:text-ink-400">
        Not enough price history yet to show a chart.
      </p>
    );
  }

  const prices = data.map((point) => point.price);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const first = prices[0];
  const last = prices[prices.length - 1];
  const change = Math.round(((last - first) / first) * 100);
  const gridColor = isDark ? '#344054' : '#EAECF0';
  const tickColor = isDark ? '#D0D5DD' : '#475467';

  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: 'Lowest (6 mo)', value: formatPrice(lowest) },
          { label: 'Highest (6 mo)', value: formatPrice(highest) },
          { label: 'Change', value: `${change > 0 ? '+' : ''}${change}%` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-3 dark:bg-ink-900">
            <p className="text-xs text-ink-500 dark:text-ink-400">{stat.label}</p>
            <p className="mt-1 text-sm font-bold sm:text-base">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: tickColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={72}
              tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
              domain={['dataMin - 2000', 'dataMax + 2000']}
            />
            <Tooltip
              formatter={(value: number) => [formatPrice(value), 'Price']}
              contentStyle={{
                borderRadius: 12,
                border: `1px solid ${gridColor}`,
                backgroundColor: isDark ? '#1D2939' : '#FFFFFF',
                color: isDark ? '#F9FAFB' : '#101828',
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#FF6A00"
              strokeWidth={3}
              dot={{ r: 4, fill: '#FF6A00', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
              animationDuration={900}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
