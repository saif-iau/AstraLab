require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/general.routes');
const app = express();

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI
// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api" ,routes);

app.listen(PORT, () => console.log('Server running on port 3000'));
