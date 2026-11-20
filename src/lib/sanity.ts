import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}

export async function getBoardMembers() {
  return sanityClient.fetch<BoardMember[]>(
    `*[_type == "boardMember" && active != false] | order(order asc) {
      _id, name, nameAr, role, roleAr, photo, order
    }`
  );
}

export async function getNewsArticles() {
  return sanityClient.fetch<NewsArticle[]>(
    `*[_type == "newsArticle"] | order(publishedAt desc) {
      _id,
      title,
      titleAr,
      body,
      bodyAr,
      tag,
      tagAr,
      publishedAt
    }`
  );
}

export async function getFeaturedArticle() {
  return sanityClient.fetch<NewsArticle>(
    `*[_type == "newsArticle" && featured == true][0] | order(publishedAt desc) {
      _id,
      title,
      titleAr,
      body,
      bodyAr,
      publishedAt
    }`
  );
}

export async function getOrganizations() {
  return sanityClient.fetch<Organization[]>(
    `*[_type == "organization" && active != false] | order(name asc) {
      _id,
      name,
      nameAr,
      description,
      descriptionAr,
      country,
      countryAr,
      type,
      website,
      joinedYear,
      logoPath
    }`
  );
}

export async function getOrganizationById(id: string) {
  return sanityClient.fetch<Organization>(
    `*[_type == "organization" && _id == $id][0] {
      _id, name, nameAr, description, descriptionAr,
      country, countryAr, type, website, joinedYear, logoPath
    }`,
    { id }
  );
}

export async function getUpcomingEvents() {
  const today = new Date().toISOString().slice(0, 10);
  return sanityClient.fetch<Event[]>(
    `*[_type == "event" && past != true && eventDate >= $today] | order(eventDate asc) {
      _id, title, titleAr, body, bodyAr, tag, tagAr,
      eventDate, endDate, time, location, locationAr,
      access, accessAr, registrationUrl
    }`,
    { today }
  );
}

export async function getPastEvents() {
  return sanityClient.fetch<Event[]>(
    `*[_type == "event" && past == true] | order(eventDate desc) {
      _id, title, titleAr, tag, tagAr, eventDate, participants, participantsAr, location, locationAr
    }`
  );
}

export interface Event {
  _id: string;
  title: string;
  titleAr: string;
  body?: string;
  bodyAr?: string;
  tag: string;
  tagAr?: string;
  eventDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  locationAr?: string;
  access?: string;
  accessAr?: string;
  registrationUrl?: string;
  participants?: string;
  participantsAr?: string;
}

export interface Organization {
  _id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  country?: string;
  countryAr?: string;
  type: "member" | "partner" | "observer" | "associate";
  website?: string;
  joinedYear?: number;
  logoPath?: string;
}

export interface BoardMember {
  _id: string;
  name: string;
  nameAr?: string;
  role: string;
  roleAr?: string;
  photo?: any;
  order?: number;
}

export interface NewsArticle {
  _id: string;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  tag: string;
  tagAr: string;
  publishedAt: string;
  featured?: boolean;
}
