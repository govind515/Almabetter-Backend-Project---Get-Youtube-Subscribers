// Import necessary modules
const express = require("express");
const Subscriber = require("./models/subscribers"); // Assuming this is your Mongoose model for subscribers
const app = express(); // Create an Express application
const path = require("path"); // Module for working with file and directory paths

// Route to serve the index.html file from the public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Route to get all subscribers
app.get("/subscribers", async (req, res) => {
  try {
    // Find all subscribers from the database, excluding the '__v' field
    const subscribers = await Subscriber.find().select("-__v");
    res.json(subscribers); // Send JSON response with subscribers
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error response with status code 500 for internal server error
  }
});

// Route to get subscribers' names and subscribed channels
app.get("/subscribers/names", async (req, res) => {
  try {
    // Find subscribers from the database, selecting only 'name' and 'subscribedChannel' fields
    const subscribers = await Subscriber.find().select("name subscribedChannel -_id");
    res.json(subscribers); // Send JSON response with subscribers' names and subscribed channels
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error response with status code 500 for internal server error
  }
});

// Route to get a specific subscriber by ID
app.get("/subscribers/:id", async (req, res) => {
  try {
    // Find a subscriber by ID from the database
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      // If subscriber is not found
      return res.status(400).json({ message: "Subscriber not found" }); // Send error response with status code 400
    }
    res.json(subscriber); // Send JSON response with the found subscriber
  } catch (error) {
    res.status(400).json({ message: error.message }); // Send error response with status code 400 for client error
  }
});


// Export the Express application to be used in other parts of the application
module.exports = app;
