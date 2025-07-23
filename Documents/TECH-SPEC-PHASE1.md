# Tech Specification Document – Phase 1

## Project Overview

The goal is to build a secure, scalable single-page application (SPA) reminiscent of Cash App, enabling users to submit requests for money transfers. Users will input recipient information and upload supporting documents (proof of payment), which will be reviewed before the transfer is completed.

---

## 1. Functional Requirements

- **User Flow:**
  - Multi-step form to collect:
    - Personal information (recipient Name)
    - Contact details (Phone number, Address)
    - Banking information (Bank Name, Bank Account Number, optional Routing Number)
    - Supporting document (e.g., screenshot or transaction ID as proof)
  - Routing number field becomes available if a checkbox is selected.
  - Users submit requests to transfer an amount and upload proof of payment for verification.
  - Admin/Operator interface (future phase) to review submitted requests.

- **Volume Expectation:**
  - Support for several hundred to a few thousand daily users.

---

## 2. Technical Stack

### 2.1. Frontend

- **Framework:** React.js (SPA)
- **UI Library:** Material-UI (MUI) for modern, accessible components
- **Form Management:** React Hook Form (robust validation and multi-step forms)
- **State Management:** React Context API (expandable to Redux/Zustand if needed)
- **File Uploads:** react-dropzone (for supporting documents)
- **Styling:** MUI with CSS-in-JS; Tailwind CSS optional for custom styling
- **API Calls:** Axios

### 2.2. Backend

- **Framework:** Node.js with Express.js (REST API)
- **Language:** TypeScript (type safety, improved developer experience)
- **ORM:** Prisma (for PostgreSQL)
- **Security:**
  - Input validation with Zod or Joi
  - Helmet for HTTP security headers
  - Rate limiting (express-rate-limit)
  - Secure file upload via Multer, with files stored in AWS S3 (private buckets)
  - JWT authentication (Passport.js or Auth0)
- **Database:** PostgreSQL (transactional, scalable, secure)
- **File Storage:** Amazon S3 (private, pre-signed URLs for secure uploads/downloads)
- **Logging:** Winston or Morgan

### 2.3. DevOps & Deployment

- **Containerization:** Docker (for backend and frontend)
- **CI/CD:** GitHub Actions (testing, linting, deployment)
- **Cloud Hosting:** AWS (EC2, ECS/Fargate, RDS, S3)
- **Secrets Management:** Environment variables, AWS IAM roles
- **Monitoring:** Sentry (error reporting), AWS CloudWatch (logs/metrics)

---

## 3. Repository Structure

- **Monorepo Structure** (easy to split into multiple repos if needed in the future):

```
cashapp-clone/
  frontend/    # React app
  backend/     # Node.js/Express API
  shared/      # (Optional) shared types, validation schemas
  infra/       # Dockerfiles, CI/CD, IaC scripts
  docs/        # Documentation
  README.md
```

- **Advantages:** Simple coordination, shared code/config, easier initial setup, flexible for future repo splitting.

---

## 4. Security Considerations

- **Frontend:** 
  - Enforce HTTPS, sanitize user input, use strict CORS policies.
  - Never expose secrets or sensitive config.
- **Backend:**
  - Validate and sanitize all inputs.
  - Use Helmet to set secure HTTP headers.
  - Rate limit API endpoints.
  - Store sensitive keys outside codebase (env vars, AWS Secrets Manager).
  - Use secure, signed S3 URLs for file uploads.
  - Log only non-sensitive data.
- **Database:**
  - Use least-privilege user accounts.
  - Encrypted database connections.
  - Regular backups.
- **File Storage:**
  - Private S3 buckets.
  - Limit file types and sizes.
  - Optional: Virus scan uploads.
- **Authentication:**
  - JWT with refresh tokens, strong password policies, optional 2FA.

---

## 5. Scalability & Maintainability

- **Horizontal scaling** of backend (Docker, ECS/Kubernetes)
- **Connection pooling** for the database
- **Stateless API** with JWT for easy scaling
- **Monorepo** for easier dependency management and refactoring
- **Automated CI/CD** for quick, reliable deployments

---

## 6. Next Steps

1. **Scaffold Monorepo:** Set up folder structure, baseline configs (Docker, ESLint, Prettier).
2. **Frontend:** Create React app with MUI, set up multi-step form, integrate React Hook Form.
3. **Backend:** Set up Express API with TypeScript, Prisma models, validation, JWT auth, file upload endpoints.
4. **Infra:** Dockerize frontend/backend, create CI/CD workflows.
5. **Security Review:** Implement and test all security best practices from day one.

---

## 7. Future Phases (Out of Scope for Phase 1)

- Admin portal for request review/approval
- User registration & profile management
- Notifications (email/SMS)
- Analytics/dashboard
- Multi-language support

---

## 8. References

- [React](https://react.dev/)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Docker](https://www.docker.com/)
- [GitHub Actions](https://github.com/features/actions)

---

*Document prepared for Phase 1 development — July 2025*