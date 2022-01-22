const express = require("express");
require("./db/mongoose.js");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;