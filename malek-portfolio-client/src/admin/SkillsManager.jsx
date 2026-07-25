import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../api/skills";
import { TextField, SelectField } from "./FormField";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Modal from "./Modal";

const CATEGORIES = ["Backend", "Frontend", "Database", "Tools"];
const empty = { category: "Backend", name: "", order: 0 };

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = () => getSkills().then(setSkills).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(empty);
    setEditing("new");
  };

  const openEdit = (skill) => {
    setForm(skill);
    setEditing(skill.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing === "new") {
      await createSkill(form);
    } else {
      await updateSkill(editing, form);
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
    await deleteSkill(id);
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-white">Skills</h2>
        <Button onClick={openCreate}>
          <Plus size={16} /> Add Skill
        </Button>
      </div>

      {loading ? (
        <p className="text-secondary">Loading…</p>
      ) : (
        <div className="grid gap-3">
          {skills.map((skill) => (
            <Card key={skill.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm text-white">{skill.name}</p>
                <p className="text-xs text-secondary">
                  {skill.category} · order {skill.order}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(skill)}
                  className="rounded-lg p-2 text-secondary transition-colors duration-200 hover:text-accent"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
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
        <Modal title={editing === "new" ? "Add Skill" : "Edit Skill"} onClose={() => setEditing(null)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <SelectField
              label="Category"
              options={CATEGORIES}
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
            <TextField
              label="Order"
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
