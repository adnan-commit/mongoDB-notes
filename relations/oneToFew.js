const mongoose = require("mongoose"); // Require mongoose library
const uri = "mongodb://127.0.0.1:27017/practice"; // MongoDB connection string

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Async function to connect to the MongoDB database
async function main() {
  try {
    await mongoose.connect(uri); // Connect to MongoDB
    console.log("Connected to MongoDB"); // Log success message
  } catch (error) {
    console.log("Connection error:", error); // Log connection error
  }
}

// Execute the main function to establish the connection
main();

// Define the schema for person
const personSchema = new Schema({
  name: String,
  addresses: [
    {
      _id: false, // Prevent automatic generation of _id for sub-documents
      location: String,
      city: String,
    },
  ],
});

// Create a model from the schema
const person = mongoose.model("person", personSchema);

// Async function to add persons to the database
const addPersons = async () => {
  try {
    // Create a new user instance
    let person1 = new person({
      name: "Adnan Qureshi",
      addresses: [
        {
          location: "Ashok Road",
          city: "Khetia",
        },
      ],
    });

    // Add another address to the person
    person1.addresses.push({
      location: "Gaytri Colony",
      city: "Khetia",
    });

    // Save the person to the database
    let result = await person1.save();
    console.log("User added:", result); // Log the result
  } catch (error) {
    console.log("Error adding user:", error); // Log any errors
  }
};

// Execute the addPersons function to add a user to the database
addPersons();
