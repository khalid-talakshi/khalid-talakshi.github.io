/**
 * ECharts theme configuration that matches your CSS variables
 * Maps your Tailwind theme colors to ECharts theme properties
 */

export interface EChartsThemeConfig {
  backgroundColor: string;
  textStyle: {
    color: string;
  };
  title: {
    textStyle: {
      color: string;
    };
  };
  line: {
    itemStyle: {
      borderWidth: number;
    };
    lineStyle: {
      width: number;
    };
    symbolSize: number;
    smooth: boolean;
  };
  radar: {
    itemStyle: {
      borderWidth: number;
    };
    lineStyle: {
      width: number;
    };
    symbolSize: number;
    smooth: boolean;
  };
  bar: {
    itemStyle: {
      barBorderWidth: number;
    };
  };
  pie: {
    itemStyle: {
      borderWidth: number;
    };
  };
  boxplot: {
    itemStyle: {
      borderWidth: number;
    };
  };
  scatter: {
    itemStyle: {
      borderWidth: number;
    };
  };
  parallel: {
    itemStyle: {
      borderWidth: number;
    };
  };
  sankey: {
    itemStyle: {
      borderWidth: number;
    };
  };
  funnel: {
    itemStyle: {
      borderWidth: number;
    };
  };
  gauge: {
    itemStyle: {
      borderWidth: number;
    };
  };
  candlestick: {
    itemStyle: {
      color: string;
      color0: string;
      borderColor: string;
      borderColor0: string;
    };
  };
  graph: {
    itemStyle: {
      borderWidth: number;
    };
    lineStyle: {
      width: number;
    };
    symbolSize: number;
    smooth: boolean;
    color: string[];
    label: {
      color: string;
    };
  };
  map: {
    itemStyle: {
      areaColor: string;
      borderColor: string;
      borderWidth: number;
    };
    label: {
      color: string;
    };
    emphasis: {
      itemStyle: {
        areaColor: string;
        borderColor: string;
        borderWidth: number;
      };
      label: {
        color: string;
      };
    };
  };
  geo: {
    itemStyle: {
      areaColor: string;
      borderColor: string;
      borderWidth: number;
    };
    label: {
      color: string;
    };
    emphasis: {
      itemStyle: {
        areaColor: string;
        borderColor: string;
        borderWidth: number;
      };
      label: {
        color: string;
      };
    };
  };
  categoryAxis: {
    axisLine: {
      show: boolean;
      lineStyle: {
        color: string;
      };
    };
    axisTick: {
      show: boolean;
      lineStyle: {
        color: string;
      };
    };
    axisLabel: {
      show: boolean;
      color: string;
    };
    splitLine: {
      show: boolean;
      lineStyle: {
        color: string[];
      };
    };
    splitArea: {
      show: boolean;
      areaStyle: {
        color: string[];
      };
    };
  };
  valueAxis: {
    axisLine: {
      show: boolean;
      lineStyle: {
        color: string;
      };
    };
    axisTick: {
      show: boolean;
      lineStyle: {
        color: string;
      };
    };
    axisLabel: {
      show: boolean;
      color: string;
    };
    splitLine: {
      show: boolean;
      lineStyle: {
        color: string[];
      };
    };
    splitArea: {
      show: boolean;
      areaStyle: {
        color: string[];
      };
    };
  };
  logAxis: {
    axisLine: {
      show: boolean;
      lineStyle: {
        color: string;
      };
    };
    axisTick: {
      show: boolean;
      lineStyle: {
        color: string;
      };
    };
    axisLabel: {
      show: boolean;
      color: string;
    };
    splitLine: {
      show: boolean;
      lineStyle: {
        color: string[];
      };
    };
    splitArea: {
      show: boolean;
      areaStyle: {
        color: string[];
      };
    };
  };
  timeAxis: {
    axisLine: {
      show: boolean;
      lineStyle: {
        color: string;
      };
    };
    axisTick: {
      show: boolean;
      lineStyle: {
        color: string;
      };
    };
    axisLabel: {
      show: boolean;
      color: string;
    };
    splitLine: {
      show: boolean;
      lineStyle: {
        color: string[];
      };
    };
    splitArea: {
      show: boolean;
      areaStyle: {
        color: string[];
      };
    };
  };
  toolbox: {
    iconStyle: {
      borderColor: string;
    };
    emphasis: {
      iconStyle: {
        borderColor: string;
      };
    };
  };
  series: {
    label: {
      color: string;
    };
  };
  legend: {
    textStyle: {
      color: string;
    };
  };
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: string;
        width: number;
      };
      crossStyle: {
        color: string;
        width: number;
      };
    };
  };
  timeline: {
    lineStyle: {
      color: string;
      width: number;
    };
    itemStyle: {
      color: string;
      borderWidth: number;
    };
    controlStyle: {
      color: string;
      borderColor: string;
      borderWidth: number;
    };
    checkpointStyle: {
      color: string;
      borderColor: string;
    };
    label: {
      color: string;
    };
    emphasis: {
      itemStyle: {
        color: string;
      };
      controlStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
      };
      label: {
        color: string;
      };
    };
  };
  visualMap: {
    textStyle: {
      color: string;
    };
  };
  dataZoom: {
    backgroundColor: string;
    dataBackgroundColor: string;
    fillerColor: string;
    handleColor: string;
    handleSize: string;
    textStyle: {
      color: string;
    };
  };
  markPoint: {
    label: {
      color: string;
    };
  };
  color: string[];
}

