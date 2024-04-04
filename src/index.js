// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Set port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Retrieve MongoDB connection string from environment variable
const DATABASE_URL = process.env.MONGOOSE_URL;

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err)); // Improved error handling

// Start the Express server
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
