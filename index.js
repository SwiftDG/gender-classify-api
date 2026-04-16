const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Required for the grading script

app.get('/api/classify', async (req, res) => {
    const { name } = req.query;

    if (!name || name.trim() === "") {
        return res.status(400).json({ status: "error", message: "Missing or empty name parameter" });
    }

    try {
        const response = await axios.get(`https://api.genderize.io?name=${encodeURIComponent(name)}`);
        const { gender, probability, count } = response.data;

        if (!gender || count === 0) {
            return res.status(200).json({ status: "error", message: "No prediction available for the provided name" });
        }

        const is_confident = probability >= 0.7 && count >= 100;
        const processed_at = new Date().toISOString();

        return res.status(200).json({
            status: "success",
            data: {
                name,
                gender,
                probability,
                sample_size: count,
                is_confident,
                processed_at
            }
        });
    } catch (error) {
        return res.status(502).json({ status: "error", message: "Upstream API failure" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
