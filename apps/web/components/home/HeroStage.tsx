export function HeroStage() {
  return (
    <div className="relative mx-auto w-full max-w-[40rem] lg:max-w-none">
      <div className="pointer-events-none absolute -left-8 top-6 h-44 w-44 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute right-4 top-0 h-52 w-52 rounded-full bg-mint-400/30 blur-3xl" />
      <div className="relative pr-8 sm:pr-16 lg:pr-20">
        <LaptopPreview />
        <div className="absolute -bottom-6 right-0 w-[38%] min-w-[7.75rem] max-w-[12.25rem] sm:-bottom-8 sm:right-2 lg:-right-2">
          <PhonePreview />
        </div>
      </div>
    </div>
  );
}

function LaptopPreview() {
  return (
    <div>
      <div className="rounded-[1.35rem] bg-[linear-gradient(180deg,#e8edf3_0%,#b7c0cc_100%)] p-[10px] shadow-[0_30px_70px_rgba(23,59,112,0.2)] sm:rounded-[1.6rem] sm:p-3">
        <div className="overflow-hidden rounded-[0.95rem] bg-white sm:rounded-[1.15rem]">
          <div className="flex h-4 items-center justify-center bg-[#eef2f6] sm:h-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9aa6b5]" />
          </div>
          <div className="grid min-h-[15.5rem] grid-cols-[4.6rem_1fr] bg-[#f7fbff] sm:min-h-[21.5rem] sm:grid-cols-[7rem_1fr]">
            <aside className="border-r border-line bg-white px-1.5 py-3 sm:px-2.5 sm:py-4">
              <div className="mb-3 flex items-center gap-1.5 px-1">
                <span className="h-4 w-4 rounded-full bg-gradient-to-br from-cyan-400 to-mint-400 sm:h-5 sm:w-5" />
                <span className="hidden text-[10px] font-bold text-navy sm:inline">Takiia</span>
              </div>
              {["Home", "Messages", "Meetings", "Social", "Calendar", "Teams", "Files", "Analytics", "Settings"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={`mb-0.5 rounded-lg px-1.5 py-1 text-[8px] font-semibold sm:px-2 sm:py-1.5 sm:text-[10px] ${
                      index === 0 ? "bg-pale text-brand-500" : "text-muted"
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </aside>
            <div className="px-2 py-3 sm:px-3.5 sm:py-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold text-navy sm:text-sm">Good morning, Rohan</p>
                  <p className="text-[8px] text-muted sm:text-[10px]">Preview of a signed-in workspace home.</p>
                </div>
                <p className="text-[8px] font-semibold text-muted sm:text-[10px]">Tue, 21 Oct</p>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1 sm:mt-3 sm:gap-2">
                {[
                  ["12", "Messages"],
                  ["3", "Meetings"],
                  ["8", "Posts"],
                  ["5", "Members"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-line bg-white px-1 py-1.5 text-center sm:px-2 sm:py-2">
                    <p className="text-[11px] font-bold text-navy sm:text-base">{value}</p>
                    <p className="text-[7px] font-medium text-muted sm:text-[9px]">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-3 sm:gap-2">
                <div className="rounded-xl border border-line bg-white p-1.5 sm:p-2.5">
                  <p className="text-[8px] font-bold text-navy sm:text-[10px]">Recent conversations</p>
                  {[
                    ["Marketing", "Campaign draft is ready"],
                    ["Project", "Review moved to Thursday"],
                    ["Client", "Keep the brief in inbox"]
                  ].map(([name, text]) => (
                    <div key={name} className="mt-1.5 flex items-center gap-1.5">
                      <span className="h-4 w-4 shrink-0 rounded-full bg-pale sm:h-5 sm:w-5" />
                      <div className="min-w-0">
                        <p className="truncate text-[8px] font-semibold text-navy sm:text-[10px]">{name}</p>
                        <p className="truncate text-[7px] text-muted sm:text-[9px]">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-line bg-white p-1.5 sm:p-2.5">
                  <p className="text-[8px] font-bold text-navy sm:text-[10px]">Social media</p>
                  <div className="mt-2 flex gap-1">
                    {["Fb", "Ig", "Tt"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-mist px-1.5 py-0.5 text-[7px] font-semibold text-muted sm:text-[9px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 h-10 rounded-lg bg-gradient-to-r from-pale via-mintsoft to-pale sm:h-14" />
                  <p className="mt-1 text-[7px] text-muted sm:text-[9px]">Queued posts until providers connect.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-2.5 w-[68%] rounded-b-xl bg-[#c2cad6] sm:h-3" />
      <div className="mx-auto h-1.5 w-[90%] rounded-b-full bg-[#d5dbe4]" />
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="rounded-[1.7rem] bg-[#0f172a] p-[6px] shadow-[0_24px_50px_rgba(15,23,42,0.35)] sm:rounded-[2rem] sm:p-2">
      <div className="overflow-hidden rounded-[1.3rem] bg-[#111827] sm:rounded-[1.55rem]">
        <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-white/20" />
        <div className="px-2 pb-2 pt-2 text-center text-white">
          <p className="text-[8px] font-semibold sm:text-[10px]">Team meeting</p>
          <p className="text-[7px] text-white/60 sm:text-[8px]">4 participants · preview</p>
        </div>
        <div className="grid grid-cols-2 gap-1 px-1.5 pb-2">
          {["Asha", "Rohit", "Neha", "Priya"].map((name) => (
            <div key={name} className="aspect-square rounded-xl bg-[#1e293b] p-1">
              <div className="flex h-full flex-col items-center justify-center rounded-lg bg-[#334155]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-mint-400 text-[8px] font-bold text-navy sm:h-7 sm:w-7 sm:text-[10px]">
                  {name.slice(0, 1)}
                </span>
                <span className="mt-1 text-[7px] text-white/80 sm:text-[8px]">{name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 bg-black/50 px-2 py-2">
          <span className="h-4 w-4 rounded-full bg-white/20 sm:h-5 sm:w-5" />
          <span className="h-4 w-4 rounded-full bg-rose-500 sm:h-5 sm:w-5" />
          <span className="h-4 w-4 rounded-full bg-white/20 sm:h-5 sm:w-5" />
        </div>
      </div>
    </div>
  );
}
