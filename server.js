// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001; // You can change the port if needed

// Enable CORS
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'your-db-uri' with your MongoDB URI)
mongoose.connect("your-db-uri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for your goals
const goalSchema = new mongoose.Schema({
  text: String,
});

const Goal = mongoose.model("Goal", goalSchema);

// Create a new goal
app.post("/api/goals", async (req, res) => {
  try {
    const newGoal = new Goal({ text: req.body.text });
    const savedGoal = await newGoal.save();
    res.json(savedGoal);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all goals
app.get("/api/goals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
