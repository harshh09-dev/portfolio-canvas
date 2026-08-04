import { Github, Linkedin, Instagram, Twitter, Mail } from "lucide-react";
import { legal, site, socials as socialLinks } from "@/data/site";

const icons: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: Twitter,
  Instagram: Instagram,
};

export default function Footer() {
  return (
    <footer className="bg-background px-6 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl border-t border-border pt-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:text-sm">
            © 2026 {site.name}. All rights reserved.
          </p>

          <nav className="flex items-center gap-5">
            {legal.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-fg"
              >
                {l.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = icons[s.name] ?? Github;
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-foreground hover:text-fg"
                >
                  <Icon size={18} />
                </a>
              );
            })}
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-foreground hover:text-fg"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
