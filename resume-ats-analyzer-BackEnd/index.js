const express = require('express')
const cors = require('cors')
const ChatRoutes=require("./Routes/ChatBot");
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",

  "https://resume-ats-analizer.vercel.app",

  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  process.env.FRONTEND_ORIGIN
].filter(Boolean);

require('./conn');



app.use(express.json());
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS blocked origin: ${origin}`)
    );
  }
}));

const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume');

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.use('/api/user' , UserRoutes)
app.use('/api/resume' , ResumeRoutes)
app.use('/api/chat' , ChatRoutes)

// Deployment Code
const localClientBuildPath = path.join(__dirname , "dist");
const siblingClientBuildPath = path.join(__dirname , "..", "resume-ats-analyzer", "dist");
const clientBuildPath = fs.existsSync(path.join(localClientBuildPath, "index.html"))
    ? localClientBuildPath
    : siblingClientBuildPath;
const hasClientBuild = fs.existsSync(path.join(clientBuildPath, "index.html"));

if (hasClientBuild) {
    app.use(express.static(clientBuildPath));
}

// Handle React Routing
app.use((req , res, next) => {
    if (hasClientBuild && req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.sendFile(path.join(clientBuildPath , "index.html"));
    }

    next();
})

app.listen(PORT , () => {
    console.log("BackEnd is Running on port" , PORT)
})
