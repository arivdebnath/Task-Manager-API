const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
            validate(email) {
                if (!validator.isEmail(email)) {
                    throw new Error("Please insert a valid email address.");
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(password) {
                if (password.toLowerCase().includes("password")) {
                    throw new Error("Password cannot contain the worde'password'.");
                }
            },
        },
        age: {
            type: Number,
            default: 0,
            trim: true,
            validate(age) {
                if (age < 0) {
                    throw new Error("Age must be a positive number.");
                }
            }
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                }
            }
        ],
        avatar: {
            type: Buffer,
        }
    }, 
    {
        timestamps: true,
    }

)

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.methods.toJSON = function () {
    const user = this;

    const userObj = user.toObject();
    delete userObj.tokens;
    delete userObj.password;
    delete userObj.avatar;

    return userObj;
}

userSchema.methods.genToken = async function () {  //methods for the instances of the model
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.HASH_SECR);

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => { //methods for the model
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("unable to login");
    }
    const validPass = await bcryptjs.compare(password, user.password); //authentication
    if (!validPass) {
        throw new Error("unable to login");
    }
    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8);
    }

    next();
})

//Delete
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({owner: user._id});
    next();
})

const User = mongoose.model("User", userSchema);


module.exports = User;
