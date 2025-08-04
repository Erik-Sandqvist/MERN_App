import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// const express = require("express");
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config(); 

console.log(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory path

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173', 
  }));
}

app.use(express.json()); 
app.use(rateLimiter)


app.use((req,res,next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
}); // Middleware to log requests

app.use("/api/notes", notesRoutes); 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static files from the React build directory

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html')); // Serve index.html for all other routes
  });
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running on:", port); 
  });
});



