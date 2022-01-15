const express = require("express");
require("./db/mongoose.js");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if(req.method==='GET'){
//         res.send('GET operations are disabled');
//     }
// //     next();
// })

// //middleware for maintainence
// app.use((req, res, next) => {
//     res.status(503).send('Under maintainence!!');
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log(`The server is up and running at ${port}`);
});



// const token = jwt.sign({_id: 'jkadlkfj'}, 'securedauth');
// console.log(token);
// console.log(jwt.verify(token, 'securedauth'));
// const pass = "3omegafattyacid";

// const hashfunc = async(passw)=>{
//     const sec = await bcryptjs.hash(passw, 8);
//     console.log(sec);
// }

// const main = async () => {
//     // const task = await Task.findById('61e064a78b8c71c92c5f59ae');
//     // await task.populate('owner');
//     // console.log(task.owner);
    
//     const user = await User.findById('61e064748b8c71c92c5f59a8');
//     await user.populate('tasks');
//     console.log(user.tasks);
// }

// main();