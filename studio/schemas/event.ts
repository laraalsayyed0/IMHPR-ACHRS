import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title",       title: "Title (EN)",       type: "string", validation: r => r.required() }),
    defineField({ name: "titleAr",     title: "Title (AR)",       type: "string" }),
    defineField({ name: "body",        title: "Description (EN)", type: "text",   rows: 3 }),
    defineField({ name: "bodyAr",      title: "Description (AR)", type: "text",   rows: 3 }),
    defineField({
      name: "tag", title: "Type", type: "string",
      options: { list: ["Conference","Webinar","Workshop","Annual","Training","Panel","Other"] },
      validation: r => r.required(),
    }),
    defineField({ name: "tagAr",       title: "Type (AR)",        type: "string" }),
    defineField({ name: "eventDate",   title: "Event Date",       type: "date",   validation: r => r.required() }),
    defineField({ name: "endDate",     title: "End Date (optional, for multi-day)", type: "date" }),
    defineField({ name: "time",        title: "Time (e.g. 09:00–17:00 CET)",       type: "string" }),
    defineField({ name: "location",    title: "Location (EN)",    type: "string" }),
    defineField({ name: "locationAr",  title: "Location (AR)",    type: "string" }),
    defineField({
      name: "access", title: "Access", type: "string",
      options: { list: ["Open to public","Registration required","Free admission","Invitation only","Online – Free"] },
    }),
    defineField({ name: "accessAr",    title: "Access (AR)",      type: "string" }),
    defineField({ name: "registrationUrl", title: "Registration URL", type: "url" }),
    defineField({ name: "past",        title: "Past event?",      type: "boolean", initialValue: false }),
    defineField({ name: "participants",title: "Participant count (past events, e.g. \"120 participants\")", type: "string" }),
    defineField({ name: "participantsAr", title: "Participant count (AR)", type: "string" }),
  ],
  orderings: [{ title: "Event Date", name: "eventDateDesc", by: [{ field: "eventDate", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "eventDate", tag: "tag" },
    prepare({ title, date, tag }) {
      return { title, subtitle: `${tag ?? ""} · ${date ?? ""}` };
    },
  },
});
