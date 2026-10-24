export function HeroDevices() {
  return (
    <div className="relative h-full min-h-0 w-full">
      <img
        src="/brand/takiia-laptop.jpg"
        alt="Takiia workspace on a laptop, showing messages, meetings, scheduled posts, and performance"
        width={1280}
        height={720}
        className="absolute inset-0 h-full w-full object-contain object-center"
      />
      <img
        src="/brand/takiia-phone.png"
        alt="Team meeting on a phone with Sarah, Rohan, Alex, and Priya"
        width={720}
        height={1280}
        className="absolute bottom-[2%] right-[0%] h-[46%] w-auto drop-shadow-[0_16px_28px_rgba(15,23,42,0.28)] sm:right-[2%] sm:h-[50%] lg:bottom-[6%] lg:right-[1%] lg:h-[56%]"
      />
    </div>
  );
}
