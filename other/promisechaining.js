require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete("61d7ee5616d583caf9004f91").then((result) => {
//     console.log(result);
//     return Task.countDocuments({completed: false});
// }).then((result2)=>{
//     console.log(result2);
// }).catch((e)=>{
//     console.log(e);
// })

const deleteTaskandCount = async (id, completed)=>{
    const first = await Task.findByIdAndDelete(id);
    if(!first){
        throw new Error('lkjlk');
    }
    const count = await Task.countDocuments({completed});
    return count;
}

deleteTaskandCount("61d7ee745fe341f7b0b0c8c3", true).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})

