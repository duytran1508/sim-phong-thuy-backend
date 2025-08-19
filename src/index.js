const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes"); 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();


// Routes
routes(app); // mount tất cả route

// DB Connect
mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("Ket noi db thanh cong"))
    .catch(err => console.error(err));

app.listen(process.env.PORT || 3000, () => console.log("Server chạy trên port", process.env.PORT || 3000));
