import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { newsArticle } from "./schemas/newsArticle";
import { organization } from "./schemas/organization";
import { event } from "./schemas/event";
import { boardMember } from "./schemas/boardMember";
import { application } from "./schemas/application";

export default defineConfig({
  name: "imhp-studio",
  title: "IMHP Rights — Studio",
  projectId: "6wcwsuyx",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [newsArticle, organization, event, boardMember, application],
  },
});
