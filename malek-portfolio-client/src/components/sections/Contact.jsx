import { useState } from "react";
import { Mail, Download, Send, Loader2, CheckCircle2 } from "lucide-react";
import Reveal from "../ui/Reveal";
import Card from "../ui/Card";
import Button from "../ui/Button";
import GitHubIcon from "../ui/GitHubIcon";
import LinkedInIcon from "../ui/LinkedInIcon";
import useFetch from "../../hooks/useFetch";
import { getProfile } from "../../api/profile";
import { sendContactMessage } from "../../api/contact";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const { data: profile } = useFetch(getProfile, []);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const links = [
    { icon: GitHubIcon, label: "GitHub", href: profile?.gitHubUrl },
    { icon: LinkedInIcon, label: "LinkedIn", href: profile?.linkedInUrl },
    { icon: Mail, label: "Email", href: profile?.email ? `mailto:${profile.email}` : undefined },
    { icon: Download, label: "Download CV", href: profile?.cvUrl },
  ].filter((link) => link.href);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Get In <span className="text-accent">Touch</span>
        </h2>
        <p className="mt-3 max-w-xl text-secondary">
          Have a project in mind? Send a message and I'll get back to you.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.1}>
          <Card>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-secondary">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-white outline-none transition-colors duration-200 focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-secondary">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-white outline-none transition-colors duration-200 focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm text-secondary">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-white outline-none transition-colors duration-200 focus:border-accent"
                />
              </div>

              <Button type="submit" disabled={status === "submitting"} className="w-full">
                {status === "submitting" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Send size={16} />
                )}
                {status === "success" ? "Message Sent" : "Send Message"}
              </Button>

              {status === "error" && <p className="text-sm text-red-400">{error}</p>}
            </form>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <Card className="h-full">
            <h3 className="font-heading text-lg font-medium text-white">Connect</h3>
            <div className="mt-5 flex flex-col gap-3">
              {links.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm text-secondary transition-all duration-200 hover:border-accent/50 hover:text-white"
                >
                  <Icon size={16} className="text-accent" />
                  {label}
                </a>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
