import type { Project } from "./projects-data";
import { PhoneMockup } from "./phone-mockup";
import { LaptopMockup } from "./laptop-mockup";
import { SparkleIcon } from "./sparkle-icon";

interface ProjectCardProps {
  project: Project;
  projectIndex?: number;
}

export function ProjectCard({ project, projectIndex }: ProjectCardProps) {
  const isFeatured = projectIndex === 0;
  return (
    <div
      className="project-card w-full"
      data-project-id={project.id}
      data-project-index={projectIndex}
      style={isFeatured ? { marginBottom: 'clamp(2rem, 5vw, 4rem)' } : undefined}
    >
      <div
        className={`flex flex-col w-full ${isFeatured ? 'lg:max-w-none' : 'lg:max-w-[865px]'}`}
        style={{ margin: 0, border: 0 }}
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          className={`project-frame group relative block w-full ${
            isFeatured ? 'lg:min-h-[440px]' : 'lg:max-w-[865px] lg:h-auto lg:min-h-[350px]'
          }`}
          style={{ background: "transparent" }}
        >
          <div className="relative w-full h-full">
            <div className="hidden sm:grid sm:grid-cols-[minmax(160px,28%)_minmax(0,1fr)] lg:grid-cols-[minmax(200px,262px)_minmax(400px,1fr)] gap-3 sm:gap-4 lg:gap-5 h-full justify-center w-full">
              <div className="flex flex-col gap-4 lg:gap-[30px]">
                <PhoneMockup
                  src={project.images.mobile1}
                  alt={`${project.title} Mobile View 1`}
                  gradient={project.gradient}
                  title={project.title}
                  subtitle={project.mobileLabel1}
                />
                <PhoneMockup
                  src={project.images.mobile2}
                  alt={`${project.title} Mobile View 2`}
                  gradient={project.gradient}
                  title={project.title}
                  subtitle={project.mobileLabel2}
                />
              </div>
              <div className="h-full">
                <LaptopMockup
                  src={project.images.main}
                  alt={project.title}
                  gradient={project.gradient}
                  fit={project.mainImageFit}
                  title={project.title}
                  subtitle={project.desktopLabel}
                />
              </div>
            </div>
            <div className="sm:hidden aspect-[16/10]">
              <LaptopMockup
                src={project.images.main}
                alt={project.title}
                gradient={project.gradient}
                fit={project.mainImageFit}
                title={project.title}
                subtitle={project.desktopLabel}
              />
            </div>
          </div>
        </a>

        {/* Mobile info panel */}
        <div className="mobile-project-info mt-4 sm:mt-5 p-4 sm:p-5 bg-card rounded-xl sm:rounded-2xl border border-border lg:hidden">
          <div className="flex items-center mb-2 sm:mb-3">
            <div
              aria-hidden="true"
              className={`mr-2 sm:mr-3 h-1 w-5 sm:w-6 rounded-full ${project.accent.dash}`}
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground font-outfit">
              {project.title}
            </h3>
          </div>
          <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed font-outfit text-sm sm:text-base">
            {project.description}
          </p>
          <ul className="list-none p-0 mb-4 sm:mb-5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start mb-1.5 sm:mb-2 text-muted-foreground text-xs sm:text-sm font-outfit"
              >
                <SparkleIcon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 mt-0.5 shrink-0 rounded-full p-0.5 ${project.accent.fill} ${project.accent.text} ${project.accent.bg}`}
                />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-1.5 lg:gap-2 rounded-xl border border-border bg-card px-2.5 py-1 font-outfit text-xs text-foreground transition-colors"
              >
                <img
                  src={t.icon || "/placeholder.svg"}
                  alt={t.name}
                  width={16}
                  height={16}
                  loading="lazy"
                  className="h-3.5 w-3.5 object-contain"
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
