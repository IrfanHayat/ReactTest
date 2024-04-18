import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

// Deployment configuration
//configure env file in dev mode
dotenv.config()

// configure env file in production
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: '../.env' })
}

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())

// CORS
app.use(cors({
  origin: 'https://react-test-frontend-black.vercel.app',
}));





// API routes
app.use('/api/user', userRoutes)
app.get('/api/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people/');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to fetch films
app.get('/api/films', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films/');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to fetch starships
app.get('/api/starships', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/starships/');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Middleware
//app.use(notFound)
//app.use(errorHandler)

const PORT =  3001
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      
  )
)
