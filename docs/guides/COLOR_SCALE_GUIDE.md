# Color Scale Guide for Scatter Charts

## Overview

The ECharts Scatter Chart component now supports coloring dots based on a third dimension using color scales. This allows you to visualize an additional data dimension beyond the X and Y axes.

## Basic Usage

### 1. Import the Color Scale Function

```tsx
import { viridisScale } from "../../utils/colorScales";
```

### 2. Prepare Your Data

You need two pieces of data:

- **Series data**: The X,Y coordinates for the scatter plot
- **Raw data**: The full dataset including the color scale values

```tsx
const rawData = [
  { x: 10, y: 20, temperature: 25 },
  { x: 15, y: 25, temperature: 30 },
  { x: 20, y: 30, temperature: 35 },
  // ... more data points
];

const scatterSeries = [
  {
    name: "Temperature Map",
    data: rawData.map((d) => [d.x, d.y]),
  },
];
```

### 3. Use the Component with Color Scale

```tsx
<EChartsScatterChart
  series={scatterSeries}
  rawData={rawData}
  colorScale={{
    dataKey: "temperature", // The property name in rawData to use for coloring
    colorScale: viridisScale, // The color scale function
  }}
  title="Temperature Distribution"
  xAxisLabel="X Position"
  yAxisLabel="Y Position"
/>
```

## Available Color Scales

### 1. Viridis Scale

**Blue → Green → Yellow**

Best for: General purpose, perceptually uniform, colorblind-friendly

```tsx
import { viridisScale } from "../../utils/colorScales";

colorScale={{
  dataKey: 'value',
  colorScale: viridisScale
}}
```

### 2. Cool to Warm Scale

**Blue → Red**

Best for: Temperature data, diverging values

```tsx
import { coolToWarmScale } from "../../utils/colorScales";

colorScale={{
  dataKey: 'temperature',
  colorScale: coolToWarmScale
}}
```

### 3. Plasma Scale

**Purple → Orange**

Best for: High contrast, visually striking

```tsx
import { plasmaScale } from "../../utils/colorScales";

colorScale={{
  dataKey: 'intensity',
  colorScale: plasmaScale
}}
```

### 4. Grayscale Scale

**Dark → Light**

Best for: Printing, professional documents

```tsx
import { grayscaleScale } from "../../utils/colorScales";

colorScale={{
  dataKey: 'value',
  colorScale: grayscaleScale
}}
```

### 5. Blue Accent Scale

**Light Blue → Dark Blue**

Best for: Matching the site theme

```tsx
import { blueAccentScale } from "../../utils/colorScales";

colorScale={{
  dataKey: 'value',
  colorScale: blueAccentScale
}}
```

## Creating Custom Color Scales

You can create your own color scale function with the signature:

```tsx
(value: number, min: number, max: number) => string;
```

The function receives:

- `value`: The data point value
- `min`: The minimum value in the dataset
- `max`: The maximum value in the dataset

And should return a hex color string (e.g., `#FF0000`).

### Example: Custom Red Scale

```tsx
const redScale = (value: number, min: number, max: number): string => {
  const normalized = (value - min) / (max - min);
  const clamped = Math.max(0, Math.min(1, normalized));

  // Map to red intensity (0-255)
  const intensity = Math.round(clamped * 255);
  const hex = intensity.toString(16).padStart(2, "0");

  return `#${hex}0000`;
};

<EChartsScatterChart
  series={scatterSeries}
  rawData={rawData}
  colorScale={{
    dataKey: "intensity",
    colorScale: redScale,
  }}
/>;
```

## How It Works

1. **Data Extraction**: The component extracts all values from `rawData` using the `dataKey`
2. **Min/Max Calculation**: Finds the minimum and maximum values
3. **Normalization**: For each data point, normalizes its value to 0-1 range
4. **Color Mapping**: Calls the color scale function with the normalized value
5. **Rendering**: Colors each dot with the resulting color

## Important Notes

- The `rawData` array must have the same length and order as the data points in `series`
- The `dataKey` must exist in each object in `rawData`
- Missing or invalid values are skipped (dots use default color)
- Color scales automatically handle edge cases (NaN, Infinity, etc.)

## Performance Considerations

- Color scale calculation happens once during component initialization
- For large datasets (>1000 points), consider using simpler color scales
- The component memoizes color calculations for efficiency

## Examples

### Temperature Heatmap

```tsx
const temperatureData = Array.from({ length: 100 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  temp: 15 + Math.random() * 35,
}));

<EChartsScatterChart
  series={[
    {
      name: "Temperature",
      data: temperatureData.map((d) => [d.x, d.y]),
    },
  ]}
  rawData={temperatureData}
  colorScale={{
    dataKey: "temp",
    colorScale: coolToWarmScale,
  }}
  title="Temperature Distribution"
/>;
```

### Performance Metrics

```tsx
const performanceData = metrics.map((m) => ({
  x: m.latency,
  y: m.throughput,
  cpuUsage: m.cpu,
}));

<EChartsScatterChart
  series={[
    {
      name: "Performance",
      data: performanceData.map((d) => [d.x, d.y]),
    },
  ]}
  rawData={performanceData}
  colorScale={{
    dataKey: "cpuUsage",
    colorScale: viridisScale,
  }}
  title="Performance Analysis"
/>;
```

## Troubleshooting

### Dots are all the same color

- Check that `dataKey` matches a property in `rawData`
- Verify `rawData` has the same length as your data points
- Ensure values are numbers, not strings

### Colors don't match expected range

- The color scale is normalized to 0-1 based on min/max
- If all values are the same, the scale will show a single color
- Use a custom scale if you need fixed min/max values

### Performance is slow

- Reduce the number of data points
- Use a simpler color scale function
- Consider using grayscaleScale for better performance
