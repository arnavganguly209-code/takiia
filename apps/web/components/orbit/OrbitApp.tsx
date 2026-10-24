"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { defaultSiteContent, sectionOrder, type SiteContent } from "@/lib/site-content";

const panels = [
  ["brand", "Brand & logo"],
  ["header", "Header"],
  ["hero", "Hero"],
  ...sectionOrder.map((id) => [id, id.replace(/^\w/, (c) => c.toUpperCase())]),
  ["faqs", "FAQ answers"],
  ["cta", "Closing CTA"],
  ["footer", "Footer"]
] as const;

export function OrbitApp() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [site, setSite] = useState<SiteContent>(defaultSiteContent);
  const [panel, setPanel] = useState("brand");
  const [status, setStatus] = useState("Ready");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void fetch("/api/orbit/session", { credentials: "same-origin" })
      .then((res) => res.json())
      .then((data: { ok?: boolean }) => {
        setAuthed(Boolean(data.ok));
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!authed) {
      return;
    }
    void fetch("/api/orbit/site", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : defaultSiteContent))
      .then((data: SiteContent) => {
        setSite(data);
        setLoaded(true);
      });
  }, [authed]);

  useEffect(() => {
    if (!authed || !loaded) {
      return;
    }
    const timer = window.setTimeout(() => {
      setStatus("Saving…");
      void fetch("/api/orbit/site", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(site)
      })
        .then((res) => {
          setStatus(res.ok ? "Live homepage synced" : "Save failed");
        })
        .catch(() => setStatus("Save failed"));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [authed, loaded, site]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/orbit/login", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passkey })
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Passkey was not accepted.");
      return;
    }
    setPasskey("");
    setAuthed(true);
  }

  async function upload(setter: (url: string) => void) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }
      const form = new FormData();
      form.set("file", file);
      setStatus("Uploading…");
      const res = await fetch("/api/orbit/upload", { method: "POST", credentials: "same-origin", body: form });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setStatus(data.error || "Upload failed");
        return;
      }
      setter(data.url);
    };
    input.click();
  }

  const body = useMemo(() => {
    if (panel === "brand") {
      return (
        <div className="grid gap-4">
          <Field label="Site name" value={site.brand.name} onChange={(value) => patch(setSite, (next) => (next.brand.name = value))} />
          <Field label="Tagline" value={site.brand.tagline} multiline onChange={(value) => patch(setSite, (next) => (next.brand.tagline = value))} />
          <ImageField label="Logo" src={site.brand.logoSrc} onUpload={() => void upload((url) => patch(setSite, (next) => (next.brand.logoSrc = url)))} onChange={(value) => patch(setSite, (next) => (next.brand.logoSrc = value))} />
        </div>
      );
    }
    if (panel === "header") {
      return (
        <div className="grid gap-4">
          <Field label="Product menu label" value={site.header.productLabel} onChange={(value) => patch(setSite, (next) => (next.header.productLabel = value))} />
          <Field label="Resources menu label" value={site.header.resourcesLabel} onChange={(value) => patch(setSite, (next) => (next.header.resourcesLabel = value))} />
          <Field label="Log in label" value={site.header.loginLabel} onChange={(value) => patch(setSite, (next) => (next.header.loginLabel = value))} />
          <Field label="Header CTA" value={site.header.ctaLabel} onChange={(value) => patch(setSite, (next) => (next.header.ctaLabel = value))} />
          <Field label="Header CTA link" value={site.header.ctaHref} onChange={(value) => patch(setSite, (next) => (next.header.ctaHref = value))} />
          <NavEditor title="Primary nav" items={site.header.nav} onChange={(items) => patch(setSite, (next) => (next.header.nav = items))} />
        </div>
      );
    }
    if (panel === "hero") {
      return (
        <div className="grid gap-4">
          <Field label="Eyebrow" value={site.hero.eyebrow} onChange={(value) => patch(setSite, (next) => (next.hero.eyebrow = value))} />
          <Field label="Headline line 1" value={site.hero.line1} onChange={(value) => patch(setSite, (next) => (next.hero.line1 = value))} />
          <Field label="Headline line 2" value={site.hero.line2} onChange={(value) => patch(setSite, (next) => (next.hero.line2 = value))} />
          <Field label="Headline line 3" value={site.hero.line3} onChange={(value) => patch(setSite, (next) => (next.hero.line3 = value))} />
          <Field label="Body" value={site.hero.body} multiline onChange={(value) => patch(setSite, (next) => (next.hero.body = value))} />
          <Field label="Primary button" value={site.hero.primaryLabel} onChange={(value) => patch(setSite, (next) => (next.hero.primaryLabel = value))} />
          <Field label="Secondary button" value={site.hero.secondaryLabel} onChange={(value) => patch(setSite, (next) => (next.hero.secondaryLabel = value))} />
          <ImageField
            label="Hero image"
            src={site.hero.imageSrc}
            onUpload={() => void upload((url) => patch(setSite, (next) => (next.hero.imageSrc = url)))}
            onChange={(value) => patch(setSite, (next) => (next.hero.imageSrc = value))}
          />
          <Field
            label="Feature tiles (comma separated)"
            value={site.hero.features.join(", ")}
            onChange={(value) => patch(setSite, (next) => (next.hero.features = value.split(",").map((item) => item.trim()).filter(Boolean)))}
          />
        </div>
      );
    }
    if (panel === "faqs") {
      return (
        <div className="grid gap-4">
          {site.faqs.map((item, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Field label={`Question ${index + 1}`} value={item.q} onChange={(value) => patch(setSite, (next) => (next.faqs[index].q = value))} />
              <Field label="Answer" value={item.a} multiline onChange={(value) => patch(setSite, (next) => (next.faqs[index].a = value))} />
            </div>
          ))}
        </div>
      );
    }
    if (panel === "cta") {
      return (
        <div className="grid gap-4">
          <Field label="Eyebrow" value={site.cta.eyebrow} onChange={(value) => patch(setSite, (next) => (next.cta.eyebrow = value))} />
          <Field label="Title" value={site.cta.title} onChange={(value) => patch(setSite, (next) => (next.cta.title = value))} />
          <Field label="Copy" value={site.cta.copy} multiline onChange={(value) => patch(setSite, (next) => (next.cta.copy = value))} />
        </div>
      );
    }
    if (panel === "footer") {
      return (
        <div className="grid gap-4">
          <Field label="Footer blurb" value={site.footer.blurb} multiline onChange={(value) => patch(setSite, (next) => (next.footer.blurb = value))} />
          <Field label="Footer CTA" value={site.footer.ctaLabel} onChange={(value) => patch(setSite, (next) => (next.footer.ctaLabel = value))} />
        </div>
      );
    }
    const section = site.sections[panel as keyof SiteContent["sections"]];
    if (!section) {
      return null;
    }
    return (
      <div className="grid gap-4">
        <Field label="Eyebrow" value={section.eyebrow} onChange={(value) => patch(setSite, (next) => (next.sections[panel as keyof SiteContent["sections"]].eyebrow = value))} />
        <Field label="Title" value={section.title} onChange={(value) => patch(setSite, (next) => (next.sections[panel as keyof SiteContent["sections"]].title = value))} />
        <Field label="Copy" value={section.copy} multiline onChange={(value) => patch(setSite, (next) => (next.sections[panel as keyof SiteContent["sections"]].copy = value))} />
        <ImageField
          label="Section image"
          src={section.imageSrc || ""}
          onUpload={() => void upload((url) => patch(setSite, (next) => (next.sections[panel as keyof SiteContent["sections"]].imageSrc = url)))}
          onChange={(value) => patch(setSite, (next) => (next.sections[panel as keyof SiteContent["sections"]].imageSrc = value))}
        />
        {section.cards.map((card, index) => (
          <div key={`${card.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Field
              label={`Card ${index + 1} title`}
              value={card.title}
              onChange={(value) =>
                patch(setSite, (next) => {
                  next.sections[panel as keyof SiteContent["sections"]].cards[index].title = value;
                })
              }
            />
            <Field
              label="Card body"
              value={card.body}
              multiline
              onChange={(value) =>
                patch(setSite, (next) => {
                  next.sections[panel as keyof SiteContent["sections"]].cards[index].body = value;
                })
              }
            />
          </div>
        ))}
      </div>
    );
  }, [panel, site]);

  if (!ready) {
    return <div className="grid min-h-screen place-items-center bg-[#07111f] text-white">Loading Orbit…</div>;
  }

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#07111f] px-5 text-white">
        <form onSubmit={(event) => void login(event)} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">Takiia Orbit</p>
          <h1 className="mt-3 text-3xl font-black">Super admin</h1>
          <p className="mt-2 text-sm text-white/60">Enter the server passkey to edit the live homepage. Changes sync to every section.</p>
          <input
            type="password"
            autoComplete="current-password"
            className="mt-6 w-full rounded-2xl border border-white/10 bg-[#0b1730] px-4 py-3 text-white outline-none focus:border-cyan-400"
            value={passkey}
            onChange={(event) => setPasskey(event.target.value)}
            placeholder="Passkey"
          />
          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
          <button type="submit" className="btn-primary mt-6 w-full py-3">
            Unlock Orbit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0b1730] p-5 lg:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">Orbit</p>
          <p className="mt-2 text-lg font-black">Homepage CMS</p>
          <nav className="mt-6 grid gap-1">
            {panels.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPanel(id)}
                className={`rounded-xl px-3 py-2 text-left text-sm font-semibold ${panel === id ? "bg-white text-[#0B1730]" : "text-white/70 hover:bg-white/5"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
            <div>
              <p className="text-sm font-bold">{panels.find((item) => item[0] === panel)?.[1]}</p>
              <p className="text-xs text-white/50">{status}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                className="rounded-full border border-white/10 bg-[#0b1730] px-3 py-2 text-sm lg:hidden"
                value={panel}
                onChange={(event) => setPanel(event.target.value)}
              >
                {panels.map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <Link href="/" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0B1730]">
                View homepage
              </Link>
              <button
                type="button"
                className="rounded-full border border-white/20 px-4 py-2 text-sm"
                onClick={() => {
                  void fetch("/api/orbit/logout", { method: "POST", credentials: "same-origin" }).then(() => setAuthed(false));
                }}
              >
                Lock
              </button>
            </div>
          </header>
          <div className="mx-auto max-w-3xl px-6 py-8">{body}</div>
        </div>
      </div>
    </div>
  );
}

function patch(setSite: (updater: (current: SiteContent) => SiteContent) => void, mutate: (next: SiteContent) => void) {
  setSite((current) => {
    const next = structuredClone(current);
    mutate(next);
    return next;
  });
}

function Field({
  label,
  value,
  onChange,
  multiline
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">{label}</span>
      {multiline ? (
        <textarea className="field min-h-28 bg-[#0b1730] text-white" value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className="field bg-[#0b1730] text-white" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function ImageField({
  label,
  src,
  onChange,
  onUpload
}: {
  label: string;
  src: string;
  onChange: (value: string) => void;
  onUpload: () => void;
}) {
  return (
    <div>
      <Field label={label} value={src} onChange={onChange} />
      <div className="mt-3 flex items-center gap-3">
        {src ? <img src={src} alt="" className="h-16 w-24 rounded-xl object-cover" /> : null}
        <button type="button" className="btn-secondary" onClick={onUpload}>
          Upload image
        </button>
      </div>
    </div>
  );
}

function NavEditor({
  title,
  items,
  onChange
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
  onChange: (items: Array<{ href: string; label: string }>) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">{title}</p>
      <div className="mt-3 grid gap-3">
        {items.map((item, index) => (
          <div key={`${item.href}-${index}`} className="grid gap-2 sm:grid-cols-2">
            <input
              className="field bg-[#0b1730] text-white"
              value={item.label}
              onChange={(event) => {
                const next = items.map((row, rowIndex) => (rowIndex === index ? { ...row, label: event.target.value } : row));
                onChange(next);
              }}
            />
            <input
              className="field bg-[#0b1730] text-white"
              value={item.href}
              onChange={(event) => {
                const next = items.map((row, rowIndex) => (rowIndex === index ? { ...row, href: event.target.value } : row));
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
