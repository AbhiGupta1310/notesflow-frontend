# NotesFlow - Modern Note-Taking Application

NotesFlow is a full-stack note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features a modern, responsive interface with real-time updates and secure user authentication.

## Demo Account

```
Email: temp@gmail.com
Password: !@#RICE123
```

## Screenshots

### Login Page

![NotesFlow Login](./client/public/notesflow.png)

### Notes Dashboard

![Notes Dashboard](./client/public/note.png)

## Features

- 🔐 **Secure Authentication**

  - JWT-based authentication
  - Protected routes and API endpoints
  - Password encryption using bcrypt

- 📝 **Note Management**

  - Create, read, update, and delete notes
  - Rich text formatting
  - Real-time search functionality
  - Automatic saving
  - Character count

- 💫 **Modern UI/UX**
  - Responsive design
  - Beautiful gradients and animations
  - Clean and intuitive interface
  - Dark mode support (coming soon)

## Tech Stack

### Frontend

- React.js
- React Router v6
- Lucide Icons
- Custom CSS with modern animations

### Backend

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/notes-maker.git
cd notes-maker
```

2. Install server dependencies

```bash
cd server
npm install
```

3. Install client dependencies

```bash
cd ../client
npm install
```

4. Create environment variables

Create a .env file in the server directory:

```env
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/notesDB
JWT_SECRET=your_jwt_secret_here
```

Create a .env file in the client directory:

```env
REACT_APP_API_URL=http://localhost:5050/api
```

5. Start the development server

In the server directory:

```bash
npm start
```

In the client directory:

```bash
npm start
```

The application will be available at http://localhost:3000

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/forgot-password` - Request password reset
- POST `/api/auth/reset-password` - Reset password
- GET `/api/auth/me` - Get current user

### Notes

- GET `/api/notes` - Get all notes for authenticated user
- POST `/api/notes` - Create a new note
- PUT `/api/notes/:id` - Update a note
- DELETE `/api/notes/:id` - Delete a note

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who helped with the project
- Special thanks to the MERN stack community
- Inspired by modern note-taking applications

## Future Enhancements

- [ ] Dark mode support
- [ ] Note categories/tags
- [ ] Collaborative note editing
- [ ] Rich text editor integration
- [ ] Export notes in various formats
- [ ] Mobile applications
- [ ] Cloud sync

#### Made with ❤️ by Abhi
