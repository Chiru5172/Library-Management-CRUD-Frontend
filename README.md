# Library Management System - Frontend

This is the frontend application for the Library Management System.

The frontend is developed using React.js and JavaScript. It communicates with the backend REST APIs using the Fetch API.

The application provides CRUD interfaces for managing:

- Students
- Books
- Library transactions

---

## Features

### Student Management

The Student section allows users to:

- Add a student
- View all students
- Search students
- Edit student details
- Delete students

Student details include:

- Name
- Class
- Photo
- Video

---

### Book Management

The Book section allows users to:

- Add a book
- View all books
- Search books
- Edit book details
- Delete books

Book details include:

- Book name
- Author
- Publication
- Year

---

### Library Management

The Library section connects students with books.

Users can:

- Issue a book to a student
- View issued books
- Search library records
- Edit library records
- Delete library records

Library details include:

- Student
- Book
- Start date
- End date

---

## Technologies Used

- React.js
- JavaScript
- HTML
- CSS
- Fetch API

---

## Important

This project uses the traditional React setup created using Create React App.

It does NOT use:

- Vite
- TypeScript
- JSX
- Redux
- React Router

The React components are written using JavaScript and `React.createElement()` instead of JSX.

frontend/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Student.js
│   │   ├── Book.js
│   │   └── Library.js
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
└── README.md