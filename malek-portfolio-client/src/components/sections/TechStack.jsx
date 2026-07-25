import {
  Server,
  Hash,
  Database,
  Boxes,
  Atom,
  Braces,
  FileCode2,
  Palette,
  GitBranch,
  AppWindow,
  Code2,
} from "lucide-react";
import Reveal from "../ui/Reveal";
import GitHubIcon from "../ui/GitHubIcon";
import useFetch from "../../hooks/useFetch";
import { getSkills } from "../../api/skills";

const ICONS = {
  "ASP.NET Core": Server,
  "C#": Hash,
  "Entity Framework": Boxes,
  "SQL Server": Database,
  React: Atom,
  JavaScript: Braces,
  HTML: FileCode2,
  CSS: Palette,
  PostgreSQL: Database,
  Git: GitBranch,
  GitHub: GitHubIcon,
  "Visual Studio": AppWindow,
  "VS Code": Code2,
};

export default function TechStack() {
  const { data: skills } = useFetch(getSkills, []);
  const unique = Array.from(new Map((skills ?? []).map((s) => [s.name, s])).values());

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h3 className="text-center font-heading text-xl font-medium text-secondary">
          Tech Stack
        </h3>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
          {unique.map((skill) => {
            const Icon = ICONS[skill.name] ?? Code2;
            return (
              <div
                key={skill.id}
                className="group flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <Icon
                  size={28}
                  className="text-secondary transition-all duration-300 group-hover:rotate-[8deg] group-hover:text-accent group-hover:drop-shadow-[0_0_10px_rgba(197,160,89,0.6)]"
                />
                <span className="text-xs text-secondary transition-colors duration-300 group-hover:text-white">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
