const express = require('express');
import cors from 'cors'
import userRoutes from './routes/userRoutes'

const port = 3000; // or any port you prefer

const app = express();

app.use(
    cors({
      origin: '*',
    })
  )


// Define a route
app.use('/api/user', userRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
