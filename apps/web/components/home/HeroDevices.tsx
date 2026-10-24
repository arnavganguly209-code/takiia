const conversations = [
  ["MT", "Marketing Team", "Sarah: New campaign is ready", "10:24 AM"],
  ["PD", "Project Discussion", "Alex: Let's finalize the creatives.", "09:10 AM"],
  ["CL", "Client", "Emma: Video call at 4 PM?", "Yesterday"],
  ["SM", "Social Media Team", "New post scheduled", "Yesterday"],
  ["FA", "Family", "Mom: Call you soon.", "Mon"]
];

const nav = ["Home", "Messages", "Meetings", "Social Media", "Calendar", "Teams", "Files", "Analytics", "Settings"];

export function HeroDevices() {
  return (
    <div className="relative mx-auto w-full max-w-[680px] pb-2 pr-[4.5rem] sm:pr-[6.5rem] lg:max-w-none lg:pr-[7.5rem]">
      <Laptop />
      <div className="absolute bottom-1 right-0 w-[7.4rem] sm:w-[9.2rem] lg:w-[10.4rem]">
        <Phone />
      </div>
    </div>
  );
}

function Laptop() {
  return (
    <div className="rounded-[1.1rem] bg-gradient-to-b from-[#e7edf5] to-[#b7c2d0] p-[7px] shadow-[0_28px_60px_rgba(20,38,74,0.18)] sm:rounded-[1.35rem] sm:p-2.5">
      <div className="overflow-hidden rounded-[0.85rem] bg-white sm:rounded-[1.05rem]">
        <div className="flex h-3 items-center justify-center bg-[#eef3f8] sm:h-4">
          <span className="h-1 w-1 rounded-full bg-[#9aa6b5]" />
        </div>
        <div className="grid min-h-[15.5rem] grid-cols-[4.6rem_1fr] bg-[#f8fbff] sm:min-h-[22rem] sm:grid-cols-[7.2rem_1fr] lg:min-h-[25rem]">
          <aside className="border-r border-[#e7eef6] bg-white px-1 py-2 sm:px-2 sm:py-3">
            <div className="mb-2 flex items-center gap-1 px-1">
              <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#22C7E8] to-[#67E8C5] sm:h-4 sm:w-4" />
              <span className="hidden text-[10px] font-bold text-[#14264A] sm:inline">Takiia</span>
            </div>
            {nav.map((item, index) => (
              <div
                key={item}
                className={`mb-0.5 flex items-center justify-between rounded-md px-1 py-0.5 text-[7px] font-semibold sm:px-1.5 sm:py-1 sm:text-[10px] ${
                  index === 0 ? "bg-[#EDF5FF] text-[#2563EB]" : "text-[#66758B]"
                }`}
              >
                <span className="truncate">{item}</span>
                {item === "Messages" ? <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" /> : null}
              </div>
            ))}
          </aside>
          <div className="min-w-0 px-1.5 py-2 sm:px-3 sm:py-3">
            <div className="flex items-center gap-1">
              <div className="h-5 min-w-0 flex-1 rounded-full border border-[#e7eef6] bg-white px-2 text-[7px] leading-5 text-[#66758B] sm:h-6 sm:text-[10px] sm:leading-6">
                Search messages, posts, meetings...
              </div>
              <span className="hidden h-5 w-5 shrink-0 rounded-full bg-[#EDF5FF] sm:block" />
              <span className="hidden text-right text-[8px] font-semibold text-[#14264A] sm:block">
                Rohan
                <span className="block font-medium text-[#66758B]">Admin</span>
              </span>
            </div>
            <div className="mt-2 flex items-start justify-between gap-2">
              <div>
                <p className="text-[9px] font-bold text-[#14264A] sm:text-sm">Good morning, Rohan</p>
                <p className="text-[7px] text-[#66758B] sm:text-[10px]">Here&apos;s what&apos;s happening with your workspace today.</p>
              </div>
              <p className="text-right text-[7px] font-semibold text-[#66758B] sm:text-[10px]">
                Tue, 21 Oct 2026
                <span className="block font-medium">Stay productive!</span>
              </p>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1">
              {[
                ["12", "New Messages"],
                ["3", "Upcoming Meetings"],
                ["8", "Scheduled Posts"],
                ["5", "Team Members"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-[#e7eef6] bg-white px-1 py-1 text-center sm:rounded-xl sm:py-1.5">
                  <p className="text-[10px] font-bold text-[#14264A] sm:text-base">{value}</p>
                  <p className="text-[6px] font-medium leading-tight text-[#66758B] sm:text-[9px]">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1">
              <div className="rounded-lg border border-[#e7eef6] bg-white p-1.5 sm:rounded-xl sm:p-2">
                <p className="text-[7px] font-bold text-[#14264A] sm:text-[10px]">Recent Conversations</p>
                {conversations.map(([mark, name, text]) => (
                  <div key={name} className="mt-1 flex items-center gap-1">
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#EDF5FF] text-[6px] font-bold text-[#2563EB] sm:h-4 sm:w-4 sm:text-[8px]">
                      {mark.slice(0, 1)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[7px] font-semibold text-[#14264A] sm:text-[10px]">{name}</span>
                      <span className="block truncate text-[6px] text-[#66758B] sm:text-[8px]">{text}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-[#e7eef6] bg-white p-1.5 sm:rounded-xl sm:p-2">
                <p className="text-[7px] font-bold text-[#14264A] sm:text-[10px]">Social Media</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {["Fb", "Ig", "Tt", "Yt", "In", "X"].map((name) => (
                    <span key={name} className="rounded-full bg-[#EDF5FF] px-1 py-0.5 text-[6px] font-bold text-[#2563EB] sm:text-[8px]">
                      {name}
                    </span>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-6 text-center text-[6px] font-semibold text-[#66758B] sm:text-[8px]">
                  {["24", "18", "12", "8", "6", "5"].map((count) => (
                    <span key={count}>{count}</span>
                  ))}
                </div>
                <p className="mt-2 text-[7px] font-bold text-[#14264A] sm:text-[10px]">Post Performance</p>
                <svg viewBox="0 0 160 48" className="mt-1 h-8 w-full text-[#22C7E8] sm:h-12" aria-hidden="true">
                  <polyline fill="none" stroke="currentColor" strokeWidth="2.5" points="0,36 24,30 48,33 72,22 96,26 120,16 160,12" />
                </svg>
                <p className="text-[6px] font-semibold text-[#059669] sm:text-[8px]">+68% sample preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-2 w-[72%] rounded-b-xl bg-[#c5ceda]" />
      <div className="mx-auto h-1 w-[88%] rounded-b-full bg-[#d7dee8]" />
    </div>
  );
}

function Phone() {
  const people = [
    ["S", "Sarah"],
    ["R", "Rohan"],
    ["A", "Alex"],
    ["P", "Priya"]
  ];
  return (
    <div className="rounded-[1.35rem] bg-[#0f172a] p-1 shadow-[0_18px_40px_rgba(15,23,42,0.35)] sm:rounded-[1.6rem] sm:p-1.5">
      <div className="overflow-hidden rounded-[1.15rem] bg-[#111827] sm:rounded-[1.35rem]">
        <div className="mx-auto mt-1 h-1 w-8 rounded-full bg-white/25" />
        <p className="pt-1 text-center text-[8px] font-semibold text-white sm:text-[11px]">Team Meeting</p>
        <p className="text-center text-[7px] text-white/60 sm:text-[9px]">4 participants · 00:24</p>
        <div className="grid grid-cols-2 gap-1 px-1 py-1">
          {people.map(([mark, name]) => (
            <div key={name} className="rounded-lg bg-[#1e293b] p-1">
              <div className="flex aspect-square flex-col items-center justify-center rounded-md bg-[#334155]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#22C7E8] to-[#67E8C5] text-[8px] font-bold text-[#14264A] sm:h-7 sm:w-7 sm:text-[11px]">
                  {mark}
                </span>
                <span className="mt-0.5 text-[7px] text-white sm:text-[9px]">{name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 bg-black/40 py-1.5">
          <span className="h-4 w-4 rounded-full bg-white/20" />
          <span className="h-4 w-4 rounded-full bg-[#ef4444]" />
          <span className="h-4 w-4 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}
