import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#f3f8ff]">
      <h1 className="sr-only">Chat, Meet and Manage Social Media All in One Place.</h1>
      <div className="relative mx-auto w-full max-w-[90rem]">
        <Image
          src="/brand/takiia-hero-scene.jpg"
          alt="Takiia all-in-one workspace with team messaging, online meetings, social publishing, and team collaboration on a laptop and phone."
          width={3072}
          height={1524}
          priority
          quality={95}
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="h-auto w-full"
        />
        <Link
          href="/signup"
          aria-label="Get Started"
          className="absolute left-[4.2%] top-[58%] h-[8%] w-[16%] rounded-full"
        />
        <Link
          href="#workspace"
          aria-label="Watch Video"
          className="absolute left-[21.5%] top-[58%] h-[8%] w-[15%] rounded-full"
        />
      </div>
    </section>
  );
}
