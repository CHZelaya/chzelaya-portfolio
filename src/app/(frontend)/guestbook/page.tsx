"use client";

import Link from "next/link";

// ─── Dummy data matching convex guestbook schema ─────────────────────────────
const DUMMY_ENTRIES = [
  {
    _id: "dummy_1",
    authorId: "github|11111",
    authorName: "Mia Chen",
    authorAvatar: "",
    authorPlatform: "GitHub",
    comment:
      "The three-panel layout is unlike anything I've seen on a portfolio. Seriously impressed — the transitions feel buttery smooth.",
    by_createdAt: Date.now() - 1000 * 60 * 3,
  },
  {
    _id: "dummy_2",
    authorId: "google|22222",
    authorName: "Jordan Williams",
    authorAvatar: "",
    authorPlatform: "Google",
    comment:
      "Found this through your GitHub. The case studies are refreshingly honest — love that you included what didn't work.",
    by_createdAt: Date.now() - 1000 * 60 * 47,
  },
  {
    _id: "dummy_3",
    authorId: "github|33333",
    authorName: "Seb Torres",
    authorAvatar: "",
    authorPlatform: "GitHub",
    comment: "Convex + Next.js is such a clean stack. Might steal this setup for my next side project.",
    by_createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    _id: "dummy_4",
    authorId: "google|44444",
    authorName: "Priya Anand",
    authorAvatar: "",
    authorPlatform: "Google",
    comment:
      "The photography panel caught me off guard — in the best way. You have a real eye for composition.",
    by_createdAt: Date.now() - 1000 * 60 * 60 * 26,
  },
  {
    _id: "dummy_5",
    authorId: "github|55555",
    authorName: "Eli Nakamura",
    authorAvatar: "",
    authorPlatform: "GitHub",
    comment: "Bebas Neue + that red accent is a killer combo. Bookmarked for design inspo.",
    by_createdAt: Date.now() - 1000 * 60 * 60 * 72,
  },
];

// ─── Relative time helper ─────────────────────────────────────────────────────
function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ─── Avatar initials fallback ─────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Platform badge ───────────────────────────────────────────────────────────
function PlatformBadge({ platform }: { platform: string }) {
  return (
    <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase px-1.5 py-0.5 border border-(--color-border-mid) text-(--color-text-dim)">
      {platform}
    </span>
  );
}

