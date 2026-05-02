import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import { BLUE_WHITE_RED_SCALE, getColorForValue } from "../../utils/colorScale";
import {
  extractDataValues,
  hasDataKey,
  isHexColor,
} from "../../utils/colorDetection";
import type { Trace } from "../../types";

export interface EChartsScatterChartProps {
  traces?: Trace[];
  series?: Trace[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number | string;
  width?: number | string;
  symbolSize?: number;
}

/**
 * ECharts scatter chart with zoom and pan support
 * Great for visualizing correlations and distributions
 *
 * Features:
 * - Mouse wheel zoom
 * - Pan support
 * - Customizable symbol size
 * - Full theme customization
 * - Responsive design
 */
export const EChartsScatterChart: React.FC<EChartsScatterChartProps> = ({
  traces,
  series,
  title,
  xAxisLabel,
  yAxisLabel,
  height = 400,
  width = "100%",
  symbolSize = 8,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const inputTraces = traces ?? series ?? [];

  useEffect(() => {
    if (!containerRef.current || !inputTraces.length) return;

    // Initialize ECharts instance
    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current, "light");
    }

    const chart = chartRef.current;

    // Professional color palette: Blues, Reds, Blacks, Whites
    const defaultColors = [
      "#0066cc", // Deep Blue
      "#cc0000", // Deep Red
      "#1a1a1a", // Black
      "#ffffff", // White
      "#0099ff", // Bright Blue
      "#ff3333", // Bright Red
      "#333333", // Dark Gray
      "#e6e6e6", // Light Gray
      "#003d99", // Navy Blue
      "#990000", // Dark Red
    ];

    const normalizedTraces = inputTraces.map((trace) => {
      const firstDataPoint = trace.data[0];
      if (!firstDataPoint) {
        return {
          ...trace,
          points: [] as number[][],
          colorValues: undefined as number[] | undefined,
        };
      }

      const points = trace.data.map((d, pointIndex) => {
        const x = Number(d[trace.x]);
        const y = Number(d[trace.y]);
        if (Number.isNaN(x) || Number.isNaN(y)) {
          throw new Error(
            `Trace "${trace.name}": invalid numeric value at index ${pointIndex} for keys "${trace.x}" and "${trace.y}".`,
          );
        }
        return [x, y];
      });

      if (isHexColor(trace.color)) {
        return {
          ...trace,
          points,
          colorValues: undefined as number[] | undefined,
        };
      }

      if (!hasDataKey(trace.data, trace.color)) {
        throw new Error(
          `Trace "${trace.name}": color key "${trace.color}" not found in data. ` +
            `Available keys: ${Object.keys(firstDataPoint).join(", ")}`,
        );
      }

      const colorValues = extractDataValues(trace.data, trace.color);
      if (colorValues.length !== trace.data.length) {
        throw new Error(
          `Trace "${trace.name}": color key "${trace.color}" contains non-numeric values.`,
        );
      }

      return { ...trace, points, colorValues };
    });

    // Calculate data domain
    const allData = normalizedTraces.flatMap((s) => s.points);
    const xValues = allData.map((d) => d[0]).filter((v) => !isNaN(v));
    const yValues = allData.map((d) => d[1]).filter((v) => !isNaN(v));

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    // Add padding to domain
    const xPadding = (xMax - xMin) * 0.1;
    const yPadding = (yMax - yMin) * 0.1;

    // Build chart option with modern design
    const option: EChartsOption = {
      title: title
        ? {
            text: title,
            left: "center",
            top: "8px",
            textStyle: {
              color: "#f5f5f5",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'Cascadia Code', monospace",
            },
          }
        : undefined,
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(17, 17, 17, 0.95)",
        borderColor: "rgba(59, 130, 246, 0.4)",
        borderWidth: 1,
        textStyle: {
          color: "#f5f5f5",
          fontSize: 12,
          fontFamily: "'Cascadia Code', monospace",
        },
        padding: [8, 12],
        formatter: (params: any) => {
          if (params.componentSubType === "scatter") {
            const value = Array.isArray(params.value)
              ? params.value
              : params.value?.value;
            const x = Number(value?.[0]);
            const y = Number(value?.[1]);

            let tooltip = `<div style="font-weight: 500;">${params.name}</div><div style="margin-top: 4px;">X: ${x.toFixed(2)}</div><div>Y: ${y.toFixed(2)}</div>`;

            const colorValues =
              normalizedTraces[params.seriesIndex]?.colorValues;
            const colorValue =
              colorValues && params.dataIndex >= 0
                ? colorValues[params.dataIndex]
                : undefined;
            if (typeof colorValue === "number" && !Number.isNaN(colorValue)) {
              const colorLabel =
                normalizedTraces[params.seriesIndex]?.color || "Color";
              tooltip += `<div>${colorLabel}: ${colorValue.toFixed(2)}</div>`;
            }

            return tooltip;
          }
          return params.name;
        },
      },
      legend: {
        data: inputTraces.map((s) => s.name),
        textStyle: {
          color: "#f5f5f5",
          fontSize: 12,
          fontFamily: "'Cascadia Code', monospace",
        },
        bottom: 12,
        itemGap: 16,
        icon: "circle",
      },
      grid: {
        left: "12%",
        right: "12%",
        top: title ? "18%" : "12%",
        bottom: "18%",
        containLabel: false,
        backgroundColor: "rgba(31, 31, 31, 0.3)",
        borderColor: "rgba(59, 130, 246, 0.15)",
        borderWidth: 1,
      },
      xAxis: {
        type: "value",
        name: xAxisLabel,
        nameTextStyle: {
          color: "#a0a0a0",
          fontSize: 11,
        },
        min: xMin - xPadding,
        max: xMax + xPadding,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(59, 130, 246, 0.2)",
            width: 1,
          },
        },
        axisLabel: {
          color: "#a0a0a0",
          fontSize: 11,
          margin: 8,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(59, 130, 246, 0.1)",
            width: 1,
            type: "dashed",
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        name: yAxisLabel,
        nameTextStyle: {
          color: "#a0a0a0",
          fontSize: 11,
        },
        min: yMin - yPadding,
        max: yMax + yPadding,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(59, 130, 246, 0.2)",
            width: 1,
          },
        },
        axisLabel: {
          color: "#a0a0a0",
          fontSize: 11,
          margin: 8,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(59, 130, 246, 0.1)",
            width: 1,
            type: "dashed",
          },
        },
        axisTick: {
          show: false,
        },
      },
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: 0,
          start: 0,
          end: 100,
          zoomOnMouseWheel: true,
          moveOnMouseMove: true,
          moveOnMouseWheel: false,
          preventDefaultMouseMove: true,
        },
        {
          type: "inside",
          yAxisIndex: 0,
          start: 0,
          end: 100,
          zoomOnMouseWheel: true,
          moveOnMouseMove: true,
          moveOnMouseWheel: false,
          preventDefaultMouseMove: true,
        },
        {
          type: "slider",
          xAxisIndex: 0,
          start: 0,
          end: 100,
          textStyle: {
            color: "#a0a0a0",
          },
          handleStyle: {
            color: "#60a5fa",
            borderColor: "#3b82f6",
            borderWidth: 2,
          },
          fillerColor: "rgba(59, 130, 246, 0.3)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.2)",
        },
      ],
      series: normalizedTraces.map((s, index) => {
        const colorValues = s.colorValues;

        // Check if this series has color mapping
        if (colorValues && colorValues.length > 0) {
          const colorScale = s.colorScale ?? BLUE_WHITE_RED_SCALE;
          const minColor = Math.min(...colorValues);
          const maxColor = Math.max(...colorValues);

          return {
            name: s.name,
            type: "scatter",
            data: s.points.map((point, pointIndex) => ({
              value: point,
              itemStyle: {
                color: getColorForValue(
                  colorValues[pointIndex],
                  minColor,
                  maxColor,
                  colorScale,
                ),
                borderWidth: 0,
                opacity: 0.8,
              },
            })),
            symbolSize,
            animation: true,
            animationDuration: 400,
            animationEasing: "cubicOut" as const,
            emphasis: {
              itemStyle: {
                borderWidth: 2,
                opacity: 1,
              },
            },
          };
        }

        // Fallback to solid color
        return {
          name: s.name,
          type: "scatter",
          data: s.points,
          itemStyle: {
            color: s.color || defaultColors[index % defaultColors.length],
            borderWidth: 0,
            opacity: 0.8,
          },
          symbolSize,
          animation: true,
          animationDuration: 400,
          animationEasing: "cubicOut" as const,
          emphasis: {
            itemStyle: {
              borderWidth: 2,
              borderColor:
                s.color || defaultColors[index % defaultColors.length],
              opacity: 1,
            },
          },
        };
      }) as EChartsOption["series"],
    };

    chart.setOption(option);

    // Handle window resize
    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [inputTraces, title, xAxisLabel, yAxisLabel, symbolSize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height: typeof height === "number" ? `${height}px` : height,
        backgroundColor: "#1f1f1f",
        borderRadius: "12px",
        border: "1px solid rgba(59, 130, 246, 0.2)",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(59, 130, 246, 0.1)",
        backdropFilter: "blur(10px)",
        marginBottom: "2rem",
      }}
    />
  );
};

export default EChartsScatterChart;
