// telegram.js

import dotenv from "dotenv";
import fetch from "node-fetch"; // If using Node <18
dotenv.config(); // Load .env variables

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID; // move chat ID to .env for flexibility

/**
 * Sends a formatted message to the Telegram chat.
 * @param {string} message - The message to send (Markdown supported).
 * @returns {Promise<{ success: boolean }>}
 */
export async function sendOrderToTelegram(message) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Missing Telegram credentials in .env");
    return { success: false };
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return { success: false };
  }
}
