import { useEffect, useState } from "react";

/** Contribution calendar for the last 12 months. Public, no token needed. */
const GRAPH_URL = (user) =>
  `https://github-contributions-api.jogruber.de/v4/${user}?y=last`;
const USER_URL = (user) => `https://api.github.com/users/${user}`;

/** Days with at least one contribution — more telling than a streak count. */
const activeDays = (days) => days.reduce((n, day) => n + (day.count > 0 ? 1 : 0), 0);

/**
 * Live GitHub activity.
 *
 * Two requests, and the second one is optional: the calendar is the point,
 * the repo count is a nicety. The unauthenticated GitHub API is rate-limited
 * per IP, so a failure there must not take the graph down with it — hence
 * the separate catch rather than one Promise.all that rejects together.
 */
export default function useGitHubActivity(user) {
  const [state, setState] = useState({
    status: "loading",
    days: [],
    total: 0,
    repos: null,
    active: 0,
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const [graphRes, userRes] = await Promise.all([
          fetch(GRAPH_URL(user), { signal: controller.signal }),
          fetch(USER_URL(user), { signal: controller.signal }).catch(() => null),
        ]);

        if (!graphRes.ok) throw new Error(`calendar responded ${graphRes.status}`);

        const graph = await graphRes.json();
        const days = Array.isArray(graph.contributions) ? graph.contributions : [];
        const account = userRes?.ok ? await userRes.json() : null;

        if (controller.signal.aborted) return;

        setState({
          status: "ready",
          days,
          total: Object.values(graph.total ?? {}).reduce((a, b) => a + b, 0),
          repos: typeof account?.public_repos === "number" ? account.public_repos : null,
          active: activeDays(days),
        });
      } catch {
        if (controller.signal.aborted) return;
        setState((prev) => ({ ...prev, status: "error" }));
      }
    };

    load();
    return () => controller.abort();
  }, [user]);

  return state;
}
