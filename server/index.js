// server.js (using import/export)
import express from "express";  // ES6 import syntax
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON body

// MongoDB connection string (update with your MongoDB URI)
const mongoURI = "mongodb+srv://admin:A7SjprpDg46Uyhg@cluster0.9xsmnwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  // Use your MongoDB Atlas URI here

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

  const DataSchema = new mongoose.Schema({
    name: String,
    country: String,
    position: String,
    status: String,
  });

const Data = mongoose.model("Data", DataSchema);

app.post("/api/data", async (req, res) => {
  try {
    const { name, country, position, status } = req.body;

    const newPlayer = new Data({
      name,
      country,
      position,
      status,
    });

    await newPlayer.save();
    res.status(201).json({ message: "Player data saved successfully!" });
  } catch (error) {
    console.error("Error saving player data:", error);
    res.status(500).json({ message: "Error saving player data" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
