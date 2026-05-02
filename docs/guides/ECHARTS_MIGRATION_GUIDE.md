# ECharts Migration Guide

## Overview

This guide documents the migration from Recharts to Apache ECharts for your charting needs. ECharts provides superior interactivity, customization, and performance compared to Recharts.

## Why ECharts?

### ✅ Advantages Over Recharts

| Feature            | Recharts                       | ECharts                            |
| ------------------ | ------------------------------ | ---------------------------------- |
| **Zoom Support**   | Limited, requires custom hooks | Native, multiple modes             |
| **Pan Support**    | Limited                        | Native, smooth                     |
| **Dual-Axis Zoom** | Complex custom implementation  | Built-in support                   |
| **Customization**  | Limited styling options        | Extremely flexible                 |
| **Theme System**   | Basic                          | Advanced with CSS variable support |
| **Animations**     | Basic                          | Rich animation system              |
| **Bundle Size**    | ~50KB gzipped                  | ~100KB gzipped (but more features) |
| **Performance**    | Good                           | Excellent with large datasets      |
| **Community**      | Active                         | Very active (Apache project)       |

## Installation

Already completed:

```bash
npm install echarts echarts-for-react
```

## New Components

### 1. EChartsLineChart

**Replaces**: `LineChart.tsx` (Recharts version)

**Features**:

- Single-axis zoom via mouse wheel
- Pan support (drag to move)
- Smooth animations
- Theme-aware styling

**Usage**:

```tsx
import { EChartsLineChart } from '@/components/charts/EChartsLineChart';

<EChartsLineChart
  traces={[
    {
      name: 'Series 1',
      x: 'time',
      y: 'value',
      data: [...],
      color: '#008fec'
    }
  ]}
  title="My Chart"
  xAxisLabel="Time"
  yAxisLabel="Value"
  enableZoom={true}
  enablePan={true}
  height={400}
/>
```

### 2. EChartsDualAxisChart

**Replaces**: `ZoomableLineChart.tsx` (Recharts version)

**Features**:

- Independent left/right Y-axis zoom
- X-axis zoom and pan
- Perfect for comparing metrics with different scales
- Dual-axis support with different colors

**Usage**:

```tsx
import { EChartsDualAxisChart } from "@/components/charts/EChartsDualAxisChart";

<EChartsDualAxisChart
  data={[
    { name: 1, cost: 4.11, impression: 100 },
    { name: 2, cost: 2.39, impression: 120 },
    // ...
  ]}
  series={[
    {
      name: "Cost",
      dataKey: "cost",
      color: "#8884d8",
      yAxisId: "left",
    },
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
/>;
```

### 3. EChartsScatterChart

**New component** for scatter plot visualizations

**Features**:

- 2D zoom and pan
- Customizable symbol size
- Great for correlation analysis

**Usage**:

```tsx
import { EChartsScatterChart } from "@/components/charts/EChartsScatterChart";

<EChartsScatterChart
  series={[
    {
      name: "Group A",
      data: [
        [10, 20],
        [20, 30],
        [30, 40],
      ],
      color: "#008fec",
    },
  ]}
  title="Correlation Analysis"
  xAxisLabel="X Value"
  yAxisLabel="Y Value"
  symbolSize={8}
/>;
```

## Theme System

### CSS Variable Integration

The theme system automatically reads your CSS variables:

```css
/* From global.css */
--color-theme-accent: #008fec;
--color-theme-background: #00071b;
--color-theme-foreground: #2264e3;
--color-theme-muted: #212f3f;
--color-theme-border: #2264e3;
```

These are automatically applied to all charts via `getEChartsTheme()`.

### Customizing Theme

Edit `src/utils/echartsTheme.ts` to modify:

- Color palette
- Axis styling
- Grid appearance
- Tooltip styling
- Animation settings

## Zoom & Pan Features

### Mouse Wheel Zoom

- **Default**: Enabled
- **Behavior**: Scroll wheel zooms in/out on X-axis
- **Modifier**: Can be configured with `shift`, `ctrl`, `alt`

### Pan (Move)

- **Default**: Enabled
- **Behavior**: Click and drag to move data around
- **Modifier**: Can be configured with `shift`, `ctrl`, `alt`

### Slider Zoom

- **Default**: Enabled
- **Behavior**: Drag slider at bottom to zoom X-axis
- **Customizable**: Can be hidden or positioned differently

### Configuration Example

