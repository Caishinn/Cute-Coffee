// server.js

import express from "express";
import cors from "cors";
import { sendOrderToTelegram } from "./telegram.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-telegram", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ success: false, error: "Message is required" });
  }

  const result = await sendOrderToTelegram(message);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
