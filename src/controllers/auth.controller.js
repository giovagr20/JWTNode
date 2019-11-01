const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const User = require('../models/models.user');
const config = require('../config');
const verifyToken = require('../verifyToken');

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


router.post('/signin', async(req,res)=>{
   const {email, password} = req.body;
   
   const user = await User.findOne({email: email});
   if(!user){
       return res.status(404).send("Email doesn't exists");
   }
   const validPassword = await user.validatePassword(password);
   if(!validPassword){
       return res.status(401).json({
           auth: false,
           token: null
       })}
    const token=jwt.sign({id: user.id}, config.secretKey,
        {
            expiresIn:60*60*24
        });
        res.json({auth: true, token})
   
});
router.get('/me', verifyToken ,async(req,res)=>{
    const user = await User.findById(req.userId, {password: 0});
    if(!user){
        return res.status(404).send('No user found');
    }
    res.json(user);
    
});


module.exports = router;