```tsx
// Zoom only (no pan)
<EChartsLineChart
  traces={traces}
  enableZoom={true}
  enablePan={false}
/>

// Pan only (no zoom)
<EChartsLineChart
  traces={traces}
  enableZoom={false}
  enablePan={true}
/>

// Both enabled (default)
<EChartsLineChart
  traces={traces}
  enableZoom={true}
  enablePan={true}
/>
```

## Migration Checklist

### Phase 1: Setup ✅

- [x] Install ECharts packages
- [x] Create theme configuration
- [x] Create new chart components

### Phase 2: Testing (Next)

- [ ] Test EChartsLineChart with existing data
- [ ] Test EChartsDualAxisChart with dual-axis data
- [ ] Test EChartsScatterChart with scatter data
- [ ] Verify zoom/pan functionality
- [ ] Verify theme application

### Phase 3: Migration (Next)

- [ ] Replace LineChart.tsx imports
- [ ] Replace ZoomableLineChart.tsx imports
- [ ] Replace ScatterChart.tsx imports
- [ ] Update any custom hooks (useGraphZoom, useGraphZoom2D)
- [ ] Remove Recharts dependencies

### Phase 4: Cleanup (Next)

- [ ] Remove old Recharts components
- [ ] Remove old zoom hooks
- [ ] Remove @recharts/devtools
- [ ] Run `npm prune`
- [ ] Test build and production

## Performance Considerations

### Large Datasets

ECharts handles large datasets better than Recharts:

- Use `sampling` option for datasets > 10,000 points
- Enable `progressive` rendering for smooth interactions

### Memory Usage

- ECharts instances are properly disposed on unmount
- Each chart instance uses ~2-5MB depending on data size
- Consider lazy loading charts if you have many on one page

### Animation Performance

- Animations are smooth but can be disabled for better performance
- Set `animationDuration: 0` to disable animations

## Troubleshooting

### Chart Not Rendering

1. Check that container has a defined height
2. Verify data format matches expected structure
3. Check browser console for errors

### Zoom Not Working

1. Ensure `enableZoom={true}` is set
2. Check that data has sufficient range
3. Verify mouse wheel events are not prevented by parent

### Theme Not Applied

1. Ensure CSS variables are defined in `:root`
2. Check that `getEChartsTheme()` is being called
3. Verify browser supports CSS custom properties

### Performance Issues

1. Reduce animation duration
2. Use sampling for large datasets
3. Consider using Canvas renderer instead of SVG

## API Reference

### EChartsLineChart Props

```typescript
interface EChartsLineChartProps {
  traces: Trace[]; // Array of data series
  title?: string; // Chart title
  xAxisLabel?: string; // X-axis label
  yAxisLabel?: string; // Y-axis label
  enableZoom?: boolean; // Enable mouse wheel zoom (default: true)
  enablePan?: boolean; // Enable drag to pan (default: true)
  height?: number | string; // Chart height (default: 400)
  width?: number | string; // Chart width (default: '100%')
}
```

### EChartsDualAxisChart Props

```typescript
interface EChartsDualAxisChartProps {
  data: DualAxisData[]; // Array of data points
  series: DualAxisSeries[]; // Array of series config
  title?: string; // Chart title
  xAxisLabel?: string; // X-axis label
  leftYAxisLabel?: string; // Left Y-axis label
  rightYAxisLabel?: string; // Right Y-axis label
  height?: number | string; // Chart height (default: 400)
  width?: number | string; // Chart width (default: '100%')
}
```

### EChartsScatterChart Props

```typescript
interface EChartsScatterChartProps {
  series: ScatterData[]; // Array of scatter series
  title?: string; // Chart title
  xAxisLabel?: string; // X-axis label
  yAxisLabel?: string; // Y-axis label
  height?: number | string; // Chart height (default: 400)
  width?: number | string; // Chart width (default: '100%')
  symbolSize?: number; // Symbol size (default: 8)
}
```

## Resources

- [ECharts Official Documentation](https://echarts.apache.org/en/index.html)
- [ECharts API Reference](https://echarts.apache.org/en/api.html)
- [ECharts Examples](https://echarts.apache.org/examples/en/index.html)
- [ECharts Theme Builder](https://echarts.apache.org/en/theme-builder.html)

## Next Steps

1. Test the new components with your existing data
2. Verify zoom/pan functionality meets your needs
3. Migrate existing chart usages one by one
4. Remove old Recharts components once migration is complete
5. Optimize performance if needed

## Questions?

Refer to the ECharts documentation or check the component source code for detailed implementation details.
