interface PhoneMockupProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

/**
 * Phone mockup — monochrome device chrome. When no screenshot is supplied
 * it renders a neutral muted-fill placeholder screen (never a broken image).
 */
export function PhoneMockup({ src, alt, title, subtitle }: PhoneMockupProps) {
  const hasImage = Boolean(src);
  return (
    <div className="phone-frame relative flex flex-col items-center">
      <div
        className="relative w-full flex justify-center rounded-xl sm:rounded-2xl border border-border bg-card overflow-hidden"
        style={{ height: "190.41px" }}
      >
        <div className="absolute inset-x-0 top-4 sm:top-5 flex justify-center">
          <div className="relative w-[55%] max-w-[190px] rounded-[18px] sm:rounded-[22px] border border-border-strong bg-muted p-[2px]">
            <div className="absolute top-1.5 left-1/2 z-20 h-2.5 w-10 -translate-x-1/2 rounded-full bg-foreground/25 sm:h-3 sm:w-12" />
            <div className="relative overflow-hidden rounded-[14px] border border-border bg-muted sm:rounded-[18px]">
              {hasImage ? (
                <img
                  src={src}
                  alt={alt}
                  width={280}
                  height={580}
                  loading="lazy"
                  className="h-auto w-full object-cover object-top"
                />
              ) : (
                <PlaceholderPhoneScreen />
              )}
            </div>
          </div>
        </div>
      </div>
      {subtitle && (
        <p className="mt-2 text-center text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          {title ? `${subtitle}` : subtitle}
        </p>
      )}
    </div>
  );
}

function PlaceholderPhoneScreen() {
  return (
    <div className="relative flex w-full flex-col justify-between bg-muted p-3 aspect-[9/19]">
      <div className="mt-6 flex flex-col gap-1.5">
        <div className="h-1 w-6 rounded-full bg-foreground/25" />
        <div className="h-2 w-4/5 rounded-full bg-foreground/15" />
        <div className="h-1.5 w-3/5 rounded-full bg-foreground/10" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-6 rounded border border-border bg-foreground/[0.06]" />
        <div className="h-6 rounded border border-border bg-foreground/[0.05]" />
        <div className="h-6 rounded border border-border bg-foreground/[0.04]" />
      </div>
      <div className="grid grid-cols-4 gap-1 pb-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md border border-border bg-foreground/[0.06]"
          />
        ))}
      </div>
    </div>
  );
}
