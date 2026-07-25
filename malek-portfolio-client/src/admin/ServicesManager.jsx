import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getServices, createService, updateService, deleteService } from "../api/services";
import { TextField, SelectField } from "./FormField";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Modal from "./Modal";

const ICON_KEYS = ["globe", "server", "layout"];
const empty = { title: "", description: "", iconKey: "globe", order: 0 };

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = () => getServices().then(setServices).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(empty);
    setEditing("new");
  };

  const openEdit = (service) => {
    setForm(service);
    setEditing(service.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing === "new") {
      await createService(form);
    } else {
      await updateService(editing, form);
    }
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    await deleteService(id);
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold text-white">Services</h2>
        <Button onClick={openCreate}>
          <Plus size={16} /> Add Service
        </Button>
      </div>

      {loading ? (
        <p className="text-secondary">Loading…</p>
      ) : (
        <div className="grid gap-3">
          {services.map((service) => (
            <Card key={service.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm text-white">{service.title}</p>
                <p className="text-xs text-secondary">{service.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(service)}
                  className="rounded-lg p-2 text-secondary transition-colors duration-200 hover:text-accent"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
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
        <Modal title={editing === "new" ? "Add Service" : "Edit Service"} onClose={() => setEditing(null)}>
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
            <SelectField
              label="Icon"
              options={ICON_KEYS}
              value={form.iconKey}
              onChange={(e) => setForm((f) => ({ ...f, iconKey: e.target.value }))}
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
