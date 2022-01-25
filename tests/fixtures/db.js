const User =require('../../src/models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Task = require('../../src/models/task');

const testUserOneId = new mongoose.Types.ObjectId();
const testUserOne = {
    _id: testUserOneId,
    name: "Test User One",
    email: "testuser1@email.com",
    password: "testuserone",
    tokens: [{
        _id: new mongoose.Types.ObjectId(),
        token: jwt.sign({ _id: testUserOneId }, process.env.HASH_SECR),
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'annoying task',
    completed: false,
    owner: testUserOneId
}

const setupDatabase = async()=>{
    await User.deleteMany();
    await new User(testUserOne).save();
    await Task.deleteMany();
    await new Task(taskOne).save();
}

module.exports = {
    testUserOneId, 
    testUserOne,
    setupDatabase,
}