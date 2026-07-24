import { ArrowRight } from "lucide-react";

export default function ViewMore({
  href,
  label = "View more",
}: {
  href: string;
  label?: string;
}) {
  return (
    <div className="mt-10 flex justify-center">
      <a
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2.5 text-sm text-fg backdrop-blur-md transition-colors hover:border-border-strong hover:bg-muted"
      >
        {label}
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}
