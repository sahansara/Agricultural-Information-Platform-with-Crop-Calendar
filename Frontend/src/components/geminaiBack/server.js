const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 5000;

// ✅ Multer for file uploads
const upload = multer({ dest: "uploads/" });

// ✅ Set up Google Gemini API
const apiKey = "AIzaSyBgJuaqAcGRyD-9YvhJ7dtN5oh3TwcPXlY"; // Replace with your actual key
const genAI = new GoogleGenerativeAI(apiKey);

app.use(cors());
app.use(express.json());

// 📌 Upload image and send to Gemini
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    // Convert image to Base64
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    // Remove uploaded file after reading
    fs.unlinkSync(imagePath);

    // Send image to Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      { inlineData: { mimeType: "image/jpeg", data: base64Image } },
      {
        text: "Act as a plant disease expert and analyze the uploaded image of the plant. Identify any visible signs of disease, such as leaf spots, discoloration, wilting, mold, or unusual growths. Determine the possible cause, whether it's fungal, bacterial, viral, or nutrient-related. Provide the disease name, possible treatments, and preventive measures.",
      },
    ]);

    const responseText = result.response.text();
    res.json({ message: responseText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
