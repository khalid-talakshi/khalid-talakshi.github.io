// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import rehypeMermaid from "rehype-mermaid";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          strategy: "pre-mermaid",
          errorFallback: (element) => element,
          mermaidConfig: {
            theme: "base",
            fontFamily: '"Cascadia Code", "Space Mono", monospace',
            themeVariables: {
              background: "transparent",
              primaryColor: "#3b82f6",
              primaryTextColor: "#f5f5f5",
              primaryBorderColor: "#3b82f6",
              lineColor: "#3b82f6",
              secondaryColor: "#1a1a1a",
              secondaryTextColor: "#f5f5f5",
              secondaryBorderColor: "#333333",
              tertiaryColor: "#111111",
              tertiaryTextColor: "#f5f5f5",
              tertiaryBorderColor: "#333333",
              mainBkg: "#1f1f1f",
              nodeTextColor: "#f5f5f5",
              textColor: "#f5f5f5",
              clusterBkg: "#1a1a1a",
              clusterBorder: "#333333",
              defaultLinkColor: "#3b82f6",
              titleColor: "#f5f5f5",
              edgeLabelBackground: "#111111",
              actorBkg: "#1f1f1f",
              actorBorder: "#333333",
              actorTextColor: "#f5f5f5",
              actorLineColor: "#f5f5f5",
              signalColor: "#f5f5f5",
              signalTextColor: "#f5f5f5",
              sequenceNumberColor: "#3b82f6",
              labelBoxBkgColor: "#111111",
              labelBoxBorderColor: "#333333",
              labelTextColor: "#f5f5f5",
              loopTextColor: "#f5f5f5",
              noteBkgColor: "#1a1a1a",
              noteBorderColor: "#3b82f6",
              noteTextColor: "#f5f5f5",
              activationBorderColor: "#3b82f6",
              activationBkgColor: "#1f1f1f",
              sectionBkgColor: "#1a1a1a",
              altSectionBkgColor: "#1f1f1f",
              sectionBkgColor2: "#1f1f1f",
              taskBkgColor: "#1f1f1f",
              taskTextColor: "#f5f5f5",
              taskBorderColor: "#3b82f6",
              gridColor: "#333333",
              xAxisColor: "#3b82f6",
              yAxisColor: "#3b82f6",
              xyChart: {
                titleColor: "#f5f5f5",
                xAxisLabelColor: "#f5f5f5",
                yAxisLabelColor: "#f5f5f5",
                xAxisTitleColor: "#f5f5f5",
                yAxisTitleColor: "#f5f5f5",
                plotColorPalette:
                  "#3b82f6, #60a5fa, #93c5fd, #2563eb, #1d4ed8, #1e40af",
              },
              cScale0: "#3b82f6",
              cScale1: "#1a1a1a",
              cScale2: "#1f1f1f",
            },
          },
        },
      ],
    ],
  },

  site: "https://khalidtalakshi.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
