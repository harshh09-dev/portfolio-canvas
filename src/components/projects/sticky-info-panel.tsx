import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "./projects-data";
import { SparkleIcon } from "./sparkle-icon";

interface StickyInfoPanelProps {
  project: Project;
}

export function StickyInfoPanel({ project }: StickyInfoPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Re-animate content in place whenever the active project changes.
  // No remount / key hack: the DOM node is reused, only its content changes,
  // and a fresh timeline replaces the previous one every time.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    timelineRef.current?.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.fromTo(
      el.querySelectorAll(".panel-title, .panel-desc"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.08 },
    )
      .fromTo(
        el.querySelectorAll(".panel-feature"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.12 },
        "-=0.2",
      )
      .fromTo(
        el.querySelectorAll(".panel-tech"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 },
        "-=0.15",
      );

    return () => {
      tl.kill();
    };
  }, [project.id]);

  return (
    <div className="flex-1 w-full">
      <div
        className="flex w-full h-auto lg:h-full relative"
        style={{ paddingRight: "20px" }}
      >
        <div
          className={`my-4 mr-4 rounded-full flex-shrink-0 ${project.accent.dash}`}
          style={{ width: "24px", height: "4px" }}
        />
        <div ref={contentRef} className="flex flex-col items-start w-full">
          <h3 className="panel-title text-2xl lg:text-3xl font-bold text-foreground font-outfit leading-tight">
            {project.title}
          </h3>
          <p className="panel-desc my-3 text-sm lg:text-base font-light text-muted-foreground font-outfit leading-relaxed max-w-prose">
            {project.description}
          </p>
          <ul className="mt-2 lg:mt-4 flex flex-col gap-y-2 text-sm lg:text-base text-muted-foreground">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="panel-feature flex items-start text-sm font-outfit"
              >
                <SparkleIcon
                  className={`mt-0.5 mr-2 size-4 lg:size-5 shrink-0 rounded-full lg:bg-white lg:dark:bg-black ${project.accent.fill} ${project.accent.text} ${project.accent.bg}`}
                />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 lg:mt-8 flex flex-wrap gap-2 lg:gap-3 text-xs lg:text-sm">
            {project.tech.map((t) => (
              <div
                key={t.name}
                className="panel-tech flex items-center gap-1.5 lg:gap-2 rounded-xl border border-border bg-card px-2.5 py-1 lg:px-3 lg:py-1 font-outfit text-foreground transition-colors"
              >
                <img
                  src={t.icon || "/placeholder.svg"}
                  alt={t.name}
                  width={16}
                  height={16}
                  loading="lazy"
                  className="h-3.5 w-3.5 lg:h-4 lg:w-4 object-contain"
                />
                {t.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
