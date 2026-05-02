# Trace Format Guide for Scatter Charts

## Overview

The new `EChartsScatterChartFromTrace` component accepts Trace objects and intelligently handles the `color` field:

- **If `color` is a hex string** (e.g., `"#ff0000"`): Uses that as a solid color for all points
- **If `color` is a data key** (e.g., `"speed"`): Uses that field for color mapping with blue-white-red gradient

## Quick Examples

### Solid Color (Hex)

```tsx
import EChartsScatterChartFromTrace from "../components/charts/EChartsScatterChartFromTrace";

const traces = [
  {
    name: "Group A",
    x: "x",
    y: "y",
    color: "#008fec", // Hex color - use as solid color
    data: [
      { x: 10, y: 20 },
      { x: 15, y: 25 },
      { x: 20, y: 30 },
    ],
  },
];

<EChartsScatterChartFromTrace traces={traces} />;
```

### Color Mapping (Data Key)

```tsx
const traces = [
  {
    name: "TSU",
    x: "x",
    y: "y",
    color: "speed", // Data key - use for color mapping
    data: [
      { x: 10, y: 20, speed: 15 },
      { x: 15, y: 25, speed: 22 },
      { x: 20, y: 30, speed: 28 },
    ],
  },
];

<EChartsScatterChartFromTrace traces={traces} />;
```

## Your Use Case

Your trace definition:

```typescript
export const tsu_track_map = {
  name: "TSU",
  x: "x",
  y: "y",
  color: "speed", // Data key for color mapping
  data: tsu_data, // Array of objects with x, y, speed
};
```

Usage:

```tsx
import EChartsScatterChartFromTrace from "../components/charts/EChartsScatterChartFromTrace";

<EChartsScatterChartFromTrace
  traces={[tsu_track_map]}
  title="TSU Track Map"
  xAxisLabel="X Position"
  yAxisLabel="Y Position"
  symbolSize={8}
/>;
```

## Trace Interface

```typescript
interface Trace {
  name: string; // Series name
  data: { [key: string]: any }[]; // Array of data objects
  x: string; // Key for X-axis values
  y: string; // Key for Y-axis values
  color: string; // Hex color OR data key for color mapping
  colorScale?: ColorScale; // Optional custom color scale
}
```

## Color Detection Logic

The component automatically detects the color type:

```typescript
// Hex color detection
if (color matches /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) {
  // Use as solid color
} else {
  // Treat as data key
  if (data key exists in all data objects) {
    // Use for color mapping
  } else {
    // Throw error
  }
}
```

## Examples

### Example 1: Multiple Traces with Mixed Colors

```tsx
const traces = [
  {
    name: "Group A",
    x: "x",
    y: "y",
    color: "#0066cc", // Solid blue
    data: [
      { x: 10, y: 20 },
      { x: 15, y: 25 },
    ],
  },
  {
    name: "Group B",
    x: "x",
    y: "y",
    color: "temperature", // Color mapping
    data: [
      { x: 30, y: 40, temperature: 15 },
      { x: 35, y: 45, temperature: 28 },
    ],
  },
];

<EChartsScatterChartFromTrace traces={traces} />;
```

### Example 2: Custom Color Scale

```tsx
import { type ColorScale } from "../utils/colorScale";

const performanceScale: ColorScale = {
  stops: [
    [0, "#00cc00"], // Green (good)
    [0.5, "#ffff00"], // Yellow (medium)
    [1, "#cc0000"], // Red (bad)
  ],
};

const traces = [
  {
    name: "Performance",
    x: "latency",
    y: "throughput",
    color: "cpuUsage", // Data key for color mapping
    colorScale: performanceScale,
    data: [
      { latency: 100, throughput: 1000, cpuUsage: 20 },
      { latency: 150, throughput: 900, cpuUsage: 50 },
      { latency: 200, throughput: 800, cpuUsage: 80 },
    ],
  },
];

<EChartsScatterChartFromTrace traces={traces} />;
```

### Example 3: Your TSU Track Map

