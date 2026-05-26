# 📄 Resume ATS Analyzer

A full-stack web application that analyzes resumes against job descriptions using AI-powered ATS (Applicant Tracking System) scoring. Built with **React** on the frontend and **Node.js/Express** on the backend, leveraging **Firebase Authentication** and the **Cohere AI API** for intelligent resume scoring.

---

## 🗂️ Project Structure

```
Resume-ATS-Analyzer/
├── Frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Sidebar.css
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── Dashboard.css
│   │   │   ├── History/
│   │   │   │   ├── History.jsx
│   │   │   │   └── History.css
│   │   │   ├── Login/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Login.css
│   │   │   └── AdminPanel/
│   │   │       ├── AdminPanel.jsx
│   │   │       └── AdminPanel.css
│   │   ├── utils/
│   │   │   ├── firebase.jsx
│   │   │   ├── AuthContext.jsx
│   │   │   └── withAuth.jsx          ← HOC
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── controllers/
│   │   ├── resume.js
│   │   └── user.js
│   ├── models/
│   │   ├── Resume.js
│   │   └── User.js
│   ├── routes/
│   │   ├── resumeRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── cohereClient.js
│   │   └── firebaseAdmin.js
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ✨ Features

- 🔐 **Firebase Authentication** — Email/password login with Google OAuth support
- 🛡️ **Admin Panel** — Restricted to admin users only (role-based access control)
- 📊 **Dashboard** — Upload resume and get instant ATS score with feedback
- 📁 **History** — View all past resume analysis records per user
- 🤖 **Cohere AI Scoring** — Deep NLP-based resume vs job description matching
- 🔒 **HOC Auth Guard** — Higher-Order Component to protect private routes
- 📱 **Responsive Sidebar** — Clean navigation across all screen sizes

---

## 🖥️ Frontend

### Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI Framework |
| Vite | Build tool |
| Firebase SDK | Authentication |
| React Router v6 | Client-side routing |
| Axios | HTTP requests to backend |
| Context API | Global auth state |



### Frontend `.env`

```env
# Frontend/.env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_URL=http://localhost:5000
```

---

### Frontend Installation

```bash
cd Frontend
npm install
npm run dev
```

---

## 🛠️ Backend

### Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| Cohere API | AI-based ATS resume scoring |
| Firebase Admin SDK | Verify tokens, manage users |
| Mongoose | MongoDB ODM (optional: or use Firestore) |
| Multer | Resume file upload handling |
| dotenv | Environment variable management |

---



### Backend `.env`

```env
# Backend/.env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/ats_db
COHERE_API_KEY=your_cohere_api_key
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
```

---

### Backend Installation

```bash
cd Backend
npm install
node server.js
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/resume/analyze` | Analyze resume with Cohere | ✅ Yes |
| `GET` | `/api/resume/history/:userId` | Get user's analysis history | ✅ Yes |
| `POST` | `/api/user/set-admin` | Grant admin role to a user | 🔐 Admin |
| `GET` | `/api/user/all` | Get all registered users | 🔐 Admin |

---

## 🔐 Authentication Flow

```
User visits app
      ↓
Not logged in? → Redirected to /login
      ↓
Firebase email/password or Google OAuth login
      ↓
Token stored → AuthContext updated
      ↓
withAuth HOC checks role:
  - Regular user → /dashboard
  - Admin user  → /admin (via custom Firebase claim)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Firebase project with Authentication enabled
- Cohere API key from [cohere.com](https://cohere.com)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/resume-ats-analyzer.git
cd resume-ats-analyzer

# 2. Setup Frontend
cd Frontend
cp .env.example .env
# Fill in your Firebase credentials in .env
npm install
npm run dev

# 3. Setup Backend (new terminal)
cd Backend
cp .env.example .env
# Fill in MongoDB URI, Cohere API key, and Firebase service account JSON
npm install
node server.js
```

---

## 🧠 How ATS Scoring Works

1. User uploads their **resume text** and pastes a **job description**
2. Backend sends both to the **Cohere `command-r-plus` model** with a structured prompt
3. Cohere returns an **ATS score (0–100)**, keyword match report, and suggestions
4. Results are saved to **MongoDB** and linked to the user's Firebase UID
5. User can view full **history** of past analyses on the History page

---

## 🛡️ Admin Panel Features

- View all registered users
- Promote a user to Admin role (sets Firebase custom claim `admin: true`)
- View all resume submissions across all users
- Delete or flag inappropriate submissions

> ⚠️ Admin access is enforced both on the frontend (via `withAuth HOC`) and backend (via Firebase token claim verification).

---

## 📦 Dependencies

### Frontend

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "firebase": "^10.x",
  "axios": "^1.x",
  "vite": "^5.x"
}
```

### Backend

```json
{
  "express": "^4.x",
  "cohere-ai": "^7.x",
  "firebase-admin": "^12.x",
  "mongoose": "^8.x",
  "multer": "^1.x",
  "dotenv": "^16.x",
  "cors": "^2.x"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ — contributions welcome!

> ⭐ If you find this project helpful, please give it a star on GitHub!
