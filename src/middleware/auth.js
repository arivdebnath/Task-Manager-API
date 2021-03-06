const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.HASH_SECR);
        const user = await User.findOne({_id: payload._id, 'tokens.token': token})

        if(!user){
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();

    } catch(e){
        res.status(401).send({error: "Authentication failed"});
    }
}


module.exports = auth;