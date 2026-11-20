import { defineField, defineType } from "sanity";

export const boardMember = defineType({
  name: "boardMember",
  title: "Board Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "nameAr", title: "Full Name (Arabic)", type: "string" }),
    defineField({ name: "role", title: "Role / Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "roleAr", title: "Role / Title (Arabic)", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
    defineField({ name: "active", title: "Show on website", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
