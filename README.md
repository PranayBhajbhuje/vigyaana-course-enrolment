# Vigyaana — Course Enrolment Flow (Full Stack Assignment)

This is a full-stack web application developed as part of the **Vigyaana EdTech assignment**.  
It demonstrates a simple **Course Enrolment System** where a student can sign up, log in, view courses, and enroll in them.  
The project includes both a backend (Node.js + Express + JSON storage) and a frontend (React + Vite).

---

## 🚀 Features

### 🔹 Authentication
- Basic **Signup** and **Login** flow (JSON-based, no database)
- Each user gets a unique `userId`
- Logged-in user data stored in browser localStorage

### 🔹 Course Catalog
- Displays a list of available courses  
- Each course card shows title, instructor, and duration  
- “Enroll” button allows students to enroll  
- Prevents re-enrolling in the same course

### 🔹 Dashboard
- Shows the logged-in user’s enrolled courses  
- Displays enrollment date and quick “Continue Learning” button  

---

## ⚙️ Tech Stack

**Frontend:**  
- React.js (Vite)
- Fetch API for backend communication  
- Clean and responsive CSS (custom design system)

**Backend:**  
- Node.js + Express  
- JSON file (`data.json`) used as lightweight database  
- CORS enabled for local communication between frontend & backend

---

## 🧩 API Endpoints

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/courses` | **GET** | Fetch all available courses |
| `/api/enroll` | **POST** | Enroll a user in a course `{ userId, courseId }` |
| `/api/my-courses?userId=...` | **GET** | Fetch all courses enrolled by a specific user |
| `/api/signup` | **POST** | Register a new user `{ username, password }` |
| `/api/login` | **POST** | Authenticate an existing user `{ username, password }` |

---

## 🖥️ How to Run Locally

### 1️⃣ Prerequisites
- Node.js (v18+ recommended)
- npm (comes with Node)

### 2️⃣ Setup Backend
```bash
cd backend
npm install
npm start
# Backend will run on http://localhost:4000
