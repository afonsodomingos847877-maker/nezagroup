import type { Metadata } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.neza.co.mz"),
  title: {
    default: "NEZA GROUP | Engenharia, Infraestruturas, Energia e Tecnologia em Moçambique",
    template: "%s | NEZA GROUP",
  },
  description:
    "NEZA GROUP — Empresa moçambicana de engenharia eléctrica, civil e mecânica, energias renováveis, construção de infraestruturas, operações, manutenção, tecnologia de segurança e investimentos.",
  keywords: [
    "Empresa de Engenharia em Moçambique",
    "Serviços de Engenharia",
    "Engenharia Eléctrica",
    "Energias Renováveis",
    "Construção de Infraestruturas",
    "Manutenção Industrial",
    "Tecnologia de Segurança",
    "Engenharia e Construção em África",
    "NEZA GROUP",
    "Maputo",
  ],
  openGraph: {
    type: "website",
    siteName: "NEZA GROUP",
    title: "NEZA GROUP | Inspiring Engineering Excellence Across Africa and Beyond",
    description:
      "Soluções profissionais de engenharia, infraestruturas, energia, tecnologia e serviços integrados em Moçambique, África Austral e além-fronteiras.",
    images: [{ url: "/images/brand/neza-logo.jpg", alt: "NEZA GROUP" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NEZA GROUP",
    legalName: "NEZA Electromecânica e Instalação, Lda",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rovuma Business Centre, 601, Rua da Sé 144, 6º Andar",
      addressLocality: "Maputo",
      addressCountry: "MZ",
    },
    telephone: "+258 86 328 0431",
    email: "adolfo@neza.co.mz",
  };

  return (
    <html lang="pt">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
