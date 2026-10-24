import type { Metadata } from "next";
import { OrbitApp } from "@/components/orbit/OrbitApp";

export const metadata: Metadata = {
  title: "Orbit",
  robots: { index: false, follow: false }
};

export default function OrbitPage() {
  return <OrbitApp />;
}
