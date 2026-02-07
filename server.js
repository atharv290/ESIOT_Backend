import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import rideRoutes from './routes/rideRoutes.js'; // 👈 ADD THIS

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // or the actual domain of your frontend
  credentials: true               // allows cookies to be sent
}));
app.use(express.json());
/* Test route */
app.get('/', (req, res) => {
  console.log('Backend test route accessed');
  res.send('Backend running 🚀');
});

/* 🔥 REGISTER ROUTES */
app.use('/', rideRoutes); // 👈 THIS IS THE KEY LINE

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch(err => console.error(err));
