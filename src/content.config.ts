import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { HiDivide } from "react-icons/hi2";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    published: z.boolean(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    hidden: z.boolean().optional().default(false),
    description: z.string().optional(),
    technologies: z.array(z.string()).optional(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: z
    .object({
      kind: z.enum(["formal", "certificate"]).optional().default("formal"),
      hidden: z.boolean().optional().default(false),
      school: z.string().optional(),
      degree: z.string().optional(),
      field: z.string().optional(),
      graduationDate: z.string().optional(),
      title: z.string().optional(),
      issuer: z.string().optional(),
      issueDate: z.string().optional(),
      credentialId: z.string().optional(),
      credentialUrl: z.string().url().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.kind === "certificate") {
        if (!data.title) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Certificate entries require a title",
            path: ["title"],
          });
        }

        if (!data.issuer) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Certificate entries require an issuer",
            path: ["issuer"],
          });
        }

        if (!data.issueDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Certificate entries require an issueDate",
            path: ["issueDate"],
          });
        }

        return;
      }

      if (!data.school) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Formal education entries require a school",
          path: ["school"],
        });
      }

      if (!data.degree) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Formal education entries require a degree",
          path: ["degree"],
        });
      }

      if (!data.field) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Formal education entries require a field",
          path: ["field"],
        });
      }

      if (!data.graduationDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Formal education entries require a graduationDate",
          path: ["graduationDate"],
        });
      }
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    type: z.enum(["app", "paper", "design", "tool", "other"]).optional(),
    image: z.string().optional(),
    link: z.string().optional(),
    links: z
      .array(
        z.object({
          type: z.enum(["github", "download", "web", "other"]),
          href: z.string(),
          label: z.string().optional(),
        }),
      )
      .optional(),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
    hidden: z.boolean().optional().default(false),
  }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { blog, experience, education, projects };
