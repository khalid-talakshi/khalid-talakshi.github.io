# ECharts-Only Reference

## Quick Overview

Your project now uses **ECharts exclusively** for all chart visualizations. Recharts has been completely removed.

## Available Chart Components

### 1. EChartsLineChart

**Location:** `src/components/charts/EChartsLineChart.tsx`

```tsx
import EChartsLineChart from "../components/charts/EChartsLineChart";

<EChartsLineChart
  traces={[
    {
      name: "Series 1",
      x: "time",
      y: "value",
      color: "#008fec",
      data: [
        { time: 0, value: 10 },
        { time: 1, value: 20 },
      ],
    },
  ]}
  title="My Line Chart"
  xAxisLabel="Time"
  yAxisLabel="Value"
  enableZoom={true}
  enablePan={true}
  height={400}
/>;
```

**Features:**

- ✅ Mouse wheel zoom
- ✅ Click and drag pan
- ✅ Multiple series
- ✅ Smooth animations
- ✅ Responsive

### 2. EChartsScatterChart

**Location:** `src/components/charts/EChartsScatterChart.tsx`

```tsx
import EChartsScatterChart from "../components/charts/EChartsScatterChart";

<EChartsScatterChart
  series={[
    {
      name: "Data Points",
      data: [
        [10, 20],
        [15, 25],
        [20, 30],
      ],
      color: "#008fec",
      colorValues: [15, 22, 28], // Optional: for color mapping
    },
  ]}
  title="My Scatter Chart"
  xAxisLabel="X"
  yAxisLabel="Y"
  symbolSize={8}
  height={400}
/>;
```

**Features:**

- ✅ 2D zoom and pan
- ✅ Color mapping (blue-white-red default)
- ✅ Custom color scales
- ✅ Interactive tooltips
- ✅ Responsive

### 3. EChartsDualAxisChart

**Location:** `src/components/charts/EChartsDualAxisChart.tsx`

```tsx
import EChartsDualAxisChart from "../components/charts/EChartsDualAxisChart";

<EChartsDualAxisChart
  data={[
    { name: 1, cost: 4.11, impression: 100 },
    { name: 2, cost: 2.39, impression: 120 },
  ]}
  series={[
    { name: "Cost", dataKey: "cost", color: "#8884d8", yAxisId: "left" },
    {
      name: "Impressions",
      dataKey: "impression",
      color: "#82ca9d",
      yAxisId: "right",
    },
  ]}
  title="Cost vs Impressions"
  leftYAxisLabel="Cost ($)"
  rightYAxisLabel="Impressions"
  height={400}
/>;
```

**Features:**

- ✅ Independent left/right Y-axes
- ✅ Different scales per axis
- ✅ Dual-axis zoom
- ✅ Multiple series

## Data Structures

### Trace (for LineChart)

```typescript
interface Trace {
  name: string;
  data: { [key: string]: any }[];
  x: string; // Key for X-axis
  y: string; // Key for Y-axis
  color: string; // Series color
  colorKey?: string; // For color mapping
  colorScale?: ColorScale;
}
```

### ScatterData (for ScatterChart)

```typescript
interface ScatterData {
  name: string;
  data: Array<[number, number]>; // [x, y] pairs
  color?: string;
  colorValues?: number[]; // For color mapping
  colorScale?: ColorScale;
}
```

## Color Mapping

### Default: Blue-White-Red

```tsx
import { BLUE_WHITE_RED_SCALE } from "../utils/colorScale";

<EChartsScatterChart
  series={[
    {
      name: "Temperature",
      data: [
        [10, 20],
        [15, 25],
      ],
      colorValues: [15, 22],
      // Uses BLUE_WHITE_RED_SCALE by default
    },
  ]}
/>;
```

### Custom Color Scale

```tsx
const myScale = {
  stops: [
    [0, "#00cc00"], // Green
    [0.5, "#ffff00"], // Yellow
    [1, "#cc0000"], // Red
  ],
};

<EChartsScatterChart
  series={[
    {
      name: "Performance",
      data: [
        [10, 20],
        [15, 25],
      ],
      colorValues: [15, 22],
      colorScale: myScale,
    },
  ]}
/>;
```

## Utilities

### Color Scale Functions

**Location:** `src/utils/colorScale.ts`

```typescript
import {
  BLUE_WHITE_RED_SCALE,
  getColorForValue,
  normalizeValues,
  valueToColor,
} from "../utils/colorScale";

// Get color for a value in a range
const color = getColorForValue(50, 0, 100, BLUE_WHITE_RED_SCALE);

// Normalize values to 0-1
const normalized = normalizeValues([10, 20, 30, 40, 50]);

// Map normalized value to color
const color2 = valueToColor(0.75, BLUE_WHITE_RED_SCALE);
```

