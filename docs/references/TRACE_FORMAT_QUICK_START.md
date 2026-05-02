# Trace Format Quick Start

## Your Use Case

You have traces like this:

```typescript
export const tsu_track_map = {
  name: "TSU",
  x: "x",
  y: "y",
  color: "speed", // ← This is the key!
  data: tsu_data,
};
```

## How It Works

The `color` field is smart:

- **If it's a hex color** (e.g., `"#ff0000"`): Use that solid color
- **If it's a data key** (e.g., `"speed"`): Use that field for color mapping

## Usage

```tsx
import EChartsScatterChartFromTrace from "../components/charts/EChartsScatterChartFromTrace";

<EChartsScatterChartFromTrace
  traces={[tsu_track_map]}
  title="TSU Track Map"
  xAxisLabel="X"
  yAxisLabel="Y"
/>;
```

## Your Data Structure

```typescript
// Your data should look like this:
const tsu_data = [
  { x: 0, y: 0, speed: 10 },
  { x: 1, y: 1, speed: 15 },
  { x: 2, y: 2, speed: 20 },
  // ... more points
];

// Your trace:
const tsu_track_map = {
  name: "TSU",
  x: "x", // Key for X-axis
  y: "y", // Key for Y-axis
  color: "speed", // Key for color mapping
  data: tsu_data,
};
```

## Examples

### Solid Color (Hex)

```typescript
const trace = {
  name: "Group A",
  x: "x",
  y: "y",
  color: "#008fec", // ← Hex color = solid color
  data: [
    { x: 10, y: 20 },
    { x: 15, y: 25 },
  ],
};
```

### Color Mapping (Data Key)

```typescript
const trace = {
  name: "TSU",
  x: "x",
  y: "y",
  color: "speed", // ← Data key = color mapping
  data: [
    { x: 10, y: 20, speed: 15 },
    { x: 15, y: 25, speed: 22 },
  ],
};
```

## Color Mapping Details

When using a data key for color mapping:

- **Blue** = Low values
- **White** = Middle values
- **Red** = High values

Example with speed 0-100:

- Speed 0 → Blue
- Speed 50 → White
- Speed 100 → Red

## Custom Color Scale

```typescript
import { type ColorScale } from "../utils/colorScale";

const myScale: ColorScale = {
  stops: [
    [0, "#00cc00"], // Green
    [0.5, "#ffff00"], // Yellow
    [1, "#cc0000"], // Red
  ],
};

const trace = {
  name: "Performance",
  x: "x",
  y: "y",
  color: "cpuUsage",
  colorScale: myScale, // ← Use custom scale
  data: [
    { x: 1, y: 2, cpuUsage: 20 },
    { x: 2, y: 3, cpuUsage: 50 },
  ],
};
```

## Component Props

```tsx
<EChartsScatterChartFromTrace
  traces={traces} // Your trace objects
  title="My Chart" // Optional title
  xAxisLabel="X" // Optional X label
  yAxisLabel="Y" // Optional Y label
  symbolSize={8} // Optional point size
  height={400} // Optional height
  width="100%" // Optional width
/>
```

## In Astro Files

```astro
---
import EChartsScatterChartFromTrace from "../components/charts/EChartsScatterChartFromTrace";

const tsu_track_map = {
  name: "TSU",
  x: "x",
  y: "y",
  color: "speed",
  data: tsu_data,
};
---

<EChartsScatterChartFromTrace
  client:load
  traces={[tsu_track_map]}
  title="TSU Track Map"
/>
```

## Error Messages

If you use a data key that doesn't exist:

```
Trace "TSU": color key "speed" not found in data.
Available keys: x, y, altitude
```

Solution: Make sure your data has the `speed` field.

## Features

✅ Automatic hex vs data key detection  
✅ Blue-white-red color mapping by default  
✅ Custom color scales  
✅ 2D zoom and pan  
✅ Interactive tooltips  
✅ Responsive design

## Troubleshooting

**Q: Points all same color?**
A: Check that your data key has varying values

**Q: Error about missing key?**
A: Ensure all data objects have the color field

**Q: Not showing?**
A: Add `client:load` in Astro files

## Files

- Component: `src/components/charts/EChartsScatterChartFromTrace.tsx`
- Utilities: `src/utils/colorDetection.ts`
- Types: `src/types/index.ts`
- Demo: `src/pages/echarts-demo.astro`

## Full Documentation

See `TRACE_FORMAT_GUIDE.md` for detailed examples and advanced usage.
