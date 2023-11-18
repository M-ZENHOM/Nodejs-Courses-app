// const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

// const connectDB = async () => {
//   await mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log(err));
// };

export const client = new MongoClient(process.env.MONGO_URL);
export const db = client.db();

module.exports = db;
