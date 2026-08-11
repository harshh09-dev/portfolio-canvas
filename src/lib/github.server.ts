// GitHub activity fetch + cache. Server-only helper.

export interface GithubActivity {
  message: string;
  repo: string;
  url: string;
  relativeTime: string;
  fetchedAt: number;
}

const TTL_MS = 10 * 60 * 1000;
let cache: { data: GithubActivity; at: number } | null = null;

function relative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

const fallback: GithubActivity = {
  message: "Refine motion system && ship v2026",
  repo: "A-verse",
  url: "https://github.com/A-verse",
  relativeTime: "recently",
  fetchedAt: 0,
};

export async function fetchLatestActivity(username: string): Promise<GithubActivity> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`,
      { headers: { Accept: "application/vnd.github+json", "User-Agent": "a-verse-portfolio" } },
    );
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
      repo?: { name: string };
      payload?: { commits?: Array<{ message: string }> };
    }>;
    const push = events.find((e) => e.type === "PushEvent" && e.payload?.commits?.length);
    if (!push) throw new Error("no push events");
    const commit = push.payload!.commits![push.payload!.commits!.length - 1]!;
    const repoFull = push.repo?.name ?? `${username}/unknown`;
    const data: GithubActivity = {
      message: commit.message.split("\n")[0]!.slice(0, 120),
      repo: repoFull.split("/")[1] ?? repoFull,
      url: `https://github.com/${repoFull}`,
      relativeTime: relative(push.created_at),
      fetchedAt: Date.now(),
    };
    cache = { data, at: Date.now() };
    return data;
  } catch {
    // Rate limited or offline — serve stale, then the static fallback.
    return cache?.data ?? fallback;
  }
}
