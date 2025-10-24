import React, { useState } from "react";
import { Edit, Trash2, Plus, StickyNote, Search } from "lucide-react";

const NotesApp = () => {
  const [notes, setNotes] = useState([
    { _id: "1", title: "Welcome", content: "Start taking beautiful notes!" },
    {
      _id: "2",
      title: "Meeting Notes",
      content: "Discuss project timeline and deliverables",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  const addNote = () => {
    if (title.trim() && content.trim()) {
      if (editingId) {
        setNotes(
          notes.map((note) =>
            note._id === editingId ? { ...note, title, content } : note
          )
        );
        setEditingId(null);
      } else {
        setNotes([...notes, { _id: Date.now().toString(), title, content }]);
      }
      setTitle("");
      setContent("");
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note._id !== id));
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

  return (
    <div style={styles.container}>
      <div style={styles.bgAnimation}></div>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <StickyNote style={styles.logoIcon} size={48} />
            <h1 style={styles.title}>NotesFlow</h1>
          </div>
          <p style={styles.subtitle}>Capture your thoughts beautifully</p>
        </div>
      </header>

      <div style={styles.mainContent}>
        <div style={styles.addNoteCard}>
          <h2 style={styles.cardTitle}>
            {editingId ? "✏️ Edit Note" : "✨ Create New Note"}
          </h2>
          <div style={styles.formContainer}>
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              rows="4"
            />
            <div style={styles.formButtons}>
              <button
                onClick={addNote}
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                {editingId ? (
                  <>
                    <Edit size={18} /> Update Note
                  </>
                ) : (
                  <>
                    <Plus size={18} /> Add Note
                  </>
                )}
              </button>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  style={{ ...styles.button, ...styles.secondaryButton }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.notesSection}>
          <h2 style={styles.sectionTitle}>
            Your Notes ({filteredNotes.length})
          </h2>
          {filteredNotes.length === 0 ? (
            <div style={styles.emptyState}>
              <StickyNote style={styles.emptyIcon} size={64} />
              <p style={styles.emptyText}>
                {searchTerm
                  ? "No notes found"
                  : "No notes yet. Create your first note!"}
              </p>
            </div>
          ) : (
            <div style={styles.notesGrid}>
              {filteredNotes.map((note, index) => (
                <div
                  key={note._id}
                  style={{
                    ...styles.noteCard,
                    animationDelay: `${index * 0.1}s`,
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
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  bgAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    backgroundSize: "200% 200%",
    animation: "gradient 15s ease infinite",
    opacity: 0.8,
    zIndex: 0,
  },
  header: {
    position: "relative",
    zIndex: 1,
    padding: "60px 20px 40px",
    textAlign: "center",
  },
  headerContent: {
    animation: "fadeInUp 0.8s ease",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "10px",
  },
  logoIcon: {
    color: "#fff",
    animation: "float 3s ease-in-out infinite",
  },
  title: {
    fontSize: "56px",
    fontWeight: "800",
    color: "#fff",
    margin: 0,
    textShadow: "0 4px 20px rgba(0,0,0,0.2)",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "20px",
    color: "rgba(255,255,255,0.9)",
    margin: 0,
    fontWeight: "300",
  },
  mainContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px 60px",
  },
  addNoteCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "24px",
    padding: "40px",
    marginBottom: "30px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
    animation: "fadeInUp 0.8s ease 0.2s both",
  },
  cardTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "25px",
    marginTop: 0,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "16px 20px",
    fontSize: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s",
    fontFamily: "inherit",
    backgroundColor: "#fff",
  },
  textarea: {
    padding: "16px 20px",
    fontSize: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s",
    fontFamily: "inherit",
    resize: "vertical",
    backgroundColor: "#fff",
  },
  formButtons: {
    display: "flex",
    gap: "12px",
  },
  button: {
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
    transition: "all 0.3s",
    flex: 1,
  },
  primaryButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
  secondaryButton: {
    background: "#f1f1f1",
    color: "#666",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "30px",
    animation: "fadeInUp 0.8s ease 0.3s both",
  },
  searchIcon: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#999",
  },
  searchInput: {
    width: "100%",
    padding: "16px 20px 16px 50px",
    fontSize: "16px",
    border: "none",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    outline: "none",
  },
  notesSection: {
    animation: "fadeInUp 0.8s ease 0.4s both",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "25px",
    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  noteCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    transition: "all 0.3s",
    animation: "fadeInUp 0.6s ease both",
    position: "relative",
    overflow: "hidden",
  },
  noteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  noteTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
    margin: 0,
    flex: 1,
    marginRight: "10px",
  },
  noteBadge: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    padding: "6px 12px",
    borderRadius: "20px",
    minWidth: "32px",
    textAlign: "center",
  },
  noteContent: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "20px",
    wordBreak: "break-word",
  },
  noteActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  actionButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
  },
  deleteButton: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "#fff",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
  },
  emptyIcon: {
    color: "#ccc",
    marginBottom: "20px",
  },
  emptyText: {
    fontSize: "18px",
    color: "#999",
    margin: 0,
  },
};

export default NotesApp;