```tsx
import EChartsScatterChartFromTrace from "../components/charts/EChartsScatterChartFromTrace";

// Your data
const tsu_data = [
  { x: 0, y: 0, speed: 10 },
  { x: 1, y: 1, speed: 15 },
  { x: 2, y: 2, speed: 20 },
  // ... more points
];

const tsu_track_map = {
  name: "TSU",
  x: "x",
  y: "y",
  color: "speed", // Use speed field for color mapping
  data: tsu_data,
};

export function TSUTrackMap() {
  return (
    <EChartsScatterChartFromTrace
      traces={[tsu_track_map]}
      title="TSU Track Map"
      xAxisLabel="X Position"
      yAxisLabel="Y Position"
      symbolSize={8}
      height={500}
    />
  );
}
```

## Features

✅ **Automatic color detection** - Hex vs data key  
✅ **Error handling** - Clear error if data key doesn't exist  
✅ **Color mapping** - Blue-white-red gradient by default  
✅ **Custom scales** - Define your own color scales  
✅ **Tooltips** - Shows color value on hover  
✅ **2D zoom/pan** - Mouse wheel and drag support  
✅ **Responsive** - Automatically resizes

## Error Handling

If you use a data key that doesn't exist:

```tsx
const traces = [
  {
    name: "Data",
    x: "x",
    y: "y",
    color: "nonexistent", // ❌ This key doesn't exist in data
    data: [{ x: 1, y: 2, speed: 10 }],
  },
];

// Error: Trace "Data": color key "nonexistent" not found in data.
// Available keys: x, y, speed
```

## Tooltip Information

When hovering over points, the tooltip shows:

**For solid color:**

```
Series Name
x: 10.50
y: 20.75
```

**For color mapping:**

```
Series Name
x: 10.50
y: 20.75
speed: 15.25
```

## Component Props

```typescript
interface EChartsScatterChartFromTraceProps {
  traces: Trace[]; // Array of trace objects
  title?: string; // Chart title
  xAxisLabel?: string; // X-axis label
  yAxisLabel?: string; // Y-axis label
  height?: number | string; // Chart height (default: 400)
  width?: number | string; // Chart width (default: 100%)
  symbolSize?: number; // Point size (default: 8)
}
```

## Usage in Astro

```astro
---
import EChartsScatterChartFromTrace from "../components/charts/EChartsScatterChartFromTrace";

const traces = [
  {
    name: "TSU",
    x: "x",
    y: "y",
    color: "speed",
    data: tsu_data,
  },
];
---

<EChartsScatterChartFromTrace
  client:load
  traces={traces}
  title="TSU Track Map"
  xAxisLabel="X"
  yAxisLabel="Y"
  symbolSize={8}
/>
```

## Migration from Old Format

**Old format (ScatterData):**

```tsx
const series = [
  {
    name: "Data",
    data: [
      [1, 2],
      [3, 4],
    ],
    colorValues: [10, 20],
  },
];

<EChartsScatterChart series={series} />;
```

**New format (Trace):**

```tsx
const traces = [
  {
    name: "Data",
    x: "x",
    y: "y",
    color: "value", // Data key
    data: [
      { x: 1, y: 2, value: 10 },
      { x: 3, y: 4, value: 20 },
    ],
  },
];

<EChartsScatterChartFromTrace traces={traces} />;
```

## Best Practices

1. **Use descriptive data keys** - `"speed"` is better than `"val"`
2. **Ensure data consistency** - All objects should have the same keys
3. **Validate data** - Check that color key exists before rendering
4. **Use appropriate scales** - Choose color scales that match your data
5. **Label axes** - Always provide `xAxisLabel` and `yAxisLabel`

## Troubleshooting

**Q: Points all have the same color**
A: Check that your data key is correct and has varying values

**Q: Error about missing data key**
A: Ensure all data objects have the color key field

**Q: Colors look wrong**
A: Verify hex colors are valid (e.g., `#0066cc`) or use a custom color scale

**Q: Chart not showing**
A: Add `client:load` directive in Astro files

## See Also

- `COLOR_MAPPING_GUIDE.md` - Detailed color mapping documentation
- `ECHARTS_ONLY_REFERENCE.md` - All ECharts components
- `src/utils/colorScale.ts` - Color scale utilities
