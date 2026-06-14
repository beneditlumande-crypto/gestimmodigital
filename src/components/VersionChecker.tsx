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
          window.location.reload();
        }
      } catch {
        // silent fail
      }
    };

    // Check on load, on tab focus, and every 5 minutes
    checkVersion();
    const onFocus = () => checkVersion();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    const interval = window.setInterval(checkVersion, 5 * 60 * 1000);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
      window.clearInterval(interval);
    };
  }, []);

  return null;
};
