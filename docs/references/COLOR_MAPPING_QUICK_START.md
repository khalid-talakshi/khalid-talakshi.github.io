# Color Mapping Quick Start

## What's New

You can now color scatter chart points based on a third dimension of data using a configurable color scale (defaults to blue-white-red).

## Files Changed

### New Files

- `src/utils/colorScale.ts` - Color scale utilities and interpolation
- `COLOR_MAPPING_GUIDE.md` - Comprehensive documentation

### Modified Files

- `src/types/index.ts` - Added `colorKey` and `colorScale` to Trace interface
- `src/components/charts/EChartsScatterChart.tsx` - Added color mapping support
- `src/components/ScatterChart.tsx` - Added color mapping support
- `src/pages/echarts-demo.astro` - Added example with color mapping

## Quick Examples

### ECharts (Recommended)

```tsx
import EChartsScatterChart from "../components/charts/EChartsScatterChart";

const data = [
  {
    name: "Temperature",
    data: [
      [10, 20],
      [15, 25],
      [20, 30],
    ],
    colorValues: [15, 22, 28], // Color value for each point
  },
];

<EChartsScatterChart series={data} title="Temperature Map" />;
```

### Recharts

```tsx
import { ScatterGraph } from "../components/ScatterChart";

const traces = [
  {
    name: "Measurements",
    x: "x",
    y: "y",
    color: "#008fec",
    colorKey: "temperature", // Key in data for coloring
    data: [
      { x: 10, y: 20, temperature: 15 },
      { x: 15, y: 25, temperature: 22 },
    ],
  },
];

<ScatterGraph traces={traces} />;
```

## Color Scales

### Default: Blue-White-Red

```typescript
import { BLUE_WHITE_RED_SCALE } from "../utils/colorScale";
// Blue (low) → White (middle) → Red (high)
```

### Custom Scale

```typescript
const myScale = {
  stops: [
    [0, "#00cc00"],    // Green at 0%
    [0.5, "#ffff00"],  // Yellow at 50%
    [1, "#cc0000"],    // Red at 100%
  ],
};

// Use in ECharts
const data = [{ ..., colorScale: myScale }];

// Use in Recharts
const traces = [{ ..., colorScale: myScale }];
```

## Key Features

✅ **Automatic normalization** - Values are automatically scaled to 0-1  
✅ **Smooth interpolation** - Colors blend smoothly between stops  
✅ **Backward compatible** - Existing charts work without changes  
✅ **Flexible** - Use default scale or create custom ones  
✅ **Pure functions** - All utilities are testable and composable

## API

### Trace Type (Recharts)

```typescript
interface Trace {
  colorKey?: string; // Key in data to use for coloring
  colorScale?: ColorScale; // Custom color scale
}
```

### ScatterData Type (ECharts)

```typescript
interface ScatterData {
  colorValues?: number[]; // Color value for each point
  colorScale?: ColorScale; // Custom color scale
}
```

### Utilities

```typescript
// Get color for a value in a range
getColorForValue(value, min, max, scale?)

// Normalize values to 0-1
normalizeValues(values)

// Map normalized value to color
valueToColor(normalizedValue, scale)
```

## Testing

The feature has been tested with:

- ✅ Build verification (no TypeScript errors)
- ✅ Both ECharts and Recharts implementations
- ✅ Default and custom color scales
- ✅ Large datasets (40+ points)
- ✅ Edge cases (all same values, single point)

## Next Steps

1. **View the demo**: Visit `/echarts-demo` to see color mapping in action
2. **Read the guide**: See `COLOR_MAPPING_GUIDE.md` for detailed examples
3. **Create custom scales**: Design color scales for your use case
4. **Add to your charts**: Use `colorKey` (Recharts) or `colorValues` (ECharts)

## Troubleshooting

**Q: Points all have the same color**  
A: Ensure `colorValues` array length matches `data` array length and values have range

**Q: Colors look wrong**  
A: Verify hex colors are valid (e.g., `#0066cc`) and stops are ordered 0→1

**Q: Performance issues**  
A: Reduce point count or use simpler color scales with fewer stops

## See Also

- Full documentation: `COLOR_MAPPING_GUIDE.md`
- Demo page: `/echarts-demo`
- Color utilities: `src/utils/colorScale.ts`
- Type definitions: `src/types/index.ts`
