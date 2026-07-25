import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getProjects, createProject, updateProject, deleteProject } from "../api/projects";
import { TextField, CheckboxField } from "./FormField";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Modal from "./Modal";

const empty = {
  title: "",
  description: "",
  imageUrl: "",
  technologies: "",
  gitHubUrl: "",
  liveUrl: "",
  order: 0,
  featured: false,
};

function toFormState(project) {
  return { ...project, technologies: (project.technologies ?? []).join(", ") };
}

function toPayload(form) {
  return {
    ...form,
    technologies: form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = () => getProjects().then(setProjects).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(empty);
    setEditing("new");
  };

  const openEdit = (project) => {
    setForm(toFormState(project));
    setEditing(project.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = toPayload(form);
    if (editing === "new") {
      await createProject(payload);
    } else {
      await updateProject(editing, payload);
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-white">Projects</h2>
        <Button onClick={openCreate}>
          <Plus size={16} /> Add Project
        </Button>
      </div>

      {loading ? (
        <p className="text-secondary">Loading…</p>
      ) : (
        <div className="grid gap-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm text-white">{project.title}</p>
                <p className="text-xs text-secondary">{project.technologies?.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(project)}
                  className="rounded-lg p-2 text-secondary transition-colors duration-200 hover:text-accent"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded-lg p-2 text-secondary transition-colors duration-200 hover:text-red-400"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editing !== null && (
        <Modal title={editing === "new" ? "Add Project" : "Edit Project"} onClose={() => setEditing(null)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
            <TextField
              label="Description"
              as="textarea"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
            />
            <TextField
              label="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            />
            <TextField
              label="Technologies (comma separated)"
              value={form.technologies}
              onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="GitHub URL"
                value={form.gitHubUrl}
                onChange={(e) => setForm((f) => ({ ...f, gitHubUrl: e.target.value }))}
              />
              <TextField
                label="Live URL"
                value={form.liveUrl}
                onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <TextField
                label="Order"
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                className="max-w-[120px]"
              />
              <CheckboxField
                label="Featured"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
