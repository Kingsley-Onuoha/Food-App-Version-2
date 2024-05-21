const express = require("express");
const cors = require("cors");
var MongoClient = require("mongodb").MongoClient;

const stripe = require("./stripe");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/stripe", stripe);

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to our online shop API...");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