// ─── Single entry card ────────────────────────────────────────────────────────
function EntryCard({
  entry,
}: {
  entry: (typeof DUMMY_ENTRIES)[0];
}) {
  const initials = getInitials(entry.authorName);

  return (
    <article className="group flex gap-4 border-b border-(--color-border) py-6 last:border-b-0">
      {/* Avatar */}
      <div
        className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center border border-(--color-border-mid)"
        style={{ background: "var(--color-bg-raise)" }}
      >
        {entry.authorAvatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={entry.authorAvatar}
            alt={entry.authorName}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span className="font-mono text-[0.6rem] text-(--color-text-dim)">{initials}</span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-mono text-[0.7rem] tracking-[0.05em] text-(--color-text)">
            {entry.authorName}
          </span>
          <PlatformBadge platform={entry.authorPlatform} />
          <span className="font-mono text-[0.55rem] tracking-widest text-(--color-text-dim) ml-auto">
            {relativeTime(entry.by_createdAt)}
          </span>
        </div>
        <p className="font-serif font-light text-sm leading-relaxed text-(--color-text-mid)">
          {entry.comment}
        </p>
      </div>
    </article>
  );
}

// ─── Sign-in prompt ───────────────────────────────────────────────────────────
function SignInPrompt() {
  return (
    <div
      className="border border-(--color-border) p-6"
      style={{ background: "var(--color-bg-raise)" }}
    >
      <p className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-(--color-accent) mb-3">
        Leave a message
      </p>
      <p className="font-serif font-light text-sm text-(--color-text-mid) mb-5 leading-relaxed">
        Sign in with GitHub or Google to leave a note. Takes two seconds — no passwords.
      </p>
      <div className="flex flex-wrap gap-3">
        {/* Placeholder — logic wired in later */}
        <button className="flex items-center gap-2 border border-(--color-border-mid) px-4 py-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-text-mid) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors duration-200">
          <GitHubIcon />
          GitHub
        </button>
        <button className="flex items-center gap-2 border border-(--color-border-mid) px-4 py-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-text-mid) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors duration-200">
          <GoogleIcon />
          Google
        </button>
      </div>
    </div>
  );
}

// ─── Compose form (shown when signed in) ─────────────────────────────────────
function ComposeForm() {
  return (
    <div
      className="border border-(--color-accent-border) p-6"
      style={{ background: "var(--color-bg-raise)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-(--color-accent)">
          Leave a message
        </p>
        {/* Placeholder sign-out — wired in later */}
        <button className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-(--color-text-dim) hover:text-(--color-text-mid) transition-colors duration-200">
          Sign out
        </button>
      </div>

      <textarea
        placeholder="Leave your mark..."
        maxLength={280}
        rows={3}
        disabled
        className="w-full resize-none bg-transparent border border-(--color-border) px-3 py-2.5 font-serif font-light text-sm text-(--color-text) placeholder:text-(--color-text-dim) focus:outline-none focus:border-(--color-accent-border) transition-colors duration-200 disabled:opacity-60"
      />

      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[0.55rem] tracking-widest text-(--color-text-dim)">
          0 / 280
        </span>
        <button
          disabled
          className="border border-(--color-accent) px-4 py-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-accent) hover:bg-(--color-accent) hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Submit →
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GuestbookPage() {
  // Placeholder state — logic wired in later
  const isSignedIn = false;
  const entries = DUMMY_ENTRIES;

  return (
    <main
      className="relative min-h-screen overflow-y-auto no-scrollbar"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ambient orb */}
      <div
        className="pointer-events-none fixed top-0 right-0 h-[60vh] w-[60vw]"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(200,16,46,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">

        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-text-dim) hover:text-(--color-accent) transition-colors duration-200 mb-12"
        >
          <span aria-hidden>←</span>
          chzelaya.dev
        </Link>

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <header className="mb-10">
          <div className="mb-6 flex items-center gap-4 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-(--color-accent)">
            Guestbook
            <span
              className="h-px w-16 shrink-0 bg-(--color-accent)"
              style={{ opacity: 0.4 }}
            />
          </div>

          <h1 className="font-display text-[clamp(2.8rem,7vw,4.5rem)] leading-[0.95] tracking-[0.04em] text-(--color-text) mb-4">
            Leave a Mark.
          </h1>

          <p className="font-serif font-light text-base sm:text-lg leading-relaxed text-(--color-text-mid) max-w-[52ch]">
            You made it here — say something. A thought, a hello, a hot take on
            tabs vs. spaces. Whatever feels right.
          </p>

          {/* Entry count badge */}
          <div className="mt-6 inline-flex items-center gap-2 border border-(--color-border) px-3 py-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-(--color-accent)"
              style={{ boxShadow: "0 0 6px rgba(200,16,46,0.6)" }}
            />
            <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-text-dim)">
              {entries.length} entries
            </span>
          </div>
        </header>

        {/* ── Divider ──────────────────────────────────────────────────────────── */}
        <div className="h-px w-full bg-(--color-border) mb-8" />

        {/* ── Auth / Compose ───────────────────────────────────────────────────── */}
        <section className="mb-10">
          {isSignedIn ? <ComposeForm /> : <SignInPrompt />}
        </section>

        {/* ── Entries feed ─────────────────────────────────────────────────────── */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-(--color-text-dim)">
              Recent entries
            </span>
            <span className="flex-1 h-px bg-(--color-border)" />
          </div>

          {entries.length === 0 ? (
            <p className="font-serif font-light text-sm text-(--color-text-dim) py-12 text-center">
              No entries yet. Be the first to leave a mark.
            </p>
          ) : (
            <div>
              {entries.map((entry) => (
                <EntryCard key={entry._id} entry={entry} />
              ))}
            </div>
          )}
        </section>

        {/* Page number */}
        <span className="block mt-16 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text-dim) text-right">
          GB
        </span>
      </div>
    </main>
  );
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
    </svg>
  );
}
