import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

export const articulos = defineCollection({
  loader: glob({ base: "./src/content/articulos", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    thumbnail: z.string(),
    date: z.date(),
    category: z.enum([
      "Orientación Laboral",
      "Competencias Docentes",
      "Metodologías Activas",
      "Pedagogía Social",
    ]),
    externalLinks: z
      .array(
        z.object({
          title: z.string(),
          url: z.url({ protocol: /^https?$/ }),
          fechaConsulta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        }),
      )
      .optional(),
  }),
});
