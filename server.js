// app.js
const express = require('express');
const { connectDB, sequelize } = require('./src/config/db');
const userRoutes = require('./src/route/user.route');

// Connect to the database
connectDB();

// Initialize Express
const app = express();
// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));

// Sync models with database
sequelize.sync()
  .then(() => console.log('Models synced with database'))
  .catch((err) => console.error('Failed to sync models:', err));
// Middleware                                                                                                                                                                                                                             
app.use(express.json()); // for parsing JSON requests
  
// Use routes
app.use('/api/users', userRoutes);

// app.use('*', userRoutes);
// FIXME: 404 common error handler

// app.use('', unknownErrorHander);
// FIXME: 500 unknown error handler

// FIXME: need logger with pino and pino-pretty for error data handler

// Start the server
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

