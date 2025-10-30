# 🧩 Task Tracker Lite — Full Stack App

A complete Task Management System built with React (Vite) frontend and Node.js + Express + Sequelize + MySQL backend.
The project is fully Dockerized and uses a Railway-hosted MySQL database for production.
---

## 🚀 Features

# Frontend (React + Vite)

- Modern UI for managing tasks and categories

- JWT-based authentication integration

- Axios API calls to backend

- Responsive and lightweight

- Fully containerized with Docker

# Backend (Node.js + Express)

- User Registration & Login (JWT-based)

- Role-based access (Admin & Normal User)

- Admin Key validation on registration (ADMIN123)

- CRUD for Tasks & Categories

- Token Blacklist for Logout

- Swagger API Docs (swagger-autogen)

- Sequelize ORM with MySQL

- Docker + Railway DB integration

## ⚙️ Setup Instructions
# 🧰 1. Clone Repository
- git clone https://github.com/bsshahh/task-tracker-lite.git
- cd task-tracker-lite

# 📦 2. Environment Setup

- Make sure Docker Desktop is installed and running.

- Create a .env file inside backend/:

PORT=3000
DATABASE_URL=mysql://<user>:<password>@containers-us-west-145.railway.app:12345/railway
JWT_SECRET=your_secret_key
- ⚠️ Replace <user>, <password>, and port (12345) with the actual credentials from your Railway database.

💡 Admin Registration Note:
While registering a new user as Admin, use this key:
ADMIN_KEY = ADMIN123

# 3. Run with Docker Compose

To build and start both backend & frontend containers:

docker-compose up --build


## 🖥️ After setup completes:

Frontend: http://localhost:5173

Backend API: http://localhost:3000

Swagger Docs: http://localhost:3000/api-docs


# 💻 Manual Run (Without Docker)
Backend:
cd backend
npm install
node swagger.js   # generate Swagger docs
npm run dev

Frontend:
cd frontend
npm install
npm run dev

For detailed backend setup → backend/README.md

## 🎬 Video of working APIs 

[Watch Demo Video on Google Drive](https://drive.google.com/file/d/1iG_xowYyrS8gc0m6B8RF439fQhc7uUGv/view)
