import { DemoLabel } from "./Section";

export function WorkspacePreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-glass">
      <div className="border-b border-line bg-mist px-5 py-3">
        <DemoLabel>Marketing preview · sample workspace data</DemoLabel>
      </div>
      <div className="grid lg:grid-cols-[13rem_1fr]">
        <aside className="hidden border-r border-line p-4 lg:block">
          <p className="px-2 text-xs font-bold text-navy">Workspace</p>
          {["Home", "Inbox", "Meetings", "Social", "Calendar", "Teams", "Files"].map((item, index) => (
            <div
              key={item}
              className={`mt-1 rounded-xl px-3 py-2 text-sm font-semibold ${index === 0 ? "bg-pale text-brand-500" : "text-muted"}`}
            >
              {item}
            </div>
          ))}
        </aside>
        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
          <PreviewCard title="Recent conversations" items={["Marketing · Campaign draft", "Project · Thursday review", "Client · Brief in inbox"]} />
          <PreviewCard title="Upcoming meetings" items={["Client review · Thu 10:00", "Weekly standup · Fri 09:30"]} />
          <PreviewCard title="Scheduled posts" items={["3 queued sample posts", "Facebook and Instagram labels", "Publishing waits on credentials"]} />
          <PreviewCard title="Connected accounts" items={["Facebook · Not connected", "Instagram · Not connected", "TikTok · Not connected"]} />
          <PreviewCard title="Team activity" items={["Asha added a draft", "Rohit created a meeting"]} />
          <PreviewCard title="Ad campaigns" items={["Sample campaign · Not connected", "Budgets stay on Google Ads", "No live spend shown"]} />
          <div className="rounded-2xl border border-line bg-mist p-4">
            <p className="text-sm font-semibold text-navy">October preview</p>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-muted">
              {["M", "T", "W", "T", "F", "S", "S", "20", "21", "22", "23", "24", "25", "26"].map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className={`rounded-md py-1 ${day === "24" ? "bg-brand-500 font-semibold text-white" : "bg-white"}`}
                >
                  {day}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">Usage shown after sign-in comes from the selected workspace plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-mist/80 p-4">
      <p className="text-sm font-semibold text-navy">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function MessagingPreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-glass">
      <div className="border-b border-line px-5 py-3">
        <DemoLabel>Inbox preview</DemoLabel>
      </div>
      <div className="grid md:grid-cols-[13rem_1fr]">
        <div className="border-r border-line p-3">
          {["Marketing", "Project", "Client"].map((name, index) => (
            <div key={name} className={`rounded-xl px-3 py-2 ${index === 0 ? "bg-pale" : ""}`}>
              <p className="text-sm font-semibold text-navy">{name}</p>
              <p className="text-xs text-muted">Sample thread</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 p-4">
          <div className="max-w-[85%] rounded-2xl bg-pale px-4 py-3">
            <p className="text-xs font-semibold text-navy">Asha · 09:12</p>
            <p className="mt-1 text-sm text-ink">The campaign draft is in the social queue.</p>
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl bg-gradient-to-r from-cyan-400 to-mint-400 px-4 py-3 text-navy">
            <p className="text-xs font-semibold">Rohit · 09:18</p>
            <p className="mt-1 text-sm">I moved the client review to Thursday 10:00.</p>
          </div>
          <div className="max-w-[85%] rounded-2xl border border-line bg-white px-4 py-3">
            <p className="text-xs font-semibold text-navy">Attachment preview</p>
            <p className="mt-1 text-sm text-muted">brief.pdf · authenticated download after sign-in</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SocialPreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-glass">
      <div className="border-b border-line px-5 py-3">
        <DemoLabel>Social dashboard preview · no live customer metrics</DemoLabel>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line p-4">
          <p className="text-sm font-semibold text-navy">Connected accounts</p>
          {[
            ["Facebook", "Requires official app credentials"],
            ["Instagram", "Requires official app credentials"],
            ["TikTok", "Requires official app credentials"]
          ].map(([name, state]) => (
            <div key={name} className="mt-3 flex items-center justify-between rounded-xl bg-mist px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pale text-[10px] font-bold text-brand-500">
                  {name.slice(0, 1)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{name}</p>
                  <p className="text-xs text-muted">{state}</p>
                </div>
              </div>
              <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-muted">Not connected</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-line p-4">
          <p className="text-sm font-semibold text-navy">Post composer</p>
          <div className="mt-3 rounded-xl bg-mist px-3 py-4 text-sm text-muted">Write a caption for a draft post…</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-pale px-3 py-1 text-navy">Facebook</span>
            <span className="rounded-full bg-pale px-3 py-1 text-navy">Instagram</span>
            <span className="rounded-full bg-pale px-3 py-1 text-navy">TikTok</span>
            <span className="rounded-full bg-mintsoft px-3 py-1 text-navy">Draft</span>
          </div>
        </div>
        <div className="rounded-2xl border border-line p-4">
          <p className="text-sm font-semibold text-navy">Publishing calendar</p>
          <div className="mt-3 space-y-2 text-sm">
            <div className="rounded-xl bg-pale px-3 py-2 text-navy">Thu 10:00 · Instagram draft</div>
            <div className="rounded-xl bg-mintsoft px-3 py-2 text-navy">Fri 16:00 · Facebook queued</div>
          </div>
        </div>
        <div className="rounded-2xl border border-line p-4">
          <p className="text-sm font-semibold text-navy">Queue and sample chart</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
            <span className="rounded-full bg-pale px-2 py-1 text-navy">Scheduled</span>
            <span className="rounded-full bg-mintsoft px-2 py-1 text-navy">Published</span>
            <span className="rounded-full bg-white px-2 py-1 text-muted">Failed</span>
            <span className="rounded-full bg-mist px-2 py-1 text-muted">Draft</span>
          </div>
          <svg viewBox="0 0 220 70" className="mt-4 h-16 w-full text-cyan-400" aria-hidden="true">
            <polyline fill="none" stroke="currentColor" strokeWidth="3" points="0,50 40,42 80,48 120,28 160,34 220,18" />
          </svg>
          <p className="text-xs text-muted">Sample shape only. Live analytics wait on connected accounts.</p>
        </div>
      </div>
    </div>
  );
}

export function AdsPreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-glass">
      <div className="border-b border-line px-5 py-3">
        <DemoLabel>Google Ads preview · sample labels only · no live spend</DemoLabel>
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line p-4">
          <p className="text-sm font-semibold text-navy">Campaign list</p>
          {[
            ["Brand search", "Paused · awaiting account"],
            ["Retargeting", "Not connected"],
            ["Display", "Requires developer token"]
          ].map(([name, state]) => (
            <div key={name} className="mt-3 flex items-center justify-between rounded-xl bg-mist px-3 py-2">
              <p className="text-sm font-semibold text-navy">{name}</p>
              <span className="text-[11px] font-semibold text-muted">{state}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-line p-4">
          <p className="text-sm font-semibold text-navy">Performance</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Impressions, clicks, conversions, and cost stay blank until the official Google Ads API returns them for an
            authorized customer.
          </p>
          <div className="mt-4 h-16 rounded-xl bg-mist" />
          <p className="mt-3 text-xs text-muted">Sample chart shape only. Not customer metrics.</p>
        </div>
      </div>
    </div>
  );
}

export function MeetingPreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-[#0f172a] p-4 text-white shadow-glass">
      <DemoLabel>Meeting interface preview · media path not claimed as production-ready</DemoLabel>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {["Asha", "Rohit", "Neha", "Priya"].map((name) => (
          <div key={name} className="flex aspect-video flex-col items-center justify-center rounded-2xl bg-[#1e293b]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-mint-400 font-bold text-navy">
              {name.slice(0, 1)}
            </span>
            <span className="mt-2 text-sm">{name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <span className="rounded-full bg-white/10 px-3 py-2 text-xs">Mute</span>
          <span className="rounded-full bg-white/10 px-3 py-2 text-xs">Camera</span>
          <span className="rounded-full bg-rose-500 px-3 py-2 text-xs">Leave</span>
        </div>
        <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs">
          Scheduler card · Client review Thu 10:00 · plan participant limits apply
        </div>
      </div>
    </div>
  );
}

export function TeamPreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white p-5 shadow-glass">
      <DemoLabel>Team dashboard preview</DemoLabel>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          ["Asha", "Admin"],
          ["Rohit", "Member"],
          ["Neha", "Member"],
          ["Priya", "Owner"]
        ].map(([name, role]) => (
          <div key={name} className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pale font-semibold text-navy">
                {name.slice(0, 1)}
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">{name}</p>
                <p className="text-xs text-muted">Sample member</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-brand-500">{role}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">Roles, invites, shared files, and audit events stay behind workspace membership checks.</p>
    </div>
  );
}

export function CalendarPreview() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const events = {
    Tue: { label: "Standup", tone: "bg-pale text-navy" },
    Thu: { label: "Review", tone: "bg-mintsoft text-navy" },
    Fri: { label: "Social draft", tone: "bg-white text-muted border border-line" }
  } as Record<string, { label: string; tone: string }>;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white p-5 shadow-glass">
      <DemoLabel>Calendar preview · no third-party sync</DemoLabel>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {days.map((day) => (
          <div key={day} className="min-h-28 rounded-2xl bg-mist p-3">
            <p className="text-xs font-bold text-navy">{day}</p>
            {events[day] ? (
              <div className={`mt-3 rounded-xl px-2 py-2 text-xs font-semibold ${events[day].tone}`}>{events[day].label}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FilesPreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white p-5 shadow-glass">
      <DemoLabel>File list preview</DemoLabel>
      <div className="mt-4 space-y-2">
        {[
          ["brief.pdf", "248 KB · conversation attachment"],
          ["campaign.jpg", "1.1 MB · social upload"],
          ["notes.docx", "84 KB · workspace file"]
        ].map(([name, meta]) => (
          <div key={name} className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-navy">{name}</p>
              <p className="text-xs text-muted">{meta}</p>
            </div>
            <span className="text-xs font-semibold text-muted">Authenticated</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold text-navy">Storage usage</p>
        <div className="mt-2 h-2 rounded-full bg-mist">
          <div className="h-2 w-1/3 rounded-full bg-gradient-to-r from-cyan-400 to-mint-400" />
        </div>
        <p className="mt-2 text-xs text-muted">Quotas come from the workspace plan. Private URLs are not public links.</p>
      </div>
    </div>
  );
}

export function WorkflowPreview() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {[
        ["Trigger", "A post is scheduled or a meeting is created."],
        ["Action", "The API stores the job and sends an in-app notice when configured."],
        ["Status", "Queued, failed, or limit-reached states stay visible. Email waits on SMTP."]
      ].map(([title, body], index) => (
        <div key={title} className="relative rounded-3xl border border-line bg-white p-5">
          {index < 2 ? <span className="absolute right-[-0.7rem] top-1/2 hidden h-px w-6 bg-line md:block" /> : null}
          <p className="text-sm font-semibold text-navy">{title}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
        </div>
      ))}
    </div>
  );
}

export function SecurityPreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        ["Authentication", "Hashed passwords and hashed session tokens."],
        ["Sessions", "Expiring cookies with CSRF checks on mutating routes."],
        ["Workspace access", "Membership is enforced on the server."],
        ["Files and tokens", "Downloads are authorized. Provider tokens stay server-side."]
      ].map(([title, body]) => (
        <article key={title} className="rounded-3xl border border-line bg-white p-5">
          <h3 className="font-semibold text-navy">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
        </article>
      ))}
    </div>
  );
}
