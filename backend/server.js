import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: '../.env' });
}

connectDB();

const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
  res.send('helloWorld')
})
// CORS configuration
app.use(
  cors({
    origin: 'https://react-test-frontend-black.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow other HTTP methods as needed
    credentials: true, // Allow sending cookies
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// API routes
app.use('/api/user', userRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`);
});
