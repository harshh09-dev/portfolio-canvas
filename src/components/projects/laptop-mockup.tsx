interface LaptopMockupProps {
  src: string;
  alt: string;
  fit?: "cover" | "fill";
  title?: string;
  subtitle?: string;
}

/**
 * Laptop mockup — monochrome device chrome with a neutral placeholder
 * screen when no screenshot is supplied.
 */
export function LaptopMockup({ src, alt, fit = "cover", title, subtitle }: LaptopMockupProps) {
  const hasImage = Boolean(src);
  return (
    <div className="laptop-frame relative flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-card sm:rounded-2xl">
        <div className="flex h-full items-center justify-center p-3 sm:p-4 lg:p-5">
          <div className="relative aspect-[16/10] w-full rounded-lg border border-border-strong bg-muted p-[1.2%] sm:rounded-xl">
            <div className="relative h-full w-full overflow-hidden rounded-md border border-border bg-muted sm:rounded-lg">
              <div className="absolute left-1/2 top-0 z-20 h-[6%] w-[13%] -translate-x-1/2 rounded-b-md border-x border-b border-border bg-foreground/10" />
              {hasImage ? (
                <img
                  src={src}
                  alt={alt}
                  width={1200}
                  height={750}
                  loading="lazy"
                  className={`h-full w-full ${fit === "fill" ? "object-fill" : "object-cover"} object-top`}
                />
              ) : (
                <PlaceholderLaptopScreen />
              )}
            </div>
          </div>
        </div>
      </div>
      {(title || subtitle) && (
        <p className="mt-2 text-center text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          {subtitle ?? title}
        </p>
      )}
    </div>
  );
}

function PlaceholderLaptopScreen() {
  return (
    <div className="relative flex h-full w-full flex-col bg-muted">
      <div className="flex h-6 items-center gap-1.5 border-b border-border px-3">
        <div className="h-2 w-2 rounded-full bg-foreground/30" />
        <div className="h-2 w-2 rounded-full bg-foreground/20" />
        <div className="h-2 w-2 rounded-full bg-foreground/15" />
        <div className="ml-3 h-2 w-40 rounded-full bg-foreground/10" />
      </div>
      <div className="grid flex-1 grid-cols-6 grid-rows-4 gap-2 p-4">
        <div className="col-span-2 row-span-4 flex flex-col gap-2 rounded-lg border border-border bg-foreground/[0.05] p-3">
          <div className="h-2 w-16 rounded-full bg-foreground/25" />
          <div className="h-1.5 w-12 rounded-full bg-foreground/15" />
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="h-1.5 w-full rounded-full bg-foreground/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
            <div className="h-1.5 w-3/5 rounded-full bg-foreground/10" />
          </div>
        </div>
        <div className="col-span-4 row-span-1 flex items-center gap-3 rounded-lg border border-border bg-foreground/[0.04] px-4">
          <div className="h-2 w-32 rounded-full bg-foreground/20" />
          <div className="h-1.5 w-20 rounded-full bg-foreground/10" />
        </div>
        <div className="col-span-2 row-span-3 rounded-lg border border-border bg-foreground/[0.06]" />
        <div className="col-span-2 row-span-3 flex flex-col gap-1.5 rounded-lg border border-border bg-foreground/[0.04] p-3">
          <div className="h-1.5 w-full rounded-full bg-foreground/20" />
          <div className="h-1.5 w-5/6 rounded-full bg-foreground/15" />
          <div className="h-1.5 w-4/6 rounded-full bg-foreground/10" />
          <div className="mt-auto grid grid-cols-3 gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-5 rounded border border-border bg-foreground/[0.06]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
