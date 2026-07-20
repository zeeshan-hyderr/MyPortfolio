import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiTrash, HiMail } from "react-icons/hi";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const Messages = () => {
  const [messages, setMessages] = useState(null);

  const fetchMessages = () => {
    api.get("/contact/messages").then((res) => setMessages(res.data));
  };

  useEffect(fetchMessages, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.delete(`/contact/messages/${id}`);
      fetchMessages();
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  return (
    <div>
      <span className="eyebrow">// Inbox</span>
      <h1 className="section-title mt-2 mb-6">Messages</h1>

      {!messages ? (
        <Loader />
      ) : messages.length === 0 ? (
        <p className="text-ink-muted flex items-center gap-2">
          <HiMail /> No messages yet.
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m._id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{m.name}</p>
                  <a href={`mailto:${m.email}`} className="text-sm text-accent-cyan">
                    {m.email}
                  </a>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-ink-muted font-mono">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="text-ink-muted hover:text-red-400 mt-2"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
              <p className="text-sm text-ink-muted mt-3 whitespace-pre-line">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
