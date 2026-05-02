import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import {
  BLUE_WHITE_RED_SCALE,
  getColorForValue,
  type ColorScale,
} from "../../utils/colorScale";
import {
  isHexColor,
  hasDataKey,
  extractDataValues,
} from "../../utils/colorDetection";
import type { Trace } from "../../types";

export interface EChartsScatterChartFromTraceProps {
  traces: Trace[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number | string;
  width?: number | string;
  symbolSize?: number;
}

/**
 * ECharts scatter chart that accepts Trace objects
 * Intelligently handles color field:
 * - If color is a hex string (e.g., "#ff0000"), uses that solid color
 * - If color is a data key (e.g., "speed"), uses that field for color mapping
 *
 * Features:
 * - Mouse wheel zoom
 * - Pan support
 * - Color mapping with blue-white-red default scale
 * - Custom color scales
 * - Responsive design
 */
export const EChartsScatterChartFromTrace: React.FC<
  EChartsScatterChartFromTraceProps
> = ({
  traces,
  title,
  xAxisLabel,
  yAxisLabel,
  height = 400,
  width = "100%",
  symbolSize = 8,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!containerRef.current || !traces.length) return;

    // Initialize ECharts instance
    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current, "light");
    }

    const chart = chartRef.current;

    // Default color palette
    const defaultColors = [
      "#0066cc", // Deep Blue
      "#cc0000", // Deep Red
      "#1a1a1a", // Black
      "#0099ff", // Bright Blue
      "#ff3333", // Bright Red
      "#333333", // Dark Gray
      "#003d99", // Navy Blue
      "#990000", // Dark Red
    ];

    // Process each trace
    const chartSeries = traces.map((trace, traceIndex) => {
      const firstDataPoint = trace.data[0];
      if (!firstDataPoint) {
        return {
          name: trace.name,
          type: "scatter",
          data: [],
          symbolSize,
        };
      }

      // Extract x and y values
      const xValues = trace.data.map((d) => Number(d[trace.x]));
      const yValues = trace.data.map((d) => Number(d[trace.y]));

      // Determine if color is a hex color or a data key
      const isColorHex = isHexColor(trace.color);

      if (isColorHex) {
        // Use solid color
        return {
          name: trace.name,
          type: "scatter",
          data: trace.data.map((d) => [Number(d[trace.x]), Number(d[trace.y])]),
          itemStyle: {
            color: trace.color,
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
              borderColor: trace.color,
              opacity: 1,
            },
          },
        };
      }

      // Check if color is a valid data key
      if (!hasDataKey(trace.data, trace.color)) {
        throw new Error(
          `Trace "${trace.name}": color key "${trace.color}" not found in data. ` +
            `Available keys: ${Object.keys(firstDataPoint).join(", ")}`,
        );
      }

      // Use color mapping
      const colorValues = extractDataValues(trace.data, trace.color);
      const minColor = Math.min(...colorValues);
      const maxColor = Math.max(...colorValues);
      const colorScale = trace.colorScale || BLUE_WHITE_RED_SCALE;

      return {
        name: trace.name,
        type: "scatter",
        data: trace.data.map((d, pointIndex) => ({
          value: [Number(d[trace.x]), Number(d[trace.y])],
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
    });

    // Calculate data domain
    const allData = traces.flatMap((t) => t.data);
    const xValues = allData
      .map((d) => Number(d[traces[0].x]))
      .filter((v) => !isNaN(v));
    const yValues = allData
      .map((d) => Number(d[traces[0].y]))
      .filter((v) => !isNaN(v));

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    // Add padding to domain
    const xPadding = (xMax - xMin) * 0.1;
    const yPadding = (yMax - yMin) * 0.1;

    // Build chart option
    const option: EChartsOption = {
      title: title
        ? {
            text: title,
            left: "center",
            top: "8px",
            textStyle: {
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "system-ui, -apple-system, sans-serif",
            },
          }
        : undefined,
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        borderColor: "rgba(8, 143, 236, 0.3)",
        borderWidth: 1,
        textStyle: {
          color: "#e2e8f0",
          fontSize: 12,
          fontFamily: "system-ui, -apple-system, sans-serif",
        },
        padding: [8, 12],
        formatter: (params: any) => {
          if (params.componentSubType === "scatter") {
            const trace = traces.find((t) => t.name === params.name);
            if (!trace) return params.name;

            const dataIndex = params.dataIndex;
            const dataPoint = trace.data[dataIndex];
            if (!dataPoint) return params.name;

            let tooltip = `<div style="font-weight: 500;">${params.name}</div>`;
            tooltip += `<div style="margin-top: 4px;">${trace.x}: ${params.value[0].toFixed(2)}</div>`;
            tooltip += `<div>${trace.y}: ${params.value[1].toFixed(2)}</div>`;

            // Add color value if using color mapping
            if (!isHexColor(trace.color) && trace.color in dataPoint) {
              tooltip += `<div>${trace.color}: ${dataPoint[trace.color].toFixed(2)}</div>`;
            }

            return tooltip;
          }
          return params.name;
        },
      },
      legend: {
        data: traces.map((t) => t.name),
        textStyle: {
          color: "#cbd5e1",
          fontSize: 12,
          fontFamily: "system-ui, -apple-system, sans-serif",
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
        backgroundColor: "rgba(15, 23, 42, 0.4)",
        borderColor: "rgba(8, 143, 236, 0.1)",
        borderWidth: 1,
      },
      xAxis: {
        type: "value",
        name: xAxisLabel,
        nameTextStyle: {
          color: "#94a3b8",
          fontSize: 11,
        },
        min: xMin - xPadding,
        max: xMax + xPadding,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(8, 143, 236, 0.2)",
            width: 1,
          },
        },
        axisLabel: {
          color: "#94a3b8",
          fontSize: 11,
          margin: 8,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(8, 143, 236, 0.08)",
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
          color: "#94a3b8",
          fontSize: 11,
        },
        min: yMin - yPadding,
        max: yMax + yPadding,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(8, 143, 236, 0.2)",
            width: 1,
          },
        },
        axisLabel: {
          color: "#94a3b8",
          fontSize: 11,
          margin: 8,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(8, 143, 236, 0.08)",
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
            color: "#94a3b8",
          },
          handleStyle: {
            color: "#008fec",
            borderColor: "rgba(8, 143, 236, 0.3)",
          },
          fillerColor: "rgba(8, 143, 236, 0.15)",
          backgroundColor: "rgba(8, 143, 236, 0.05)",
          borderColor: "rgba(8, 143, 236, 0.1)",
        },
      ],
      series: chartSeries as EChartsOption["series"],
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
  }, [traces, title, xAxisLabel, yAxisLabel, symbolSize]);

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
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        borderRadius: "12px",
        border: "1px solid rgba(8, 143, 236, 0.15)",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
      }}
    />
  );
};

export default EChartsScatterChartFromTrace;
