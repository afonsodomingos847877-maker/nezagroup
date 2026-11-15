import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact NEZA GROUP headquarters in Maputo, Mozambique. Request a commercial proposal or technical inquiry.",
};

export default function EnContactPage() {
  return <ContactView lang="en" />;
}

