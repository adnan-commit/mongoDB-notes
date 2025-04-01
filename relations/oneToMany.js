const mongoose = require("mongoose");
const { Schema } = mongoose;
const uri = "mongodb://127.0.0.1:27017/practice";

// Async function to connect to MongoDB
async function main() {
  try {
    await mongoose.connect(uri); // Connect to MongoDB using the connection string
    console.log("Connected to MongoDB"); // Log success message
  } catch (error) {
    console.log("Error occurred:", error); // Log connection error
  }
}

// Execute the main function to establish the connection
main();

// Define the schema for orders
const orderSchema = new Schema({
  name: String, // Name of the order item
  price: Number, // Price of the order item
});

// Define the schema for customers
const customerSchema = new Schema({
  name: String, // Name of the customer
  orders: [
    {
      type: Schema.Types.ObjectId, // Reference to Order model's ObjectId
      ref: "Order", // Model to populate from
    },
  ],
});

//pre and post middlewares
// customerSchema.pre("findOneAndDelete", async () => {
//   console.log("pre middleware called");
// });
customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
    let res = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(res);
  }
});

// Create models from the schemas
const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// Async function to add a customer to the database
const addCustomer = async () => {
  try {
    // Create a new customer instance
    let cust1 = new Customer({
      name: "Noman Qureshi", // Customer name
    });

    // Find orders by name
    let order1 = await Order.findOne({ name: "Samosa" });
    let order2 = await Order.findOne({ name: "Lassi" });

    // Push found orders to the customer's orders array
    cust1.orders.push(order1);
    cust1.orders.push(order2);

    // Save the customer to the database
    let result = await cust1.save();
    console.log(result); // Log the saved customer
  } catch (err) {
    console.log("Error adding customer:", err); // Log any errors
  }
};

// Execute the addCustomer function to add a customer to the database
// addCustomer();

// Async function to add orders to the database
const addOrder = async () => {
  try {
    // Insert many orders and await the promise
    let orders = await Order.insertMany([
      {
        name: "Samosa",
        price: 12, // Price of the Samosa
      },
      {
        name: "Jalebi",
        price: 20, // Price of the Jalebi
      },
      {
        name: "Lassi",
        price: 30, // Price of the Lassi
      },
    ]);

    console.log("Orders added:", orders); // Log the result
  } catch (err) {
    console.log("Error adding order:", err); // Log any errors
  }
};

// Execute the addOrder function to add orders to the database
// addOrder();

// Example usage of populate
const getCustomerWithOrders = async () => {
  try {
    // Find a customer and populate the orders field with the actual order documents
    let customer = await Customer.findOne({ name: "Adnan Qureshi" }).populate(
      "orders"
    );
    console.log("Customer with orders:", customer); // Log the populated customer
  } catch (err) {
    console.log("Error getting customer with orders:", err); // Log any errors
  }
};

// Execute the getCustomerWithOrders function to fetch and log customer with populated orders
// getCustomerWithOrders();

const delcust = async () => {
  let data = await Customer.findByIdAndDelete("66903ffeeae352a7b848b470");
  console.log(data);
};
delcust();
