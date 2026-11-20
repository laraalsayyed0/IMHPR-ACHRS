import { defineField, defineType } from "sanity";

export const newsArticle = defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleAr",
      title: "Title (Arabic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body (English)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bodyAr",
      title: "Body (Arabic)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag (English)",
      type: "string",
      options: {
        list: [
          "Advocacy",
          "Legal",
          "Education",
          "Partnership",
          "Statement",
          "Research",
          "Event",
          "Report",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagAr",
      title: "Tag (Arabic)",
      type: "string",
      options: {
        list: [
          { title: "مناصرة", value: "مناصرة" },
          { title: "قانوني", value: "قانوني" },
          { title: "تعليم", value: "تعليم" },
          { title: "شراكة", value: "شراكة" },
          { title: "بيان", value: "بيان" },
          { title: "بحث", value: "بحث" },
          { title: "فعالية", value: "فعالية" },
          { title: "تقرير", value: "تقرير" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      description: "Show this as the featured report at the top of the News page",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
});
