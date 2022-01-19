const mongoose = require('mongoose');
// const validator = require('validator');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
});

// mongodb://127.0.0.1:27017/task-manager-api

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     },
// })

// const firstTask = new Task({
//     description: "   The thing to do first i",
//     completed: true,
// })

// firstTask.save().then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(error);
// })

// new User({
//     name: "Test3 User",
//     email: "test@example.org",
//     password: "sss",
// }).save().then(console.log("went well")).catch((e)=>{console.log(e)});