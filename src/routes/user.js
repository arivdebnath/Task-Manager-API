const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const userRouter = new express.Router();

//Signup
userRouter.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {

        await user.save();

        const token = await user.genToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }

    // new User(req.body).save().then((user) => {
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
});

//Login
userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.genToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
})

//Logout
userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {
            return tokenObj.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

//LogoutAll (of all sessions or devices)

userRouter.post('/users/logoutALl', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

//Profile Endpoint
userRouter.get("/users/me", auth, async (req, res) => {
    res.send(req.user);

    // User.find({})
    //     .then((result) => {
    //         res.send(result);
    //     })
    //     .catch((e) => {
    //         res.status(500).send();
    //     });
});

// userRouter.get("/users/:id", async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             res.status(404).send();
//             return;
//         }
//         res.send(user);
//     } catch (e) {
//         res.status(500).send();
//     }


//     // User.findById(_id)
//     //     .then((result) => {
//     //         if (!result) {
//     //             res.status(404).send();
//     //             return;
//     //         }
//     //         res.send(result);
//     //     })
//     //     .catch((e) => {
//     //         res.status(500).send();
//     //     });
// });
//Update Endpoint
userRouter.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const updates = Object.keys(req.body);
    const validateBool = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if (!validateBool) {
        res.status(400).send({ error: 'Invalid Updates!' });
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, });
        // const user = await User.findById(req.params.id);
        // if (!user) {
        //     res.status(404).send();
        //     return;
        // }
        updates.forEach((key) => {
            req.user[key] = req.body[key];
        })
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})
//Delete Endpoint
userRouter.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

//File Upload Endpoint

const upload = multer({
    limits: {
        fileSize: 1000000,  //in bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
})

//Uploading avatars endpoint
userRouter.post('/users/me/avatars', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize(250, 250).png().toBuffer();

    req.user.avatar = buffer;

    await req.user.save();

    res.status(200).send();

}, (error, req, res, next) => {

    res.status(400).send({ error: error.message }); //catching the error from the 'upload' middleware and sending it to a callback function
})                                                //which is passed as the fourth argument to the http method  

//Deleting avatars endpoint
userRouter.delete('/users/me/avatars', auth, async (req, res) => {
    try {

        req.user.avatar = undefined;
        // await req.user.avatar.remove();
        await req.user.save();
        res.send();

    } catch (e) {
        res.status(500).send(e);
    }
})

userRouter.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!(user && user.avatar)) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
})

module.exports = userRouter;