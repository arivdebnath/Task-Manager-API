const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const taskRouter = new express.Router();

taskRouter.post("/tasks", auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id,
        })


        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

    // new Task(req.body)
    //     .save()
    //     .then((task) => {
    //         res.status(201).send(task);
    //     })
    //     .catch((e) => {
    //         res.status(400).send(e);
    //     });
});

// GET /tasks?completed=[true|false] filters for tasks based on completed value
// GET /tasks?limit= &skip=  allows pagination
// GET /tasks?sortBy=[createdAt]_[asc or desc]  
// -1 for desecnding and 1 for ascending
taskRouter.get("/tasks", auth, async (req, res) => {
    const match = {};

    const sort = {};

    if(req.query.completed){
        match.completed = req.query.completed === 'true';
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_');

        sort[parts[0]] = parts[1] === 'desc'? -1 : 1 ;
    }

    try {
        // const tasks = await Task.find({});
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: (req.query.limit===undefined)?undefined:parseInt(req.query.limit),
                skip: (req.query.skip===undefined)?undefined:parseInt(req.query.skip),
                sort,
            },
        });
        const tasks = req.user.tasks;
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
    // Task.find({})
    //     .then((result) => {
    //         res.send(result);
    //     })
    //     .catch((e) => {
    //         res.status(500).send();
    //     });
});

taskRouter.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({_id, owner: req.user._id});
        if (!task) {
            res.status(404).send();
            return;
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
    // Task.findById(_id)
    //     .then((result) => {
    //         if (!result) {
    //             res.status(404).send();
    //         }
    //         res.send(result);
    //     })
    //     .catch((e) => {
    //         res.status(500).send();
    //     });
});

taskRouter.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const validatorBool = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!validatorBool) {
        return res.status(400).send({ error: 'Invalid Updates!' });
    }
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((key) => {
            task[key] = req.body[key];
        });
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

taskRouter.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        // const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).send();
            return;
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = taskRouter;
