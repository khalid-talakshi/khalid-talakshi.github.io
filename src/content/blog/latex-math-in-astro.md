---
title: "Using LaTeX Math in Astro Markdown"
author: "Khalid Talakshi"
description: "A practical example of inline and block LaTeX math rendering in this Astro site."
published: false
date: 28-04-2026
tags: ["docs", "astro", "latex", "math"]
---

This post demonstrates how math syntax renders after enabling `remark-math` + `rehype-katex`.

## Inline math

You can write inline equations with single dollar signs, for example: $e^{i\pi} + 1 = 0$.

Another practical example is logistic regression:
$P(y=1\mid x)=\sigma(\beta_0+\beta_1x)$.

## Block math

Use double dollar signs for display equations:

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

$$
\hat{\beta} = (X^T X)^{-1} X^T y
$$

## Matrix example

$$
A =
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
$$

## Tips

- Escape backslashes in markdown exactly as shown above.
- Prefer block math for long formulas.
- Keep equations close to the paragraph that explains them.

For contributor instructions and troubleshooting, see `docs/guides/LATEX_MARKDOWN_GUIDE.md`.
