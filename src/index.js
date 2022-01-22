const app = require("./app");

const port = process.env.PORT;


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

//Trying out multer
// const multer = require('multer');

// const upload = multer({
//     dest: 'img',
//     limits: {
//         fileSize: 2000000,
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx|pdf)$/)){
//             return cb(new Error('Please insert a valid file'));
//         }
//         cb(undefined, true);
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.status(200).send();
// }, (error, req, res, next)=>{
//     res.status(400).send({error: error.message});
// }) 