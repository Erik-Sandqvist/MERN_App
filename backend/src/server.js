import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
// const express = require("express");
import dotenv from 'dotenv';

dotenv.config(); 

console.log(process.env.MONGO_URI);

const app = express();

connectDB();

app.use("/api/notes", notesRoutes); 


app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
  process.exit(1); 
});