### ECharts Theme

**Location:** `src/utils/echartsTheme.ts`

Provides consistent theming across all charts.

## Common Tasks

### Add a Line Chart

```tsx
import EChartsLineChart from "../components/charts/EChartsLineChart";

export function MyChart() {
  const traces = [
    {
      name: "Sales",
      x: "month",
      y: "revenue",
      color: "#008fec",
      data: [
        { month: "Jan", revenue: 1000 },
        { month: "Feb", revenue: 1200 },
      ],
    },
  ];

  return (
    <EChartsLineChart
      traces={traces}
      title="Monthly Revenue"
      xAxisLabel="Month"
      yAxisLabel="Revenue ($)"
      enableZoom={true}
      height={400}
    />
  );
}
```

### Add a Scatter Chart with Color Mapping

```tsx
import EChartsScatterChart from "../components/charts/EChartsScatterChart";

export function MyChart() {
  const series = [
    {
      name: "Temperature Distribution",
      data: [
        [10, 20],
        [15, 25],
        [20, 30],
      ],
      colorValues: [15, 22, 28],
    },
  ];

  return (
    <EChartsScatterChart
      series={series}
      title="Temperature Map"
      xAxisLabel="Latitude"
      yAxisLabel="Longitude"
      symbolSize={10}
      height={400}
    />
  );
}
```

### Add a Dual-Axis Chart

```tsx
import EChartsDualAxisChart from "../components/charts/EChartsDualAxisChart";

export function MyChart() {
  const data = [
    { month: "Jan", sales: 100, profit: 20 },
    { month: "Feb", sales: 150, profit: 30 },
  ];

  return (
    <EChartsDualAxisChart
      data={data}
      series={[
        { name: "Sales", dataKey: "sales", color: "#8884d8", yAxisId: "left" },
        {
          name: "Profit",
          dataKey: "profit",
          color: "#82ca9d",
          yAxisId: "right",
        },
      ]}
      title="Sales vs Profit"
      leftYAxisLabel="Sales"
      rightYAxisLabel="Profit"
      height={400}
    />
  );
}
```

## File Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── EChartsLineChart.tsx
│   │   ├── EChartsScatterChart.tsx
│   │   └── EChartsDualAxisChart.tsx
│   ├── Navigation.astro
│   └── Prose.astro
├── utils/
│   ├── colorScale.ts
│   └── echartsTheme.ts
├── types/
│   └── index.ts
└── pages/
    ├── echarts-demo.astro
    └── test-zoom.astro
```

## Removed Files

The following Recharts-related files have been removed:

- ❌ `src/components/ScatterChart.tsx`
- ❌ `src/components/LineChart.tsx`
- ❌ `src/components/ZoomableLineChart.tsx`
- ❌ `src/components/ChartTooltip.tsx`
- ❌ `src/components/ZoomControls.tsx`
- ❌ `src/hooks/useGraphZoom.ts`
- ❌ `src/hooks/useGraphZoom2D.ts`

## Dependencies

**Removed:**

- ❌ `recharts@^3.8.0`
- ❌ `@recharts/devtools@^0.0.11`

**Kept:**

- ✅ `echarts@^6.0.0`
- ✅ `echarts-for-react@^3.0.6`

## Examples

Visit these pages to see working examples:

- `/echarts-demo` - All chart types with features
- `/test-zoom` - Zoom and pan functionality

## Documentation

- **Color Mapping:** `COLOR_MAPPING_GUIDE.md`
- **Quick Start:** `COLOR_MAPPING_QUICK_START.md`
- **Migration Info:** `RECHARTS_REMOVAL_SUMMARY.md`
- **ECharts Docs:** https://echarts.apache.org/

## Tips

1. **Always use `client:load`** in Astro files for React components
2. **Responsive by default** - Charts automatically resize with window
3. **Zoom works with mouse wheel** - No special setup needed
4. **Color scales are flexible** - Create custom scales for any use case
5. **Tooltips are interactive** - Hover over data points for details

## Troubleshooting

**Q: Chart not showing?**
A: Ensure you have `client:load` directive in Astro files

**Q: Zoom not working?**
A: Set `enableZoom={true}` on EChartsLineChart

**Q: Colors look wrong?**
A: Check that hex colors are valid (e.g., `#0066cc`)

**Q: Performance issues?**
A: Reduce number of data points or use simpler color scales

## Support

- ECharts Documentation: https://echarts.apache.org/
- Component examples: `src/pages/echarts-demo.astro`
- Type definitions: `src/types/index.ts`
