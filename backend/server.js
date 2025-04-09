require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const routes = require("./routes/authRoutes")
const connectDB = require("./config/dbConfig");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(routes);

connectDB();

// const PORT = process.env.PORT || 3001

// app.listen(PORT, ()=> console.log(`Servidor rodando na ${PORT}`));

module.exports = app;