import { useEffect, useState } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { getProfile, updateProfile } from "../api/profile";
import { TextField } from "./FormField";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const empty = {
  name: "",
  title: "",
  tagline: "",
  bio: "",
  location: "",
  experienceYears: "",
  availability: "",
  cvUrl: "",
  gitHubUrl: "",
  linkedInUrl: "",
  email: "",
};

export default function ProfileEditor() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    getProfile()
      .then((data) => setForm({ ...empty, ...data }))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    try {
      const updated = await updateProfile(form);
      setForm({ ...empty, ...updated });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  };

  if (loading) return <p className="text-secondary">Loading profile…</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 font-heading text-2xl font-semibold text-white">Profile</h2>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
            <TextField label="Title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <TextField
            label="Hero one-liner"
            name="bio"
            as="textarea"
            rows={2}
            value={form.bio}
            onChange={handleChange}
          />
          <TextField
            label="About paragraph"
            name="tagline"
            as="textarea"
            rows={3}
            value={form.tagline}
            onChange={handleChange}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Location" name="location" value={form.location} onChange={handleChange} />
            <TextField
              label="Experience"
              name="experienceYears"
              value={form.experienceYears}
              onChange={handleChange}
            />
          </div>
          <TextField
            label="Availability"
            name="availability"
            value={form.availability}
            onChange={handleChange}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <TextField label="CV URL" name="cvUrl" value={form.cvUrl} onChange={handleChange} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="GitHub URL" name="gitHubUrl" value={form.gitHubUrl} onChange={handleChange} />
            <TextField
              label="LinkedIn URL"
              name="linkedInUrl"
              value={form.linkedInUrl}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" && <Loader2 size={16} className="animate-spin" />}
            {status === "saved" && <CheckCircle2 size={16} />}
            {status === "idle" && <Save size={16} />}
            {status === "saved" ? "Saved" : "Save Changes"}
          </Button>
          {status === "error" && <p className="text-sm text-red-400">Failed to save. Try again.</p>}
        </form>
      </Card>
    </div>
  );
}
