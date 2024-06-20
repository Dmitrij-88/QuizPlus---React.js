require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const quizRoutes = require('./routes/quiz');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.send('This is the backend API for Placement Project');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server is listening for requests on port', PORT);
});
