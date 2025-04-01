const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// MongoDB connection URI
const uri = "mongodb://127.0.0.1:27017/practice";

// Async function to connect to MongoDB
async function main() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connection error:", err);
  }
}

// Call the main function to establish the connection
main();

// Define the User schema with userName and email fields
const userSchema = new Schema({
  userName: String, // String type field for the user's name
  email: String, // String type field for the user's email
});

// Define the Post schema with content, likes, and a reference to the User schema
const postSchema = new Schema({
  content: String, // String type field for the content of the post
  likes: Number, // Number type field for the number of likes
  user: {
    type: Schema.Types.ObjectId, // Reference to an ObjectId from the User collection
    ref: "User", // Name of the model to reference (User model)
  },
});

// Create models for User and Post collections using the defined schemas
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// Function to add data to the User and Post collections
const addData = async () => {
  // Create a new user instance
  let user1 = new User({
    userName: "aadii.here", // Setting the userName field
    email: "aadiqureshi89@gmail.com", // Setting the email field
  });

  // Create a new post instance
  let post1 = new Post({
    content: "Hello Folks !!", // Setting the content field
    likes: 51, // Setting the likes field
  });

  // Assign the user to the post
  post1.user = user1; // Setting the user field to the user1 instance

  // Save the user instance to the database
  await user1.save();
  // Save the post instance to the database
  await post1.save();
};

// Call the addData function to add the data to the collections
addData();
