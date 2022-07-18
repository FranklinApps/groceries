require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");


app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
require("./routes/user.routes")(app);
require('./config/mongoose.config');
app.listen(process.env.MY_PORT, () => console.log(`You are connected to port ${process.env.MY_PORT}`))