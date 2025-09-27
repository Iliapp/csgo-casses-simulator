// @ts-ignore server start
import express from "express";

const app = express();
const PORT = 3000;

app.get("/health", (req, res) => {
    res.json({ status: "Hello" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