/**
 * Get ECharts theme configuration from CSS variables
 * This function reads your CSS custom properties and converts them to ECharts theme format
 */
export function getEChartsTheme(): EChartsThemeConfig {
  // Get computed styles from root element
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  // Helper function to get CSS variable value
  const getCSSVar = (varName: string, fallback: string = ""): string => {
    const value = computedStyle.getPropertyValue(varName).trim();
    return value || fallback;
  };

  // Extract your theme colors
  const accentColor = getCSSVar("--color-theme-accent", "#008fec");
  const backgroundColor = getCSSVar("--color-theme-background", "#00071b");
  const foregroundColor = getCSSVar("--color-theme-foreground", "#2264e3");
  const mutedColor = getCSSVar("--color-theme-muted", "#212f3f");
  const borderColor = getCSSVar("--color-theme-border", "#2264e3");

  // Color palette for series (mix of accent and complementary colors)
  const colorPalette = [
    accentColor,
    foregroundColor,
    "#82ca9d", // Green
    "#fac858", // Yellow
    "#ee6666", // Red
    "#73c0de", // Light blue
    "#5470c6", // Purple
    "#91419f", // Dark purple
    "#ee7733", // Orange
    "#0077bb", // Dark blue
  ];

  return {
    backgroundColor,
    textStyle: {
      color: "#ffffff",
    },
    title: {
      textStyle: {
        color: accentColor,
      },
    },
    line: {
      itemStyle: {
        borderWidth: 1,
      },
      lineStyle: {
        width: 2,
      },
      symbolSize: 4,
      smooth: true,
    },
    radar: {
      itemStyle: {
        borderWidth: 1,
      },
      lineStyle: {
        width: 2,
      },
      symbolSize: 4,
      smooth: true,
    },
    bar: {
      itemStyle: {
        barBorderWidth: 0,
      },
    },
    pie: {
      itemStyle: {
        borderWidth: 0,
      },
    },
    boxplot: {
      itemStyle: {
        borderWidth: 1,
      },
    },
    scatter: {
      itemStyle: {
        borderWidth: 0,
      },
    },
    parallel: {
      itemStyle: {
        borderWidth: 0,
      },
    },
    sankey: {
      itemStyle: {
        borderWidth: 0,
      },
    },
    funnel: {
      itemStyle: {
        borderWidth: 0,
      },
    },
    gauge: {
      itemStyle: {
        borderWidth: 0,
      },
    },
    candlestick: {
      itemStyle: {
        color: "#ec0000",
        color0: "#00da3c",
        borderColor: "#8A0000",
        borderColor0: "#008F28",
      },
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
      },
      lineStyle: {
        width: 1,
      },
      symbolSize: 4,
      smooth: true,
      color: colorPalette,
      label: {
        color: "#ffffff",
      },
    },
    map: {
      itemStyle: {
        areaColor: mutedColor,
        borderColor: borderColor,
        borderWidth: 0.5,
      },
      label: {
        color: "#ffffff",
      },
      emphasis: {
        itemStyle: {
          areaColor: foregroundColor,
          borderColor: accentColor,
          borderWidth: 1,
        },
        label: {
          color: "#ffffff",
        },
      },
    },
    geo: {
      itemStyle: {
        areaColor: mutedColor,
        borderColor: borderColor,
        borderWidth: 0.5,
      },
      label: {
        color: "#ffffff",
      },
      emphasis: {
        itemStyle: {
          areaColor: foregroundColor,
          borderColor: accentColor,
          borderWidth: 1,
        },
        label: {
          color: "#ffffff",
        },
      },
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: borderColor,
        },
      },
      axisLabel: {
        show: true,
        color: "#ffffff",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [mutedColor],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [mutedColor],
        },
      },
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: borderColor,
        },
      },
      axisLabel: {
        show: true,
        color: "#ffffff",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [mutedColor],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [mutedColor],
        },
      },
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: borderColor,
        },
      },
      axisLabel: {
        show: true,
        color: "#ffffff",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [mutedColor],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [mutedColor],
        },
      },
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: borderColor,
        },
      },
      axisLabel: {
        show: true,
        color: "#ffffff",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [mutedColor],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [mutedColor],
        },
      },
    },
    toolbox: {
      iconStyle: {
        borderColor: borderColor,
      },
      emphasis: {
        iconStyle: {
          borderColor: accentColor,
        },
      },
    },
    series: {
      label: {
        color: "#ffffff",
      },
    },
    legend: {
      textStyle: {
        color: "#ffffff",
      },
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: borderColor,
          width: 1,
        },
        crossStyle: {
          color: borderColor,
          width: 1,
        },
      },
    },
    timeline: {
      lineStyle: {
        color: borderColor,
        width: 1,
      },
      itemStyle: {
        color: foregroundColor,
        borderWidth: 1,
      },
      controlStyle: {
        color: "#ffffff",
        borderColor: borderColor,
        borderWidth: 0.5,
      },
      checkpointStyle: {
        color: accentColor,
        borderColor: accentColor,
      },
      label: {
        color: "#ffffff",
      },
      emphasis: {
        itemStyle: {
          color: accentColor,
        },
        controlStyle: {
          color: "#ffffff",
          borderColor: accentColor,
          borderWidth: 0.5,
        },
        label: {
          color: "#ffffff",
        },
      },
    },
    visualMap: {
      textStyle: {
        color: "#ffffff",
      },
    },
    dataZoom: {
      backgroundColor: "rgba(47, 69, 84, 0.3)",
      dataBackgroundColor: "rgba(47, 69, 84, 0.1)",
      fillerColor: "rgba(167, 183, 204, 0.4)",
      handleColor: "#a7b7cc",
      handleSize: "100%",
      textStyle: {
        color: "#ffffff",
      },
    },
    markPoint: {
      label: {
        color: "#ffffff",
      },
    },
    color: colorPalette,
  };
}

/**
 * Register the theme with ECharts
 */
export async function registerEChartsTheme(): Promise<void> {
  if (typeof window !== "undefined") {
    const echarts = await import("echarts");
    const theme = getEChartsTheme();
    echarts.registerTheme("custom-theme", theme);
  }
}
