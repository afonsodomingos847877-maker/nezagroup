export type Lang = "pt" | "en";

export type PageKey =
  | "home"
  | "about"
  | "business"
  | "projects"
  | "products"
  | "leadership"
  | "partners"
  | "localContent"
  | "contact";

export const ROUTE_MAP: Record<Lang, Record<PageKey, string>> = {
  pt: {
    home: "/pt",
    about: "/pt/sobre-nos",
    business: "/pt/areas-de-negocio",
    projects: "/pt/projectos",
    products: "/pt/produtos-tecnologia",
    leadership: "/pt/lideranca",
    partners: "/pt/parceiros",
    localContent: "/pt/conteudo-local",
    contact: "/pt/contactos",
  },
  en: {
    home: "/en",
    about: "/en/about-us",
    business: "/en/business-areas",
    projects: "/en/projects",
    products: "/en/products-technology",
    leadership: "/en/leadership",
    partners: "/en/partners",
    localContent: "/en/local-content",
    contact: "/en/contact",
  },
};

export function getSwitchLangUrl(currentPath: string, targetLang: Lang): string {
  const sourceLang: Lang = currentPath.startsWith("/en") ? "en" : "pt";
  const entries = Object.entries(ROUTE_MAP[sourceLang]) as [PageKey, string][];
  for (const [key, path] of entries) {
    if (currentPath === path || currentPath === `${path}/`) {
      return ROUTE_MAP[targetLang][key];
    }
  }
  return ROUTE_MAP[targetLang].home;
}

