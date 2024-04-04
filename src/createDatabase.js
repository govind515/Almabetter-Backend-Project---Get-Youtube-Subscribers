// Import necessary modules
const mongoose = require("mongoose");
const Subscriber = require("./models/subscribers"); // Assuming this is your Mongoose model for subscribers
const data = require("./data.json"); // Assuming this is the JSON data you want to insert
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Retrieve MongoDB connection string from environment variable
const DATABASE_URL = process.env.MONGOOSE_URL;

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

// Define a function to refresh all data
const refreshAll = async () => {
  // Delete all documents in the Subscriber collection
  await Subscriber.deleteMany({});

  // Insert new data from the JSON file into the Subscriber collection
  await Subscriber.insertMany(data);

  // Disconnect from the MongoDB database
  await mongoose.disconnect();
};

// Call the refreshAll function to execute the refresh operation
refreshAll();
