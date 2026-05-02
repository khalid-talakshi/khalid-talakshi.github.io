# Color Mapping for Scatter Charts

This guide explains how to use the color mapping feature to color scatter chart points based on a third dimension of data.

## Overview

The color mapping feature allows you to visualize a third dimension in scatter charts by coloring each point based on a continuous value. By default, it uses a **blue-white-red** color scale where:

- **Blue** represents low values
- **White** represents middle values
- **Red** represents high values

You can also provide custom color scales for different use cases.

## Quick Start

### ECharts Scatter Chart

```tsx
import EChartsScatterChart from "../components/charts/EChartsScatterChart";

const data = [
  {
    name: "Temperature Distribution",
    data: [
      [10, 20], // [x, y]
      [15, 25],
      [20, 30],
      // ... more points
    ],
    colorValues: [15, 22, 28], // Color value for each point
  },
];

export function MyChart() {
  return (
    <EChartsScatterChart
      series={data}
      title="Temperature Map"
      xAxisLabel="Latitude"
      yAxisLabel="Longitude"
      symbolSize={10}
    />
  );
}
```

### Recharts Scatter Chart

```tsx
import { ScatterGraph } from "../components/ScatterChart";

const traces = [
  {
    name: "Measurements",
    x: "x",
    y: "y",
    color: "#008fec",
    colorKey: "temperature", // Key in data to use for coloring
    data: [
      { x: 10, y: 20, temperature: 15 },
      { x: 15, y: 25, temperature: 22 },
      { x: 20, y: 30, temperature: 28 },
      // ... more points
    ],
  },
];

export function MyChart() {
  return <ScatterGraph traces={traces} />;
}
```

## Configuration

### Trace Type (Recharts)

```typescript
interface Trace {
  name: string;
  data: { [key: string]: any }[];
  x: string; // Key for X-axis values
  y: string; // Key for Y-axis values
  color: string; // Fallback color (not used if colorKey is set)
  colorKey?: string; // Key in data to use for color mapping
  colorScale?: ColorScale; // Custom color scale (optional)
}
```

### ScatterData Type (ECharts)

```typescript
interface ScatterData {
  name: string;
  data: Array<[number, number]>; // [x, y] pairs
  color?: string;
  colorValues?: number[]; // Color value for each point
  colorScale?: ColorScale; // Custom color scale (optional)
}
```

### ColorScale Type

```typescript
interface ColorScale {
  stops: Array<[number, string]>; // [position 0-1, hex color]
}

// Example: Blue-White-Red (default)
const BLUE_WHITE_RED_SCALE: ColorScale = {
  stops: [
    [0, "#0066cc"], // Blue at 0%
    [0.5, "#ffffff"], // White at 50%
    [1, "#cc0000"], // Red at 100%
  ],
};
```

## Custom Color Scales

You can create custom color scales for different visualizations:

### Green-Yellow-Red (for performance metrics)

```typescript
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
    x: "time",
    y: "latency",
    color: "#008fec",
    colorKey: "cpuUsage",
    colorScale: performanceScale,
    data: [
      { time: 0, latency: 100, cpuUsage: 20 },
      { time: 1, latency: 150, cpuUsage: 50 },
      { time: 2, latency: 200, cpuUsage: 80 },
    ],
  },
];
```

### Purple-Orange (for diverging data)

```typescript
const divergingScale: ColorScale = {
  stops: [
    [0, "#7030a0"], // Purple
    [0.5, "#ffffff"], // White
    [1, "#ff8c00"], // Orange
  ],
};
```

### Grayscale (for accessibility)

```typescript
const grayscaleScale: ColorScale = {
  stops: [
    [0, "#000000"], // Black
    [0.5, "#808080"], // Gray
    [1, "#ffffff"], // White
  ],
};
```

## Usage Examples

### Example 1: Temperature Heatmap

```tsx
import EChartsScatterChart from "../components/charts/EChartsScatterChart";
import { BLUE_WHITE_RED_SCALE } from "../utils/colorScale";

const temperatureData = [
  {
    name: "City Temperatures",
    data: [
      [40.7128, -74.006], // NYC coordinates
      [34.0522, -118.2437], // LA coordinates
      [41.8781, -87.6298], // Chicago coordinates
    ],
    colorValues: [15, 28, 12], // Temperature in Celsius
  },
];

export function TemperatureMap() {
  return (
    <EChartsScatterChart
      series={temperatureData}
      title="City Temperature Distribution"
      xAxisLabel="Latitude"
      yAxisLabel="Longitude"
      symbolSize={15}
      height={500}
    />
  );
}
```

### Example 2: Performance Monitoring

