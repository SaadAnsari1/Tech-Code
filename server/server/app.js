const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;


require('./db/conn')
require('./router/auth')

app.use(express.json())
app.use('/uploads', express.static('uploads'))

const cookieParser = require("cookie-parser")
app.use(cookieParser());

const User = require('./model/userSchema')
const Admin = require('./model/AdminSchema')
// const News = require('./model/News')


app.use(require('./router/auth'))



if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', index.html))
    })
}


app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);

})

