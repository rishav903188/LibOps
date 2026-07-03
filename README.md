# 📚 Library Management System

A RESTful backend API for managing a library's books, members, borrowing, reservations, and fines — built with **Node.js**, **Express**, and **MongoDB**.

![Node.js](https://img.shields.io/badge/Node.js-CommonJS-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-ISC-blue)

---

## Overview

This API lets a library run its day-to-day operations digitally: user registration and authentication, a searchable book catalog with cover-image uploads, book borrowing and returns, automatic overdue-fine calculation, and a reservation queue for books that are currently checked out.

## Features

- 🔐 **Authentication** — JWT-based signup/login with bcrypt password hashing
- 📖 **Book Catalog** — create, update, delete, and browse books, with cover image upload support
- 🔄 **Borrowing** — issue and return books with automatic due-date tracking
- 💰 **Fine Management** — automatically calculates and tracks overdue fines when a book is returned late
- 📌 **Reservations** — queue up for a book that's currently unavailable
- 🧑‍🤝‍🧑 **Role-ready** — user model supports `student`, `librarian`, and `admin` roles for future access control

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB with Mongoose |
| Auth | JSON Web Tokens (JWT) + bcryptjs |
| File Uploads | Multer |
| Config | dotenv |
| Dev Tooling | nodemon |

## Project Structure

```
library-management-system/
├── src/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── borrow.controller.js
│   │   ├── fine.controller.js
│   │   └── reservation.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js     # JWT verification (protect route)
│   │   └── upload.middleware.js   # Multer config for book covers
│   ├── models/
│   │   ├── user.model.js
│   │   ├── book.model.js
│   │   ├── borrow.model.js
│   │   ├── fine.model.js
│   │   └── reservation.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── book.routes.js
│   │   ├── borrow.routes.js
│   │   ├── fine.routes.js
│   │   └── reservation.routes.js
│   ├── services/
│   │   ├── fine.service.js        # Fine calculation logic
│   │   └── reservation.service.js
│   ├── app.js                     # Express app & route wiring
│   └── server.js                  # Entry point
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/ayushman031/library-management-system.git
cd library-management-system

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Running the Server

```bash
# Development (with auto-reload via nodemon)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`.

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Log in and receive a JWT | No |
| GET | `/me` | Get the logged-in user's profile | Yes |

### Books — `/api/books`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | List all books | No |
| POST | `/` | Add a new book (with optional cover upload) | Yes |
| GET | `/:id` | Get a single book | No |
| PUT | `/:id` | Update a book (with optional cover upload) | Yes |
| DELETE | `/:id` | Delete a book | Yes |
| POST | `/:id/cover` | Upload/replace a book's cover image | Yes |

### Borrowing — `/api/borrow`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/:bookId` | Borrow a book | Yes |
| PUT | `/return/:borrowId` | Return a borrowed book | Yes |
| GET | `/my` | View your borrow history | Yes |

### Fines — `/api/fines`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/my` | View your own fines | Yes |
| GET | `/:id/pay` | Pay a fine | Yes |
| GET | `/` | View all fines (librarian/admin) | Yes |

### Reservations — `/api/reservations`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/:bookId` | Reserve a book that's checked out | Yes |
| GET | `/my` | View your reservations | Yes |
| DELETE | `/:id` | Cancel a reservation | Yes |

> Protected routes require an `Authorization: Bearer <token>` header.

## How Fines Work

When a book is returned after its due date, the system automatically calculates the number of days late and creates a fine record at a fixed rate per day. Fines can then be viewed and paid through the `/api/fines` endpoints.

## Roadmap

- [ ] Role-based access control (admin/librarian-only routes)
- [ ] Email notifications for due dates and fulfilled reservations
- [ ] Search and filtering for the book catalog
- [ ] Automated tests

## Contributing

Contributions are welcome. Please open an issue to discuss any significant changes before submitting a pull request.

## License

This project is licensed under the ISC License.
