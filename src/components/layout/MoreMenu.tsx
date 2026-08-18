import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Camera,
  ChevronDown,
  Folder,
  Home,
  Mail,
  PenLine,
  User,
} from "lucide-react";
import { moreNav, moreNavMeta, type NavItem } from "@/data/navigation";

const icons = {
  user: User,
  camera: Camera,
  pen: PenLine,
  book: BookOpen,
  folder: Folder,
  mail: Mail,
  home: Home,
} as const;

export function NavIcon({ name, size = 18 }: { name?: NavItem["icon"]; size?: number }) {
  const Icon = name ? icons[name] : undefined;
  return Icon ? <Icon size={size} aria-hidden /> : null;
}

/**
 * Designed "More" navigation panel — grouped, described, icon-led items with
 * hover previews, active-route indication, Escape/outside-click close and
 * roving keyboard navigation. Data comes from `src/data/navigation.ts`.
 */
export default function MoreMenu() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const reduce = useReducedMotion();

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);
  const hasActive = moreNav.some((i) => isActive(i.href));

  // Close on navigation
  useEffect(() => setOpen(false), [location.pathname]);

  // Escape + outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Focus the first item when opening
  useEffect(() => {
    if (open) itemsRef.current[0]?.focus();
  }, [open]);

  const onItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next =
        e.key === "ArrowDown"
          ? (index + 1) % moreNav.length
          : (index - 1 + moreNav.length) % moreNav.length;
      itemsRef.current[next]?.focus();
    }
  };

  const groups = moreNav.reduce<Record<string, NavItem[]>>((acc, item) => {
    const key = item.group ?? "More";
    (acc[key] ||= []).push(item);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors ${
          open || hasActive ? "bg-muted text-fg font-medium" : "text-fg-muted hover:text-fg hover:bg-muted"
        }`}
      >
        {moreNavMeta.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={moreNavMeta.heading}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-3 w-[min(92vw,26rem)] origin-top overflow-hidden rounded-3xl border border-border bg-background/95 p-2 shadow-2xl backdrop-blur-2xl"
          >
            <div className="px-4 pb-2 pt-3">
              <p className="text-eyebrow">{moreNavMeta.heading}</p>
              <p className="mt-1 text-xs text-fg-subtle">{moreNavMeta.note}</p>
            </div>

            {Object.entries(groups).map(([group, items]) => (
              <div key={group} className="mt-1">
                <p className="px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                  {group}
                </p>
                {items.map((item) => {
                  flatIndex += 1;
                  const i = flatIndex;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      role="menuitem"
                      ref={(el) => {
                        itemsRef.current[i] = el;
                      }}
                      onKeyDown={(e) => onItemKeyDown(e, i)}
                      onMouseEnter={() => setHovered(item.href)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="group relative flex items-center gap-4 rounded-2xl px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {(hovered === item.href || active) && (
                        <motion.span
                          layoutId="more-menu-highlight"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          className="absolute inset-0 -z-10 rounded-2xl bg-muted"
                        />
                      )}
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-fg">
                        <NavIcon name={item.icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 text-base font-medium tracking-tight text-fg">
                          {item.name}
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-fg" aria-hidden />
                          )}
                        </span>
                        <span className="block truncate text-xs text-fg-muted">{item.desc}</span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-fg-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      />
                    </Link>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
