import { useEffect } from "react";

/**
 * Cache-busting: detects a new deployed version by polling index.html
 * for the <meta name="app-version"> tag and reloads the page when it changes.
 * Forces mobile browsers to pick up the latest footer / content immediately.
 */
export const VersionChecker = () => {
  useEffect(() => {
    const currentVersion = document
      .querySelector('meta[name="app-version"]')
      ?.getAttribute("content");

    if (!currentVersion) return;

    const checkVersion = async () => {
      if (typeof navigator !== "undefined" && !navigator.onLine) return;
      try {
        const res = await fetch(`/?v=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        const html = await res.text();
        const match = html.match(
          /<meta\s+name=["']app-version["']\s+content=["']([^"']+)["']/i
        );
        const remoteVersion = match?.[1];
        if (remoteVersion && remoteVersion !== currentVersion) {
          // Force true reload bypassing cache on mobile
          window.location.reload(true as any);
        }
      } catch {
        // silent fail
      }
    };

    // Check immediately on mount
    checkVersion();

    // Check when tab regains focus
    const onFocus = () => checkVersion();
    window.addEventListener("focus", onFocus);

    // Check when page becomes visible (mobile background -> foreground)
    const onVis = () => {
      if (document.visibilityState === "visible") checkVersion();
    };
    document.addEventListener("visibilitychange", onVis);

    // Check on pageshow (mobile back/forward cache)
    const onPageShow = () => checkVersion();
    window.addEventListener("pageshow", onPageShow);

    // Poll more aggressively on mobile (every 1 min) vs desktop (every 5 min)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const interval = window.setInterval(checkVersion, isMobile ? 60_000 : 5 * 60_000);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageShow);
      window.clearInterval(interval);
    };
  }, []);

  return null;
};
