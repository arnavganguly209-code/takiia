import type { Metadata } from "next";
import { HomeView } from "@/components/home/HomeView";

export const metadata: Metadata = {
  title: "Takiia — Chat, meet, and manage social media in one workspace",
  description:
    "Takiia brings team messaging, meeting records, and social publishing queues into one workspace. Live calling and social posting stay honest about provider setup."
};

export default function HomePage() {
  return <HomeView />;
}
