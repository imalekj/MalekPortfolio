import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { getContactMessages, markMessageRead, deleteContactMessage } from "../api/contact";
import Card from "../components/ui/Card";

export default function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => getContactMessages().then(setMessages).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleMarkRead = async (id) => {
    await markMessageRead(id);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    await deleteContactMessage(id);
    load();
  };

  return (
    <div>
      <h2 className="mb-6 font-heading text-2xl font-semibold text-white">Messages</h2>

      {loading ? (
        <p className="text-secondary">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-secondary">No messages yet.</p>
      ) : (
        <div className="grid gap-3">
          {messages.map((message) => (
            <Card key={message.id} className={message.isRead ? "opacity-70" : ""}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    {message.name} <span className="text-secondary">· {message.email}</span>
                  </p>
                  <p className="mt-2 text-sm text-secondary">{message.message}</p>
                  <p className="mt-2 text-xs text-secondary/70">
                    {new Date(message.createdAtUtc).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {!message.isRead && (
                    <button
                      onClick={() => handleMarkRead(message.id)}
                      className="rounded-lg p-2 text-secondary transition-colors duration-200 hover:text-accent"
                      aria-label="Mark read"
                    >
                      <MailOpen size={16} />
                    </button>
                  )}
                  {message.isRead && <Mail size={16} className="mt-2 text-secondary/50" />}
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="rounded-lg p-2 text-secondary transition-colors duration-200 hover:text-red-400"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
