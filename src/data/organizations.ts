import { z } from "astro/zod";

const organizationSchema = z.object({
  id: z.string().min(1),
  category: z.enum(["client", "partner"]),
  nameKo: z.string().min(1),
  nameEn: z.string().min(1),
  displayOrder: z.number().nonnegative().int(),
});

const organizationsSchema = z
  .array(organizationSchema)
  .refine(
    (items) => new Set(items.map((item) => item.id)).size === items.length,
    "중복된 조직 ID가 존재합니다.",
  )
  .refine(
    (items) =>
      new Set(items.map((item) => item.nameKo.replace(/\s/g, "").toLowerCase())).size ===
      items.length,
    "중복된 조직 상호가 존재합니다.",
  );

export const organizations = organizationsSchema.parse([
  {
    id: "hanjeon-kps",
    category: "client",
    nameKo: "한전KPS",
    nameEn: "KEPCO KPS",
    displayOrder: 1,
  },
  {
    id: "susan-industries",
    category: "partner",
    nameKo: "수산인더스트리",
    nameEn: "Soosan Industries",
    displayOrder: 1,
  },
  {
    id: "kumhwa-psc",
    category: "partner",
    nameKo: "금화PSC",
    nameEn: "Geumhwa PSC",
    displayOrder: 2,
  },
  {
    id: "oes",
    category: "partner",
    nameKo: "OES",
    nameEn: "OES",
    displayOrder: 3,
  },
]);
