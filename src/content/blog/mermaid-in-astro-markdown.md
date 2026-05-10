---
title: "Using Mermaid Diagrams in Astro Markdown"
author: "Khalid Talakshi"
description: "A quick check that Mermaid code fences compile to theme-aligned SVG diagrams."
published: true
date: 09-05-2026
tags: ["docs", "astro", "mermaid", "diagrams"]
---

This draft validates Mermaid rendering in blog markdown.

## Flowchart example

```mermaid
flowchart TD
  A[Start] --> B{Working?}
  B -->|Yes| C[Great]
  B -->|No| D[Debug]
  D --> B
```

## Sequence example

```mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  John-->>Alice: Great!
```

## XYChart example

```mermaid
xychart-beta
  title "Monthly Active Users"
  x-axis [Jan, Feb, Mar, Apr, May, Jun]
  y-axis "Users" 0 --> 100
  bar [22, 40, 58, 75, 83, 91]
  line [18, 35, 51, 69, 80, 88]
```

<div class="chart-legend">
  <span class="chart-legend-item">
    <span class="chart-legend-swatch chart-legend-swatch--bar"></span>
    <span>Active users (bar)</span>
  </span>
  <span class="chart-legend-item">
    <span class="chart-legend-swatch chart-legend-swatch--line"></span>
    <span>Trend line (line)</span>
  </span>
</div>
