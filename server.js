// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files under /public route
app.use("/public", express.static(__dirname));

// Optional: redirect root to index.html
app.get("/", (req, res) => {
  res.redirect("/public/index.html");
});

app.listen(port, () => {
  console.log(
    `🚀 Server running at http://localhost:${port}/public/index.html`
  );
});
