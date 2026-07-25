import Reveal from "../ui/Reveal";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";
import useFetch from "../../hooks/useFetch";
import { getSkills } from "../../api/skills";

const CATEGORY_ORDER = ["Backend", "Frontend", "Database", "Tools"];

export default function Skills() {
  const { data: skills, loading } = useFetch(getSkills, []);

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: (skills ?? []).filter((s) => s.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Skills
        </h2>
        <p className="mt-3 max-w-xl text-secondary">
          Technologies and tools I use to design, build, and ship full stack products.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-40" />)}

        {!loading &&
          grouped.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <Card>
                <h3 className="font-heading text-lg font-medium text-accent">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill.id}
                      className="rounded-full border border-white/10 bg-background px-3 py-1.5 text-sm text-secondary transition-colors duration-200 hover:border-accent/50 hover:text-white"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
      </div>
    </section>
  );
}
