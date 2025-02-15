const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./db/database')
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes.route')
const authRoutes = require('./routes/auth.route')
const { protect } = require('./middlewares/auth.middleware')

dotenv.config()

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));

app.use(express.json());
connectDB()

// Add this before your routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes with /api prefix
app.use('/api/auth', authRoutes);
app.use('/api/flashcards', protect, flashcardRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})