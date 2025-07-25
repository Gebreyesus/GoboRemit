# GoboRemit: Functionalities Roadmap

## 1. Core Business Requirements / End Goals
- Allow end-users to submit international money transfer requests, including recipient and banking info, and upload required documents.
- Enable admins to review, approve, or reject transfer requests, and manage users.
- Ensure secure authentication and authorization for both user types.
- Store transfer data and documents securely (DB, S3).
- Provide a user-friendly, responsive SPA for all flows.

---

## 2. Features Built So Far

| Feature Area         | Frontend (FE)                                      | Backend (BE)                                      |
|----------------------|----------------------------------------------------|---------------------------------------------------|
| Project Scaffold     | Vite + React + TS, MUI, React Hook Form, Axios     | Node.js + Express + TS, Prisma, Multer            |
| Multi-Step Form      | Personal, Contact, Banking, Document Upload steps  | POST /api/transfers endpoint, Multer for uploads  |
| Validation           | Field-level validation, error display              | Basic validation (to be expanded)                 |
| API Integration      | Form submits data/files to backend                 | Receives, parses, and stubs response              |
| Dev Environment      | Local dev server, hot reload                       | Local dev server, Dockerfile, CORS, etc.          |

---

## 3. Features To Add Next

| Feature Area         | Frontend (FE)                                      | Backend (BE)                                      |
|----------------------|----------------------------------------------------|---------------------------------------------------|
| User Authentication  | Login/Register pages, JWT token storage, role-based UI | Auth endpoints (register, login), JWT, bcrypt, middleware |
| Authorization        | Route guards, show/hide admin/user features        | Middleware to protect routes, role checks         |
| Admin Dashboard      | Admin-only pages: view/manage transfers, users     | Endpoints for listing, updating, deleting transfers/users |
| Transfer Status      | Show status (pending, approved, rejected) to users | DB schema for status, endpoints to update status  |
| DB Integration       | Fetch/display transfer history, status, etc.       | Prisma models, CRUD for transfers, users          |
| File Storage         | Show uploaded docs, download link (if allowed)     | Upload to S3, store file URLs in DB               |
| Notifications        | UI for status updates, errors, confirmations       | (Optional) Email/SMS notifications                |
| Audit/Logs           | (Optional) Admin view of actions/history           | Logging, audit trails                             |
| Security             | Input sanitization, secure storage, logout         | Rate limiting, helmet, secure JWT, CORS           |

---

## 4. Suggested Next Steps

1. Implement user authentication (register/login) with JWT and role support (end-user, admin).
2. Add authorization middleware to protect sensitive routes.
3. Build admin dashboard UI and supporting backend endpoints.
4. Integrate Prisma models for users and transfers, and connect to a real database.
5. Implement S3 file upload and retrieval.
6. Add transfer status tracking and update flows.
7. (Optional) Add notifications and audit logging.

---

## Phase II: Next Steps & Progress

### What Has Been Built (Phase I)
- Monorepo structure for FE/BE
- Multi-step transfer request form (FE)
- File upload and validation (FE/BE)
- Static authentication endpoints (register/login) with role support (BE)
- Authentication flow and protected routes (FE)
- MVP transfer request API (BE)

### Phase II Goals
- Connect authentication endpoints to a real database (Prisma/PostgreSQL)
- Implement user registration and login with persistent storage
- Add role-based authorization middleware (BE)
- Build admin dashboard (FE) for managing transfers and users
- Add transfer status tracking and update flows (FE/BE)
- Integrate S3 for file storage (BE)
- Display transfer history and status to users (FE)
- Add notifications and audit logging (optional)

---
