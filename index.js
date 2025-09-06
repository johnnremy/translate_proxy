import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // needed for parsing JSON bodies

// Proxy POST requests to LibreTranslate
app.post("/translate", async (req, res) => {
  try {
    const response = await fetch("https://libretranslate-3385.onrender.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation failed" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
