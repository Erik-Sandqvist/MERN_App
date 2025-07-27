import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// const express = require("express");
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config(); 

console.log(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:5173', 
}));
app.use(express.json()); 
app.use(rateLimiter)


app.use((req,res,next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
}); // Middleware to log requests

app.use("/api/notes", notesRoutes); 

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running on:", port); 
  });
});



