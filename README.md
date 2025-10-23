
# 🧠 Smart Task Planner

> **"Turn your goals into actionable tasks using AI reasoning."**

Smart Task Planner helps users break down high-level goals into **clear, actionable tasks** with **dependencies**, **timelines**, and **AI-generated suggestions** — powered by **LLMs** and built with a **secure full-stack architecture**.

---
##Video Link:

https://drive.google.com/file/d/10PstCM1vYRduonb3EAfsY3vL4wPEKln3/view?usp=drive_lin
k
## 🚀 Features

### 🌐 Frontend (React + Vite + TailwindCSS)
- Modern UI with dark mode-ready theme.  
- Secure login/signup using JWT authentication.  
- Task dashboard with add/edit/delete functionality.  
- Inline **AI-powered planning** for each task — generate a plan with one click.  
- Responsive layout with smooth transitions.

### ⚙️ Backend (Node.js + Express + MongoDB)
- RESTful API design with proper error handling.  
- Secure authentication using JWT and bcrypt.  
- Task CRUD endpoints with user-based isolation.  
- LLM endpoint (`/plan`) for generating AI-based task plans.  
- Modular structure with routes, controllers, and middleware.

### 🧠 LLM Integration (OpenAI)
- Uses `gpt-4o-mini` or compatible model to generate structured JSON plans.  
- Automatically extracts tasks, dependencies, and time estimates.  
- Cleanly parsed and rendered in UI.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite), TailwindCSS, Axios, Context API |
| Backend | Node.js, Express.js, Mongoose |
| Auth | JWT, bcrypt |
| Database | MongoDB (Atlas or local) |
| AI | OpenAI API (`gpt-4o-mini`) |

---

## 📁 Folder Structure

```
smart-task-planner/
│
├── backend/
│   ├── routes/
│   │   ├── tasks.js
│   │   ├── auth.js
│   │   └── plan.js         # 🔥 LLM integration endpoint
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Planner.jsx
│   │   │   └── Auth.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── lib/
│   │   │   └── api.js
│   │   └── App.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/smart-task-planner.git
cd smart-task-planner
```

### 2️⃣ Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Configure environment variables
Create a `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

> 💡 You can get an OpenAI API key at [https://platform.openai.com](https://platform.openai.com).

### 4️⃣ Run the development servers

In separate terminals:

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:4000`

---

## 💬 Example Usage

1. **Sign up / Log in** using the Auth page.  
2. **Add tasks** from the Dashboard.  
3. Click the **🧠 Generate Plan** button on any task to get an AI-powered breakdown:
   - Subtasks
   - Dependencies
   - Suggested timeline
   - Helpful AI suggestions

---

## 🧠 How LLM Integration Works

- When a user clicks “Generate Plan,” the app sends a POST request to:
  ```
  POST /api/plan
  Body: { goal: "Finish UI by next week" }
  ```
- Backend sends a structured prompt to OpenAI’s `gpt-4o-mini`.
- The model responds in **strict JSON**:
  ```json
  {
    "tasks": [
      { "title": "Design UI", "description": "Create wireframes", "due_in_days": 2 },
      { "title": "Build components", "depends_on": ["Design UI"], "due_in_days": 4 }
    ],
    "suggestions": "Prioritize reusable components."
  }
  ```
- Parsed data is displayed in the dashboard instantly.

---

## 🔒 Security Highlights

- JWT-based user authentication.  
- Passwords hashed with bcrypt.  
- Role-based route protection middleware.  
- Tokens stored securely in local storage.  
- Environment-based secrets (never hardcoded).

---

## 🧾 API Endpoints Summary

| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/tasks` | Fetch all user tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| POST | `/api/plan` | Generate AI task plan |

---

## 🧠 Future Enhancements
- ⏰ Task reminders via email or push notifications.  
- 📊 Timeline visualization (Gantt chart view).  
- 🧩 Collaboration & sharing with teammates.  
- 🪄 AI goal rewriting for clearer objectives.  
- 📱 PWA version for mobile access.

---

## 📹 Deliverables for Submission

- ✅ Complete codebase (this repo)  
- ✅ Working demo video (showing AI plan generation)  
- ✅ `README.md` (this file)  

---
## Video Demo link
- Google drive: (https://drive.google.com/file/d/10PstCM1vYRduonb3EAfsY3vL4wPEKln3/view?usp=drive_link)
## 👨‍💻 Author

**Vedula Visweswar Sai Vignesh**  
*B.Tech CSE (IoT), VIT Vellore*  
- 🌐 GitHub: [Vignesh11011](https://github.com/Vignesh11011)
- 💼 LinkedIn: [Vedula Visweswar Sai Vignesh](https://www.linkedin.com/in/vedula-visweswar-sai-vignesh-5184251bb)  
- 📧 Email: vsai4401@gmail.com  