```tsx
import { ScatterGraph } from "../components/ScatterChart";

const performanceScale = {
  stops: [
    [0, "#00cc00"], // Green (good)
    [0.5, "#ffff00"], // Yellow (medium)
    [1, "#cc0000"], // Red (bad)
  ],
};

const traces = [
  {
    name: "API Performance",
    x: "requestSize",
    y: "responseTime",
    color: "#008fec",
    colorKey: "errorRate",
    colorScale: performanceScale,
    data: Array.from({ length: 50 }, (_, i) => ({
      requestSize: Math.random() * 1000,
      responseTime: Math.random() * 5000,
      errorRate: Math.random() * 100,
    })),
  },
];

export function PerformanceChart() {
  return <ScatterGraph traces={traces} />;
}
```

### Example 3: Scientific Data Visualization

```tsx
import EChartsScatterChart from "../components/charts/EChartsScatterChart";

const scientificScale = {
  stops: [
    [0, "#0000ff"], // Blue (low energy)
    [0.5, "#00ff00"], // Green (medium)
    [1, "#ff0000"], // Red (high energy)
  ],
};

const particleData = [
  {
    name: "Particle Distribution",
    data: Array.from({ length: 100 }, () => [
      Math.random() * 100,
      Math.random() * 100,
    ]),
    colorValues: Array.from({ length: 100 }, () => Math.random() * 100),
    colorScale: scientificScale,
  },
];

export function ParticleVisualization() {
  return (
    <EChartsScatterChart
      series={particleData}
      title="Particle Energy Distribution"
      xAxisLabel="X Position"
      yAxisLabel="Y Position"
      symbolSize={8}
    />
  );
}
```

## Color Scale Utilities

The `colorScale.ts` utility provides helper functions:

### `getColorForValue(value, min, max, scale?)`

Get the color for a specific value within a range:

```typescript
import { getColorForValue, BLUE_WHITE_RED_SCALE } from "../utils/colorScale";

const color = getColorForValue(50, 0, 100, BLUE_WHITE_RED_SCALE);
// Returns: "#ffffff" (white, since 50 is middle of 0-100)
```

### `normalizeValues(values)`

Normalize an array of values to 0-1 range:

```typescript
import { normalizeValues } from "../utils/colorScale";

const normalized = normalizeValues([10, 20, 30, 40, 50]);
// Returns: [0, 0.25, 0.5, 0.75, 1]
```

### `valueToColor(normalizedValue, scale)`

Convert a normalized value (0-1) to a color:

```typescript
import { valueToColor, BLUE_WHITE_RED_SCALE } from "../utils/colorScale";

const color = valueToColor(0.75, BLUE_WHITE_RED_SCALE);
// Returns: a color between white and red
```

## Best Practices

1. **Choose appropriate color scales** for your data:
   - Use diverging scales (blue-white-red) for data with a meaningful center point
   - Use sequential scales (light-to-dark) for ordered data
   - Use qualitative scales for categorical data (though this feature is for continuous)

2. **Ensure sufficient contrast** for accessibility:
   - Test your color scale with color-blind vision simulators
   - Avoid pure red/green combinations
   - Consider grayscale readability

3. **Label your color dimensions** clearly:
   - Add a title or legend explaining what the colors represent
   - Include units (e.g., "Temperature (°C)")

4. **Normalize your data appropriately**:
   - The color scale automatically normalizes values to 0-1
   - Ensure your data range makes sense for the visualization

5. **Use consistent scales** across related charts:
   - If comparing multiple charts, use the same color scale
   - This helps viewers understand the data relationships

## Troubleshooting

### Points all have the same color

**Problem**: All points appear to be the same color even though `colorValues` are different.

**Solution**: Ensure:

- `colorValues` array has the same length as `data` array
- Values in `colorValues` have sufficient range (not all the same)
- Color scale has multiple stops

### Colors don't match expectations

**Problem**: The color mapping doesn't look right.

**Solution**:

- Check that your color scale stops are in order (0 to 1)
- Verify hex color codes are valid (e.g., `#0066cc`)
- Test with the default `BLUE_WHITE_RED_SCALE` first

### Performance issues with large datasets

**Problem**: Chart is slow with many colored points.

**Solution**:

- Reduce the number of points if possible
- Use `symbolSize` to make points smaller
- Consider using a simpler color scale with fewer stops

## API Reference

### Color Scale Utilities

**File**: `src/utils/colorScale.ts`

```typescript
// Types
export type ColorStop = [number, string];
export interface ColorScale {
  stops: ColorStop[];
}

// Constants
export const BLUE_WHITE_RED_SCALE: ColorScale;

// Functions
export function valueToColor(value: number, scale: ColorScale): string;
export function normalizeValues(values: number[]): number[];
export function getColorForValue(
  value: number,
  min: number,
  max: number,
  scale?: ColorScale,
): string;
```

### Component Props

**EChartsScatterChart**:

- `series`: Array of `ScatterData` with optional `colorValues` and `colorScale`
- Other props unchanged

**ScatterChart (Recharts)**:

- `traces`: Array of `Trace` with optional `colorKey` and `colorScale`
- Other props unchanged

## See Also

- [ECharts Documentation](https://echarts.apache.org/)
- [Recharts Documentation](https://recharts.org/)
- [Color Theory Guide](https://www.interaction-design.org/literature/topics/color-theory)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
