// // components/NoteList.js

// // import React from "react";

// // const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
// //   return (
// //     <ul>
// //       {notes.map((note) => (
// //         <li key={note._id}>
// //           <strong>{note.title}</strong>
// //           <p>{note.content}</p>

// //           <button
// //             className="button2"
// //             style={{ marginRight: "15px" }}
// //             onClick={() =>
// //               onEditNote(
// //                 note._id,
// //                 prompt("Enter updated title:", note.title),
// //                 prompt("Enter updated content:", note.content)
// //               )
// //             }
// //           >
// //             Edit
// //           </button>
// //           <button className="button2" onClick={() => onDeleteNote(note._id)}>
// //             Delete
// //           </button>
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // };

// // export default NoteList;
// import React from "react";

// const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
//   return (
//     <ul>
//       {notes.map((note) => (
//         <li key={note._id}>
//           <strong>{note.title}</strong>
//           <p>{note.content}</p>
//           <div className="note-actions">
//             <button
//               className="button-edit"
//               onClick={() => {
//                 const updatedTitle = prompt("Edit title", note.title);
//                 const updatedContent = prompt("Edit content", note.content);
//                 if (updatedTitle !== null && updatedContent !== null) {
//                   onEditNote(note._id, updatedTitle, updatedContent);
//                 }
//               }}
//             >
//               Edit
//             </button>
//             <button
//               className="button-delete"
//               onClick={() => onDeleteNote(note._id)}
//             >
//               Delete
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default NoteList;
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  return (
    <ul>
      <AnimatePresence>
        {notes.map((note) => (
          <motion.li
            key={note._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            layout
          >
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <div className="note-actions">
              <button
                className="button-edit"
                onClick={() => {
                  const updatedTitle = prompt("Edit title", note.title);
                  const updatedContent = prompt("Edit content", note.content);
                  if (updatedTitle !== null && updatedContent !== null) {
                    onEditNote(note._id, updatedTitle, updatedContent);
                  }
                }}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="button-delete"
                onClick={() => onDeleteNote(note._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default NoteList;
