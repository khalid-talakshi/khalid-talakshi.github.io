import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

export interface DualAxisData {
  name: string | number;
  [key: string]: string | number;
}

export interface DualAxisSeries {
  name: string;
  dataKey: string;
  color: string;
  yAxisId: "left" | "right";
}

export interface EChartsDualAxisChartProps {
  data: DualAxisData[];
  series: DualAxisSeries[];
  title?: string;
  xAxisLabel?: string;
  leftYAxisLabel?: string;
  rightYAxisLabel?: string;
  height?: number | string;
  width?: number | string;
}

/**
 * ECharts dual-axis chart with independent zoom for each axis
 * Perfect for comparing metrics with different scales
 *
 * Features:
 * - Independent left and right Y-axis zoom
 * - X-axis zoom and pan
 * - Smooth animations
 * - Full theme customization
 * - Responsive design
 */
export const EChartsDualAxisChart: React.FC<EChartsDualAxisChartProps> = ({
  data,
  series,
  title,
  xAxisLabel,
  leftYAxisLabel,
  rightYAxisLabel,
  height = 400,
  width = "100%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!containerRef.current || !data.length || !series.length) return;

    // Initialize ECharts instance
    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current, "light");
    }

    const chart = chartRef.current;

    // Prepare series configuration
    const chartSeries = series.map((s) => ({
      name: s.name,
      type: "line",
      data: data.map((d) => d[s.dataKey]),
      yAxisIndex: s.yAxisId === "left" ? 0 : 1,
      itemStyle: {
        color: s.color,
      },
      lineStyle: {
        color: s.color,
        width: 2,
      },
      smooth: true,
      animation: true,
      animationDuration: 300,
      symbolSize: 4,
      showSymbol: false,
      hoverSymbolSize: 6,
    }));

    // Calculate Y-axis domains for each axis
    const leftSeriesData = series
      .filter((s) => s.yAxisId === "left")
      .flatMap((s) => data.map((d) => Number(d[s.dataKey])))
      .filter((v) => !isNaN(v));

    const rightSeriesData = series
      .filter((s) => s.yAxisId === "right")
      .flatMap((s) => data.map((d) => Number(d[s.dataKey])))
      .filter((v) => !isNaN(v));

    const leftYMin = Math.min(...leftSeriesData);
    const leftYMax = Math.max(...leftSeriesData);
    const rightYMin = Math.min(...rightSeriesData);
    const rightYMax = Math.max(...rightSeriesData);

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
        trigger: "axis",
        backgroundColor: "rgba(17, 17, 17, 0.95)",
        borderColor: "rgba(59, 130, 246, 0.4)",
        borderWidth: 1,
        textStyle: {
          color: "#f5f5f5",
          fontSize: 12,
          fontFamily: "'Cascadia Code', monospace",
        },
        padding: [8, 12],
        axisPointer: {
          type: "cross",
          lineStyle: {
            color: "rgba(59, 130, 246, 0.5)",
            width: 1,
            type: "dashed",
          },
          crossStyle: {
            color: "rgba(59, 130, 246, 0.5)",
            width: 1,
          },
        },
      },
      legend: {
        data: series.map((s) => s.name),
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
        type: "category",
        name: xAxisLabel,
        nameTextStyle: {
          color: "#a0a0a0",
          fontSize: 11,
        },
        data: data.map((d) => d.name),
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
      yAxis: [
        {
          type: "value",
          name: leftYAxisLabel,
          nameTextStyle: {
            color: "#a0a0a0",
            fontSize: 11,
          },
          position: "left",
          min: leftYMin,
          max: leftYMax,
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
        {
          type: "value",
          name: rightYAxisLabel,
          nameTextStyle: {
            color: "#a0a0a0",
            fontSize: 11,
          },
          position: "right",
          min: rightYMin,
          max: rightYMax,
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
      ],
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
      series: series.map((s, index) => {
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
        const color = s.color || defaultColors[index % defaultColors.length];

        // Convert hex color to rgba for gradient
        const hexToRgba = (hex: string, alpha: number) => {
          if (!hex || typeof hex !== "string" || !hex.startsWith("#")) {
            return `rgba(0, 143, 236, ${alpha})`;
          }
          try {
            // Handle both 3-digit (#fff) and 6-digit (#ffffff) hex colors
            let hexColor = hex.slice(1);
            if (hexColor.length === 3) {
              hexColor = hexColor
                .split("")
                .map((char) => char + char)
                .join("");
            }
            if (hexColor.length !== 6) {
              return `rgba(0, 143, 236, ${alpha})`;
            }
            const r = parseInt(hexColor.slice(0, 2), 16);
            const g = parseInt(hexColor.slice(2, 4), 16);
            const b = parseInt(hexColor.slice(4, 6), 16);
            if (isNaN(r) || isNaN(g) || isNaN(b)) {
              return `rgba(0, 143, 236, ${alpha})`;
            }
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          } catch {
            return `rgba(0, 143, 236, ${alpha})`;
          }
        };

        return {
          name: s.name,
          type: "line",
          data: data.map((d) => d[s.dataKey]),
          yAxisIndex: s.yAxisId === "left" ? 0 : 1,
          itemStyle: {
            color: color,
            borderWidth: 0,
          },
          lineStyle: {
            color: color,
            width: 2.5,
            cap: "round" as const,
            join: "round" as const,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: hexToRgba(color, 0.3),
              },
              {
                offset: 1,
                color: hexToRgba(color, 0.05),
              },
            ]),
          },
          smooth: 0.4,
          animation: true,
          animationDuration: 400,
          animationEasing: "cubicOut" as const,
          symbolSize: 0,
          showSymbol: false,
          hoverSymbolSize: 8,
          emphasis: {
            itemStyle: {
              borderWidth: 2,
              borderColor: color,
            },
            lineStyle: {
              width: 3,
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
  }, [data, series, title, xAxisLabel, leftYAxisLabel, rightYAxisLabel]);

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

export default EChartsDualAxisChart;
