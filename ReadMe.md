# Gobo Remit

Gobo Remit is a secure, scalable, and user-friendly application inspired by Cash App. It allows users to submit money transfer requests by entering recipient details and uploading proof of payment. The platform is designed to be intuitive and efficient, handling hundreds to thousands of users daily.

## Folder Structure

The project is organized into the following structure:

```
GoboRemit
├── frontend/        # Frontend code (React.js with Material-UI)
├── backend/         # Backend code (Node.js with Express and PostgreSQL)
├── scripts/         # DevOps and helper scripts for automation and deployment
├── shared/          # Common utilities, types, and configurations shared across layers
├── .gitignore       # Files and directories to be ignored by Git
└── README.md        # Project overview and documentation
```

### Description of Folders

- **`frontend/`**  
  Contains the frontend code for the application, built using **React.js** with **Material-UI**. It provides the user interface for submitting money transfer requests and uploading proof of payments.

- **`backend/`**  
  Contains the backend code for the application, built using **Node.js** and **Express.js** with **PostgreSQL** as the database. It handles the APIs, authentication, data processing, and file uploads.

- **`scripts/`**  
  Includes scripts for **DevOps** tasks such as deployment, database migrations, and automation.

- **`shared/`**  
  Contains shared utilities, validation schemas, and type definitions that are used by both the frontend and backend.

- **`.gitignore`**  
  Specifies files and directories to be ignored by Git, including build files, node_modules, and sensitive configuration files.

- **`README.md`**  
  This file, providing an overview of the project, its structure, and purpose.

---

## Tech Stack

### Frontend
- **React.js** with **TypeScript**
- **Material-UI (MUI)** for UI components
- **React Hook Form** for form handling
- **Axios** for HTTP requests
- **React Router DOM** for navigation

### Backend
- **Node.js** with **Express.js**
- **PostgreSQL** as the database
- **Prisma** ORM for database interactions
- **AWS S3** for file storage
- **JWT** for authentication and session management

### DevOps
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **AWS** (EC2, ECS, RDS, S3) for cloud hosting

---

## Getting Started

### Prerequisites
- **Node.js** (v16 or later)
- **npm** or **yarn** (for package management)
- **Docker** (for containerization)
- AWS account for deployment and file storage

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/GoboRemit.git
   cd GoboRemit
   ```

2. Navigate to the frontend or backend directory to install dependencies:
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

3. Repeat the same for the backend:
   ```bash
   cd ../backend
   npm install
   # or
   yarn install
   ```

---

## Usage

### Starting the Frontend
Navigate to the `frontend` directory and run:
```bash
npm start
# or
yarn start
```
The application will be available at `http://localhost:3000`.

### Starting the Backend
Navigate to the `backend` directory and run:
```bash
npm run dev
# or
yarn dev
```
The backend API will be available at `http://localhost:5000`.

---

## Deployment

### Local Deployment
Use Docker to containerize the application:
```bash
docker-compose up --build
```

### Cloud Deployment
- Configure CI/CD pipelines using **GitHub Actions**.
- Deploy to **AWS ECS** or a similar cloud service.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message"
   ```
4. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Documentation

Additional documentation can be found in the `Documents/` directory:
- [Tech Specification - Phase 1](Documents/TECH-SPEC-PHASE1.md) - Technical specifications for Phase 1 development
- [Repository Access Status](Documents/REPOSITORY-ACCESS-STATUS.md) - Information about external repository access and integration

---

## Contact

For questions or suggestions, please reach out to the project maintainer at **[your-email@example.com]**.