import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbConnection.js";
import cookieParser from "cookie-parser";
import upload from "express-fileupload";
import path from 'path'

import {v2 as cloudinary} from "cloudinary"

import cors from"cors";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://twitter-clone-frontend-phi.vercel.app",
    "https://twitter-clone-frontend-6nts.onrender.com"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Enable this for https
})

/* This will parse multipart/form-data requests
useful when using form-data */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// this configuration is important when using cloudinary
app.use(upload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/notifications", notificationRouter)
app.use('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
})
// Add a catch-all route for debugging
app.use((req, res) => {
    console.log(`Received request for ${req.method} ${req.url}`);
    res.status(404).json({ message: "Route not found" });
});
/* app.get("/file", (req, res) => {
    res.send("sdfklhuqdhfqdhfod")
})
 */
app.listen(process.env.PORT, async () => {
    console.log(`Server Running at: ${process.env.PORT}`);
    try {
      await dbConnect();
    } catch (error) {
      console.error("Failed to connect to database:", error);
      process.exit(1);
    }
});
