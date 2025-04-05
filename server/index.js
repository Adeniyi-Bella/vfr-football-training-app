import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import sharp from "sharp";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parses form data (excluding files)
app.use(express.json()); // Parses JSON requests (but NOT file uploads)

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("MongoDB URI not provided in environment variables.");
    process.exit(1); // Exit if MongoDB URI is not provided
}

// Connect to MongoDB

mongoose
    .connect(mongoURI, {
        serverSelectionTimeoutMS: 30000, // 30 seconds timeout
        connectTimeoutMS: 30000,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define schema
const DataSchema = new mongoose.Schema({
    name: String,
    country: String,
    position: String,
    status: String,
    image: { data: Buffer, contentType: String }, // Image is optional
});

const Data = mongoose.model("Data", DataSchema);

// ✅ Handle both JSON & Multipart Requests Separately
app.post("/api/data", upload.single("image"), async (req, res) => {
    console.log("Received request");

    try {

        if (
            !req.body.name ||
            !req.body.country ||
            !req.body.position ||
            !req.body.status
        ) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newPlayer = new Data({
            name: req.body.name,
            country: req.body.country,
            position: req.body.position,
            status: req.body.status,
            image: req.file
                ? { data: req.file.buffer, contentType: req.file.mimetype }
                : null, // Handle optional image
        });

        await newPlayer.save();
        res.status(201).json({ message: "Player data saved successfully!" });
    } catch (error) {
        console.error("Error saving player data:", error);
        res.status(500).json({ message: "Error saving player data" });
    }
});

app.get("/api/data", async (req, res) => {
    try {
        const players = await Data.find();

        console.log("Fetched players:", players);
        
        // ✅ Process images before sending
        const processedPlayers = await Promise.all(
            players.map(async (player) => {
                if (player.image?.data) {
                    // ✅ Resize and convert to PNG
                    const resizedImage = await sharp(player.image.data)
                        .resize(128, 128) // Resize to 128x128
                        .toFormat("png") // Convert to PNG
                        .toBuffer();

                    return {
                        ...player.toObject(),
                        image: {
                            data: resizedImage.toString("base64"), // Convert to Base64
                            contentType: "image/png",
                        },
                    };
                }
                return player.toObject();
            })
        );

        res.status(200).json(processedPlayers);
    } catch (error) {
        console.error("Error fetching player data:", error);
        res.status(500).json({ message: "Error fetching player data" });
    }
});

app.delete("/api/data/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPlayer = await Data.findByIdAndDelete(id);

        if (!deletedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.status(200).json({ message: "Player deleted successfully" });
    } catch (error) {
        console.error("Error deleting player:", error);
        res.status(500).json({ message: "Error deleting player" });
    }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
