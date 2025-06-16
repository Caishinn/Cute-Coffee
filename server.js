// server.js
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(bodyParser.json());

// Get sensitive config from .env
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// POST endpoint to receive messages from frontend and forward to Telegram
app.post("/send-telegram", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message content" });
  }

  try {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await axios.post(telegramUrl, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });

    console.log("✅ Message sent to Telegram:", response.data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error sending to Telegram:", error.message);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
