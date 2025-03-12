require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const dbConnect = require('./connections/dbConnection.js');

const placesRouter = require('./routes/places_routes.js');
const authRouter = require('./routes/auth.routes.js');
const translationRoutes = require('./routes/translation.routes');
const expenseRoutes = require('./routes/expenses');

const app = express();

app.use(cors()); // Allow frontend to access backend

const port=process.env.PORT || 5001;
const PORT = process.env.PORT || 5000;
// Database connection
// Uncomment the following line if you want to connect to the database
dbConnect();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/places', placesRouter);
app.use('/api/auth', authRouter);
app.use('/api/translation', translationRoutes);
app.use('/api/expenses', expenseRoutes);

// Serve frontend after API routes
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error message:', err.message);
  console.error('Stack trace:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
