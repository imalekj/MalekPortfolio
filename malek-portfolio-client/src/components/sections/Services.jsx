import { Globe, Server, LayoutTemplate, Sparkles } from "lucide-react";
import Reveal from "../ui/Reveal";
import Card from "../ui/Card";
import useFetch from "../../hooks/useFetch";
import { getServices } from "../../api/services";

const ICONS = {
  globe: Globe,
  server: Server,
  layout: LayoutTemplate,
};

export default function Services() {
  const { data: services } = useFetch(getServices, []);

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Services
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {(services ?? []).map((service, i) => {
          const Icon = ICONS[service.iconKey] ?? Sparkles;
          return (
            <Reveal key={service.id} delay={i * 0.1}>
              <Card className="h-full transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-background text-accent">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-heading text-lg font-medium text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {service.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
