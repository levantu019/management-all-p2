const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Account
app.use("/api/accounts", require("./routes/accountRoutes"));
app.use("/api/areas", require("./routes/areaRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/targets", require("./routes/targetRoutes"));

//
app.listen(PORT, () => {
    console.log(`Port ${PORT} is running`)
})