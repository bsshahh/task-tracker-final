# 🧩 Task Tracker Lite API

A RESTful backend built with Node.js, Express, and Sequelize, connected to a MySQL database hosted on Railway.
It includes JWT authentication, Swagger documentation (Autogen), and Docker support.
---

## 🚀 Features

- 🧑‍💻 User Registration & Login (JWT-based)
- 🔐 Logout (token invalidation using blacklist)
- 📂 CRUD operations for Tasks and Categories
- 🧭 Auto-generated Swagger API Docs (swagger-autogen)
- 🐳 Docker ready
- ☁️ Railway-hosted database support
- 🌐 CORS enabled for frontend connection


# ⚙️ Setup & Installation
- 1️⃣ Clone the repository
git clone https://github.com/bsshahh/task-tracker-lite.git
cd task-tracker-lite

- 2️⃣ Install dependencies
npm install

- 3️⃣ Create .env file

Since here Railway’s hosted MySQL URL is used so the .env file will look like this:

- PORT=3000
- DATABASE_URL=mysql://<username>:<password>@containers-us-west-145.railway.app:12345/railway
- JWT_SECRET=your_secret_key


⚠️ Replace <username>, <password>, and port (like 12345) with the exact values shown in your Railway database connection URL.


## 🧭 Swagger Documentation
- Generate Swagger JSON → `node swagger.js`  
- Start Server → `npm run dev`


Now open your browser:

🌐 API Base URL → http://localhost:3000

📘 Swagger Docs → http://localhost:3000/api-docs


## 🐳 Run with Docker

This project is fully containerized using **Docker** and **Docker Compose** for easy setup.

### ⚙️ Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running  

- A valid `.env` file in the project root with your **Railway database connection URL**

### 🧱 Build & Run the Container
- run:
`docker-compose up --build`


### 🧰 Scripts
- Command	Description
- npm run start : Start server normally
- npm run dev : Start with nodemon
- node swagger.js : Generate Swagger docs



## 🧑‍💻 Technologies Used

- Node.js / Express.js
- Sequelize ORM
- MySQL (via Railway)
- JWT Authentication
- Swagger Autogen
- Docker

## 🎬 Video of working APIs 

[Watch Demo Video on Google Drive](https://drive.google.com/file/d/1ON31Hr0jjMVFX5Zm2XjNbLxZh7qU-1H4/view)
