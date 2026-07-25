interface PhoneMockupProps {
  src: string;
  alt: string;
  gradient: string;
  title?: string;
  subtitle?: string;
}

/**
 * Phone mockup — renders an intentional branded screen fallback when
 * `src` is empty or the referenced image is missing. No broken-image
 * icon in the shipped build.
 */
export function PhoneMockup({ src, alt, gradient, title, subtitle }: PhoneMockupProps) {
  const hasImage = Boolean(src);
  return (
    <div
      className="phone-frame relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
      style={{ background: gradient, height: '190.41px' }}
    >
      <div className="absolute inset-x-0 top-4 sm:top-5 flex justify-center">
        <div className="relative w-[55%] max-w-[190px]" style={{ padding: '2px' }}>
          <div
            className="absolute inset-0 rounded-[18px] sm:rounded-[22px]"
            style={{
              background:
                'linear-gradient(145deg, #5a5a5a 0%, #2a2a2a 20%, #1a1a1a 40%, #3a3a3a 60%, #4a4a4a 80%, #2a2a2a 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.4)',
            }}
          />
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-2.5 sm:h-3 bg-black rounded-full z-20"
            style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }}
          />
          <div
            className="relative rounded-[14px] sm:rounded-[18px] overflow-hidden"
            style={{ border: '1px solid rgba(0,0,0,0.8)', background: hasImage ? '#fff' : 'transparent' }}
          >
            {hasImage ? (
              <img
                src={src}
                alt={alt}
                width={280}
                height={580}
                loading="lazy"
                className="w-full h-auto object-cover object-top"
              />
            ) : (
              <BrandedPhoneScreen title={title} subtitle={subtitle} gradient={gradient} />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandedPhoneScreen({
  title,
  subtitle,
  gradient,
}: {
  title?: string;
  subtitle?: string;
  gradient: string;
}) {
  return (
    <div
      className="relative w-full aspect-[9/19] flex flex-col justify-between p-3"
      style={{ background: gradient }}
    >
      <div className="mt-6 flex flex-col gap-1.5">
        <div className="h-1 w-6 rounded-full bg-white/50" />
        <div
          className="text-white font-medium leading-tight"
          style={{ fontSize: '0.78rem', letterSpacing: '-0.01em' }}
        >
          {title ?? ''}
        </div>
        {subtitle && (
          <div className="text-white/70" style={{ fontSize: '0.55rem' }}>
            {subtitle}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-6 rounded bg-white/12 border border-white/15" />
        <div className="h-6 rounded bg-white/10 border border-white/12" />
        <div className="h-6 rounded bg-white/8 border border-white/10" />
      </div>
      <div className="grid grid-cols-4 gap-1 pb-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-md bg-white/15 border border-white/20" />
        ))}
      </div>
    </div>
  );
}
