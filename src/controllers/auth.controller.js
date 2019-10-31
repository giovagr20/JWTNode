const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const User = require('../models/models.user');
const config = require('../config');

router.post('/signup', async(req,res)=>{
    const{username, email, password} = req.body;
    
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    console.log(user);

    const token = jwt.sign({id: user._id}, config.secretKey, {
        expiresIn: 60*60*24
    });
    res.json({auth: true, token});
    
});


router.post('/signin', (req,res)=>{
    res.json({
        "message": "signin"
    });
});
router.get('/me', async(req,res)=>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded = jwt.verify(token, config.secretKey);
    const user = await User.findById(decoded.id, {password: 0});
    if(!user){
        return res.status(404).send('No user found');
    }
    res.json(user);
    
});


module.exports = router;