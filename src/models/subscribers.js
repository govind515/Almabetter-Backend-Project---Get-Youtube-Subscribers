// Import Mongoose module
const mongoose = require("mongoose");

// Define the schema for the Subscriber model
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String, // Field type is string
    required: true, // Field is required
  },
  subscribedChannel: {
    type: String, // Field type is string
    required: true, // Field is required
  },
  subscribedDate: {
    type: Date, // Field type is date
    required: true, // Field is required
    default: Date.now, // Default value is current date and time
  },
});

// Create and export the Subscriber model based on the schema
module.exports = mongoose.model("Subscriber", subscriberSchema);
