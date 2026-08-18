import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { Moon, Sun, Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { site, socials } from "@/data/site";
import { primaryNav, moreNav, moreNavMeta, navCta } from "@/data/navigation";
import MoreMenu, { NavIcon } from "./MoreMenu";

/**
 * Sticky editorial navbar. All labels/links come from `src/data/navigation.ts`.
 * Theme toggle flips BOTH `.dark` and `.light` on <html> so every token layer
 * (including the reference Home tokens) follows the global theme.
 */
export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
    const dark = stored ? stored === "dark" : true;
    applyTheme(dark);
    setIsDark(dark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    html.classList.toggle("dark", dark);
    html.classList.toggle("light", !dark);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const ThemeButton = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center justify-center rounded-full transition-colors hover:bg-muted ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted && isDark ? "moon" : "sun"}
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 45, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {mounted && isDark ? <Moon size={size} /> : <Sun size={size} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );

  const ResumeButton = ({ className = "" }: { className?: string }) => (
    <a
      href={navCta.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03] ${className}`}
    >
      <FileText size={15} aria-hidden />
      {navCta.label}
    </a>
  );

  return (
    <>
      {/* Mobile / tablet */}
      <header className="lg:hidden fixed top-4 left-0 right-0 z-50 px-4">
        <div className="mx-auto flex max-w-md items-center justify-between rounded-full border border-border bg-background/70 px-4 py-2 backdrop-blur-xl">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-card text-sm font-semibold tracking-tight text-fg">
              {site.initials}
            </span>
            <span className="truncate text-sm font-medium">{site.name}</span>
          </Link>
          <div className="flex shrink-0 items-center gap-1">
            <ThemeButton size={15} className="h-9 w-9" />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-background px-6 pb-10 pt-24"
            >
              <nav className="flex flex-col divide-y divide-border border-y border-border">
                {primaryNav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                  >
                    <Link
                      to={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-2xl tracking-tight ${
                        isActive(item.href) ? "text-fg font-medium" : "text-fg-muted"
                      }`}
                    >
                      {item.name}
                      <ArrowUpRight size={18} className="text-fg-subtle" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8">
                <p className="text-eyebrow">{moreNavMeta.heading}</p>
                <div className="mt-4 grid gap-3">
                  {moreNav.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
                    >
                      <Link
                        to={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`flex items-center gap-4 rounded-2xl border border-border p-4 ${
                          isActive(item.href) ? "bg-muted" : ""
                        }`}
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-fg">
                          <NavIcon name={item.icon} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-base font-medium text-fg">{item.name}</span>
                          <span className="block truncate text-xs text-fg-muted">{item.desc}</span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-10">
                <p className="text-eyebrow">Elsewhere</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-fg-muted hover:text-fg"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
                <ResumeButton className="mt-6 w-full justify-center py-3" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Desktop */}
      <header className="hidden lg:flex fixed top-5 left-0 right-0 z-50 justify-center px-4">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className={`flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-2 py-1 text-foreground backdrop-blur-2xl ${
            scrolled ? "justify-center" : "w-full max-w-6xl justify-between"
          }`}
        >
          <motion.div
            animate={{
              width: scrolled ? 0 : "auto",
              opacity: scrolled ? 0 : 1,
              marginRight: scrolled ? 0 : 12,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <Link to="/" className="flex items-center gap-3 rounded-full px-3 py-2">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/80 text-base font-semibold tracking-tight text-fg shadow-sm backdrop-blur-xl">
                {site.initials}
              </span>
            </Link>
          </motion.div>

          <nav className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-muted text-fg font-medium"
                    : "text-fg-muted hover:bg-muted hover:text-fg"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <MoreMenu />
          </nav>

          <div className="flex items-center gap-2 border-l border-border/20 pl-3">
            <ThemeButton className="h-10 w-10 border border-border" />
            <motion.div
              className="flex items-center gap-2 overflow-hidden"
              animate={{ width: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResumeButton />
            </motion.div>
          </div>
        </motion.div>
      </header>
    </>
  );
}
