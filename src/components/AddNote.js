// //componenets/AddNode.js

// // import React from "react";

// // const AddNote = ({ title, setTitle, content, setContent, onAddNote }) => {
// //   return (
// //     <div>
// //       <h2>Add Note</h2>
// //       <input
// //         type="text"
// //         placeholder="Title"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //       />
// //       <textarea
// //         placeholder="Content"
// //         value={content}
// //         onChange={(e) => setContent(e.target.value)}
// //       ></textarea>
// //       <button className="button1" onClick={onAddNote}>
// //         Add Note
// //       </button>
// //     </div>
// //   );
// // };

// // export default AddNote;
// import React from "react";

// const AddNote = ({ title, setTitle, content, setContent, onAddNote }) => {
//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         onAddNote();
//       }}
//     >
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <textarea
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button type="submit" className="button-add">
//         Add Note
//       </button>
//     </form>
//   );
// };

// export default AddNote;
import React from "react";
import { motion } from "framer-motion";

const AddNote = ({ title, setTitle, content, setContent, onAddNote }) => {
  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        onAddNote();
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="button-add">
        Add Note
      </button>
    </motion.form>
  );
};

export default AddNote;
