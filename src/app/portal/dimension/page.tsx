import type { Metadata } from "next";
import { DimensionDestination } from "@/src/components/portal/DimensionDestination";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Another Dimension | Sathsara Dahana 2026",
  description: "You have arrived at the Sathsara Dahana dimensional nexus.",
};

export default function DimensionPage() {
  return <DimensionDestination />;
}
