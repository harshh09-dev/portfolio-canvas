import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./projects-data";
import { ProjectCard } from "./project-card";
import { StickyInfoPanel } from "./sticky-info-panel";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressMarkerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const rightContainer = rightContainerRef.current;
    if (!section || !rightContainer) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      // Per-card reveal timelines. Each card gets its own paused timeline
      // that plays once the card enters the viewport, replacing the old
      // pattern of repeated gsap.fromTo calls scattered across triggers.
      cards.forEach((card) => {
        const phones = card.querySelectorAll(".phone-frame");
        const laptops = card.querySelectorAll(".laptop-frame");

        const revealTimeline = gsap.timeline({ paused: true });
        revealTimeline
          .set(phones, { opacity: 0, y: 20 })
          .set(laptops, { opacity: 0, scale: 0.95 })
          .to(phones, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
          })
          .to(
            laptops,
            { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
            "<0.1",
          );

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => revealTimeline.play(),
        });

        ScrollTrigger.create({
          trigger: card,
          start: "center center",
          end: "center center",
          onEnter: () => {
            const index = Number(card.dataset.projectIndex);
            if (Number.isNaN(index)) return;
            setActiveIndex(index);
          },
          onEnterBack: () => {
            const index = Number(card.dataset.projectIndex);
            if (Number.isNaN(index)) return;
            setActiveIndex(index);
          },
        });
      });

      // Single scroll-driven trigger spans the whole right column.
      // It drives BOTH the progress rail and the active-project index,
      // deriving the active project from which card's center is closest
      // to the viewport center at any given scroll position — rather
      // than firing discrete "top center" enter/enterBack callbacks
      // per card, which causes jumpy, order-dependent activation.
      ScrollTrigger.create({
        trigger: rightContainer,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(progressFillRef.current, { scaleY: self.progress });
          gsap.set(progressMarkerRef.current, {
            top: `${self.progress * 100}%`,
          });
        },
      });

      gsap.set(progressFillRef.current, {
        opacity: 1,
        scaleY: 0,
        transformOrigin: "top",
      });

      // Layout can shift after images/fonts finish loading; refresh once
      // the context is fully wired up so trigger positions stay accurate.
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  const activeProject = projects[activeIndex];

  return (
    <div className="bg-background" style={{ isolation: "isolate" }}>
      <section
        ref={sectionRef}
        id="projects-section"
        className="w-full min-h-screen flex flex-col justify-start items-center font-outfit px-4 sm:px-6 lg:px-4 py-12 sm:py-16 lg:pt-16 pb-24 sm:pb-32 lg:pb-[200px]"
        style={{
          margin: 0,
          border: 0,
          position: "relative",
          overflow: "hidden",
          zIndex: 0,
          isolation: "isolate",
        }}
      >
        {/* Heading */}
        <div className="w-full text-center mb-10 md:mb-16 relative pt-4 pb-6 md:pb-10">
          <div className="relative flex flex-col items-center px-4 gap-3">
            <p className="text-eyebrow">Crafting modern experiences</p>
            <h2 className="section-heading">
              Venture <span className="work-text">Showcase</span>
            </h2>
            <p className="text-lead max-w-xl mt-2">
              Selected work — products I&apos;ve designed, built, and shipped.
            </p>
          </div>
        </div>


        {/* Content */}
        <div
          className="flex flex-col w-full lg:max-w-[1488.8px]"
          style={{ margin: 0, border: 0, padding: 0, position: "relative" }}
        >
          <div
            className="flex flex-col lg:flex-row w-full relative"
            style={{
              gap: "clamp(2rem, 5vw, 4rem)",
              margin: 0,
              border: 0,
              padding: 0,
              position: "relative",
            }}
          >
            {/* Left sticky panel (desktop only) */}
            <div
              id="left-box-container"
              className="hidden lg:block lg:w-[40%] xl:w-[35%] lg:min-w-[340px] relative"
            >
              <div
                id="sticky-box"
                className="z-50 w-full relative flex lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:max-h-[720px]"
              >
                {/* Progress rail */}
                <div className="absolute -right-6 top-0 h-full w-8 z-10">
                  <div className="relative h-full w-full">
                    <div className="absolute top-0 bottom-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-muted">
                      <div
                        ref={progressFillRef}
                        className="absolute inset-0 w-full origin-top rounded-full bg-foreground"
                        style={{ opacity: 0, transform: "scaleY(0)" }}
                      />
                    </div>
                    <div
                      ref={progressMarkerRef}
                      className="absolute -right-0.5 z-10 flex"
                      style={{
                        height: "36px",
                        top: "0%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-background bg-background shadow-md">
                        <img
                          src="/images/avatar.jpeg"
                          alt="Profile"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <StickyInfoPanel project={activeProject} />
              </div>
            </div>

            {/* Right column: project cards */}
            <div
              ref={rightContainerRef}
              className="right-container flex flex-col gap-8 sm:gap-10 lg:gap-y-24 w-full lg:flex-1 lg:min-w-0"
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  projectIndex={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
