const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;
const API_KEY = "64630dfa04702d84af0e834f57af8b49c0f722211df2f6b12d1014ec01f02da11692f5170e5c5de8"; // Replace this

app.use(cors());

app.get("/threats", async (req, res) => {
    try {
        const response = await axios.get("https://api.abuseipdb.com/api/v2/blacklist", {
            headers: { "Key": API_KEY, "Accept": "application/json" }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching threat data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
