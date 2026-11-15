import fs from "fs/promises";
import path from "path";

const CMS_DIR = path.join(process.cwd(), "data", "cms");

export interface ProjectItem {
  id: string;
  titlePt: string;
  titleEn: string;
  location: string;
  sector: string;
  sectorLabelPt: string;
  sectorLabelEn: string;
  client: string;
  duration: string;
  value: string;
  responsibilityType: "direct" | "managed" | "subcontract" | "jv";
  responsibilityPt: string;
  responsibilityEn: string;
  scopePt: string;
  scopeEn: string;
  images: string[];
  featured: boolean;
}

export interface ServiceCluster {
  id: string;
  number: string;
  titlePt: string;
  titleEn: string;
  shortDescPt: string;
  shortDescEn: string;
  fullDescPt: string;
  fullDescEn: string;
  collaborators: string[];
  image: string;
  servicesPt: string[];
  servicesEn: string[];
  applicationsPt: string[];
  applicationsEn: string[];
  relatedProjectIds: string[];
}

export interface ProductItem {
  id: string;
  category: "industrial" | "technology";
  namePt: string;
  nameEn: string;
  descPt: string;
  descEn: string;
  appPt: string;
  appEn: string;
  image: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  rolePt: string;
  roleEn: string;
  image: string;
  bioPt: string;
  bioEn: string;
  experiencePt: string;
  experienceEn: string;
  educationPt: string;
  educationEn: string;
  expertisePt: string[];
  expertiseEn: string[];
}

export interface PartnerClientData {
  clients: {
    id: string;
    name: string;
    logo: string;
    sectorPt: string;
    sectorEn: string;
  }[];
  partners: {
    id: string;
    name: string;
    logo: string;
    type: "collaborator" | "partner";
    clusterPt: string;
    clusterEn: string;
  }[];
}

export interface NewsItem {
  id: string;
  date: string;
  titlePt: string;
  titleEn: string;
  summaryPt: string;
  summaryEn: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  service: string;
  message: string;
  emailSent: boolean;
}

export async function readCmsFile<T>(filename: string): Promise<T> {
  const filePath = path.join(CMS_DIR, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeCmsFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(CMS_DIR, filename);
  await fs.mkdir(CMS_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export const getProjects = () => readCmsFile<ProjectItem[]>("projects.json");
export const getServices = () => readCmsFile<ServiceCluster[]>("services.json");
export const getProducts = () => readCmsFile<ProductItem[]>("products.json");
export const getLeadership = () => readCmsFile<LeadershipMember[]>("leadership.json");
export const getPartnersData = () => readCmsFile<PartnerClientData>("partners.json");
export const getNews = () => readCmsFile<NewsItem[]>("news.json");
export const getMessages = () => readCmsFile<ContactMessage[]>("messages.json");

