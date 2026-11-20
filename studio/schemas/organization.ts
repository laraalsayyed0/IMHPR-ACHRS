import { defineField, defineType } from "sanity";

export const organization = defineType({
  name: "organization",
  title: "Organization",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameAr",
      title: "Name (Arabic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descriptionAr",
      title: "Description (Arabic)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "country",
      title: "Country (English)",
      type: "string",
    }),
    defineField({
      name: "countryAr",
      title: "Country (Arabic)",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Membership Type",
      type: "string",
      options: {
        list: [
          { title: "Full Member", value: "member" },
          { title: "Partner Organisation", value: "partner" },
          { title: "Observer", value: "observer" },
          { title: "Associate", value: "associate" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "logoPath",
      title: "Logo Path",
      type: "string",
      description: "Path to logo in /public/logos/ e.g. /logos/achrs.png",
    }),
    defineField({
      name: "active",
      title: "Active Member",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this organization from the website",
    }),
    defineField({
      name: "joinedYear",
      title: "Year Joined",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "country" },
  },
});
