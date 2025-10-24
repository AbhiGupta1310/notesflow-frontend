// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";
// import NoteList from "./components/NoteList";
// import AddNote from "./components/AddNote";

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   // ✅ Create a single Axios instance for your API base URL
//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL || "http://localhost:5050/api",
//   });

//   // ✅ Fetch notes on component mount
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await api.get("/notes");
//         setNotes(response.data);
//       } catch (error) {
//         console.error("❌ Error fetching notes:", error.message);
//       }
//     };
//     fetchNotes();
//   }, []);

//   // ✅ Add a new note
//   const handleAddNote = async () => {
//     if (!title.trim() || !content.trim()) {
//       alert("Please enter both a title and content for the note.");
//       return;
//     }

//     try {
//       const response = await api.post("/notes", { title, content });
//       setNotes((prevNotes) => [...prevNotes, response.data]);
//       setTitle("");
//       setContent("");
//     } catch (error) {
//       console.error("❌ Error adding note:", error.message);
//     }
//   };

//   // ✅ Edit note by ID
//   const handleEditNote = async (id, updatedTitle, updatedContent) => {
//     try {
//       const response = await api.put(`/notes/${id}`, {
//         title: updatedTitle,
//         content: updatedContent,
//       });
//       setNotes((prevNotes) =>
//         prevNotes.map((note) => (note._id === id ? response.data : note))
//       );
//     } catch (error) {
//       console.error("❌ Error updating note:", error.message);
//     }
//   };

//   // ✅ Delete note by ID
//   const handleDeleteNote = async (id) => {
//     try {
//       await api.delete(`/notes/${id}`);
//       setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
//     } catch (error) {
//       console.error("❌ Error deleting note:", error.message);
//     }
//   };

//   return (
//     <div className="app-container">
//       <h1>📝 Notes App</h1>
//       <AddNote
//         title={title}
//         setTitle={setTitle}
//         content={content}
//         setContent={setContent}
//         onAddNote={handleAddNote}
//       />
//       <NoteList
//         notes={notes}
//         onEditNote={handleEditNote}
//         onDeleteNote={handleDeleteNote}
//       />
//     </div>
//   );
// };

// export default App;
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotesApp from "./NotesApp";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/notes" element={<NotesApp />} />
      </Routes>
    </Router>
  );
}

export default App;
