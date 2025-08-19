const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
    res.send("Hello World from Me!");
});

// Example API endpoint
app.get("/api/users", (req, res) => {
    res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

//
app.listen(PORT, () => {
    console.log(`Port ${PORT} is running`)
})