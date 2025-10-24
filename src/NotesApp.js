import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, StickyNote, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("notesflow_token") || ""
  );
  const navigate = useNavigate();

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:10000/api";

  useEffect(() => {
    fetchNotes();
  }, []);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("notesflow_token")}`,
    "Content-Type": "application/json",
  });

  const addNote = async () => {
    if (title.trim() && content.trim()) {
      try {
        if (editingId) {
          const res = await fetch(`${apiBase}/notes/${editingId}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({
              title: title.trim(),
              content: content.trim(),
            }),
          });
          if (!res.ok) throw new Error("Update failed");
          const updated = await res.json();
          setNotes(notes.map((n) => (n._id === updated._id ? updated : n)));
          setEditingId(null);
        } else {
          const res = await fetch(`${apiBase}/notes`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({
              title: title.trim(),
              content: content.trim(),
            }),
          });
          if (!res.ok) throw new Error("Create failed");
          const created = await res.json();
          setNotes([created, ...notes]);
        }
        setTitle("");
        setContent("");
      } catch (err) {
        console.error(err);
        alert("Could not save note");
      }
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteNote = async (id) => {
    try {
      const res = await fetch(`${apiBase}/notes/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete note");
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  const handleRegister = async () => {
    if (!email || !password) return alert("Please provide email and password");
    try {
      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("notesflow_token", data.token);
      setToken(data.token);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.message || "Could not register");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) return alert("Please provide email and password");
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("notesflow_token", data.token);
      setToken(data.token);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("notesflow_token");
    navigate("/login");
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${apiBase}/notes`, { headers: authHeaders() });
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
      alert("Could not load notes. Please login again.");
      handleLogout();
    }
  };

  return (
    <div className="notes-app-root" style={styles.container}>
      <header style={styles.topbar}>
        <div style={styles.brand}>
          <StickyNote style={styles.logoIcon} size={28} />
          <div>
            <div style={styles.brandTitle}>NotesFlow</div>
            <div style={styles.brandSub}>Capture ideas, crisply</div>
          </div>
        </div>
        <div style={styles.topActions}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={styles.searchTop}>
              <Search size={16} style={{ marginRight: 8, color: "#9aa2b2" }} />
              <input
                aria-label="Search notes"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchTopInput}
              />
            </div>
            <button
              onClick={handleLogout}
              style={{ ...styles.button, ...styles.ghostButton }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        <section style={styles.leftCol}>
          <div style={styles.addNoteCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>
                  {editingId ? "Edit note" : "Create note"}
                </div>
                <div style={styles.cardSubtitle}>
                  Short, focused notes work best
                </div>
              </div>
              <div style={styles.countBadge}>{notes.length}</div>
            </div>

            <div style={styles.formContainer}>
              <label style={styles.label}>Title</label>
              <input
                type="text"
                placeholder="Add title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
              />

              <label style={styles.label}>Content</label>
              <textarea
                placeholder="Write something meaningful..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={styles.textarea}
                rows={6}
              />

              <div style={styles.formFooter}>
                <div style={styles.charCount}>{content.length} chars</div>
                <div style={styles.formButtons}>
                  <button
                    onClick={addNote}
                    style={{ ...styles.button, ...styles.primaryButton }}
                    disabled={!title.trim() || !content.trim()}
                  >
                    {editingId ? (
                      <>
                        <Edit size={16} /> Update
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Add
                      </>
                    )}
                  </button>
                  {editingId && (
                    <button
                      onClick={cancelEdit}
                      style={{ ...styles.button, ...styles.ghostButton }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.rightCol}>
          <div style={styles.notesSection}>
            <div style={styles.notesHeader}>
              <h2 style={styles.sectionTitle}>Your Notes</h2>
              <div style={styles.filterInfo}>{filteredNotes.length} shown</div>
            </div>

            {filteredNotes.length === 0 ? (
              <div style={styles.emptyState}>
                <StickyNote style={styles.emptyIcon} size={56} />
                <p style={styles.emptyText}>
                  {searchTerm
                    ? "No results for your search."
                    : "No notes yet — create one to get started."}
                </p>
              </div>
            ) : (
              <div style={styles.notesGrid}>
                {filteredNotes.map((note, index) => (
                  <article
                    key={note._id}
                    style={{
                      ...styles.noteCard,
                      animationDelay: `${index * 0.06}s`,
                    }}
                  >
                    <div style={styles.noteHeader}>
                      <h3 style={styles.noteTitle}>{note.title}</h3>
                      <div style={styles.noteBadge}>{index + 1}</div>
                    </div>
                    <p style={styles.noteContent}>{note.content}</p>
                    <div style={styles.noteActions}>
                      <button
                        onClick={() => editNote(note)}
                        style={{ ...styles.actionButton, ...styles.editButton }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        style={{
                          ...styles.actionButton,
                          ...styles.deleteButton,
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

/* ---------------------------------
   💅 Inline Styles
----------------------------------- */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f6f9fc 0%, #eef2f8 100%)",
    position: "relative",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif',
    color: "#172B4D",
    paddingBottom: 70,
  },
  bgAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 240,
    background:
      "linear-gradient(90deg, rgba(102,126,234,0.12), rgba(118,75,162,0.08))",
    backgroundSize: "200% 200%",
    animation: "gradient 18s ease infinite",
    zIndex: 0,
    pointerEvents: "none",
  },
  topbar: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "28px 20px",
  },
  brand: { display: "flex", gap: 12, alignItems: "center" },
  logoIcon: { color: "#5b6df3" },
  brandTitle: { fontSize: 18, fontWeight: 700, color: "#0f1724" },
  brandSub: { fontSize: 12, color: "#556179", marginTop: -2 },
  topActions: { display: "flex", gap: 12, alignItems: "center" },
  searchTop: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: 12,
    padding: "8px 12px",
    boxShadow: "0 6px 18px rgba(23,43,77,0.06)",
  },
  searchTopInput: {
    border: "none",
    outline: "none",
    fontSize: 14,
    minWidth: 220,
  },
  mainContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1200,
    margin: "12px auto 0",
    padding: "20px",
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
  },
  leftCol: { flex: "0 0 420px" },
  rightCol: { flex: 1 },
  addNoteCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 10px 30px rgba(23,43,77,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 18, fontWeight: 700, color: "#0f1724" },
  cardSubtitle: { fontSize: 13, color: "#6b7280" },
  countBadge: {
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 13,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 8,
  },
  label: { fontSize: 12, color: "#475569", fontWeight: 600 },
  input: {
    padding: "12px 14px",
    fontSize: 14,
    border: "1px solid #e6eef6",
    borderRadius: 10,
    outline: "none",
  },
  textarea: {
    padding: "12px 14px",
    fontSize: 14,
    border: "1px solid #e6eef6",
    borderRadius: 10,
    outline: "none",
    resize: "vertical",
    minHeight: 120,
  },
  formFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  charCount: { fontSize: 12, color: "#94a3b8" },
  formButtons: { display: "flex", gap: 8 },
  button: {
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 700,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  primaryButton: {
    background: "linear-gradient(90deg,#667eea,#764ba2)",
    color: "#fff",
    boxShadow: "0 6px 18px rgba(102,126,234,0.18)",
  },
  ghostButton: {
    background: "transparent",
    border: "1px solid #e6eef6",
    color: "#374151",
  },
  notesSection: { display: "flow-root" },
  notesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { margin: 0, fontSize: 18, color: "#0f1724" },
  filterInfo: { fontSize: 13, color: "#6b7280" },
  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  noteCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 8px 24px rgba(20,32,64,0.04)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },
  noteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  noteTitle: { fontSize: 16, margin: 0, color: "#0f1724", fontWeight: 700 },
  noteBadge: {
    background: "#eef2ff",
    color: "#3b82f6",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },
  noteContent: {
    fontSize: 14,
    color: "#475569",
    marginTop: 10,
    marginBottom: 12,
    whiteSpace: "pre-wrap",
  },
  noteActions: { display: "flex", gap: 8, justifyContent: "flex-end" },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  editButton: { background: "#eef2ff", color: "#1f2937" },
  deleteButton: { background: "#fff1f0", color: "#9f1239" },
  emptyState: {
    background: "#fff",
    padding: 28,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(20,32,64,0.04)",
  },
  emptyIcon: { color: "#c7d2fe", marginBottom: 12 },
  emptyText: { color: "#6b7280", margin: 0 },
};

export default NotesApp;
