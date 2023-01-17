require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const userRouter = require('./Routes/user.route');
const taskTypeRouter = require('./Routes/task.route');
const subTaskRouter = require('./Routes/subtask.route');

app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/tasktype",taskTypeRouter);
app.use("/api/subtask",subTaskRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log("Server is Connected ", process.env.APP_PORT);
});