interface LaptopMockupProps {
  src: string;
  alt: string;
  gradient: string;
  fit?: 'cover' | 'fill';
  title?: string;
  subtitle?: string;
}

/**
 * Laptop mockup — renders an intentional branded screen fallback when
 * `src` is empty or the referenced image is missing.
 */
export function LaptopMockup({ src, alt, gradient, fit = 'cover', title, subtitle }: LaptopMockupProps) {
  const hasImage = Boolean(src);
  return (
    <div
      className="laptop-frame relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-full"
      style={{ background: gradient }}
    >
      <div className="p-3 sm:p-4 lg:p-5 h-full flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-lg sm:rounded-xl shadow-2xl p-[1.5%] sm:p-[1.2%] ring-1 ring-white/10 group transform-gpu">
            <div className="relative w-full h-full bg-black rounded-md sm:rounded-lg overflow-hidden ring-1 ring-white/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[14%] sm:w-[12%] h-[6%] sm:h-[7%] bg-black rounded-b-md sm:rounded-b-lg z-20 flex items-end justify-center pb-1 border-b border-x border-white/10 shadow-sm">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#111] ring-1 ring-white/20 opacity-80 shadow-inner" />
              </div>
              <div className="relative w-full h-full" style={{ background: hasImage ? '#fff' : 'transparent' }}>
                {hasImage ? (
                  <img
                    src={src}
                    alt={alt}
                    width={1200}
                    height={750}
                    loading="lazy"
                    className={`w-full h-full ${fit === 'fill' ? 'object-fill' : 'object-cover'} object-top`}
                  />
                ) : (
                  <BrandedLaptopScreen title={title} subtitle={subtitle} gradient={gradient} />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay z-10 opacity-50" />
              </div>
            </div>
            <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[20%] h-[3px] bg-[#333] rounded-b-lg opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandedLaptopScreen({
  title,
  subtitle,
  gradient,
}: {
  title?: string;
  subtitle?: string;
  gradient: string;
}) {
  return (
    <div className="relative w-full h-full flex flex-col" style={{ background: gradient }}>
      {/* Fake browser chrome */}
      <div className="h-6 flex items-center gap-1.5 px-3 bg-black/25 border-b border-white/10">
        <div className="h-2 w-2 rounded-full bg-white/40" />
        <div className="h-2 w-2 rounded-full bg-white/25" />
        <div className="h-2 w-2 rounded-full bg-white/15" />
        <div className="ml-3 h-2 w-40 rounded-full bg-white/15" />
      </div>
      <div className="flex-1 grid grid-cols-6 grid-rows-4 gap-2 p-4">
        <div className="col-span-2 row-span-4 rounded-lg bg-white/10 border border-white/15 flex flex-col gap-2 p-3">
          <div className="h-2 w-16 rounded-full bg-white/40" />
          <div className="h-1.5 w-12 rounded-full bg-white/20" />
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="h-1.5 w-full rounded-full bg-white/15" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
            <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
          </div>
        </div>
        <div className="col-span-4 row-span-1 rounded-lg bg-white/8 border border-white/10 flex items-center px-4">
          <div className="text-white font-medium truncate" style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
            {title}
          </div>
          {subtitle && (
            <div className="ml-3 text-white/70 truncate" style={{ fontSize: '0.7rem' }}>
              {subtitle}
            </div>
          )}
        </div>
        <div className="col-span-2 row-span-3 rounded-lg bg-gradient-to-br from-white/15 to-white/5 border border-white/15" />
        <div className="col-span-2 row-span-3 rounded-lg bg-white/8 border border-white/10 flex flex-col gap-1.5 p-3">
          <div className="h-1.5 w-full rounded-full bg-white/25" />
          <div className="h-1.5 w-5/6 rounded-full bg-white/20" />
          <div className="h-1.5 w-4/6 rounded-full bg-white/15" />
          <div className="mt-auto grid grid-cols-3 gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-5 rounded bg-white/10 border border-white/12" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
