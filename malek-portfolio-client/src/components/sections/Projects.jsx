import { ExternalLink, ImageOff } from "lucide-react";
import Reveal from "../ui/Reveal";
import Skeleton from "../ui/Skeleton";
import GitHubIcon from "../ui/GitHubIcon";
import useFetch from "../../hooks/useFetch";
import { getProjects } from "../../api/projects";

export default function Projects() {
  const { data: projects, loading } = useFetch(getProjects, []);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Featured <span className="text-accent">Projects</span>
        </h2>
        <p className="mt-3 max-w-xl text-secondary">
          A selection of applications I've designed, built, and shipped end to end.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-80" />)}

        {!loading &&
          (projects ?? []).map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <article className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-surface">
                <div className="relative h-48 overflow-hidden bg-background">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-secondary/40">
                      <ImageOff size={32} />
                    </div>
                  )}
                </div>

                {(project.gitHubUrl || project.liveUrl) && (
                  <div className="flex items-center gap-3 border-b border-white/[0.06] bg-background/60 px-5 py-3">
                    {project.gitHubUrl && (
                      <a
                        href={project.gitHubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-secondary transition-colors duration-200 hover:border-accent/50 hover:text-white"
                      >
                        <GitHubIcon size={14} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-secondary transition-colors duration-200 hover:border-accent/50 hover:text-white"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-heading text-lg font-medium text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-secondary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
      </div>
    </section>
  );
}
