import type { Metadata } from "next";
import { TimePortalExperience } from "@/src/components/portal/TimePortalExperience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Time Portal | Sathsara Dahana 2026",
  description: "Experience the Sathsara Dahana Cinematic Time Portal. Complete the challenge and step through the dimensional gateway.",
  openGraph: {
    title: "Time Portal Experience | Sathsara Dahana 2026",
    description: "Step through the luminous gateway into another dimension at Sathsara Dahana 2026.",
  },
};

export default function PortalPage() {
  return <TimePortalExperience />;
}
