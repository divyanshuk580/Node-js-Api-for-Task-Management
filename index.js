require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRouter = require('./Routes/user.route');
const taskTypeRouter = require('./Routes/task.route');
const subTaskRouter = require('./Routes/subtask.route');
const dashboarUserRouter = require('./Routes/dashboard.route');


app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        name: 'SESSION_ID',      // cookie name stored in the web browser
        secret: process.env.SECRET_KEY,     // helps to protect session
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session is stored 30 days
        }
    })
);
app.use("/api/users",userRouter);
app.use("/api/tasktype",taskTypeRouter);
app.use("/api/subtask",subTaskRouter);
app.use("/dashboard",dashboarUserRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log("Server is Connected ", process.env.APP_PORT);
});