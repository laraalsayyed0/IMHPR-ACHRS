import { defineField, defineType } from "sanity";

export const application = defineType({
  name: "application",
  title: "Applications",
  type: "document",
  fields: [
    defineField({ name: "type", title: "Type", type: "string", options: { list: ["intern", "partner"] } }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "pending", options: { list: ["pending", "reviewing", "accepted", "rejected"] } }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    // Intern fields
    defineField({ name: "firstName",    title: "First Name",          type: "string" }),
    defineField({ name: "lastName",     title: "Last Name",           type: "string" }),
    defineField({ name: "email",        title: "Email",               type: "string" }),
    defineField({ name: "phone",        title: "Phone",               type: "string" }),
    defineField({ name: "country",      title: "Country",             type: "string" }),
    defineField({ name: "institution",  title: "Academic Institution",type: "string" }),
    defineField({ name: "areaOfInterest", title: "Area of Interest",  type: "string" }),
    defineField({ name: "motivation",   title: "Motivation",          type: "text" }),
    // Partner fields
    defineField({ name: "orgName",      title: "Organisation Name",   type: "string" }),
    defineField({ name: "yearFounded",  title: "Year Founded",        type: "number" }),
    defineField({ name: "website",      title: "Website",             type: "url" }),
    defineField({ name: "contactPerson",title: "Contact Person",      type: "string" }),
    defineField({ name: "contactEmail", title: "Contact Email",       type: "string" }),
    defineField({ name: "areaOfWork",   title: "Area of Work",        type: "string" }),
    defineField({ name: "whyPartner",   title: "Why Partner?",        type: "text" }),
  ],
  preview: {
    select: { type: "type", firstName: "firstName", orgName: "orgName", status: "status", submittedAt: "submittedAt" },
    prepare({ type, firstName, orgName, status, submittedAt }) {
      const name = type === "intern" ? firstName : orgName;
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : "";
      return { title: `[${(type ?? "?").toUpperCase()}] ${name ?? "—"}`, subtitle: `${status ?? "pending"} · ${date}` };
    },
  },
});
