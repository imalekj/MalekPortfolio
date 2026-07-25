import { MapPin, Briefcase, Cpu, CheckCircle2, User } from "lucide-react";
import Reveal from "../ui/Reveal";
import Card from "../ui/Card";
import useFetch from "../../hooks/useFetch";
import { getProfile } from "../../api/profile";
import { getSkills } from "../../api/skills";

export default function About() {
  const { data: profile } = useFetch(getProfile, []);
  const { data: skills } = useFetch(getSkills, []);

  const facts = [
    { icon: MapPin, label: "Location", value: profile?.location || "—" },
    { icon: Briefcase, label: "Experience", value: profile?.experienceYears || "—" },
    { icon: Cpu, label: "Technologies", value: skills ? `${skills.length}+ Technologies` : "—" },
    { icon: CheckCircle2, label: "Availability", value: profile?.availability || "—" },
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          About <span className="text-accent">Me</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <Card className="mt-10 grid gap-10 p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10">
          <div className="mx-auto flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-background text-accent md:mx-0">
            <User size={44} />
          </div>

          <p className="text-center text-base leading-relaxed text-secondary md:text-left">
            {profile?.tagline ||
              "A Full Stack Web Developer who enjoys turning complex problems into simple, elegant, and scalable digital products — from backend APIs to polished, responsive interfaces."}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-accent">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-secondary">{label}</p>
                  <p className="text-sm text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
